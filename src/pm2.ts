import pm2 from 'pm2';

export const getProgramList = async () => {
  console.log('[func] - getProgramList');
  let programList: string[] = [];

  await pm2.connect(async (err) => {
    await pm2.list(async (err, list) => {
      console.log(list.length);

      list.forEach(async (data) => {
        console.log('[check] - Check pm2 program name:', data.name);
        if (data.name && !process.env['EXCLUDE_PM2_PROCESS_NAME_LIST']?.split(',').includes(data.name)) {
          // 이름 정합성 테스트 후에 해야 함
          console.log('[check] - none exist');
          programList.push(data.name);
        } else {
          console.log('[check] - exist');
        }
      });

      return;
    });
    return;
  });

  console.log('[func] - getProgramList success');
  return programList;
};
