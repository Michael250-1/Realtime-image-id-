function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}
function modelLoaded(){
  console.log("model has loaded");
}
function draw(){
  image(video,0,0,300,300)
  classifier.classify(video,gotResult);
}
var previousresult="";

function gotResult(error,results){
  console.log("abc")
  if(error){
    console.error(error);
  }
  else {
if((results[0].confidence>0.5)&&(previousresult!=results[0].label)) {
  console.log(results);
  previousresult=results[0].label;
  var synth=window.SpeechSynthesis;
  speak_data="object detected is " + results[0].label;
  var utterthis=new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
  document.getElementById("resultname").innerHTML=results[0].label;
  document.getElementById("resultaccuracy").innerHTML=results[0].confidence;
}
    
  }
}

