# JapaLearn - a Japanese Vocabulary Learning Application

Welcome to the Japalearn! This application is built using Express.js, MongoDB, Mongoose and TypeScript to help you efficiently learn japanese vocabulary.

**Getting Started**
To get started with the Japalearn locally, follow these steps:

## Clone this repository to your local machine:

git clone [https://github.com/habib-utsho/japalearn-server.git](https://github.com/habib-utsho/japalearn-server.git)

**Navigate into the project directory:** cd japalearn-server
**Install dependencies:** yarn install

**Set up your environment variables:**
Create a .env file in the root directory and provide the following variables:

###### **NODE_ENV**=development | production

###### **PORT**=5000

###### **MONGO_URI**=your_mongodb_connection_string

###### **SALT_ROUNDS**=your_SALT_ROUNDS_for_passoword_hash

###### **JWT_ACCESS_SECRET**=for_JWT_access_token

###### **JWT_REFRESH_SECRET**=for_JWT_access_token

###### **JWT_ACCESS_EXPIRES_IN**=for_JWT_access_token

###### **JWT_REFRESH_EXPIRES_IN**=for_JWT_access_token

## Technology used

- TypeScript
- Express.js
- MongoDB
- Mongoose
- ZOD
- JWT
- multer
  -cloudinary

## Features

- Authentication
- Authorization
- Admin can create, update and delete lessons, vocabulary and tutorials
- Implemented advanced filtering, searching and pagination
- Role base page access

Running the Server by- **yarn dev**

Local Base URL: **[Link](http://localhost:5000/api/v1)**

Production Base URL: **[Link](https://japalearn-server.onrender.com/api/v1)**
