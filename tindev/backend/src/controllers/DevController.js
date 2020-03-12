const Dev = require('../models/Dev')
const axios = require('axios')

module.exports = {
  async index(req, res) {
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ],
    })
    res.json(users)
  },

  async store(req, res) {
    try {
      const { username } = req.body
        
      const userExist = await Dev.findOne({ user: username })
        
      if(userExist) {
        return res.json(userExist)
      }

      const response = await axios.get(`https://api.github.com/users/${username}`)

      const { name, bio, avatar_url: avatar } = response.data

      const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
      })

      return res.json(dev)
    } catch(e) {
      req.io.emit('notExist', {
        msg: 'error not exist username'
      })
      return res.status(404).json({       error: "not exist" })
    }
  }
}
