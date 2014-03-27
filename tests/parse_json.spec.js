'use strict'
 
var fs = require('fs');
var parse_json = require('../parse_json.js');
var mock_shows = fs.readFileSync('tests/mocks/shows_mock.json','utf-8');

describe("parsing service", function(){
	it("should check that the data is valid json", function(){
		var response = parse_json("we passed a string in, this would also work for invalid json");
		expect(response.error).toBeDefined();
	});

	it("should get an array of shows with DRM and episodes", function(){
		var shows = parse_json(mock_shows);
		expect(shows.response.length).toBe(7);
		shows.response.forEach(function(show){
			expect(Object.keys(show).join(', ')).toBe( 'image, slug, title');
			expect(show.image).toBeDefined();
			expect(show.slug).toBeDefined();
			expect(show.title).toBeDefined(); 
		});
	});
});