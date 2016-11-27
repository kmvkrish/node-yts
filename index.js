var request = require('request');
var open = require("open");

var baseURL = "http://yts.ag/api/v2";
var self;

var YTS = function(){
	self = this;
	this.movies = [];
	
	this.print_torrents = function(torrents){
		if(torrents){
			for(var i=0; i< torrents.length; i++){
				console.log("==========================================================================================");
				console.log("Title : " + torrents[i].title);
				console.log("IMDB Code : " + torrents[i].imdb_code);
				console.log("URL : " + torrents[i].url);
				console.log("ID : " + torrents[i].id);
				console.log("Rating : " + torrents[i].rating);
				console.log("==========================================================================================");
			}
		}
	}
};

YTS.prototype.search = function(query){
	var rawData = '';
	var res = request.get(baseURL + "/list_movies.json?query_term=" + encodeURI(query));
	res.on('data', (chunk) => { rawData += chunk;});
	res.on('end', () => {
		var movies = JSON.parse(rawData);
		if(movies.data.movies){
			self.movies = movies.data.movies;
			self.print_torrents();
		}else{
			console.log("No movies found");
			self.movies = [];
		}
	});
};

YTS.prototype.list_movies = function(){
	var rawData = '';
	request(baseURL + "/list_movies.json", (error, response, body) => {
		if(error){
			console.log(error);
			return;
		}
		if(response.statusCode != 200){
			console.log(response);
			return;
		}
		var movies = JSON.parse(body);
		self.movies = movies.data.movies;
		self.print_torrents(self.movies);
	});
};

var _movie;
function Movie(){
	_movie = this;
	this.movie = {};

	this.getTitle = function(){
		return _movie.movie.title;
	};
	this.getURL = function(){
		return _movie.movie.url;
	};
	this.getID = function(){
		return _movie.movie.id;
	};
	this.getIMDBCode = function(){
		return _movie.movie.imdb_code;
	};
	this.getDescription = function(){
		return _movie.movie.description;
	};
	this.getLanguage = function(){
		return _movie.movie.language;
	};
	this.getRating = function(){
		return _movie.movie.rating;
	};
	this.getGenre = function(){
		return _movie.movie.genre;
	};
	this.getTorrents = function(){
		return _movie.movie.torrents;
	};
	this.getBackgroundImage = function(){
		return _movie.movie.background_image;
	};
	this.openInBrowser = function(url){
		open(url);
	};
	this.download = function(url){
		open(url);
	};

}

Movie.prototype.getMovie = function(movie_id){
	var rawData = '';
	var res = request.get(baseURL + "/movie_details.json?movie_id=" + movie_id + "&with_images=true&with_cast=true");
	res.on('data', (chunk) => {rawData += chunk;});
	res.on('end', () => {
		if(rawData != ""){
			var movieObject = JSON.parse(rawData);
				if(movieObject.data.movie){
					
					_movie.movie = {
						"title": movieObject.data.movie["title"],
						"url": movieObject.data.movie["url"],
						"id": movieObject.data.movie["id"],
						"rating": movieObject.data.movie["rating"],
						"genre": movieObject.data.movie["genre"],
						"background_image" : movieObject.data.movie["background_image"],
						"torrents": movieObject.data.movie["torrents"],
						"imdb_code": movieObject.data.movie["imdb_code"],
						"description": movieObject.data.movie["description_full"],
						"language": movieObject.data.movie["language"]
					};
					console.log("Movie:", _movie.movie);
				}
		}else{
			_movie.movie = {};
		}
	});
};


module.exports = {
	yts: new YTS(),
	movie: new Movie()
};