import { Slack } from '@services';

class ChannelsController {
  static async sendMessage(req, res) {
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
  }

  static async updateMessage(req, res) {
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
  }
}

export default ChannelsController;