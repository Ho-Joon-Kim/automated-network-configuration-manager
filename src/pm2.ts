import pm2 from 'pm2-promise';

export const getProgramList = async () => {
  let programList: string[] = [];

  await pm2.connect();
  const list = await pm2.list();

  for await (const data of list) {
    if (data.name && !programList.includes(data.name) && !process.env['EXCLUDE_PM2_PROCESS_NAME_LIST']?.split(',').includes(data.name)) {
      console.log('[check] - Check pm2 program name:', data.name);
      // 이름 정합성 테스트 후에 해야 함
      programList.push(data.name);
    }
  }

  return programList;
};
