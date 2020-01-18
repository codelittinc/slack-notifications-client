import Utils from '../../Utils.mjs'
import DB from '../../db.mjs'
import Slack from '../../Slack.mjs'
import SlackRepository from '../../SlackRepository.mjs'

const getContent = (json) => (
  {
    pullRequestId: json.pull_request.number,
    repositoryName: json.repository.name,
    branchName: json.pull_request.head.ref
  }
);

// @TODO: update this flow if necessary
const start = async (json) => {
  const content = getContent(json);
  const { pullRequestId, repositoryName, branchName} = content;

  const slackTSHash = Utils.getSlackTSHash({
    branchName,
    repositoryName,
    pullRequestId
  });

  const slackThreadTS = await DB.retrieve(slackTSHash)
  const repositoryData = SlackRepository.getRepositoryData(repositoryName)
  const { channel } = repositoryData;

  const message = ":speech_balloon: There is a new message!"

  Slack.sendMessage({
    message,
    slackChannel: channel,
    threadID: slackThreadTS
  })
};

export default {
  start,
}