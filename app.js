const express = require('express');
var fs = require('fs');
const http = require('http');
var cheerio = require('cheerio');
const request = require('request');

const app = express();

app.get('/scrape', function (req, res) {

    url = 'http://www.github.com/acgrdumlu';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var parsedResults = [];
            $('rect.day').each(function (i, element) {
                var count = $(this).attr('data-count');
                var date = $(this).attr('data-date');

                var data = {
                    count: parseInt(count),
                    date: date
                };
                parsedResults.push(data);
            });
        }
        fs.writeFile('output.json', JSON.stringify(parsedResults, null, 4), function (err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
        res.send('Check your console!')
    })
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
