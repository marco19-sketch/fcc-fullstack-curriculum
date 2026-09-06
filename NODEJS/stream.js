const fs = require('fs')
const path = require('path')

const inputFilePath = path.join(__dirname, 'article.md')

//Readable stream
const readInputFileStream = fs.createReadStream(inputFilePath)
console.log('readInputFileStream:', readInputFileStream)

readInputFileStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data`);
    console.log('Received data:', chunk)
    console.log('Received readable data:', chunk.toString())
})