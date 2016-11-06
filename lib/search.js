var glob = require('glob'),
    arg = require('minimist')(process.argv.slice(2))._.join(" ");

function print(x) {
  console.log(x);
}

if (arg) {
  glob('posts/*', function (err, files) {
    var match = files
      .filter(function(file){
        return new RegExp(arg, 'i').test(file.substr(6));
      });

    if (match.length > 0) {
      print(match);

    } else {
      print('no match');
    }
  });

} else {
  print('arg missing');
}
