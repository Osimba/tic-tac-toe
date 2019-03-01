$(document).ready(main());

function main(){
  //Game variables
  var spaces = 9;
  var x; 
  var board = [0,1,2,3,4,5,6,7,8];
  
  //Variables for user
  var user = "O"; //user selected token
  //Variables for comp
  var comp = "X";
  var comp_move;
  
  function comp_token(){
    if(spaces <= 0){
      console.log("Tie");
      x = setTimeout(reset, 2000);
    }
      
    comp_move = minimax(board, comp).index;
    document.getElementById(comp_move + "").innerHTML = comp;
    board[comp_move] = comp;
    spaces--;
      
    if(winCheck(board, comp)){
      console.log("You Lose");
      x = setTimeout(reset, 2000);
    }
  }
  
  function reset(){
    for(var i = 0; i < board.length; i++){
      board[i] = i;
      document.getElementById(i + '').innerHTML = "";
    }
    spaces = 9;
    clearTimeout(x);
  }
  
  $(".spot").on("click", function(){
    if(board[this.id] === user || board[this.id] === comp) {
      return;
    } else {
      this.innerHTML = user;
      board[this.id] = user;
      if(winCheck(board, user)){
        console.log("You Win");
        x = setTimeout(reset, 2000);
      }
      spaces--;
      comp_token();
    }
  });
  
  function winCheck(game, player) {
    if((game[0] === player && game[1] === player && game[2] === player) || 
       (game[3] === player && game[4] === player && game[5] === player) ||
       (game[6] === player && game[7] === player && game[8] === player) ||
       (game[0] === player && game[3] === player && game[6] === player) ||
       (game[1] === player && game[4] === player && game[7] === player) ||
       (game[2] === player && game[5] === player && game[8] === player) ||
       (game[0] === player && game[4] === player && game[8] === player) ||
       (game[6] === player && game[4] === player && game[2] === player)) {
      return true;      
    } else {
      return false;
    }
  }
  
  function minimax(currBoard, player) {
    var spots = currBoard.filter(s => s != 'O' && s != 'X');
    if(winCheck(currBoard, user)){
      return {score: -10};
    } else if(winCheck(currBoard, comp)){
      return {score: 10};
    } else if(spots.length === 0){
      return {score: 0};
    }
    var moves = [];
    
    for(var i = 0; i < spots.length; i++){
      var move = {};
      move.index = currBoard[spots[i]];
      currBoard[spots[i]] = player;
      var result;
      if(player == comp) {
        result = minimax(currBoard, user);
        move.score = result.score;
      } else {
        result = minimax(currBoard, comp);
        move.score = result.score;
      }
      currBoard[spots[i]] = move.index;
      moves.push(move);
    }
    
    var bestMove, bestScore;
    if(player === comp) {
      bestScore = -1000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 1000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];
  }
  
  $(".btn").on('click', function(){
    user = this.id;
    if(this.id == 'X'){
      comp = 'O';
    } else {
      comp = 'X';
    }
    
    $("#tokenSelect").css("display", "none");
  });
}