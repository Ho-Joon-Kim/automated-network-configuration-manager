import fs from 'fs';
import shell from 'shelljs';

export const createNginxConfig = async (programName: string) => {
  const [name, port] = programName.split(':');

  fs.writeFileSync(
    `/etc/nginx/conf.d/${name}.conf`,
    `server {
    listen ${Number(port) + 1000};
    server_name ${name};

    location / { proxy_pass http://localhost:${port}; }
}`,
  );
};

export const reloadNginxConfig = async () => {
  shell.exec('sudo service nginx restart');
};
