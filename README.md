# Hotel Management
Inspired by Airbnb and the images used in this project are taken from Airbnb.

### Tech Stack
- React.js
- Node.js
- MongoDB 

### How to run
1. Define value to the env. variable in `docker-compose.yml` 
```
SECRET_KEY: # Random string or string

REACT_APP_API_ENDPOINT: # API endpoint if you run on the server you must change it to URL or IP of the server

REACT_APP_GOOGLE_MAP_KEY: # Google Maps JavaScript API token key
```
> **Note**: You can change default value of env. variable if you want.

2. Run docker-compose and waiting for it.
```
$ docker-compose up -d --build
```
3. Complete !
```
http://localhost # for frontend

http://localhost/api # for backend
```
