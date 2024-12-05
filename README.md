# Anodine

Microservice for all interactions for bambuser integration which includes: uploading to S3 directly, updating metadata, and manage datat in S3 bucket and MongoDB (Video Manager)

# Requirements

For development, you will only need Node.js and a node global package (NPM) installed in your
environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be
  sure to have `git` available in your PATH, `npm` might need it (You can find git
  [here](https://git-scm.com/)).

- #### Node installation

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

  NVM is a popular way to run Node.js. It allows you to easily switch the Node.js version, and install new versions to try and easily rollback if something breaks. It is also very useful to test your code with old Node.js versions.

  See [NVM](https://github.com/nvm-sh/nvm) for more information about this option.

- #### Other Operating Systems
  You can find more information about the installation on the
  [official Node.js website](https://nodejs.org/) and the
  [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.9.0

    $ npm --version
    10.9.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following
command, just open again the command line and be happy.

    $ npm install npm -g

###

---

# Install

    $ git clone https://github.com/DwainDRobinson/Anodine.git
    $ cd Anodine
    $ npm run refresh

# Configure app

Anodine utilizes dotenv[https://github.com/motdotla/dotenv] for environment variable configuration. Look at the default.env file to see options avaiable.

- NODE_ENV (node environment)
- APP_NAME (application name)
- PORT (application port)
- HOST (hostname for application)
- JWT_SECRET (token secret ket)
- TRUST_PROXY (express js trust proxy setting)
- HASH_SALT (hashing salt)
- CLUSTER_DOMAIN (mongo db clsuter name)
- DB_NAME (databse name)
- DB_USER (databse user name)
- DB_PASS (databse user password)

# Running the project (development mode)

Anodine utilizes nodemon [https://www.npmjs.com/package/nodemon] auto-restart of server after
changes and edits.

    $ npm run dev

See `package.json` for description of task.

# Start application (production mode)

    $ npm start

# Deployment (Docker and Amazon Container Service or ECS): PROPOSE but you can deploy it on any Cloud provider

Anodine utilizes various services provides by AWS:

- EC2 (Load balancer, Target Groups, Security groups)
- ECR (Docker container registry)
- ECS (Container Services that handles autoscaling and destination of "tasks")
