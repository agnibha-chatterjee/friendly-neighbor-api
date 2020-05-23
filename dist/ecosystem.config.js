'use strict';
module.exports = {
    apps: [
        {
            name: 'fn-api',
            script: 'dist/app.js',
            instances: 'max',
            exec_mode: 'cluster',
            error_file: require('os').homedir + "/logs/api-err.log",
            out_file: require('os').homedir + "/logs/api-out.log",
            time: true,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
