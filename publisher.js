const amqp = require('amqplib');

const msg = {number: process.argv[2]};

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully! ${msg.number}`);
        
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