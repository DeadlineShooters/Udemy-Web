# Udemy-Web

# Udemy Clone Project

This repository, which is for the project of Software Design Course, contains the source code for an online learning platform inspired by Udemy, built to provide a comprehensive suite of features for students and instructors alike. 
## Features

1.  **Wishlist**: Users can add courses to their wishlist for future reference.
2.  **Enroll Courses**: Users can enroll in courses easily and start learning immediately.
3.  **Discover Courses**: A robust discovery system to help users find courses that match their interests.
4.  **User Account and Preferences Management**: Users can manage their account details and customize their preferences.
5.  **View My Learning**: A dashboard for users to view and manage their ongoing courses.
6.  **Course Content**: Comprehensive course content including videos, articles, and quizzes.
7.  **Authentication**: Secure user authentication to protect user data.
8.  **View Profile Instructors**: Users can view detailed profiles of instructors.
9.  **Track Progress for Certificate**: Users can track their progress and receive certificates upon course completion.
10.  **Q&A**: An interactive Q&A section for users to ask questions and receive answers.
11.  **Course Dashboard**: A detailed dashboard for managing courses and tracking performance.
12.  **Course Landing Page**: Engaging landing pages for each course with detailed descriptions and reviews.
13.  **Course Feedback System**: Users can provide feedback on courses to help improve the content.
14.  **Favorite Paid Courses**: Users can save their favorite paid courses for quick access.
15.  **Course Drafting and Publishing**: Instructors can draft and publish their courses seamlessly.
16.  **Analytics**: Comprehensive analytics for tracking user engagement and course performance.

## Project Structure

-   **Backend**: Built with Node.js and Express, providing a robust and scalable server-side architecture.
-   **Frontend**: Developed with React, offering a dynamic and responsive user interface.
-   **Database**: Utilizes MongoDB, Cloudinary for reliable and efficient data management.

## Prerequisites

-   Node.js
-   MongoDB
-   Git

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
