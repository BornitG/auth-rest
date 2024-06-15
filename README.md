# auth-rest

`auth-rest` is a REST API for user authentication. It provides endpoints for user registration, login. The API is built using Node.js, Express.js, and MongoDB.

## Installation

1. Clone the repository: 
    ```
        git clone https://github.com/BornitG/auth-rest.git
    ```
2. Install the dependencies: 
    ```
        pnpm install
    ```
3. Create a `.env` file in the root directory and set the following environment variables:
    - `PORT`: The port number to run the server on (default: 3000)
    - `MONGO_URL`: The MongoDB connection URL
    - `MONGO_DB_NAME`: The name of the MongoDB database
    - `JWT_SEED`: The secret key for JSON Web Tokens
4. If you need a database, configure the docker-compose.yml file and run the following command to start the desired services.
    ```
        docker-compose up -d
    ```
5. Start the server: 
    ```
        pnpm run dev
    ```

## Usage

### Register a new user

- Method: POST
- Endpoint: `/api/auth/register`
- Request Body:
    - `username` (string)/(unique): The username of the user.
    - `firstName` (string): The user's first name.
    - `lastName` (string): The user's last name.
    - `email` (string)/(unique): The email of the user.
    - `password` (string): The password of the user.
- Optional Request:
    - `img` (string): The user's profile image
- Response:
    - `user` (object): The user is information.
    - `token` (string): The JSON Web Token for authentication.

### Login

- Method: POST
- Endpoint: `/api/auth/login`
- Request Body:
    - `username` (string): The username of the user.
    - `email` (string): The email of the user.
    - `password` (string): The password of the user.
- Response:
    - `user` (object): The user is information.
    - `token` (string): The JSON Web Token for authentication.