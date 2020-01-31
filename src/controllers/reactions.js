import { Slack } from '@services';

class ReactionsController {
  static async addReaction(req, res) {
    const {
      channel,
      ts,
      reaction
    } = req.body;

    const response = await Slack.addReaction({
      channelName: channel,
      ts,
      reaction
    });

    res.send(response)
  }

  static async removeReaction(req, res) {
    const {
      channel,
      ts,
      reaction
    } = req.body;

    const response = await Slack.removeReaction({
      channelName: channel,
      ts,
      reaction
    });

    res.send(response)
  }
}

export default ReactionsController;