const { Usuario: UsuarioModel, Usuario } = require("../models/Usuario");

const usuarioController = {
  // Cadastrar Usuário
  create: async (req, res) => {
    try {
      const usuario = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        pontuacao: req.body.pontuacao,
      };

      const response = await UsuarioModel.create(usuario);

      res
        .status(201)
        .json({ response, success: true, msg: "Usuario cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  // Listar Usuários
  getAll: async (req, res) => {
    try {
      const usuarios = await UsuarioModel.find();

      res.json({usuarios: usuarios, success: true});
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {

        const id = req.params.id
        const usuario = await UsuarioModel.findOne({login: id})

        if(!usuario) {
            res.status(404).json({msg: "Usuário não encontrado!", success: false});
            return
        }

        res.json({usuario: usuario, success: true});

    } catch (error) {
      console.log(error);
    }
  },
  delete: async(req, res) => {
    try {

        const id = req.params.id
        const usuario = await UsuarioModel.findById(id)

        if(!usuario) {
            res.status(404).json({msg: "Usuário não encontrado!"});
            return
        }

        const deleteUsuario = await UsuarioModel.findByIdAndDelete(id)

        res.status(200).json({deleteUsuario,success: true, msg: "Usuário excluído com sucesso!"});

    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {

    const id = req.params.id

    const usuario = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        pontuacao: req.body.pontuacao,
      };

      const updatedUsuario = await UsuarioModel.findByIdAndUpdate(id, usuario);

      if(!updatedUsuario) {
        res.status(404).json({msg: "Usuário não encontrado!"});
        return
    }

    res.status(200).json({usuario, success: true, msg: "Usuário atualizado com sucesso!"})

  }
};

module.exports = usuarioController;
