import axios from 'axios';

class SlackNotifications {
  constructor({ bot, apiKey, serverURI }) {
    this.bot = bot;
    this.apiKey = apiKey;
    this.serverURI = serverURI;
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
    return `${this.serverURI}/${path}`;
  };
};

export default SlackNotifications;