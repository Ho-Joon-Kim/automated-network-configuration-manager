import delay from 'delay';
import dotenv from 'dotenv';
import { addCloudflareConfig, getCloudflareUrls, reloadCloudflareConfig } from './cloudflare';
import { sendJandiLog } from './jandi';
import { createNginxConfig, reloadNginxConfig } from './nginx';
import { getProgramList } from './pm2';
import { isProgramPortValidated } from './validate';
dotenv.config();

let ConfiguredProgramList: string[] = [];

while (1) {
  async () => {
    const programList = getProgramList(); // get pm2 programName list

    if (programList.length < ConfiguredProgramList.length) {
      // check length of initialized programs and pm2 programs
      console.log('[mod] - Program delete sequence mode');
    }

    for (const programName of programList) {
      console.log('[init] - start configurator...');
      console.log('[data] -', programName);
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
      sendJandiLog(programName, ['신규 추가', programName.split(':')[1] + 'wimcorp.dev', ' ', '현재 리스트'].concat(await getCloudflareUrls()));

      ConfiguredProgramList.push(programName);
    }

    delay(5000);
  };
}
