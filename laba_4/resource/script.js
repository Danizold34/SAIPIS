function nextSerial() {
    let button = document.getElementById('next');
    if (button.style.fontSize == '14px') {
        button.style.fontSize = '24px';
    }
    else {
        button.style.fontSize = '14px';
    }
    if (button.style.backgroundColor == 'rgb(215, 208, 180)') {
        button.style.backgroundColor = 'rgb(209, 0, 0)';
        button.style.color = 'white';
    }
    else {
        button.style.backgroundColor = 'rgb(215, 208, 180)';
        button.style.color = 'black';
    }
    let seriesList = document.getElementsByName("Series")
    for (let i = 0; i < seriesList.length; i++) {
        if (seriesList[i].checked) {
            if (i == seriesList.length - 1) {
                seriesList[0].click();
            }
            else {
                seriesList[i + 1].click();
            }
            break;
        }
    }
}

function add() {
    let inputRadio = document.createElement('input');
    inputRadio.className = "radioButton";
    inputRadio.type = "radio";
    inputRadio.name = "Series";
    inputRadio.value = "1";
    let text;
    var newSerial = document.getElementById("select");
    if (newSerial.value == "") {
        alert('Выберите новый сериал');
        return false;
    }
    else {
        text = newSerial.value;
    }
    document.getElementById("insert").insertAdjacentHTML('beforeend', '<input type="radio" class="radioButton" name="Series" value="Ведьмак" checked>' + text);
}

function newWindow() {
    let val;
    let seriesList = document.getElementsByName("Series")
    for (let i = 0; i < seriesList.length; i++) {
        if (seriesList[i].checked) {
            val = seriesList[i].value;
            break;
        }
    }

    var newWin = window.open('../html/index.html#', 'test', 'width=1200,height=900');
    newWin.onload = function () {
        var inn = newWin.document.getElementById("insert");
        let img = "<img width='860' height='483' src='../resource/" + val + ".jpg'>";
        inn.innerHTML = img;
    }
}
