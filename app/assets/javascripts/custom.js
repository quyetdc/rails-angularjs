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

var ready = function(){
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });

    $("li").click(function() {
        $("li.active").removeClass("active");
        $(this).addClass("active");
    });
};

$(document).ready(ready);
$(document).on('page:load', ready);