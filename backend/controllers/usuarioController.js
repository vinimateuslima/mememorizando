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
        banido: false
      };

      const buscarUsuario = await UsuarioModel.findOne({
        login: usuario.login,
      });

      if (buscarUsuario) {
        res.status(500).json({
          success: false,
          msg: "Usuario ja existente!",
        });
      } else {
        const response = await UsuarioModel.create(usuario);

        res.status(201).json({
          response,
          success: true,
          msg: "Usuario cadastrado com sucesso!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Listar Usuários
  getAll: async (req, res) => {
    try {
      // Buscando os usuários onde a pontuação é maior que 0 e não estão banidos
      const usuarios = await UsuarioModel.find().where('pontuacao').gt(0).where('banido').equals(false).sort({pontuacao: 1});


      res.json({ usuarios: usuarios, success: true });
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await UsuarioModel.findOne({ login: id });

      if (!usuario) {
        res
          .status(404)
          .json({ msg: "Usuário não encontrado!", success: false });
        return;
      }

      res.json({ usuario: usuario, success: true });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await UsuarioModel.findById(id);

      if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      const deleteUsuario = await UsuarioModel.findByIdAndDelete(id);

      res.status(200).json({
        deleteUsuario,
        success: true,
        msg: "Usuário excluído com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;

    const usuario = {
      nome: req.body.nome,
      login: req.body.login,
      senha: req.body.senha,
      pontuacao: req.body.pontuacao,
      banido: req.body.banido,
    };

    const updatedUsuario = await UsuarioModel.findByIdAndUpdate(id, usuario);

    if (!updatedUsuario) {
      res.status(404).json({ msg: "Usuário não encontrado!" });
      return;
    }

    res
      .status(200)
      .json({ usuario, success: true, msg: "Usuário atualizado com sucesso!" });
  },

  login: async (req, res) => {
 
    const usuario = {
      login: req.body.login,
      senha: req.body.senha,
    };

    // Verificando se o usuário existe
    const buscarUsuario = await UsuarioModel.findOne({
      login: usuario.login,
    });

    if (buscarUsuario) {
      if (buscarUsuario.banido == true) {
        res.status(403).json({
          usuario: buscarUsuario,
          success: false,
          msg: "Você está banido temporariamente!",
        });
        
        // Se o usuário existir, irá comprar as senhas
      } else if (buscarUsuario.senha == usuario.senha) {
        res.status(201).json({
          usuario: buscarUsuario,
          success: true,
          msg: "Login realizado com sucesso!",
        });
      } else {
        res.status(403).json({
          usuario: buscarUsuario,
          success: false,
          msg: "Senha inválida!",
        });
      }
    } else {
      res.status(500).json({
        usuario: usuario,
        success: false,
        msg: "Usuario não encontrado!",
      });
    }
  },
};

module.exports = usuarioController;
