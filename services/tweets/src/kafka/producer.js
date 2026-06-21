import {kafka} from "./client.js";

export const producer = kafka.producer();

export async function connectProducer(){
    await producer.connect()
    console.log("tweet service producer connected")
}