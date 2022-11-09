# Product feedback app

This is a solution to the [Product feedback app challange on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). I extended the base challenge with user authentication and I built a fullstack application.

## Project Description

This application is a platform for a web service, where the users can create feedbacks and suggestions for the web service to help the developers how to make their service better. When a feedback is created, its status is suggestion, but it can be updated to planned, in-progress or live. A feedback can be upvoted by the users, therefore the developers can prioritize them. Users can comment the feedbacks and can write replies to the comment, so they can discuss the details. The feedbacks can be seen on a roadmap that shows to the users in which status (planned, in-progress, live) the given feedback is.

### **Roles**

#### **User**
All users have to authenticate themselves to use the application.
  - UI related functionalities
    - view the optimal layout for the app depending on their device's screen size
  - User data related functionalities
    - update fullname
    - update username
    - update password
    - upload profile image
  - Feedback related functionalities
    - create a feedback
    - update a feedback
    - delete a feedback
    - filter between the feedbacks based on category
    - sort the feedbacks based on upvote count or comment count
  - Comment related functionalities
    - create a comment to a feedback
  - Reply related functionalities
    - create a reply to a comment

### **Entities**
#### **User**
  - userId: string
  - fullname: string
  - username: string
  - email: string (valid email address)
  - password: string (at least six characters)
  - profileImageUrl: string
  - refreshToken: string | null
  - passwordResetToken: null | object:
    - token: string
    - expiresIn: date

#### **Feedback**
  - feedbackId: string
  - title: string
  - detail: string
  - category: enum(feature, ui, ux, enhancement, bug)
  - status: enum(suggestion, planned, in-progress, live)
  - upvotes: array of userIds
  - comments: array of commentIds

#### **Comment**
  - commentId: string
  - author: userId
  - content: string (maximum 250 characters)
  - replies: array of replies

#### **Reply**
  - replyId: string
  - author: userId
  - content: string (maximum 250 characters)
  - replyTo: userId


### Links

- [Live site URL](https://product-feedback-app-f2be8.web.app/)
- [API documentation](https://akosklema.github.io/product-feedback-api-docs/)

### Backend

The backend is a Node.js application which serves a RESTful API.

#### Main technologies

- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Document-oriented database
- [Mongoose](https://mongoosejs.com/) - Object documet mapping for MongoDB and Node.js

### Frontend

The frontend is a React single-page application. The project was boostrapped with [Create React App](https://create-react-app.dev/).

#### Main technologies

- [React](https://reactjs.org/)
- [React-Router V6](https://reactrouter.com/docs/en/v6)
- [Redux](https://redux.js.org/)
- [React-Redux](https://react-redux.js.org/)

### Run locally in containers

1. Download the docker-compose.yml file
2. In the folder, where the docker-compose.yml file is, run
```sh
$ docker-compose up
```
This will pull the required images from Dockerhub and run the containers. The frontend app will run on port:3000 and the server on port:8080. In this case the email service does not work, so you can't reset your password, if you forgot it.