const selecionarTudo = document.querySelector("#selecionarTodos");

const mudaSelecionarTudo = evento => {
  const todosOsCheckboxes = document.querySelectorAll("input[name='tCur']");

  todosOsCheckboxes.forEach(checkbox => {
    if (evento.target.checked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    const event = new Event("change");
    checkbox.dispatchEvent(event);
  });
};

selecionarTudo.addEventListener("change", mudaSelecionarTudo);

/*
  Calcula a carga horária dos cursos
 */

const cargaHorariaTotal = document.querySelector("#cQH");
const checkboxesCargaHoraria = document.querySelectorAll("input[name='tCur']");

const calcularCargaHorariaTotal = () => {
  let soma = 0;

  checkboxesCargaHoraria.forEach(checkbox => {
    if (checkbox.checked) {
      soma += parseInt(checkbox.dataset.cargaHoraria, 10);
    }
  });

  document.getElementById("cQH").setAttribute("value", soma);
};

checkboxesCargaHoraria.forEach(checkbox => {
  checkbox.addEventListener("change", calcularCargaHorariaTotal);
});

/*
  Calcula a quantidade de cursos
 */

const calcularQuantidade = () => {
  let contagemSelecionados = 0;

  checkboxesCargaHoraria.forEach(checkbox => {
    if (checkbox.checked) {
      contagemSelecionados++;
    }
  });

  document.getElementById("cQuant").setAttribute("value", contagemSelecionados);
};

checkboxesCargaHoraria.forEach(checkbox => {
  checkbox.addEventListener("change", calcularQuantidade);
});

/*
  Calcula a previsão de formatura
 */

const radiosFrequencia = document.querySelectorAll("input[name='freqs']");

const calcularFormatura = () => {
  let horasTotais = 0;
  checkboxesCargaHoraria.forEach(checkbox => {
    if (checkbox.checked) {
      horasTotais += parseInt(checkbox.dataset.cargaHoraria, 10);
    }
  });

  let frequencia;
  radiosFrequencia.forEach(radio => {
    if (radio.checked) {
      frequencia = parseInt(radio.value, 10);
    }
  });

  const horasDiarias = 4;
  const semanas = horasTotais / (horasDiarias * frequencia);
  moment.locale("pt-br");
  const dataDeFormatura = moment()
    .add(semanas, "weeks")
    .format("LL");

  document.getElementById("cFormatura").setAttribute("value", dataDeFormatura);
};

checkboxesCargaHoraria.forEach(checkbox => {
  checkbox.addEventListener("change", calcularFormatura);
});

radiosFrequencia.forEach(checkbox => {
  checkbox.addEventListener("change", calcularFormatura);
});

/*
  Calcula a preço
 */

const calcularPreco = () => {
  let precoTotal = 0;

  checkboxesCargaHoraria.forEach(checkbox => {
    if (checkbox.checked) {
      precoTotal += parseInt(checkbox.dataset.preco, 10);
    }
  });

  document.getElementById("cTot").setAttribute("value", `R$ ${precoTotal}`);
};

checkboxesCargaHoraria.forEach(checkbox => {
  checkbox.addEventListener("change", calcularPreco);
});

/*
  Validar o formulário
 */

const formulario = document.getElementById("formulario-inscricao");

const validarDataDeNascimento = campoDataDeNascimento => {
  const dataDeNascimento = moment(campoDataDeNascimento.value);
  if (dataDeNascimento >= moment().subtract(15, "years")) {
    campoDataDeNascimento.style.border = "1px solid #D12E41";
    const elementoErro = document.createElement("div");
    const textoErro = document.createTextNode("Você deve ser maior de 15 anos para se cadastrar");
    elementoErro.style.color = "#D12E41";
    elementoErro.style.fontSize = "0.688rem";
    elementoErro.appendChild(textoErro);
    campoDataDeNascimento.parentElement.prepend(elementoErro);
  }
};

const validarFormulario = evento => {
  evento.preventDefault();
  const campoData = document.querySelector("#cNasc");

  if (campoData.value === "") {
    evento.target.submit();
  } else {
    validarDataDeNascimento(campoData);
  }
};

formulario.addEventListener("submit", validarFormulario);
