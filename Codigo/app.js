
alertify.alert('Instrucciones', 'Presiona -CALIBRAR- para comenzar. <br> Presiona el boton -Vista- para desactivar la mirada. <br> Presiona 2 veces -Stop- para borrar las grabaciones hechas.');

///////////////////////// DRUMKIT ///////////////////////////////
const drums = new Howl({
  "src": [
    "./drums/audio/drums.webm",
    "./drums/audio/drums.mp3"
  ],
  "sprite": {
    "china": [
      0,
      2229.229024943311
    ],
    "clap": [
      4000,
      360.5668934240365
    ],
    "closed-hh": [
      6000,
      52.789115646258544
    ],
    "kick": [
      8000,
      701.6326530612247
    ],
    "open_hh": [
      10000,
      597.5510204081634
    ],
    "snare": [
      12000,
      92.69841269841272
    ]
  }
});

const drumkit = document.querySelector('.drumkit');
drumkit.addEventListener('click', () => {
  if (event.target.classList.contains('pad')) {
    let soundToPlat = event.target.dataset.sound;
    drums.play(soundToPlat);
  }
});
///////////////////////// DRUMKIT ///////////////////////////////


///////////////////////// PIANO ///////////////////////////////
const pianoH = new Howl({
  "src": [
    "./piano/audio/piano.webm",
    "./piano/audio/piano.mp3"
  ],
  "sprite": {
    "pianoAm": [
      0,
      3956.2585034013605
    ],
    "pianoC": [
      5000,
      3654.6712018140593
    ],
    "pianoF": [
      10000,
      4145.850340136054
    ],
    "pianoG": [
      16000,
      3908.8662131519277
    ]
  }
})
const piano = document.querySelector('.piano');
piano.addEventListener('click', () => {
  if (event.target.classList.contains('pad')) {
    let soundToPlat = event.target.dataset.sound;
    pianoH.play(soundToPlat);
  }
});

///////////////////////// PIANO ///////////////////////////////


///////////////////////// GUITARRA ///////////////////////////////
const guitarraH = new Howl({
  "src": [
    "./guitarra/audio/guitarra.webm",
    "./guitarra/audio/guitarra.mp3"
  ],
  "sprite": {
    "guitarraAm": [
      0,
      3194.784580498866
    ],
    "guitarraC": [
      5000,
      3458.072562358277
    ],
    "guitarraF": [
      10000,
      3270.861678004536
    ],
    "guitarraG": [
      15000,
      3547.936507936509
    ]
  }
})
const guitarra = document.querySelector('.guitarra');
guitarra.addEventListener('click', () => {
  if (event.target.classList.contains('pad')) {
    let soundToPlat = event.target.dataset.sound;
    guitarraH.play(soundToPlat);
  }
});
///////////////////////// GUITARRA ///////////////////////////////


///////////////////////// BAJO //////////////////////////////////
const bajoH = new Howl({
  "src": [
    "./bajo/audio/bajo.webm",
    "./bajo/audio/bajo.mp3"
  ],
  "sprite": {
    "bajoAm": [
      0,
      2259.909297052154
    ],
    "bajoC": [
      4000,
      2536.4625850340135
    ],
    "bajoF": [
      8000,
      2337.5283446712024
    ],
    "bajoG": [
      12000,
      2615.056689342403
    ]
  }
})
const bajo = document.querySelector('.bajo');
bajo.addEventListener('click', () => {
  if (event.target.classList.contains('pad')) {
    let soundToPlat = event.target.dataset.sound;
    bajoH.play(soundToPlat);
  }
});
///////////////////////// BAJO //////////////////////////////////




// Conectando entrada MediaStreamDestination to Howler.masterGain 
let streamDest = Howler.ctx.createMediaStreamDestination()
Howler.masterGain.connect(streamDest) // connect masterGain to destination
// Configurando salida de Media Recorder
let chunks = []
let mediaRecorder = new MediaRecorder(streamDest.stream, { mimeType: 'audio/webm' })

mediaRecorder.onstart = () => {
  console.log('Started recording Howl output')
}
mediaRecorder.ondataavailable = (e) => {
  chunks.push(e.data)
}

//Declaracion del Howler donde guardar el blob url
let blob;
recordings = [];

