const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const ganhou = new Audio("../src/audios/ganhou.mp3");
let player = localStorage.getItem("player");

const personagens = [
  "estevao",
  "aipai",
  "caneta",
  "miseravi",
  "jubileu",
  "tiringa",
  "freeza",
  "tulla",
  "luva",
];

// Função para redirecionar o usuário caso não esteja logado
async function redirecionamento() {
  let timerInterval;
  await Swal.fire({
    title: "Você precisa realizar o login!",
    html: "Será redirecionado...",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {}, 2000);
    },
    willClose: () => {
      clearInterval(timerInterval);
      window.location = "http://localhost:3000";
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("Eu fechei sozinho");
    }
  });
}

// Verificando se possui algum player no localstorage
if (player) {
  if (player == "") {
    redirecionamento();
  }
} else {
  redirecionamento();
}

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

// Função para salvar os pontos no banco de dados
const salvarPontos = () => {
  const id = localStorage.getItem("id");

  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pontuacao: timer.innerHTML,
    }),
  };

  fetch("http://localhost:3000/api/usuarios/" + id, options)
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
          title: `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`,
          icon: "success",
          confirmButtonText: "Ver Ranking",
          confirmButtonColor: "#ee665c",
          showCancelButton: true,
          cancelButtonText: `Jogar Novamente`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.open(`http://localhost:3000/pages/ranking.html`);
          } else {
            location.reload();
          }
        });
      }
    })
    .catch((err) => console.error(err));
};

// Função para checar se o jogo chegou no final
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length == 18) {
    clearInterval(this.loop);
    setTimeout(() => {
      ganhou.play();
    }, 1000);
    salvarPontos();
  }
};

// Função para checar se as cartas viradas são iguais, se sim, são desativadas e tocam o áudio
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-personagem");
  const secondCharacter = secondCard.getAttribute("data-personagem");

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    const audio = new Audio(`../src/audios/${firstCharacter}.mp3`);

    audio.play();

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// Função para revelar o card ao clicar
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard == "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard == "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

// Função para criar os cards com seus atributos
const createCard = (personagem) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../src/images/${personagem}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-personagem", personagem);

  return card;
};

// Função para ao carregar o jogo embaralhar os personagens e criar os cards
const loadGame = () => {
  const duplicarPersonagem = [...personagens, ...personagens];

  const embaralharArray = duplicarPersonagem.sort(() => Math.random() - 0.5);

  embaralharArray.forEach((personagem) => {
    const card = createCard(personagem);
    grid.appendChild(card);
  });
};

// Função para iniciar o contador
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML;
    timer.innerHTML = currentTimer + 1;
  }, 1000);
};

// Chamando a função do contador e a função de carregar o jogo
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};

// Função de deslogar onde limpa o usuário do local storage e direciona para a página principal
const deslogar = () => {
  localStorage.clear();
  window.location = "http://localhost:3000";
};
