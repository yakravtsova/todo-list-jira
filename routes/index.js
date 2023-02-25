const fetch = require('node-fetch');

export default function routes(app, addon) {
  const apiHost = 'https://yakravtsova.atlassian.net/rest/api/3';
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/issue', async (req, res) => {
      console.log('ololo');
      const response = await fetch(`${apiHost}/search`, {
      method: "GET",
      headers: {
        'Authorization': `Basic ${Buffer.from('margaritaselez@gmail.com:ATATT3xFfGF0Ms_Av5CSCS1B_hWKTqHjX5sFDh3wb7EUfLr7_s4J-oY-xEAGQhhYVkUgd72ISEwtzjXgTUmr0DHwUcVOXE12FJNImV4p0bHt8N4WWEloo0qQkp6gxvbvOXLALD8muxxlxEKRPQtq8FIppZXwQB7wCC_peCG2mdaWTIVfVuyAYb4=BEE4FB90').toString('base64')}`,
        'Accept': 'application/json',
      }
    })
    .then(res => {
      return res.json();
  })
    .catch(err => console.error(err));

    return res.json(response);
    });

    app.get('/projects', async (req, res) => {
      console.warn('projects ololo');
      const response = await fetch(`${apiHost}/project/search`, {
      method: "GET",
    })
    .then(res => {
      return res.json();
  })
    .catch(err => console.error(err));

    return res.json(response);
    });

/*    app.get('https://yakravtsova.atlassian.net/rest/api/3/issue/picker?query=title', (req, res) => {
      res.status(200).send(query);
    });*/

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), (req, res) => {
        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
          'hello-world.jsx', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect'
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

    // Add additional route handlers here...
}
