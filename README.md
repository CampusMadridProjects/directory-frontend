# directory-frontend
Campus Directory Frontend: A Progressive Web App made with VueJS.

## What is this?
This is a web-app that shows people and organizations in a community. This allows members to know each other and find potential connections.

It uses JavaScript, VueJS and Vuetify to have a material layout.

## Status
Currently, we are **actively developing** this.

It might have bugs. Also, this is an experimental development, and we are learning while we develop, so it might contain unusefull forgotten code.

If you plan to use this in a hostile production environment, do it under your own responsibility.

You can follow the development, and propose new features, in this repo's issues ^^

# Setup the project
*[optional, but highly recommended]* Install vue cli
```
npm install -g @vue/cli
```
Clone repo
```
git clone URL
```
Move to the folder
```
npm run serve
```
Install dependencies
```
npm install
```
Create a file called `.env.development` (yes, starting with a dot. It's a hidden file)
```
touch .env.development
```
Open this `.env.development` file (with any text editor) and set the environmen vars. Just copy and paste this, and update your data:
```bash
VUE_APP_API_URL=http://localhost:3000/api
VUE_APP_ANALYTICS_ID=UA-000000000-0
VUE_APP_SUPPORT_EMAIL=support@communitytools.co
```

Start developing
```
npm run serve
```

# Build a production version

Probably you will have different env vars in prodution. So, create another .env file called `.env.production` and fill it with the production variables.

Once you have your production env set, in the project folder, execute
```
npm run build -- --mode production
```
And you will have your prouction-ready build in the `/build` folder. The content in that folder is ready to deploy in your favorite hosting service (even in github pages...)

# Contribute
For any problem you find, feel free to open an issue. If you find something you want to fix, feel free to launch a Pull Request to `develop` branch. Extra points if you link it with the related issue.

The same for new features ^^

# License
MIT
