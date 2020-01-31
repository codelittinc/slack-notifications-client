import SlackApi from '@slack/web-api';

class Slack {
  static async addReaction({ channelName, reaction, ts }) {
    const token = process.env.SLACK_API_KEY;

    const slackClient = new SlackApi.WebClient(token);

    const channel = await this.findChannelByName(slackClient, channelName);

    const res = await slackClient.reactions.add({
      channel: channel.id,
      name: reaction,
      timestamp: ts
    }).catch(e => e);

    console.log(`Reaction ${reaction} added to ${channelName} TS:${ts}`)

    return res;
  };

  static async removeReaction({ channelName, reaction, ts }) {
    const token = process.env.SLACK_API_KEY;

    const slackClient = new SlackApi.WebClient(token);

    const channel = await this.findChannelByName(slackClient, channelName);

    const res = await slackClient.reactions.remove({
      channel: channel.id,
      name: reaction,
      timestamp: ts
    }).catch(e => e);

    console.log(`Reaction ${reaction} removed from ${channelName} TS:${ts}`)

    return res;
  };

  static async sendDirectMessage({ message, username }) {
    const token = process.env.SLACK_API_KEY;

    const slackClient = new SlackApi.WebClient(token);

    const user = await this.findUserByName(slackClient, username)

    const res = await slackClient.chat.postMessage({
      channel: user.id,
      text: message,
      unfurl_links: false,
      parse: 'full',
      as_user: true
    });

    console.log(`Message sent to ${username} Message: ${message}`);

    return res;
  };

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

  static async findUserByName(slackClient, username) {
    const usersList = await slackClient.users.list({
      limit: 1000
    });

    const { members } = usersList;

    return members.find(s => s.name === username);
  }
};

export default Slack;