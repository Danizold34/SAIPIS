function newWindow() {
    var newWin = window.open('../html/index.html#', 'test', 'width=1200,height=900');
    newWin.onload = function () {
        var inn = newWin.document.getElementById("content");
        var nav = newWin.document.getElementById("nav");
        nav.innerHTML = "<a id='arr' onclick='window.close()'>Закрыть</a>" + "<a id='arr' onclick='localStorage.clear(); window.close()'>Очистить таблицу</a>";
        if (localStorage.length == 0) {
            inn.innerHTML = "<h2>Ни один пользователь не прошёл опрос</h2>";
        } else {
            var text = "<table class='table' id='table'><tr><th>Город</th><th>Дата празднования дня города</th><th>Праздновал(а) ли в прошлом году</th><th>Оценка прошлого дня города</th><th>ФИО</th><th>Пол</th><th>Возрастная группа</th><th>Почта</th></tr>";
            var formList = new Array(localStorage.length);
            for (let index = 0; index < localStorage.length; index++) {
                formList[index] = JSON.parse(localStorage.getItem('person' + String(index)));
                var date = formList[index]["date"].replace(/-/g, ".");
                text += "<tr><td>" + formList[index]['city'] + "</td>";
                text += "<td>" + date.replace("T", " ") + "</td > ";

                if (formList[index]["check"] === true)
                    text += "<td align='center'>Да</td>";
                else
                    text += "<td align='center'>Нет</td>";
                text += "<td>" + formList[index]['rating'] + "</td>";

                text += "<td>" + formList[index]['fio'] + "</td>";

                if (formList[index]["gender"] === "Мужчина")
                    text += "<td align='center'>М</td>";
                else
                    text += "<td align='center'>Ж</td>";

                text += "<td>" + formList[index]["select"] + "</td>";
                text += "<td align='center'>" + formList[index]["email"] + "</td></tr>";
            }

            text += "</table>";
            text += "<select class='out' id='out'>";
            text += "<option class='selected_opt'>Данные пользователей</option>"

            for (let index = 0; index < localStorage.length; index++) {
                text += "<option>" + formList[index]["fio"] + "</option>";
            }

            text += "</select>";


            inn.innerHTML = text;
        }
    }
}