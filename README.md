<p align="center"><img width="344" alt="Screenshot 2023-08-23 at 13 30 26" src="https://github.com/jsarticles-dev/jsad-backend/assets/20026295/95c7cecd-88df-42f3-adda-daf78b47ca5b"></p>



## Introduction

Welcome to the backend repository of JSArticles.dev project, a platform designed to deliver weekly newsletters to users. This project aims to provide a seamless and efficient way to manage and distribute newsletters.

### Technologies
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />&nbsp; 
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" />&nbsp;
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" /> &nbsp;
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />&nbsp;
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" />&nbsp;
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />&nbsp;
<img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />&nbsp;
          
          
          

## :rocket: Features

- **Newsletter Management:** The backend enables newsletter creators to compose, schedule, and manage newsletters effortlessly.
- **Subscriber Management:** Users can subscribe to newsletter, while admins can access subscriber lists.
- **Employee Management:** Employees can create newsletters and edit these newsletters based on their roles.
- **Authentication and Security:** Robust authentication mechanisms ensure data privacy and secure access for both creators and subscribers.
- **API-driven Design:** Our backend follows a RESTful API design, facilitating integration with frontend applications and third-party services.

## :running_woman: Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download and install it from [nodejs.org](https://nodejs.org/).
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (for Deployment)
- [Prettier](https://prettier.io/)

### Installation and Setup 

**1- Clone the Repository:**

```bash
git clone https://github.com/jsarticles-dev/jsad-backend
cd jsad-backend
```

**2- Install Dependencies:**

```bash
npm install
```

**3- Configure Environment Variables:**
<br>
Create a `.env.development` file in the root directory and provide the required environment variables. Refer to the `.env.example` file for a list of variables you need to set.

**4- Start the Server:**

```bash
npm run start:dev
```

**4- Access the API:**
<br>
The API will be available at http://localhost:3000 by default. You can use tools like Postman to interact with the API endpoints.

**5- Testing:**
<br>
Run tests to ensure everything is working as expected:

```bash
npm run test
```

**6- Linting**
<br>
To ensure code quality and consistency, you can run the linting script:

```bash
npm run lint
```

**7- Building**
Compile TypeScript files:

```bash
npm run build
```

## :books: API Documentation

### User Routes

| Endpoint     | Method | Authentication                            | Description                                                                                        |
| ------------ | ------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/users/:id` | GET    | Requires employee auth and specific roles | Fetches user details based on the provided ID                                                      |
| `/users`     | GET    | Requires employee auth and specific roles | Retrieves a list of all users                                                                      |
| `/users`     | POST   |                                           | **Description**: Adds a new user. <br>**Request Body**: <br>`json { "email": "user@example.com" }` |
| `/users/:id` | DELETE |                                           | **Description**: Deletes the user with the provided ID                                             |

### Newsletter Routes

| Endpoint           | Method | Authentication         | Description                                                                                                                                                                                                                                                                                        |
| ------------------ | ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/newsletters`     | GET    |                        | Retrieves a list of all newsletters                                                                                                                                                                                                                                                                |
| `/newsletters/:id` | GET    |                        | Fetches newsletter details based on the provided ID                                                                                                                                                                                                                                                |
| `/newsletters`     | POST   | Requires employee auth | **Description**: Creates a new newsletter. <br>**Request Body**: <br>`json { "content": "Newsletter content", "dateOfDispatch": "2023-08-31", "header": "Newsletter header" }`                                                                                                                     |
| `/newsletters/:id` | PUT    | Requires employee auth | **Description**: Updates the newsletter with the provided ID. <br>**Request Body**: <br>At least one of the following fields is required: `isSent`, `header`, `content`, `dateOfDispatch`. <br>`json { "header": "Updated header", "content": "Updated content", "dateOfDispatch": "2023-09-01" }` |
| `/newsletters/:id` | DELETE | Requires employee auth | **Description**: Deletes the newsletter with the provided ID                                                                                                                                                                                                                                       |

### Employee Routes

| Endpoint              | Method | Authentication                            | Description                                                                                                                                                                                                     |
| --------------------- | ------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/employees`          | GET    | Requires employee auth and specific roles | Retrieves a list of all employees                                                                                                                                                                               |
| `/employees/:id`      | GET    | Requires employee auth and specific roles | Fetches employee details based on the provided ID                                                                                                                                                               |
| `/employees/login`    | POST   |                                           | **Description**: Allows an employee to log in. <br>**Request Body**: <br>`json { "email": "user@example.com" }`                                                                                                 |
| `/employees/register` | POST   | Requires employee auth and specific roles | **Description**: Registers a new employee. <br>**Request Body**: <br>`json { "name": "John Doe", "email": "john@example.com", "password": "secretpassword", "role": "EDITOR" }`                                 |
| `/employees/:id`      | PATCH  | Requires employee auth and specific roles | **Description**: Updates employee details based on the provided ID. <br>**Request Body**: <br>`json { "name": "Updated Name", "email": "updated@example.com", "password": "updatedpassword", "role": "ADMIN" }` |
| `/employees/:id`      | DELETE | Requires employee auth and specific roles | **Description**: Deletes the employee with the provided ID                                                                                                                                                      |

### Authentication Routes

| Endpoint        | Method | Authentication | Description                         |
| --------------- | ------ | -------------- | ----------------------------------- |
| `/auth/isValid` | GET    |                | Checks if a token is valid for auth |

## :white_check_mark: Testing

**Run Tests:**
Use the following command to execute the tests:

```bash
npm test
```

This command will trigger Jest to run all the test files in the tests directory. You'll see the test results and any failures in the terminal.

The testing setup includes:

Unit tests for individual functions or components.
Integration tests using Supertest to test API endpoint and its response.

## License

### MIT License

This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/jsarticles-dev/jsad-backend/blob/master/LICENSE) file for details.
