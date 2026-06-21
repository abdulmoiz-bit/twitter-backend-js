//const { Kafka } = require('kafkajs')
import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'my-app',
  broker: ['192.168.31.145:9092'],
})


async function init(){
const admin = kafka.admin();

await admin.connect();
await admin.createTopics({
  validateOnly: false,
  waitForLeaders: true,
  topics: [{
    topic: feed,
    numberOfPartitions: -1
  }]
})
await admin.disconnect();
}
init();







/*
const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: 'feed',
  messages: [
    { key: "key1", value: 'the first tweet' },
  ],
})

await producer.disconnect()
*/


/*
const consumer = kafka.consumer({ groupId: 'test-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'feed', fromBeginning: true })

await consumer.run({
    eachMessage: async ({ topic, message,}) => {
        console.log({
            key: message.key.toString()
        })
    },  
})

await consumer.disconnect();
 */