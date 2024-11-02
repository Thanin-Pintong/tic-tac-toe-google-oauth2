Prerequisite
node (18+), npm (9.7+) and git

Download the Tic-Tac-Toe project(s) from Github repository.
$ git clone

Change directory to the project named "tic-tac-toe-google-oauth2"
$ cd tic-tac-toe-google-oauth2
$ cp package.json.linux package.json

Replace Client ID and Client secret in the file 'src/config/passport.ts' in the Backend project 'tic-tac-toe-google-oauth2' 
 with your Client ID and Client secret, respectively.

The project is composed of multi-level projects 
 like one parent project is the Backend project and one child project is the Frontend project.
Install packages for both projects and build the Frontend project automatically.
$ npm install

(Optional)
If during installing packages for the child project failed, 
 you can install packages directly in the child project (build will run automatically after the packages installed) 
 and back to the parent project after finished.
$ cd tic-tac-toe-pwa
$ npm install
$ cd ..

Run build in the Backend project, it will prepare and collect the built files from the Frontend project before build itself.
The folder named 'tictactoe' in the Backend project will be created under 'src' for storing the built files from the Frontend project.
Several files will be copied from the Frontend to the Backend as well. 
Finally, the 'dist' folder will be created to run and deploy independently.
$ npm run build

Sometimes, we cannot run build10 successfully while using 'npx copy-node-modules . dist'
You can run 'npm install' directly in the 'dist' folder and back to the Backend project to run 'npx tsc'.
$ cd dist
$ rm -rf node_modules
$ npm install
$ cd ..
$ npx tsc

We can run this app locally by 2 ways like production and development.
Notice that both running use different location of SQLite3 database file.

As production both inside root project of Backend and inside 'dist' folder.
$ node dist/index.js
Or
$ cd dist
$ node index.js
Or
$ npm start

As development inside root project of Backend.
$ npm run dev