mediaRecorder.onstop = () => {
  console.log("Done recording")
  blob = new Blob(chunks, { 'type': 'audio/wav' })
  chunks = [];
  recordings.push(new Wad({ source: URL.createObjectURL(blob) }))
  banderin = true; //Primera grabacion hecha
}




//FUNCIONES
//Declaracion de botones de Control
const grabar_btn = document.getElementById("grabar");
const stop_btn = document.getElementById("stop");
const play_btn = document.getElementById("play");
grabar_btn.addEventListener('click', function () {
  grabar();
})
stop_btn.addEventListener('click', function () {
  stopp();
})
play_btn.addEventListener('click', async () => {
  playy(instrumentoActivo);
});


var banderin = false
function grabar() {
  //detener grabacion en segundo click
  if (mediaRecorder.state == "recording") {
    console.log("grabando papu, vamo a detener")
    mediaRecorder.stop();
    return
  }
  PrimerClick = 1;
  //oscilador para metronomo
  saw = new Wad({ source: 'sine' });
  f1();
  ////Metronomo///
  var tempo = tempoSlider;
  var bpm = 60.0 / tempo;
  bpm = bpm * 1000
  //detener grabacion(variables)
  var duracion = 0;
  compases = CompSlider;
  duracion = (compases * (240 / tempo)) * 1000
  function resolveAfter(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, bpm);
    });
  }
  async function f1() {
    saw.play({ env: { hold: .05 } });
    var x = await resolveAfter(10);
    saw.play({ env: { hold: .2 } });
    var x = await resolveAfter(10);
    saw.play({ env: { hold: .2 } });
    var x = await resolveAfter(10);
    saw.play({ env: { hold: .2 } });
    var x = await resolveAfter(10);
    saw.play({ env: { hold: .2 } });
    var x = await resolveAfter(10);
    lep = false;
    mediaRecorder.start();
    var bRec = document.getElementById("grabar")
    bRec.classList.add("grabando")//cambiar color de boton
    if (banderin) { playlist() }//reproducir grabacion anterior

    setTimeout(function () {
      mediaRecorder.stop();
      bRec.classList.remove("grabando")
      console.log("detenido, limite de compases")
    }, duracion);
  }
}


let lep = true;
let PrimerClick = 0;
function playy(activo) {
  if (PrimerClick == 0) {
  } else {
    activarReproductor(play_btn)
    lep = true;
    playlist();
  }
}

function playlist() {
  let k = 0;
  borrar = 0;
  for (k = 0; k < recordings.length; k++) {
    recordings[k].play();
  }
  if (lep == true) {
    setTimeout(function () { playlist(); }, recordings[0].duration);
  }
}

let borrar = 0;
function stopp() {
  if (borrar == 0) {
    lep = false;
    desactivarReproductor(play_btn)
    borrar = 0;
  }
  borrar++
  if (borrar == 2) {
    recordings.length = 0;
    borrar = 0;
    PrimerClick = 0;
    alertify.alert('Borrado', 'Grabaciones borradas');
  }

}



//////////////////// AUDIO CONTEXT ////////////////////////
// const audioContext = new AudioContext();
// const buffer = audioContext.createBuffer(
//   1,
//   audioContext.sampleRate * 1,
//   audioContext.sampleRate
// )
// //obtener los datos del canal 1 
// const ChannelData = buffer.getChannelData(0);
// for (let i = 0; i < buffer.length; i++) {
//   ChannelData[i] = Math.random() * 2 - 1;
// }
// //primaryGainControl es el nodo principal
// const primaryGainControl = audioContext.createGain()
// primaryGainControl.gain.setValueAtTime(1, 0);
// primaryGainControl.connect(audioContext.destination);
//////////////////// AUDIO CONTEXT ////////////////////////



//////////////////////////Slider range METRONOMO/////////////////////
var slider = document.getElementById("metronome-slider");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
var tempoSlider = slider.value;
//actualizar valor de slider
slider.oninput = function () {
  output.innerHTML = this.value;
  tempoSlider = slider.value;
}
/////////////////////////Slider range METRONOMO/////////////////////

////////////////////////Slider range COMPASES/////////////////////
var sliderCom = document.getElementById("compases-slider");
var outputCom = document.getElementById("demo2");
outputCom.innerHTML = sliderCom.value;
var CompSlider = sliderCom.value;
//actualizar valor de slider
sliderCom.oninput = function () {
  outputCom.innerHTML = this.value;
  CompSlider = sliderCom.value;
}
////////////////////////Slider range COMPASES/////////////////////

