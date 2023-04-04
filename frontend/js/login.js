const input = document.querySelector(".login_input");
const senha = document.querySelector(".login_senha");
const button = document.querySelector(".login_button");
const form = document.querySelector(".login-form");
let inputs = document.querySelectorAll("input");

const validarInput = () => {
  //Verificando se algum campo está preenchido com mais de 3 caracteres
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
          nome: nome.value,
          login: login.value,
          senha: senha.value,
          pontuacao: 0,
        }),
      };
    
      fetch("http://localhost:3000/api/usuarios", options)
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success != true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Erro ao cadastrar login!",
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
              /* Read more about isConfirmed, isDenied below */
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
        
    localStorage.setItem("player", input.value);
    window.location = "pages/game.html";
  };

input.addEventListener("input", validarInput);
senha.addEventListener("input", validarInput);
form.addEventListener("submit", loginForm);
