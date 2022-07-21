import Jandi from 'jandi';

export const sendJandiLog = async (title: string, description: string[]) => {
  const jandi = await new Jandi();
  await jandi.setWebhook(String(process.env['JANDI_URL']));

  await jandi.webhook(
    {
      body: 'Log',
      connect: {
        color: '#56fc61',
        info: [
          {
            title: title,
            description: description.join('\n'),
          },
        ],
      },
    },
    function (err: any) {
      console.error(err);
    },
  );
};

export const sendJandiErr = async (title: string, description: string[]) => {
  const jandi = await new Jandi();
  await jandi.setWebhook(String(process.env['JANDI_URL']));

  await jandi.webhook(
    {
      body: 'Err',
      connect: {
        color: '#fc5656',
        info: [
          {
            title: title,
            description: description.join('\n'),
          },
        ],
      },
    },
    function (err: any) {
      console.error(err);
    },
  );
};

export const sendJandiWarn = async (title: string, description: string[]) => {
  const jandi = await new Jandi();
  await jandi.setWebhook(String(process.env['JANDI_URL']));

  await jandi.webhook(
    {
      body: 'Warn',
      connect: {
        color: '#fca956',
        info: [
          {
            title: title,
            description: description.join('\n'),
          },
        ],
      },
    },
    function (err: any) {
      console.error(err);
    },
  );
};
