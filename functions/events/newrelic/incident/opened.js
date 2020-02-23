const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const createMessage = require('../../../../lib/create_message');

/**
* An HTTP endpoint that acts as a webhook for New Relic incident.opened event
* @param {object} event
* @returns {any}
*/
module.exports = async event => {
  try {
    await lib.slack.channels['@0.6.5'].messages.create(createMessage(event));
  } catch (err) {
    console.error('failed sending slack message', err);
    return;
  }
};
