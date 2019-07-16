# Moviedb API Challenge

## Getting Started

### Prerequisites
MongoDB - https://docs.mongodb.com/manual/installation/

Node 8+

MovieDB API Key

### Configuration

`./config/default` - update the MongoDB connection string and the MovieDB api key. 

## Run/Deploy

A Postman collection has been provided for ease of testing.

1. ```npm install``` - install dependencies

2. ```npm run start``` - start express, listening on configured port

3. Create an authorization key or api-key: ```GET /api/login```. 

4. Create a User with ```POST /api/admin/users``` passing the API key as `x-api-key` header and a body payload as ```{  "username": "boaty", "firstName": "Boaty", "lastName": "McBoatface" }```

5. Retrieve User ID from ```GET /api/admin/users``` with API key.
 
6. Create a User favorite - ```POST /api/users/[USER_ID]/favorites```, a body payload as ```{ "movieID": 76341 }```