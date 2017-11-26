'use strict';

var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

describe('REST API request', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  var accessToken;
  it('ログイン成功', function(done) {
    json('post', '/api/users/login')
      .send({
        username: 'Bob',
        password: 'opensesame',
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        assert.equal(res.body.userId, 3);
        accessToken = res.body.id;
        done();
      });
  });
});

describe('失敗', function() {
  it('id指定でユーザーは取得できない', function(done) {
    json('post', '/api/users/foobar')
      .send({})
      .expect(404, done);
  });
});
