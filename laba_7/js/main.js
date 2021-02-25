var enabled = true
var file;
$(document).ready(function () {
    $('#loadData').click(function () {

        var students = document.getElementsByName('students')
        if (students[0].checked) {
            file = "../xml/stud_1.xml"
        }
        if (students[1].checked) {
            file = "../xml/stud_2.xml"
        }
        if (students[2].checked) {
            file = "../xml/stud_3.xml"
        }

        $.ajax({
            type: "GET",
            url: file,
            dataType: "xml",
            success: function (data) {
                $(data).find('person').each(function () {
                    var name = $(this).find('name').html();
                    var sex = $(this).find('sex').html();
                    var group = $(this).find('group').html();
                    var faculty = $(this).find('faculty').html();
                    document.getElementById('name').value = name;
                    document.getElementById('sex').value = sex;
                    document.getElementById('group').value = group;
                    document.getElementById('faculty').value = faculty;
                });
            },
            error: function () {

            }

        });
    });

    $('#addPic').click(function () {
        $.getScript("../js/extra.js", function () {
        });
    });


    $('#lock').click(function () {
        if (enabled == true) {
            $("#loadData").attr("disabled", true);
            $("#addPic").attr("disabled", true);
            $("#loadData").css('background-color', 'grey');
            $("#addPic").css('background-color', 'grey');
            enabled = false
        }
        else {
            $("#loadData").attr("disabled", false);
            $("#addPic").attr("disabled", false);
            $("#loadData").css('background-color', 'rgb(37, 33, 33)');
            $("#addPic").css('background-color', 'rgb(37, 33, 33)');
            enabled = true
        }
    });

    $(document).ajaxStart(function () {
        console.log(file + ' Работа началась')
    });

    $(document).ajaxSend(() =>
        console.log(file + ' Отправлен запрос')
    );

    $(document).ajaxSuccess(() =>
        console.log(file + ' Отправленный запрос исполнен')
    );

    $(document).ajaxComplete(() => {
        console.log(file + ' Запрос завершён')
    });

    $(document).ajaxStop(() => {
        console.log(file + ' Нет активных запросов')
    });

    $(document).ajaxError(() => {
        $("#form").load("../html/error.html");
        console.log(file + ' Произошла ошибка')
    });

});