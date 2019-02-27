const request = require('superagent')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const AdmZip = require('adm-zip')

const download = async (src, dir, fileName, outputDir, ) => {
  try {
    console.log('downloading --> ', src)

    // Make dir if not exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    // Download file
    const response = await request.get(src)
    await writeFile(`${dir}/${fileName}`, response.body)

    // Check if output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    // Unzip file in dir to outputDir
    const zip = new AdmZip(`${dir}/${fileName}`)
    zip.extractAllTo(outputDir, true)
    console.log('extracted --> ', outputDir)
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  download
}