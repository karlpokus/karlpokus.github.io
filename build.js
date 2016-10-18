var glob = require('glob'),
    fs = require('fs'),
    mark = require('marked'),
    cheerio = require('cheerio'),
    argv = require('minimist')(process.argv.slice(2));

function parseFiles(files, cb) {
  var out = [];
  
  // stream
  // loadPosts.pipe(parseMarkdown).pipe(readIndex).pipe(appendHtml).pipe(saveIndex)
  
  files.forEach(function(file){
    
    var data = '';
    fs.createReadStream(file)
      .on('error', cb)
      .on('data', function(chunk){
        data += chunk;
      }).on('end', function(){
        var parsed = mark(data);
        out.push(parsed);
      
        if (out.length === files.length) { // cheeky!
          cb(null, out);
        }
      });    
  });
}

function builder() {
  glob('posts/*', function (err, files) {
    if (err) throw err;

    parseFiles(files, function(err, html){
      if (err) throw err;

      var index = '';
      fs.createReadStream('index.html')
        .on('data', function(chunk){
          index += chunk;
        }).on('end', function(){
          var $ = cheerio.load(index);
          $('.content').append(html.join(''));

          fs.createWriteStream('index.html')
            .end($.html(), 'utf8'); // cb
        });

    });
  })
}

function readFileData() {
  glob('posts/*', function (err, files) {
    files.forEach(function(file){
      fs.stat(file, function(err, fileObj){
        console.dir(fileObj);
      });
    });
  });
}

//readFileData();  
// builder();

console.log(argv);