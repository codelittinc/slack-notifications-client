import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser';
import express from 'express';

import {
  ChannelsController,
  DirectsController,
  ReactionsController,
} from '@controllers';

const app = express()
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001

app.post('/channel-message', async (req, res) => {
  ChannelsController.sendMessage(req, res);
});

app.patch('/channel-message', async (req, res) => {
  ChannelsController.updateMessage(req, res);
});

app.post('/direct-message', async (req, res) => {
  DirectsController.sendMessage(req, res);
});

app.post('/reactions', async (req, res) => {
  ReactionsController.addReaction(req, res);
});

app.delete('/reactions', async (req, res) => {
  ReactionsController.removeReaction(req, res);
});

app.get('/', async (req, res) => {
  res.send({
    status: 200,
  })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));