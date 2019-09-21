const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 9
  if (page < 1) page = 1
  try {
    const posts = await db.query(escape`
    SELECT 1
  `)

res.status(200).json({ posts, page })
  } catch(e) {
    res.status(200).json({message: e.message})
  }

}