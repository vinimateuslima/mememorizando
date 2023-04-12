// Função que exibe mensagem de boas vindas e ao clicar em ok toca o áudio
const boasVindas = async () => {
   Swal.fire({
    title: `Bem vindo a página de Ranking!`,
    confirmButtonText: 'OK',
    confirmButtonColor: '#ee665c',
  }).then(() => {
    const campeao = new Audio("../src/audios/ranking.mp3");
    campeao.play();
    campeao.volume = 0.1;
    campeao.loop = true;
  });
}

boasVindas();
 
// Pegando os elementos do ranking
let primeiro = document.querySelector(".primeiro");
let segundo = document.querySelector(".segundo");
let terceiro = document.querySelector(".terceiro");
const urlPadrao = "https://mememorizando.herokuapp.com"
// Recuperando o JSON das coletas através do método GET
const options = { method: "GET" };

fetch(`${urlPadrao}/api/usuarios`, options)
  .then((response) => response.json())
  .then((response) => {
    // Dados para popular a tabela
    const dados = [];

    console.log(response.usuarios);

    if (response.usuarios == "") {
      alert("Não há ranking no momento!");
    } else {
      // Percorrendo o objeto response.dados e atribuindo um array dentro do array dados
      for (let i = 0; i < response.usuarios.length; i++) {
        // Verificando se a pontuação é maior que zero pois significa que não é usuário novo
          dados[i] = [response.usuarios[i].login, response.usuarios[i].pontuacao]; 
      }

      // Atribuindo os 3 melhores ao top 3
      primeiro.innerHTML = dados[0][0];
      segundo.innerHTML = dados[1][0];
      terceiro.innerHTML = dados[2][0];

      console.log(dados);

      // Função para criar uma Tag Ex: <tr>, <td>
      function criarTag(elemento) {
        return document.createElement(elemento);
      }

      // Criando a tabela
      let tabela = document.getElementById("tbl-ranking");
      let thead = criarTag("thead");
      let tbody = criarTag("tbody");

      let indicesTabela = ["Nome", "Menor tempo"];
      let linhaHead = criarTag("tr");

      // Função para criar uma celula Ex <th> + o texto
      function criarCelula(tag, text) {
        tag = criarTag(tag);
        tag.innerHTML = text;
        return tag;
      }

      // Percorrendo o indice das tabelas e atribuindo a tag <thead>
      for (let j = 0; j < indicesTabela.length; j++) {
        let th = criarCelula("th", indicesTabela[j]);
        linhaHead.appendChild(th);
      }
      thead.appendChild(linhaHead);

      // Percorrendo os dados e atribuindo as colunas e adicionando em cada linha
      for (let j = 0, linhaBody = ""; j < dados.length; j++) {
        linhaBody = criarTag("tr");
        if (j % 2 != 0) {
          linhaBody.setAttribute("class", "table-active");
        }

        for (let i = 0, cel = ""; i < dados[j].length; i++) {
          cel = criarCelula("td", dados[j][i]);
          linhaBody.appendChild(cel);
        }
        tbody.appendChild(linhaBody);
      }

      // Atribuindo as tags da tabela na tag <table>
      tabela.appendChild(thead);
      tabela.appendChild(tbody);
    }
  })
  .catch((err) => console.error(err));
/*}*/
