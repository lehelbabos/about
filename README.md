# Welcome
You've found my portfolio! Nothing fancy – feel free to have a look around. I apologize in advance about the mostly uncommented spaghetti code.

## Setup
Pretty simple... `git clone git@github.com:lehelbabos/about.git && cd about/ && npm install`... You'll also need to install `gulp-cli` and a few other things... If it's throwing you errors and you can't get it sorted gimmie a shout. 

## Run Ghost
CD to `posts` then run `nvm use` to swtich to the correct version of node. Then (assuming ghost is installed already) run `ghost start`.

If it doesn't work again the easiest way to repair it is:
- Move the current `posts` folder out of this repo and rename it to `archive`. Keep for reference till the new one is up.
- Make a new `posts` folder in the repo. then cd to it. 
- Run `ghost install local` . This should spin up a fresh install of ghost. Once this is done and Ghost is up and running, create a new account. 
- Stop ghost by running `ghost stop`
- Go to the original `archive/content` to `posts/content`
    - data
    - images
    - themes (only the attila subfolder)
- Start ghost by running `ghost start`
- Log in with your credentials (should be saved in your password manager)

## Run local
Once you're done setting up just hit `npm start` which will load up `grunt` start `watching` all the source files and spin up a `server` and opens the page in the browser. *Might* need to refresh first time you load.

Bon voyage!!