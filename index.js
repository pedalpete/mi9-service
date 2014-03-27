var http = require('http');
var parse_json = require('./parse_json.js');
var port =  Number(process.env.PORT || 8080);
http.createServer(function (req, res) {
  /* only checking for a POST type for the response right now */
  switch(req.url) {
    case '/':
      if(req.method==='POST'){
        var body='';
        req.on('data', function (data) {
          body +=data;
         });

        req.on('end',function(){
         res.end(JSON.stringify(parse_json(body)));
        });      
      } else {
        res.end('{"error":""this endpoint only accepts POST requests"}')
      }
      break;
    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
  };
}).listen(port); 