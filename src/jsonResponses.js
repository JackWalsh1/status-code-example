const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response, queryParams) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, queryParams) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
};

const notFound = (request, response, queryParams) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
};

module.exports = {
  success,
  badRequest,
  notFound,
};
