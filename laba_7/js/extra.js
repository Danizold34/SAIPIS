var file;
$(document).ready(function () {
    var students = document.getElementsByName('students')
    if (students[0].checked) {
        file = "stud_1"
    }
    if (students[1].checked) {
        file = "stud_2"
    }
    if (students[2].checked) {
        file = "stud_3"
    }

    $("#out").load("../html/" + file + ".html ");
    $("#text").load("../resource/text.txt");
});
