const request = require('request');
const cheerio = require('cheerio');
const jsonfile = require("jsonfile");

request('https://cdn.adimo.co/clients/Adimo/test/index.html', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    const $ = cheerio.load(body);


    // 1. Each product as its own containing a) title, b) img url, c) price + discount


    $('div.item').each(function(i, elem){

        // first, locate each html element and assign each to a variable
        // use replace() to remove the pound sign from the price

        var title = $(elem).find('h1').text();
        var img =  $(elem).find('img').attr("src");
        var oldPrice = $(elem).find('.oldPrice').text().replace("£", "");
        var price = $(elem).find('.price').text().replace("£", "");

        // create an object for each item 
        
        product = {
            title: title, 
            imgUrl: img, 
            discount: oldPrice, 
            price: price
        }

        // note: this displays each item as a JSON object in the terminal
        // there is a problem when sending this to a JSON file, as only the last item in the loop displays
        // temporary solution for JSON display is below

        console.log(product)
        
    });


    // 2. The total number of items

    // assign variable to item, then find the number of items by length

    let item = $("div.item");
    item = item.length;

    let itemTotal = "The total no. of items is: " + item;


    // 3. The average price of each item
    // put the items into an array then loop through them

    let priceCut = [];

    $(".price").each(function (i, e) {

      priceCut[i] = $(this).text().replace("£", "");

    });

    // create a function for finding the average and convert string values to floating pt numbers

    var sum = 0;
    for( var i = 0; i < priceCut.length; i++ ){
        sum += parseFloat( priceCut[i], 10 );
    }
    
    var avg = sum/priceCut.length;
    
    var averagePrice = ( "The sum of all the elements is: " + sum + " The average is: " + avg );


    // FOR JSON OUTPUT 

        // removes the page header h1 from the array
        let header = $("h1.page-header").remove();

        var title2 = {};
    
        $("h1").each(function (i, e) {
          title2[i] = $(this).text();
        });
    
        // create object and loop through each image
    
        var img2 = {};
    
        $("img").each(function (i, e) {
          img2[i] = $(this).attr("src");
        });
    
        // create object and loop through each price
    
        var price2 = {};
    
        $(".price").each(function (i, e) {
          price2[i] = $(this).text();
        });
    
        // loop through oldPrice
    
        var oldPrice2 = {};
    
        $(".oldPrice").each(function (i, e) {
          oldPrice2[i] = $(this).text();
        });


     // create array of objects
     // this displays the JSON as displayed in the console

    let all = [
        {
          title: title2[0],
          img: img2[0],
          oldPrice: oldPrice2[0],
          price: price2[0],
        },
  
        {
          title: title2[1],
          img: img2[1],
          oldPrice: oldPrice2[1],
          price: price2[1],
        },
        {
          title: title2[2],
          img: img2[2],
          oldPrice: oldPrice2[2],
          price: price2[2],
        },
        {
          title: title2[3],
          img: img2[3],
          oldPrice: oldPrice2[3],
          price: price2[3],
        },
        {
          title: title2[4],
          img: img2[4],
          oldPrice: oldPrice2[4],
          price: price2[4],
        },
        {
          title: title2[5],
          img: img2[5],
          oldPrice: oldPrice2[5],
          price: price2[5],
        },
        {
          title: title2[6],
          img: img2[6],
          oldPrice: oldPrice2[6],
          price: price2[6],
        },
        {
          title: title2[7],
          img: img2[7],
          oldPrice: oldPrice2[7],
          price: price2[7],
        },
        {
          title: title2[8],
          img: img2[8],
          oldPrice: oldPrice2[8],
          price: price2[8],
        },
        {
          title: title2[9],
          img: img2[9],
          oldPrice: oldPrice2[9],
          price: price2[9],
        },
      ];

      // convert to json file
      let data = {};
      data.items = all;
      data.averagePrice = averagePrice;
      data.itemTotal = itemTotal;
      jsonfile.writeFile("data.json", data);

});

