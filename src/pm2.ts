import pm2 from 'pm2';

export const getProgramList = () => {
  console.log('[func] - getProgramList');
  let programList: string[] = [];

  pm2.connect((err) => {
    pm2.list((err, list) => {
      list.forEach((data) => {
        console.log('[check] - Check pm2 program name:', data);
        if (data.name && !process.env['EXCLUDE_PM2_PROCESS_NAME_LIST']?.split(',').includes(data.name)) {
          // 이름 정합성 테스트 후에 해야 함
          console.log('[check] - none exist');
          programList.push(data.name);
        } else {
          console.log('[check] - exist');
        }
      });
    });
  });

  return programList;
};
