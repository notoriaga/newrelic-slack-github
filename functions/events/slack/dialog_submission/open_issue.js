const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

/**
* An HTTP endpoint that acts as a webhook for Slack interactive_message event
* @param {object} event
* @returns {any}
*/
module.exports = async event => {
  let [owner, repo] = event.submission.repo.split('/');

  try {
    await lib.github.issues['@0.3.3'].create({
      owner,
      repo,
      title: event.submission.issue_title,
      body: event.submission.issue_body
    });
  } catch (err) {
    console.error('failed opening issue', err);
  }
};
