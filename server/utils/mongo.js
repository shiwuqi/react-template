const { MongoClient } = require('mongodb')
const { MongoUrl } = require('../config')

class ConnectMongo {
  constructor() {
    this.url = MongoUrl
    this.db
    this.open()
  }
  open() { // 连接数据库
    const _this = this
    MongoClient.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) {
      if (err) {
        return console.dir('数据库连接失败：' + err)
      }
      _this.db = db.db('test')
      console.log('数据库连接成功！')
    })
  }
  /**
   * @description 连接表、集合
   * @param {string}table 表名
   * @param {function}cb 回调函数
   */
  connect(table, cb) {
    this.db.collection(table, function(err, result) {
      cb && cb (err, result)
    })    
  }
  /**
   * @description 插入单个数据
   * @param {string}table 表名 
   * @param {any}data 要插入的数据
   */
  insert(table, data) {
    return new Promise((resolve, reject) => {
      this.connect(table, function(err, result) {
        if (err) {
          throw err
        } else {
          result.insertOne(data, function(err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        }
      })
    })
  }

  /**
   * @description 查询单个数据
   * @param {string}table 表名 
   * @param {any}data 要查询的数据 
   */
  find(table, data) {
    return new Promise((resolve, reject) => {
      this.connect(table, function(err, result) {
        if (err) {
          throw err
        } else {
          result.find(data).toArray(function(err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        }
      })
    })
  }

  /**
   * @description 更新数据
   * @param {string}table 表名
   * @param {any}condition 查询条件
   * @param {any}data 要更新的数据
   * @param {any}multi 是否更新所有记录 
   */
  update(table, condition, data, multi) {
    return new Promise((resolve, reject) => {
      this.connect(table, function(err, result) {
        if (err) {
          throw err
        } else {
          result.update(condition, data, { multi }, function(err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        }
      })
    })
  }

  /**
   * @description 删除单个数据
   * @param {string}table 表名 
   * @param {any}data 要删除的数据条件
   */
  deleteOne(table, data) {
    return new Promise((resolve, reject) => {
      this.connect(table, function(err, result) {
        if (err) {
          throw err
        } else {
          result.deleteOne(data, function(err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        }
      })
    })
  }

  /**
   * @description 删除多个数据
   * @param {string}table 表名 
   * @param {any}data 要删除的数据条件
   */
  deleteMany(table, data) {
    return new Promise((resolve, reject) => {
      this.connect(table, function(err, result) {
        if (err) {
          throw err
        } else {
          result.deleteMany(data, function(err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        }
      })
    })
  }
}

exports.ConnectMongo = ConnectMongo