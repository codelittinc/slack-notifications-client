import SlackApi from '@slack/web-api';

class Slack {
  static async sendChannelMessage({ message, channelName, ts }) {
    const token = process.env.SLACK_API_KEY;

    const slackClient = new SlackApi.WebClient(token);

    const channel = await this.findChannelByName(slackClient, channelName);

    const res = await slackClient.chat.postMessage({
      channel: channel.id,
      text: message,
      thread_ts: ts,
      unfurl_links: false,
      parse: 'full'
    });

    console.log(`Message sent to ${channelName} Message: ${message} TS: ${ts}`);

    return res;
  };

  static async updateMessage({ message, channelName, ts }) {
    const token = process.env.SLACK_API_KEY;

    const slackClient = new SlackApi.WebClient(token);

    const channel = await this.findChannelByName(slackClient, channelName);

    const res = await slackClient.chat.update({
      channel: channel.id,
      text: message,
      ts,
      unfurl_links: false,
      parse: 'full'
    });

    console.log(`Message updated on ${channelName} New Message: ${message} TS: ${ts}`);
    return res;
  };

  static async findChannelByName(slackClient, channelName) {
    const response = await slackClient.channels.list({
      limit: 1000
    });

    const { channels } = response;

    return channels.find(c => c.name === channelName)
  }
};

export default Slack;