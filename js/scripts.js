$(function(){

  //object
  function Block(topLeft, topRight, bottomRight, bottomLeft, blockId){
      this.topLeft = topLeft;   //[x, y]
      this.topRight = topRight; //[x, y]
      this.bottomRight = bottomRight; //[x, y]
      this.bottomLeft = bottomLeft;  //[x, y]
      this.blockId = blockId;
      this.width = topRight[0] - topLeft[0];
      this.height = bottomLeft[1] - topLeft[1];
      this.color = "blue";
      };

  var blockId = 0;
  var newBlock = new Block( [0, 0], [10, 0], [10, 10], [0, 10], blockId)
  var newBlock2 = new Block( [100, 100], [150, 100], [150, 150], [100, 150], blockId);
  var newBlock3 = new Block( [220, 100], [430, 100], [290, 220], [220, 320], blockId);
  var generateBlock = function(newBlock){
    $("#newBlock" + blockId).css("position", "absolute");
    $("#newBlock" + blockId).css("left", newBlock.topLeft[0] + "px");
    $("#newBlock" + blockId).css("top", newBlock.topLeft[1] + "px");
    $("#newBlock" + blockId).css("height", newBlock.height + "px");
    $("#newBlock" + blockId).css("width", newBlock.width + "px");
    $("#newBlock" + blockId).css("background-color", newBlock.color);
  }
  var insertBlock = function(newBlock){
    $("#generate-block-here").append('<div id=' + '"' + 'newBlock' + blockId + '"' +  '</div>');
    generateBlock(newBlock);
    blockId++;
  }

  var blockCondition = function(newBlock){
   return (left > newBlock.topLeft[0] && left < (newBlock.topLeft[0] + newBlock.width)) && (top > newBlock.topLeft[1] && top < (newBlock.topLeft[1] + newBlock.height))
  }

  insertBlock(newBlock);
  insertBlock(newBlock2);
  insertBlock(newBlock3);


  ///////////////////////////////////////////////
  ////////////// Move Function!!/////////////////
  //////////////////////////////////////////////
  var keysPressed = [false,false,false,false];
  var spacePressed = false;
  window.onkeydown = keyDownHandler;
  window.onkeyup = keyUpHandler;

  function keyDownHandler(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40)
          keysPressed[e.keyCode - 37] = true;
      if (e.keyCode == 32)
          spacePressed = true;
  }

  function keyUpHandler(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40)
          keysPressed[e.keyCode - 37] = false;
      if (e.keyCode == 32)
          spacePressed = false;
  }

  var left = 0;
  var top = 0;
  var speed = 1;

  var currentPosition = [left, top]

  function updateKeys() {
      if (keysPressed[0])
          left -= speed;
      if (keysPressed[2])
          left += speed;
      if (keysPressed[1])
          top -= speed;
      if (keysPressed[3])
          top += speed;

      $("#newBlock0").css("left", left + "px");
      $("#newBlock0").css("top", top + "px");


      currentPosition = [left, top]
      console.log(currentPosition);


      //insert comment based on the current position
      if(left < 0 || left > 600 || top > 600 || top < 0){
        $("#comment").text("You are out of border!");
      }else if( blockCondition(newBlock2)){
        $("#comment").text("You hit the small blue box!!");
      }else if( blockCondition(newBlock3)){
        $("#comment").text("You hit the big blue box!!");
      }else{
        $("#comment").text("You are inside of border!");
      }

      if (spacePressed)
          $("#spacePressedShow").css("display", "block");
      else
          $("#spacePressedShow").css("display", "none");
  }

  setInterval(updateKeys, 1);
});
