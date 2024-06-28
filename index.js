let ultimoElementoFocado;

function gerenciarFocoModal(modalId) {
  const modal = document.getElementById(`${modalId}`);
  const elementosModal = modal.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const primeiroElemento = elementosModal[0];
  const ultimoElemento = elementosModal[elementosModal.length - 1];

  primeiroElemento.focus();

  let a;
  let b;

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === primeiroElemento) {
          event.preventDefault();
          ultimoElemento.focus();
        }
      } else {
        if (
          document.activeElement === ultimoElemento ||
          !modal.contains(document.activeElement)
        ) {
          event.preventDefault();
          primeiroElemento.focus();
        }
      }
    }
  });
}

function alternarModal(modalId, abrir) {
  const modal = document.querySelector(`#${modalId}`);

  if (abrir) {
    ultimoElementoFocado = document.activeElement;

    modal.style.display = "block";
    gerenciarFocoModal(modalId);
    document.body.style.overflow = "hidden";
  } else {
    modal.style.display = "none";
    document.body.style.overflow = "auto";

    if (ultimoElementoFocado) {
      ultimoElementoFocado.focus();
    }
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    alternarModal("ver-modal-inscrito", false);
    alternarModal("ver-modal-contato", false);
    alternarModal("ver-modal-enviado", false);

    document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
      alternarSubmenu(item, false);
    });
  }
});

function alternarSubmenu(item, mostrar) {
  const submenu = item.querySelector(".submenu");

  if (submenu) {
    submenu.style.display = mostrar ? "block" : "none";

    const menuItem = item.querySelector(".cabecalho__lista-item a");
    menuItem.setAttribute("aria-expanded", mostrar ? true : false);

    const DripdownExpandedIcon = item.querySelector(
      ".material-symbols-outlined.icone"
    );

    DripdownExpandedIcon.classList.toggle("active");
  }
}

// Selecionar todos os cabecalho__lista-item
document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
  // Adicionar um ouvinte de evento mouseover
  item.addEventListener("mouseover", () => alternarSubmenu(item, true));

  // Adicionar um ouvinte mouseout
  item.addEventListener("mouseout", () => alternarSubmenu(item, false));

  // Adicionar evento de click
  item.addEventListener("click", () => {
    const submenu = item.querySelector(".submenu");

    const isDisplayed = submenu.style.display !== "block";

    alternarSubmenu(item, isDisplayed);
  });
});

// Acordion

document.querySelectorAll(".botao-acordeao").forEach((botao) => {
  botao.addEventListener("click", () => alternarAcordeao(botao));
});

function alternarAcordeao(btn) {
  const isAlreadyOpen = btn.getAttribute("aria-expanded") === "true";

  document.querySelectorAll(".botao-acordeao").forEach((botao) => {
    botao.setAttribute("aria-expanded", "false");

    const conteudo = botao.nextElementSibling;
    conteudo.classList.remove("expandido");
    conteudo.setAttribute("aria-hidden", "true");
  });

  if (!isAlreadyOpen) {
    const conteudo = btn.nextElementSibling;
    conteudo.classList.add("expandido");
    btn.setAttribute("aria-expanded", "true");
    conteudo.setAttribute("area-hidden", "false");
  }
}
