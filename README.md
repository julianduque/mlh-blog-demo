# Node.js Basic Blog App with Fastify and PostgreSQL

## Getting Started

1. First install Heroku on your PC through WSL. Run the command

``` sh
sudo snap install heroku --classic
```

2. I built this alongside Julian using npm commands and installing fastify using WSL. I installed heroku on my computer and installed node.js through Volta (https://docs.volta.sh/). 

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

5. I used this cmd to generate a new node.js project and create the necessary files (e.g. package.json (which is the description of the project and the dependencies)). 

``` sh
fastify generate abdul-arif-blog
```

6. You can just clone this project and start from the next list to install all the depencies automatically.

``` sh
npm install
```

7. We used root.js to define all routes. Fastify works using HTTP methods such as GET, POST, DELETE, PUT, OPTIONS, etc.

After cloning this repository, please do the following to get started:

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

4. Load the database with the seed data

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
