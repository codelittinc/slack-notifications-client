const axios  = require('axios');

class SlackNotificationsClient {
  constructor({ bot, apiKey, apiURI }) {
    this.bot = bot;
    this.apiKey = apiKey;
    this.apiURI = apiURI;
    axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}` 
  }

  async sendDirectMessage({ message, username }) {
    const res = await axios.post(this.getUrl('direct-messages'), {
      message,
      username,
      bot: this.bot,
    })

    return res.data;
  };

  async sendMessage({ message, channel, ts }) {
    const res = await axios.post(this.getUrl('channel-messages'), {
      message,
      channel,
      ts,
      bot: this.bot,
    })

    return res.data;
  };

  async updateMessage({ message, channel, ts }) {
    const res = await axios.patch(this.getUrl('channel-messages'), {
      message,
      channel,
      ts,
      bot: this.bot,
    });

    return res.data;
  };

  async sendReaction({ channel, reaction, ts }) {
    const res = await axios.post(this.getUrl('reactions'), {
      channel,
      reaction,
      ts,
      bot: this.bot,
    })

    return res.data;
  };

  async removeReaction({ channel, reaction, ts }) {
    const res = await axios.post(this.getUrl('reactions/delete'), {
      channel: channel,
      reaction,
      ts: ts,
      bot: this.bot,
    })

    return res.data;
  };

  getUrl(path) {
    return `${this.apiURI}/${path}`;
  };
};

module.exports = SlackNotificationsClient;