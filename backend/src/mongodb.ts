import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL!;

if (MONGO_URL === 'undefined') {
    throw new Error(
        "Please define the MONGO_URL environment variable inside .env.local"
    );
}

let cachedClient: MongoClient | null = null;

async function dbConnect() {
    if (cachedClient) {
        return cachedClient;
    }

    cachedClient = await MongoClient.connect(MONGO_URL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return cachedClient;
}

async function dbDisconnect() {
    if (cachedClient) {
        await cachedClient.close();
    }
}

export { dbConnect, dbDisconnect };
