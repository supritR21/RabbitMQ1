const amqp = require('amqplib');


async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
           const input = JSON.parse(message.content.toString());
           console.log(`Job received successfully! ${input.number}`);
           if(input.number == 3) {
                channel.ack(message);
           }
        });

        console.log("Waiting for messages in jobs queue...");
        
        // Close the connection after 500ms
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

connect();