const form = document.querySelector("#formulario-contato");
form.addEventListener("submit", mostrarMensagem);

function mostrarMensagem(evento) {
  evento.preventDefault();

  const section = document.querySelector(".main");

  const elementosExistente = document.querySelectorAll(".sucesso").forEach(function(elemento) {
    elemento.parentNode.removeChild(elemento);
  });

  const elementoMensagem = document.createElement("div");
  const textoMensagem = document.createTextNode("Mensagem enviada com sucesso!");
  elementoMensagem.setAttribute("class", "sucesso");
  elementoMensagem.appendChild(textoMensagem);

  section.appendChild(elementoMensagem);

  form.reset();
}
