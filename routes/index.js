const fetch = require('node-fetch');
const { apiHost, authData } = require('../utils/constants');

export default function routes(app, addon) {
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/search', addon.checkValidToken(), async (req, res) => {
      let queryString = req.originalUrl;
      queryString = queryString.slice(0, queryString.indexOf('&')) 
      const httpClient = addon.httpClient(req);
      httpClient.get({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": `/rest/api/3${queryString}`
      },
      function(err, response, body) {
        if (err) { 
          console.log(response.statusCode + ": " + err);
          res.send("Error: " + response.statusCode + ": " + err);
        }
        else {
          res.send(body);
        }
      });
    }
    );
    
    app.get('/projects', addon.checkValidToken(), (req, res) => {
      const httpClient = addon.httpClient(req);
      httpClient.get({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": "/rest/api/3/project/search"
      },
      function(err, response, body) {
        if (err) { 
          console.log(response.statusCode + ": " + err);
          res.send("Error: " + response.statusCode + ": " + err);
        }
        else {
          res.send(body);
        }
      });
    });

    app.get('/statuses', addon.checkValidToken(), (req, res) => {
      const httpClient = addon.httpClient(req);
      httpClient.get({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": "/rest/api/2/status"
      },
      function(err, response, body) {
        if (err) { 
          console.log(response.statusCode + ": " + err);
          res.send("Error: " + response.statusCode + ": " + err);
        }
        else {
          res.send(body);
        }
      });
    });

    app.get('/todo', addon.authenticate(), (req, res) => {
      res.render(
        'hello-world.jsx',
      );
    });
}
