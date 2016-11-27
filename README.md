# node-yts
a command line node module for YTS torrents search

node-yts - Yifi Torrents Search RESTful API in node js.

Installation:
  npm install node-yts

Usage:
  var movie = require("node-yts").movie;
  var yts = require("node-yts").yts;
  
  For fetching a movie informatin, pass the  movie ID as parameter.
  For example:
    movie.getMovie(6189) - returns a JSON object for movie. This can be accessed using movie.movie or the native methods in Movie object.
    
  For searching movies, pass movie Title or IMDB ID, actor Name or actor's IMDB code, or Director's name or IMDB code.
  For example,
    yts.search("The BFG") gives search results for "The BFG" movie. The results can be accessed using yts.movies property in YTS instance.
    
  For getting list of movies, call list_movies method
  For example:
    yts.list_movies() gets the first 20 movies of "page number" 1 and stores in movies property of the instance. Can be accessed using yts.movies.

  For movies from specific page and specified limit, call yts.list_movies() with the values.
  For example:
  	yts.list_movies(3,20) gets 30 movies from page 3 and stores in movies property.

  By default, if no parameters are sent, the request will fetch 20 results from page 1.
    
API:
  Methods in YTS:
    1. list_movies
    2. search(query_term)
    
  Methods in Movie:
    1. getMovie(movie_id)
    2. getTitle()
    3. getDescription()
    4. getURL()
    5. getID()
    6. getIMDBCode()
    7. getTorrents()
    8. getLanguage()
    9. getRating()
    10. getGenre()
    11. openInBrowser(url) - to open URLs in browser. (An app chooser is opened to select default web browser)
    12. getBackgroundImage() - full image of the film.
