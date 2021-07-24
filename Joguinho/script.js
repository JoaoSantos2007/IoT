var screenWidth = screen.width;
var screenHeight = screen.height;
// window.alert(screenWidth)
// window.alert(screenHeight)

document.querySelector('body').addEventListener('keydown', function(event) {
    console.log( event.keyCode )
    if(event.keyCode == 39){
        mover()
    }
});

function mover(){
    var snake = window.document.getElementById
}

// var pressed = document.getElementById('pressed');

// function keyPressed(evt) {
//     evt = evt || window.event;
//     var key = evt.keyCode || evt.which;
//     return String.fromCharCode(key);
// }

// document.onkeypress = function (evt) {
//     var str = keyPressed(evt);
//     pressed.innerHTML += str;
// };