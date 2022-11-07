class SudokuSolver {

  getRowIndexes(value) {
    switch(value) {
      case 1: return [0,1,2,3,4,5,6,7,8];
      case 2: return [9,10,11,12,13,14,15,16,17];
      case 3: return [18,19,20,21,22,23,24,25,26];
      case 4: return [27,28,29,30,31,32,33,34,35];
      case 5: return [36,37,38,39,40,41,42,43,44];
      case 6: return [45,46,47,48,49,50,51,52,53];
      case 7: return [54,55,56,57,58,59,60,61,62];
      case 8: return [63,64,65,66,67,68,69,70,71];
      case 9: return [72,73,74,75,76,77,78,79,80];
      default: return ['row error'];
    }
  }

  getColumnIndexes(value) {
    switch(value) {
      case 1: return [0,9,18,27,36,45,54,63,72];
      case 2: return [1,10,19,28,37,46,55,64,73];
      case 3: return [2,11,20,29,38,47,56,65,74];
      case 4: return [3,12,21,30,39,48,57,66,75];
      case 5: return [4,13,22,31,40,49,58,67,76];
      case 6: return [5,14,23,32,41,50,59,68,77];
      case 7: return [6,15,24,33,42,51,60,69,78];
      case 8: return [7,16,25,34,43,52,61,70,79];
      case 9: return [8,17,26,35,44,53,62,71,80];
      default: return ['column error'];
    }
  }

  indexRow(value) {
    return Math.trunc(value/9)+1;
  }

  indexCol(value) {
    return Math.trunc(value%9)+1;
  }


  validate(puzzleString) {

    //let result = '';

    if(!puzzleString) {
      return /*result =*/ 'Required field missing';
    }

    if(puzzleString.length < 81 || puzzleString.length > 81) {
      return /*result =*/ 'Expected puzzle to be 81 characters long';
    }

    if(puzzleString.match(/[^0-9,.]+/)) {
      return /*result =*/ 'Invalid characters in puzzle';
    }

    


    /*if(puzzleString.match(/^[0-9,.]{81}$/)) {
      result = 'valid string';
    }*/

    return 'Valid';
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowArray = this.getRowIndexes(row);
    let validity = true;
    let conflict = '';
    let rowColStringIndex = 9*(row-1)+column-1;
    //let rowArrayTruncated;

    //console.log('rowArray', rowArray);

    /*if(column == 1 || column == 2 || column == 3) {
       rowArrayTruncated = [
        rowArray[3],
        rowArray[4],
        rowArray[5],
        rowArray[6],
        rowArray[7],
        rowArray[8]
      ]
    }

    if(column == 4 || column == 5 || column == 6) {
       rowArrayTruncated = [
        rowArray[0],
        rowArray[1],
        rowArray[2],
        rowArray[6],
        rowArray[7],
        rowArray[8]
      ]
    }

    if(column == 7 || column == 8 || column == 9) {
       rowArrayTruncated = [
        rowArray[0],
        rowArray[1],
        rowArray[2],
        rowArray[3],
        rowArray[4],
        rowArray[5]
      ]
    }

    console.log('rowTruncated', rowArrayTruncated);*/

    for(const elem of rowArray/*Truncated*/) {
      if(puzzleString[elem] == value && elem != rowColStringIndex) {
        validity = false;
        conflict = 'row';
        break;
      }

    }
   //console.log('row: ', [validity, conflict]);

    return [validity, conflict];

  }

  checkColPlacement(puzzleString, row, column, value) {
    let columnArray = this.getColumnIndexes(column);
    let validity = true;
    let conflict = '';
    let rowColStringIndex = 9*(row-1)+column-1;
    //let columnArrayTruncated;
    //console.log('columnArray', columnArray);

    /*if(row == 1 || row == 2 || row == 3) {
      columnArrayTruncated = [
        columnArray[3],
        columnArray[4],
        columnArray[5],
        columnArray[6],
        columnArray[7],
        columnArray[8]
     ]
   }

   if(row == 4 || row == 5 || row == 6) {
    columnArrayTruncated = [
      columnArray[0],
      columnArray[1],
      columnArray[2],
      columnArray[6],
      columnArray[7],
      columnArray[8]
   ]
 }

 if(row == 7 || row == 8 || row == 9) {
  columnArrayTruncated = [
    columnArray[0],
    columnArray[1],
    columnArray[2],
    columnArray[3],
    columnArray[4],
    columnArray[5]
 ]
}

console.log('columnArrayTruncated', columnArrayTruncated);*/

    for(const elem of columnArray/*Truncated*/) {
      if(puzzleString[elem] == value && elem != rowColStringIndex) {
        validity = false;
        conflict = 'column';
        break;
      }

    }

    //console.log('col: ', [validity, conflict]);

    return [validity, conflict];

  }

  checkRegionPlacement(puzzleString, row, column, value) {

    const regionIndexes = [
      [0,1,2,9,10,11,18,19,20],
      [3,4,5,12,13,14,21,22,23],
      [6,7,8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
    ];

    let rowColStringIndex = 9*(row-1)+column-1;
    let regionArray = [];
    let validity = true;
    let conflict = '';

    //console.log('rowColStringIndex', rowColStringIndex);

    

    for(const elem of regionIndexes) {
      if(elem.includes(rowColStringIndex)) {
        regionArray = elem;
        break;
      }
    }    

    //console.log('regionArray', regionArray);

    for(const elem of regionArray) {
      if(puzzleString[elem] == value && elem != rowColStringIndex) {
        validity = false;
        conflict = 'region';
      break;
      }
    }

    //console.log('region: ', [validity, conflict]);

    return [validity, conflict];



  }

  solve(puzzleArray) {

    //let solution = '';
    //let solved = false;
    //let puzzleStringTemp = [...puzzleString];
    let pointPosition;
    //let pointsArray = [];

    //console.log('Grid: ', puzzleArray);
    //console.log('solvedGrid: ', !(puzzleStringTemp.join('').includes('.')));

    if(puzzleArray.includes('.')) {
      //console.log(' "." still included!!');
      
    } else {
      //console.log('finished. Result : ',puzzleArray.join(''));
      //solved = true;
      //return [solved, puzzleStringTemp.join('')];
      return true;

    }

    for(let i = 0; i < puzzleArray.length; i++) {
      if(puzzleArray[i] == '.') {
        pointPosition = i;
        //console.log('Found "." at : ', i);
        break;
      }
    }

    for( let k = 1; k < 10; k++) {
      if(this.checkRowPlacement(puzzleArray.join(''), this.indexRow(pointPosition), this.indexCol(pointPosition), k)[0] && 
      this.checkColPlacement(puzzleArray.join(''), this.indexRow(pointPosition), this.indexCol(pointPosition), k)[0] &&
      this.checkRegionPlacement(puzzleArray.join(''), this.indexRow(pointPosition), this.indexCol(pointPosition), k)[0] ) {
        //console.log('in for loop, value k = ', k, 'succeeded');
        puzzleArray[pointPosition] = k;
        //console.log('newString: ', puzzleArray, 'pointPosition: ', pointPosition, 'value: ', k);

        if(this.solve(puzzleArray)) {
          //console.log('Cleared. ', puzzleArray.join(''));
          //solved = true;
          //return [solved, puzzleString];
          return true;
        }
        puzzleArray[pointPosition] = '.'; 

      }
    }



    /*for( let i = 0; i < puzzleStringTemp.length; i++) {
      if(puzzleStringTemp[i] == '.') {
        console.log('Entering point at i = ',i);
        for(let k = 1; k < 10; k++) {
          if(this.checkRowPlacement(puzzleStringTemp.join(''), this.indexRow(i), this.indexCol(i), k)[0] && 
         this.checkColPlacement(puzzleStringTemp.join(''), this.indexRow(i), this.indexCol(i), k)[0] &&
         this.checkRegionPlacement(puzzleStringTemp.join(''), this.indexRow(i), this.indexCol(i), k)[0] ) {
          console.log('in for loop, value k = ', k, 'succeeded');
          puzzleStringTemp[i] = k;
          solution = puzzleStringTemp.join('');
          console.log('newString: ', puzzleStringTemp, 'i: ', i, 'value: ', k);
          //break;
          if(this.solve(puzzleStringTemp)[0]) {
            console.log('finished');
            solved = true;
            return [solved, puzzleStringTemp.join('')];
          }
          puzzleStringTemp[i] = '.';
          

         } else {
          console.log('in for loop, value k = ', k, 'failed');
         }
         
        }
        

      }
      

    }*/

    //solution = puzzleStringTemp.join('');
    //solved = false;
    //console.log('solved: ', solved, 'solution: ', solution);
    return false;
    
    
  }
}

module.exports = SudokuSolver;

