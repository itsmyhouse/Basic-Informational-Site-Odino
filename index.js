var http = require('http');
var url = require('url');
var fs = require('fs');

const server = http.createServer( function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname + ".html";
    if (q.pathname === "/") filename = "./index.html";
    if (q.pathname === "/index") filename = "use_slash_instead";
    if (q.pathname === "/404") filename = "no_such_path";

    fs.readFile(filename, function(err, pageHtml) {
        if (err) {
            res.writeHead(404, {'Content-type': 'text/html'});
            fs.readFile("./404.html", function (err, page404) {
                if(err) { return res.end("error 404")}
                res.write(page404);
                res.end();
            });
            return; 
        }
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(pageHtml);
        return res.end();
    });
});

server.listen(8080);