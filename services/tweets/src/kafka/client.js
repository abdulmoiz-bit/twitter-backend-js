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
