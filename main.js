var ticTacRef;
var IDs;
var moveCount = 0;
var winner = false;

angular.module("TicTac", ["firebase"])
 .controller("TicTacCtrl", function($scope, $firebase){
  
  ticTacRef = new Firebase("https://woodruffttt.firebaseio.com/");
  $scope.fbRoot = $firebase(ticTacRef);

  // Wait until everything really is loaded
  $scope.fbRoot.$on("loaded", function() {
    IDs = $scope.fbRoot.$getIndex();
    if(IDs.length == 0)
    {
      // What???  No Board????  Let's build one.
      $scope.fbRoot.$add( { board:['','','','','','','','',''],
        xTurn:true} );
      $scope.fbRoot.$on("change", function() {
        IDs = $scope.fbRoot.$getIndex();
        $scope.obj = $scope.fbRoot.$child(IDs[0]);
      });
    }
    else
    {
      $scope.obj = $scope.fbRoot.$child(IDs[0]);
    }
    $scope.xWinMessage = {val: false, message: ""};
    $scope.oWinMessage = { val: false, message: ""}; 
    $scope.catsGame = { val: false, message: ""};
  });


  $scope.makeMove = function(idx){
    if($scope.obj.board[idx]=="")
    {
      $scope.obj.board[idx] = $scope.obj.xTurn ? 'X' : 'O';
      $scope.obj.xTurn = !$scope.obj.xTurn;
      $scope.obj.$save();
      console.log($scope.obj.board[idx]);
      moveCount++;
      console.log(moveCount);
    }

    // cell logic
    // [[0,1,2]
    //  [3,4,5]
    //  [6,7,8]]


    //horizontal win conditions for x
    if ($scope.obj.board[0] == $scope.obj.board[1]&& $scope.obj.board[1] == $scope.obj.board[2]&& $scope.obj.board[2] != "" && $scope.obj.board[2] == "X") {
       $scope.xWinMessage.message = "X won in the first row";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }
    if ($scope.obj.board[3] == $scope.obj.board[4]&& $scope.obj.board[4] == $scope.obj.board[5]&& $scope.obj.board[5] != "" && $scope.obj.board[5] == "X") {
        $scope.xWinMessage.message = "X won in the middle row";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }
    if ($scope.obj.board[6] == $scope.obj.board[7]&& $scope.obj.board[7] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
        $scope.xWinMessage.message = "X won in the first row";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }


    //horizontal win conditions for o
    if ($scope.obj.board[0] == $scope.obj.board[1]&& $scope.obj.board[1] == $scope.obj.board[2]&& $scope.obj.board[2] != "" && $scope.obj.board[2] == "O") {
        $scope.oWinMessage.message = "O won in the first row";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }
    if ($scope.obj.board[3] == $scope.obj.board[4]&& $scope.obj.board[4] == $scope.obj.board[5]&& $scope.obj.board[5] != "" && $scope.obj.board[5] == "O") {
        $scope.oWinMessage.message = "O won in the middle row";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }
    if ($scope.obj.board[6] == $scope.obj.board[7]&& $scope.obj.board[7] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
        $scope.oWinMessage.message = "O won in the last row";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }



    //vertical win conditions for x
    if ($scope.obj.board[0] == $scope.obj.board[3] && $scope.obj.board[3] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "X") {
        $scope.xWinMessage.message = "X won in the first column";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }
    if ($scope.obj.board[1] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[7]&& $scope.obj.board[7] != "" && $scope.obj.board[7] == "X") {
        $scope.xWinMessage.message = "X won in the middle column";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }
    if ($scope.obj.board[3] == $scope.obj.board[5] && $scope.obj.board[5] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
        $scope.xWinMessage.message = "X won in the last column";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }

    //vertical win conditions for o
    if ($scope.obj.board[0] == $scope.obj.board[3] && $scope.obj.board[3] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "O") {
        $scope.oWinMessage.message = "O won in the first column";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }
    if ($scope.obj.board[1] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[7]&& $scope.obj.board[7] != "" && $scope.obj.board[7] == "O") {
        $scope.oWinMessage.message = "O won in the middle column";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }
    if ($scope.obj.board[3] == $scope.obj.board[5] && $scope.obj.board[5] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
        $scope.oWinMessage.message = "O won in the last column";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }


    //diagonal win conditions for x
    if ($scope.obj.board[0] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
        $scope.xWinMessage.message = "X won diagonally";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }
    if ($scope.obj.board[2] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "X") {
        $scope.xWinMessage.message = "X won diagonally";
        winner = true;
        $scope.xWinMessage.val = !$scope.xWinMessage.val;
    }


    //diagonal win conditions for Cleaver
    if ($scope.obj.board[0] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
        $scope.oWinMessage.message = "O won diagonally";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }
    if ($scope.obj.board[2] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "O") {
        $scope.oWinMessage.message = "O won diagonally";
        winner = true;
        $scope.oWinMessage.val = !$scope.oWinMessage.val;
    }


    //cats game 
    if (moveCount == 9 && winner == false) {
      $scope.catsGame.message = "Cat's Game";
      $scope.catsGame.val = !$scope.catsGame.val;
    }

  };



    $scope.reset = function(){
      console.log("I am resetting");
      $scope.obj.board=['','','','','','','','',''];
      moveCount = 0;
      $scope.xWinMessage = {val: false, message: ""};
      $scope.oWinMessage = { val: false, message: ""}; 
      $scope.catsGame = { val: false, message: ""};
    };

 
 });





