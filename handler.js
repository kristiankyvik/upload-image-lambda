require('dotenv').config()
const request = require('request');
const rp = require('request-promise');
const AWS = require('aws-sdk');
const Nightmare = require('nightmare');
const fetch = require('node-fetch');

var s3 = new AWS.S3();

const nightmare = Nightmare({
   show: false
});

Nightmare.action('extractUrl', function(selector, done) {
  //`this` is the Nightmare instance
  this.evaluate_now((selector) => {
    const url = document.querySelector("img").getAttribute("src")
    return url;
  }, done, selector)
});

console.log("loaded logsss");

module.exports.nightmareWebhookListener = async (event, context, callback) => {
  
  console.log(event.body);

  const {name, query} = JSON.parse(event.body);

  const night = await nightmare
    .goto(`https://source.unsplash.com/254x156/?${query}`)
    .wait(1000)
    .extractUrl('img')
    .then(async (result) => {

      console.log("pic URL", result);

      const picture = await fetch(result, {encoding: null});

      const picture_data = await picture.buffer();

      console.log("picutreeeee", picture_data);

      const AwsParams = {
        'Bucket': 'erasmoose',
        'Key': `${name}.jpg`,
        'Body': picture_data,
        'ContentEncoding': 'base64', 
        'ContentType': 'image/jpeg',
        'ACL': 'public-read'
      };
      
      const upload = await s3.putObject(AwsParams).promise();

      return upload;
    })
   .catch(function (error) {
       console.error('Search failed:', error);
       done(error);         // done() instead of context.done()
   });  

   const response = {
     statusCode: 200,
     body: JSON.stringify({
       message: "Sucesssss",
     }),
   };

   console.log("kjljkljlkjklj REpSONE", response);  

  callback(null, response);
};