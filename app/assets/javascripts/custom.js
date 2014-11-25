function adjustStyle(width) {
    width = parseInt(width);
    if (width < 480) {
        document.body.className = "smartphone";
    } else if (width >= 480 && width < 800) {
        document.body.className = "tablet";
    } else {
        document.body.className = "desktop";
    }
}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});