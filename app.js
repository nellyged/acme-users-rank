const express = require('express');
const app = express();
const path = require('path');
const { User } = require('./db');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.post('/api/users', (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal Error Message');
});

module.exports = app;
