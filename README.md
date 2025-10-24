# CSV to JSON Converter API

A simple Node.js application that reads user data from a CSV file, converts it into JSON format, and stores it in a PostgreSQL database.  
It also generates an **Age Distribution Report** right in the console after successful data upload.

***

##  Features

- **Custom CSV Parser** – Built without any external CSV library (pure Node.js parsing).
- **JSON Storage** – Automatically handles nested `address` and `additional_info` fields.
- **Error Handling** – Skips invalid rows (like missing or non-numeric ages).
- **PostgreSQL Integration** – Inserts parsed user data directly into a database.
- **Age Report Generation** – Displays a categorized age report (<20, 20–40, 40–60, >60).
- **Lightweight & Developer Friendly** – Minimal setup and easy to extend.

***

##  Prerequisites

Before running, make sure you have:

- [Node.js](https://nodejs.org/) (version 18 or above)
- [PostgreSQL](https://www.postgresql.org/) installed and running locally
- npm (comes with Node)

***

##  Installation

Clone this repository and install dependencies:

```bash
git clone <https://github.com/sahilsanghvi26/csv-to-json-api/>
cd csv-to-json-api
npm install
```

***

## ⚙️ Configuration

Create a `.env` file in the root directory with the following details:

```
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/kelpdb
CSV_PATH=./data/users.csv
PORT=5000
```

**Explanation**:
- `DATABASE_URL` → Connection string to your local PostgreSQL database
- `CSV_PATH` → Path to the CSV file that you want to upload
- `PORT` → Port number on which your server will run

***

##  Database Setup

Make sure your PostgreSQL database and table are created properly.  
You can do this by connecting via `psql` and running:

```sql
CREATE DATABASE kelpdb;

\c kelpdb

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    address JSON,
    additional_info JSON
);
```

***

##  Running the Application

Start the Node.js server:

```bash
npm start
```

If everything is configured correctly, you should see:
```
Server running on port 5000
Csv path: ./data/users.csv
```

***

##  Quick Test Commands

Run these from your terminal to quickly check API responses:

```bash
# Upload CSV and insert into DB
curl -X POST http://localhost:5000/upload

# Get all users
curl http://localhost:5000/users

# Get user by ID
curl http://localhost:5000/users/1

# Generate age report
curl http://localhost:5000/report
```

 Invalid or missing age values are automatically skipped.

***

##  Project Structure

```
csv-to-json-api/
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── upload.js
│   └── utils/
│       ├── csvParser.js
│       ├── db.js
│       └── ageReport.js
├── data/
│   └── users.csv
├── images/
│   └── output.png
├── .env
├── package.json
└── README.md
```

***

##  Output Preview

![Age Distribution Report](./images/age-report.png)
