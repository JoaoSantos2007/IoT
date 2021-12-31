var body3 = window.document.querySelector('body')
var ul = window.document.createElement('ul')
ul.innerHTML += `<li id="menu"><a href="/Site/index.html">Home</a></li>`
ul.innerHTML += `<li id="menu"><a href="/Site/local/local.html">Local</a></li>`
ul.innerHTML += `<li id="menu"><a href="/Site/id/id.html">ID</a></li>`
ul.innerHTML += `<li id="menu"><a href="/Site/cloud/cloud.html">Cloud</a></li>`
ul.innerHTML += `<li id="menu"><a href="/Site/creditos/creditos.html">Créditos</a></li>`
ul.innerHTML += `<li id="add"><a  href="/Site/createregisto/create.html"><img src="files/add.png" alt="add" height="3.17%" width="2.3%"></a></li>`
ul.innerHTML += ` <li id="user"><a href="/Site/user/user.html"><img src="files/conf.png" alt="config" height="3.17%" width="2.3%"></a></li>`


body3.appendChild(ul)
