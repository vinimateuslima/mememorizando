const input = document.querySelector(".login_input");
const senha = document.querySelector(".login_senha");
const button = document.querySelector(".login_button");
const form = document.querySelector(".login-form");
let inputs = document.querySelectorAll("input");
let player = localStorage.getItem("player");
const urlPadrao = "https://mememorizando.herokuapp.com";

console.log(player);

// Função para verificar se o usuário ja está logado, se sim, não poderá realizar o login novamente
if (player) {
  if (player != "") {
    async function redirecionamento() {
      let timerInterval;
      await Swal.fire({
        title: "Você ja está logado!",
        html: "Será redirecionado...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 2000);
        },
        willClose: () => {
          clearInterval(timerInterval);
          window.location = `${urlPadrao}/pages/game.html` || "http://localhost:3000/pages/game.html";
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("Eu fechei sozinho");
        }
      });
    }

    redirecionamento();
  }
}

// Função para verificar se algum campo está preenchido com mais de 3 caracteres
const validarInput = () => {
  let inputsValidos = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length > 3) {
      inputsValidos++;
    }
  }

  if (inputsValidos == inputs.length) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }

  console.log(inputsValidos);
};

const loginForm = (event) => {
  event.preventDefault();

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: input.value,
      senha: senha.value,
    }),
  };

  fetch(`${urlPadrao}/api/usuarioLogin` || "http://localhost:3000/api/usuarioLogin", options)
    .then((response) => response.json())
    .then(async (response) => {
      if (response.success != true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.msg,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        await Toast.fire({
          icon: "success",
          title: "Logado com sucesso",
        });

        input.value = "";
        senha.value = "";
        localStorage.setItem("player", response.usuario.login);
        localStorage.setItem("id", response.usuario._id);
        window.location = "../pages/game.html";
      }
    })
    .catch((err) => console.error(err));
};

input.addEventListener("input", validarInput);
senha.addEventListener("input", validarInput);
form.addEventListener("submit", loginForm);
