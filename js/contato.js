const formContato = document.getElementById("form-contato");
const statusContato = document.getElementById("contato-status");

if (formContato && statusContato) {
  formContato.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!formContato.checkValidity()) {
      statusContato.textContent = "Preencha todos os campos corretamente.";
      statusContato.className = "contato-status contato-status--erro";
      formContato.reportValidity();
      return;
    }

    const botaoEnviar = formContato.querySelector(".btn-enviar");
    const dadosFormulario = new FormData(formContato);

    statusContato.textContent = "Enviando mensagem...";
    statusContato.className = "contato-status";
    botaoEnviar.disabled = true;

    try {
      const resposta = await fetch(formContato.action, {
        method: "POST",
        body: dadosFormulario,
        headers: {
          Accept: "application/json",
        },
      });

      if (!resposta.ok) {
        throw new Error("Erro ao enviar formulario.");
      }

      statusContato.textContent = "Mensagem enviada com sucesso!";
      statusContato.className = "contato-status contato-status--sucesso";
      formContato.reset();
    } catch (erro) {
      statusContato.textContent = "Nao foi possivel enviar agora. Tente novamente em instantes.";
      statusContato.className = "contato-status contato-status--erro";
    } finally {
      botaoEnviar.disabled = false;
    }
  });

  formContato.addEventListener("reset", () => {
    statusContato.textContent = "";
    statusContato.className = "contato-status";
  });
}
