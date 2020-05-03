# devconnectors
This is a MERN stack social network app that includes authentication, profiles and forum posts.
[See deployed website on Heroku](https://enigmatic-escarpment-89559.herokuapp.com/)

## Quick Start
Add a default.json file in config folder with the following (don't share your githubToken with others for security reason)
```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```
Install server dependencies
```
npm install
```
Run Express from root
```
npm run server
```
Check in browser on http://localhost:5000/
