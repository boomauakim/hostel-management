# Hotel Management

### Tech Stack
- React.js
- Node.js
- MongoDB 

### How to run
1. Define value to the env. variable in `docker-compose.yml` 
```
SECRET_KEY: # Random string or string

REACT_APP_GOOGLE_MAP_KEY: # Google Maps JavaScript API token key
```
> **Note**: You can change default value of env. variable if you want.

2. Run docker-compose and waiting for it.
```
$ docker-compose up -d --build
```
3. Complete !
```
http://localhost:3000 # for frontend

http://localhost:3030/api # for backend
```