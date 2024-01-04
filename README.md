<img width="1512" alt="todo page" src="https://github.com/darshpat01/todo-list/assets/68650149/0aac49b3-3a01-4d92-a246-a8133ade425e">
# Todo-List

To-do web app with authentication




## Screenshots

login page
<img width="1497" alt="login page" src="https://github.com/darshpat01/todo-list/assets/68650149/54944487-c92d-4e91-99dc-f70ca4494d4a">

register page
<img width="1502" alt="register page" src="https://github.com/darshpat01/todo-list/assets/68650149/e39c1361-57eb-4398-a5e9-0c0cda7bde40">


todo page
<img width="1512" alt="todo page" src="https://github.com/darshpat01/todo-list/assets/68650149/4f3b8671-0fd9-4429-855c-f9bdd01c92b7">

responsive
<img width="325" alt="responsive" src="https://github.com/darshpat01/todo-list/assets/68650149/2f2dec65-6972-41ea-8db7-9d1cf208db4f">
 


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
        db_connection=<MongoURI>
        secret="Random String"
        PORT=5001
```
--> Replace <MongoURI> with your own MongoURI

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
