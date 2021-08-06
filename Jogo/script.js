var screenWidth = screen.width;
var screenHeight = screen.height;
var posicao = 1
var jogo = false
// var largura = screenWidth * 0.05
// var comprimento = screenHeight * 0.05
// window.alert(largura)
// window.alert(comprimento)
var tamanho
var ritmo = "parado"
var horizontal = 50
var vertical = 50
// window.alert(screenWidth)
// window.alert(screenHeight)
window.ononline = function(){
    window.alert("HELLO")
}

function detecta(event) {
    jogo = true
    var tecla = event.key
    console.log(tecla)
    rotacionar(tecla)
}

function rotacionar(tecla) {
    var snake = window.document.getElementById("snake")
    if (tecla == "ArrowLeft") {
        ritmo = "esquerda"
    } else if (tecla == "ArrowRight") {
        ritmo = "direita"
    } else if (tecla == "ArrowUp") {
        ritmo = "subir"
    } else if (tecla == "ArrowDown") {
        ritmo = "descer"
    }
    // posicao++
    // console.log(snake.style.left.value)
    // snake.style.left = posicao+"%"
    // while (true) {

    // }
}

while (jogo) {
    detecta("")
    var snake = window.document.getElementById("snake")
    if (ritmo == "esquerda") {
        horizontal--
    } else if (ritmo == "direita") {
        horizontal++
    } else if (ritmo == "subir") {
        vertical--
    } else if (ritmo == "descer") {
        vertical++
    }
    snake.style.left = horizontal + "%"
    snake.style.top = vertical + "%"
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

// document.querySelector('body').addEventListener('keydown', function (event) {
//     console.log(event.keyCode)
//     console.log("OK")
//     if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
//         mover()
//     }
// });