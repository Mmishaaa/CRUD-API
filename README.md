## 1. Preparing application files

Clone this repository with the command:

```
git clone https://github.com/Mmishaaa/CRUD-API.git

```
Navigate to the newly created folder:

```
cd CRUD-APi

```
Install the dependencies with the command:

```
npm i

```
In the root folder of the application, create a text file called `.env`, write the environment variable `PORT` in it with the value of a convenient port for starting the application. For convenience, there is an `.env.example` file with an example in the root folder, you can simply rename it into .env. If the `PORT` variable is not set or the `.env` file is not created at all, then the application will run on the default port: 3000


```
## 2. Application launch

For convenience, the application has a number of scripts to run or build in different modes

- Сommand


```
npm run start:prod

```

starts the build process and then runs the bundled file

- Сommand

```
npm run start:dev

```
runs the application in development mode without horizontal scaling. In this mode, you can make changes to the application code, it will automatically restart when you save changes

## 3. Working with the application

It is recommended to use [Postman](https://www.postman.com/) to send requests

Application only supports `GET`, `POST`, `PUT` and `DELETE` request methods

Users in the database are stored as objects:

```ts
{
id: string;
username: string;
age: number;
hobbies: string[];
}
```

The user **id** is immutable and is generated on the server when the user is created. The remaining fields are **MANDATORY** to pass in requests if the request must contain a body.

On a `GET` request to `http://localhost:${YOUR_PORT}/api/users` the application returns a list of all users in JSON format.

On a `GET` request to `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` the application returns the user with the passed `id === SOME_USER_ID`.

A `POST` request to `http://localhost:${YOUR_PORT}/api/users` with a body containing all required fields creates a new user record in the database. It is assigned a unique id. The application responds with a newly created user record.

When a `PUT` request to `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` with a body containing all required fields, the data of the previously created user is overwritten in the database. The user id does not change.

A `DELETE` request to `http://localhost:${YOUR_PORT}/api/users/${SOME_USER_ID}` removes the user record with `id === SOME_USER_ID` from the database.

## 4. Running tests

# **_Application must be running before running tests!!!_**

Command

```
npm run test
```

runs application tests
