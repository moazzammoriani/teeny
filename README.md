# Introduction
This is a simple microblogging app in the spirit of twitter.

# How to build and run

## Step 1: Install dependencies

```bash
$ npm install
```

## Step 2: Build database

There is a npm script for this.

```bash
$ npm run build-db 
```

## Step 3: Set environment variables for JWT

You will have to create a `.env` file that stores your `ACCESS_TOKEN_SECRET` and `REFRESH_ACCESS_TOKEN_SECRET`. Without this JSON Web Token will not work.

## Step 4: Run
 
```bash
$ npm run start
```

