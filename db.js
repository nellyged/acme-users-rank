const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

const User = conn.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  bio: Sequelize.TEXT,
  rank: Sequelize.INTEGER,
});

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      User.create({ name: 'Moe', bio: 'CEO of Amce', rank: 1 }),
      User.create({ name: 'Larry', bio: 'CTO of Acme', rank: 2 }),
      User.create({ name: 'Curly', bio: 'CFO of Acme', rank: 3 }),
    ]);
  });
};

module.exports = {
  User,
  syncAndSeed,
};
