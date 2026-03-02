
# 🧠 Bitespeed Identity Reconciliation API

A backend service that performs **identity reconciliation** by linking multiple contact records (email/phone) belonging to the same user.

This project solves the Bitespeed backend challenge by ensuring:

-   Duplicate identities are merged
    
-   Oldest contact remains primary
    
-   Newer primaries convert to secondary when required
    
-   All related emails and phone numbers are consolidated
    

----------

# 🚀 Live Application

🌐 **Base URL**

https://bitespeed-identity-yszm.onrender.com

🔗 **Identify Endpoint**

POST https://bitespeed-identity-yszm.onrender.com/identify

----------

# 📌 About The Application

FluxKart customers may use different:

-   Email addresses
    
-   Phone numbers
    

across multiple purchases.

This service:

-   Links related contact records
    
-   Maintains a single primary identity
    
-   Converts newer primaries to secondary when necessary
    
-   Returns consolidated contact information
    

----------

# 🛠 Tech Stack

-   Node.js
    
-   TypeScript
    
-   Express.js
    
-   Prisma ORM (v7)
    
-   SQLite
    
-   Render (Deployment)
    

----------

# 📬 API Endpoint

## `POST /identify`

### Request Body (JSON)

```JSON
{  
 "email": "george@hillvalley.edu",  
 "phoneNumber": "717171"  
}
```
At least one of:

-   `email`
    
-   `phoneNumber`
    

must be provided.

----------

### Successful Response
```JSON
{  
 "contact": {  
 "primaryContatctId": 11,  
 "emails": [  
  "george@hillvalley.edu"
 ],  
 "phoneNumbers": [  
  "717171"  
 ],  
 "secondaryContactIds": []  
 }  
}
```

----------

# 🧪 How To Test The Live Application

## Using Postman

1.  Open Postman
    
2.  Select **POST** method
    
3.  Enter URL:
    

https://bitespeed-identity-yszm.onrender.com/identify

4.  Go to **Body → raw → JSON**
    
5.  Paste:
    
```
{  
 "email": "test@example.com",  
 "phoneNumber": "123456"  
}
```

6.  Click **Send**
    

----------

## Using cURL
```
curl  -X POST https://bitespeed-identity-yszm.onrender.com/identify \  
-H  "Content-Type: application/json" \  
-d  '{"email":"test@example.com","phoneNumber":"123456"}'
```

----------

# ✨ Features

✔ Create new primary contact if none exists  
✔ Create secondary contact when new information appears  
✔ Merge multiple contact chains  
✔ Convert newer primary → secondary  
✔ Always keep oldest contact as primary  
✔ Return consolidated email & phone list  
✔ Deduplicate emails and phone numbers  
✔ Production-ready deployment

----------

# 🧠 Identity Reconciliation Logic

The system:

1.  Searches for existing contacts matching email or phone
    
2.  If none exist → creates new primary
    
3.  If matches exist:
    
    -   Oldest contact becomes primary
        
    -   Other primaries convert to secondary
        
    -   New information creates secondary
        
4.  Returns full consolidated identity
    

----------

# 💻 Running Locally

## 1️⃣ Clone Repository
```
git clone <your-repo-url>  
cd bitespeed-identity
```
----------

## 2️⃣ Install Dependencies
```
npm install
```
----------

## 3️⃣ Create `.env` File
```
DATABASE_URL=file:./prisma/dev.db
```
----------

## 4️⃣ Generate Prisma Client
```
npx prisma generate
```
----------

## 5️⃣ Run Migrations
```
npx prisma migrate dev --name init
```
----------

## 6️⃣ Start Server
```
npm run dev
```
Server runs at:

http://localhost:3000

----------

# 🌍 Deployment Details

Deployed on **Render**

Build Command:
```
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```
Start Command:
```
npm  start
```
----------

# ⚠️ Note About SQLite on Render

SQLite is used for simplicity and assignment purposes.

Database is:

-   File-based
    
-   Non-persistent across restarts
    
-   Suitable for demo/testing
    

For production systems, PostgreSQL is recommended.

----------

----------

# 📁 Project Structure
```
bitespeed-identity  
│  
├── src  
│   ├── index.ts  
│   ├── prisma.ts  
│   ├── routes  
│   └── services  
│  
├── prisma  
│   ├── schema.prisma  
│   └── migrations  
│  
├── prisma.config.ts  
├── .env  
├── package.json  
└── tsconfig.json
```
----------
# ✅ Submission Ready Checklist

-   Live endpoint deployed
    
-   Proper identity reconciliation
    
-   Primary to secondary conversion handled
    
-   Professional commit history
    
-   Clear documentation
    
-   Production build configuration
