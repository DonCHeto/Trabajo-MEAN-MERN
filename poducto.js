const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Cambia esto según tu configuración
  password: '123456',
  database: 'dbnode'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD

// Obtener todos los productos
app.get('/api/producto', (req, res) => {
  const sql = 'SELECT * FROM poducto';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo producto
app.post('/api/producto', (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  const sql = 'INSERT INTO poducto (nombre, precio, cantidad) VALUES (?, ?, ?)';
  db.query(sql, [nombre, precio, cantidad], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, nombre, precio, cantidad });
  });
});

// Actualizar un producto
app.put('/api/producto/:id', (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE poducto SET nombre = ?, precio = ?, cantidad = ? WHERE idpoducto = ?';
  db.query(sql, [nombre, precio, cantidad, id], (err, result) => {
    if (err) throw err;
    res.send({ id, nombre, precio, cantidad });
  });
});

// Eliminar un producto
app.delete('/api/producto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM poducto WHERE idpoducto = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Poducto eliminado', id });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
