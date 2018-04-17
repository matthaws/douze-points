# DOUZE POINTS

![Douze Points Splash](https://github.com/matthaws/douze-points/blob/master/docs/Screen%20Shot%202018-04-17%20at%209.02.18%20AM.png)

### OVERVIEW

"Douze Points" will be a social app for Eurovision fans to rate their favorite entries, compare their rankings to the contest outcome, and view how their friends rated the same performances. It is being developed as a joint effort between [Matt Haws](www.github.com/matthaws), [Brendan Hamill](www.github.com/bhammy), and [Ian Del Duca](www.github.com/LlanddewiLovesYou). The concept grew out of a long-running tradition that Brendan started. Each year he'd gather friends to watch the Eurovision Song Contest and rate the entries based on his custom scoring metric: up to 12 points each for Song, Dance, Costume, and "Eurocheese", and additional the option to add an arbitrary number of bonus points. This highly unscientic and unbalanced way of scoring accomplished its job in that it was a lot of fun, prompting a lot of converation and hilarious arguments about the relative quality of the entries. 

Upgrading this tradition to the digital age and turning it into a web app that all could use was the next logical step. Read more about how this all got started [on my blog](http://matthaws.com/the-blog/posts/eurovision-app-part-one).

### MVPs

The features currently being implemented: 

* Users can log in with their Facebook account. (DONE)

* Users can view this year's contest and all entries with embedded YouTube links. (DONE).

* Data from previous years are scraped from the web and added to our database so users can rate entries from throughout the contest's history. (DONE BACK TO 2010, more years forthcoming)

* Users can create a scoresheet for a given year and rate each entry according to the Douze Points metric. They can sort their scoresheet and view each entry video without leaving the scoresheet page. (DONE).

* Users can comment on entries, contests, other user's scoresheets. (IN PROGRESS)

* Users can compare their scoresheet for a given year with another user's scoresheet for the same year. "What? How could Brendan only give this song a 6 in costume, that hat is AMAZING!" (IN PROGRESS) 

* Users can update their profile with a bio and pick favorite entries for each category, which will appear on their profile page. (NOT STARTED YET) 

* Splash page with details and info on how to use the site. (NOT STARTED YET)

### Technologies Used

"Douze Points" is built with React with Redux deployed to the web via Surge. It is served on the backed by a separate Rails JSON API, [found here](www.github.com/matthaws/douze-points-api) deployed on Heroku. A mobile version of the app is being planned which will use React Native. 

For authentication, it uses the OAuth2 protocal to authenticate with Facebook and then JSON Web Tokens to persist the user being "logged in". More info on my implemenation of auth is [also on my blog](http://matthaws.com/the-blog/posts/eurovision-app-part-two).

### Design Documents

[DB Schema](https://sqldbm.com//Project/SQLServer/Share/3tyZ54y9xUaJokxKo69quw)

### Screen Shots

![Contest Show page](https://github.com/matthaws/douze-points/blob/master/docs/Screen%20Shot%202018-04-13%20at%203.14.29%20PM.png)

![Entry Show page](https://github.com/matthaws/douze-points/blob/master/docs/Screen%20Shot%202018-04-17%20at%209.04.26%20AM.png)

![Scoresheet page](https://github.com/matthaws/douze-points/blob/master/docs/Screen%20Shot%202018-04-17%20at%209.03.43%20AM.png)
