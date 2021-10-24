# Magnuson Campus Ventures 
We are building a web-app that facilitates connections between startups affiliated with the Magnuson Center for Entrepreneurship and Dartmouth students. This is our backend repo. Frontend repo can be found [here](https://github.com/dartmouth-cs52-20S/project-mcv)

Heroku URL: https://project-mcv.herokuapp.com/

# Architecture
## Libraries Used 
We use MongoDB and Mongoose to store and interact with our data and express.js to communicate with our database from the frontend. We are currently using passport as our authentication library.

## Our Database
### Code Organization 
So far, we have thirteen schemas to organize the data in our database. Each of these Schemas has a corresponding controller which holds the appropriate functions for each end point, which enables our front-end to receive the appropriate information for each request. This includes actions like signing up or signing in, updating a profile, or creating a new position opening. Some schemas are related to user objects and accounts like the user, student, and startup schemas, whereas others like skills, industries, and classes are accessed by all user types. 

## Setup

To set up this repo on your local environment, follow these steps:
1. Clone the repo using the git URL 
2. Install yarn if it is not already, and run `yarn install` to install packages
3. Create an `.env` file in the `app` directory with two variables
    - AUTH_SECRET=(random string, doesn't matter)
    - MONGODB_URI=(url to your database)
        - this variable doesn't need to be set if you're using the default local MongoDB setup
4. Run `yarn dev` in the terminal to initiate the dev server.

# Deployment
This repo is currently deployed to an AWS Elastic Beanstalk instance. Anything pushed to the master will be synced and deployed automatically.

## Authors 📝

* Anne Bailey '22
* Sarah Hong '21
* Mustafa Nasir-Moin '20
* Juliette Pouchol '20
* Donia Tung '22
* Dylan Whang '21
* Rehoboth Okorie '23
* Julian George '24

## Acknowledgments ❤️

We'd like to thank Tim Tregubov for all his help and support in this class, as well as Thomas Monfre, Morgan Sorbaro, and rest of the CS52 TAs for their help! 

Based off of the CS52 starter express app template ([repo](https://github.com/dartmouth-cs52/express-babel-starter)) using node with babel, expressjs, and airbnb eslint rules
