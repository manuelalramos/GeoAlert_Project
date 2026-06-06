// Menu mobile

const menuButton = document.querySelector(".botao-menu");
const navbarLinks = document.querySelector(".navbar-links");

if (menuButton && navbarLinks) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", function () {
        navbarLinks.classList.toggle("show");
        menuButton.setAttribute("aria-expanded", navbarLinks.classList.contains("show"));
    });

    navbarLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
            navbarLinks.classList.remove("show");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

// FAQ

const faqQuestions = document.querySelectorAll(".faq-pergunta");

faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
        const faqItem = question.parentElement;

        faqItem.classList.toggle("active");
        // Aria-expanded fala para o leitor de tela se a resposta esta aberta ou fechada
        question.setAttribute("aria-expanded", faqItem.classList.contains("active"));
    });
});

// Contato

const formularioContato = document.querySelector(".contato-formulario");

function mostrarErro(campo, mensagem) {
    const formGroup = campo.parentElement;
    const errorMessage = formGroup.querySelector(".error-mensagem");

    formGroup.classList.add("error");
    errorMessage.textContent = mensagem;
}

function limparErro(campo) {
    const formGroup = campo.parentElement;
    const errorMessage = formGroup.querySelector(".error-mensagem");

    formGroup.classList.remove("error");
    errorMessage.textContent = "";
}

function emailValido(email) {
    return email.includes("@") && email.includes(".");
}

if (formularioContato) {
    const modalDialog = document.querySelector("#meuModal");
    const botaoModal = document.querySelector("#btnFechar");
    const divMsg = document.querySelector("#msg");
    let modalInterval;

    if (botaoModal && modalDialog) {
        botaoModal.addEventListener("click", function () {
            clearInterval(modalInterval);
            modalDialog.close();
        });
    }

    formularioContato.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = formularioContato.elements.nome;
        const email = formularioContato.elements.email;
        const mensagem = formularioContato.elements.mensagem;
        const feedback = formularioContato.querySelector(".formulario-feedback");

        let formularioValido = true;

        limparErro(nome);
        limparErro(email);
        limparErro(mensagem);
        feedback.textContent = "";

        if (nome.value.trim() === "") {
            mostrarErro(nome, "Preencha seu nome.");
            formularioValido = false;
        }

        if (email.value.trim() === "" || !emailValido(email.value)) {
            mostrarErro(email, "Digite um e-mail valido.");
            formularioValido = false;
        }

        if (mensagem.value.trim() === "") {
            mostrarErro(mensagem, "Digite uma mensagem.");
            formularioValido = false;
        }

        if (formularioValido) {
            feedback.textContent = "Mensagem enviada com sucesso!";

            if (modalDialog && divMsg) {
                let contador = 5;

                divMsg.innerHTML = `<span class="modal-icon">OK</span><p class="modal-title">Mensagem enviada!</p><p class="modal-text">Voce sera redirecionado em <span class="modal-count">${contador}</span> segundos.</p>`;
                modalDialog.showModal();

                clearInterval(modalInterval);
                modalInterval = setInterval(function () {
                    contador--;
                    divMsg.innerHTML = `<span class="modal-icon">OK</span><p class="modal-title">Mensagem enviada!</p><p class="modal-text">Voce sera redirecionado em <span class="modal-count">${contador}</span> segundos.</p>`;

                    if (contador === 0) {
                        clearInterval(modalInterval);
                        window.location.href = "../index.html";
                    }
                }, 1000);
            }

            formularioContato.reset();
        }
    });
}
