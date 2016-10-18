var glob = require('glob'),
    fs = require('fs'),
    mark = require('marked'),
    cheerio = require('cheerio'),
    argv = require('minimist')(process.argv.slice(2)),
    postsPerPage = argv.n || 5;

function parseFiles(files, cb) {
  var out = [];
  
  files.forEach(function(file){  
    var data = '';
    fs.createReadStream(file)
      .on('error', cb)
      .on('data', function(chunk){
        data += chunk;
      })
      .on('end', function(){
        var o = {
          html: mark(data),
          ts: fs.statSync(file).mtime.getTime()
        };
        out.push(o);
      
        if (out.length === files.length) {
          cb(null, out);
        }
      });    
  });
}

function sortAndStrip(collection) {
  return collection
    .sort(function(a, b){
      return b.ts - a.ts;
    })
    .map(function(o){
      return o.html;
    });
}

function buildPage(html, i) { 
  var posts = html.join(''),
      base = '';
  
  // ideally -> reader.pipe(applyPosts).pipe(writer)
  fs.createReadStream('./lib/base.html')
    .on('data', function(chunk){
      base += chunk;
    })
    .on('end', function(){
      var $ = cheerio.load(base);
      $('.content').append(posts);

      var outFile = (i > 0)? './public/page' + i + '.html': 'index.html';
    
      fs.createWriteStream(outFile)
        .end($.html(), 'utf8'); // cb
    });
}

function groupFiles(collection, n) {
  var i = 0,
      len = collection.length,
      chunk,
      out = [];
  
  for (i; i < len; i += n) {
    chunk = collection.slice(i, (i+n));
    out.push(chunk);
  }
  return out;
}

function done() {
  console.log('done');
}

function clean(cb) {
  glob('public/*.html', function (err, files) {
    files.forEach(function(file){
      fs.unlinkSync(file);
    });
    cb();
  });
}

function main() {
  glob('posts/*', function (err, files) { // get file names
    if (err) throw err;

    parseFiles(files, function(err, html){ // parse text to html + ts
      if (err) throw err;

      html = sortAndStrip(html);
      
      if (html.length > postsPerPage) { // group
        var group = groupFiles(html, postsPerPage);
        group.forEach(function(arr, i){
          buildPage(arr, i);
        });
      } else { // only build index
        buildPage(arr, 0);
      }
      done();
    });
  })
}

clean(main);
