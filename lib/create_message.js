module.exports = (
  { policy_name, incident_id, incident_url, targets, condition_name }
) => {
  let actions = [
    {
      name: incident_id,
      text: 'Acknowledge',
      type: 'button',
      value: 'acknowledge'
    },
    {
      name: incident_id,
      text: 'Close',
      type: 'button',
      value: 'close'
    },
    {
      name: incident_id,
      text: 'Open Issue',
      type: 'button',
      value: 'open_issue'
    }
  ];

  let text = `_${targets[0].name}_ triggered _${condition_name}_ in _${policy_name}_.`;

  return {
    channel: '#alerts',
    text,
    attachments: [
      {
        actions,
        callback_id: 'incident_action',
        title: `Incident ${incident_id}`,
        title_link: incident_url,
        color: '#3AA3E3',
        attachment_type: 'default'
      }
    ]
  };
};
