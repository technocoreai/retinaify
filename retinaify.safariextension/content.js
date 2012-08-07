var replacers = {
    "friendfeed.com": function() {
        $("img[src*='-medium-']").each(function(_, img) {
            img.src = img.src.replace('-medium-', '-large-');
        });
    },
    "trello.com": function() {
        $("img[src*='30.png']").each(function(_, img) {
            img.src = img.src.replace("30.png", "170.png") ;
        });
    }
};

$(function() {
    var replace = replacers[document.location.hostname];
    if (replace) {
        replace();
        var scheduled = false;
        $(document.body).bind('DOMNodeInserted', function() {
            if (!scheduled) {
                scheduled = true;
                setTimeout(function() {
                    scheduled = false;
                    replace();
                }, 0);
            }
        });
    }
});
