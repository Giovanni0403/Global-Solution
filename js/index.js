const botoesRespostaFinal = document.querySelectorAll(".resposta-final__botao");
const statusRespostaFinal = document.getElementById("resposta-final-status");

async function enviarRespostaFinal(respostaEscolhida) {
  const dados = new FormData();

  dados.append("_subject", "Resposta da pergunta final do site SkyLink");
  dados.append("_template", "table");
  dados.append("_captcha", "false");
  dados.append("pergunta", "Sua regiao esta preparada para o proximo desastre?");
  dados.append("resposta", respostaEscolhida);
  dados.append("pagina", "Home");

  const resposta = await fetch("https://formsubmit.co/ajax/giovanni.zavam2008@gmail.com", {
    method: "POST",
    body: dados,
    headers: {
      Accept: "application/json",
    },
  });

  if (!resposta.ok) {
    throw new Error("Erro ao enviar resposta.");
  }
}

if (botoesRespostaFinal.length && statusRespostaFinal) {
  botoesRespostaFinal.forEach((botao) => {
    botao.addEventListener("click", async () => {
      const respostaEscolhida = botao.dataset.resposta;

      statusRespostaFinal.textContent = "Enviando resposta...";
      statusRespostaFinal.className = "resposta-final__status";
      botoesRespostaFinal.forEach((item) => {
        item.disabled = true;
      });

      try {
        await enviarRespostaFinal(respostaEscolhida);
        statusRespostaFinal.textContent = `Resposta "${respostaEscolhida}" enviada com sucesso!`;
        statusRespostaFinal.className = "resposta-final__status resposta-final__status--sucesso";
      } catch (erro) {
        statusRespostaFinal.textContent = "Nao foi possivel enviar sua resposta agora.";
        statusRespostaFinal.className = "resposta-final__status resposta-final__status--erro";
      } finally {
        botoesRespostaFinal.forEach((item) => {
          item.disabled = false;
        });
      }
    });
  });
}