// ///////////////////////Slider range TRANSPORTAR/////////////////////
// var sliderTonalidad = document.getElementById("tonalidad-slider");
// var outputTonalidad = document.getElementById("demo3");
// outputCom.innerHTML = sliderTonalidad.value;
// var TonalidadSlider = sliderTonalidad.value;
// //actualizar valor de slider
// sliderTonalidad.oninput = function () {
//   outputTonalidad.innerHTML = this.value;
//   TonalidadSlider = sliderTonalidad.value;
// }
////////////////////////Slider range TRANSPORTAR/////////////////////








/////////////////////////////////////MOSTRAR-OCULTAR///////////////////////////////////////////
var instrumentoActivo = 0;
var controls = document.getElementById("controls");
var inicio = document.getElementById("inicio");
function ocultar(idBoton) {
  switch (idBoton) {
    case 1://bateria
      activar(bDrumkit);
      calibrar.style.visibility = 'hidden';
      pianokit.style.visibility = 'hidden';
      guitarrakit.style.visibility = 'hidden';
      bajokit.style.visibility = 'hidden';
      inicio.style.visibility = 'hidden';
      instrumentoActivo = 1;
      break;
    case 2://piano
      activar(bPiano);
      calibrar.style.visibility = 'hidden';
      drumkitBase.style.visibility = 'hidden';
      guitarrakit.style.visibility = 'hidden';
      bajokit.style.visibility = 'hidden';
      inicio.style.visibility = 'hidden';
      instrumentoActivo = 2;
      break;
    case 3://guitarra
      activar(bGuitarra);
      calibrar.style.visibility = 'hidden';
      drumkitBase.style.visibility = 'hidden';
      pianokit.style.visibility = 'hidden';
      bajokit.style.visibility = 'hidden';
      inicio.style.visibility = 'hidden';
      instrumentoActivo = 3;
      break;
    case 4://bajo
      activar(bBajo);
      calibrar.style.visibility = 'hidden';
      drumkitBase.style.visibility = 'hidden';
      pianokit.style.visibility = 'hidden';
      guitarrakit.style.visibility = 'hidden';
      inicio.style.visibility = 'hidden';
      instrumentoActivo = 4;
      break;
    case 5://calibrar
      webgazer.clearData();
      pianokit.style.visibility = 'hidden';
      drumkitBase.style.visibility = 'hidden';
      guitarrakit.style.visibility = 'hidden';
      bajokit.style.visibility = 'hidden';
      controls.style.visibility = 'hidden'
      inicio.style.visibility = 'hidden';
      instrumentoActivo = 0;
      alertify.alert('Calibración', 'Presiona cada circulo 5 veces hasta que se vuelva color rojo mientras fijas tu mirada en este.  Recuerda seguir el cursor siempre con la mirada. ');
      break;
    default:
  }
}

//Boton drumkit
var bDrumkit = document.getElementById("b-drumkit");
var drumkitBase = document.getElementById("drumkit")
bDrumkit.addEventListener('click', function (e) {
  if (drumkitBase.style.visibility === 'visible') {
    drumkitBase.style.visibility = 'hidden';
    instrumentoActivo = 0;
  } else {
    drumkitBase.style.visibility = 'visible';
    ocultar(1);
  }
}, false);


//Boton piano
var bPiano = document.getElementById("b-piano");
var pianokit = document.getElementById("piano")
bPiano.addEventListener('click', function (e) {
  if (pianokit.style.visibility === 'visible') {
    pianokit.style.visibility = 'hidden';
    instrumentoActivo = 0;
  } else {
    pianokit.style.visibility = 'visible';
    ocultar(2);
  }
}, false);


//boton guitarra
var bGuitarra = document.getElementById("b-guitarra");
var guitarrakit = document.getElementById("guitarra")
bGuitarra.addEventListener('click', function (e) {
  if (guitarrakit.style.visibility === 'visible') {
    guitarrakit.style.visibility = 'hidden';
    instrumentoActivo = 0;
  } else {
    guitarrakit.style.visibility = 'visible';
    ocultar(3);
  }
}, false);

