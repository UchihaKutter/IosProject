// callback promise 化
const Promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, res => {
        return resolve(res)
      }, err => {
        return reject(err)
      }
      ])
    })
  }
}

export default Promisify
