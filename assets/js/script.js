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

// COntato

const formularioContato = document.querySelector("#formularioContato");

const formularioFeedback = document.querySelector("#formularioFeedback");


if(formularioContato){
    formularioContato.addEventListener("submit", (event) => {
    event.preventDefault();

    formularioFeedback.textContent = "Mensagem enviada com sucesso.";
    formularioFeedback.className = "form-feedback sucesso";

    formularioContato.reset();
    });
}
