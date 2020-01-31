import { Slack } from '@services';

class DirectsController {
  static async sendMessage(req, res) {
    const {
      username,
      message
    } = req.body;

    const response = await Slack.sendDirectMessage({
      message,
      username
    });

    res.send(response)
  }
}

export default DirectsController;