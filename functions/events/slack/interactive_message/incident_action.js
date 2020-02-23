const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const createDialog = require('../../../../lib/create_dialog');

/**
* An HTTP endpoint that acts as a webhook for Slack interactive_message event
* @param {object} event
* @returns {any}
*/
module.exports = async event => {
  let actionData = event.actions[0];
  if (!actionData) {
    return;
  }

  let incidentId = Number(actionData.name);

  let updateMessageParams = { id: event.channel.id, ts: event.message_ts };
  let originalMessage = event.original_message;

  switch (actionData.value) {
    case 'acknowledge':
      await lib.newrelic.alertsincidents['@0.0.4'].acknowledge({
        id: incidentId
      });
      originalMessage.attachments[0].actions = originalMessage.attachments[0].actions.filter(
        a => a.value !== 'acknowledge'
      );
      await lib.slack.messages['@0.5.8'].update({
        ...updateMessageParams,
        ...originalMessage
      });
      break;

    case 'close':
      await lib.newrelic.alertsincidents['@0.0.4'].close({
        id: incidentId
      });
      originalMessage.attachments[0].actions = originalMessage.attachments[0].actions.filter(
        a => a.value !== 'close' && a.value !== 'acknowledge'
      );
      await lib.slack.messages['@0.5.8'].update({
        ...updateMessageParams,
        ...originalMessage
      });
      break;

    case 'open_issue':
      let repos = await lib.github.repos['@0.3.3'].list();
      await lib.slack.dialog['@0.0.4'].open(createDialog(event, repos));
      originalMessage.attachments[0].actions = originalMessage.attachments[0].actions.filter(
        a => a.value !== 'open_issue'
      );
      await lib.slack.messages['@0.5.8'].update({
        ...updateMessageParams,
        ...originalMessage
      });
      break;

    default:
      console.error(`unknown action ${actionData.value}`);
      break;
  }
};

