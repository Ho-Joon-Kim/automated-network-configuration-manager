import fs from 'fs';
import YAML from 'yaml';
import shell from 'shelljs';

export const addCloudflareConfig = async (programName: string) => {
  try {
    const [name, port] = programName.split(':');
    const confFile = String(process.env['CLOUDFLARE_CONF_LOCATION']);
    const file = fs.readFileSync(confFile, 'utf8');
    const configData = await YAML.parse(file);

    const config = {
      hostname: `${name}.wimcorp.dev`,
      service: `http://localhost:${port}`,
    };
    await configData.ingress.unshift(config);

    fs.writeFileSync(confFile, YAML.stringify(configData));
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const getCloudflareUrls = async () => {
  const list: string[] = [];

  try {
    const confFile = String(process.env['CLOUDFLARE_CONF_LOCATION']);
    const file = fs.readFileSync(confFile, 'utf8');
    const configData = await YAML.parse(file);

    console.log(confFile);
    console.log(file);
    console.log(configData);

    for (let i = 0; i <= configData.ingress.length; i++) {
      if (configData.ingres[i] && configData.ingres[i].hasOwnProperty('hostname')) {
        list.push(String(configData.ingres[i].hostname));
      }
    }

    return list;
  } catch (error) {
    console.log(error);
    return list;
  }
};

export const reloadCloudflareConfig = async () => {
  shell.exec('sudo service cloudflared restart');
};
