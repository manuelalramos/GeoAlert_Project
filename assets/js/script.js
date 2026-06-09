// Menu mobile

const menuButton = document.querySelector(".botao-menu");
const navbarLinks = document.querySelector(".navbar-links");

if (menuButton && navbarLinks) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", function () {
        navbarLinks.classList.toggle("show");
        const menuAberto = navbarLinks.classList.contains("show");

        menuButton.setAttribute("aria-expanded", menuAberto);
        menuButton.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
    });

    navbarLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
            navbarLinks.classList.remove("show");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menu");
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

// Alertas

const tipoDesastre = document.querySelector("#tipoDesastre");
const nivelAlerta = document.querySelector("#nivelAlerta");
const contadorAlertas = document.querySelector("#contadorAlertas");
const cardsAlertas = document.querySelectorAll("#listaAlertas .alerta-card");
const semAlertas = document.querySelector("#semAlertas");

function atualizarAlertas() {
    if (!tipoDesastre || !nivelAlerta || !contadorAlertas) {
        return;
    }

    let totalVisivel = 0;

    cardsAlertas.forEach((card) => {
        const tipoSelecionado = tipoDesastre.value;
        const nivelSelecionado = nivelAlerta.value;
        const tipoCard = card.dataset.tipo;
        const nivelCard = card.dataset.nivel;

        const tipoCorresponde = tipoSelecionado === "todos" || tipoSelecionado === tipoCard;
        const nivelCorresponde = nivelSelecionado === "todos" || nivelSelecionado === nivelCard;
        const deveMostrar = tipoCorresponde && nivelCorresponde;

        card.hidden = !deveMostrar;

        if (deveMostrar) {
            totalVisivel += 1;
        }
    });

    contadorAlertas.textContent = totalVisivel;

    if (semAlertas) {
        semAlertas.hidden = totalVisivel !== 0;
    }
}

if (tipoDesastre && nivelAlerta && contadorAlertas) {
    tipoDesastre.addEventListener("change", atualizarAlertas);
    nivelAlerta.addEventListener("change", atualizarAlertas);
    atualizarAlertas();
}

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
            mostrarErro(email, "Digite um e-mail válido.");
            formularioValido = false;
        }

        if (mensagem.value.trim() === "") {
            mostrarErro(mensagem, "Digite uma mensagem.");
            formularioValido = false;
        }

        if (formularioValido) {
            feedback.textContent = "Mensagem enviada com sucesso!";
            formularioContato.reset();
        }
    });
}
