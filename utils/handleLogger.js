//const { IncomingWebhook } = require("@slack/webhook");
const { IncomingWebhook } = require("@slack/webhook")

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || 'https://hooks.slack.com/services/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';

const webHook = new IncomingWebhook(SLACK_WEBHOOK)
//const webHook = new IncomingWebhook("https://hooks.slack.com/services/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")

const loggerStream = {
    write: (message) => {
        webHook.send({
            text: message
        });
    },
};

module.exports = loggerStream;