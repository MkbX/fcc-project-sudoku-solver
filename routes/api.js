'use strict';

const { filterStageFromList } = require('@babel/preset-env/lib/utils.js');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  function getRowFromCoordinateLetter(value) {
    let val = value.toLowerCase();
    switch(val) {
      case 'a': return 1;
      case 'b': return 2;
      case 'c': return 3;
      case 'd': return 4;
      case 'e': return 5;
      case 'f': return 6;
      case 'g': return 7;
      case 'h': return 8;
      case 'i': return 9;
      default: return NaN;
    }
  }
  

  app.route('/api/check')
    .post((req, res) => {

      let stringValidation = solver.validate(req.body.puzzle);

      if(!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        res.json({ error: 'Required field(s) missing' });
      } else if(stringValidation.includes('Expected') || stringValidation.includes('Invalid')) {
        res.json({error: stringValidation});
      } else {
        if(req.body.coordinate.length !=2 ||
           !req.body.coordinate[0].match(/^[A-I]$/i) ||
           !req.body.coordinate[1].match(/^[1-9]$/) ) {
            res.json({error: 'Invalid coordinate'});
           } else if(!(req.body.value == 1 ||
            req.body.value == 2 ||
            req.body.value == 3 ||
            req.body.value == 4 ||
            req.body.value == 5 ||
            req.body.value == 6 ||
            req.body.value == 7 ||
            req.body.value == 8 ||
            req.body.value == 9 )) {
            res.json({error: 'Invalid value'});
           } else {
            //console.log(req.body);
            let conflict = [];
            let row = getRowFromCoordinateLetter(req.body.coordinate[0]);
            let col = Number(req.body.coordinate[1]);           
            let rowResult = solver.checkRowPlacement(req.body.puzzle, row, col, req.body.value);            
            let colResult = solver.checkColPlacement(req.body.puzzle, row, col, req.body.value);
            //console.log('PUZZLE: ',req.body.puzzle,' ,row: ',row,' ,col: ',col,' value: ',req.body.value);
            let regionResult = solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value);
            //console.log('pzzl: ',req.body.puzzle,' ,row: ',row,' ,col: ',col,' value: ',req.body.value);
            if(rowResult[0] == true && colResult[0] == true && regionResult[0] == true) {
              res.json({valid: true});
            } else {
              if(rowResult[0] == false) {
                conflict.push(rowResult[1]);
              }
              if(colResult[0] == false) {
                conflict.push(colResult[1]);
              } 
              if(regionResult[0] == false) {
                conflict.push(regionResult[1]);
              } 
              res.json({valid: false, conflict: conflict});
              
            }
           
            
           }
      }
      

    });
    
  app.route('/api/solve')
    .post((req, res) => {

      let stringValidation = solver.validate(req.body.puzzle);

      if(!req.body.puzzle) {
        res.json({ error: 'Required field missing' });
      } else if(stringValidation.includes('Expected') || stringValidation.includes('Invalid')) {
        res.json({error: stringValidation});
      } else {
        let stringArray = req.body.puzzle.split('');
        if(solver.solve(stringArray)) {
          res.json({solution: stringArray.join('')});
        } else {
          res.json({error: 'Puzzle cannot be solved'});
        }
      }

    });
};
