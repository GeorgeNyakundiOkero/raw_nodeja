const http = require('http')
const path = require('path')
const fs = require('fs')

//server object
const server = http.createServer((req, res) => {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, '/public', 'index.html'), (err, content) => {
    //         if(err) throw err
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
        
    // } 
    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname, '/public', 'about.html'), (err, content) => {
    //         if(err) throw err
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if(req.url === '/api/users') {
    //     const users = [
    //         {name: 'George Nyakundi', age : 26},
    //         {name: 'John Doe', age: 30}
    //     ]
    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }

    //build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html':req.url );
   
    //extension name
    let extname = path.extname(filePath);

    //inial content type
    let contentType = 'text/html'

    //check and set content type
    switch(extname) {
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                //NOT FOUND
                fs.readFile(path.join(__dirname, '/public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                //server error
                res.writeHead(500);
                res.end(`Server error ${err.code}`);
            }
        } else{
            //succcess
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8')
        }
    })
});

//port number
const PORT =process.env.PORT || 5000

//listen to port
server.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Server started on port: ${PORT}`)
})