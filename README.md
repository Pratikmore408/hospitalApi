Hospital API

This is the repository for the Hospital API designed for managing COVID-19 patients and doctor interactions. The API is built using Node.js and MongoDB.

Project Structure

The project follows a scalable folder structure with separate folder for patients, doctors, and reports:

models: Contains MongoDB schema definitions for Doctors, Patients, and Reports.
controllers: Implements the business logic for handling various API endpoints.
routes: Defines the API routes and connects them to the respective controller functions.
config: Includes configuration files, such as database connection setup 
middleware: Includes the jwt middleware for authentication

Installation
Clone the repository to your local machine

Navigate to the project directory
Install dependencies using npm install

Create a .env file in the root directory and configure the following environment variables:

makefile
Copy code
PORT=3000

JWT=your_jwt_secret_key
DB_PASSWORD = your mongodb atlas password 
or
you can change the entire url to localhost/127.0.0.1/dbname to connect with the local mongodb

Make sure to replace your JWT with a secure secret key for JWT token generation.

To start the server, run the following command: node index.js


API Endpoints

POST /doctors/register: Register a new doctor with username and password.
POST /doctors/login: Log in with username and password to obtain JWT token.
POST /patients/:id/create_report: Create a medical report for a patient.
GET /patients/:id/all_reports: Get all reports of a patient
GET /reports/:status: Get all reports filtered by a specific status.
PUT /doctors/resetpassword: to reset the password

Authentication is required for the following routes:

/patients/:id/create_report
/patients/:id/all_reports
/patients/register: Register a new patient.
To authenticate, include the JWT token obtained after login in the request headers as follows:

Authorization: Bearer <your_jwt_token>

Video Demonstration
For a detailed demonstration of the project, including folder structure explanation and API usage with Postman, please refer to the following video: https://youtu.be/p7CFK9--0Z8

