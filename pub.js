// docker run -d --hostname my-rabbit -p5672:5672 --name some-rabbit rabbitmq:3
// docker run --hostname my-rabbit -p5672:5672 --name some-rabbit rabbitmq:3

const amqp = require('amqplib');
const {getCatMsg} = require('./message-gen.js');

const exchange = 'cat_thoughts';

(async function run() {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    await channel.publish(exchange, '', Buffer.from(getCatMsg()));
    // 2nd param is routing key, empty for fan-out exchanges
    console.log('published message');

    await channel.close();
    await conn.close();
  } catch(err) {
    console.log('ERROR')
    console.log(err);
    process.exit(1);
  }
})();


// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';
//         var msg = 'Hello World!';

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(msg));

//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });