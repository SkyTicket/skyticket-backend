# SkyTicket Back-End

## Profile
Project Title: SkyTicket

## Installation
### Prerequisites
Before installing, ensure you have the following prerequisites installed on your system:
- **Node.js**: The project requires Node.js to run. You can download it from Node.js official website.
- **npm**: npm (Node Package Manager) is used to manage the dependencies and should come installed with Node.js.

### Installing Dependencies
To set up the project for development on your local machine, please follow the steps below:

1. First, clone this repository to your local machine using Git commands. For example:
```bash
   git clone https://github.com/SkyTicket/skyticket-backend.git
    cd skyticket-backend
```
2. Run the following command in the root directory of the project to install all necessary dependencies:
   
   ```npm install```

## Starting the App
### Running the Application
Once the installation is complete, you can start the application using one of the following methods:
1. **npm**
   
   Automatically start using **nodemon** (if you have installed all the required dependencies and configured the value of "start" under the "scripts" to "nodemon index.js" in `package.json` file).
   
   ```npm start```

2. **Directly using Node.js or nodemon**
   
   ```node index.js``` or ```nodemon index.js```

## Configuring .env
1. Set the `DATABASE_URL` value to your own database information.