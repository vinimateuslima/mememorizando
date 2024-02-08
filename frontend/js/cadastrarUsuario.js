let nome = document.getElementById("nome_input");
let login = document.getElementById("login_input2");
let senha = document.getElementById("senha_input");
let form = document.getElementById("form-cadastro");
let botao = document.getElementById("cadastrar_button");
let inputs = document.querySelectorAll("input");

//importando a url padrao
const urlPadrao = config();

// Verificando se algum campo está preenchido com mais de 3 caracteres
const validarInput = () => {
  let inputsValidos = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length > 3) {
      inputsValidos++;
    }
  }

  if (inputsValidos == inputs.length) {
    botao.removeAttribute("disabled");
  } else {
    botao.setAttribute("disabled", "");
  }

};

nome.addEventListener("input", validarInput);
login.addEventListener("input", validarInput);
senha.addEventListener("input", validarInput);

// Escutando o form para cadastrar o usuário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Recaptcha V3
  grecaptcha.ready(function () {
    var sitekey = document
      .getElementById("sitekey")
      .getAttribute("data-sitekey");

    grecaptcha.execute(sitekey, { action: "submit" }).then(function (token) {
    });
  });

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome.value,
      login: login.value,
      senha: senha.value,
      pontuacao: 0,
    }),
  };

  fetch(`${urlPadrao}/api/usuarios`, options)
    .then((response) => response.json())
    .then(async (response) => {
      if (response.success != true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.msg,
        });
      } else {
        await Swal.fire({
          title: `Login criado com sucesso`,
          icon: "success",
          confirmButtonText: "Ir para login",
          confirmButtonColor: "#ee665c",
          showCancelButton: true,
          cancelButtonText: `Fechar`,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "../index.html";
          }
        });

        nome.value = "";
        login.value = "";
        senha.value = "";
      }
    })
    .catch((err) => console.error(err));
});
