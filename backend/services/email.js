const Sib = require('sib-api-v3-sdk');

function sendEmail(sendTo, subject, textContent) {
  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.EMAIL_API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: process.env.EMAIL_USER,
    name: process.env.EMAIL_NAME
  };

  const receivers = [
    {
      email: sendTo
    }
  ];

  return tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: subject,
    textContent: textContent
  })
};

module.exports = sendEmail;