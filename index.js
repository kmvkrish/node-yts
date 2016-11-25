var request = require('request');
var https = require('https');
var open = require("open");

var self;
var YTS = function(){
	self = this;
	this.movies = [];
	this.baseURL = "https://YTS.ag/api/v2";
	
	this.print_torrents = function(torrents){
		for(var i = 0; i< self.movies.length; i++){
			console.log("=========================================================================");
			console.log("Title\tIMDb Code\tMovie ID\tURL");
			console.log(self.movies[i].title + "\t" + self.movies[i].imdb_code + "\t" + self.movies[i].id + "\t" + self.movies[i].url);
			console.log("=========================================================================");
		}
	}
};

YTS.prototype.getAllMovies = function(){
	var rawData = '';
	var res = request.get(self.baseURL + "/list_movies.json");
	res.on('data', (chunk) => { rawData += chunk;});
	res.on('end', () => {
		var movies = JSON.parse(rawData);
		self.movies = movies.data.movies;
		self.print_torrents();
	});
};

YTS.prototype.search = function(query){
	var rawData = '';
	var res = request.get(self.baseURL + "/list_movies.json?query_term=" + query);
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

YTS.prototype.movieDetails = function(movie_id){
	var rawData = '';
	var res = request.get(self.baseURL + "/movie_details.json?movie_id=" + movie_id + "&with_images=true&with_cast=true");
	res.on('data', (chunk) => {rawData += chunk;});
	res.on('end', () => {
		if(rawData != ""){
			var movie = JSON.parse(rawData);
			if(movie.data.movie){
				console.log("=========================================================================");
				console.log("Title\tIMDb Code\tMovie ID\t");
				console.log(movie.data.movie.title + "\t" + movie.data.movie.imdb_code + "\t" + movie.data.movie.id);
				console.log("=========================================================================");
			}
		}else{
			console.log("Movie not found");
		}
	});
};

function Movie(){

}

module.exports = {
	yts: new YTS(),
	movie: new Movie()
};