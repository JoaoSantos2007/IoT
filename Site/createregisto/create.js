//Armazena as credenciais do Firebase em uma constante
const firebaseConfig = {
  // apiKey: "AIzaSyDu-JTPXU0xU0xhAj8fACBbWfXcxuPOrmw",
  // authDomain: "teste-345e7.firebaseapp.com",
  // projectId: "teste-345e7",
  // storageBucket: "teste-345e7.appspot.com",
  // messagingSenderId: "939130156420",
  // appId: "1:939130156420:web:2b7f5f78068e19aac259d1",
  // measurementId: "G-WLED1GNYY6"
  apiKey: "AIzaSyCoZBonmOjR0JdmJlnGx338KujPBk61wuI",
  authDomain: "teste2-4ac49.firebaseapp.com",
  projectId: "teste2-4ac49",
  storageBucket: "teste2-4ac49.appspot.com",
  messagingSenderId: "571684171981",
  appId: "1:571684171981:web:7623e6fb860175fc023984",
  measurementId: "G-BR5S3M0QT7"
};


//Inicializa o Firebase com a constante contendo as credenciais do Firebase
firebase.initializeApp(firebaseConfig)


//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();



function criar_registro() {
  var type = String((window.document.getElementById("txttype").value))
  var name = String((window.document.getElementById("txtname").value))
  var local = String((window.document.getElementById("txtlocation").value))
  var id = String((window.document.getElementById("txtid").value))
  window.alert(type)
  db.collection("Categorias").doc().set({
    'id': id,
    'type': type,
    'name': name,
    'local': local,
    'currentValue': ' - - '
  })
  // window.location.href = ("/Site/index.html")
}