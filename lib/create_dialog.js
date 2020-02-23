module.exports = (event, repos) => {
  return {
    dialog: {
      callback_id: 'open_issue',
      title: 'Open an Issue',
      elements: [
        {
          label: 'Repo',
          type: 'select',
          name: 'repo',
          options: repos.map(repo => {
            return {
              label: repo.full_name,
              value: repo.full_name
            };
          })
        },
        {
          type: 'text',
          label: 'Issue Title',
          name: 'issue_title'
        },
        {
          type: 'textarea',
          label: 'Issue Body',
          name: 'issue_body'
        }
      ]
    },
    trigger_id: event.trigger_id
  };
};
