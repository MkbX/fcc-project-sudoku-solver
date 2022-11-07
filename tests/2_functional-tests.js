const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');


chai.use(chaiHttp);


suite('Functional Tests', () => {

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
      this.timeout(10000);
        chai.request(server).post('/api/solve')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'})
        .end(function (err, res) {
          assert.equal(res.body.solution,'473891265851726394926345817568913472342687951197254638734162589685479123219538746');
          done();
        });
      });

      test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/solve')
        .send({})
        .end(function (err, res) {
          assert.equal(res.body.error,'Required field missing');
          done();
        });
      });

      test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/solve')
        .send({puzzle: 'azertyuiopmlkjhgfdsqwxcvbnnbvcxwmlkjhgfdsqpoiuytrezaazertyuiopqsdfghjklmwxcvbn123'})
        .end(function (err, res) {
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
      });

      test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/solve')
        .send({puzzle: '.7887'})
        .end(function (err, res) {
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
      });

      test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/solve')
        .send({puzzle: '13576298494638125772845913659481762381253674.3.7.24598473298.61.516734.926914537.'})
        .end(function (err, res) {
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
      });

      test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'A2', value: 1 })
        .end(function (err, res) {
          assert.equal(res.body.valid, true);
          done();
        });
      });

      test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'E9', value: 3 })
        .end(function (err, res) {
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["region"]);
          done();
        });
      });

      test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'I7', value: 8 })
        .end(function (err, res) {
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["row", "region"]);
          done();
        });
      });

      test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'G3', value: 7 })
        .end(function (err, res) {
          assert.equal(res.body.valid, false);
          assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
          done();
        });
      });

      test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({})
        .end(function (err, res) {
          assert.equal(res.body.error,'Required field(s) missing');
          done();
        });
      });

      test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: 'azertyuiopmlkjhgfdsqwxcvbnnbvcxwmlkjhgfdsqpoiuytrezaazertyuiopqsdfghjklmwxcvbn123', coordinate: 'A1', value: 9 })
        .end(function (err, res) {
          assert.equal(res.body.error,'Invalid characters in puzzle');
          done();
        });
      });

      test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '1247hgs', coordinate: 'A1', value: 9 })
        .end(function (err, res) {
          assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
          done();
        });
      });

      test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'P18', value: 8 })
        .end(function (err, res) {
          assert.equal(res.body.error,'Invalid coordinate');
          done();
        });
      });

      test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
        this.timeout(10000);
        chai.request(server).post('/api/check')
        .send({puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6', coordinate: 'F2', value: 18 })
        .end(function (err, res) {
          assert.equal(res.body.error,'Invalid value');
          done();
        });
      });



});

