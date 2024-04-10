const db = require('../database')
var crypto = require('crypto');

// const users = [
//   {email:"rvanmech@pratt.edu",name:"Rik",salt:"a6d65a9f6d91db316326307838067929",encryptedPassword:"77018169f345e6967f5d618e1ceaccb404db0da57f62f0f70b526a11e9acee3c"}
// ]

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}


exports.add = async (user) => {
  const salt = createSalt();
  const encryptedPassword = encryptPassword(user.password, salt)
  return db.getPool()
    .query("INSERT INTO users(email, name, salt, password) VALUES($1, $2, $3, $4) RETURNING *",
      [user.email, user.name, salt, encryptedPassword])
}


exports.getByEmail = async (email) => {
  const { rows } = await db.getPool().query("select * from users where email = $1", [email])
  return db.camelize(rows)[0]
}

exports.login = async (login) => {
  let user = await exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.password === encryptedPassword) {
    return user;
  }
  return null;
}

