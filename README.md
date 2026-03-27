# RabbitMQ1

A simple Node.js RabbitMQ demo with a publisher and consumer using `amqplib`.

## Overview

This project demonstrates basic message queue communication:

- `publisher.js` sends a job message to the `jobs` queue.
- `consumer.js` listens to the same queue and reads incoming messages.

## Tech Stack

- Node.js
- RabbitMQ
- amqplib

## Project Structure

```text
RabbitMQ1/
	publisher.js
	consumer.js
	package.json
	README.md
```

## Prerequisites

- Node.js 16+
- RabbitMQ server running on `amqp://localhost:5672`

## Installation

```bash
npm install
```

## Available Scripts

- `npm run publish` -> runs `publisher.js`
- `npm run consume` -> runs `consumer.js`

## How to Run

### 1. Start RabbitMQ

Make sure RabbitMQ is running locally.

### 2. Start the consumer

```bash
npm run consume
```

You should see:

```text
Waiting for messages in jobs queue...
```

### 3. Publish a message

The publisher expects a number argument.

```bash
node publisher.js 7
```

Expected publisher log:

```text
Job sent successfully! 7
```

Expected consumer log:

```text
Job received successfully! 7
```

## Message Format

Publisher sends JSON in this format:

```json
{
	"number": "7"
}
```

## Current Behavior Notes

- Queue name is fixed as `jobs`.
- Both publisher and consumer connect to `amqp://localhost:5672`.
- Consumer currently acknowledges (`ack`) only when `number == 3`.
- Consumer closes after 500ms, so it behaves like a short-lived demo process rather than a long-running worker.

## Troubleshooting

- `ECONNREFUSED`:
	- RabbitMQ is not running or not accessible on port `5672`.

- No consumer output:
	- Start consumer before publishing.
	- Increase/remove the 500ms auto-close in `consumer.js` for continuous listening.

## Author

Suprit Raj
