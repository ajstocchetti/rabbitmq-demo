const amqp = require('amqplib');

const exchange = 'cat_thoughts';
const queueName = getQueueName();

async function run() {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    await channel.assertQueue(queueName, { exclusive: false });
    await channel.bindQueue(queueName, exchange, '');
    console.log(`listening... on queue ${queueName}`);

    await channel.consume(queueName, handleMsgBuilder(channel));
  } catch(err) {
    console.log('ERROR')
    console.log(err);
    process.exit(1);
  }
}

function handleMsgBuilder(channel) {
  return function handleMsg(msg) {
    if (msg !== null) {
      console.log('I refuse to' + msg.content.toString().toUpperCase());
      channel.ack(msg);
    } else {
      console.log('null message');
    }
  }
}

run();

function getQueueName() {
  const args = [...process.argv];
  return args.length > 2 ? args[2] : 'cheddar-beef';
}