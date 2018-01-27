# DOUZE POINTS

### OVERVIEW

"Douze Points" will be a social app for Eurovision fans to rate their favorite entries, compare their rankings to the contest outcome, and view how their friends rated the same performances.

### MVPs

The goal for version 1 of "Douze Points" will be to fully implement the following key features:

* Users will be able to create an account and login (using their Facebook or Google account if they prefer) and create a profile including profile picture.

* Users can view the details of this year's entries, with embedded video of the entry's music video as they become available. They will be able to give initial (pre-season) scoring based on the announced entry.

* Users can view other user profiles and see a list of all the preliminary scores they've given the 2018 entries.

* A "live scoring" sheet will be available to users to fill out during the actual contest in May. Users will be able to compare their pre-season scores with their scores for the live final event. They will also be able to see a comparison between their rankings and the final, actual rankings in the contest.

* Users can comment on each other's rankings. ?

### Technologies Used

"Douze Points" will be built in separate pieces - a Rails backend API and a totally separate front-end React application. This is so that in phase 2 we can easily develop of a React Native mobile application that makes use of the same backend API.

#### Backend
* Postgresql database
* Ruby/Rails in API only mode
* Jbuilder for JSON responses
* Devise gem for auth and Facebook/Google integration

#### Front-end Web
* React/Redux
* CSS Grid and TBD method of CSS integration
* Prettier for style consistency and linting
* TBD alternative to JQuery for Ajax calls.

#### Front-end Mobile
* React Native
<<<<<<< HEAD
=======

### Design Documents

[DB Schema](https://sqldbm.com//Project/SQLServer/Share/3tyZ54y9xUaJokxKo69quw)
