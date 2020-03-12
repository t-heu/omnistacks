const Spot = require('../app/models/Spot')
const User = require('../app/models/User')

module.exports = {
  async index(req, res) {
    const { tech } = req.query

    const spots = await Spot.find({ techs: tech })

    return res.json(spots)
  },

  async store(req, res) {
    const { filename } = req.file
    const { company, price, techs } = req.body
    const { user_id } = req.headers

    const user = User.findById(user_id)

    if(!user) {
      return res.status(400).json({ erorr: 'User not exist'})
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price
    })

    return res.json(spot)
  }
}
