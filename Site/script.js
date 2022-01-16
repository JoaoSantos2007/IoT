const files = "assets/"

db.collection(Categoria).onSnapshot(function (documentos) {
  documentos.docChanges().forEach(function (changes) {
    const documento = changes.doc
    let key = documento.id
    console.log(key)
    var dados = documento.data()
    if (changes.type === "added") {
      carregar_layout(dados,key, false)

    } else if (changes.type === "modified") {
      carregar_layout(dados,key, true)

    } else if (changes.type === "removed") {
      var apagar = window.document.getElementById(key)
      apagar.innerHTML = ""
    }
  })
})



function carregar_layout(dados, key, modificar) {
  //Dados do registro
  const nome = dados.name
  const lugar = dados.location

  const main = window.document.querySelector('main')
  
  let section = window.document.createElement('section')
  section.setAttribute('id', key)

  let ul = window.document.createElement('ul')

  //Cabeçalho do Registro
  let item_header = window.document.createElement('li')
  item_header.setAttribute('class','item_header')


  //Nome do  Registro
  let item_title = window.document.createElement('p')
  item_title.setAttribute('class','item_title')
  item_title.innerText = `${nome}`
  item_header.appendChild(item_title)


  //Imagens de editar e apagar registro
  let div = window.document.createElement('div')
  //Imagegem de Editar Registro
  let img_edit = window.document.createElement('img')
  img_edit.setAttribute('class','edit')
  img_edit.setAttribute('src',`${files}edit.png`)
  img_edit.setAttribute('alt','Imagegem de Editar Registro')
  img_edit.setAttribute('onclick',`editar_registro(${key})`)
  div.appendChild(img_edit)
  //Imagem de Apagar Registro
  let img_delete = window.document.createElement('img')
  img_delete.setAttribute('class','delete')
  img_delete.setAttribute('src',`${files}delete.png`)
  img_delete.setAttribute('alt','Imagem de Apagar Registro')
  img_delete.setAttribute('onclick',`deletar('${key}')`)
  div.appendChild(img_delete)
  item_header.appendChild(div)


  //Lugar do Registro
  item_location = window.document.createElement('p')
  item_location.setAttribute('class','item_location')
  item_location.innerText = `${lugar}`
  item_header.appendChild(item_location)

  ul.appendChild(item_header)

  const obj = dados.data
  Object.keys(obj).forEach((types) =>{
    const obj_types = obj[types]

    Object.keys(obj_types).forEach((names) =>{
      let li_items = window.document.createElement('li')
      li_items.setAttribute('class','items')
      
      //Icons
      let img_icon = window.document.createElement('img')
      img_icon.setAttribute('class','icons')
      img_icon.setAttribute('src',`${files}${types}.png`)
      img_icon.setAttribute('alt',``)
      li_items.appendChild(img_icon)
  
      //Item Name
      let item_name = window.document.createElement('p')
      item_name.innerText = `${names}`
      li_items.appendChild(item_name)

      ul.appendChild(li_items)


      let div_contents = window.document.createElement('div')
      div_contents.setAttribute('class','contents')
      const obj_name = obj_types[names]
      if('settings' in obj_name){
        switch(types){
          case 'light':
            const valor = obj_name.settings.btn
            type_light(div_contents,key,valor,names)
            break
          case 'tv':
            type_tv(div_contents)
            break
          case 'air':
            type_air(div_contents)
            break
        }
        
      }else{
        let p_value = window.document.createElement('p')
        p_value.innerText=`${obj_name.value}`
        div_contents.appendChild(p_value)
      }

      li_items.appendChild(div_contents)
    })
    
  })


  section.appendChild(ul)
  main.appendChild(section)
}

function type_light(div,key,valor,name){
  let btn = window.document.createElement('input')
  btn.setAttribute('type','checkbox')
  btn.setAttribute('class','liga-desliga__checkbox')
  btn.setAttribute('id',`liga-desliga_${name}`)
  btn.setAttribute('onclick',`acionar_botao(${key})`)
  if(valor){
    btn.setAttribute('checked','true')
  }
  let label = window.document.createElement('label')
  label.setAttribute('for',`liga-desliga_${name}`)
  label.setAttribute('class','liga-desliga__botao')
  div.appendChild(btn)
  div.appendChild(label)
}

