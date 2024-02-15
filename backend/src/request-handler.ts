import { IncomingMessage, ServerResponse } from 'http';

import { ObjectId } from 'mongodb'
import { dbConnect } from './mongodb';

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
        const client = await dbConnect();
        const db = client.db(); // Specify your database name

        if (req.url === '/api/items' && req.method === 'GET') {
            const items = await db.collection('items').find().toArray();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } else if (req.url?.startsWith('/api/items/') && req.method === 'GET') {
            const id = req.url.split('/')[3];
            const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        } else if (req.url === '/api/items' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const newItem = JSON.parse(body);
                await db.collection('items').insertOne(newItem);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newItem));
            });
        } else if (req.url?.startsWith('/api/items/') && req.method === 'PUT') {
            const id = req.url.split('/')[3];
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const newName = JSON.parse(body).name;
                await db.collection('items').updateOne({ _id: new ObjectId(id) }, { $set: { name: newName } });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Item updated successfully' }));
            });
        } else if (req.url?.startsWith('/api/items/') && req.method === 'DELETE') {
            const id = req.url.split('/')[3];
            await db.collection('items').deleteOne({ _id: new ObjectId(id) });
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not found' }));
        }
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server Error' }));
    }
}
