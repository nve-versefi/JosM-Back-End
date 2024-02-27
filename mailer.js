const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config({ path: '../creds.env' });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const self = process.env.EMAIL_ACC
router.post('/enviar-correo', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions1 = {
    from: self,
    to: self,
    subject: 'Nuevo mensaje desde el formulario',
    html: `Nombre: ${name}<br>Correo: ${email}<br>Mensaje: ${message} <br>Telefono: ${phone}`,
  };

  const mailOptions2 = {
    from: self,
    to: email,
    subject: 'Confirmación de recepción de mensaje',
    html: `Gracias por contactar con nosotros, hemos recibido tu mensaje.`,
  };

  try {
    const [info1, info2] = await Promise.all([
      transporter.sendMail(mailOptions1),
      transporter.sendMail(mailOptions2),
    ]);
    res.status(200).json({ message: 'Correos enviados correctamente', info: [info1.response, info2.response] });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
module.exports = router;
