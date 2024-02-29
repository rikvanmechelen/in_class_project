var crypto = require('crypto');

const users = [
  {email:"rvanmech@pratt.edu",name:"Rik",salt:"a6d65a9f6d91db316326307838067929",encryptedPassword:"77018169f345e6967f5d618e1ceaccb404db0da57f62f0f70b526a11e9acee3c"}
]

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}


exports.all = users

exports.add = (user) => {
  let salt = createSalt();
  let new_user = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  users.push(new_user);
}


exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
}

exports.get = (idx) => {
  return users[idx];
}

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}

