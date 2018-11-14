## Start App
> Find running command in package.json#script </br>
> Use
```
npm start
```
> Or
```	
node server.js
```

## Project Stucture

```

├── README.md
├── config.json //Enviroment (e.g like database url, port,..)
├── package-lock.json
├── package.json
├── server.js //Run it to start up Server
└── src
    └── main
        ├── app.js //Express Module
        ├── config.js //Just read config.json and parse to Javascript Object
        ├── controller //Controller should be implemented here
        │   └── user.controller.js
        ├── db.js // Create connection to Database
        ├── log.js // Just Logger
        ├── model // Binding Model 
        │   └── user.model.js
        ├── route // Route RestAPI
        │   ├── root.route.js
        │   └── user.route.js
        └── service // Comunicate with Model (Controller would be used Service)
            └── user.service.js

```
---
> --->: __used__
```
App (Express) ---> Route ---> Controller ---> Service ---> Model
```
## Rest API
| Path		 | Method | Description |
| -----------| -------| ----------- |
| /rest   	 | N/A    | Base URL	|
| /rest/users/registration 	 |POST | Create Account |
| /rest/users/:userId    	 |PATCH| Update Account |