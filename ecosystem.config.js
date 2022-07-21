module.exports = {
    apps: [
        {
            name: 'incle-server-refac-5000',
            script: './dist/app.js',
            instances: 2,
            exec_mode: 'cluster',
            max_memory_restart: '500M',
        },
    ],
};