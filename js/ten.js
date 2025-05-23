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
var Interval;
var isProcessing = false; // Флаг для блокировки открытия более двух карт
var images = [
    '1', '2', '3', '4', '5', '6', '7', '8',  '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38',
    '39','40','41','42','43','44','45','46','47','48','49','50'
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
        // Проверяем, что не обрабатываем сейчас карты и открыто менее двух карт
        if (!isProcessing && document.getElementsByClassName('flipped').length < 2) {
            if (this.className != 'flipped' && this.className != 'correct'){
                this.className = 'flipped';
                var result = this.dataset.item;
                resultsArray.push(result);
                clearInterval(Interval);
                Interval = setInterval(startTimer, 10);
            }
        }
        
        if (resultsArray.length == 2) {
            isProcessing = true; // Устанавливаем флаг обработки
            if (resultsArray[0] === resultsArray[1]) {
                check("correct");
                counter++;
                win();
                resultsArray = [];
                setTimeout(function() {
                    isProcessing = false; // Снимаем флаг после обработки
                }, 600);
            } else {
                check("reverse");
                resultsArray = [];
                setTimeout(function() {
                    isProcessing = false; // Снимаем флаг после обработки
                }, 600);
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
    if(counter === 50) {
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
