# SkyTicket Back-End

## Profile
Team Name: Djarum 76 (Tim 7)
Project Title: SkyTicket

### Contributors
Praise be to Allah for all of our health and for making this final project run smoothly.

Shout out to:

1. [Tridiktya Hardani Putra](https://github.com/trdkhardani)
2. [Ahmad Farid Zainudin](https://github.com/ahazain)
3. [Kevin Risky Abadi](https://github.com/kevinvinn)
4. [Usman Hidayatulloh Sidiq](https://github.com/usmanhdsidiq)

For their huge contribution to this project. Thanks, guys!

And also big thanks to our mentors:

1. [Mas Febrian Aditya Ramdahan](https://github.com/febrianAditya) as the Mentor of this batch's Back-End Javascript course.
2. [Mas Imam Taufiq Hermawan](https://github.com/ImamTaufiqHermawan) as the Mentor of this batch's Fullstack Web Javascript course.
3. [Mas Jensen Alimukti](https://www.linkedin.com/in/jensen-alimukti-28205973/) as the former mentor of this batch's Back-End Javascript course.


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
   
   Automatically start using **nodemon** (if you have installed all the required dependencies and configured the value of "start" under the "scripts" to "nodemon app.js" in `package.json` file).
   
   ```npm start```

2. **Directly using Node.js or nodemon**
   
   ```node index.js``` or ```nodemon index.js```

## Configuring .env
You can access the needed environment variables in the [.env.example](https://github.com/SkyTicket/skyticket-backend/blob/main/.env.example) 
1. Set the `DATABASE_URL` value to your own database information.
2. By default, `PORT` is 3000. However, you can change the port to your own port as long as it's not in use.
3. Set the `NODE_ENV` to either 'development', 'test', 'staging', or 'production'. However, in this case, since you will try it on your local computer, use 'development' as the value.
4. `STAGING_SERVER_NO_SSL` and `PRODUCTION_SERVER_NO_SSL` values are fixed. These are used for sending E-tickets to the user's email.
5. The default value of `ETICKET_PDF_PATH` may not work in your machine. You may change it to the full or specific directory to **skyticket-backend/public/etickets**.
6. Set the value of `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your own Google Client. This is to be used as the OAuth authentication.
7. Provide secure `JWT_SECRET` by running this on your terminal: `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`. Then, copy and paste the output as the value of `JWT_SECRET`. However, since you will try this on your local machine, it's fine to use the default value as the `JWT_SECRET`
8. Set the `EMAIL_USER` to your own gmail address.
9. Set the `EMAIL_PASS` to your own gmail app password.
10. `SESSION_SECRET` applies the same as `JWT_SECRET`
11. Set the `FRONTEND_RESET_PASSWORD_URL` to the Front-End's host. Since you will run it on your local machine, use the default value, but with port that you use to run the [Front-End](https://github.com/SkyTicket/skyticket-frontend/) locally.
12. `FRONTEND_TRANSACTION_HISOTRY_URL` applies the same as `FRONTEND_RESET_PASSWORD_URL`
13. Set the `MIDTRANS_SERVER_KEY` to your own Midtrans Server Key.
14. Set the `MIDTRANS_CLIENT_KEY` to your own Midtrans Client Key.

## Database
1. Run `npx prisma migrate dev` in the **skyticket-backend/src/** directory.
2. Wait for the database migration to be completed.
3. Voila, your database is ready!
4. Run **src/flights-seeder.sh** by using `sh flights-seeder.sh` command if you are already in **skyticket-backend/src/** directory.
5. After that, run `node prisma/seeders/seats.seed.js`, `node prisma/seeders/flight_seat_assignments.seed.js`, and `node prisma/seeders/users.seed.js` command (sequentially) if you are already in **skyticket-backend/src/** directory.
6. Ta-da, you have some data in your database!