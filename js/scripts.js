$(function(){

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

      $("#moveDiv").css("left", left + "px");
      $("#moveDiv").css("top", top + "px");



      currentPosition = [left, top]
      console.log(currentPosition);

      //insert comment based on the current position
      if(left < 0 || left > 600 || top > 600 || top < 0){
        $("#comment").text("You are out of border!");
      }else if( (left > 500 && top > 300) && (left < 600 && top < 400)){
        $("#comment").text("You hit blue box!!");

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
