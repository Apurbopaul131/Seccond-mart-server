# SECCONDMART BACKEND

## How to locally Install and Run the Project:

### 1. Must be ensure the following prerequisites are already installed in your computer

- Node.js (v16 or later)
- npm (comes with Node.js) or yarn
- MongoDB (local or cloud-based)

### 2. Clone the Repository

Run the following command in your terminal to clone the repository:

```javascript
git clone https://github.com/Apurbopaul131/Seccond-mart-server.git
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
NODE_ENV = development
JWT_ACCESS_SECRET = 5a10e571cfe9ac9f03995c6b1b9bc6d0a3b637737edaa40d84e5c349cc9f61bf
JWT_ACCESS_TOKEN_EXPIRES_IN = 10d
JWT_REFRESH_SECRET = 5822cf23bc307f6d647489e65df119ff040b5586ea5c39ae3dd65cf914a7f3b2
JWT_REFRESH_TOKEN_EXPIRES_IN = 365d
BCRYPT_SALT_ROUNDS = 12

SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=https://seccond-hand-client.vercel.app/payment/verify

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

Backend live link: https://seccond-hand-server.vercel.app

Go to seccond mart frontend source code using [SECCONDMART-FRONTEND](https://github.com/Apurbopaul131/Seccond-mart-client.git)
