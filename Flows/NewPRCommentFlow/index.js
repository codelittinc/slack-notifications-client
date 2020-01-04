const Utils = require('../../Utils')
const DB = require('../../db')
const Slack = require('../../Slack')
const SlackRepository = require('../../SlackRepository');

const getContent = (json) => (
  {
    pullRequestId: json.pull_request.number,
    repositoryName: json.repository.name,
    branchName: json.pull_request.head.ref
  }
);

const start = async (json) => {
  const content = getContent(json);
  const { pullRequestId, repositoryName, branchName} = content;

  const slackTSHash = Utils.getSlackTSHash({
    branchName,
    repositoryName,
    pullRequestId
  });

  console.log('New PR content', content);
  console.log('Slack TS Thread', slackThreadTS);
  const slackThreadTS = await DB.retrieve(slackTSHash)
  const repositoryData = SlackRepository.getRepositoryData(repositoryName)
  const { channel } = repositoryData;

  const message = "There is a new message!"

  Slack.sendMessage({
    message,
    slackChannel: channel,
    threadID: slackThreadTS
  })
};

exports.start = start;