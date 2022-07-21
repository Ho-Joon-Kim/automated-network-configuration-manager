module.exports = {
  apps: [
    {
      name: 'automated-network-configuration-manager',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1024M',
    },
  ],
};
