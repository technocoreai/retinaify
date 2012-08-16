var domainReplacers = {
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

var globalReplacers = [
    function() {
        $("img[src*='gravatar.com/avatar/'][data-retinaified!='true']").each(function(_, img) {
            img.src = img.src.replace(/&s=(\d+)/, function(_, size) {
                return "&s=" + (2 * size);
            });
            $.attr(img, "data-retinaified", "true")
        });
    }
];

$(function() {
    var domainReplacer = domainReplacers[document.location.hostname];
    var replace = function() {
        for (var i = 0; i < globalReplacers.length; i++) {
            globalReplacers[i]();
        }
        if (domainReplacer) {
            domainReplacer();
        }
    };
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
});
