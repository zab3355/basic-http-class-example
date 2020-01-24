const http = require('http');

//Save something in file in order to send
//fs is short for file system, access to file system in pc not possible in browser
const fs = require('fs');

// to send network traffic
// trying to set variable port, does an environment variable PORT exist, if it does  store and port if not keep going to node port and if not do 3000 (locally)
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//somewhere below fs
//dirname returns filepath to the folder
//goes to where server.js exists, goes backwards on server tree and finds file from there
//index represents an HTML file. Thing im sending is html and body of response write 
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
//write thing in server


// function called onRequest
// will take request and response
// code doesnt get called immedeately, but when code is called to server, code will get run.
// Doesnt call every single line just some port in the future (asynchrounous)
const onRequest = (request, response) => {
  console.log(request.url);

  // head, info not displayed to user (like html header)
  // 200 is success default response (says thing you created exists)
  // http headers in {} ones called 'content-type' checks what kind of data we're sending browser
  // text/html is a mime type https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
  response.end();
};

// creates server, takes callback for creating server called OnRequest
// if you get request to http server send it to that function
// tell it where to look for request on .listen(port) and then port #
http.createServer(onRequest).listen(port);

// prints whatever is in port variable
console.log(`Listening on port: ${port}`);