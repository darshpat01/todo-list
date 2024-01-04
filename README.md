
# Todo-List

To-do web app with authentication




## Screenshots



## Tech Stack

**Client:** React, TailwindCSS, Vite

**Server:** Node.js, Express

**Databse:** MongoDB




## How to run this app locally?

### 1. Clone the repository and install dependencies

```
git clone https://github.com/darshpat01/todo-list.git
cd todo-list
cd client 
npm install
cd ..
cd server
npm install
```

### 2. Setting up server


Assuming you are in the server folder 

--> first create a .env file in the root 

```
    touch .env
```
--> copy paste code from .env-example to .env

the code will look like: 
```
        db_connection=<MongoURL>
        secret="Random String"
        PORT=5001
```
--> Replace <MongoURL> with your own MongoURL

--> Save the env file. 

--> Now on the terminal type
```
    nodemon app.js
```
--> the server should start running and if you have done
    everything successfully you should see this on terminal 

```
    Serving on port 5001
    Database connected

```


### 2. Setting up client

Go to the client folder

--> type on the terminal: 

```
    npm run dev
```

--> In **Local**: ... you will be able to see the url where the frontend is running. 

--> Open that URL in the browser

--> You are ready to use the Todo-List App. 