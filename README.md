# Tic Tac Toe Game with Backend
This project is different from normal tic-tac-toe games that it applies Google OAuth2 to login before playing.
It locks playing only for Player-VS-Bot mode. But it can record and view play histories of players in the database. 
The game constraints is that if you beat bot, you get one point. If you're lost, you lose 1 point.
Besides, if you win in a row for 3 times, you get one more extra point.

## Google Credential is needed
- Go to [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
- Click **Credentials** on the left , choose one of your projects.
- Click **CREATE CREDENTAILS**, choose **OAuth client ID**
- Create **OAuth consent screen** with **User Type** as **External**, then click **CREATE** button.
- Provide **App information**, then click **SAVE AND CONTINUE** button until finish. Finally, click **PUSH TO PUBLISH**.
- Continue creating **OAuth client ID**.
    - Application type = Web Application
    - Name = Google OAuth Passport Client 1
    - Authorized JavaScript origins (click **ADD URI**) = http://localhost:4000
    - Authorized redirect URIs (click **ADD URI**) = http://localhost:4000/auth/callback
    - Finally, click **CREATE** button.
- Save **OAuth client created** information in one place.
    - Client ID = \<Your Cliend ID\>
    - Client secret = \<Your Client secret\>
    - Creation date = October 21, 2024 at 5:42:20 PM GMT+7
    - Status = Enabled
    - Click **OK** button.
- Replace **Client ID**  and **Client secret** in file **src/config/passport.ts**  of the project **tic-tac-toe-google-oauth2** 
with your **Client ID** and **Client secret** which you have to clone from Github, next step.
  
## Available Scripts

First of all, see details in files **ReadmeHow2BuildTicTacToe4Linux.txt** and **ReadmeHow2BuildTicTacToe4Windows.txt**.

In the project directory, you can run: 

### `npm install or yarn install`
Install the npm packages belonging to both Backend (tic-tac-toe-google-oauth2) 
and Frontend (tic-tac-toe-pwa) projects.
After finished, the Frontend project will run Build automatically.

### `npm run build or yarn build`

Builds the app for production to the `dist` folder.\
It collects React built files from the Frontend project and Express build files from  
the Backend project to the `dist` folder.

### `npm start or yarn start`

Runs the app in the production mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### `npm run dev or yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.