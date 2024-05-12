# Udemy-Web

A Project for Software Design

## Import all data

Go to root directory

```
cd backend
node createDummy.js
```

## Clear all data

```
cd backend
node createDummy.js --delete-data
```

## Local Quickstart

Follow these steps to get the app running locally.

### 1. Clone the repo

```
git clone https://github.com/DeadlineShooters/Yudemy-Mobile.git
```

### 2. Create .env file in root directory

```
MONGODB_URI=mongodb+srv://tomato09:u9QmHK8hdYT9LKB6@cluster0.vd8vtog.mongodb.net/udemy-tomato09?retryWrites=true&w=majority&appName=Cluster0
GOOGLE_CLIENT_ID=331387119097-flhp8h35vlusnh63mapdvhvff1ahp0av.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FACEBOOK_APP_ID=346778755928805
FACEBOOK_APP_SECRET=31dd54e4b86d259744732b996064decf
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY=YOUR_CLOUDINARY_SECRET_KEY
ELASTIC_CLOUD_ID='Udemy-Web:YXNpYS1zb3V0aGVhc3QxLmdjcC5lbGFzdGljLWNsb3VkLmNvbSRmNTRkYzQxMmMyZjU0NGZkOTE3M2RmNWIxYzU3ZmEzYyRmYzYyYWIyZTI3MTk0MTQ3OWFhNmMzZGFhODhkNTlmZA=='
ELASTIC_PASSWORD=0Eku0jsvuxJet877VLQzbPyy
ACCESS_KEY=F8BBA842ECF85
SECRET_KEY=K951B6PE1waDMi640xX08PD3vg6EkVlz

AUTH_EMAIL=YOUR_EMAIL
AUTH_PASS=YOUR_GOOGLE_PASS_KEY
```

### 3. Create .env file in frontend directory

```
REACT_APP_CLOUDINARY_CLOUD_NAME=dqxtf297o
REACT_APP_CLOUDINARY_UPLOAD_PRESET=UdemyVideo
REACT_APP_BACKEND_HOST=http://localhost:5000
```

### 4. Open terminal and in root directory do:

`npm install`

`cd backend/`

`npm install`

`cd ..`

`cd frontend/`

`npm install`

`cd ..`

`npm run dev`
