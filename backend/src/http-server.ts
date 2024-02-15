import 'dotenv/config'

import { handleCors } from './cors-middleware';
import { handleRequest } from './request-handler';
import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    handleCors(req, res, () => {
        handleRequest(req, res);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
