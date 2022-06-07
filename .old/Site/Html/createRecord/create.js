function criar_registro() {
    var type = String((window.document.getElementById("txttype").value))
    var name = String((window.document.getElementById("txtname").value))
    var local = String((window.document.getElementById("txtlocation").value))
    var id = Number((window.document.getElementById("txtid").value))
    db.collection(Categoria).doc().set({
        'deviceId': id,
        'type': type,
        'name': name,
        'location': local,
        'currentValue': ' - - '
    })
    window.alert("Registro criado")
    setInterval(function () {
        window.location.href = ("../index.html")
    }, 1000)
}