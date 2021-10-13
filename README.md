# Node.js Basic Blog App with Fastify and PostgreSQL

## Getting Started

After cloning this repository, please do the following to get started:

1. Install Dependencies
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

6. Run the server locally

``` sh
npm run dev
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