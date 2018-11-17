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

├── src
│   └── main
│       ├── common //Utilities
│       │   ├── hash.utils.js
│       │   └── token.utils.js
│       ├── controller //Handle task
│       │   ├── auth.controller.js
│       │   ├── token.controller.js
│       │   └── user.controller.js
│       ├── middleware //Verify before execute task
│       │   ├── auth-permission.middleware.js
│       │   ├── auth.middleware.js
│       │   └── verify-token.middleware.js
│       ├── model // Database Model
│       │   └── user.model.js
│       ├── route //Rest Endpoint
│       │   ├── auth.route.js
│       │   ├── health.route.js
│       │   ├── root.route.js
│       │   ├── token.route.js
│       │   └── user.route.js
│       ├── service // Comunicate with Model
│       │   ├── base.service.js
│       │   └── user.service.js
│       ├── vo // Value Object
│       │   └── user.vo.js
│       ├── app.js // Express Module
│       ├── config.js // Read config.json and parse it into javascript object
│       ├── db.js //Open Connect to Database
│       └── log.js // Just Loger
├── README.md
├── config.json //Enviroment
├── package-lock.json
├── package.json
├── server.js // Run it to start up server
└── start_up.sh // script shell (run mongod && server.js)

```
---
> --->: used
```
App (Express) ---> Route ---> Controller ---> Service ---> Model
```
## Rest API
| Path		 | Method | Description |
| -----------| -------| ----------- | 
| /rest   	 | N/A    | Base URL	|
| /rest/users/registration 	 |POST | Create Account |
| /rest/users/:userId    	 |PATCH| Update Account |