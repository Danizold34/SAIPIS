$(document).ready(function () {
    var count = 0
    $("#button1").click(function () {
        var $first = $("tr").children("td").children("div.column").children("span#id1:contains('LONDON'), span#id6:contains('LONDON')");
        $first.attr('id', 'idNEW')
        $first.parent().children('img').animate({
            opacity: 0,
        }, 700)
    });
    $("#button2").click(function () {
        var $second = $("tr").children("td").children("div").children("span:not(#id1, #id6), span:not(:contains('LONDON'))");
        $second.parent().children('img').css('width', '50%')
        $second.parent().append("<p style='color: red; font-style: italic;'>ШАХМАТЫ</p>")
    });
});