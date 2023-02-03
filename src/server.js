const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const parsedQuery = query.parse(parsedUrl.query);

  const status = +parsedQuery.status;
  const admin = parsedQuery.admin === 'true';
  const { wealth } = parsedQuery;

  const func = urlStruct[parsedUrl.pathname];
  if (func) {
    func(request, response, parsedQuery);
  } else {
    urlStruct.notFound(request, response, parsedQuery);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
