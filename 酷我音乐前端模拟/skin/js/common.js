$(function () {
    (function (a) {
        a(window).load(function () {
            a.mCustomScrollbar.defaults.theme = "light-3";
            a(".scrollbar").mCustomScrollbar()
        })
    })(jQuery);
    $("#top .top .tools .more").hover(function () {
        $(this).find("ul").show()
    }, function () {
        $(this).find("ul").hide()
    });
    $("#player").css("bottom", "0px");
    $("#player").delay(3000).animate({bottom: "-57px"}, "fast");
    $(".open").click(function () {
        if ($(this).hasClass("lock")) {
            $(this).removeClass("lock");
            hoverBind()
        } else {
            $(this).addClass("lock");
            $("#player").unbind("mouseenter").unbind("mouseleave")
        }
        return false
    });
    hoverBind();
    $(".click_log").live("click", function (c) {
        var b = $(this).attr("data-click");
        var d = $(this).attr("data-url");
        var a = "";
        if ($(this).hasClass("isMac")) {
            a = "http://down.kuwo.cn/mac/kwplayer_mac.dmg";
            c.stopPropagation()
        } else {
            a = $(this).attr("data-down")
        }
        if (d) {
            window.setTimeout(function () {
                var e = new Image();
                e.src = d
            }, 300)
        }
        if (b) {
            window.setTimeout(function () {
                var e = new Image();
                e.src = "http://webstat.kuwo.cn/logtjsj/commsj/commjstj/www2016/" + b + ".jpg"
            }, 300)
        }
        if (a) {
            window.location = a
        }
    });
    $(".searchBtn").click(function () {
        var a = $(".search input").val();
        if (a == "") {
            return
        }
        window.open("http://sou.kuwo.cn/ws/NSearch?type=all&catalog=yueku2016&key=" + a)
    });
    $(document).live("keyup", function (c) {
        var c = c || event;
        var b = $(".search input").val();
        if (b == "") {
            return
        }
        if (c && c.keyCode == 13) {
            window.open("http://sou.kuwo.cn/ws/NSearch?type=all&catalog=yueku20177&key=" + b)
        }
    });
    $("#loadAll").live("click", function () {
        $(".loadBlock").show();
        var a = $(window).width();
        var b = $("body").height();
        $(".loadBlock p").html("下载歌曲需要使用酷我音乐客户端操作");
        $(".loadShadow").show()
    });
    $(".loadBlockClose, .loadBtn").live("click", function () {
        $(".loadBlock").hide();
        $(".loadShadow").hide()
    })
});
function imgOnError(b, a) {
    if (a == "album") {
        src = "http://image.kuwo.cn/website/pc/default/albumDefault.jpg"
    } else {
        if (a == "mv") {
            src = "http://image.kuwo.cn/website/pc/default/mvDefault.jpg"
        } else {
            if (a == "mvItem") {
                src = "http://image.kuwo.cn/website/pc/default/mvItem.jpg"
            } else {
                if (a == "artist") {
                    src = "http://image.kuwo.cn/website/pc/default/artistDefault.jpg"
                } else {
                    if (a == "activity") {
                        src = "http://image.kuwo.cn/website/pc/default/activityDefault.jpg"
                    } else {
                        if (a == "singer") {
                            src = "http://image.kuwo.cn/website/pc/default/singerDefault.jpg"
                        } else {
                            if (a == "singerBig") {
                                src = "http://image.kuwo.cn/website/pc/default/singerBigDefault.jpg"
                            } else {
                                if (a == "50") {
                                    src = "http://image.kuwo.cn/website/pc/default/50-50.jpg"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    b.src = src;
    b.onerror = null
}
lazyLoad();
$(window).scroll(function () {
    lazyLoad()
});
function lazyLoad() {
    $(".lazyLoad").each(function () {
        var b = $(this);
        var a = b.attr("data-src");
        if (b.offset().top < $(window).height() + $(window).scrollTop()) {
            b.attr("src", a)
        }
    })
}
function hoverBind() {
    $("#player").bind({
        mouseenter: function () {
            $(this).stop(true, false).animate({bottom: "0px"}, 100);
            return false
        }, mouseleave: function () {
            if ($("#playList").css("visibility") == "hidden") {
                $(this).stop(true, false).delay(3000).animate({bottom: "-57px"}, 500)
            }
            return false
        }
    })
}
function down(a) {
    if (a == "index") {
        window.location = "http://down.kuwo.cn/mbox/kwmusic2016_web_2.exe"
    } else {
        if (a == "bang") {
            window.location = "http://down.kuwo.cn/mbox/kwmusic2016_web_2.exe"
        } else {
            if (a == "artistindex") {
                window.location = "http://down.kuwo.cn/mbox/kwmusic2016_web_3.exe"
            } else {
                if (a == "artistcontent") {
                    window.location = "http://down.kuwo.cn/mbox/kwmusic2016_web_3.exe"
                } else {
                    if (a == "downpage") {
                        window.location = "http://down.kuwo.cn/mbox/kwmusic2016_web_4.exe"
                    } else {
                        if (a == "playlist") {
                            window.location = "http://down.kuwo.cn/mbox/kuwo_ys2.exe"
                        } else {
                            if (a == "radio") {
                                window.location = "http://down.kuwo.cn/mbox/kuwo_ys2.exe"
                            } else {
                                if (a == "") {
                                    window.location = ""
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
var pn = 0;
function setPage() {
    var c = $(".page").attr("data-page");
    var e = parseInt(c);
    var b = createPage(e, pn + 1);
    $(".page").html(b);
    var d = $(".page").prev().width();
    var a = $(".page").width();
    if (a == 0) {
        a = 254
    }
    $(".page").css("margin-left", (d - a) / 2 + "px")
}
function createPage(d, a) {
    var b = "";
    if (d > 1) {
        if (a != 1) {
            b += '<a hidefocus href="javascript:;" class="prev"><img src="http://image.kuwo.cn/website/pc/page/prev.png" /></a>'
        } else {
            b += '<a hidefocus href="javascript:;" class="noprev"><img src="http://image.kuwo.cn/website/pc/page/prev.png" /></a>'
        }
        b += '<a hidefocus  href="javascript:;" ' + (a == 1 ? 'class="current"' : 'class=""') + ">1</a>";
        if (a > 4) {
            b += '<span class="point">...</span>'
        }
        for (var c = (a >= 4 ? (a - 2) : 2); c <= (a + 2 >= d ? (d - 1) : (a + 2)); c++) {
            if (a == c) {
                b += '<a hidefocus href="javascript:;" class="current">' + c + "</a>"
            } else {
                b += '<a hidefocus href="javascript:;" class="">' + c + "</a>"
            }
        }
        if (a + 3 < d) {
            b += '<span class="point">...</span>'
        }
        if (d != 1) {
            b += '<a hidefocus href="javascript:;" ' + (a == d ? 'class="current"' : 'class=""') + ">" + d + "</a>"
        }
        if (a != d) {
            b += '<a hidefocus href="javascript:;" class="next"><img src="http://image.kuwo.cn/website/pc/page/next.png" /></a>'
        } else {
            b += '<a hidefocus href="javascript:;" class="nonext"><img src="http://image.kuwo.cn/website/pc/page/next.png" /></a>'
        }
    }
    return b
}
function picLog(a) {
    window.setTimeout(function () {
        var b = new Image();
        b.src = "http://webstat.kuwo.cn/logtjsj/commsj/commjstj/www2016/" + a + ".jpg"
    }, 300)
};