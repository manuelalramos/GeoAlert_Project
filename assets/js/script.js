// FAQ

const faq1 = document.querySelector("#faq1");
const faq2 = document.querySelector("#faq2");
const faq3 = document.querySelector("#faq3");
const faq4 = document.querySelector("#faq4");

function abrirFecharFaq(item){
    item.classList.toggle("active");
}

if (faq1) {
  faq1.addEventListener("click", function () {
    abrirFecharFaq(faq1);
  });
}

if (faq2) {
  faq2.addEventListener("click", function () {
    abrirFecharFaq(faq2);
  });
}

if (faq3) {
  faq3.addEventListener("click", function () {
    abrirFecharFaq(faq3);
  });
}

if (faq4) {
  faq4.addEventListener("click", function () {
    abrirFecharFaq(faq4);
  });
}

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
