const path = require("path");

console.log("filename:", __filename);
console.log("dirname:", __dirname);
console.log(path.basename(__filename));
console.log(path.basename(__dirname));
console.log(path.extname(__filename));
console.log(path.extname("NODEJS/article.md"));

const joinedPath = path.join("src", "assets", "text-files");
console.log("joinedPath:", joinedPath);

const absolutePath = path.resolve("assets", "src", "text-files");
console.log("absolutePath:", absolutePath);

const parsedFile = path.parse(__filename);
console.log("parsedFile", parsedFile);

const formattedDirectory = path.format({
    dir: '/src/assets',
    name: 'file',
    ext: '.md'
})

console.log('formattedDirectory: ', formattedDirectory)