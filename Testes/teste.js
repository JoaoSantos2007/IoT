//SingleEventListener
// db.collection("Categorias").doc("1").get().then(function (doc) {
//   if (doc.exists) {
//     console.log("existe")

//     const dados = doc.data()

//     const id = dados.id
//     const nome = dados.nome
//     const key = doc.id

//       console.log("Nome da Pasta:" + key + " | ID:" + id + "| Nome: " + nome)

//   } else {
//     console.log("Não existe")
//   }

// })



//EventListerner
// db.collection("Categorias").doc("1").onSnapshot(function (doc) {
//   if (doc.exists) {
//     console.log("existe")

//     const dados = doc.data()

//     const id = dados.id
//     const nome = dados.nome
//     const key = doc.id

//       console.log("Nome da Pasta:" + key + " | ID:" + id + "| Nome: " + nome)

//   } else {
//     console.log("Não existe")
//   }

// })



//ChildEventListener
// db.collection("Categorias").onSnapshot(function (documentos) {
//   documentos.docChanges().forEach(function (changes) {
//     if (changes.type === "added") {
//       const documento = changes.doc
//       const dados = documento.data()
//       const key = documento.id
//       console.log("added Nome da Pasta: " + key)
//     } else if (changes.type === "modified") {
//       const documento = changes.doc
//       const dados = documento.data()
//       const key = documento.id
//       console.log("modified Nome da Pasta: " + key)
//     } else if (changes.type === "removed") {
//       const documento = changes.doc
//       const dados = documento.data()
//       const key = documento.id
//       console.log("removed Nome da Pasta: " + key)
//     }
//   })
// })

console.log(String('tv_keyt'.split('tv_')))