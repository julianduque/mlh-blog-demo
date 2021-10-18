# Node.js Basic Blog App with Fastify and PostgreSQL

## Getting Started

1. First install Heroku on your PC through WSL. Run the command

``` sh
sudo snap install heroku --classic
```

2. I built this alongside Julian using npm commands and installing fastify using WSL. I installed Heroku CLI on my computer and installed node.js through Volta (https://docs.volta.sh/)

``` sh
curl https://get.volta.sh | bash
```

3. After installing Volta I ran

``` sh
volta install node
```

4. Then install fastify (https://www.npmjs.com/package/fastify-cli)

``` sh
npm install fastify-cli -g
```

5. I used this cmd to generate a new node.js project and create the necessary files (e.g. package.json (which is the description of the project and the dependencies))

``` sh
fastify generate abdul-arif-blog
```

6. You can just clone this project and start from the next list to install all the depencies automatically

``` sh
npm install
```

7. We used root.js to define all routes. Fastify works using HTTP methods such as GET, POST, DELETE, PUT, OPTIONS, etc.

8. Then we get the plugin point-of-view, specifically we will implement handlebars

``` sh
npm install point-of-view handlebars
```

9. Use ERD Editor extension in VS Code to see databases. Make sure you are using git for the next part because heroku supports git-based deployments. 

``` sh
git init
```

10. Then we create a Heroku app (see step 2. of next section) and then add support for postgresql on package.json using the cmd below

``` sh
npm install pg fastify-postgres
```

11. Then we register it on app.js and use connectionString which contains the url with the username, password, server, port & database name for this postgresql base that we are going to access. We use a remote postgresql db and we pull this info from Heroku. process.env meanse we are getting DATABASE_URL from the enviroment. So we need to load this info into the enviroment when we are running our application. But since we don't have that info locally we will fetch the remote configuration and put it in our local enviroment

``` js
  // Register fastify-postgres
  fastify.register(require('fastify-postgres'), {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
```

12. Then we use heroku config to see the DATABASE_URL

``` sh
heroku config -a abdul-arif-blog
```

13. We create a .env file and ignore it in .gitignore so this sensitive info won't appear when you push your code to GitHub

14. Then we use heroku config --shell to get the line to put in our .ent file which sets the DATABASE_URL

``` sh
heroku config --shell -a abdul-arif-blog
```

15. Then we did

``` sh
npm install dotenv
```

14. Add in app.js, this loads any .env you have in your folder and fetches those variables and loads them into the enviroment. We have successfully configured our database

``` js
require('dotenv').config()
```

15. In root.js we add a query

``` js
  fastify.get('/about', async function (request, reply) {
    const { rows } = await fastify.pg.query('SELECT * FROM users LIMIT 1') // we are adding a query to give us 1 result
    
    // const results = await fastify.....
    // const rows = results.row
    // our line extracts the rows properties in one step. This is called object destructuring in JavaScript
    
    const [user] = rows // assign that value to user variable
    
    // const user = rows[0]

    return reply.view('./templates/about.hbs', { user })
  })
```

16. We can update our database values by running these commands and specify the attribute that you want to change

``` sh
heroku pg:psql -a abdul-arif-blog
```
``` sh
select * from users;
```
``` sh
UPDATE users SET avatar_url = '/avatar.png' WHERE id = 1;
```

17. Deploy application through terminal or through https://dashboard.heroku.com/apps/ and then select your app and hit deploy


``` sh
git add .
```
``` sh
git status
```
``` sh
git commit -m "read profile from db"
```
``` sh
git push heroku main

18. We get an error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch

``` json
// change the IP from local 127.0.0.1, Heroku needs this application to be available on a more open IP which is 0.0.0.0 
 "start": "fastify start -l info app.js" // we change this to 
 // this
"start": "fastify start -a '0.0.0.0' -l info app.js", 
```

19. I was having a lot of issues with WSL so at the end I copied julians package.json and inserted it into mine and ran npm install, pushed the commit and then ran the cmd below and everything worked fine and website was deployed!

``` sh
git push heroku master
```


## After cloning this repository, please do the following to get it running properly:

1. Install Dependencies (creates node_modules folders and gets dependencies from package.json file)
``` sh
npm install
```

2. Create a Heroku app

``` sh
heroku create <unique-app-name>
```

3. Create a Heroku PostgreSQL database

```sh
heroku addons:create heroku-postgresql:hobby-dev
```

4. Load the database with the seed data (or copy everything from database.sql and paste it into the database terminal after running the cmd heroku pg:psql)

```sh
heroku pg:psql < database.sql
```

5. Fetch the Heroku PostgreSQL database URL

```sh
heroku config --shell > .env
```

6. Run the server locally (Side note: If you customize your own scripts on package.json then you have to specify with "npm run <script_name>")

``` sh
npm run dev
```
Or
``` sh
npm start
```
7. Open the browser and go to http://localhost:3000

8. Deploy the app to Heroku

```sh
git push heroku main
```

9. Open the app on Heroku

``` sh
heroku open
```
