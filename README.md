# Azure - learning project

A simple "todo" application environment intended to be deployed on Azure. The 
application itself is very basic and core features are missing but the main 
intent was to create a system that can be deployed to Azure and develop some 
tools to make the configureation and deployment process easy and automated.


## Development

After you've cloned this repo and changed working directory to the project 
root, follow the steps below to have all applications up and running and be 
ready to start development.

First, install dependencies - just run `npm ci` in root directory of the 
project.

Now you can lunch development servers that will rebuild applications right 
after you've made any change to the code of the app. There are three 
webpack-based development servers - one for each of the applications. To start 
them, run these commands:

	./manage npm run functionapp-build-watch &
	./manage npm run serverapp-build-watch &
	./manage npm run webapp-build-watch &

This way, you will have all the servers running as background tasks of your 
current shell session. It's important not to run these commands directly as 
`npm run ...` - the `./manage` script sets some environment variables that are 
needed afterwards.

As a result of the build process, a `dist` directory was created. The 
directory contains development versions of the apps. These development 
versions are used by development Docker containers the development builds run 
inside of.

Let's get the containers up and running then:

	./manage docker build
	./manage docker up -d

That's all - browse to `localhost:8080` and verify the system works.

After you'd finished working on the apps, just kill the development servers 
running in background and execute `./manage docker down` to stop and remove 
containers. This will leave e.g. database data volume in your system. Execute 
`./manage docker down -v` to remove all volumes related to the project as well.


## Production builds and Azure deployment

Before building and deploying the system, you have to create configuration 
files. Start with making a copies of configuration templates:

	cp ./config.production.tpl ./config.production
	cp ./azure/config.tpl ./azure/config

Let's start with `./azure/config` file - edit the file so it matches your 
needs and your Azure environment:

- `APPSERVICE_PLAN` - name of the Azure appservice plan the serverapp and 
functionapp will 
		operate under

- `GROUP` - Azure resource group name (it shouldn't exist)

- `LOCATION` - location for the Azure resources that will be created

- `STORAGE_ACCOUNT` - name for storage account the webapp resources container 
will be 
assigned to (verify no one uses the name)

- `COSMOSDB_NAME` - name of CosmosDB account (verify no one uses the name)

Now edit the second file - `config.production` as well:

- `PROJECT_NAME` - name of the project (do not change it without need)

- `MODE` - build mode - should be (and by default is) set to `production`

- `URL_FUNCTIONAPP` - update the URL so the first part of the domain name 
matches 
`STORAGE_ACCOUNT` from above with `-func` postfix

- `URL_SERVERAPP` - update the URL so the first part of the domain name 
matches 
`STORAGE_ACCOUNT` from above with `-srv` postfix


### Production build

After the project's configured, just run `./manage build`. The applications 
will be built in production mode and all resulting files will be saved inside 
the `dist-prod` directory.


### Deployment to Azure

Before we will be able to make an actual deploy, we need to create and 
configure our Azure environment first. Start with logging into Azure with `az 
login`. Once you're logged in, just run:

	./azure/setup

This will take a while - time for coffee ;)

After the command had finished, full environment required by this project have 
been created and configured on your Azure account. All the resources were 
created under the resource group defined in `azure/config` file.

We're ready to deploy the contents of `dist-prod` directory to Azure - let's 
execute:

	./azure/deploy

The deployment process synchronizes contents of `dist-prod/webapp` directory 
with contents of Azure static website storage container, creates deployment 
ZIP files for both serverapp and functionapp and posts these ZIPs into Azure. 
After the command had finished, the whole system should be up and running.

Browse to `https://<your-storage-account-name>.z6.web.core.windows.net` and 
verify everything works for you.

After you no longer see a reason to keep the system running on Azure, execute 
`az group delete -y --name <your-resource-group-name>` to get rid of all 
resources and the group itself.
