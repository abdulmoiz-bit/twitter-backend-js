import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'my-app',
  broker: ['192.168.31.145:9092'],
})
