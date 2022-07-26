import delay from 'delay';
import dotenv from 'dotenv';
import { addCloudflareConfig, getCloudflareUrls, reloadCloudflareConfig } from './cloudflare';
import { sendJandiLog } from './jandi';
import { createNginxConfig, reloadNginxConfig } from './nginx';
import { getProgramList } from './pm2';
import { isProgramPortValidated } from './validate';
dotenv.config();

let ConfiguredProgramList: string[] = [];

const start = async () => {
  console.log('[start] - Program start');
  while (true) {
    const programList = await getProgramList(); // get pm2 programName list

    if (programList.length < ConfiguredProgramList.length) {
      // check length of initialized programs and pm2 programs
      console.log('[mod] - Program delete sequence mode');
    }

    for await (const programName of programList) {
      console.log('[start] -', programName);
      // program name will be <subdomain>:<port>
      if (ConfiguredProgramList.includes(programName)) {
        console.log('[init] - This program already configured');
        continue;
      }
      if (!isProgramPortValidated(programName)) {
        // check program port validation
        console.log('[validator] - This program port is out of range');
        continue;
      }
      // check program name validation
      // check nginx conf is exist
      // check cloudflare conf is exist
      await createNginxConfig(programName); // add nginx conf file
      await reloadNginxConfig();
      await addCloudflareConfig(programName); // add cloudflare conf
      await reloadCloudflareConfig();
      // send jandi
      await sendJandiLog(programName, ['신규 추가', programName.split(':')[0] + 'wimcorp.dev', ' ', '현재 리스트'].concat(await getCloudflareUrls()));
      ConfiguredProgramList.push(programName);
    }

    await delay(30000);
  }
};
start();
