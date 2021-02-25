$(document).ready(function () {
    $('#submitBtn').click(function () {
        console.log($("#name").val(), $("#position").val(), $("#salary").val(), $("#idn").val())
        $.ajax({
            url: "/",
            method: "POST",
            data: {
                name: $("#name").val(),
                position: $("#position").val(),
                salary: $("#salary").val(),
                idn: $("#idn").val()
            },
            success: () => {
                console.log("Данные успешно отправлены");
            },
            error: () => {
                console.log("Произошла ошибка");
            },
        })
        // location.reload();
    })
    $('#removeBtn').click(function () {
        $.ajax({
            url: "/remove",
            method: "POST",
            data: {
                positionOld: $("#positionRemove").val(),
                positionNew: $("#positionAdd").val(),
            },
            success: () => {
                console.log("Данные успешно удалены");
            },
            error: () => {
                console.log($("#positionRemove").val())
                console.log("Произошла ошибка");
            },
        })
    })
    $('#filtrationBtn').click(function () {
        $.ajax({
            url: "/filtration",
            method: "POST",
            data: {
                salary: $("#salaryFiltration").val(),
            },
            success: (data) => {
                data.forEach(element => console.log(element.name))
            },
            error: () => {
                console.log("Произошла ошибка");
            },
        })

    })
})