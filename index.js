const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if (filename === './') {
        filename = './index.html';
    }
    fs.readFile(filename, (err, data) => {
        if (err) {
            fs.readFile('./404.html', (err, data) => {
                if (err) {
                    // Handle error reading 404.html
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
            return; // Add return statement here
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8080);
