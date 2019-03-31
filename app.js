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

//Used prof approach to capture each error and display
app.use((error, req, res, next) => {
  let errors = [error];
  if (error.errors) {
    errors = error.errors.map(error => error.message);
  } else if (error.original) {
    errors = [error.original.message];
  }
  res.status(error.status || 500).send({ errors });
});

module.exports = app;
