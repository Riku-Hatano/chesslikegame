const http = require("http");

const createHttpServer = () => {
    const server = http.createServer((req: any, res: any) => {
        res.setHeader("Access-Control=Allow-Origin", "*");
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.write({message: "done"});
        res.end();
    })
    return server;
}

module.exports = createHttpServer;