function type_tv(div){
  let section = window.document.createElement('section')
  section.setAttribute('class','tv')

  //Parte 1

  //Imagem Power
  let figure_power = window.document.createElement('figure')
  let img_power = window.document.createElement('img')
  img_power.setAttribute('src',`${files}power.png`)
  img_power.setAttribute('alt','Ligar e Desligar TV')
  let p_power = window.document.createElement('figcaption')
  p_power.innerText = 'Power'
  figure_power.appendChild(img_power)
  figure_power.appendChild(p_power)
  section.appendChild(figure_power)
  //Imagem Source
  let figure_source = window.document.createElement('figure')
  let img_source = window.document.createElement('img')
  img_source.setAttribute('src',`${files}source.png`)
  img_source.setAttribute('alt','Source TV')
  let p_source = window.document.createElement('figcaption')
  p_source.innerText = 'Source'
  figure_source.appendChild(img_source)
  figure_source.appendChild(p_source)
  section.appendChild(figure_source)
  //Imagem Menu
  let figure_menu = window.document.createElement('figure')
  let img_menu = window.document.createElement('img')
  img_menu.setAttribute('src',`${files}menu.png`)
  img_menu.setAttribute('alt','Menu TV')
  let p_menu = window.document.createElement('figcaption')
  p_menu.innerText = 'Menu'
  figure_menu.appendChild(img_menu)
  figure_menu.appendChild(p_menu)
  section.appendChild(figure_menu)
  
  section.appendChild(window.document.createElement('br'))
  
  //Parte 2

  //Imagem Aumentar canal 
  img_up_channel = window.document.createElement('img')
  img_up_channel.setAttribute('class','tv_channel')
  img_up_channel.setAttribute('src',`${files}up.png`)
  img_up_channel.setAttribute('alt','Aumentar Canal')
  section.appendChild(img_up_channel)
  //Texto Channel
  p_channel = window.document.createElement('p')
  p_channel.setAttribute('class','tv_channel')
  p_channel.innerText = 'Channel'
  section.appendChild(p_channel)
  //Imagem Diminuir canal 
  img_down_channel = window.document.createElement('img')
  img_down_channel.setAttribute('class','tv_channel')
  img_down_channel.setAttribute('src',`${files}down.png`)
  img_down_channel.setAttribute('alt','Diminuir Canal')
  section.appendChild(img_down_channel)

  section.appendChild(window.document.createElement('br'))

  //Parte 3

  //Imagem Aumentar volume 
  img_up_volume = window.document.createElement('img')
  img_up_volume.setAttribute('class','tv_volume')
  img_up_volume.setAttribute('src',`${files}up.png`)
  img_up_volume.setAttribute('alt','Aumentar volume')
  section.appendChild(img_up_volume)
  //Texto Channel
  p_volume = window.document.createElement('p')
  p_volume.setAttribute('class','tv_volume')
  p_volume.innerText = 'Volume'
  section.appendChild(p_volume)
  //Imagem Diminuir canal 
  img_down_volume = window.document.createElement('img')
  img_down_volume.setAttribute('class','tv_volume')
  img_down_volume.setAttribute('src',`${files}down.png`)
  img_down_volume.setAttribute('alt','Diminuir Canal')
  section.appendChild(img_down_volume)
  

  div.appendChild(section)
}

function type_air(div){
  let section = window.document.createElement('section')
  section.setAttribute('class','air')

  //Parte 1

  //Imagem Power
  let figure_power = window.document.createElement('figure')
  let img_power = window.document.createElement('img')
  img_power.setAttribute('src',`${files}power.png`)
  img_power.setAttribute('alt','Ligar e Desligar AR')
  let p_power = window.document.createElement('figcaption')
  p_power.innerText = 'Power'
  figure_power.appendChild(img_power)
  figure_power.appendChild(p_power)
  section.appendChild(figure_power)
  //Imagem Invert
  let figure_invert = window.document.createElement('figure')
  let img_invert = window.document.createElement('img')
  img_invert.setAttribute('src',`${files}menu.png`)
  img_invert.setAttribute('alt','Invert AIR')
  let p_invert = window.document.createElement('figcaption')
  p_invert.innerText = 'Invert'
  figure_invert.appendChild(img_invert)
  figure_invert.appendChild(p_invert)
  section.appendChild(figure_invert)
  //Imagem Time
  let figure_time = window.document.createElement('figure')
  let img_time = window.document.createElement('img')
  img_time.setAttribute('src',`${files}timer.png`)
  img_time.setAttribute('alt','Time AIR')
  let p_time = window.document.createElement('figcaption')
  p_time.innerText = 'Time'
  figure_time.appendChild(img_time)
  figure_time.appendChild(p_time)
  section.appendChild(figure_time)
  
  section.appendChild(window.document.createElement('br'))
  
  //Parte 2

  //Imagem Sleep
  let figure_sleep = window.document.createElement('figure')
  let img_sleep = window.document.createElement('img')
  img_sleep.setAttribute('src',`${files}power.png`)
  img_sleep.setAttribute('alt','Sleep AIR')
  let p_sleep = window.document.createElement('figcaption')
  p_sleep.innerText = 'Sleep'
  figure_sleep.appendChild(img_sleep)
  figure_sleep.appendChild(p_sleep)
  section.appendChild(figure_sleep)

  //Imagem Swing
  let figure_swing = window.document.createElement('figure')
  let img_swing = window.document.createElement('img')
  img_swing.setAttribute('src',`${files}timer.png`)
  img_swing.setAttribute('alt','Swing AIR')
  let p_swing = window.document.createElement('figcaption')
  p_swing.innerText = 'Swing'
  figure_swing.appendChild(img_swing)
  figure_swing.appendChild(p_swing)
  section.appendChild(figure_swing)


  section.appendChild(window.document.createElement('br'))

  //Parte 3

  //Imagem Aumentar Temperatura 
  img_up_temp = window.document.createElement('img')
  img_up_temp.setAttribute('class','air_temp')
  img_up_temp.setAttribute('src',`${files}add.png`)
  img_up_temp.setAttribute('alt','Aumentar Temperatura')
  section.appendChild(img_up_temp)
  //Texto Temperatura
  p_temp = window.document.createElement('p')
  p_temp.setAttribute('class','air_temp')
  p_temp.innerText = 'Temp'
  section.appendChild(p_temp)
  //Imagem Diminuir Temperatura 
  img_down_temp = window.document.createElement('img')
  img_down_temp.setAttribute('class','air_temp')
  img_down_temp.setAttribute('src',`${files}remove.png`)
  img_down_temp.setAttribute('alt','Diminuir Temperatura')
  section.appendChild(img_down_temp)
  
  
  div.appendChild(section)
}


var audio = new Audio()
function reproduzir_audio() {
  audio.src = `${files}audio.mp3`
  audio.play()
}