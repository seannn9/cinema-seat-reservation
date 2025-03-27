# Cinema Seat Reservation Website (ReelTime)

This is a prototype of an online cinema seat reservation for our Software Engineering course.

## Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/en)
- [XAMPP](https://www.apachefriends.org/download.html) (for MySQL and Apache)
- [pnpm](https://pnpm.io/installation) (for faster build time)

> [!NOTE]
> pnpm is optional but recommended
```sh
npm install -g pnpm@latest
```

## Setup the Development Environment
Follow the setup process step-by-step:

### Clone the repository
```sh
git clone -b release/revamped https://github.com/seannn9/cinema-seat-reservation.git
cd cinema-seat-reservation
```

### Install Dependencies
```sh
cd client
pnpm install
cd ../server
pnpm install
```
### Set Up Database
1. Get the [SQL files](./client/src/sql) from the codebase
2. Open XAMPP and start `MySQL Database` and `Apache Web Server`
3. Go to http://localhost/phpmyadmin/
4. Create a new database and name it `filmreserve` then click `Import`
5. Click `Browse` then import all the SQL files in the database

## Run the Development Server
If you are using npm, just replace `pnpm` with `npm`
```sh
cd client
pnpm run dev
```
On a separate terminal:
```sh
cd server
pnpm start
```

> [!IMPORTANT]
> Make sure to run the client and server in separate terminals.

Finally, go to http://localhost:5173/

## Todos
- [x] Welcome Page
- [x] Login/Register using localstorage
- [x] Dashboard containing dummy movies
- [x] Redirect to ticket reserving page when clicking on a movie card
- [x] Working Seat selection/reservation
- [x] Add a checkout and ticket system then store in database
- [x] Admin page for CRUD operations
- [x] Working dummy payment system
- [x] Dummy QR Code System for tickets
