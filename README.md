# Magnuson Campus Ventures 
We are building a web-app that facilitates connections between startups affiliated with the Magnuson Center for Entrepreneurship and Dartmouth students. This is our backend repo. Frontend repo can be found [here](https://github.com/dartmouth-cs52-20S/project-mcv)

Heroku URL: https://project-mcv.herokuapp.com/

# Architecture
## Libraries Used 
We used MongoDB and Mongoose to store and interact with our data and express.js to communicate with our database from the frontend. We are currently using passport as our authentication library.

## Our Database
### Code Organization 
So far, we have thirteen schemas to organize the data in our database. Each of these Schemas has a corresponding controller which holds the appropriate functions for each end point, which enables our front-end to receive the appropriate information for each request. This includes actions like signing up or signing in, updating a profile, or creating a new position opening. Some schemas are related to user objects and accounts like the user, student, and startup schemas, whereas others like skills, industries, and classes are accessed by all user types. 

## Setup
If you don't have mongodb installed already, run `brew install mongodb`
Then,
```
yarn install
yarn dev
```
to start running a server on your local machine. 
You will also need to have a mongo server, which you can start by running `mongod &` in a separate terminal shell. 

# Deployment
This repo is currently set up to auto-deploy from master with travis ci and heroku.
To deploy to our heroku server, you can push the backend to heroku with git push heroku master.

## Authors 📝

* Anne Bailey '22
* Sarah Hong '21
* Mustafa Nasir-Moin '20
* Juliette Pouchol '20
* Donia Tung '22
* Dylan Whang '21

## Acknowledgments ❤️

We'd like to thank Tim Tregubov for all his help and support in this class, as well as Thomas Monfre, Morgan Sorbaro, and rest of the CS52 TAs for their help! 

starter pack pulled from CS52 starter express app template [repo](https://github.com/dartmouth-cs52/express-babel-starter) using:
node with babel
expressjs
airbnb eslint rules
