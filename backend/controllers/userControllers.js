const User = require("../models/usersModel");
const crypto = require("crypto"); //NPM CRYPTO
const nodemailer = require("nodemailer"); //NPM NODEMAILER
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = async (email, uniqueString) => {
  //FUNCION ENCARGADA DE ENVIAR EL EMAIL

  const transporter = nodemailer.createTransport({
    //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
    host: "smtp.gmail.com", //DEFINIMOS LO PARAMETROS NECESARIOS
    port: 465,
    secure: true,
    auth: {
      user: "testmindhub@gmail.com", //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
      pass: "Kevin123#", //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
    }, //CONFIGURACIONES DE GMAIL
  });

  // EN ESTA SECCION LOS PARAMETROS DEL MAIL
  let sender = "testmindhub@gmail.com";
  let mailOptions = {
    from: sender, //DE QUIEN
    to: email, //A QUIEN
    subject: "Verificacion de email usuario ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
    html: `
        <div >
        <h1 style="color:red">Presiona <a href=http://localhost:4000/api/verify/${uniqueString}>aqui</a> para confirma tu email. Gracias </h1>
        </div>
        `,
  };
  await transporter.sendMail(mailOptions, function (error, response) {
    //SE REALIZA EL ENVIO
    if (error) {
      console.log(error);
    } else {
      console.log("Mensaje enviado");
    }
  });
};

const usersControllers = {
  verifyEmail: async (req, res) => {
    const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK
    const user = await User.findOne({ uniqueString: uniqueString });
    console.log(user); //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
    if (user) {
      user.emailVerificado = true; //COLOCA EL CAMPO emailVerified en true
      await user.save();
      res.redirect("http://localhost:3000/"); //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
      //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
    } else {
      res.json({ success: false, response: "Su email no se ha verificado" });
    }
  },
  signUpUsers: async (req, res) => {
    let { fullName, email, password, country, picture, from } =
      req.body.userData;

    try {
      const usuarioExiste = await User.findOne({ email }); //BUSCAR SI EL USUARIO YA EXISTE EN DB
      if (usuarioExiste) {
        if (usuarioExiste.from.indexOf(from) !== -1) {
          console.log(
            "resultado de if " + (usuarioExiste.from.indexOf(from) === 0)
          ); //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE -1 NO EXITE EQ A FALSE
          res.json({
            success: false,
            from: "signup",
            message:
              "Ya has realizado tu SignUp de esta forma por favor realiza SignIn",
          });
        } else {
          const contraseñaHasheada = bcryptjs.hashSync(password, 10);
          usuarioExiste.from.push(from);
          usuarioExiste.password.push(contraseñaHasheada);
          if (from === "form-Signup") {
            //PORSTERIORMENTE AGREGAREMOS LA VERIFICACION DE EMAIL
            await usuarioExiste.save();
            await sendEmail(email, nuevoUsuario.uniqueString);
            res.json({
              success: true,
              from: "signup",
              message:
                "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp y agregarlo a tus metodos de SignIN ",
            });
          } else {
            usuarioExiste.save();
            res.json({
              success: true,
              from: "signup",
              message:
                "Agregamos " + from + " a tus medios para realizar signIn",
            });
          }
        }
      } else {
        //SI EL USUARIO NO ESXITE

        const contraseñaHasheada = bcryptjs.hashSync(password, 10); //LO CREA Y ENCRIPTA LA CONTRASEÑA
        console.log(contraseñaHasheada);
        // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
        const nuevoUsuario = await new User({
          fullName,
          email,
          password: [contraseñaHasheada],
          emailVerificado: false,
          country,
          picture,
          uniqueString: crypto.randomBytes(15).toString("hex"),
          from: [from],
        });

        //SE LO ASIGNA AL USUARIO NUEVO
        if (from !== "form-Signup") {
          //SI LA PETICION PROVIENE DE CUENTA GOOGLE
          await nuevoUsuario.save();
          res.json({
            success: true,
            from: "signup",
            message: "Felicitaciones se ha creado tu usuario con " + from,
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        } else {
          //PASAR EMAIL VERIFICADO A FALSE
          //ENVIARLE EL E MAIL PARA VERIFICAR
          await nuevoUsuario.save();
          await sendEmail(email, nuevoUsuario.uniqueString);
          res.json({
            success: true,
            from: "signup",
            message:
              "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp ",
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo a salido mal intentalo en unos minutos",
      }); //CAPTURA EL ERROR
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.loggedUser;
    console.log(req.body.loggedUser);
    try {
      const usuarioExiste = await User.findOne({ email });
      console.log(from);
      console.log(usuarioExiste.from.indexOf(from));

      if (!usuarioExiste) {
        // PRIMERO VERIFICA QUE EL USUARIO EXISTA
        res.json({
          success: false,
          message: "Tu usuarios no ha sido registrado realiza signUp",
        });
      } else {
        if (from !== "form-Signup") {
          let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );

          if (contraseñaCoincide.length > 0) {
            const userData = {
              id: usuarioExiste._id,
              fullName: usuarioExiste.fullName,
              email: usuarioExiste.email,
              picture: usuarioExiste.picture,
              from: usuarioExiste.from,
            };
            await usuarioExiste.save();
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24,
            });

            res.json({
              success: true,
              from: from,
              response: { token, userData },
              message: "Bienvenido nuevamente " + userData.fullName,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "No has realizado el registro con " +
                from +
                "si quieres ingresar con este metodo debes hacer el signUp con " +
                from,
            });
          }
        } else {
          if (usuarioExiste.emailVerificado) {
            console.log(usuarioExiste.from.indexOf(from));

            let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );

            if (contraseñaCoincide.length > 0) {
              const userData = {
                id: usuarioExiste._id,
                fullName: usuarioExiste.fullName,
                email: usuarioExiste.email,
                picture: usuarioExiste.picture,
                from: usuarioExiste.from,
              };
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                success: true,
                from: from,
                response: { token, userData },
                message: "Bienvenido nuevamente " + userData.fullName,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "El usuario o el password no coinciden",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "No has verificado tu email, por favor verifica ti casilla de emails para completar tu signUp",
            });
          }
        } //SI NO ESTA VERIFICADO
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo a salido mal intentalo en unos minutos",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json(console.log("sesion cerrada " + email));
  },
  verificarToken: (req, res) => {
    console.log(req.user);
    if (!req.err) {
      res.json({
        success: true,
        response: {
          id: req.user.id,
          fullName: req.user.fullName,
          email: req.user.email,
          picture: req.user.picture,

          from: "token",
        },
        message: "Bienvenido nuevamente " + req.user.fullName,
      });
    } else {
      res.json({
        success: false,
        message: "Por favor realiza nuevamente signIn",
      });
    }
  },
};
module.exports = usersControllers;