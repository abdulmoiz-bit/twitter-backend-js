import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'WHA6AageuTguu97jmF7U04S4uVh6wgBF',
    socket: {
        host: 'redis-15747.crce276.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 15747
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

/*
await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
*/