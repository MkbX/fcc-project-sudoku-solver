const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();


suite('Unit Tests', () => {

    test('Logic handles a valid puzzle string of 81 characters', function() {
        this.timeout(10000);
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'),'Valid');
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
        this.timeout(10000);
        assert.equal(solver.validate('azertyuiopmlkjhgfdsqwxcvbnnbvcxwmlkjhgfdsqpoiuytrezaazertyuiopqsdfghjklmwxcvbn123'),'Invalid characters in puzzle');
    });
    test('Logic handles a puzzle string that is not 81 characters in length', function() {
        this.timeout(10000);
        assert.equal(solver.validate('12dlp'),'Expected puzzle to be 81 characters long');
    });
    test('Logic handles a valid row placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1,1),[true,'']);
    });
    test('Logic handles an invalid row placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 1,8),[false,'row']);
    });
    test('Logic handles a valid column placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkColPlacement('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 5, 1,9),[true,'']);
    });
    test('Logic handles an invalid column placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkColPlacement('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 3, 2,6),[false,'column']);
    });
    test('Logic handles a valid region (3x3 grid) placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkRegionPlacement('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', 6, 8,4),[true,'']);
    });
    test('Logic handles an invalid region (3x3 grid) placement', function() {
        this.timeout(10000);
        assert.deepEqual(solver.checkRegionPlacement('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', 8, 5,2),[false,'region']);
    });
    test('Valid puzzle strings pass the solver', function() {
        this.timeout(10000);
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'.split('')), true);
    });
    test('Invalid puzzle strings fail the solver', function() {
        this.timeout(10000);
        assert.equal(solver.validate('azertyuiopmlkjhgfdsqwxcvbnnbvcxwmlkjhgfdsqpoiuytrezaazertyuiopqsdfghjklmwxcvbn123'),'Invalid characters in puzzle');
    });
    test('Solver returns the expected solution for an incomplete puzzle', function() {
        this.timeout(10000);
        assert.equal(solver.solve('13576298494638125772845913659481762381253674.3.7.24598473298.61.516734.926914.375'.split('')), false);
    });


});
