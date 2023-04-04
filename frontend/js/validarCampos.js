
function validarCampos(classeCampos) {
  let campoVazio = false;

  //Recuperando classe dos inputs do formulário
  let inputs = document.querySelectorAll(classeCampos);

  //Removendo o atributo de erro dos inputs
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-invalid");
  }

  //Verificando se algum campo está vazio
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "" || inputs[i].value.length < 4) {
      inputs[i].classList.add("is-invalid");
      campoVazio = true;
    }
  }

  return campoVazio;
}