const Utils = require('../../Utils')
const DB = require('../../db')
const Slack = require('../../Slack')
const SlackRepository = require('../../SlackRepository');

const getContent = (json) => (
   {
    branchName: json.ref.match(/refs\/heads\/(.*)/)[1],
    pullRequestId: json.repository.open_issues,
    repositoryName: json.repository.name
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

  const slackThreadTS = await DB.retrieve(slackTSHash)
  const repositoryData = SlackRepository.getRepositoryData(repositoryName)
  const { channel } = repositoryData;

  const message = "There is a new change!!"

  Slack.sendMessage({
    message,
    slackChannel: channel,
    threadID: slackThreadTS
  })
};

exports.start = start;