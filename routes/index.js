export default function routes(app, addon) {
  const tokenCheck = () => addon.checkValidToken();
  const baseUrl = '/rest/api/3';

    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/search', tokenCheck(), async (req, res) => {
      let queryString = req.originalUrl;
      queryString = queryString.slice(0, queryString.indexOf('jwt=')-1);
      const httpClient = addon.httpClient(req);
      httpClient.get({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": `${baseUrl}${queryString}`
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

    app.delete('/issue/:issueId', tokenCheck(), (req, res) => {
      console.log('aha');
      let queryString = req.originalUrl;
      queryString = queryString.slice(0, queryString.indexOf('jwt=')-1);
      const httpClient = addon.httpClient(req);
      httpClient.del({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": `${baseUrl}${queryString}`
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

    app.get('/projects', tokenCheck(), (req, res) => {
      const httpClient = addon.httpClient(req);
      httpClient.get({
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "url": `${baseUrl}/project/search`
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

    app.get('/statuses', tokenCheck(), (req, res) => {
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
