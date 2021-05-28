const {
  addBook,
  getAllBook,
  getBookById,
  editBook,
  deleteBook,
} = require('./handler');

const routes = [
  // add
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  // get
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  // get by id
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  // update
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBook,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  // delete
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
];

module.exports = routes;
