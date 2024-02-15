import { IncomingMessage, ServerResponse } from 'http';

export function handleCors(req: IncomingMessage, res: ServerResponse, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
    } else {
        next();
    }
}
