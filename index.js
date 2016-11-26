var request = require('request');
var open = require("open");

var baseURL = "https://YTS.ag/api/v2";
var self;

var YTS = function(){
	self = this;
	this.movies = [];
	
	this.print_torrents = function(torrents){
		for(var i = 0; i< self.movies.length; i++){
			console.log("=========================================================================");
			console.log("Title\tIMDb Code\tMovie ID\tURL");
			console.log(self.movies[i].title + "\t" + self.movies[i].imdb_code + "\t" + self.movies[i].id + "\t" + self.movies[i].url);
			console.log("=========================================================================");
		}
	}
};

YTS.prototype.getAllMovies = function(page, limit){
	var rawData = '';
	if(typeof(page) === 'undefined' || isNaN(page)){
		page = 1;
	}
	if(typeof(limit) === 'undefined' || isNaN(limit)){
		limit = 20;
	}
	var res = request.get(baseURL + "/list_movies.json?" + 'page=' + page + "&limit=" + limit);
	res.on('data', (chunk) => { rawData += chunk;});
	res.on('end', () => {
		var movies = JSON.parse(rawData);
		self.movies = movies.data.movies;
		self.print_torrents();
	});
};

YTS.prototype.search = function(query){
	var rawData = '';
	var res = request.get(baseURL + "/list_movies.json?query_term=" + query);
	res.on('data', (chunk) => { rawData += chunk;});
	res.on('end', () => {
		var movies = JSON.parse(rawData);
		if(movies.data.movies){
			self.movies = movies.data.movies;
			self.print_torrents();
		}else{
			console.log("No movies found");
		}
	});
};

var _movie;
function Movie(){
	_movie = this;
	this.movie = {
		"title":"",
		"url":"",
		"id":0,
		"imdb_code":"",
		"description":"",
		"language":"",
		"rating":0.0,
		"genres": [],
		"torrents": [],
		"background_image":""
	};

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
	this.getGenres = function(){
		return _movie.movie.genres;
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
				/*console.log("=========================================================================");
				console.log("Title\tIMDb Code\tMovie ID\t");
				console.log(movie.data.movie.title + "\t" + movie.data.movie.imdb_code + "\t" + movie.data.movie.id);
				console.log("=========================================================================");*/

				_movie.movie = {
					"title": movieObject.data.movie["title"],
					"url": movieObject.data.movie["url"],
					"id": movieObject.data.movie["id"],
					"rating": movieObject.data.movie["rating"],
					"genres": movieObject.data.movie["genres"],
					"background_image" : movieObject.data.movie["background_image"],
					"torrents": movieObject.data.movie["torrents"],
					"imdb_code": movieObject.data.movie["imdb_code"],
					"description": movieObject.data.movie["description_full"],
					"language": movieObject.data.movie["language"]
				};
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