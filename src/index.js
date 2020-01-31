import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser';
import express from 'express';

import { Slack } from '@services';

const app = express()
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001

app.post('/channel-message', async (req, res) => {
  const {
    channel,
    message,
    ts
  } = req.body;

  const response = await Slack.sendChannelMessage({
    message,
    channelName: channel,
    ts
  });

  res.send(response)
});

app.patch('/channel-message', async (req, res) => {
  const {
    channel,
    message,
    ts
  } = req.body;

  const response = await Slack.updateMessage({
    message,
    channelName: channel,
    ts
  });

  res.send(response)
});

app.get('/', async (req, res) => {
  res.send({
    status: 200,
  })
})



app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));