# Development setup
The foundation of our frontend app was made with create-react-app, which abstracts away a lot of stuff like webpack, so getting going with it is a little different than you may be used to.

1. We are using yarn instead of npm. Instructions for installation on both Mac and Linux are [here](https://yarnpkg.com/lang/en/docs/install/#mac-tab). It's basically just npm but better, still uses package.json. When you pull down the repo, simply run the command `yarn` to install all dependencies.
2. No need to run webpack, create-react-app has scripts to do all that for you. When you want to launch a server and see the app in action, use the command `yarn start` and a server will be run AND a window launched for you in the browser. Neat!
3. Run the react app on a port other than 3000. In development, we'll have our Rails backend running on 3000, that's how the code is set up at the moment. If you have the Rails server running, `yarn start` will detect that something is already using the port 3000 and ask if you want a different address. If you say yes, it will launch on port 3001 or something.

All this will change for deployment to production. We'll cross the bridge when we get to it. 
