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

  document.getElementById("cFormatura").setAttribute("value", `Em ${semanas} semanas`);
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
