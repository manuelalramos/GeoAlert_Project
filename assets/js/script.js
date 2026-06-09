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
    campo.setAttribute("aria-invalid", "true");
    errorMessage.textContent = mensagem;
}

function limparErro(campo) {
    const formGroup = campo.parentElement;
    const errorMessage = formGroup.querySelector(".error-mensagem");

    formGroup.classList.remove("error");
    campo.setAttribute("aria-invalid", "false");
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


// Formularios página solução

// Formulário do simulador da página Solução
const formSimuladorSolucao = document.querySelector("#formSimuladorSolucao");
const tipoDesastreSolucao = document.querySelector("#tipoSolucao");
const chuvaSolucao = document.querySelector("#chuvaSolucao");
const pessoasSolucao = document.querySelector("#pessoasSolucao");

const resultadoSolucao = document.querySelector("#resultadoSolucao");
const nivelSolucao = document.querySelector("#nivelSolucao");
const textoSolucao = document.querySelector("#textoSolucao");
const chamadaSolucao = document.querySelector("#chamadaSolucao");

if (formSimuladorSolucao) {
    formSimuladorSolucao.addEventListener("submit", function (event) {
        event.preventDefault();

        let tipoDesastre = tipoDesastreSolucao.value;
        let chuva = Number(chuvaSolucao.value);
        let pessoas = Number(pessoasSolucao.value);

        let pontosChuva = chuva * 0.6;
        let pontosPessoas = pessoas / 100;

        if (pontosPessoas > 40) {
            pontosPessoas = 40;
        }

        let pontuacao = pontosChuva + pontosPessoas;
        pontuacao = Math.round(pontuacao);

        if (pontuacao > 100) {
            pontuacao = 100;
        }

        let nivel = "";
        let classe = "";
        let mensagem = "";

        if (pontuacao <= 30) {
            nivel = "Baixo";
            classe = "baixo";
            mensagem = "Risco baixo no momento. Continue acompanhando a situação.";
        } else if (pontuacao <= 60) {
            nivel = "Atenção";
            classe = "atencao";
            mensagem = "Risco moderado. Fique atento às próximas atualizações.";
        } else if (pontuacao <= 85) {
            nivel = "Alerta";
            classe = "alerta";
            mensagem = "Risco alto. Evite áreas perigosas e acompanhe os avisos.";
        } else {
            nivel = "Emergência";
            classe = "emergencia";
            mensagem = "Risco muito alto. Procure um local seguro imediatamente.";
        }

        resultadoSolucao.className = "resultado-solucao " + classe;
        nivelSolucao.className = "nivel-resultado " + classe;

        nivelSolucao.textContent = nivel;
        textoSolucao.textContent = "Pontuação: " + pontuacao + " pontos. " + mensagem;
        chamadaSolucao.textContent = "Gostaria de receber alertas sobre sua região? Cadastre seu contato no formulário ao lado.";
    });
}

// Formulário de cadastro de alertas
const formCadastroAlerta = document.querySelector("#formCadastroAlerta");
const nomeAlerta = document.querySelector("#nomeAlerta");
const telefoneAlerta = document.querySelector("#telefoneAlerta");
const bairroAlerta = document.querySelector("#bairroAlerta");
const cadastroFeedback = document.querySelector("#cadastroFeedback");
const cadastroTexto = document.querySelector("#cadastroTexto");
const desfazerCadastro = document.querySelector("#fecharCadastro");

if (formCadastroAlerta) {
    formCadastroAlerta.addEventListener("submit", function (event) {
        event.preventDefault();

        let formularioValido = true;
        let numerosTelefone = telefoneAlerta.value.replace(/\D/g, "");

        limparErro(nomeAlerta);
        limparErro(telefoneAlerta);
        limparErro(bairroAlerta);

        if (cadastroFeedback) {
            cadastroFeedback.classList.remove("ativo");
        }

        if (nomeAlerta.value.trim() === "" || nomeAlerta.value.trim().length < 10) {
            mostrarErro(nomeAlerta, "Preencha o seu nome.");
            formularioValido = false;
        }

        if (numerosTelefone.length < 10 || numerosTelefone.length > 11) {
            mostrarErro(telefoneAlerta, "Digite um telefone válido com DDD.");
            formularioValido = false;
        }

        if (bairroAlerta.value.trim() === "" || bairroAlerta.value.trim().length < 3) {
            mostrarErro(bairroAlerta, "Digite um bairro para sabermos a região.");
            formularioValido = false;
        }

        if (formularioValido === false) {
            return;
        }

        let canalSelecionado = document.querySelector("input[name='canalAlerta']:checked");
        let canal = canalSelecionado.value;

        canal = canal.toUpperCase();

        if (cadastroTexto) {
            cadastroTexto.textContent = "Você vai receber alertas de " + bairroAlerta.value + " por " + canal + ".";
        }

        if (cadastroFeedback) {
            cadastroFeedback.classList.add("ativo");
        }

        formCadastroAlerta.reset();
    });
}

if (desfazerCadastro) {
    desfazerCadastro.addEventListener("click", function () {
        if (cadastroFeedback) {
            cadastroFeedback.classList.remove("ativo");
        }
    });
}