//boton bajo
var bBajo = document.getElementById("b-bajo");
var bajokit = document.getElementById("bajo")
bBajo.addEventListener('click', function (e) {

  if (bajokit.style.visibility === 'visible') {
    bajokit.style.visibility = 'hidden';
    instrumentoActivo = 0;
  } else {
    bajokit.style.visibility = 'visible';
    ocultar(4);
  }
}, false);


//Boton calibrar
const demoClasses = document.querySelectorAll('.circulo');
var calibrar = document.getElementById("calibrar");
var bCalibrar = document.getElementById("b-calibrar")
function resetcalibrar() {
  calibracionCompleta = false
  demoClasses.forEach(element => {
    element.classList.remove("circulo2")
  });
}
bCalibrar.addEventListener('click', function (e) {
  activar(bCalibrar)
  if (calibrar.style.visibility === 'visible') {
    calibrar.style.visibility = 'hidden';
    resetcalibrar();
  } else {
    calibrar.style.visibility = 'visible';
    resetcalibrar();
    ocultar(5);
  }
}, false);

//Boton Vista
let vista = true;
var bCamara = document.getElementById("vista")
bCamara.addEventListener('click', function (e) {
  if (vista == true) {
    vista = false
    webgazer.pause();
    bCamara.classList.remove("vista")
  }
  else {
    vista = true;
    webgazer.resume();
    bCamara.classList.add("vista")
  }
}, false);

///////////////////////////////////////////MOSTRAR-OCULTAR/////////////////////////////////////////////////






///////////////////////////////////////////ACTIVAR/////////////////////////////////////////////////

//Botones de instrumentos
let vectorBotones = []
vectorBotones.push(bDrumkit)
vectorBotones.push(bPiano)
vectorBotones.push(bBajo)
vectorBotones.push(bGuitarra)
let activo = false;
function activar(boton) {
  if (activo == false) {
    boton.classList.add("grabando");
  }
  for (let index = 0; index < vectorBotones.length; index++) {
    if (boton != vectorBotones[index]) {
      vectorBotones[index].classList.remove("grabando")
    }
  }
}

let activo2 = false;
function activarReproductor(boton) {
  if (activo == false) {
    boton.classList.add("grabando");
    activo2 = true
  }
}
function desactivarReproductor(boton) {
  if (activo2) {
    boton.classList.remove("grabando")
    activo2 = false
  }
}
///////////////////////////////////////////ACTIVAR/////////////////////////////////////////////////







////////////////////////////////////////////WEBGAZER///////////////////////////////////////////////////////
var calibracionCompleta = true
var fuera1 = false;
var fuera2 = false;
var fuera3 = false;
var fuera4 = false;


function bloquear() {
  fuera1 = false;
  fuera2 = false;
  fuera3 = false;
  fuera4 = false;
}

pad1 = document.getElementById("pad1")
let corPad1 = pad1.getBoundingClientRect();
pad2 = document.getElementById("pad2")
let corPad2 = pad2.getBoundingClientRect();
pad3 = document.getElementById("pad3")
let corPad3 = pad3.getBoundingClientRect();
pad4 = document.getElementById("pad4")
let corPad4 = pad4.getBoundingClientRect();
descanso1 = document.getElementById("descanzo1")
let corDescanso1 = descanso1.getBoundingClientRect();
descanso2 = document.getElementById("descanzo2")
let corDescanso2 = descanso2.getBoundingClientRect();


webgazer.setGazeListener(function (data, elapsedTime) {
  if (data == null) {
    return;
  }
  if (calibracionCompleta == true) {
    //1
    if (data.x > corPad1.left && data.x < corPad1.right
      && data.y > corPad1.top && data.y < corPad1.bottom
      && fuera1 == true) {
      playVista(1);
    }
    if (data.x > corDescanso1.left && data.x < corDescanso1.right
      && data.y > corDescanso1.top && data.y < corDescanso2.bottom
    ) {
      fuera1 = true;
    }

    //2
    if (data.x > corPad2.left && data.x < corPad2.right
      && data.y > corPad2.top && data.y < corPad2.bottom
      && fuera2 == true) {
      playVista(2);
    }
    if (data.x > corDescanso1.left && data.x < corDescanso1.right
      && data.y > corDescanso1.top && data.y < corDescanso2.bottom
    ) {
      fuera2 = true;
    }

    //3
    if (data.x > corPad3.left && data.x < corPad3.right
      && data.y > corPad3.top && data.y < corPad3.bottom
      && fuera3 == true) {
      playVista(3);
    }
    if (data.x > corDescanso1.left && data.x < corDescanso1.right
      && data.y > corDescanso1.top && data.y < corDescanso2.bottom
    ) {
      fuera3 = true;
    }

    //4
    if (data.x > corPad4.left && data.x < corPad4.right
      && data.y > corPad4.top && data.y < corPad4.bottom
      && fuera4 == true) {
      playVista(4);
    }
    if (data.x > corDescanso1.left && data.x < corDescanso1.right
      && data.y > corDescanso1.top && data.y < corDescanso2.bottom
    ) {
      fuera4 = true;
    }
  }
}).begin();


