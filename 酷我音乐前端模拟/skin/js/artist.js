var host = $("#SYS_MAIN_HOST").val();
setLeftNavPosition(0);
var index = "0";
var letter = "";
$(".topSelect a").live("click", function () {
    pn = 0;
    $(".topSelect a").removeClass("active");
    $(this).addClass("active");
    letter = $(this).html();
    if (letter == "热门") {
        letter = ""
    } else {
        if (letter == "#") {
            letter = "%23"
        }
    }
    index = $("#artistContent").attr("data-catId") || 0;
    $("#artistContent").attr("data-letter", letter);
    getArtistList(index, letter)
});
$(".artistnav a").live("click", function () {
    var a = $(this).index();
    var d = $(this).parent().attr("data-id");
    var c = $(this).parents(".artistRight").find(".newlist");
    var e = $(this).parents(".artistRight").find(".albumlist");
    var b = $(this).parents(".artistRight").find(".hotlist");
    $(this).parents(".artistRight").find(".artistnav a").removeClass("active");
    $(this).addClass("active");
    $(this).parents(".artistRight").find("ul").hide();
    if (a == 0) {
        b.show()
    } else {
        if (a == 1) {
            c.show();
            if (c.html() == "") {
                getMusicList(d, c)
            }
        } else {
            if (a == 2) {
                e.show();
                if (e.html() == "") {
                    getAlbumList(d, e)
                }
            }
        }
    }
});
setPage();
$(".page a").live("click", function () {
    $(window).scrollTop(0);
    var c = $(this).attr("class");
    if (c.indexOf("no") > -1) {
        return
    }
    var a = $(this).html().toLowerCase();
    if (a == '<img src="http://image.kuwo.cn/website/pc/page/prev.png">' || a == '<img src="' + host + 'http://image.kuwo.cn/website/pc/page/prev.png">') {
        pn = parseInt($(".page .current").html()) - 2
    } else {
        if (a == '<img src="http://image.kuwo.cn/website/pc/page/next.png">' || a == '<img src="' + host + 'http://image.kuwo.cn/website/pc/page/next.png">') {
            pn = parseInt($(".page .current").html())
        } else {
            pn = parseInt($(this).html()) - 1
        }
    }
    var b = host + "/artist/indexAjax?category=" + index + "&prefix=" + $("#artistContent").attr("data-letter") + "&pn=" + pn;
    $("#artistList").html("");
    $("#loading").show();
    $.ajax({
        url: b, dataType: "text", type: "get", success: function (d) {
            $("#artistList").html(d);
            $("#loading").hide();
            setPage()
        }, error: function () {
        }
    });
    return false
});
function getArtistList(b, c) {
    var a = host + "/artist/indexAjax?category=" + b + "&prefix=" + c;
    $("#artistList").html("");
    $("#loading").show();
    $.ajax({
        url: a, dataType: "text", type: "get", success: function (d) {
            if (d.length == 6) {
                d = '<li style="width:100%;text-align:center;font-size:16px;margin-top:100px">暂无相关歌手</li>'
            }
            $("#artistList").html(d);
            $("#loading").hide();
            setPage()
        }, error: function () {
        }
    })
}
function getMusicList(artistId, obj) {
    var url = host + "/artist/newSongs?artistId=" + artistId;
    $.ajax({
        url: url, dataType: "text", type: "get", success: function (jsondata) {
            var jsondata = eval("(" + jsondata + ")");
            var list = jsondata.data;
            var listStr = "";
            for (var i = 0; i < list.length; i++) {
                listStr += '<li><a href="http://www.kuwo.cn/yinyue/' + list[i].id + '?catalog=yueku2016" target="_blank">' + (i + 1) + "." + (list[i].songName) + "</a></li>"
            }
            obj.html(listStr)
        }, error: function () {
        }
    })
}
function getAlbumList(artistId, obj) {
    var url = host + "/artist/newAlbums?artistId=" + artistId;
    $.ajax({
        url: url, dataType: "text", type: "get", success: function (jsondata) {
            var jsondata = eval("(" + jsondata + ")");
            var list = jsondata.data;
            var listStr = "";
            for (var i = 0; i < list.length; i++) {
                listStr += '<li><a href="http://www.kuwo.cn/album/' + list[i].albumDbId + '?catalog=yueku2016" target="_blank">' + (i + 1) + "." + (list[i].name) + "</a></li>"
            }
            obj.html(listStr)
        }, error: function () {
        }
    })
}
function setLeftNavPosition(b) {
    var c = $(".leftNav a[data-index=" + b + "]");
    $(".leftNav a").removeClass("active");
    c.addClass("active");
    var a = c.offset().top - 50;
    if (b == 0) {
        $(".activeline").css("top", "18px")
    } else {
        if (c.css("fontSize") == "16px") {
            $(".activeline").css("top", a - 20 + "px")
        } else {
            $(".activeline").css("top", a - 22 + "px")
        }
    }
    $(".activeline").show()
};