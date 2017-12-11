var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 00;
var text = document.getElementById('text');
var seconds = 00;
var tens = 00;
var tries = 00;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var buttonPause = document.getElementById('button-pause');

var Interval ;
var images = [
    '1', '2', '3', '4', '5', '6', '7', '8',  '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
];

var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge to arrays

// Shufffel function
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);

for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  card.onclick = function () {
    if (this.className != 'flipped' && this.className != 'correct'){
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }


    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }

    }

  }

};


window.onload = function () {
    span = document.getElementById('triesid');
    var tries = 00;
    span.innerHTML = tries;
    document.body.onclick = function (e) {
        e = e || event;
        var target = e.target || e.srcElement;
        if (target.className != 'flipped') return;
        tries++;
        span.innerHTML = Math.floor(tries / 2);
    }
}




var check = function(className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }

  },500);

}


var win = function () {

  if(counter === 18) {
    clearInterval(Interval);
      text.innerHTML = "Счет: " + (5000 - (seconds + tries));
  }

}

function change_color(obj)
{
    obj.value && (document.body.style.backgroundColor = obj.value);
}

buttonPause.onclick = function() {
    clearInterval(Interval);
}


function startTimer () {
  tens++;

  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9){
    appendTens.innerHTML = tens;

  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}












