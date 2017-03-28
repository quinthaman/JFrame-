var KW_DqPlayer = {
    isIE: !!(window.attachEvent && !window.opera),
    isOpera: !!window.opera,
    isGecko: navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1,
    isSafari: (navigator.userAgent.indexOf("Safari") > -1),
    isChrome: (navigator.userAgent.indexOf("Chrome") > -1),
    swfId: "dqPlayer",
    swfIinitCount: 0,
    swfInitInterval: null,
    playStatInterval: null,
    playerIniting: false,
    playerInited: false,
    playerInitCallback: null,
    callbacks: {},
    player: null,
    playRetryCount: 0,
    currentRid: "",
    currentSong: null,
    currentArtist: null,
    currentAlbum: null,
    totalTime: 0,
    totalBytes: 0,
    currentPos: 0,
    currentVol: 0,
    bufferedBytes: 0,
    buffering: true,
    playStat: "stop",
    showLog: false,
    initPlayed: false,
    lrcxSwfId: "dqLrcxSwf",
    lrcxSwfDivId: "",
    lrcx: null,
    curLrcxId: "",
    ptAvailable: null,
    openLog: function () {
        if (!document.getElementById("kw_dq_logdiv")) {
            var a = document.createElement("div");
            a.style.cssText = "position:absolute;left:0px;top:0px;width:400px;color:red;z-index:999;background-color:#fff";
            a.id = "kw_dq_logdiv";
            document.body.appendChild(a)
        }
        this.showLog = true
    },
    log: function (a) {
        if (KW_DqPlayer.showLog && document.getElementById("kw_dq_logdiv")) {
            document.getElementById("kw_dq_logdiv").innerHTML += a + "<br>"
        }
    },
    getSwf: function (b) {
        if (b == "") {
            return null
        }
        var a = null;
        if (KW_DqPlayer.isIE) {
            a = document.getElementById(b)
        } else {
            a = document[b]
        }
        return a
    },
    init: function (c, b, f, a) {
        KW_DqPlayer.swfId = c;
        var d = {};
        if (b != null && b.initCallback != null) {
            d = b
        } else {
            d.initCallback = b
        }
        KW_DqPlayer.callbacks = d;
        KW_DqPlayer.playerInitCallback = KW_DqPlayer.callbacks.initCallback;
        KW_DqPlayer._swfInitOK();
        if (f != null && f.indexOf("MUSIC_") >= 0) {
            KW_DqPlayer.currentRid = f;
            initPlayed = true;
            KW_DqPlayer.resetPlayStat();
            KW_DqPlayer.playStat = "play";
            KW_DqPlayer.buffering = true;
            KW_DqPlayer.log("start play " + KW_DqPlayer.currentRid)
        }
        if (a != null && a != "") {
            KW_DqPlayer.lrcxSwfId = a
        }
        try {
            if (WebPlayer.callbacks.playInitLog != null) {
                WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitDqPlay=" + (new Date().getTime() - WebPlayer.initTime))
            }
        } catch (g) {
        }
    },
    play: function (b) {
        var a = false;
        if (KW_DqPlayer.player == null || KW_DqPlayer.playerIniting || typeof KW_DqPlayer.player.playSongByrid != "function") {
            a = true
        } else {
            try {
                KW_DqPlayer.player.playSongByrid(b);
                if (WebPlayer.listType == "playList") {
                    try {
                        var d = getindexbyrid(b);
                        setPlayListScroll("side_left1_con_pl", d)
                    } catch (c) {
                    }
                } else {
                    if (WebPlayer.listType == "favList") {
                        try {
                            var d = scindexbyrid(b);
                            setPlayListScroll("side_left1_con_sc", d)
                        } catch (c) {
                        }
                    }
                }
                KW_DqPlayer.resetPlayStat()
            } catch (c) {
                a = true
            }
        }
        if (a) {
            KW_DqPlayer.playRetryCount++;
            if (KW_DqPlayer.playRetryCount >= 20) {
                KW_DqPlayer.log("play 20 times failed");
                return
            }
            setTimeout("KW_DqPlayer.play('" + b + "')", 500);
            return
        } else {
            KW_DqPlayer.playStat = "play";
            KW_DqPlayer.currentRid = b;
            KW_DqPlayer.buffering = true;
            KW_DqPlayer.log("start play " + b)
        }
    },
    pause: function () {
        if (this.playStat == "stop") {
            return
        }
        this.playStat = "pause";
        this.player.stopSong();
        KW_DqPlayer.log("pause song")
    },
    resume: function () {
        if (this.playStat == "stop") {
            return
        }
        this.playStat = "play";
        this.player.resumeSong();
        KW_DqPlayer.log("resume song")
    },
    stop: function () {
        this.playStat = "stop";
        this.player.finalSong();
        this.resetPlayStat();
        KW_DqPlayer.log("stop song")
    },
    _swfInitOK: function () {
        KW_DqPlayer.playerIniting = true;
        KW_DqPlayer.swfInitInterval = setInterval(function () {
            KW_DqPlayer.player = KW_DqPlayer.getSwf(KW_DqPlayer.swfId);
            if (KW_DqPlayer.player && KW_DqPlayer.player.setCurrVolmue && typeof KW_DqPlayer.player.setCurrVolmue == "function" && typeof KW_DqPlayer.player.playSongByrid == "function") {
                KW_DqPlayer.setVolumn(1);
                clearInterval(KW_DqPlayer.swfInitInterval);
                if (KW_DqPlayer.swfInitInterval != null) {
                    KW_DqPlayer.swfInitInterval = null
                }
                KW_DqPlayer.log("swf inited");
                if (!KW_DqPlayer.playerInited) {
                    setTimeout(KW_DqPlayer._playerInitOK, 50)
                }
                try {
                    if (WebPlayer.callbacks.playInitLog != null) {
                        WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitcost2=" + (new Date().getTime() - WebPlayer.initTime))
                    }
                } catch (a) {
                }
            }
            KW_DqPlayer.swfIinitCount++;
            if (KW_DqPlayer.swfIinitCount >= 20) {
                clearInterval(KW_DqPlayer.swfInitInterval);
                if (KW_DqPlayer.swfInitInterval != null) {
                    KW_DqPlayer.swfInitInterval = null
                }
                KW_DqPlayer.log("swf init 20 times failed");
                try {
                    if (WebPlayer.callbacks.playInitLog != null) {
                        WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitFailed=" + (new Date().getTime() - WebPlayer.initTime))
                    }
                } catch (a) {
                }
            }
        }, 1000)
    },
    _playerInitOK: function () {
        if (KW_DqPlayer.playerInited == false) {
            KW_DqPlayer.log("in player initok");
            KW_DqPlayer.playerInited = true;
            KW_DqPlayer.playerIniting = false;
            KW_DqPlayer.player = KW_DqPlayer.getSwf(KW_DqPlayer.swfId);
            KW_DqPlayer.log("player loaded");
            if (KW_DqPlayer.playerInitCallback != null) {
                try {
                    if (typeof KW_DqPlayer.playerInitCallback == "function") {
                        KW_DqPlayer.log("call playerInitCallback function");
                        KW_DqPlayer.playerInitCallback(1)
                    } else {
                        KW_DqPlayer.log("call playerInitCallback string");
                        setTimeout(KW_DqPlayer.playerInitCallback + "(1)", 50)
                    }
                } catch (a) {
                }
            }
            KW_DqPlayer.startStatListener();
            KW_DqPlayer.log("player inited");
            try {
                if (WebPlayer.callbacks.playInitLog != null) {
                    WebPlayer.sendLog("initLog", WebPlayer.callbacks.playInitLog + "?playerInitcost3=" + (new Date().getTime() - WebPlayer.initTime))
                }
            } catch (a) {
            }
        }
        return 1
    },
    _playerInitError: function (a) {
        if (KW_DqPlayer.playerInitCallback != null) {
            try {
                if (typeof KW_DqPlayer.playerInitCallback == "function") {
                    KW_DqPlayer.playerInitCallback(a)
                } else {
                    setTimeout(KW_DqPlayer.playerInitCallback + "('" + a + "')", 50)
                }
            } catch (b) {
            }
        }
        if (KW_DqPlayer.playerInited == true) {
        } else {
            KW_DqPlayer.playerInited = false
        }
        KW_DqPlayer.log("player init failed")
    },
    startStatListener: function () {
        if (KW_DqPlayer.playStatInterval != null) {
            KW_DqPlayer.stopStatListener()
        }
        KW_DqPlayer.playStatInterval = setInterval(KW_DqPlayer.updatePlayStat, 100);
        KW_DqPlayer.log("start listener")
    },
    stopStatListener: function () {
        if (KW_DqPlayer.playStatInterval != null) {
            clearInterval(KW_DqPlayer.playStatInterval);
            KW_DqPlayer.playStatInterval = null;
            KW_DqPlayer.log("stop listener")
        }
    },
    updatePlayStat: function () {
        var musicObj = null;
        try {
            if (KW_DqPlayer.playerInited && KW_DqPlayer.player != null) {
                var json = KW_DqPlayer.player.getPlayInfo();
                musicObj = eval("(" + json + ")")
            }
        } catch (e) {
        }
        if (musicObj == null || musicObj.totalBytes == null) {
            return
        }
        if (KW_DqPlayer.buffering) {
            if (!isNaN(musicObj.loadBytes) && !isNaN(musicObj.totalBytes)) {
                KW_DqPlayer.bufferedBytes = parseInt(musicObj.loadBytes);
                KW_DqPlayer.totalBytes = parseInt(musicObj.totalBytes)
            }
            if (KW_DqPlayer.bufferedBytes != 0 && KW_DqPlayer.bufferedBytes == KW_DqPlayer.totalBytes) {
                KW_DqPlayer.buffering = false
            }
        }
        if (!isNaN(musicObj.playCurrTime) && !isNaN(musicObj.totalTime)) {
            KW_DqPlayer.totalTime = parseInt(musicObj.totalTime);
            KW_DqPlayer.currentPos = parseFloat(musicObj.playCurrTime)
        }
        if (musicObj.songName != null) {
            KW_DqPlayer.currentSong = musicObj.songName;
            KW_DqPlayer.currentArtist = musicObj.songArt;
            KW_DqPlayer.currentAlbum = musicObj.songAlbum
        }
    },
    resetPlayStat: function () {
        KW_DqPlayer.playRetryCount = 0;
        KW_DqPlayer.currentRid = "";
        KW_DqPlayer.totalTime = 0;
        KW_DqPlayer.totalBytes = 0;
        KW_DqPlayer.currentPos = 0;
        KW_DqPlayer.currentVol = 0;
        KW_DqPlayer.bufferedBytes = 0;
        KW_DqPlayer.buffering = false;
        KW_DqPlayer.currentSong = null;
        KW_DqPlayer.currentArtist = null;
        KW_DqPlayer.currentAlbum = null;
        KW_DqPlayer.log("play stat reset")
    },
    setVolumn: function (b) {
        var a = this.player.setCurrVolmue(b);
        KW_DqPlayer.log("set vol=" + b);
        if (a != -1) {
            this.currentVol = b;
            return 1
        } else {
            return -1
        }
    },
    getVolumn: function () {
        var a = this.player.getCurrVolmue();
        if (a != -1) {
            this.currentVol = a
        }
        return this.currentVol
    },
    setPosition: function (b) {
        var a = this.player.setplaycurrPos(b);
        KW_DqPlayer.log("set pos=" + b);
        if (a != -1) {
            return 1
        } else {
            return -1
        }
    },
    getPosition: function () {
        return this.currentPos
    },
    getStat: function () {
        KW_DqPlayer.log("totalBytes: " + KW_DqPlayer.totalBytes + " bufferedBytes:" + KW_DqPlayer.bufferedBytes + "buffering: " + KW_DqPlayer.buffering);
        KW_DqPlayer.log("totalTime" + KW_DqPlayer.totalTime + " currentPos" + KW_DqPlayer.currentPos);
        KW_DqPlayer.log("playstat:" + KW_DqPlayer.playStat + " currentRid:" + KW_DqPlayer.currentRid + " volumn:" + KW_DqPlayer.getVolumn())
    },
    _lrcxWordRoll: function () {
        try {
            if (KW_DqPlayer.lrcx == null || typeof KW_DqPlayer.lrcx.updateLrcState != "function") {
                KW_DqPlayer.lrcx = KW_DqPlayer.getSwf(KW_DqPlayer.lrcxSwfId)
            }
            if (KW_DqPlayer.lrcx != null && typeof KW_DqPlayer.lrcx.updateLrcState == "function") {
                KW_DqPlayer.lrcx.updateLrcState(KW_DqPlayer.currentPos)
            }
        } catch (a) {
            KW_DqPlayer.log(a.message)
        }
    },
    _lrcxRowRoll: function () {
        try {
            if (KW_DqPlayer.lrcx == null || typeof KW_DqPlayer.lrcx.setTimeRoll != "function") {
                KW_DqPlayer.lrcx = KW_DqPlayer.getSwf(KW_DqPlayer.lrcxSwfId)
            }
            if (KW_DqPlayer.lrcx != null && typeof KW_DqPlayer.lrcx.setTimeRoll == "function") {
                KW_DqPlayer.lrcx.setTimeRoll(KW_DqPlayer.currentPos)
            }
        } catch (a) {
            KW_DqPlayer.log(a.message)
        }
    },
    _loadLrcxId: function () {
        KW_DqPlayer.log("load lrcxid=" + KW_DqPlayer.curLrcxId);
        KW_DqPlayer.lrcx = KW_DqPlayer.getSwf(KW_DqPlayer.lrcxSwfId);
        return KW_DqPlayer.curLrcxId
    },
    _setLrcxId: function (a) {
        return KW_DqPlayer.curLrcxId = a
    },
    getUserPlayList: function () {
        if (KW_DqPlayer.player != null) {
            return KW_DqPlayer.player.getPlayListInfo()
        } else {
            return ""
        }
    },
    saveUserPlayList: function (a) {
        if (KW_DqPlayer.player != null) {
            return KW_DqPlayer.player.savePlayListInfo(a)
        } else {
            return ""
        }
    },
    getShare: function (a) {
        if (KW_DqPlayer.player != null) {
            return KW_DqPlayer.player.getCommShareString(a)
        } else {
            return ""
        }
    },
    saveShare: function (a, b) {
        if (KW_DqPlayer.player != null) {
            return KW_DqPlayer.player.saveCommShareString(a, b)
        } else {
            return ""
        }
    }
};