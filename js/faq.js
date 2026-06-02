const perguntasFaq = document.querySelectorAll(".faq__pergunta");

function prepararFaq() {
  perguntasFaq.forEach((pergunta, indice) => {
    const textoPergunta = pergunta.textContent.trim();
    const resposta = pergunta.nextElementSibling;
    const botao = document.createElement("button");
    const respostaAberta = indice === 0;

    botao.className = "faq__botao";
    botao.type = "button";
    botao.textContent = textoPergunta;
    botao.setAttribute("aria-expanded", String(respostaAberta));

    pergunta.textContent = "";
    pergunta.appendChild(botao);

    if (resposta?.classList.contains("faq__resposta")) {
      resposta.hidden = !respostaAberta;
    }

    pergunta.classList.toggle("faq__pergunta--fechada", !respostaAberta);
  });
}

function alternarFaq(botaoSelecionado) {
  const perguntaSelecionada = botaoSelecionado.closest(".faq__pergunta");
  const respostaSelecionada = perguntaSelecionada?.nextElementSibling;
  const vaiAbrir = botaoSelecionado.getAttribute("aria-expanded") !== "true";

  perguntasFaq.forEach((pergunta) => {
    const botao = pergunta.querySelector(".faq__botao");
    const resposta = pergunta.nextElementSibling;

    botao?.setAttribute("aria-expanded", "false");
    pergunta.classList.add("faq__pergunta--fechada");

    if (resposta?.classList.contains("faq__resposta")) {
      resposta.hidden = true;
    }
  });

  botaoSelecionado.setAttribute("aria-expanded", String(vaiAbrir));
  perguntaSelecionada?.classList.toggle("faq__pergunta--fechada", !vaiAbrir);

  if (respostaSelecionada?.classList.contains("faq__resposta")) {
    respostaSelecionada.hidden = !vaiAbrir;
  }
}

if (perguntasFaq.length) {
  prepararFaq();

  document.querySelectorAll(".faq__botao").forEach((botao) => {
    botao.addEventListener("click", () => alternarFaq(botao));
  });
}
