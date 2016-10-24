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

function buildPaginator(i, n) {
  var html;
  
  // only one page
  if (n === 1) { 
    html = '';
  }
  // page 1 of multiple pages  
  if (i === 0 && n > 1) { 
    html = '<a href="/public/page1.html">Next &rarr;</a>';    
  }
  // page 2 of 2 pages
  if (i === 1 && n === 2) {
    html = '<a href="/">&larr; Prev</a>';
  }
  // page 2 of 2+ pages
  if (i === 1 && n > 2) {
    html = '<a href="/">&larr; Prev</a> | ';
    html += '<a href="/public/page' + (i+1) + '.html">Next &rarr;</a>';
  }
  // page > 2 && not last of 2+ pages
  if (i > 1 && i < (n-1) && n > 2) {
    html = '<a href="/public/page' + (i-1) + '.html">&larr; Prev</a> | ';
    html += '<a href="/public/page' + (i+1) + '.html">Next &rarr;</a>';
  }
  // last page of 2+ pages
  if (i > 1 && i === (n-1) && n > 2) {
    html = '<a href="/public/page' + (i-1) + '.html">&larr; Prev</a>';
  }
  return html;
}

function buildPage(html, i, n) { 
  var posts = html.join(''),
      paginator = buildPaginator(i, n),
      base = '';
  
  // ideally -> reader.pipe(applyPosts).pipe(writer)
  fs.createReadStream('./lib/base.html')
    .on('data', function(chunk){
      base += chunk;
    })
    .on('end', function(){
      var $ = cheerio.load(base);
      $('.content').append(posts);
      $('.paginator').append(paginator);
      
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
  console.timeEnd('buildtime');
  console.log('done');
}

function clean(cb) {
  console.time('buildtime');
  
  function removeFile(file) {
    fs.unlinkSync(file);
  }
  
  glob('public/*', function (err, files) {
    if (files.length > 0) {
      files.forEach(removeFile);
    }
    cb();
  });
}

function main() {
  glob('posts/*', function (err, files) { // get file names
    if (err) throw err;

    parseFiles(files, function(err, html){ // parse text to html + ts
      if (err) throw err;

      var posts = sortAndStrip(html);
      
      if (posts.length > postsPerPage) { // group
        var pages = groupFiles(posts, postsPerPage);
        pages.forEach(function(page, i){
          buildPage(page, i, pages.length);
        });
        
      } else { // only build index
        buildPage(posts, 0, 1);
      }
      done();
    });
  })
}

clean(main);