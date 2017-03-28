var flag = true;
function initDom() {
    var b = window.location.href;
    var a = WebPlayer.getPlayList();
    var d = [];
    var f = "";
    for (var e = 0; e < a.length; e++) {
        d.push(a[e].rid)
    }
    f = d.join(",");
    var c = "http://player.kuwo.cn/webmusic/webmusic2011/getSongByRidsCallback.jsp?ids=" + f + "&callback=getOldList";
    if (f == "") {
        return
    }
    $.getScript(c)
}
function getOldList(c) {
    var a = c.playlist;
    for (var b = 0; b < a.length; b++) {
        addSong(a[b].rid, a[b].name, a[b].art, a[b].album, a[b].pay)
    }
}
var playerProperties = {playerSwfId: "dqPlayerSwf", volBarLength: 90, processBarLength: 945, bufferBarLength: 956};
var lrcxProperties = {
    width: "240",
    height: "245",
    src: "/static/swf/LrcxPro_webplay.swf?1.swf",
    wmode: "transparent",
    FlashVars: "startheight=122&ztverticalGap=5&selectColor=#226699&bgColor=#F8FCFF&lrcxZzIdmethod=KW_DqPlayer._loadLrcxId"
};
var callbacks = {startPlay: "getArtAlbum", initOk: "initDom", diantaiEnd: "dtcallback", stopPlay: ""};
WebPlayer.init(playerProperties, "lrcConId", lrcxProperties, callbacks);
function wb_playSong(c, b, e, a, d) {
    clickFlag = false;
    addSong(c, b, e, a, d);
    playSong(c)
}
function addSong(e, d, g, c, f) {
    var a = WebPlayer.addMusic(e);
    var b = isRepeat(e);
    if (a) {
        if (b) {
            model.playList.push({name: d, album: c, art: g, rid: e, pay: f, dur: "1"})
        }
    }
}
var setFlag = false;
function setPlayerPop() {
    if (!setFlag) {
        setFlag = true;
        if (!$(".open").hasClass("lock") && $("#playList").css("visibility") == "hidden") {
            $("#player").animate({bottom: "0px"}, 100);
            $("#addTips").show()
        } else {
            $("#addTips").show()
        }
        setTimeout(function () {
            $("#addTips").hide();
            setFlag = false
        }, 3000)
    } else {
        return
    }
}
function isRepeat(b) {
    for (var a = 0; a < model.playList.length; a++) {
        if (model.playList[a].rid == b) {
            return false
        }
    }
    return true
}
function playSong(b) {
    var a = WebPlayer.playMusic(b, true)
}
var delFlag = false;
function delPlSong(b) {
    if (!delFlag) {
        delFlag = true;
        var a = WebPlayer.delMusic(b);
        if (a) {
            delUl("pl" + b)
        }
    } else {
        return
    }
}
function delUl(b) {
    var a = "#" + b + "";
    $(a).remove();
    if ($(".musicList li").length == 0) {
        model.playList = [];
        WebPlayer.playList = [];
        WebPlayer.playListMap = []
    }
    delFlag = false
}
function delAllSong() {
    var a = WebPlayer.delAllMusic();
    if (a) {
        model.playList = [];
        WebPlayer.playList = [];
        WebPlayer.playListMap = []
    }
}
function playAllPlayList(a) {
    var b = "http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=" + a + "&pn=0&rn=100&encode=utf-8&keyset=pl2012&identity=kuwo&callback=plList";
    $.getScript(b)
}
function plList(d) {
    model.playList = [];
    WebPlayer.playList = [];
    WebPlayer.playListMap = [];
    var a = d.musiclist;
    var c = "MUSIC_" + a[0].id;
    for (var b = 0; b < a.length; b++) {
        addSong("MUSIC_" + a[b].id, a[b].name, a[b].artist, a[b].album, a[b].pay)
    }
    playSong(c);
    setPlayerPop()
}
$(".playSong").live("click", function () {
    setPlayerPop()
});
$(".playSongArtist").live("click", function () {
    var dataMusic = eval("(" + $(this).parent().attr("data-music") + ")");
    if ($(this).parents("li").hasClass("offLine")) {
        offLinePop("因为版权原因，该资源暂时无法提供相关服务。");
        return
    }
    addSong(dataMusic.id, dataMusic.name, dataMusic.artist, dataMusic.album, dataMusic.pay);
    playSong(dataMusic.id);
    setPlayerPop()
});
$(".offLine .name a").live("click", function () {
    offLinePop("因为版权原因，该资源暂时无法提供相关服务。");
    return false
});
$(".playAll").live("click", function () {
    model.playList = [];
    WebPlayer.playList = [];
    WebPlayer.playListMap = [];
    if ($(".listMusic .tools").length == 0) {
        return
    }
    var count = 0;
    var firstMusic = eval("(" + $(".listMusic .onLine").eq(0).find(".tools").attr("data-music") + ")") || eval("(" + $(".listMusic .tools").eq(0).attr("data-music") + ")");
    for (var i = 0; i < $(".listMusic .tools").length; i++) {
        if ($(".listMusic li").eq(i).hasClass("offLine")) {
            count++;
            continue
        }
        var playInfo = eval("(" + $(".listMusic .tools").eq(i).attr("data-music") + ")");
        addSong(playInfo.id, playInfo.name, playInfo.artist, playInfo.album, playInfo.pay)
    }
    if (count > 0) {
        offLinePop("因为版权原因，部分资源暂时无法提供相关服务。")
    }
    if ($(".listMusic .tools").length - count == 0) {
        return
    }
    playSong(firstMusic.id);
    setPlayerPop()
});
$(".playAllSong").live("click", function () {
    model.playList = [];
    WebPlayer.playList = [];
    WebPlayer.playListMap = [];
    var str = $(this).parent().find("li").eq(0).attr("data-music");
    var firstMusic = eval("(" + str + ")").id;
    for (var i = 0; i < $(this).parent().find("li").length; i++) {
        var playInfo = eval("(" + $(this).parent().find("li").eq(i).attr("data-music") + ")");
        addSong(playInfo.id, playInfo.name, playInfo.artist, playInfo.album, playInfo.pay)
    }
    playSong(firstMusic);
    setPlayerPop()
});
var flagPlAll = false;
$(".playAllRadio").live("click", function () {
    if (!flagPlAll) {
        flagPlAll = true;
        model.playList = [];
        WebPlayer.playList = [];
        WebPlayer.playListMap = [];
        if ($(".listMusic .tools").length == 0) {
            return
        }
        $(".loadingRadio").find("span").html("歌曲添加中...");
        $(".loadingRadio").animate({opacity: "1"}, function () {
            var count = 0;
            var firstMusic = eval("(" + $(".listMusic .onLine").eq(0).find(".tools").attr("data-music") + ")") || eval("(" + $(".listMusic .tools").eq(0).attr("data-music") + ")");
            for (var i = 0; i < $(".listMusic .tools").length; i++) {
                if ($(".listMusic li").eq(i).hasClass("offLine")) {
                    count++;
                    continue
                }
                var playInfo = eval("(" + $(".listMusic .tools").eq(i).attr("data-music") + ")");
                addSong(playInfo.id, playInfo.name, playInfo.artist, playInfo.album, playInfo.pay)
            }
            if (count > 0) {
                offLinePop("因为版权原因，部分资源暂时无法提供相关服务。")
            }
            if ($(".listMusic .tools").length - count == 0) {
                return
            }
            playSong(firstMusic.id);
            $(".loadingRadio").css("opacity", "0");
            flagPlAll = false;
            setPlayerPop()
        })
    }
});
$(".add").live("click", function () {
    if ($(this).parents("li").hasClass("offLine")) {
        offLinePop("因为版权原因，该资源暂时无法提供相关服务。");
        return
    }
    var addInfo = eval("(" + $(this).parent().attr("data-music") + ")");
    addSong(addInfo.id, addInfo.name, addInfo.artist, addInfo.album, addInfo.pay);
    setPlayerPop()
});
$(".addAll").live("click", function () {
    if ($(".listMusic .tools").length == 0) {
        return
    }
    var count = 0;
    for (var i = 0; i < $(".listMusic .tools").length; i++) {
        if ($(".listMusic li").eq(i).hasClass("offLine")) {
            count++;
            continue
        }
        var addInfo = eval("(" + $(".listMusic .tools").eq(i).attr("data-music") + ")");
        addSong(addInfo.id, addInfo.name, addInfo.artist, addInfo.album, addInfo.pay)
    }
    if (count > 0) {
        offLinePop("因为版权原因，部分资源暂时无法提供相关服务。")
    }
    if ($(".listMusic .tools").length - count == 0) {
        return
    }
    setPlayerPop()
});
var flagAddAll = false;
$(".addAllRadio").live("click", function () {
    if ($(".listMusic .tools").length == 0) {
        return
    }
    if (!flagAddAll) {
        flagAddAll = true;
        var date = new Date().getTime();
        $(".loadingRadio").find("span").html("歌曲添加中...");
        $(".loadingRadio").animate({opacity: "1"}, function () {
            var count = 0;
            for (var i = 0; i < $(".listMusic .tools").length; i++) {
                if ($(".listMusic li").eq(i).hasClass("offLine")) {
                    count++;
                    continue
                }
                var addInfo = eval("(" + $(".listMusic .tools").eq(i).attr("data-music") + ")");
                addSong(addInfo.id, addInfo.name, addInfo.artist, addInfo.album, addInfo.pay)
            }
            if (count > 0) {
                offLinePop("因为版权原因，部分资源暂时无法提供相关服务。")
            }
            if ($(".listMusic .tools").length - count == 0) {
                return
            }
            $(".loadingRadio").css("opacity", "0");
            flagAddAll = false;
            setPlayerPop()
        })
    }
});
function getValue(b, d) {
    b = b.toString();
    if (b.indexOf("#") >= 0) {
        b = b.substring(0, b.length - 1)
    }
    var g = "";
    var f = b.indexOf(d + "=");
    if (f >= 0) {
        var c = b.substring(f + d.length + 1);
        var i = c.indexOf("=");
        var a = 0;
        if (i >= 0) {
            c = c.substring(0, i);
            a = c.lastIndexOf("&")
        } else {
            a = c.length
        }
        if (a >= 0) {
            try {
                g = decodeURIComponent(c.substring(0, a))
            } catch (h) {
                g = c.substring(0, a)
            }
        } else {
            try {
                g = decodeURIComponent(c)
            } catch (h) {
                g = c
            }
        }
    }
    return g
}
function getArtAlbum() {
    picLog("music_play_www2016");
    var c = "http://www.kuwo.cn/webmusic/sj/dtflagdate";
    var a = WebPlayer.curMusic.rid;
    var e = "flag=6&rid=" + a;
    $("#artist_Image").attr("src", "http://image.kuwo.cn/website/pc/default/50-50.jpg");
    $.ajax({
        url: c, type: "get", data: e, success: function (k) {
            var g = k.split("#");
            var i = g[0].split(",");
            var j = i[1];
            if (j == "") {
                j = "http://image.kuwo.cn/website/pc/default/50-50.jpg"
            }
            $("#artist_Image").attr("src", j);
            $(".musicList li").removeClass("current");
            $("#pl" + a).addClass("current");
            $("#pl" + a).find("span").addClass("currentPlay");
            var h = $(".musicList").height();
            setTimeout(function () {
                var n = $("#mCSB_1_scrollbar_vertical").height();
                var o = $("#mCSB_1_dragger_vertical").height();
                var m = n - o;
                var l = $("#mCSB_1_container").height();
                var r = l - h;
                var q = $("#pl" + a).index() == 0 ? $("#pl" + a).index() * 30 : $("#pl" + a).index() * 30;
                var p = m / r;
                if (l > h) {
                    if (q > m / p) {
                        q = m / p
                    }
                    $("#mCSB_1_dragger_vertical").css({top: q * p + "px"});
                    $("#mCSB_1_container").animate({top: -q + "px"}, 500)
                }
            }, 500)
        }
    });
    var f = $("#pl" + a).attr("data-pay") || 0;
    if (isFee(f, "play")) {
        setTimeout(function () {
            KW_DqPlayer.pause()
        }, 3000);
        $(".loadBlock").css("display", "block");
        $(".loadBlock p").html("该歌曲是付费歌曲，必须使用酷我客户端播放");
        var b = $(window).width();
        var d = $("body").height();
        $(".loadShadow").show();
        $("#wp_playBtn").click(function () {
            getArtAlbum()
        })
    }
}
function isFee(b, c) {
    var a = false;
    if (typeof(b) != "undefined") {
        try {
            b = parseInt(b, 10);
            b = b.toString(16);
            if (c == "play") {
                b = b.substr(b.length - 1, 1)
            } else {
                if (c == "down") {
                    b = b.substr(b.length - 2, 1)
                }
            }
            b = (b.toLocaleLowerCase() == "f") || b & 1;
            if (b != 0) {
                a = true
            }
        } catch (d) {
        }
    }
    return a
}
function offLinePop(c) {
    $(".loadBlock").show();
    $(".loadBlock p").html(c);
    var a = $(window).width();
    var b = $("body").height();
    $(".loadShadow").css({display: "block", width: a, height: b})
}
var tjurl = window.location.href;
var model = avalon.define({$id: "player", songArr: [], albumArr: [], artistArr: [], playList: []});
$(".search input").on("keyup focus", function () {
    var a = $(this).val();
    if (a) {
        var b = "http://search.kuwo.cn/r.s?SONGNAME=" + a + "&ft=music&rformat=json&encoding=utf8&rn=8&callback=song&vipver=MUSIC_8.0.3.1";
        $.getScript(b);
        $(".searchInfo").show()
    } else {
        $(".searchInfo").hide()
    }
});
function song(c) {
    model.songArr = [];
    var b = c;
    for (var a = 0; a < b.abslist.length; a++) {
        b.abslist[a].id = b.abslist[a].MUSICRID.replace("MUSIC_", "");
        model.songArr.push(b.abslist[a])
    }
    if (model.songArr.length == 0) {
        $(".searchInfo").hide()
    }
}
function album(c) {
    model.albumArr = [];
    var b = c;
    for (var a = 0; a < b.albumlist.length; a++) {
        model.albumArr.push(b.albumlist[a])
    }
    if (model.albumArr.length == 0) {
        $(".searchAlbum").hide()
    } else {
        $(".searchAlbum").show()
    }
}
function artist(c) {
    model.artistArr = [];
    var b = c;
    for (var a = 0; a < b.abslist.length; a++) {
        model.artistArr.push(b.abslist[a])
    }
    if (model.artistArr.length == 0) {
        $(".searchArtist").hide()
    } else {
        $(".searchArtist").show()
    }
}
function jsonError() {
}
$(document).on("click", function () {
    $(".searchInfo").hide()
});
$(".search input").on("click", function () {
    return false
});
$("#soundBox").on("click", function () {
    return false
});
$("#wp_mute").mouseenter(function () {
    $(this).addClass("hovered")
});
$("#wp_mute").mouseleave(function () {
    $(this).removeClass("hovered")
});
$(".tips span").on("click", function () {
    $(this).parent().hide()
});
$(".app").live("mouseenter", function () {
    var b = $(this).offset().left - 70;
    var a = $(this).offset().top + 16;
    $("#appBox").removeClass("appBox");
    $("#appBox").css({left: b + "px", top: a + "px"});
    $("#appBox").show()
});
$(".app").live("mouseleave", function () {
    $("#appBox").hide()
});
$("#tips").live("mouseenter", function () {
    var b = $(this).offset().left - 14;
    var a = $(this).offset().top - 190;
    $("#appBox").addClass("appBox");
    $("#appBox").css({left: b + "px", top: a + "px"});
    $("#appBox").show()
});
$("#tips").live("mouseleave", function () {
    $("#appBox").hide()
});
$(".listNum span").live("click", function () {
    $("#playList").css("visibility", "hidden");
    $(this).stop(true, false).delay(3000).animate({bottom: "-57px"}, 500);
    listIsShow = false
});
var listIsShow = false;
$(".menu").live("click", function () {
    if (!listIsShow) {
        $("#playList").css("visibility", "visible");
        listIsShow = true
    } else {
        $("#playList").css("visibility", "hidden");
        listIsShow = false
    }
    return false
});
$("#mode").on("click", function () {
    var a = "";
    if ($(this).attr("class") == "loop") {
        $(this).removeClass();
        $(this).addClass("single");
        $(this).attr("title", "单曲循环");
        a = "single"
    } else {
        if ($(this).attr("class") == "single") {
            $(this).removeClass();
            $(this).addClass("order");
            $(this).attr("title", "顺序播放");
            a = "order"
        } else {
            if ($(this).attr("class") == "order") {
                $(this).removeClass();
                $(this).addClass("random");
                $(this).attr("title", "随机播放");
                a = "random"
            } else {
                if ($(this).attr("class") == "random") {
                    $(this).removeClass();
                    $(this).addClass("loop");
                    $(this).attr("title", "顺序循环");
                    a = "loop"
                }
            }
        }
    }
    WebPlayer.setPlayType(a);
    return false
});
function sendtime(a) {
    window.setTimeout(function () {
        var b = new Image();
        b.src = a
    }, 300)
}
function downMusicBox() {
    window.setTimeout(function () {
        if (tjurl.indexOf("from=baidu") > -1) {
            window.location.href = "http://down.kuwo.cn/mbox/KwMusicSetup_bd.exe"
        } else {
            if (tjurl.indexOf("from=dq360") > -1) {
                window.location.href = "http://down.kuwo.cn/mbox/KwMusicSetup_360.exe"
            } else {
                window.location.href = "http://down.kuwo.cn/mbox/KwMusicSetup_bd.exe"
            }
        }
    }, 100);
    if (tjurl.indexOf("from=baidu") > -1) {
        sendtime("http://webstat.kuwo.cn/logtjsj/commsj/commjstj/bdhz/down_from_baidu_player_pv.jpg")
    } else {
        if (tjurl.indexOf("from=dq360") > -1) {
            sendtime("http://webstat.kuwo.cn/logtjsj/commsj/commjstj/bdhz/down_from_dq360_player_pv.jpg")
        }
    }
}
if (tjurl.indexOf("from=baidu") > -1) {
    sendtime("http://webstat.kuwo.cn/logtjsj/commsj/commjstj/bdhz/from_baidu_player_pv.jpg")
} else {
    if (tjurl.indexOf("from=dq360") > -1) {
        sendtime("http://webstat.kuwo.cn/logtjsj/commsj/commjstj/bdhz/from_dq360_player_pv.jpg")
    }
}
function setCookie(b, f, c) {
    var e = new Date();
    e.setTime(e.getTime() + (c * 24 * 60 * 60 * 1000));
    var a = "expires=" + e.toUTCString();
    document.cookie = b + "=" + f + "; " + a
}
function getCookie(d) {
    var b = d + "=";
    var a = document.cookie.split(";");
    for (var e = 0; e < a.length; e++) {
        var f = a[e];
        while (f.charAt(0) == " ") {
            f = f.substring(1)
        }
        if (f.indexOf(b) != -1) {
            return f.substring(b.length, f.length)
        }
    }
    return ""
}
if (getCookie("flag")) {
    $(".tips").hide();
    $(".showTips").show()
}
setCookie("flag", true, 36500);
$(".pop em").click(function () {
    $("#pop").hide();
    $(".pop").hide()
});
$(".pop a").click(function () {
    $("#pop").hide();
    $(".pop").hide()
});
$("#player .musicList")[0].onselectstart = new Function("return false");
$("#controllBtn")[0].onselectstart = new Function("return false");
$(".musicList li").live("dblclick", function () {
    var boSAtring = $(this).find(".name a").attr("href").substring(11);
    eval(boSAtring)
});
function downSure() {
    $("#pop").show();
    $(".pop").show();
    $(".pop p").html("下载歌曲需要使用酷我音乐客户端操作！");
    $(".pop .wait").html("开始下载")
}
var shareFlag = false;
$("#controllBtn .share").live("mouseenter", function () {
    $(this).find(".shareBox").show()
});
$("#controllBtn .share").live("mouseleave", function () {
    $(this).find(".shareBox").hide()
});
$("#musicList ul li .share").live("mouseenter", function () {
    $(this).find(".shareBox").show()
});
$("#musicList ul li .share").live("mouseleave", function () {
    $(this).find(".shareBox").hide()
});
$("#controllBtn .quickShare").live("click", function () {
    var a = $(this);
    var f = a.parents("#player").find(".current");
    var c = f.find(".name a").html();
    var e = a.attr("data-cmd");
    var d = "听到这首#" + c + "#，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：";
    var g = (f.attr("id") || "").substring(8);
    if (!g) {
        return
    }
    var b = "http://www.kuwo.cn/yinyue/" + g + "?catalog=yueku2016&qq-pf-to=pcqq.c2c";
    addShareFn(e, encodeURIComponent(d), b, "")
});
$("#musicList .quickShare").live("click", function () {
    var a = $(this);
    var f = a.parents("li");
    var c = f.find(".name a").html();
    var e = a.attr("data-cmd");
    var d = "听到这首#" + c + "#，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：";
    var g = (f.attr("id") || "").substring(8);
    if (!g) {
        return
    }
    var b = "http://www.kuwo.cn/yinyue/" + g + "?catalog=yueku2016&qq-pf-to=pcqq.c2c";
    addShareFn(e, encodeURIComponent(d), b, "")
});
$(".listMusic .quickShare").live("click", function () {
    var shareToObj = $(this);
    var dataMusic = eval("(" + shareToObj.parents(".tools").attr("data-music") + ")");
    var name = dataMusic.name;
    var shareTo = shareToObj.attr("data-cmd");
    var shareTxt = "听到这首#" + name + "#，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：";
    var id = dataMusic.id.substring(6);
    if (!id) {
        return
    }
    var songLink = "http://www.kuwo.cn/yinyue/" + id + "?catalog=yueku2016&qq-pf-to=pcqq.c2c";
    addShareFn(shareTo, encodeURIComponent(shareTxt), songLink, "")
});
function addShareFn(d, b, c, a) {
    if (d == "renren") {
        url = "http://widget.renren.com/dialog/share?resourceUrl=" + encodeURIComponent(c) + "&title=" + b + "&description=&pic=" + a
    }
    if (d == "qzone") {
        url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url= " + encodeURIComponent(c) + "&title=" + b + "&pics=" + a
    }
    if (d == "tqq") {
        url = "http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&url= " + encodeURIComponent(c) + "&appkey=801109997&assname=kuwo-music&title=" + b + "&pic=" + a
    }
    if (d == "tsina") {
        url = "http://service.weibo.com/share/share.php?c=spr_web_kuwo_changba&appkey=2972927130&url=" + encodeURIComponent(c) + "&title=" + b + "&pic=" + a
    }
    if (d == "douban") {
        url = "http://www.douban.com/share/service?href=" + encodeURIComponent(c) + "&name=酷我音乐&text=" + b + "&pic=" + a
    }
    window.open(url)
}
$("#controllBtn .ewm").live("mouseenter", function () {
    $(".ewmBox").show()
});
$("#controllBtn .ewm").live("mouseleave", function () {
    $(".ewmBox").hide()
});
$(window).resize(function () {
    ewmBoxPos()
});
ewmBoxPos();
function ewmBoxPos() {
    var b = $(window).width();
    var a = '<div class="ewmBox"><div class="ewmCon"><img width="144" src="http://image.kuwo.cn/website/pc/ewm.png" /></div></div>';
    if (b < 1347) {
        $(".ewmBox").remove();
        $("#playerBox").append(a);
        $(".ewmBox").addClass("smallScreen")
    } else {
        $(".ewmBox").remove();
        $(".ewm").append(a)
    }
}
function addEvent(c, a, b) {
    if (c.addEventListener) {
        c.addEventListener(a, b, false)
    } else {
        c.attachEvent("on" + a, b)
    }
}
function addWheel(c, b) {
    function a(e) {
        var d = true;
        d = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
        b && b(d);
        e.preventDefault && e.preventDefault();
        return false
    }

    if (window.navigator.userAgent.indexOf("Firefox") != -1) {
        addEvent(c, "DOMMouseScroll", function (e) {
            var d = e || event;
            a(d)
        })
    } else {
        c.onmousewheel = function (e) {
            var d = e || event;
            a(d)
        }
    }
}
var oVolBtn = $("#wp_volBtn").get(0);
var oVolBar = $("#wp_volBar").get(0);
var oBar_box = $("#soundPro").get(0);
var oSoundBox = $("#soundBox").get(0);
oBar_box.onclick = function (d) {
    var b = d || event;
    var a = $("#soundPro").offset().top - $(document).scrollTop();
    var c = b.clientY - a;
    if (c > 90) {
        c = 90
    }
    oVolBtn.style.top = c + "px";
    oVolBar.style.height = oBar_box.offsetHeight - oVolBtn.offsetTop - 10 + "px";
    WebPlayer.setVolumn(oVolBar.offsetHeight / WebPlayer.volBarLength)
};
function upDown(a) {
    if (a < 0) {
        a = 0
    } else {
        if (a > oBar_box.offsetHeight - oVolBtn.offsetHeight) {
            a = oBar_box.offsetHeight - oVolBtn.offsetHeight
        }
    }
    oVolBtn.style.top = a + "px";
    oVolBar.style.height = oBar_box.offsetHeight - oVolBtn.offsetTop - 10 + "px";
    WebPlayer.setVolumn(oVolBar.offsetHeight / WebPlayer.volBarLength)
}
addWheel(oSoundBox, function (a) {
    var b = oVolBtn.offsetTop;
    if (a) {
        b += 2
    } else {
        b -= 2
    }
    upDown(b)
});