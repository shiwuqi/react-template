const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')

// 生成token
const setToken = function(account, id) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign({
      account,
      id
    }, secret, { expiresIn: '2h' }, function(err, token) {
      if (err) {
        reject(err)
      }
      resolve(token)
    });
  })
}

// 解析token
const verToken = function(token) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token.split(' ')[1], secret, function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data);
    });
  })
}

module.exports = {
  setToken,
  verToken
}