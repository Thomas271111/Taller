require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const usuarios = [
  {
    username: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASS,
    role: 'ADMIN'
  },
  {
    username: process.env.NORMAL_USER,
    password: process.env.NORMAL_PASS,
    role: 'USER'
  }
];

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Servidor funcionando correctamente'
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Debes enviar username y password'
    });
  }

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.username === username && usuario.password === password;
  });

  if (!usuarioEncontrado) {
    return res.status(400).json({
      message: 'Invalid credentials'
    });
  }

  return res.status(200).json({
    message: 'Login successful',
    role: usuarioEncontrado.role
  });
});

app.get('/request', (req, res) => {
  const role = req.headers.role;

  if (role === 'ADMIN') {
    return res.status(200).json({
      message: 'Hi, from ADMIN'
    });
  }

  if (role === 'USER') {
    return res.status(200).json({
      message: 'Hi, from USER'
    });
  }

  return res.status(401).json({
    message: "You're not allowed to do this"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});