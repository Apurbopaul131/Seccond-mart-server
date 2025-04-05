# PAPERCARD BACKEND

## How to locally Install and Run the Project:

### 1. Must be ensure the following prerequisites are already installed in your computer

- Node.js (v16 or later)
- npm (comes with Node.js) or yarn
- MongoDB (local or cloud-based)

### 2. Clone the Repository

Run the following command in your terminal to clone the repository:

```javascript
git clone https://github.com/Apollo-Level2-Web-Dev/batch-4-assignment-2.git
```

### 3. Navigate to the Project Directory

Run the following command to by adding expected directory name:

```javascript
cd your-repo-name
```

### 4. Install Dependencies

Install the required dependencies using npm or yarn:

```javascript
npm install
// or
yarn install
```

### 5. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables to configure your application:

```javascript
//.env
PORT:5000
DATABASE_URL: mongodb+srv://<db_username>:<db_password>@newmission.cmtjh.mongodb.net/?retryWrites=true&w=majority&appName=Newmission

//Replace your <db_username>, <db_password> and database name.
```

### 6. Start MongoDB

Make sure your MongoDB instance is running:

- If running locally, start MongoDB with:

```javascript
mongod;
```

- If using a cloud-based database like MongoDB Atlas ensure your connection string in .env is correctly configured.

### 7. Run the Project

```javascript
//development mode
npm run start:dev
//production mode
npm run start:prod
```

Backend live link: https://stationery-shop-theta.vercel.app
"# Seccond-mart-server" 
