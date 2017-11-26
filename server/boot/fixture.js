'use strict';

module.exports = function(app) {
  var User = app.models.user;
  var users = [
    {
      username: 'Joe',
      password: 'opensesame',
      email: 'joe@example.com',
    },
    {
      username: 'Jane',
      password: 'opensesame',
      email: 'jane@example.com',
    },
    {
      username: 'Bob',
      password: 'opensesame',
      email: 'bob@example.com',
    },
  ];

  User.create(users, function(err, obj) {
    console.log('Created: ', obj);
  });
};
