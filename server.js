var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var promise = require('promise');


app.get('/', function(req, res){
  url = 'https://coinranking.com/coin/bitcoin-btc';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var currency, price, mark;
      var json = { currency : "", price : "", market_cap : ""};

      $('.profile__value').filter(function(){
        var data = $(this);
        currency = data.text().trim();
//        price = data.children().last().children().last().text().trim();

        json.currency = currency;
//        json.price = price;
      })

      $('.price__value').filter(function(){
        var data = $(this);
        price = data.text().trim();

        json.price = price;
      })
        $('.detail__value').filter(function(){
        var data = $(this);
        mark = data.text().trim();

        json.market_cap = mark;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Message sent to +91 7015386369')
  })
})
var yo = fs.readFileSync("output.json").toString();


//app.get('/eth', function(req, res){
//  url = 'https://coinranking.com/coin/ethereum-eth';
//
//  request(url, function(error, response, html){
//    if(!error){
//      var $ = cheerio.load(html);
//
//      var currency, price, mark;
//      var kson = { currency : "", price : "", market_cap : ""};
//
//      $('.profile__value').filter(function(){
//        var data = $(this);
//        currency = data.text().trim();
////        price = data.children().last().children().last().text().trim();
//
//        kson.currency = currency;
////        json.price = price;
//      })
//
//      $('.price__value').filter(function(){
//        var data = $(this);
//        price = data.text().trim();
//
//        kson.price = price;
//      })
//        $('.detail__value').filter(function(){
//        var data = $(this);
//        mark = data.text().trim();
//
//        kson.market_cap = mark;
//      })
//    }
//
//    fs.writeFile('output.json', JSON.stringify(kson, null, 4), function(err){
//      console.log('File successfully written! - Check your project directory for the output.json file');
//    })
//
//    res.send('Check your console!')
//  })
//})
//var yo = fs.readFileSync("output.json").toString();



var accountSid = 'AC5e4b48dbd5d0885a1b5a35146861a235'; // Your Account SID from www.twilio.com/console
  var authToken = '7b675698a583498f3ce86e612aed5034';   // Your Auth Token from www.twilio.com/console
 
  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);
 
  client.messages.create({
      body: yo,
      to: '+917015386369',  // Text this number
      from: '+17639511599' // From a valid Twilio number
  })
 .then((message) => console.log(message.sid));


app.listen(process.env.PORT || 3000, () => {
console.log('server is up on port 3000');
});
exports = module.exports = app;



 
