var t1 = new Date().getTime();
function json2url(c) {
    c.t = Math.random();
    var a = [];
    for (var b in c) {
        a.push(b + "=" + encodeURIComponent(c[b]))
    }
    return a.join("&")
}
function ajax(a) {
    a = a || {};
    if (!a.url) {
        return
    }
    a.data = a.data || {};
    a.type = a.type || "get";
    if (window.XMLHttpRequest) {
        var b = new XMLHttpRequest()
    } else {
        var b = new ActiveXObject("Microsoft.XMLHTTP")
    }
    switch (a.type.toLowerCase()) {
        case"get":
            b.open("GET", a.url + "?" + json2url(a.data), true);
            b.send();
            break;
        case"post":
            b.open("POST", a.url, true);
            b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            b.send(json2url(a.data));
            break
    }
    b.onreadystatechange = function () {
        if (b.readyState == 4) {
            if (b.status >= 200 && b.status < 300 || b.status == 304) {
                a.success && a.success(b.responseText)
            } else {
                a.error && a.error(b.status)
            }
        }
    }
}
function loadtime() {
    var d = new Date().getTime();
    var b = d - t1;
    var h = window.location.href;
    var c = document.getElementById("SYS_PAGE_STAT");
    var e = document.getElementById("SYS_FP");
    var i = document.getElementById("SYS_MAIN_HOST");
    var f = "";
    if (c) {
        f = c.value
    }
    var g = "";
    if (e) {
        g = e.value
    }
    var j = "";
    if (i) {
        j = i.value
    }
    var a = j + "/analysis/pload";
    ajax({
        url: a, type: "post", data: {ltime: b, aurl: h, fp: g, pstat: f}, success: function (k) {
        }, error: function (k) {
        }
    })
}
document.onreadystatechange = loaded;
function loaded() {
    if (document.readyState == "complete") {
        var c = window.location.protocol + "//" + window.location.host;
        var b = document.getElementById("SYS_MAIN_HOST");
        var a = c;
        if (b) {
            a = b.value;
            if (a != c) {
                b.value = c
            }
        }
        loadtime()
    }
}
function postFocusClick(d) {
    var a = document.getElementById("SYS_FP").value;
    var c = document.getElementById("SYS_MAIN_HOST").value;
    var b = c + "/analysis/wwwIndexFocusClick";
    ajax({
        url: b, type: "post", data: {focusId: d, fp: a}, success: function (e) {
        }, error: function (e) {
        }
    })
};