const http = require('http'),
    server = require('./lib/server');

http.createServer(server).listen(server.get('port'), () => {
    console.log('Server listening on port ' + server.get('port'));
});