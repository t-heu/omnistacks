const { Post } = require('../app/models')
const Jimp = require('jimp')
const fs = require('fs')
const path = require('path')

module.exports = {
  async index(req, res) {
    const posts = await Post.findAll({order: [['createdAt', 'DESC']]})

    return res.json(posts)
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename: image } = req.file 
    const [ name, exa ] = image.split('.')
    let fileName = image

    if(exa != "jpg") {
      fileName = `${name}.jpg`
    }

    Jimp.read(req.file.path)
      .then(lenna => {
        return lenna
        .resize(500, Jimp.AUTO)
        .quality(70)
        .write(
          path.resolve(req.file.destination, 'resized', fileName)
        )
    })

    fs.unlinkSync(req.file.path)

    var HashtagsClear = hashtags.split(" ")
    let HashtagsArr = []
    
    HashtagsClear.map(hashtag => HashtagsArr.push(hashtag.toString().replace("", "#")))
    
    const post = await Post.create({
      author,
      place,
      description,
      hashtags: HashtagsArr.toString().replace(',', ' '),
      image: fileName,
      likes: 0,
    })

    req.io.emit('post', post)
    return res.json(post)
  }
}