// function TicTacToeCtrl ($scope, $location) {
//   $scope.boxes = [['','',''],['','',''],['','','']];


  // $scope.reset = function(){
  //   $scope.boxes = [['','',''], ['','',''], ['','','']];
  //   $scope.nextMove = 'X';
  //   $scope.winner = '';
  // };

  // $scope.makeMove = function(row, col) {
  //   if (!$scope.winner && !$scope.board[row][col]) {
  //     $scope.board[row][col] = $scope.nextMove;
  //     $scope.nextMove = $scope.nextMove == 'X' ? 'O' : 'X';
  //   }
  // };
   
  // $scope.reset();

  // $scope.winningPlayer = function() {

    
  //   for(row=0; row < 3; row++) {
      
  //     var rowx = 0; var rowo=0;
  //     var colx = 0; var colo=0;
  //     var dia1x = 0; var dia1o=0;
  //     var dia2x = 0; var dia2o=0;

  //     for(box=0; box < 3; box++) {

  //       if($scope.boxes[row][box] == $scope.players[0].image) {rowx++}; 
  //       if($scope.boxes[box][row] == $scope.players[0].image) {colx++};
  //       if($scope.boxes[box][box] == $scope.players[0].image) {dia1x++};
  //       if($scope.boxes[box][2-box] == $scope.players[0].image) {dia2x++};

  //       if($scope.boxes[row][box] == $scope.players[1].image) {rowo++}; 
  //       if($scope.boxes[box][row] == $scope.players[1].image) {colo++}; 
  //       if($scope.boxes[box][box] == $scope.players[1].image) {dia1o++}; 
  //       if($scope.boxes[box][2-box] == $scope.players[1].image) {dia2o++}; 

  //     };
        
  //       var winningIndex = xTurn.var ? 0 : 1;

  //       if(rowx == 3 || colx == 3 ) {$scope.winner = $scope.players[winningIndex].image; $scope.tallyx = tallyx++; gameover=false};
  //       if(dia1x == 3 || dia2x == 3) {$scope.winner = $scope.players[winningIndex].image; $scope.tallyx = (tallyx++/3); gameover=false};
  //       if(rowo == 3 || colo == 3) {$scope.winner = $scope.players[winningIndex].image; $scope.tallyo = tallyo++; gameover=false};
  //       if(dia1o == 3 || dia2o == 3) {$scope.winner = $scope.players[winningIndex].image; $scope.tallyo = (tallyo++/3); gameover=false};
  //   }
  // }


  // $scope.$watch(function() { return $location.search().board;}, readUrl);
   
  // function setUrl() {
  //   var rows = [];
  //   angular.forEach($scope.board, function(row) {
  //     rows.push(row.join(','));
  //   });
  //   $location.search({board: rows.join(';') + '/' + $scope.nextMove});
  // }
   
  // function grade() {
  //   var b = $scope.board;
  //   $scope.winner =
  //     row(0) || row(1) || row(2) ||
  //     col(0) || col(1) || col(2) ||
  //     diagonal(-1) || diagonal(1);
  //   function row(row) { return same(b[row][0], b[row][1], b[row][2]);}
  //   function col(col) { return same(b[0][col], b[1][col], b[2][col]);}
  //   function diagonal(i) { return same(b[0][1-i], b[1][1], b[2][1+i]);}
  //   function same(a, b, c) { return (a==b && b==c) ? a : '';};
  // }
   
  // function readUrl(value) {
  //   if (value) {
  //     value = value.split('/');
  //     $scope.nextMove = value[1];
  //     angular.forEach(value[0].split(';'), function(row, col){
  //       $scope.board[col] = row.split(',');
  //     });
  //     grade();
      
  //   }
//   // }
// } 

// document.getElementsByClassName("button")[0].onclick= function() {
//  var userChoice = prompt("Are you ready to play? (type 'Y' to reset the board)");
//   if (userChoice == "Y") {
//     alert("Great! Let's play!")
//     window.location = ""; 
//   }
//   else {
//     alert("Oops!  I didn't understand.  Please type in 'Y' for a new game.");
//   }
// };