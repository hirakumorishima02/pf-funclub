const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: "%",
    database: "myproject",
    user: "root",
    password: "4v8h7mus"
  }
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}