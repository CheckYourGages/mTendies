var express = require('express');
var ontime = require('ontime');
var app = express();

var request = require('request');
var cheerio = require('cheerio');

var diningHalls = {
	hasTenders: [],
}

var scrape = function (){
	var url = "https://dining.umich.edu/menus-locations/dining-halls/";

	var food = "Chicken Tenders"
		

	request(url + 'south-quad/', (err, response, html) => {
		if(err){
		}
		if(!err){
			var $ = cheerio.load(html);
			$('div.item-name').each((i, elem) => {
				if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
					diningHalls.hasTenders.push("South Quad");
					return false;
				};
			});

			request(url + 'east-quad/', (err, response, html) => {
				if(!err){
					var $ = cheerio.load(html);
					$('div.item-name').each((i, elem) => {
						if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
							diningHalls.hasTenders.push("East Quad");
							return false;
						};
					});

					request(url + 'bursley/', (err, response, html) => {
						if(!err){
							var $ = cheerio.load(html);
							$('div.item-name').each((i, elem) => {
								if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
									diningHalls.hasTenders.push("Bursley");
									return false;
								};
							});

							request(url + 'markley/', (err, response, html) => {
								if(!err){
									var $ = cheerio.load(html);
									$('div.item-name').each((i, elem) => {
										if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
											diningHalls.hasTenders.push("Markley");
											return false;
										};
									});

									request(url + 'mosher-jordan/', (err, response, html) => {
										if(!err){
											var $ = cheerio.load(html);
											$('div.item-name').each((i, elem) => {
												if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
													diningHalls.hasTenders.push("Mojo");
													return false;
												};
											});

											request(url + 'twigs-at-oxford/', (err, response, html) => {
												if(!err){
													var $ = cheerio.load(html);
													$('div.item-name').each((i, elem) => {
														if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
															diningHalls.hasTenders.push("Oxford");
															return false;
														};
													});

													request(url + 'north-quad/', (err, response, html) => {
														if(!err){
															var $ = cheerio.load(html);
															$('div.item-name').each((i, elem) => {
																if($(elem).text() == food || $(elem).text() == food + " " || $(elem).text() == food + "  "){
																	diningHalls.hasTenders.push("North Quad");
																	return false;
																};
															});
														}
													})
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
}
scrape();

ontime({
    cycle: '3:00:00'
}, function (ot) {
    scrape();
    ot.done()
    return
})

app.get('/', function (req, res){
	res.send(new Object());
})

app.get('/find', function (req, res){	
	res.send(diningHalls);
});



app.get('/pic', function (req, res){
	res.sendFile(__dirname + '/chicken-fingers.png');
});

app.listen(3000);

console.log('Go to localhost:3000/find');

exports = module.exports = app;