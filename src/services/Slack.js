import SlackApi from '@slack/web-api';

class Slack {
  static async sendChannelMessage({ message, channelName, ts }) {
    const token = process.env.SLACK_API_KEY;
    console.log(message, channelName, token)

    const slackClient = new SlackApi.WebClient(token);

    const response = await slackClient.channels.list({
      limit: 500
    });

    let channels = response.channels.sort((a, b) => a.created < b.created)
    const channel = channels.find(c => c.name === channelName)

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
};

export default Slack;