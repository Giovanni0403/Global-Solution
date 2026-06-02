const botaoMenu = document.querySelector(".menu-hamburguer");
const menuPrincipal = document.getElementById("menu-principal");

function fecharMenuResponsivo() {
  if (!botaoMenu || !menuPrincipal) {
    return;
  }

  menuPrincipal.classList.remove("ativo");
  botaoMenu.classList.remove("ativo");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

if (botaoMenu && menuPrincipal) {
  botaoMenu.addEventListener("click", () => {
    const menuAberto = menuPrincipal.classList.toggle("ativo");

    botaoMenu.classList.toggle("ativo", menuAberto);
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
  });

  menuPrincipal.querySelectorAll(".cabecalho__link").forEach((link) => {
    link.addEventListener("click", fecharMenuResponsivo);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      fecharMenuResponsivo();
    }
  });
}
