const { Post } = require('../app/models')
var sequelize = require('sequelize')

module.exports = {
  async store(req, res) {
    const likes = await Post.update({ likes: sequelize.literal('likes + 1')}, { where: { id: req.params.id } })

    const post = await Post.findOne({ where: { id: req.params.id } })

    req.io.emit('like', post)
    return res.json(post)
  }
}
