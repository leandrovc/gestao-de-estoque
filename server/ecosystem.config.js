module.exports = {
  apps : [{
    name: 'server',
    script: 'src/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      DB_NAME: 'infraestrutura',
      DB_USER: 'root',
      DB_PASS: '1234',
      DIALECT: 'mariadb',
      HOST: 'localhost',
      PORT: 8080
    },
    env_production: {
      NODE_ENV: 'production',
      DB_NAME: 'infraestrutura',
      DB_USER: 'root',
      DB_PASS: '1234',
      DIALECT: 'mariadb',
      HOST: 'localhost',
      PORT: 8080
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
