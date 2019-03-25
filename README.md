# directory-frontend
Campus Directory Frontend: A Progressive Web App made with VueJS.

## What is this?
This is a web-app that shows people and organizations in a community. This allows members to know each other and find potential connections.

It uses JavaScript, VueJS and Vuetify to have a material layout.

## Status
Currently, we are **actively developing** this. It shall have bugs, since we're right now testing everything, and making it stable. Also, this is an experimental development, and we are learning while we develop, so it might contain unusefull forgotten code. If you plan to use this in a hostile production environment, do it under your own responsibility.

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
Create a file called `.env` (yes, nothing before the dot. It's a hidden file)
```
touch .env
```
Open this `.env` file (with any text editor) and set the environmen vars. Just copy and paste this, and update your api url:
```bash
VUE_APP_API_URL=https://your-api-url.com
VUE_APP_API_PEOPLE=getPeople
VUE_APP_API_STARTUPS=getStartups
VUE_APP_API_ORGS=getOrganizations
VUE_APP_API_LOCATION=isLocationValid
VUE_APP_ANALYTICS_TRACKING_ID=UA-123456789-0
VUE_APP_NEED_AUTH=false
```
*If you use the cloud-functions based backend, your URL will be something like https://us-central1-projectID.cloudfunctions.net or similar*

Start developing
```
npm run serve
```

# Build a production version
In the project folder, execute
```
npm run build
```
And you will have your prouction-ready build in the `/build` folder. The content in that folder is ready to deploy in your favorite hosting service (even in github pages...)

# Contribute
For any problem you find, feel free to open an issue. If you find something you want to fix, feel free to launch a Pull Request to `develop` branch. Extra points if you link it with the related issue.

The same for new features ^^

# License
MIT
