module.exports = {
  apps : [{
    name: 'client',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      SERVER_HOST_PORT: 'http://localhost:8080/',
      PORT: 8082
    },
    env_production: {
      NODE_ENV: 'production',
      SERVER_HOST_PORT: 'http://localhost:8080/',
      PORT: 8083
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