function playVista(pad) {
  switch (instrumentoActivo) {
    case 1:
      switch (pad) {
        case 1:
          fuera1 = false
          bloquear()
          drums.play("kick")
          break;
        case 2:
          fuera2 = false;
          bloquear()
          drums.play("snare")
          break;
        case 3:
          fuera3 = false;
          bloquear()
          drums.play("clap")
          break;
        case 4:
          fuera4 = false;
          bloquear()
          drums.play("china")
          break;
        default:
      }
      break;
    case 2:
      switch (pad) {
        case 1:
          fuera1 = false
          bloquear()
          pianoH.play("pianoC")
          break;
        case 2:
          fuera2 = false;
          bloquear()
          pianoH.play("pianoF")
          break;
        case 3:
          fuera3 = false;
          bloquear()
          pianoH.play("pianoAm")
          break;
        case 4:
          fuera4 = false;
          bloquear()
          pianoH.play("pianoG")
          break;
        default:
      }
      break;
    case 3:
      switch (pad) {
        case 1:
          fuera1 = false
          bloquear()
          guitarraH.play("guitarraC")
          break;
        case 2:
          fuera2 = false;
          bloquear()
          guitarraH.play("guitarraF")
          break;
        case 3:
          fuera3 = false;
          bloquear()
          guitarraH.play("guitarraAm")
          break;
        case 4:
          fuera4 = false;
          bloquear()
          guitarraH.play("guitarraG")
          break;
        default:
      }
      break;
    case 4:
      switch (pad) {
        case 1:
          fuera1 = false
          bloquear()
          bajoH.play("bajoC")
          break;
        case 2:
          fuera2 = false;
          bloquear()
          bajoH.play("bajoF")
          break;
        case 3:
          fuera3 = false;
          bloquear()
          bajoH.play("bajoAm")
          break;
        case 4:
          fuera4 = false;
          bloquear()
          bajoH.play("bajoG")
          break;
        default:
      }
      break;
    default:
  }
}
////////////////////////////////////////////WEBGAZER///////////////////////////////////////////////////////






///////////////////////////////////////CALIBRAR//////////////////////////////////////////////
var complete = 0;
var contador = 0;
function cambiar(id) {
  if (contador == 0) {
    document.getElementById(id).classList.add("circulo2")
    contador = 1;
  }
  else if (contador == 1) {
    document.getElementById(id).classList.add("circulo3")
    contador++;
  }
  else if (contador == 2) {
    document.getElementById(id).classList.add("circulo4")
    contador++;
  }
  else if (contador == 3) {
    document.getElementById(id).classList.add("circulo5")
    contador++;
  }
  else if (contador == 4) {
    document.getElementById(id).classList.add("circulo6")
    complete++
    contador = 0;
  }

  if (complete == 5) {
    alertify.alert('Calibración', 'Calibración completada');
    calibrar.style.visibility = 'hidden';
    complete = 0;
    calibracionCompleta = true;
    controls.style.visibility = 'visible';

    document.getElementById("c1").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    // document.getElementById("c2").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    document.getElementById("c3").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    document.getElementById("c4").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    // document.getElementById("c5").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    document.getElementById("c6").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    document.getElementById("c7").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    // document.getElementById("c8").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
    // document.getElementById("c9").classList.remove("circulo2", "circulo3", "circulo4", "circulo5", "circulo6")
  }
}
///////////////////////////////////////CALIBRAR//////////////////////////////////////////////



//Coordenadas de la pantalla
// $(document).ready(function () {
//   $(document).mousemove(function (event) {
//     $('#cordinates').text(event.pageX + ", " + event.pageY);
//   });
// });
