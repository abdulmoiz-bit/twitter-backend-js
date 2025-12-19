//require("dotenv").config({ path: __dirname + "/../.env" });
//import { createClient } from 'redis';
//const {createClient} = require('redis')
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'mlop00mlop00',
    socket: {
        host: 'redis-14602.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14602
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

/*
await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
*/

export {client};