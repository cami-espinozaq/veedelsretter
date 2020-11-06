# Veedelsretter app

This is a Flask + React project. The react proyect was built with ``` create react app ```


## before running project

1. flask server:

- install flask and python3
- create a virtual enviroment
- install all necessary packages from *requirements.txt* by running: ``` pip install -r requirements.txt ```

2. node server:

- install node.js
- run ``` npm install ``` inside the folder to install all packages

## to run on deployment

1. run flask server:

```
export FLASK_DEV=deployment
export FLASK_APP=$PWD/app
flask run
```
flask server runs at http://localhost:5000

IMPORTANT: you can run the whole app from this server, **only if the app is built first**, by running ``` npm run build ``` before starting the server.

2. run react (node) server:

``` npm start ```

node server runs at http://localhost:3000
