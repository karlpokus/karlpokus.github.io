var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    server = http.createServer(),
    argv = require('minimist')(process.argv.slice(2)),
    port = argv.p || process.env.PORT || 3000,
    send = function(p, res){
      var file = path.join(__dirname, '..', p);
      fs.createReadStream(file)
        .on('error', console.error)
        .pipe(res);
    };

server
  .on('request', function(req, res){

    // index at '/'
    if (req.url === '/') {
      send('index.html', res);

      // page[n].html at '/public'
    } else if (/public/.test(req.url)) {
      send(req.url, res);

      // assets at '/assets'
    } else if (/assets/.test(req.url)) {
      send(req.url, res);
    }
  })
  .listen(port, function(){
    console.log('Server running on port ' + port);
  });
