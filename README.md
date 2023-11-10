# Flight Booking Service

## Overview

The Flight Booking Service is a microservice in the Airline Management system responsible for handling flight booking operations. Users can book flight tickets, receive notifications about arrival and departure, apply booking filters, and set price ranges. The service uses AMQP Lib for messaging services, Morgan library for logging, and PostgreSQL as the database with Sequelize and Sequelize CLI as the ORM.

## Features

- **Flight Booking**: Allows users to book flight tickets.
- **Arrival and Departure Notifications**: Sends notifications to users about flight arrivals and departures.
- **Booking Filters**: Provides filters for users to customize their flight booking experience.
- **Price Ranges**: Supports setting price ranges for flight tickets.
- **Messaging Services with AMQP Lib**: Utilizes AMQP Lib for efficient communication between microservices.
- **Logging with Morgan**: Implements logging using the Morgan library for better visibility into request/response details.
- **PostgreSQL Database with Sequelize**: Stores and retrieves relevant data in a PostgreSQL database, leveraging Sequelize as the ORM.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js.
- **PostgreSQL**: Relational database for data storage.
- **Sequelize**: Promise-based ORM for Node.js and PostgreSQL.
- **Sequelize CLI**: Command-line interface for Sequelize.
- **AMQP Lib**: Library for AMQP (Advanced Message Queuing Protocol) communication.
- **Morgan**: HTTP request logger middleware for Node.js.

## How to Use

1. **Clone the repository:**
    ```bash
    git clone https://github.com/vishnu-mouli-102408/Flight-Booking-Service
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env` file in the project root.
    - Set the following variables in the `.env` file:
        ```env
        PORT=your_preferred_port
        SYNC_DB=true
        FLIGHT_SERVICE_BASE_URL= url_of_search_serice
        FLIGHT_AUTH_SERVICE_BASE_URL = url_of_auth_service
        EXCHANGE_NAME= same_name_given_in_reminder_service
        REMINDER_BINDING_KEY= same_name_given_in_reminder_service
        MESSAGE_BROKER_URL="amqp://localhost"
        ```
4. **Run Sequelize Init**
   ```bash
   npx sequelize init
   ```
5. **Inside the config/config.json file make sure to add your local DB username and Password and appropriate DB name.**
6. **Run Sequelize Create**
   ```bash
   npx sequelize db:create
   ``` 

7. **Run Sequelize Migrations:**
    ```bash
    npx sequelize db:migrate
    ```

8. **Run the Flight Search Service:**
    ```bash
    npm start
    ```

6. **Access the Flight Booking Service:**
    - The service will be running on the specified port (default is 3004).

7. **Explore the Flight Booking Service!**

## Configuration

Ensure to set the appropriate environment variables in your `.env` file for configuring the Flight Booking Service:

- `PORT`: Port on which the service will run.
- `SYNC_DB`:  While starting the server ensure to make it true and after that either comment it out or make it false. Since DB Sync has to be done once.

## License

This project is licensed under the [MIT License](LICENSE).
