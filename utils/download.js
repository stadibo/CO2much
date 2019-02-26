const request = require('superagent')
const fs = require('fs')
const AdmZip = require('adm-zip')

const download = (src, dir, fileName, outputDir) => {
  // Make directory if not exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  // Download file and unzip
  request
    .get(src)
    .on('error', (error) => {
      console.log(error)
    })
    .pipe(fs.createWriteStream(`${dir}/${fileName}`))
    .on('finish', () => {
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
      }
      const zip = new AdmZip(`${dir}/${fileName}`)
      zip.extractAllTo(outputDir, true)
    })
}

module.exports = {
  download
}