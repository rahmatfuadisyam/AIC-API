const sharp = require('sharp')
const uuidv4 = require('uuidv4')
const path = require('path')

class Resize {
  constructor(folder) {
    this.folder = folder
  }
  async save(buffer, name) {
    const filename = Resize.filename(name)
    const filepath = this.filepath(filename)

    await sharp(buffer)
      .resize(600, 600, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath)

    return filename
  }
  static filename(name) {
    let fileName = `${uuidv4()}${path.extname(name)}`
    return fileName
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize
