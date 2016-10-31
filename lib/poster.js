var fs = require('fs'),
    path = require('path'),
    argv = require('minimist')(process.argv.slice(2)),
    title = argv._.join(" ") || 'no title',
    postTitle = '# ' + title,
    fileTitle = title.replace(/\s/g, "-") + '.txt',
    filePath = path.join(__dirname, '../posts', fileTitle);

fs.createWriteStream(filePath)
  .end(postTitle, 'utf8', function(){
    console.log(fileTitle, 'created');
  });
