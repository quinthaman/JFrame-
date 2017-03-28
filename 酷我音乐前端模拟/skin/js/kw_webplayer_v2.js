var WebPlayer = {
    isIE: !!(window.attachEvent && !window.opera),
    showLog: false,
    volBarLength: 90,
    processBarLength: 945,
    bufferBarLength: 956,
    inited: false,
    isShow: false,
    bufferedTime: 0,
    totalTime: 0,
    curPos: 0,
    volumn: 1,
    oldVol: 1,
    mute: false,
    statInterval: null,
    iMouseDown: false,
    dragObject: null,
    curTarget: null,
    mouseOffset: null,
    dragFinalPos: -1,
    dragFinalTO: null,
    processClicked: false,
    processClickTO: null,
    playerSwfId: "",
    lrcxSwfDivId: "",
    lrcxSwfId: "wpLrcxSwf",
    lrcxSwfProperties: null,
    lrcxSwfHtml: "",
    playType: "loop",
    listType: "playList",
    favList: [],
    favListMap: [],
    playList: null,
    playListMap: null,
    diantaiId: 0,
    diantaiMusicList: [],
    diantaiMusicMap: [],
    searchHistory: [],
    searchHistoryMax: 10,
    bufferTimeoutCount: 0,
    bufferTimeoutCountMax: 200,
    playStartTime: 0,
    curMusic: null,
    curIdx: 0,
    lastPos: 0,
    callbacks: {},
    playerProperties: {},
    dqLogSended: false,
    playerFailCount: 0,
    dqStartSended: false,
    initTime: new Date().getTime(),
    blockTime: 0,
    blockCount: 0,
    isblocking: false,
    blockStart: 0,
    endType: 0,
    delay: -1,
    servicelevelsended: false,
    curMusicId: "",
    openLog: function () {
        if (!document.getElementById("kw_dq_logdiv")) {
            var a = document.createElement("div");
            a.style.cssText = "position:absolute;left:0px;top:0px;width:400px;color:red;z-index:999;background-color:#fff";
            a.id = "kw_dq_logdiv";
            document.body.appendChild(a)
        }
        WebPlayer.showLog = true;
        KW_DqPlayer.openLog()
    },
    log: function (a) {
        if (WebPlayer.showLog && document.getElementById("kw_dq_logdiv")) {
            document.getElementById("kw_dq_logdiv").innerHTML += a + "<br>"
        }
    },
    init: function (h, i, a, g) {
        var b = {};
        if (h != null && h.playerSwfId != null) {
            b = h
        } else {
            b.playerSwfId = h
        }
        WebPlayer.playerProperties = b;
        var j = b.volBarLength || 60;
        var d = $("#prograssBar").width() - 10 || 945;
        var c = $("#prograssBar").width() || 956;
        WebPlayer.volBarLength = j;
        WebPlayer.processBarLength = d;
        WebPlayer.bufferBarLength = c;
        if (b.playerSwfId == null || b.playerSwfId == "") {
            return
        }
        WebPlayer.playerSwfId = b.playerSwfId;
        WebPlayer.lrcxSwfDivId = i;
        WebPlayer.lrcxSwfProperties = a;
        WebPlayer.callbacks = g || {};
        KW_DqPlayer.init(b.playerSwfId, WebPlayer.playerInitCallback, "", (i == "" || i == null ? "" : WebPlayer.lrcxSwfId));
        try {
            if (WebPlayer.callbacks.playInitLog != null) {
                WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitwebPlay=" + (new Date().getTime() - WebPlayer.initTime))
            }
        } catch (f) {
        }
    },
    playerInitCallback: function (a) {
        if (a == "1") {
            WebPlayer.initPlayer(null);
            WebPlayer.loadPlayList();
            WebPlayer.loadSearchHistory();
            if (WebPlayer.callbacks.initOk != null) {
                setTimeout(WebPlayer.callbacks.initOk + "()", 50)
            }
        } else {
            if (WebPlayer.playerFailCount > 20) {
                WebPlayer.playerFailCount = 0;
                return
            } else {
                WebPlayer.playerFailCount++;
                WebPlayer.sendLog("error_log", WebPlayer.playFailedtj + "?info=" + a);
                WebPlayer.bufferTimeoutCount = 0;
                WebPlayer._playEnd();
                WebPlayer.endType = 2
            }
        }
    },
    initPlayer: function (a) {
        if (KW_DqPlayer == null || !KW_DqPlayer.playerInited) {
            return
        }
        WebPlayer.addEventListener(document.getElementById("wp_mute"), "click", function () {
            WebPlayer.setMute()
        });
        WebPlayer.addEventListener(document.getElementById("wp_playBtn"), "click", function () {
            WebPlayer.changePlayStat()
        });
        WebPlayer.addEventListener(document.getElementById("wp_playPreBtn"), "click", function () {
            WebPlayer.playPre()
        });
        WebPlayer.addEventListener(document.getElementById("wp_playNextBtn"), "click", function () {
            WebPlayer.playNext()
        });
        WebPlayer.addEventListener(document.getElementById("wp_bufBar"), "click", function (b) {
            WebPlayer.processClick(b)
        });
        WebPlayer.addEventListener(document.getElementById("about_sound"), "click", function (b) {
            WebPlayer.volProcessClick(b)
        });
        WebPlayer.startListener();
        WebPlayer.makeDraggable(document.getElementById("wp_processBtn"));
        WebPlayer.makeDraggable(document.getElementById("wp_volBtn"));
        document.onmousemove = WebPlayer.mouseMove;
        document.onmousedown = WebPlayer.mouseDown;
        document.onmouseup = WebPlayer.mouseUp;
        if (a != null && a != "") {
            WebPlayer.lrcxSwfDivId = a
        }
        WebPlayer.inited = true
    },
    startListener: function () {
        if (WebPlayer.statInterval != null) {
            WebPlayer.stopListener()
        }
        WebPlayer.statInterval = setInterval(WebPlayer.updateStat, 100)
    },
    stopListener: function () {
        if (WebPlayer.statInterval != null) {
            clearInterval(WebPlayer.statInterval);
            WebPlayer.statInterval = null
        }
    },
    updateStat: function () {
        if (WebPlayer.curMusic != null && (WebPlayer.curMusic.name == null || WebPlayer.curMusic.name != KW_DqPlayer.currentSong)) {
            WebPlayer.curMusic.name = KW_DqPlayer.currentSong;
            WebPlayer.curMusic.artist = KW_DqPlayer.currentArtist;
            WebPlayer.curMusic.album = KW_DqPlayer.currentAlbum;
            if (WebPlayer.curIdx != 0) {
                if (WebPlayer.listType == "playList" && WebPlayer.playList[WebPlayer.curIdx - 1] != null) {
                    WebPlayer.playList[WebPlayer.curIdx - 1] = WebPlayer.curMusic
                } else {
                    if (WebPlayer.listType == "favList" && WebPlayer.favList[WebPlayer.curIdx - 1] != null) {
                        WebPlayer.favList[WebPlayer.curIdx - 1] = WebPlayer.curMusic
                    } else {
                        if (WebPlayer.listType == "diantai" && WebPlayer.diantaiMusicList[WebPlayer.curIdx - 1] != null) {
                            WebPlayer.diantaiMusicList[WebPlayer.curIdx - 1] = WebPlayer.curMusic
                        }
                    }
                }
            }
        }
        WebPlayer.curPos = KW_DqPlayer.currentPos;
        var b = KW_DqPlayer.bufferedBytes;
        WebPlayer.totalTime = KW_DqPlayer.totalTime;
        $("#wp_playTime").html(WebPlayer.formatTime(WebPlayer.curPos));
        $("#wp_totalTime").html(WebPlayer.formatTime(WebPlayer.totalTime));
        $(".wp_playTime_singles").html(WebPlayer.formatTime(WebPlayer.totalTime - WebPlayer.curPos));
        try {
            if (WebPlayer.dqLogSended == false && WebPlayer.curPos > 1 && WebPlayer.curPos < 4) {
                WebPlayer.dqLogSended = true;
                if (WebPlayer.listType != "diantai" && WebPlayer.callbacks.playLog != null) {
                    WebPlayer.sendLog("pl_play_log", WebPlayer.callbacks.playLog + "?rid=" + WebPlayer.curMusic.rid + "&pos=" + WebPlayer.curPos)
                } else {
                    if (WebPlayer.listType == "diantai" && WebPlayer.callbacks.diantaiLog != null) {
                        WebPlayer.sendLog("diantai_play_log", WebPlayer.callbacks.diantaiLog + "?rid=" + WebPlayer.curMusic.rid + "&pos=" + WebPlayer.curPos)
                    }
                }
            }
        } catch (f) {
        }
        if (KW_DqPlayer.playStat == "play") {
            document.getElementById("wp_playBtn").className = "zan";
            if (WebPlayer.curPos + "" == "0") {
                WebPlayer.setPlayText("buffering")
            } else {
                if (WebPlayer.delay == -1) {
                    var j = new Date().getTime() - WebPlayer.playStartTime;
                    if (j < 0 || j < 100) {
                        j = 0
                    }
                }
                WebPlayer.setPlayText("play")
            }
            WebPlayer.playerFailCount = 0;
            if (WebPlayer.lastPos == WebPlayer.curPos) {
                WebPlayer.bufferTimeoutCount++;
                if (!WebPlayer.isblocking && WebPlayer.curPos + "" != "0") {
                    WebPlayer.isblocking = true;
                    WebPlayer.blockCount++;
                    WebPlayer.blockStart = new Date().getTime()
                }
            } else {
                WebPlayer.bufferTimeoutCount = 0;
                WebPlayer.isblocking = false;
                if (WebPlayer.blockStart != 0) {
                    var d = new Date().getTime() - WebPlayer.blockStart;
                    if (d > 1) {
                        WebPlayer.blockTime += d
                    }
                    WebPlayer.blockStart = 0
                }
            }
            if (WebPlayer.bufferTimeoutCount >= WebPlayer.bufferTimeoutCountMax) {
                var h = WebPlayer.curPos;
                WebPlayer.endType = 2;
                WebPlayer._playEnd();
                var a = WebPlayer.playFailedtj + "?info=bufferStop@" + WebPlayer.curMusic.rid + "&stopat=" + h;
                WebPlayer.sendLog("error_log", a);
                WebPlayer.bufferTimeoutCount = 0;
                return
            }
            WebPlayer.lastPos = WebPlayer.curPos
        } else {
            if (KW_DqPlayer.playStat == "pause") {
                document.getElementById("wp_playBtn").className = "play";
                WebPlayer.setPlayText("pause")
            } else {
                if (KW_DqPlayer.playStat == "stop") {
                    if (WebPlayer.listType == "playList" && WebPlayer.playType == "order" && WebPlayer.playList.length != 0) {
                        WebPlayer.setPlayText("lastsong")
                    } else {
                        if (WebPlayer.listType == "favList" && WebPlayer.playType == "order" && WebPlayer.favList.length != 0) {
                            WebPlayer.setPlayText("lastsong")
                        } else {
                            WebPlayer.setPlayText("stop");
                            $("#wp_totalTime").html("00:00");
                            $("#wp_playBtn").attr("class", "play")
                        }
                    }
                }
            }
        }
        if (KW_DqPlayer.buffering) {
            var g = KW_DqPlayer.bufferedBytes;
            var c = KW_DqPlayer.totalBytes;
            WebPlayer.bufferedTime = parseInt(WebPlayer.totalTime * g / c);
            var i = (c == 0 ? 0 : parseInt(WebPlayer.bufferBarLength * g / c));
            document.getElementById("wp_bufBar").style.width = i + "px";
            if (WebPlayer.bufferedTime - WebPlayer.curPos < 1) {
                WebPlayer.setPlayText("buffering")
            }
        } else {
            WebPlayer.bufferedTime = WebPlayer.totalTime;
            document.getElementById("wp_bufBar").style.width = $("#prograssBar").width() + "px"
        }
        if (WebPlayer.dragObject == null && WebPlayer.dragFinalPos == -1 && !WebPlayer.processClicked) {
            var i = (WebPlayer.totalTime == 0 ? 0 : parseInt(WebPlayer.processBarLength * WebPlayer.curPos / WebPlayer.totalTime));
            if (i > WebPlayer.processBarLength - 10) {
                i = WebPlayer.processBarLength - 10
            }
            document.getElementById("wp_processBar").style.width = i + "px";
            document.getElementById("wp_processBtn").style.left = i + "px"
        }
    },
    getFavList: function () {
        return WebPlayer.favList
    },
    setFavList: function (c) {
        c = c || "";
        var e = c.split(",");
        WebPlayer.favList = [];
        WebPlayer.favListMap = [];
        for (var b = 0, a = e.length; b < a; b++) {
            var d = e[b];
            if (d.indexOf("MUSIC_") == 0 && !isNaN(d.replace(/MUSIC_/, ""))) {
                var f = new Object;
                f.rid = d;
                WebPlayer.favList.push(f);
                WebPlayer.favListMap[d] = WebPlayer.favList.length
            }
        }
        return true
    },
    addToFavList: function (d) {
        if (d == null || d.length == 0) {
            return
        }
        for (var b = 0, a = d.length; b < a; b++) {
            var c = d[b];
            if (WebPlayer.favListMap[c.rid] == null) {
                WebPlayer.log("favlist add " + c.rid);
                WebPlayer.favList.push(c);
                WebPlayer.favListMap[c.rid] = WebPlayer.favList.length
            }
        }
    },
    delFav: function (d) {
        if (d == null || d == "" || WebPlayer.playList == null || WebPlayer.favList.length == 0) {
            return false
        }
        var j = d.split(",");
        if (j.length == 0) {
            return false
        }
        var b = false;
        var a = [];
        for (var f = 0, h = WebPlayer.favList.length; f < h; f++) {
            a[f] = WebPlayer.favList[f].rid
        }
        var k = WebPlayer.currMusic;
        if (typeof(k) != "undefined") {
            if (WebPlayer.curMusic.rid == j[0]) {
                b = true
            }
        }
        var g = a.join(",") + ",";
        var e = [];
        for (var f = 0, h = j.length; f < h; f++) {
            var m = WebPlayer.favListMap[j[f]];
            if (m != null && typeof m == "number") {
                e.push(m);
                g = g.replace(j[f] + ",", "");
                if (WebPlayer.listType == "favList" && WebPlayer.curIdx == m) {
                    b = true
                }
            }
        }
        var l = null;
        if (g == "") {
            if (WebPlayer.listType == "favList") {
                WebPlayer.stopPlay()
            }
            WebPlayer.setFavList(g);
            return true
        } else {
            if (g != "" && g.charAt(g.length - 1) == ",") {
                g = g.substring(0, g.length - 1)
            }
            e = e.sort();
            var c = 0;
            for (m = e[0], h = WebPlayer.favList.length, count = 0; m <= h; m++, count++) {
                if (m == e[count]) {
                } else {
                    c = m;
                    break
                }
                if (count == e.length - 1) {
                    c = m + 1;
                    break
                }
            }
            if (c > WebPlayer.favList.length) {
                c = 1
            }
            l = WebPlayer.favList[c - 1];
            WebPlayer.setFavList(g);
            if (b && l != null) {
                WebPlayer.playMusicObj(l)
            }
        }
        return true
    },
    addFav: function (c) {
        if (c == null || c == "") {
            return false
        }
        var e = c.split(",");
        if (e.length == 0) {
            return false
        }
        var g = [];
        for (var b = 0, a = e.length; b < a; b++) {
            var d = e[b];
            if (d.indexOf("MUSIC_") == 0 && !isNaN(d.replace(/MUSIC_/, ""))) {
                var f = new Object;
                f.rid = d;
                g.push(f)
            }
        }
        if (g.length != 0) {
            WebPlayer.addToFavList(g)
        }
        return true
    },
    delAllFav: function () {
        if (WebPlayer.listType == "favList") {
        }
        WebPlayer.favList = [];
        WebPlayer.favListMap = [];
        return true
    },
    getPlayList: function () {
        return WebPlayer.playList
    },
    loadPlayList: function () {
        var e = WebPlayer.getUserPlayList();
        WebPlayer.playList = [];
        WebPlayer.playListMap = [];
        if (e != null && e != "undefined") {
            var c = e.split(",");
            for (var b = 0, a = c.length; b < a; b++) {
                var d = c[b];
                if (d.indexOf("MUSIC_") == 0 && !isNaN(d.replace(/MUSIC_/, ""))) {
                    var f = new Object;
                    f.rid = d;
                    WebPlayer.playList.push(f);
                    WebPlayer.playListMap[d] = WebPlayer.playList.length
                }
            }
        }
    },
    addToPlayList: function (e) {
        if (e == null || e.length == 0) {
            return
        }
        if (WebPlayer.playList == null) {
            WebPlayer.playList = [];
            WebPlayer.playListMap = []
        }
        var c = false;
        for (var b = 0, a = e.length; b < a; b++) {
            var d = e[b];
            if (WebPlayer.playListMap[d.rid] == null) {
                WebPlayer.log("playlist add " + d.rid);
                WebPlayer.playList.push(d);
                WebPlayer.playListMap[d.rid] = WebPlayer.playList.length;
                c = true
            }
        }
        if (c) {
            WebPlayer.saveCurPlayList()
        }
    },
    saveCurPlayList: function () {
        if (WebPlayer.playList == null) {
            WebPlayer.playList = [];
            WebPlayer.playListMap = [];
            return
        }
        var e = WebPlayer.playList;
        var a = e.length;
        var d = [];
        for (var b = 0; b < a; b++) {
            d[b] = e[b].rid
        }
        var c = "";
        if (d.length != 0) {
            c = d.join(",")
        }
        KW_DqPlayer.saveUserPlayList(c)
    },
    delMusic: function (f) {
        if (f == null || f == "" || WebPlayer.playList == null || WebPlayer.playList.length == 0) {
            return false
        }
        var k = f.split(",");
        if (k.length == 0) {
            return false
        }
        var a = false;
        var b = false;
        var c = [];
        for (var h = 0, j = WebPlayer.playList.length; h < j; h++) {
            c[h] = WebPlayer.playList[h].rid
        }
        var l = WebPlayer.currMusic;
        if (typeof(l) != "undefined") {
            if (WebPlayer.curMusic.rid == k[0]) {
                b = true
            }
        }
        var e = c.join(",") + ",";
        var g = [];
        for (var h = 0, j = k.length; h < j; h++) {
            var n = WebPlayer.playListMap[k[h]];
            if (n != null && typeof n == "number") {
                g.push(n);
                e = e.replace(k[h] + ",", "");
                a = true;
                if (WebPlayer.listType == "playList" && WebPlayer.curIdx == n) {
                    b = true
                }
            }
        }
        var m = null;
        if (e == "") {
            if (WebPlayer.listType == "playList") {
                WebPlayer.stopPlay()
            }
            if (a) {
                KW_DqPlayer.saveUserPlayList(e);
                WebPlayer.loadPlayList()
            }
            return true
        } else {
            if (e != "" && e.charAt(e.length - 1) == ",") {
                e = e.substring(0, e.length - 1)
            }
            g = g.sort();
            var d = 0;
            for (n = g[0], j = WebPlayer.playList.length, count = 0; n <= j; n++, count++) {
                if (n == g[count]) {
                } else {
                    d = n;
                    break
                }
                if (count == g.length - 1) {
                    d = n + 1;
                    break
                }
            }
            if (d > WebPlayer.playList.length) {
                d = 1
            }
            m = WebPlayer.playList[d - 1];
            if (a) {
                KW_DqPlayer.saveUserPlayList(e);
                WebPlayer.loadPlayList()
            }
            if (b && m != null) {
                WebPlayer.playMusicObj(m)
            }
            return true
        }
    },
    addMusic: function (c) {
        if (c == null || c == "") {
            return false
        }
        var e = c.split(",");
        if (e.length == 0) {
            return false
        }
        var g = [];
        for (var b = 0, a = e.length; b < a; b++) {
            var d = e[b];
            if (d.indexOf("MUSIC_") == 0 && !isNaN(d.replace(/MUSIC_/, ""))) {
                var f = new Object;
                f.rid = d;
                g.push(f)
            }
        }
        if (g.length != 0) {
            WebPlayer.addToPlayList(g)
        }
        return true
    },
    delAllMusic: function () {
        if (WebPlayer.listType == "playList") {
            WebPlayer.stopPlay()
        }
        KW_DqPlayer.saveUserPlayList("");
        WebPlayer.loadPlayList();
        return true
    },
    setPlayType: function (a) {
        if ("loop|single|order|random".indexOf(a) >= 0) {
            WebPlayer.playType = a;
            WebPlayer.log("change play type=" + a)
        }
    },
    playMusicByIdx: function (a) {
        if (WebPlayer.listType == "playList") {
            if (WebPlayer.playList.length >= a) {
                var b = WebPlayer.playList[a - 1];
                WebPlayer.playMusicObj(b)
            }
        } else {
            if (WebPlayer.listType == "favList") {
                if (WebPlayer.favList.length >= a) {
                    var b = WebPlayer.favList[a - 1];
                    WebPlayer.playMusicObj(b)
                } else {
                    if (WebPlayer.playList.length >= a) {
                        var b = WebPlayer.playList[a - 1];
                        WebPlayer.playMusicObj(b)
                    }
                }
            } else {
                if (WebPlayer.listType == "diantai") {
                    if (WebPlayer.diantaiMusicList.length >= a) {
                        var b = WebPlayer.diantaiMusicList[a - 1];
                        WebPlayer.playMusicObj(b)
                    }
                }
            }
        }
    },
    playMusic: function (c, a) {
        WebPlayer.listType = "playList";
        if (a) {
            a = true
        } else {
            a = false
        }
        var f = c.split(",");
        var h = null;
        var g = [];
        for (var d = 0, e = f.length; d < e; d++) {
            var j = f[d];
            if (j.length > 6 && j.indexOf("MUSIC_") > -1 && !isNaN(j.replace(/MUSIC_/, ""))) {
                var b = new Object();
                b.rid = j;
                g.push(b);
                if (h == null) {
                    h = b
                }
            }
        }
        if (g.length != 0 && a == true && isRepeat(c)) {
            WebPlayer.addToPlayList(g)
        }
        if (h != null) {
            WebPlayer.playMusicObj(h)
        }
        return true
    },
    playFav: function (c, a) {
        WebPlayer.listType = "favList";
        if (a) {
            a = true
        } else {
            a = false
        }
        var f = c.split(",");
        var h = null;
        var g = [];
        for (var d = 0, e = f.length; d < e; d++) {
            var j = f[d];
            if (j.length > 6 && j.indexOf("MUSIC_") == 0 && !isNaN(j.replace(/MUSIC_/, ""))) {
                var b = new Object();
                b.rid = j;
                g.push(b);
                if (h == null) {
                    h = b
                }
            }
        }
        if (g.length != 0 && a == true) {
            WebPlayer.addToFavList(g)
        }
        if (h != null) {
            WebPlayer.playMusicObj(h)
        }
        return true
    },
    playDiantai: function (d, b) {
        WebPlayer.listType = "diantai";
        var f = b.split(",");
        var g = [];
        var k = [];
        var h = null;
        for (var c = 0, e = f.length; c < e; c++) {
            var j = f[c];
            if (j.length > 6 && j.indexOf("MUSIC_") == 0 && !isNaN(j.replace(/MUSIC_/, ""))) {
                var a = new Object();
                a.rid = j;
                g.push(a);
                k[j] = g.length;
                if (h == null) {
                    h = a
                }
            }
        }
        if (g.length != 0) {
            WebPlayer.diantaiMusicList = g;
            WebPlayer.diantaiMusicMap = k;
            WebPlayer.diantaiId = d
        } else {
            return false
        }
        if (h != null) {
            WebPlayer.playMusicObj(h)
        }
        return true
    },
    stopDiantai: function () {
        WebPlayer.diantaiMusicList = [];
        WebPlayer.diantaiMusicMap = [];
        WebPlayer.diantaiId = 0;
        WebPlayer.stopPlay();
        return true
    },
    playMusicObj: function (c) {
        if (c == null) {
            return
        }
        var b = c.rid;
        curMusicId = b;
        if (b.length > 6 && b.indexOf("MUSIC_") == 0 && !isNaN(b.replace(/MUSIC_/, ""))) {
            if (WebPlayer.listType == "playList") {
                var a = (WebPlayer.playListMap == null ? null : WebPlayer.playListMap[b]);
                WebPlayer.log("play pl " + a);
                if (a != null && typeof a == "number") {
                    WebPlayer.curMusic = WebPlayer.playList[a - 1];
                    WebPlayer.curIdx = a
                } else {
                    WebPlayer.curMusic = c;
                    WebPlayer.curIdx = 0
                }
            } else {
                if (WebPlayer.listType == "favList") {
                    var a = WebPlayer.favListMap[b];
                    WebPlayer.log("play favpl " + a);
                    if (a != null && typeof a == "number") {
                        WebPlayer.curMusic = WebPlayer.favList[a - 1];
                        WebPlayer.curIdx = a
                    } else {
                        WebPlayer.curMusic = c;
                        WebPlayer.curIdx = 0
                    }
                } else {
                    if (WebPlayer.listType == "diantai") {
                        var a = WebPlayer.diantaiMusicMap[b];
                        WebPlayer.log("play diantai " + a);
                        if (a != null && typeof a == "number") {
                            WebPlayer.curMusic = WebPlayer.diantaiMusicList[a - 1];
                            WebPlayer.curIdx = a
                        } else {
                            WebPlayer.curMusic = c;
                            WebPlayer.curIdx = 0
                        }
                    }
                }
            }
            KW_DqPlayer.play(b);
            WebPlayer.blockTime = 0;
            WebPlayer.blockCount = 0;
            WebPlayer.isblocking = false;
            WebPlayer.blockStart = 0;
            WebPlayer.endType = 0;
            WebPlayer.delay = -1;
            WebPlayer.servicelevelsended = false;
            WebPlayer.playStartTime = new Date().getTime();
            WebPlayer.dqLogSended = false;
            WebPlayer.setPlayText("buffering");
            WebPlayer.setVolumn(WebPlayer.volumn);
            if (WebPlayer.callbacks.startPlay != null && !WebPlayer.dqStartSended) {
                setTimeout(WebPlayer.callbacks.startPlay + "('" + b + "')", 50)
            }
            return true
        } else {
            return false
        }
    },
    playPlaylist: function () {
        if (WebPlayer.playList.length != 0) {
            WebPlayer.playMusicByIdx(1)
        }
    },
    playNext: function () {
        if (!WebPlayer.curMusic) {
            return
        }
        if (WebPlayer.callbacks.playNext != null) {
            setTimeout(WebPlayer.callbacks.playNext + "()", 50)
        }
        WebPlayer.endType = 1;
        if (WebPlayer.curPos > 10) {
            var b = WebPlayer.totalTime - WebPlayer.curPos;
            if (-2 < b && b < 5) {
                WebPlayer.endType = 0
            }
        }
        WebPlayer.sendSLPlayLog("next");
        if (WebPlayer.playType == "random") {
            WebPlayer.playRandom();
            return
        }
        var d = 1;
        if (WebPlayer.listType == "playList") {
            var e = WebPlayer.playList.length;
            if (e == 0) {
                return
            }
            if (WebPlayer.curIdx != 0) {
                if (WebPlayer.curIdx < e) {
                    d = WebPlayer.curIdx + 1
                } else {
                    d = 1
                }
            }
        } else {
            if (WebPlayer.listType == "favList") {
                var c = WebPlayer.favList.length;
                if (c == 0) {
                    return
                }
                if (WebPlayer.curIdx != 0) {
                    if (WebPlayer.curIdx < c) {
                        d = WebPlayer.curIdx + 1
                    } else {
                        d = 1
                    }
                }
            } else {
                if (WebPlayer.listType == "diantai") {
                    var a = WebPlayer.diantaiMusicList.length;
                    if (a == 0) {
                        return
                    }
                    if (WebPlayer.curIdx != 0) {
                        if (WebPlayer.curIdx < a) {
                            d = WebPlayer.curIdx + 1
                        } else {
                            if (WebPlayer.callbacks.diantaiEnd != null) {
                                setTimeout(WebPlayer.callbacks.diantaiEnd + "('" + WebPlayer.diantaiId + "')", 50)
                            }
                            return
                        }
                    }
                }
            }
        }
        WebPlayer.playMusicByIdx(d)
    },
    playRandom: function () {
        var e = 1;
        if (WebPlayer.listType == "playList") {
            var g = WebPlayer.playList.length;
            if (g == 0) {
                return
            }
            if (g == 1) {
                WebPlayer.playMusicByIdx(e)
            } else {
                if (g == 2) {
                    WebPlayer.playNext()
                } else {
                    var f = Math.random();
                    for (var d = 0; d < 10; d++) {
                        var c = WebPlayer.getRandomNum(g);
                        if (c != WebPlayer.curIdx) {
                            e = c;
                            break
                        }
                    }
                }
            }
        } else {
            if (WebPlayer.listType == "playList") {
                var b = WebPlayer.favList.length;
                if (b == 0) {
                    return
                }
                if (b == 1) {
                    WebPlayer.playMusicByIdx(e)
                } else {
                    if (b == 2) {
                        WebPlayer.playNext()
                    } else {
                        var f = Math.random();
                        for (var d = 0; d < 10; d++) {
                            var c = WebPlayer.getRandomNum(b);
                            if (c != WebPlayer.curIdx) {
                                e = c;
                                break
                            }
                        }
                    }
                }
            } else {
                if (WebPlayer.listType == "diantai") {
                    var a = WebPlayer.diantaiMusicList.length;
                    if (a == 0) {
                        return
                    }
                    if (a == 1) {
                        WebPlayer.playMusicByIdx(e)
                    } else {
                        if (a == 2) {
                            WebPlayer.playNext()
                        } else {
                            var f = Math.random();
                            for (var d = 0; d < 10; d++) {
                                var c = WebPlayer.getRandomNum(a);
                                if (c != WebPlayer.curIdx) {
                                    e = c;
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
        WebPlayer.playMusicByIdx(e)
    },
    playPre: function () {
        if (!WebPlayer.curMusic) {
            return
        }
        if (WebPlayer.callbacks.playPre != null) {
            setTimeout(WebPlayer.callbacks.playPre + "()", 50)
        }
        WebPlayer.endType = 1;
        WebPlayer.sendSLPlayLog("playpre");
        if (WebPlayer.listType == "diantai") {
            return
        }
        if (WebPlayer.playType == "random") {
            WebPlayer.playRandom();
            return
        }
        var b = 1;
        if (WebPlayer.listType == "playList") {
            var c = WebPlayer.playList.length;
            if (c == 0) {
                return
            }
            if (WebPlayer.curIdx != 0) {
                if (WebPlayer.curIdx > 1) {
                    b = WebPlayer.curIdx - 1
                } else {
                    b = c
                }
            }
        } else {
            if (WebPlayer.listType == "favList") {
                var a = WebPlayer.favList.length;
                if (a == 0) {
                    return
                }
                if (WebPlayer.curIdx != 0) {
                    if (WebPlayer.curIdx > 1) {
                        b = WebPlayer.curIdx - 1
                    } else {
                        b = a
                    }
                }
            } else {
                if (WebPlayer.listType == "diantai") {
                    return
                }
            }
        }
        WebPlayer.playMusicByIdx(b)
    },
    stopPlay: function () {
        KW_DqPlayer.stop();
        WebPlayer.curMusic = null;
        WebPlayer.curIdx = 0;
        WebPlayer.lastPos = 0;
        if (WebPlayer.callbacks.stopPlay != null) {
            setTimeout(WebPlayer.callbacks.stopPlay + "()", 50)
        }
        return true
    },
    setPlayText: function (c) {
        var d = WebPlayer.curMusic || new Object();
        var b = $("#wp_text");
        var a = "听音乐  用酷我";
        switch (c) {
            case"buffering":
                if (d.name != null && d.artist != null) {
                    a = d.name + "-" + d.artist + " 正在缓冲"
                } else {
                    a = "听音乐  用酷我"
                }
                break;
            case"play":
                if (d.name != null && d.artist != null) {
                    a = d.name + "-" + d.artist
                } else {
                    a = "听音乐  用酷我"
                }
                break;
            case"pause":
                if (d.name != null && d.artist != null) {
                    a = d.name + "-" + d.artist + " 暂停播放"
                } else {
                    a = "听音乐  用酷我"
                }
                break;
            case"stop":
                a = "听音乐  用酷我";
                if ($("#artist_Image").attr("src") != "http://image.kuwo.cn/website/pc/default/50-50.jpg") {
                    $("#artist_Image").attr("src", "http://image.kuwo.cn/website/pc/default/50-50.jpg")
                }
                $(".times").html("");
                $("#lrcConId object").html("");
                $("#scbtnid").removeClass("fav");
                $("#scbtnid").addClass("play_shou");
                break;
            case"lastsong":
                a = "列表已播放至最后一首歌曲";
                break;
            default:
                a = "听音乐  用酷我";
                break
        }
        b.html(a);
        b.attr("title", a)
    },
    setVolumn: function (c) {
        if (c < 0 && c > 1) {
            return
        }
        var b = KW_DqPlayer.setVolumn(c);
        if (b == -1) {
            return
        }
        WebPlayer.volumn = c;
        if (WebPlayer.mute) {
            document.getElementById("wp_mute").className = "sound_img"
        } else {
            if (c == 0) {
                document.getElementById("wp_mute").className = "sound_img_2";
                WebPlayer.mute = false
            } else {
                if (c > 0 && c < 0.5) {
                    document.getElementById("wp_mute").className = "sound_img_1";
                    WebPlayer.mute = false
                } else {
                    document.getElementById("wp_mute").className = "sound_img";
                    WebPlayer.mute = false
                }
            }
        }
        var a = parseInt(c * WebPlayer.volBarLength);
        document.getElementById("wp_volBar").style.height = a + "px";
        document.getElementById("wp_volBtn").style.top = WebPlayer.volBarLength - a + "px"
    },
    setMute: function () {
        if (!WebPlayer.isShow) {
            document.getElementById("soundBox").style.display = "block";
            WebPlayer.isShow = true
        } else {
            document.getElementById("soundBox").style.display = "none";
            WebPlayer.isShow = false
        }
    },
    changePlayStat: function (a) {
        if (a == null) {
            if (KW_DqPlayer.playStat == "play") {
                KW_DqPlayer.pause();
                document.getElementById("wp_playBtn").className = "play"
            } else {
                if (KW_DqPlayer.playStat == "pause") {
                    KW_DqPlayer.resume();
                    document.getElementById("wp_playBtn").className = "zan"
                } else {
                    if (KW_DqPlayer.playStat == "stop") {
                        WebPlayer.playPlaylist()
                    }
                }
            }
        } else {
            if (a == "play" && KW_DqPlayer.playStat == "pause") {
                KW_DqPlayer.resume();
                document.getElementById("wp_playBtn").className = "play"
            } else {
                if (KW_DqPlayer.playStat == "stop") {
                    return
                }
            }
        }
    },
    makeDraggable: function (a) {
        if (!a) {
            return
        }
        a.onmousedown = function (b) {
            WebPlayer.dragObject = this;
            WebPlayer.mouseOffset = WebPlayer.getMouseOffset(this, b);
            if (WebPlayer.dragObject.id == "wp_processBtn") {
            }
            return false
        }
    },
    getMouseOffset: function (d, c) {
        c = c || window.event;
        var b = WebPlayer.getPosition(d);
        var a = WebPlayer.mouseCoords(c);
        return {x: a.x - b.x, y: a.y - b.y}
    },
    getPosition: function (c) {
        var b = 0;
        var a = 0;
        while (c.offsetParent) {
            b += c.offsetLeft + (c.currentStyle ? (parseInt((isNaN(c.currentStyle.borderLeftWidth) ? "0" : c.currentStyle.borderLeftWidth))) : 0);
            a += c.offsetTop + (c.currentStyle ? (parseInt((isNaN(c.currentStyle.borderTopWidth) ? "0" : c.currentStyle.borderTopWidth))) : 0);
            c = c.offsetParent
        }
        b += c.offsetLeft + (c.currentStyle ? (parseInt((isNaN(c.currentStyle.borderLeftWidth) ? "0" : c.currentStyle.borderLeftWidth))) : 0);
        a += c.offsetTop + (c.currentStyle ? (parseInt((isNaN(c.currentStyle.borderTopWidth) ? "0" : c.currentStyle.borderTopWidth))) : 0);
        return {x: b, y: a}
    },
    mouseCoords: function (a) {
        a = a || window.event;
        if (a.pageX || a.pageY) {
            return {x: a.pageX, y: a.pageY}
        }
        return {
            x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: a.clientY + document.body.scrollTop - document.body.clientTop
        }
    },
    mouseDown: function (b) {
        b = b || window.event;
        var a = b.target || b.srcElement;
        if (a.onmousedown || a.getAttribute("DragObj")) {
            return false
        }
    },
    mouseUp: function (a) {
        if (WebPlayer.dragObject && WebPlayer.dragObject.id == "wp_processBtn") {
            if (WebPlayer.dragFinalPos != -1) {
                KW_DqPlayer.setPosition(WebPlayer.dragFinalPos)
            }
        }
        WebPlayer.dragObject = null;
        WebPlayer.iMouseDown = false;
        if (WebPlayer.dragFinalTO != null) {
            clearTimeout(WebPlayer.dragFinalTO)
        }
        WebPlayer.dragFinalTO = setTimeout(function () {
            WebPlayer.dragFinalPos = -1
        }, 1500)
    },
    mouseMove: function (f) {
        f = f || window.event;
        WebPlayer.processBarLength = $("#prograssBar").width();
        var d = f.target || f.srcElement;
        var i = WebPlayer.mouseCoords(f);
        if (WebPlayer.dragObject) {
            if (WebPlayer.dragObject.id == "wp_processBtn") {
                var c = WebPlayer.getPosition(document.getElementById("wp_processBar"));
                var h = i.x - WebPlayer.mouseOffset.x - c.x + 3;
                if (h < 0) {
                    h = 0
                } else {
                    if (h > WebPlayer.processBarLength) {
                        h = WebPlayer.processBarLength
                    }
                }
                var a = parseInt(WebPlayer.processBarLength * WebPlayer.bufferedTime / WebPlayer.totalTime);
                if (h > a) {
                    h = a
                }
                document.getElementById("wp_processBar").style.width = parseInt(h * 0.98) + "px";
                document.getElementById("wp_processBtn").style.left = parseInt(h * 0.98) + "px";
                WebPlayer.dragFinalPos = h / WebPlayer.processBarLength
            } else {
                if (WebPlayer.dragObject.id == "wp_volBtn") {
                    var b = WebPlayer.getPosition(document.getElementById("soundPro"));
                    var g = parseInt(WebPlayer.getStyle(document.getElementById("soundPro"), "height"));
                    var e = -(i.y - WebPlayer.mouseOffset.y - (b.y + g) + 3);
                    if (e < 0) {
                        e = 0;
                        WebPlayer.mute = false
                    } else {
                        if (e > WebPlayer.volBarLength) {
                            e = WebPlayer.volBarLength;
                            WebPlayer.mute = false
                        } else {
                            e = parseInt(e);
                            WebPlayer.mute = false
                        }
                    }
                    document.getElementById("wp_volBar").style.height = e + "px";
                    document.getElementById("wp_volBtn").style.top = WebPlayer.volBarLength - e + "px";
                    WebPlayer.setVolumn(e / WebPlayer.volBarLength)
                }
            }
        }
        if (WebPlayer.curTarget || WebPlayer.dragObject) {
            return false
        }
    },
    getStyle: function (b, a) {
        if (b.currentStyle) {
            return b.currentStyle[a]
        } else {
            return getComputedStyle(b, false)[a]
        }
    },
    volProcessClick: function (d) {
        d = d || window.event;
        var b = WebPlayer.mouseCoords(d);
        var c = WebPlayer.getPosition(document.getElementById("wp_volBar"));
        var a = -(b.x - c.x);
        if (a < 0) {
            a = 0
        } else {
            if (a > WebPlayer.volBarLength) {
                a = WebPlayer.volBarLength
            }
        }
        WebPlayer.setVolumn(a / WebPlayer.volBarLength)
    },
    processClick: function (e) {
        e = e || window.event;
        var b = WebPlayer.mouseCoords(e);
        var d = WebPlayer.getPosition(document.getElementById("wp_processBar"));
        var a = b.x - d.x;
        if (a < 0) {
            a = 0
        } else {
            if (a > WebPlayer.processBarLength) {
                a = WebPlayer.processBarLength
            }
        }
        var c = parseInt(WebPlayer.processBarLength * WebPlayer.bufferedTime / WebPlayer.totalTime);
        if (a > c) {
            a = c
        }
        WebPlayer.processClicked = true;
        KW_DqPlayer.setPosition(a / WebPlayer.processBarLength);
        document.getElementById("wp_processBar").style.width = parseInt(a * 0.98) + "px";
        document.getElementById("wp_processBtn").style.left = parseInt(a * 0.98) + "px";
        if (WebPlayer.processClickTO != null) {
            clearTimeout(WebPlayer.processClickTO)
        }
        WebPlayer.processClickTO = setTimeout(function () {
            WebPlayer.processClicked = false
        }, 1500)
    },
    writeLrcxSwf: function () {
        if (WebPlayer.lrcxSwfHtml == "") {
            var b = WebPlayer.lrcxSwfProperties || new Object();
            var a = b.width || "442";
            var c = b.height || "362";
            var f = b.src || "LrcxPro_webplay.swf";
            var d = b.wmode || "opaque";
            var e = b.FlashVars || "startheight=181&ztverticalGap=5&selectColor=#226699&bgColor=#F8FCFF&lrcxZzIdmethod=KW_DqPlayer._loadLrcxId";
            var g = [];
            g[0] = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="';
            g[1] = a;
            g[2] = '" height="';
            g[3] = c;
            g[4] = '" id="';
            g[5] = WebPlayer.lrcxSwfId;
            g[6] = '" align="middle">';
            g[7] = '<param name="movie" value="';
            g[8] = f;
            g[9] = '" />';
            g[10] = '<param name="allowFullScreen" value="false" />';
            g[11] = '<param name="wmode" value="';
            g[12] = d;
            g[13] = '" />';
            g[14] = '<param name="aloowScriptAccess" value="always" />';
            g[15] = '<param name="allowScriptAccess" value="sameDomain" />';
            g[16] = '<param name="FlashVars" value="';
            g[17] = e;
            g[18] = '" />';
            g[19] = '<embed src="';
            g[20] = f;
            g[21] = '" name="';
            g[22] = WebPlayer.lrcxSwfId;
            g[23] = '" quality="medium" width="';
            g[24] = a;
            g[25] = '" height="';
            g[26] = c;
            g[27] = '" wmode="';
            g[28] = d;
            g[29] = '" FlashVars="';
            g[30] = e;
            g[31] = '"></embed>';
            g[32] = "</object>";
            WebPlayer.lrcxSwfHtml = g.join("")
        }
        WebPlayer.log("write lrxc swf");
        document.getElementById(WebPlayer.lrcxSwfDivId).innerHTML = WebPlayer.lrcxSwfHtml
    },
    getDiantaiList: function () {
        var f = KW_DqPlayer.getShare("kw_DiantaiList");
        f = f || "";
        WebPlayer.log("kw_DiantaiList=" + f);
        var c = f.split("#");
        var b = [];
        try {
            for (var d = 0, a = c.length; d < a; d++) {
                if (c[d] != "") {
                    b.push(c[d])
                }
            }
        } catch (g) {
        }
        return b
    },
    setDiantaiList: function (h) {
        var c = h.split("#");
        var b = [];
        try {
            for (var d = 0, a = c.length; d < a; d++) {
                if (c[d] != "") {
                    b.push(c[d])
                }
            }
        } catch (g) {
        }
        var f = "";
        if (b.length > 0) {
            f = b.join("#")
        }
        KW_DqPlayer.saveShare("kw_DiantaiList", f);
        WebPlayer.log("save kw_DiantaiList=" + f)
    },
    addSearchHistory: function (e) {
        if (e == null || e == "") {
            return
        }
        var c = [];
        var b = false;
        for (var d = 0, a = WebPlayer.searchHistory.length; d < a; d++) {
            if (WebPlayer.searchHistory[d] != e) {
                c.push(WebPlayer.searchHistory[d])
            } else {
                b = true
            }
        }
        if (b) {
            c.push(e)
        } else {
            if (c.length >= 10) {
                c.shift()
            }
            c.push(e)
        }
        WebPlayer.searchHistory = c;
        WebPlayer.log("add searchkey " + e);
        WebPlayer.saveSearchHistory()
    },
    getSearchHistory: function (c) {
        if (c < 1) {
            c = 1
        }
        if (c > WebPlayer.searchHistoryMax) {
            c = WebPlayer.searchHistoryMax
        }
        var a = [];
        if (WebPlayer.searchHistory.length == 0) {
            return a
        }
        for (var b = WebPlayer.searchHistory.length - 1; b >= 0; b--) {
            a.push(WebPlayer.searchHistory[b]);
            if (a.length >= c) {
                break
            }
        }
        WebPlayer.log("get searchkeys=" + a.toString());
        return a
    },
    saveSearchHistory: function () {
        var b = [];
        for (var c = 0, a = WebPlayer.searchHistory.length; c < a; c++) {
            b[c] = encodeURIComponent(WebPlayer.searchHistory[c])
        }
        var d = "";
        if (b.length > 0) {
            d = b.join(",")
        }
        KW_DqPlayer.saveShare("kw_searchHistory", d);
        WebPlayer.log("save searchkeys=" + d)
    },
    loadSearchHistory: function () {
        var d = KW_DqPlayer.getShare("kw_searchHistory");
        d = d || "";
        WebPlayer.log("searchkeys=" + d);
        var b = d.split(",");
        WebPlayer.searchHistory = [];
        try {
            for (var c = 0, a = b.length; c < a; c++) {
                if (b[c] != "") {
                    WebPlayer.searchHistory.push(decodeURIComponent(b[c]));
                    WebPlayer.log("push " + b[c])
                }
            }
        } catch (f) {
        }
    },
    addEventListener: function (c, a, b) {
        if (c == null || a == null || b == null) {
            return
        }
        if (c.addEventListener) {
            c.addEventListener(a, b, false)
        } else {
            if (c.attachEvent) {
                c.attachEvent("on" + a, b)
            }
        }
    },
    formatTime: function (c) {
        var a = parseInt(c / 60);
        var b = parseInt(c % 60);
        if (a < 10) {
            a = "0" + a
        }
        if (b < 10) {
            b = "0" + b
        }
        return a + ":" + b
    },
    getRandomNum: function (b) {
        if (b < 1) {
            return 1
        }
        var a = Math.random();
        return parseInt(a * 1000000) % b + 1
    },
    sendPlayLog: function () {
        if (WebPlayer.dqLogSended == false) {
            if (WebPlayer.listType != "diantai" && WebPlayer.callbacks.playLog != null) {
                WebPlayer.sendLog("pl_play_log", WebPlayer.callbacks.playLog + "?rid=" + WebPlayer.curMusic.rid + "&pos=" + WebPlayer.curPos)
            } else {
                if (WebPlayer.listType == "diantai" && WebPlayer.callbacks.diantaiLog != null) {
                    WebPlayer.sendLog("diantai_play_log", WebPlayer.callbacks.diantaiLog + "?rid=" + WebPlayer.curMusic.rid + "&pos=" + WebPlayer.curPos)
                } else {
                    WebPlayer.sendLog("pl_play_log", WebPlayer.callbacks.playLog)
                }
            }
            WebPlayer.dqLogSended = true
        }
    },
    sendLog: function (b, a, c) {
    },
    sendSLPlayLog: function (k) {
        if (!WebPlayer.servicelevelsended) {
            WebPlayer.servicelevelsended = true;
            var b = WebPlayer.curMusic.name;
            b = encodeURIComponent(b == null ? "" : b);
            var j = WebPlayer.curMusic.artist;
            j = encodeURIComponent(j == null ? "" : j);
            var i = WebPlayer.curMusic.album;
            i = encodeURIComponent(i == null ? "" : i);
            var h = WebPlayer.blockTime;
            var f = WebPlayer.blockCount;
            f = f - 1;
            f = (f >= 0 ? f : 0);
            var l = WebPlayer.endType;
            var c = WebPlayer.curPos * 1000;
            var e = WebPlayer.totalTime;
            var g = WebPlayer.delay;
            var a = "http://yinyue.kuwo.cn/yy/servicelevel?fr=" + k + "&act=playmusic&blockTime=" + h + "&blockCount=" + f + "&endType=" + l + "&playTime=" + c + "&duration=" + e + "&delay=" + g + "&song=" + b + "&artist=" + j + "&album=" + i;
            var d = new Image();
            d.src = a
        }
    },
    _playerInitOK: function () {
        try {
            if (WebPlayer.callbacks.playInitLog != null) {
                WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitcost1=" + (new Date().getTime() - WebPlayer.initTime))
            }
        } catch (a) {
        }
        return KW_DqPlayer._playerInitOK()
    },
    _playerInitError: function (a) {
        return KW_DqPlayer._playerInitError(a)
    },
    _playEnd: function () {
        WebPlayer.sendPlayLog("_playEnd");
        if (WebPlayer.listType == "diantai") {
            WebPlayer.playNext()
        } else {
            if (WebPlayer.playType == "random") {
                WebPlayer.playRandom()
            } else {
                if (WebPlayer.playType == "loop") {
                    WebPlayer.playNext()
                } else {
                    if (WebPlayer.playType == "single") {
                        WebPlayer.playMusicObj(WebPlayer.curMusic)
                    } else {
                        if (WebPlayer.playType == "order") {
                            if (WebPlayer.listType = "playList" && WebPlayer.curIdx != 0 && WebPlayer.curIdx == WebPlayer.playList.length) {
                                KW_DqPlayer.stop()
                            } else {
                                if (WebPlayer.listType = "favList" && WebPlayer.curIdx != 0 && WebPlayer.curIdx == WebPlayer.favList.length) {
                                    KW_DqPlayer.stop()
                                } else {
                                    WebPlayer.playNext()
                                }
                            }
                        } else {
                            WebPlayer.playRandom()
                        }
                    }
                }
            }
        }
    },
    _setLrcxId: function (a) {
        WebPlayer.writeLrcxSwf();
        return KW_DqPlayer._setLrcxId(a)
    },
    _lrcxWordRoll: function () {
        return KW_DqPlayer._lrcxWordRoll()
    },
    _lrcxRowRoll: function () {
        return KW_DqPlayer._lrcxRowRoll()
    },
    getUserPlayList: function () {
        return KW_DqPlayer.getUserPlayList()
    }
};