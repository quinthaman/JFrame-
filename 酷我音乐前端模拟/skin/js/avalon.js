(function (c, b) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = c.document ? b(c, true) : function (d) {
            if (!d.document) {
                throw new Error("Avalon requires a window with a document")
            }
            return b(d)
        }
    } else {
        b(c)
    }
}(typeof window !== "undefined" ? window : this, function (b5, a1) {
    var aI = new Date() - 0;
    var cy = b5.document;
    var b = cy.getElementsByTagName("head")[0];
    var aD = b.insertBefore(document.createElement("avalon"), b.firstChild);
    aD.innerHTML = "X<style id='avalonStyle'>.avalonHide{ display: none!important }</style>";
    aD.setAttribute("ms-skip", "1");
    aD.className = "avalonHide";
    var aq = /\[native code\]/;

    function cp() {
        if (b5.console && avalon.config.debug) {
            Function.apply.call(console.log, console, arguments)
        }
    }

    var cH = "$" + aI;
    var ar = b5.require;
    var ao = b5.define;
    var r;
    var K = false;
    var bR = /[^, ]+/g;
    var B = /^(?:object|array)$/;
    var aw = /^\[object SVG\w*Element\]$/;
    var H = /^\[object (?:Window|DOMWindow|global)\]$/;
    var bs = Object.prototype;
    var b9 = bs.hasOwnProperty;
    var cA = bs.toString;
    var cQ = Array.prototype;
    var Y = cQ.slice;
    var bW = {};
    var aR = b5.dispatchEvent;
    var c2 = cy.documentElement;
    var ce = cy.createDocumentFragment();
    var de = cy.createElement("div");
    var aH = {};
    "Boolean Number String Function Array Date RegExp Object Error".replace(bR, function (e) {
        aH["[object " + e + "]"] = e.toLowerCase()
    });
    function l() {
    }

    function dh(du, ds) {
        if (typeof du === "string") {
            du = du.match(bR) || []
        }
        var e = {}, dr = ds !== void 0 ? ds : 1;
        for (var ap = 0, dt = du.length; ap < dt; ap++) {
            e[du[ap]] = dr
        }
        return e
    }

    var bD = function (e) {
        e = e || "avalon";
        return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, e)
    };

    function c5() {
        if (b5.VBArray) {
            var e = document.documentMode;
            return e ? e : b5.XMLHttpRequest ? 7 : 6
        } else {
            return NaN
        }
    }

    var b0 = c5();
    avalon = function (e) {
        return new avalon.init(e)
    };
    avalon.profile = function () {
        if (b5.console && avalon.config.profile) {
            Function.apply.call(console.log, console, arguments)
        }
    };
    avalon.nextTick = new function () {
        var dr = b5.setImmediate;
        var ap = b5.MutationObserver;
        var dt = aR && b5.postMessage;
        if (dr) {
            return dr.bind(b5)
        }
        var e = [];

        function du() {
            var dw = e.length;
            for (var dv = 0; dv < dw; dv++) {
                e[dv]()
            }
            e = e.slice(dw)
        }

        if (ap) {
            var ds = document.createTextNode("avalon");
            new ap(du).observe(ds, {characterData: true});
            return function (dv) {
                e.push(dv);
                ds.data = Math.random()
            }
        }
        if (dt) {
            b5.addEventListener("message", function (dw) {
                var dv = dw.source;
                if ((dv === b5 || dv === null) && dw.data === "process-tick") {
                    dw.stopPropagation();
                    du()
                }
            });
            return function (dv) {
                e.push(dv);
                b5.postMessage("process-tick", "*")
            }
        }
        return function (dv) {
            setTimeout(dv, 0)
        }
    };
    avalon.init = function (e) {
        this[0] = this.element = e
    };
    avalon.fn = avalon.prototype = avalon.init.prototype;
    avalon.type = function (e) {
        if (e == null) {
            return String(e)
        }
        return typeof e === "object" || typeof e === "function" ? aH[cA.call(e)] || "object" : typeof e
    };
    var E = typeof alert === "object" ? function (ap) {
        try {
            return /^\s*\bfunction\b/.test(ap + "")
        } catch (dr) {
            return false
        }
    } : function (e) {
        return cA.call(e) === "[object Function]"
    };
    avalon.isFunction = E;
    avalon.isWindow = function (e) {
        if (!e) {
            return false
        }
        return e == e.document && e.document != e
    };
    function ba(e) {
        return H.test(cA.call(e))
    }

    if (ba(b5)) {
        avalon.isWindow = ba
    }
    var aJ;
    for (aJ in avalon({})) {
        break
    }
    var dn = aJ !== "0";
    avalon.isPlainObject = function (ds, ap) {
        if (!ds || avalon.type(ds) !== "object" || ds.nodeType || avalon.isWindow(ds)) {
            return false
        }
        try {
            if (ds.constructor && !b9.call(ds, "constructor") && !b9.call(ds.constructor.prototype, "isPrototypeOf")) {
                return false
            }
        } catch (dr) {
            return false
        }
        if (dn) {
            for (ap in ds) {
                return b9.call(ds, ap)
            }
        }
        for (ap in ds) {
        }
        return ap === void 0 || b9.call(ds, ap)
    };
    if (aq.test(Object.getPrototypeOf)) {
        avalon.isPlainObject = function (e) {
            return cA.call(e) === "[object Object]" && Object.getPrototypeOf(e) === bs
        }
    }
    avalon.mix = avalon.fn.mix = function () {
        var dA, ds, ap, dr, dx, dy, dw = arguments[0] || {}, du = 1, dt = arguments.length, dz = false;
        if (typeof dw === "boolean") {
            dz = dw;
            dw = arguments[1] || {};
            du++
        }
        if (typeof dw !== "object" && !E(dw)) {
            dw = {}
        }
        if (du === dt) {
            dw = this;
            du--
        }
        for (; du < dt; du++) {
            if ((dA = arguments[du]) != null) {
                for (ds in dA) {
                    ap = dw[ds];
                    try {
                        dr = dA[ds]
                    } catch (dv) {
                        continue
                    }
                    if (dw === dr) {
                        continue
                    }
                    if (dz && dr && (avalon.isPlainObject(dr) || (dx = Array.isArray(dr)))) {
                        if (dx) {
                            dx = false;
                            dy = ap && Array.isArray(ap) ? ap : []
                        } else {
                            dy = ap && avalon.isPlainObject(ap) ? ap : {}
                        }
                        dw[ds] = avalon.mix(dz, dy, dr)
                    } else {
                        if (dr !== void 0) {
                            dw[ds] = dr
                        }
                    }
                }
            }
        }
        return dw
    };
    function bd(ap, e) {
        ap = Math.floor(ap) || 0;
        return ap < 0 ? Math.max(e + ap, 0) : Math.min(ap, e)
    }

    avalon.mix({
        rword: bR, subscribers: cH, version: 1.46, ui: {}, log: cp, slice: aR ? function (ap, dr, e) {
            return Y.call(ap, dr, e)
        } : function (dr, du, ap) {
            var ds = [];
            var e = dr.length;
            if (ap === void 0) {
                ap = e
            }
            if (typeof ap === "number" && isFinite(ap)) {
                du = bd(du, e);
                ap = bd(ap, e);
                for (var dt = du; dt < ap; ++dt) {
                    ds[dt - du] = dr[dt]
                }
            }
            return ds
        }, noop: l, error: function (dr, ap) {
            throw (ap || Error)(dr)
        }, oneObject: dh, range: function (du, ap, dt) {
            dt || (dt = 1);
            if (ap == null) {
                ap = du || 0;
                du = 0
            }
            var dr = -1, ds = Math.max(0, Math.ceil((ap - du) / dt)), e = new Array(ds);
            while (++dr < ds) {
                e[dr] = du;
                du += dt
            }
            return e
        }, eventHooks: [], bind: function (dt, ds, dr, ap) {
            var e = avalon.eventHooks;
            var du = e[ds];
            if (typeof du === "object") {
                ds = du.type;
                if (du.deel) {
                    dr = du.deel(dt, ds, dr, ap)
                }
            }
            var dv = aR ? dr : function (dw) {
                dr.call(dt, cl(dw))
            };
            if (aR) {
                dt.addEventListener(ds, dv, !!ap)
            } else {
                dt.attachEvent("on" + ds, dv)
            }
            return dv
        }, unbind: function (dt, ds, dr, ap) {
            var e = avalon.eventHooks;
            var du = e[ds];
            var dv = dr || l;
            if (typeof du === "object") {
                ds = du.type;
                if (du.deel) {
                    dr = du.deel(dt, ds, dr, false)
                }
            }
            if (aR) {
                dt.removeEventListener(ds, dv, !!ap)
            } else {
                dt.detachEvent("on" + ds, dv)
            }
        }, css: function (dr, e, ds) {
            if (dr instanceof avalon) {
                dr = dr[0]
            }
            var du = /[_-]/.test(e) ? m(e) : e, ap;
            e = avalon.cssName(du) || du;
            if (ds === void 0 || typeof ds === "boolean") {
                ap = x[du + ":get"] || x["@:get"];
                if (e === "background") {
                    e = "backgroundColor"
                }
                var dt = ap(dr, e);
                return ds === true ? parseFloat(dt) || 0 : dt
            } else {
                if (ds === "") {
                    dr.style[e] = ""
                } else {
                    if (ds == null || ds !== ds) {
                        return
                    }
                    if (isFinite(ds) && !avalon.cssNumber[du]) {
                        ds += "px"
                    }
                    ap = x[du + ":set"] || x["@:set"];
                    ap(dr, e, ds)
                }
            }
        }, each: function (dr, ap) {
            if (dr) {
                var e = 0;
                if (aX(dr)) {
                    for (var ds = dr.length; e < ds; e++) {
                        if (ap(e, dr[e]) === false) {
                            break
                        }
                    }
                } else {
                    for (e in dr) {
                        if (dr.hasOwnProperty(e) && ap(e, dr[e]) === false) {
                            break
                        }
                    }
                }
            }
        }, getWidgetData: function (ds, dt) {
            var ap = avalon(ds).data();
            var e = {};
            for (var dr in ap) {
                if (dr.indexOf(dt) === 0) {
                    e[dr.replace(dt, "").replace(/\w/, function (du) {
                        return du.toLowerCase()
                    })] = ap[dr]
                }
            }
            return e
        }, Array: {
            ensure: function (ap, e) {
                if (ap.indexOf(e) === -1) {
                    return ap.push(e)
                }
            }, removeAt: function (ap, e) {
                return !!ap.splice(e, 1).length
            }, remove: function (dr, ap) {
                var e = dr.indexOf(ap);
                if (~e) {
                    return avalon.Array.removeAt(dr, e)
                }
                return false
            }
        }
    });
    var dg = avalon.bindingHandlers = {};
    var am = avalon.bindingExecutors = {};

    function aX(ds) {
        if (!ds) {
            return false
        }
        var dt = ds.length;
        if (dt === (dt >>> 0)) {
            var ap = cA.call(ds).slice(8, -1);
            if (/(?:regexp|string|function|window|global)$/i.test(ap)) {
                return false
            }
            if (ap === "Array") {
                return true
            }
            try {
                if ({}.propertyIsEnumerable.call(ds, "length") === false) {
                    return /^\s?function/.test(ds.item || ds.callee)
                }
                return true
            } catch (dr) {
                return !ds.window
            }
        }
        return false
    }

    var h = new function () {
        function e(dr) {
            this.size = 0;
            this.limit = dr;
            this.head = this.tail = void 0;
            this._keymap = {}
        }

        var ap = e.prototype;
        ap.put = function (dr, dt) {
            var ds = {key: dr, value: dt};
            this._keymap[dr] = ds;
            if (this.tail) {
                this.tail.newer = ds;
                ds.older = this.tail
            } else {
                this.head = ds
            }
            this.tail = ds;
            if (this.size === this.limit) {
                this.shift()
            } else {
                this.size++
            }
            return dt
        };
        ap.shift = function () {
            var dr = this.head;
            if (dr) {
                this.head = this.head.newer;
                this.head.older = dr.newer = dr.older = this._keymap[dr.key] = void 0
            }
        };
        ap.get = function (dr) {
            var ds = this._keymap[dr];
            if (ds === void 0) {
                return
            }
            if (ds === this.tail) {
                return ds.value
            }
            if (ds.newer) {
                if (ds === this.head) {
                    this.head = ds.newer
                }
                ds.newer.older = ds.older
            }
            if (ds.older) {
                ds.older.newer = ds.newer
            }
            ds.newer = void 0;
            ds.older = this.tail;
            if (this.tail) {
                this.tail.newer = ds
            }
            this.tail = ds;
            return ds.value
        };
        return e
    };
    if (!"司徒正美".trim) {
        var P = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
            return this.replace(P, "")
        }
    }
    var dq = !({toString: null}).propertyIsEnumerable("toString"), bl = (function () {
    }).propertyIsEnumerable("prototype"), C = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], az = C.length;
    if (!Object.keys) {
        Object.keys = function (dr) {
            var dt = [];
            var dx = bl && typeof dr === "function";
            if (typeof dr === "string" || (dr && dr.callee)) {
                for (var dv = 0; dv < dr.length; ++dv) {
                    dt.push(String(dv))
                }
            } else {
                for (var e in dr) {
                    if (!(dx && e === "prototype") && b9.call(dr, e)) {
                        dt.push(String(e))
                    }
                }
            }
            if (dq) {
                var dw = dr.constructor, ap = dw && dw.prototype === dr;
                for (var du = 0; du < az; du++) {
                    var ds = C[du];
                    if (!(ap && ds === "constructor") && b9.call(dr, ds)) {
                        dt.push(ds)
                    }
                }
            }
            return dt
        }
    }
    if (!Array.isArray) {
        Array.isArray = function (e) {
            return cA.call(e) === "[object Array]"
        }
    }
    if (!l.bind) {
        Function.prototype.bind = function (dr) {
            if (arguments.length < 2 && dr === void 0) {
                return this
            }
            var ap = this, e = arguments;
            return function () {
                var ds = [], dt;
                for (dt = 1; dt < e.length; dt++) {
                    ds.push(e[dt])
                }
                for (dt = 0; dt < arguments.length; dt++) {
                    ds.push(arguments[dt])
                }
                return ap.apply(dr, ds)
            }
        }
    }
    function bx(ds, e, dr) {
        var ap = "for(var " + ds + "i=0,n = this.length; i < n; i++){" + e.replace("_", "((i in this) && fn.call(scope,this[i],i,this))") + "}" + dr;
        return Function("fn,scope", ap)
    }

    if (!aq.test([].map)) {
        avalon.mix(cQ, {
            indexOf: function (dr, e) {
                var ds = this.length, ap = ~~e;
                if (ap < 0) {
                    ap += ds
                }
                for (; ap < ds; ap++) {
                    if (this[ap] === dr) {
                        return ap
                    }
                }
                return -1
            },
            lastIndexOf: function (dr, e) {
                var ds = this.length, ap = e == null ? ds - 1 : e;
                if (ap < 0) {
                    ap = Math.max(0, ds + ap)
                }
                for (; ap >= 0; ap--) {
                    if (this[ap] === dr) {
                        return ap
                    }
                }
                return -1
            },
            forEach: bx("", "_", ""),
            filter: bx("r=[],j=0,", "if(_)r[j++]=this[i]", "return r"),
            map: bx("r=[],", "r[i]=_", "return r"),
            some: bx("", "if(_)return true", "return false"),
            every: bx("", "if(!_)return false", "return true")
        })
    }
    function v(ap, dr) {
        try {
            while ((dr = dr.parentNode)) {
                if (dr === ap) {
                    return true
                }
            }
            return false
        } catch (ds) {
            return false
        }
    }

    avalon.contains = v;
    if (!cy.contains) {
        cy.contains = function (e) {
            return v(cy, e)
        }
    }
    function s() {
        return new XMLSerializer().serializeToString(this)
    }

    if (b5.SVGElement) {
        if (!cy.createTextNode("x").contains) {
            Node.prototype.contains = function (e) {
                return !!(this.compareDocumentPosition(e) & 16)
            }
        }
        var be = "http://www.w3.org/2000/svg";
        var bN = cy.createElementNS(be, "svg");
        bN.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />';
        if (!aw.test(bN.firstChild)) {
            function bZ(dt, du) {
                if (dt && dt.childNodes) {
                    var ap = dt.childNodes;
                    for (var dr = 0, ds; ds = ap[dr++];) {
                        if (ds.tagName) {
                            var e = cy.createElementNS(be, ds.tagName.toLowerCase());
                            cQ.forEach.call(ds.attributes, function (dv) {
                                e.setAttribute(dv.name, dv.value)
                            });
                            bZ(ds, e);
                            du.appendChild(e)
                        }
                    }
                }
            }

            Object.defineProperties(SVGElement.prototype, {
                outerHTML: {
                    enumerable: true,
                    configurable: true,
                    get: s,
                    set: function (ap) {
                        var e = this.tagName.toLowerCase(), dr = this.parentNode, dt = avalon.parseHTML(ap);
                        if (e === "svg") {
                            dr.insertBefore(dt, this)
                        } else {
                            var ds = cy.createDocumentFragment();
                            bZ(dt, ds);
                            dr.insertBefore(ds, this)
                        }
                        dr.removeChild(this)
                    }
                }, innerHTML: {
                    enumerable: true, configurable: true, get: function () {
                        var ap = this.outerHTML;
                        var e = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i");
                        var dr = new RegExp("</" + this.nodeName + ">$", "i");
                        return ap.replace(e, "").replace(dr, "")
                    }, set: function (e) {
                        if (avalon.clearHTML) {
                            avalon.clearHTML(this);
                            var ap = avalon.parseHTML(e);
                            bZ(ap, this)
                        }
                    }
                }
            })
        }
    }
    if (!c2.outerHTML && b5.HTMLElement) {
        HTMLElement.prototype.__defineGetter__("outerHTML", s)
    }
    var cX = /^(?:mouse|contextmenu|drag)|click/;

    function cl(ds) {
        var e = {};
        for (var ap in ds) {
            e[ap] = ds[ap]
        }
        var du = e.target = ds.srcElement;
        if (ds.type.indexOf("key") === 0) {
            e.which = ds.charCode != null ? ds.charCode : ds.keyCode
        } else {
            if (cX.test(ds.type)) {
                var dt = du.ownerDocument || cy;
                var dr = dt.compatMode === "BackCompat" ? dt.body : dt.documentElement;
                e.pageX = ds.clientX + (dr.scrollLeft >> 0) - (dr.clientLeft >> 0);
                e.pageY = ds.clientY + (dr.scrollTop >> 0) - (dr.clientTop >> 0);
                e.wheelDeltaY = e.wheelDelta;
                e.wheelDeltaX = 0
            }
        }
        e.timeStamp = new Date() - 0;
        e.originalEvent = ds;
        e.preventDefault = function () {
            ds.returnValue = false
        };
        e.stopPropagation = function () {
            ds.cancelBubble = true
        };
        return e
    }

    var bt = avalon.eventHooks;
    if (!("onmouseenter" in c2)) {
        avalon.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (ap, e) {
            bt[ap] = {
                type: e, deel: function (dt, dr, ds) {
                    return function (dv) {
                        var du = dv.relatedTarget;
                        if (!du || (du !== dt && !(dt.compareDocumentPosition(du) & 16))) {
                            delete dv.type;
                            dv.type = ap;
                            return ds.call(dt, dv)
                        }
                    }
                }
            }
        })
    }
    avalon.each({AnimationEvent: "animationend", WebKitAnimationEvent: "webkitAnimationEnd"}, function (e, ap) {
        if (b5[e] && !bt.animationend) {
            bt.animationend = {type: ap}
        }
    });
    if (!("oninput" in cy.createElement("input"))) {
        bt.input = {
            type: "propertychange", deel: function (dr, e, ap) {
                return function (ds) {
                    if (ds.propertyName === "value") {
                        ds.type = "input";
                        return ap.call(dr, ds)
                    }
                }
            }
        }
    }
    if (cy.onmousewheel === void 0) {
        var cd = cy.onwheel !== void 0 ? "wheel" : "DOMMouseScroll";
        var br = cd === "wheel" ? "deltaY" : "detail";
        bt.mousewheel = {
            type: cd, deel: function (dr, e, ap) {
                return function (ds) {
                    ds.wheelDeltaY = ds.wheelDelta = ds[br] > 0 ? -120 : 120;
                    ds.wheelDeltaX = 0;
                    if (Object.defineProperty) {
                        Object.defineProperty(ds, "type", {value: "mousewheel"})
                    }
                    ap.call(dr, ds)
                }
            }
        }
    }
    function ax(e) {
        for (var ap in e) {
            if (!b9.call(e, ap)) {
                continue
            }
            var dr = e[ap];
            if (typeof ax.plugins[ap] === "function") {
                ax.plugins[ap](dr)
            } else {
                if (typeof ax[ap] === "object") {
                    avalon.mix(ax[ap], dr)
                } else {
                    ax[ap] = dr
                }
            }
        }
        return this
    }

    var cC, bm, an, aM, a7, aa = /[-.*+?^${}()|[\]\/\\]/g;

    function b8(e) {
        return (e + "").replace(aa, "\\$&")
    }

    var dm = {
        loader: function (ap) {
            var e = r && ap;
            b5.require = e ? r : ar;
            b5.define = e ? r.define : ao
        }, interpolate: function (ds) {
            cC = ds[0];
            bm = ds[1];
            if (cC === bm) {
                throw new SyntaxError("openTag===closeTag")
            } else {
                var dr = cC + "test" + bm;
                de.innerHTML = dr;
                if (de.innerHTML !== dr && de.innerHTML.indexOf("&lt;") > -1) {
                    throw new SyntaxError("此定界符不合法")
                }
                ax.openTag = cC;
                ax.closeTag = bm;
                de.innerHTML = ""
            }
            var e = b8(cC), ap = b8(bm);
            an = new RegExp(e + "(.*?)" + ap);
            aM = new RegExp(e + "(.*?)" + ap, "g");
            a7 = new RegExp(e + ".*?" + ap + "|\\sms-")
        }
    };
    ax.debug = true;
    ax.plugins = dm;
    ax.plugins.interpolate(["{{", "}}"]);
    ax.paths = {};
    ax.shim = {};
    ax.maxRepeatSize = 100;
    avalon.config = ax;
    var c7 = /(\w+)\[(avalonctrl)="(\S+)"\]/;
    var cn = cy.querySelectorAll ? function (e) {
        return cy.querySelectorAll(e)
    } : function (du) {
        var ap = du.match(c7);
        var dt = cy.getElementsByTagName(ap[1]);
        var e = [];
        for (var dr = 0, ds; ds = dt[dr++];) {
            if (ds.getAttribute(ap[2]) === ap[3]) {
                e.push(ds)
            }
        }
        return e
    };
    var cK = {
        $watch: function (e, dr) {
            if (typeof dr === "function") {
                var ap = this.$events[e];
                if (ap) {
                    ap.push(dr)
                } else {
                    this.$events[e] = [dr]
                }
            } else {
                this.$events = this.$watch.backup
            }
            return this
        }, $unwatch: function (ap, dt) {
            var ds = arguments.length;
            if (ds === 0) {
                this.$watch.backup = this.$events;
                this.$events = {}
            } else {
                if (ds === 1) {
                    this.$events[ap] = []
                } else {
                    var dr = this.$events[ap] || [];
                    var e = dr.length;
                    while (~--e < 0) {
                        if (dr[e] === dt) {
                            return dr.splice(e, 1)
                        }
                    }
                }
            }
            return this
        }, $fire: function (dy) {
            var dw, dr, dA, dB;
            if (/^(\w+)!(\S+)$/.test(dy)) {
                dw = RegExp.$1;
                dy = RegExp.$2
            }
            var dC = this.$events;
            if (!dC) {
                return
            }
            var dx = Y.call(arguments, 1);
            var ds = [dy].concat(dx);
            if (dw === "all") {
                for (dr in avalon.vmodels) {
                    dA = avalon.vmodels[dr];
                    if (dA !== this) {
                        dA.$fire.apply(dA, ds)
                    }
                }
            } else {
                if (dw === "up" || dw === "down") {
                    var e = dC.expr ? cn(dC.expr) : [];
                    if (e.length === 0) {
                        return
                    }
                    for (dr in avalon.vmodels) {
                        dA = avalon.vmodels[dr];
                        if (dA !== this) {
                            if (dA.$events.expr) {
                                var dt = cn(dA.$events.expr);
                                if (dt.length === 0) {
                                    continue
                                }
                                cQ.forEach.call(dt, function (dD) {
                                    cQ.forEach.call(e, function (dF) {
                                        var dE = dw === "down" ? dF.contains(dD) : dD.contains(dF);
                                        if (dE) {
                                            dD._avalon = dA
                                        }
                                    })
                                })
                            }
                        }
                    }
                    var ap = cy.getElementsByTagName("*");
                    var dv = [];
                    cQ.forEach.call(ap, function (dD) {
                        if (dD._avalon) {
                            dv.push(dD._avalon);
                            dD._avalon = "";
                            dD.removeAttribute("_avalon")
                        }
                    });
                    if (dw === "up") {
                        dv.reverse()
                    }
                    for (dr = 0; dB = dv[dr++];) {
                        if (dB.$fire.apply(dB, ds) === false) {
                            break
                        }
                    }
                } else {
                    var du = dC[dy] || [];
                    var dz = dC.$all || [];
                    for (dr = 0; dB = du[dr++];) {
                        if (E(dB)) {
                            dB.apply(this, dx)
                        }
                    }
                    for (dr = 0; dB = dz[dr++];) {
                        if (E(dB)) {
                            dB.apply(this, arguments)
                        }
                    }
                }
            }
        }
    };
    var c0 = avalon.vmodels = {};
    avalon.define = function (dt, e) {
        var ds = dt.$id || dt;
        if (!ds) {
            cp("warning: vm必须指定$id")
        }
        if (c0[ds]) {
            cp("warning: " + ds + " 已经存在于avalon.vmodels中")
        }
        if (typeof dt === "object") {
            var ap = cj(dt)
        } else {
            var dr = {$watch: l};
            e(dr);
            ap = cj(dr);
            K = true;
            e(ap);
            K = false
        }
        ap.$id = ds;
        return c0[ds] = ap
    };
    var b1 = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(bR);
    var cD = Object.defineProperty;
    var bp = true;
    try {
        cD({}, "_", {value: "x"});
        var u = Object.defineProperties
    } catch (cf) {
        bp = false
    }
    function cj(e, dr, dv) {
        if (Array.isArray(e)) {
            var dx = e.concat();
            e.length = 0;
            var dy = ae(e);
            dy.pushArray(dx);
            return dy
        }
        if (!e || e.nodeType > 0 || (e.$id && e.$events)) {
            return e
        }
        var dC = Array.isArray(e.$skipArray) ? e.$skipArray : [];
        dC.$special = dr || {};
        var ds = {};
        dv = dv || {};
        var dz = {};
        var dw = {};
        var dt = [];
        b1.forEach(function (dD) {
            delete e[dD]
        });
        var dA = Object.keys(e);
        dA.forEach(function (dE, dD) {
            var dF = e[dE];
            dv[dE] = dF;
            if (cF(dE, dF, dC)) {
                dz[dE] = [];
                var dG = avalon.type(dF);
                if (dG === "object" && E(dF.get) && Object.keys(dF).length <= 2) {
                    dD = cB(dE, dF);
                    dt.push(dD)
                } else {
                    if (B.test(dG)) {
                        dD = J(dE, dF, dG, dz[dE], dv)
                    } else {
                        dD = cs(dE, dF)
                    }
                }
                dw[dE] = dD
            }
        });
        ds = u(ds, R(dw), e);
        for (var du = 0; du < dA.length; du++) {
            var ap = dA[du];
            if (!dw[ap]) {
                ds[ap] = e[ap]
            }
        }
        ds.$id = bD();
        ds.$model = dv;
        ds.$events = dz;
        for (du in cK) {
            var dB = cK[du];
            if (!aR) {
                dB = dB.bind(ds)
            }
            ds[du] = dB
        }
        if (bp) {
            Object.defineProperty(ds, "hasOwnProperty", n)
        } else {
            ds.hasOwnProperty = function (dD) {
                return dD in ds.$model
            }
        }
        ds.$reinitialize = function () {
            dt.forEach(function (dD) {
                delete dD._value;
                delete dD.oldArgs;
                dD.digest = function () {
                    dD.call(ds)
                };
                ct.begin({
                    callback: function (dG, dF) {
                        var dE = dF._name;
                        if (dF !== dD) {
                            var dH = dG.$events[dE];
                            ag(dH, dD.digest)
                        }
                    }
                });
                try {
                    dD.get.call(ds)
                } finally {
                    ct.end()
                }
            })
        };
        ds.$reinitialize();
        return ds
    }

    var n = {
        value: function (e) {
            return e in this.$model
        }, writable: false, enumerable: false, configurable: true
    };

    function cs(ap, dr) {
        function e(dt) {
            var ds = e._value;
            if (arguments.length > 0) {
                if (!K && !bP(dt, ds)) {
                    e.updateValue(this, dt);
                    e.notify(this, dt, ds)
                }
                return this
            } else {
                ct.collectDependency(this, e);
                return ds
            }
        }

        cz(e, ap);
        e._value = dr;
        return e
    }

    function cB(dr, ap) {
        function e(dv) {
            var ds = e._value;
            var dw = ("_value" in e);
            if (arguments.length > 0) {
                if (K) {
                    return this
                }
                if (typeof e.set === "function") {
                    if (e.oldArgs !== dv) {
                        e.oldArgs = dv;
                        var du = this.$events;
                        var dt = du[dr];
                        du[dr] = [];
                        e.set.call(this, dv);
                        du[dr] = dt;
                        dv = e.get.call(this);
                        if (dv !== ds) {
                            e.updateValue(this, dv);
                            e.notify(this, dv, ds)
                        }
                    }
                }
                return this
            } else {
                dv = e.get.call(this);
                e.updateValue(this, dv);
                if (dw && ds !== dv) {
                    e.notify(this, dv, ds)
                }
                return dv
            }
        }

        e.set = ap.set;
        e.get = ap.get;
        cz(e, dr);
        return e
    }

    function J(ds, dt, dv, du, dr) {
        function e(dI) {
            var dw = e._value;
            var dF = e._vmodel;
            if (arguments.length > 0) {
                if (K) {
                    return this
                }
                if (dv === "array") {
                    var dH = dF, dG = dI, dD = dH.length, dy = dG.length;
                    dH.$lock = true;
                    if (dD > dy) {
                        dH.splice(dy, dD - dy)
                    } else {
                        if (dy > dD) {
                            dH.push.apply(dH, dG.slice(dD))
                        }
                    }
                    var dz = Math.min(dD, dy);
                    for (var dB = 0; dB < dz; dB++) {
                        dH.set(dB, dG[dB])
                    }
                    delete dH.$lock;
                    dH._fire("set")
                } else {
                    if (dv === "object") {
                        if (bJ(dF).join(";") === bJ(dI).join(";")) {
                            for (dB in dI) {
                                dF[dB] = dI[dB]
                            }
                        } else {
                            var dE = e._vmodel = cj(dI, 0, dF.$model);
                            var dA = dE.$events;
                            var dx = dF.$events;
                            for (var dB in dx) {
                                var dC = dx[dB];
                                if (Array.isArray(dA[dB])) {
                                    dA[dB] = dA[dB].concat(dC)
                                } else {
                                    delete dE.$model[dB]
                                }
                            }
                            dA[cH] = dx[cH];
                            dF = dE
                        }
                    }
                }
                e.updateValue(this, dF.$model);
                e.notify(this, this._value, dw);
                return this
            } else {
                ct.collectDependency(this, e);
                return dF
            }
        }

        cz(e, ds);
        if (Array.isArray(dt)) {
            dr[ds] = dt
        } else {
            dr[ds] = dr[ds] || {}
        }
        var ap = e._vmodel = cj(dt, 0, dr[ds]);
        ap.$events[cH] = du;
        return e
    }

    function dj(ap, e) {
        ap.$model[this._name] = this._value = e
    }

    function cP(ds, dr, ap) {
        var e = this._name;
        var dt = ds.$events[e];
        if (dt) {
            cY(dt);
            cK.$fire.call(ds, e, dr, ap)
        }
    }

    function cz(e, ap) {
        e._name = ap;
        e.updateValue = dj;
        e.notify = cP
    }

    var bP = Object.is || function (ap, e) {
            if (ap === 0 && e === 0) {
                return 1 / ap === 1 / e
            } else {
                if (ap !== ap) {
                    return e !== e
                } else {
                    return ap === e
                }
            }
        };

    function cF(dr, ds, ap) {
        if (E(ds) || ds && ds.nodeType) {
            return false
        }
        if (ap.indexOf(dr) !== -1) {
            return false
        }
        var e = ap.$special;
        if (dr && dr.charAt(0) === "$" && !e[dr]) {
            return false
        }
        return true
    }

    function bJ(ds) {
        var e = Object.keys(ds);
        for (var dr = 0; dr < b1.length; dr++) {
            var ap = e.indexOf(b1[dr]);
            if (ap !== -1) {
                e.splice(ap, 1)
            }
        }
        return e
    }

    var R = aR ? function (dr) {
        var ap = {};
        for (var e in dr) {
            ap[e] = {get: dr[e], set: dr[e], enumerable: true, configurable: true}
        }
        return ap
    } : function (e) {
        return e
    };
    if (!bp) {
        if ("__defineGetter__" in avalon) {
            cD = function (e, dr, ap) {
                if ("value" in ap) {
                    e[dr] = ap.value
                }
                if ("get" in ap) {
                    e.__defineGetter__(dr, ap.get)
                }
                if ("set" in ap) {
                    e.__defineSetter__(dr, ap.set)
                }
                return e
            };
            u = function (ap, e) {
                for (var dr in e) {
                    if (e.hasOwnProperty(dr)) {
                        cD(ap, dr, e[dr])
                    }
                }
                return ap
            }
        }
        if (b0) {
            var G = {};
            b5.execScript(["Function parseVB(code)", "\tExecuteGlobal(code)", "End Function"].join("\n"), "VBScript");
            function ci(ap, ds, dr, dt) {
                var e = ds[dr];
                if (arguments.length === 4) {
                    e.call(ap, dt)
                } else {
                    return e.call(ap)
                }
            }

            u = function (dt, ds, du) {
                var ap = [];
                ap.push("\r\n\tPrivate [__data__], [__proxy__]", "\tPublic Default Function [__const__](d" + aI + ", p" + aI + ")", "\t\tSet [__data__] = d" + aI + ": set [__proxy__] = p" + aI, "\t\tSet [__const__] = Me", "\tEnd Function");
                for (dt in du) {
                    if (!ds.hasOwnProperty(dt)) {
                        ap.push("\tPublic [" + dt + "]")
                    }
                }
                b1.forEach(function (dw) {
                    if (!ds.hasOwnProperty(dw)) {
                        ap.push("\tPublic [" + dw + "]")
                    }
                });
                ap.push("\tPublic [hasOwnProperty]");
                for (dt in ds) {
                    ap.push("\tPublic Property Let [" + dt + "](val" + aI + ")", '\t\tCall [__proxy__](Me,[__data__], "' + dt + '", val' + aI + ")", "\tEnd Property", "\tPublic Property Set [" + dt + "](val" + aI + ")", '\t\tCall [__proxy__](Me,[__data__], "' + dt + '", val' + aI + ")", "\tEnd Property", "\tPublic Property Get [" + dt + "]", "\tOn Error Resume Next", "\t\tSet[" + dt + '] = [__proxy__](Me,[__data__],"' + dt + '")', "\tIf Err.Number <> 0 Then", "\t\t[" + dt + '] = [__proxy__](Me,[__data__],"' + dt + '")', "\tEnd If", "\tOn Error Goto 0", "\tEnd Property")
                }
                ap.push("End Class");
                var e = ap.join("\r\n");
                var dv = G[e];
                if (!dv) {
                    dv = bD("VBClass");
                    b5.parseVB("Class " + dv + e);
                    b5.parseVB(["Function " + dv + "Factory(a, b)", "\tDim o", "\tSet o = (New " + dv + ")(a, b)", "\tSet " + dv + "Factory = o", "End Function"].join("\r\n"));
                    G[e] = dv
                }
                var dr = b5[dv + "Factory"](ds, ci);
                return dr
            }
        }
    }
    function ae(e) {
        var dr = [];
        dr.$id = bD();
        dr.$model = e;
        dr.$events = {};
        dr.$events[cH] = [];
        dr._ = cj({length: e.length});
        dr._.$watch("length", function (dt, ds) {
            dr.$fire("length", dt, ds)
        });
        for (var ap in cK) {
            dr[ap] = cK[ap]
        }
        avalon.mix(dr, cN);
        return dr
    }

    function bH(e, dy, ds, dv, ap, dz, du) {
        var dr = this.length, dt = 2;
        while (--dt) {
            switch (e) {
                case"add":
                    var dx = this.$model.slice(dy, dy + ds).map(function (dA) {
                        if (B.test(avalon.type(dA))) {
                            return dA.$id ? dA : cj(dA, 0, dA)
                        } else {
                            return dA
                        }
                    });
                    bL.apply(this, [dy, 0].concat(dx));
                    this._fire("add", dy, ds);
                    break;
                case"del":
                    var dw = this._splice(dy, ds);
                    this._fire("del", dy, ds);
                    break
            }
            if (ap) {
                e = ap;
                dy = dz;
                ds = du;
                dt = 2;
                ap = 0
            }
        }
        this._fire("index", dv);
        if (this.length !== dr) {
            this._.length = this.length
        }
        return dw
    }

    var bL = cQ.splice;
    var cN = {
        _splice: bL, _fire: function (dr, ap, e) {
            cY(this.$events[cH], dr, ap, e)
        }, size: function () {
            return this._.length
        }, pushArray: function (dr) {
            var e = dr.length, ap = this.length;
            if (e) {
                cQ.push.apply(this.$model, dr);
                bH.call(this, "add", ap, e, Math.max(0, ap - 1))
            }
            return e + ap
        }, push: function () {
            var dr = [];
            var e, ap = arguments.length;
            for (e = 0; e < ap; e++) {
                dr[e] = arguments[e]
            }
            return this.pushArray(dr)
        }, unshift: function () {
            var e = arguments.length, ap = this.length;
            if (e) {
                cQ.unshift.apply(this.$model, arguments);
                bH.call(this, "add", 0, e, 0)
            }
            return e + ap
        }, shift: function () {
            if (this.length) {
                var e = this.$model.shift();
                bH.call(this, "del", 0, 1, 0);
                return e
            }
        }, pop: function () {
            var ap = this.length;
            if (ap) {
                var e = this.$model.pop();
                bH.call(this, "del", ap - 1, 1, Math.max(0, ap - 2));
                return e
            }
        }, splice: function (dt) {
            var e = arguments.length, ap = [], ds;
            var dr = bL.apply(this.$model, arguments);
            if (dr.length) {
                ap.push("del", dt, dr.length, 0);
                ds = true
            }
            if (e > 2) {
                if (ds) {
                    ap.splice(3, 1, 0, "add", dt, e - 2)
                } else {
                    ap.push("add", dt, e - 2, 0)
                }
                ds = true
            }
            if (ds) {
                return bH.apply(this, ap)
            } else {
                return []
            }
        }, contains: function (e) {
            return this.indexOf(e) !== -1
        }, remove: function (e) {
            return this.removeAt(this.indexOf(e))
        }, removeAt: function (e) {
            if (e >= 0) {
                this.$model.splice(e, 1);
                return bH.call(this, "del", e, 1, 0)
            }
            return []
        }, clear: function () {
            this.$model.length = this.length = this._.length = 0;
            this._fire("clear", 0);
            return this
        }, removeAll: function (dr) {
            if (Array.isArray(dr)) {
                for (var e = this.length - 1; e >= 0; e--) {
                    if (dr.indexOf(this[e]) !== -1) {
                        this.removeAt(e)
                    }
                }
            } else {
                if (typeof dr === "function") {
                    for (e = this.length - 1; e >= 0; e--) {
                        var ap = this[e];
                        if (dr(ap, e)) {
                            this.removeAt(e)
                        }
                    }
                } else {
                    this.clear()
                }
            }
        }, ensure: function (e) {
            if (!this.contains(e)) {
                this.push(e)
            }
            return this
        }, set: function (e, ds) {
            if (e >= 0) {
                var dt = avalon.type(ds);
                if (ds && ds.$model) {
                    ds = ds.$model
                }
                var dr = this[e];
                if (dt === "object") {
                    for (var ap in ds) {
                        if (dr.hasOwnProperty(ap)) {
                            dr[ap] = ds[ap]
                        }
                    }
                } else {
                    if (dt === "array") {
                        dr.clear().push.apply(dr, ds)
                    } else {
                        if (dr !== ds) {
                            this[e] = ds;
                            this.$model[e] = ds;
                            this._fire("set", e, ds)
                        }
                    }
                }
            }
            return this
        }
    };

    function af(ds, dr) {
        var ap = ds.length - 1;
        for (var e; e = ds[dr]; dr++) {
            e.$index = dr;
            e.$first = dr === 0;
            e.$last = dr === ap
        }
    }

    function bi(du, ap) {
        var ds = {};
        for (var dr = 0, dt = ap.length; dr < dt; dr++) {
            ds[dr] = du[dr];
            var e = ap[dr];
            if (e in ds) {
                du[dr] = ds[e];
                delete ds[e]
            } else {
                du[dr] = du[e]
            }
        }
    }

    "sort,reverse".replace(bR, function (e) {
        cN[e] = function () {
            var dw = this.$model;
            var dv = dw.concat();
            var dz = Math.random();
            var dt = [];
            var dy;
            cQ[e].apply(dw, arguments);
            for (var ds = 0, dr = dv.length; ds < dr; ds++) {
                var dx = dw[ds];
                var ap = dv[ds];
                if (bP(dx, ap)) {
                    dt.push(ds)
                } else {
                    var du = dv.indexOf(dx);
                    dt.push(du);
                    dv[du] = dz;
                    dy = true
                }
            }
            if (dy) {
                bi(this, dt);
                this._fire("move", dt);
                this._fire("index", 0)
            }
            return this
        }
    });
    var ct = (function () {
        var e = [];
        var ap;
        return {
            begin: function (dr) {
                e.push(ap);
                ap = dr
            }, end: function () {
                ap = e.pop()
            }, collectDependency: function (ds, dr) {
                if (ap) {
                    ap.callback(ds, dr)
                }
            }
        }
    })();
    var bY = /^(duplex|on)$/;
    avalon.injectBinding = function (du) {
        var dt = du.evaluator;
        if (dt) {
            ct.begin({
                callback: function (dw, e) {
                    ag(dw.$events[e._name], du)
                }
            });
            try {
                var ds = bY.test(du.type) ? du : dt.apply(0, du.args);
                if (ds === void 0) {
                    delete du.evaluator
                }
                du.handler(ds, du.element, du)
            } catch (dv) {
                cp("warning:exception throwed in [avalon.injectBinding] ", dv);
                delete du.evaluator;
                var dr = du.element;
                if (dr.nodeType === 3) {
                    var ap = dr.parentNode;
                    if (ax.commentInterpolate) {
                        ap.replaceChild(cy.createComment(du.value), dr)
                    } else {
                        dr.data = cC + (du.oneTime ? "::" : "") + du.value + bm
                    }
                }
            } finally {
                ct.end()
            }
        }
    };
    function ag(ap, e) {
        if (e.oneTime) {
            return
        }
        if (ap && avalon.Array.ensure(ap, e) && e.element) {
            cu(e, ap)
        }
    }

    function cY(dw) {
        if (dw && dw.length) {
            if (new Date() - b3 > 444 && typeof dw[0] === "object") {
                aZ()
            }
            var ap = Y.call(arguments, 1);
            for (var dr = dw.length, dt; dt = dw[--dr];) {
                var ds = dt.element;
                if (ds && ds.parentNode) {
                    try {
                        var dv = dt.evaluator;
                        if (dt.$repeat) {
                            dt.handler.apply(dt, ap)
                        } else {
                            if ("$repeat" in dt || !dv) {
                                dg[dt.type](dt, dt.vmodels)
                            } else {
                                if (dt.type !== "on") {
                                    var du = dv.apply(0, dt.args || []);
                                    dt.handler(du, ds, dt)
                                }
                            }
                        }
                    } catch (dx) {
                        console.log(dx)
                    }
                }
            }
        }
    }

    var c9 = 0;
    var c1 = avalon.$$subscribers = [];
    var b3 = new Date();
    var aL = {};
    var bO = {};

    function N(ap, e) {
        if (!ap.uuid && !e) {
            ap.uuid = ++c9;
            bO[ap.uuid] = ap
        }
        return ap.uuid
    }

    function t(e) {
        return bO[e]
    }

    function cu(ds, dr) {
        var ap = ds.element;
        if (!ds.uuid) {
            if (ap.nodeType !== 1) {
                ds.uuid = ds.type + (ds.pos || 0) + "-" + N(ap.parentNode)
            } else {
                ds.uuid = ds.name + "-" + N(ap)
            }
        }
        var e = ds.lists || (ds.lists = []);
        avalon.Array.ensure(e, dr);
        dr.$uuid = dr.$uuid || bD();
        if (!c1[ds.uuid]) {
            c1[ds.uuid] = 1;
            c1.push(ds)
        }
    }

    function aZ(dr) {
        if (avalon.optimize) {
            return
        }
        var dt = c1.length;
        var e = dt;
        var du = [];
        var ds = {};
        var dx = {};
        while (dr = c1[--dt]) {
            var dw = dr.type;
            if (dx[dw]) {
                dx[dw]++
            } else {
                dx[dw] = 1;
                du.push(dw)
            }
        }
        var dy = false;
        du.forEach(function (dA) {
            if (aL[dA] !== dx[dA]) {
                ds[dA] = 1;
                dy = true
            }
        });
        dt = e;
        if (dy) {
            while (dr = c1[--dt]) {
                if (!dr.element) {
                    continue
                }
                if (ds[dr.type] && g(dr.element)) {
                    c1.splice(dt, 1);
                    delete c1[dr.uuid];
                    delete bO[dr.element.uuid];
                    var dz = dr.lists;
                    for (var ap = 0, dv; dv = dz[ap++];) {
                        avalon.Array.remove(dz, dv);
                        avalon.Array.remove(dv, dr)
                    }
                    bT(dr)
                }
            }
        }
        aL = dx;
        b3 = new Date()
    }

    function bT(ap) {
        ap.element = null;
        ap.rollback && ap.rollback();
        for (var e in ap) {
            ap[e] = null
        }
    }

    function g(ap) {
        try {
            if (!ap.parentNode) {
                return true
            }
        } catch (dr) {
            return true
        }
        return ap.msRetain ? 0 : (ap.nodeType === 1 ? !c2.contains(ap) : !avalon.contains(c2, ap))
    }

    var by = {
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table>", "</table>"],
        td: [3, "<table><tr>", "</tr></table>"],
        g: [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', "</svg>"],
        _default: aR ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    by.th = by.td;
    by.optgroup = by.option;
    by.tbody = by.tfoot = by.colgroup = by.caption = by.thead;
    String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(bR, function (e) {
        by[e] = by.g
    });
    var w = /<([\w:]+)/;
    var c8 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
    var bS = aR ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/ig;
    var cW = dh(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"]);
    var bV = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/;
    var bK = cy.createElement("script");
    var Z = /<|&#?\w+;/;
    avalon.parseHTML = function (dv) {
        var dx = ce.cloneNode(false);
        if (typeof dv !== "string") {
            return dx
        }
        if (!Z.test(dv)) {
            dx.appendChild(cy.createTextNode(dv));
            return dx
        }
        dv = dv.replace(c8, "<$1></$2>").trim();
        var dA = (w.exec(dv) || ["", ""])[1].toLowerCase(), ap = by[dA] || by._default, e = de, dy, dz;
        if (!aR) {
            dv = dv.replace(bS, "<br class=msNoScope>$1")
        }
        e.innerHTML = ap[1] + dv + ap[2];
        var dt = e.getElementsByTagName("script");
        if (dt.length) {
            for (var du = 0, dr; dr = dt[du++];) {
                if (cW[dr.type]) {
                    dz = bK.cloneNode(false);
                    cQ.forEach.call(dr.attributes, function (dB) {
                        if (dB && dB.specified) {
                            dz[dB.name] = dB.value;
                            dz.setAttribute(dB.name, dB.value)
                        }
                    });
                    dz.text = dr.text;
                    dr.parentNode.replaceChild(dz, dr)
                }
            }
        }
        if (!aR) {
            var dw = ap[1] === "X<div>" ? e.lastChild.firstChild : e.lastChild;
            if (dw && dw.tagName === "TABLE" && dA !== "tbody") {
                for (dt = dw.childNodes, du = 0; dr = dt[du++];) {
                    if (dr.tagName === "TBODY" && !dr.innerHTML) {
                        dw.removeChild(dr);
                        break
                    }
                }
            }
            dt = e.getElementsByTagName("br");
            var ds = dt.length;
            while (dr = dt[--ds]) {
                if (dr.className === "msNoScope") {
                    dr.parentNode.removeChild(dr)
                }
            }
            for (dt = e.all, du = 0; dr = dt[du++];) {
                if (y(dr)) {
                    a6(dr)
                }
            }
        }
        for (du = ap[0]; du--; e = e.lastChild) {
        }
        while (dy = e.firstChild) {
            dx.appendChild(dy)
        }
        return dx
    };
    function y(e) {
        var ap = e.nodeName;
        return ap.toLowerCase() === ap && e.scopeName && e.outerText === ""
    }

    function a6(e) {
        if (e.currentStyle.behavior !== "url(#default#VML)") {
            e.style.behavior = "url(#default#VML)";
            e.style.display = "inline-block";
            e.style.zoom = 1
        }
    }

    avalon.innerHTML = function (ds, dr) {
        if (!aR && (!bS.test(dr) && !bV.test(dr))) {
            try {
                ds.innerHTML = dr;
                return
            } catch (dt) {
            }
        }
        var ap = this.parseHTML(dr);
        this.clearHTML(ds).appendChild(ap)
    };
    avalon.clearHTML = function (e) {
        e.textContent = "";
        while (e.firstChild) {
            e.removeChild(e.firstChild)
        }
        return e
    };
    function bu(e) {
        return e.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
    }

    function m(e) {
        if (!e || e.indexOf("-") < 0 && e.indexOf("_") < 0) {
            return e
        }
        return e.replace(/[-_][^-_]/g, function (ap) {
            return ap.charAt(1).toUpperCase()
        })
    }

    var X = {
        _toString: function () {
            var ap = this.node;
            var e = ap.className;
            var dr = typeof e === "string" ? e : e.baseVal;
            return dr.split(/\s+/).join(" ")
        }, _contains: function (e) {
            return (" " + this + " ").indexOf(" " + e + " ") > -1
        }, _add: function (e) {
            if (!this.contains(e)) {
                this._set(this + " " + e)
            }
        }, _remove: function (e) {
            this._set((" " + this + " ").replace(" " + e + " ", " "))
        }, __set: function (e) {
            e = e.trim();
            var ap = this.node;
            if (aw.test(ap)) {
                ap.setAttribute("class", e)
            } else {
                ap.className = e
            }
        }
    };

    function bn(ap) {
        if (!("classList" in ap)) {
            ap.classList = {node: ap};
            for (var e in X) {
                ap.classList[e.slice(1)] = X[e]
            }
        }
        return ap.classList
    }

    "add,remove".replace(bR, function (e) {
        avalon.fn[e + "Class"] = function (ap) {
            var dr = this[0];
            if (ap && typeof ap === "string" && dr && dr.nodeType === 1) {
                ap.replace(/\S+/g, function (ds) {
                    bn(dr)[e](ds)
                })
            }
            return this
        }
    });
    avalon.fn.mix({
        hasClass: function (e) {
            var ap = this[0] || {};
            return ap.nodeType === 1 && bn(ap).contains(e)
        }, toggleClass: function (du, dr) {
            var ds, ap = 0;
            var dv = String(du).split(/\s+/);
            var e = typeof dr === "boolean";
            while ((ds = dv[ap++])) {
                var dt = e ? dr : !this.hasClass(ds);
                this[dt ? "addClass" : "removeClass"](ds)
            }
            return this
        }, attr: function (e, ap) {
            if (arguments.length === 2) {
                this[0].setAttribute(e, ap);
                return this
            } else {
                return this[0].getAttribute(e)
            }
        }, data: function (ap, dr) {
            ap = "data-" + bu(ap || "");
            switch (arguments.length) {
                case 2:
                    this.attr(ap, dr);
                    return this;
                case 1:
                    var ds = this.attr(ap);
                    return db(ds);
                case 0:
                    var e = {};
                    cQ.forEach.call(this[0].attributes, function (dt) {
                        if (dt) {
                            ap = dt.name;
                            if (!ap.indexOf("data-")) {
                                ap = m(ap.slice(5));
                                e[ap] = db(dt.value)
                            }
                        }
                    });
                    return e
            }
        }, removeData: function (e) {
            e = "data-" + bu(e);
            this[0].removeAttribute(e);
            return this
        }, css: function (ap, ds) {
            if (avalon.isPlainObject(ap)) {
                for (var dr in ap) {
                    avalon.css(this, dr, ap[dr])
                }
            } else {
                var e = avalon.css(this, ap, ds)
            }
            return e !== void 0 ? e : this
        }, position: function () {
            var dr, ds, ap = this[0], e = {top: 0, left: 0};
            if (!ap) {
                return
            }
            if (this.css("position") === "fixed") {
                ds = ap.getBoundingClientRect()
            } else {
                dr = this.offsetParent();
                ds = this.offset();
                if (dr[0].tagName !== "HTML") {
                    e = dr.offset()
                }
                e.top += avalon.css(dr[0], "borderTopWidth", true);
                e.left += avalon.css(dr[0], "borderLeftWidth", true);
                e.top -= dr.scrollTop();
                e.left -= dr.scrollLeft()
            }
            return {
                top: ds.top - e.top - avalon.css(ap, "marginTop", true),
                left: ds.left - e.left - avalon.css(ap, "marginLeft", true)
            }
        }, offsetParent: function () {
            var e = this[0].offsetParent;
            while (e && avalon.css(e, "position") === "static") {
                e = e.offsetParent
            }
            return avalon(e || c2)
        }, bind: function (dr, ap, e) {
            if (this[0]) {
                return avalon.bind(this[0], dr, ap, e)
            }
        }, unbind: function (dr, ap, e) {
            if (this[0]) {
                avalon.unbind(this[0], dr, ap, e)
            }
            return this
        }, val: function (dt) {
            var ds = this[0];
            if (ds && ds.nodeType === 1) {
                var ap = arguments.length === 0;
                var e = ap ? ":get" : ":set";
                var dr = aS[c4(ds) + e];
                if (dr) {
                    var du = dr(ds, dt)
                } else {
                    if (ap) {
                        return (ds.value || "").replace(/\r/g, "")
                    } else {
                        ds.value = dt
                    }
                }
            }
            return ap ? du : this
        }
    });
    function db(ap) {
        try {
            if (typeof ap === "object") {
                return ap
            }
            ap = ap === "true" ? true : ap === "false" ? false : ap === "null" ? null : +ap + "" === ap ? +ap : cv.test(ap) ? avalon.parseJSON(ap) : ap
        } catch (dr) {
        }
        return ap
    }

    var cv = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, ch = /^[\],:{}\s]*$/, ck = /(?:^|:|,)(?:\s*\[)+/g, cG = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, bX = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
    avalon.parseJSON = b5.JSON ? JSON.parse : function (e) {
        if (typeof e === "string") {
            e = e.trim();
            if (e) {
                if (ch.test(e.replace(cG, "@").replace(bX, "]").replace(ck, ""))) {
                    return (new Function("return " + e))()
                }
            }
            avalon.error("Invalid JSON: " + e)
        }
        return e
    };
    avalon.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (ap, e) {
        avalon.fn[ap] = function (du) {
            var dr = this[0] || {}, dt = cr(dr), ds = ap === "scrollTop";
            if (!arguments.length) {
                return dt ? (e in dt) ? dt[e] : c2[ap] : dr[ap]
            } else {
                if (dt) {
                    dt.scrollTo(!ds ? du : avalon(dt).scrollLeft(), ds ? du : avalon(dt).scrollTop())
                } else {
                    dr[ap] = du
                }
            }
        }
    });
    function cr(e) {
        return e.window && e.document ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }

    var x = avalon.cssHooks = {};
    var bC = ["", "-webkit-", "-o-", "-moz-", "-ms-"];
    var bU = {"float": aR ? "cssFloat" : "styleFloat"};
    avalon.cssNumber = dh("columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom");
    avalon.cssName = function (e, ds, dr) {
        if (bU[e]) {
            return bU[e]
        }
        ds = ds || c2.style;
        for (var ap = 0, dt = bC.length; ap < dt; ap++) {
            dr = m(bC[ap] + e);
            if (dr in ds) {
                return (bU[e] = dr)
            }
        }
        return null
    };
    x["@:set"] = function (dr, ap, ds) {
        try {
            dr.style[ap] = ds
        } catch (dt) {
        }
    };
    if (b5.getComputedStyle) {
        x["@:get"] = function (ds, ap) {
            if (!ds || !ds.style) {
                throw new Error("getComputedStyle要求传入一个节点 " + ds)
            }
            var e, dr = getComputedStyle(ds, null);
            if (dr) {
                e = ap === "filter" ? dr.getPropertyValue(ap) : dr[ap];
                if (e === "") {
                    e = ds.style[ap]
                }
            }
            return e
        };
        x["opacity:get"] = function (ap) {
            var e = x["@:get"](ap, "opacity");
            return e === "" ? "1" : e
        }
    } else {
        var at = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i;
        var cm = /^(top|right|bottom|left)$/;
        var cg = /alpha\([^)]*\)/i;
        var W = !!b5.XDomainRequest;
        var dp = "DXImageTransform.Microsoft.Alpha";
        var ah = {thin: W ? "1px" : "2px", medium: W ? "3px" : "4px", thick: W ? "5px" : "6px"};
        x["@:get"] = function (du, ds) {
            var dr = du.currentStyle;
            var ap = dr[ds];
            if ((at.test(ap) && !cm.test(ap))) {
                var dt = du.style, dv = dt.left, e = du.runtimeStyle.left;
                du.runtimeStyle.left = dr.left;
                dt.left = ds === "fontSize" ? "1em" : (ap || 0);
                ap = dt.pixelLeft + "px";
                dt.left = dv;
                du.runtimeStyle.left = e
            }
            if (ap === "medium") {
                ds = ds.replace("Width", "Style");
                if (dr[ds] === "none") {
                    ap = "0px"
                }
            }
            return ap === "" ? "auto" : ah[ap] || ap
        };
        x["opacity:set"] = function (dt, ap, du) {
            var ds = dt.style;
            var e = isFinite(du) && du <= 1 ? "alpha(opacity=" + du * 100 + ")" : "";
            var dr = ds.filter || "";
            ds.zoom = 1;
            ds.filter = (cg.test(dr) ? dr.replace(cg, e) : dr + " " + e).trim();
            if (!ds.filter) {
                ds.removeAttribute("filter")
            }
        };
        x["opacity:get"] = function (e) {
            var ap = e.filters.alpha || e.filters[dp], dr = ap && ap.enabled ? ap.opacity : 100;
            return (dr / 100) + ""
        }
    }
    "top,left".replace(bR, function (e) {
        x[e + ":get"] = function (dr) {
            var ap = x["@:get"](dr, e);
            return /px$/.test(ap) ? ap : avalon(dr).position()[e] + "px"
        }
    });
    var cc = {position: "absolute", visibility: "hidden", display: "block"};
    var V = /^(none|table(?!-c[ea]).+)/;

    function ab(dr, dt) {
        if (dr.offsetWidth <= 0) {
            if (V.test(x["@:get"](dr, "display"))) {
                var ds = {node: dr};
                for (var e in cc) {
                    ds[e] = dr.style[e];
                    dr.style[e] = cc[e]
                }
                dt.push(ds)
            }
            var ap = dr.parentNode;
            if (ap && ap.nodeType === 1) {
                ab(ap, dt)
            }
        }
    }

    "Width,Height".replace(bR, function (dr) {
        var dt = dr.toLowerCase(), ap = "client" + dr, e = "scroll" + dr, ds = "offset" + dr;
        x[dt + ":get"] = function (dw, dx, dv) {
            var dy = -4;
            if (typeof dv === "number") {
                dy = dv
            }
            dx = dr === "Width" ? ["Left", "Right"] : ["Top", "Bottom"];
            var du = dw[ds];
            if (dy === 2) {
                return du + avalon.css(dw, "margin" + dx[0], true) + avalon.css(dw, "margin" + dx[1], true)
            }
            if (dy < 0) {
                du = du - avalon.css(dw, "border" + dx[0] + "Width", true) - avalon.css(dw, "border" + dx[1] + "Width", true)
            }
            if (dy === -4) {
                du = du - avalon.css(dw, "padding" + dx[0], true) - avalon.css(dw, "padding" + dx[1], true)
            }
            return du
        };
        x[dt + "&get"] = function (dv) {
            var dw = [];
            ab(dv, dw);
            var dy = x[dt + ":get"](dv);
            for (var du = 0, dx; dx = dw[du++];) {
                dv = dx.node;
                for (var dz in dx) {
                    if (typeof dx[dz] === "string") {
                        dv.style[dz] = dx[dz]
                    }
                }
            }
            return dy
        };
        avalon.fn[dt] = function (dv) {
            var du = this[0];
            if (arguments.length === 0) {
                if (du.setTimeout) {
                    return du["inner" + dr] || du.document.documentElement[ap]
                }
                if (du.nodeType === 9) {
                    var dw = du.documentElement;
                    return Math.max(du.body[e], dw[e], du.body[ds], dw[ds], dw[ap])
                }
                return x[dt + "&get"](du)
            } else {
                return this.css(dt, dv)
            }
        };
        avalon.fn["inner" + dr] = function () {
            return x[dt + ":get"](this[0], void 0, -2)
        };
        avalon.fn["outer" + dr] = function (du) {
            return x[dt + ":get"](this[0], void 0, du === true ? 2 : 0)
        }
    });
    avalon.fn.offset = function () {
        var ap = this[0], dt = {left: 0, top: 0};
        if (!ap || !ap.tagName || !ap.ownerDocument) {
            return dt
        }
        var dy = ap.ownerDocument, du = dy.body, dx = dy.documentElement, dv = dy.defaultView || dy.parentWindow;
        if (!avalon.contains(dx, ap)) {
            return dt
        }
        if (ap.getBoundingClientRect) {
            dt = ap.getBoundingClientRect()
        }
        var ds = dx.clientTop || du.clientTop, dw = dx.clientLeft || du.clientLeft, e = Math.max(dv.pageYOffset || 0, dx.scrollTop, du.scrollTop), dr = Math.max(dv.pageXOffset || 0, dx.scrollLeft, du.scrollLeft);
        return {top: dt.top + e - ds, left: dt.left + dr - dw}
    };
    function c4(ap) {
        var e = ap.tagName.toLowerCase();
        return e === "input" && /checkbox|radio/.test(ap.type) ? "checked" : e
    }

    var cU = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i;
    var aS = {
        "option:get": b0 ? function (e) {
            return cU.test(e.outerHTML) ? e.value : e.text.trim()
        } : function (e) {
            return e.value
        }, "select:get": function (e, dw) {
            var dr, dy = e.options, dt = e.selectedIndex, du = aS["option:get"], ds = e.type === "select-one" || dt < 0, dx = ds ? null : [], dv = ds ? dt + 1 : dy.length, ap = dt < 0 ? dv : ds ? dt : 0;
            for (; ap < dv; ap++) {
                dr = dy[ap];
                if ((dr.selected || ap === dt) && !dr.disabled) {
                    dw = du(dr);
                    if (ds) {
                        return dw
                    }
                    dx.push(dw)
                }
            }
            return dx
        }, "select:set": function (dt, ap, du) {
            ap = [].concat(ap);
            var e = aS["option:get"];
            for (var dr = 0, ds; ds = dt.options[dr++];) {
                if ((ds.selected = ap.indexOf(e(ds)) > -1)) {
                    du = true
                }
            }
            if (!du) {
                dt.selectedIndex = -1
            }
        }
    };
    var bA = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
    var av = b5.JSON && JSON.stringify || function (e) {
            return '"' + e.replace(/[\\\"\x00-\x1f]/g, function (ap) {
                    var dr = bA[ap];
                    return typeof dr === "string" ? dr : "\\u" + ("0000" + ap.charCodeAt(0).toString(16)).slice(-4)
                }) + '"'
        };
    var F = ["break,case,catch,continue,debugger,default,delete,do,else,false", "finally,for,function,if,in,instanceof,new,null,return,switch,this", "throw,true,try,typeof,var,void,while,with", "abstract,boolean,byte,char,class,const,double,enum,export,extends", "final,float,goto,implements,import,int,interface,long,native", "package,private,protected,public,short,static,super,synchronized", "throws,transient,volatile", "arguments,let,yield,undefined"].join(",");
    var c3 = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g;
    var aY = /[^\w$]+/g;
    var aj = new RegExp(["\\b" + F.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g");
    var k = /\b\d[^,]*/g;
    var df = /^,+|,+$/g;
    var cq = new h(512);
    var aF = function (ds) {
        var dr = "," + ds.trim();
        var ap = cq.get(dr);
        if (ap) {
            return ap
        }
        var e = ds.replace(c3, "").replace(aY, ",").replace(aj, "").replace(k, "").replace(df, "").split(/^$|,+/);
        return cq.put(dr, cZ(e))
    };

    function bM(dv, ds, ap, du) {
        var e = [], dt = " = " + ap + ".";
        for (var dr = dv.length, dw; dw = dv[--dr];) {
            if (ds.hasOwnProperty(dw)) {
                e.push(dw + dt + dw);
                du.vars.push(dw);
                if (du.type === "duplex") {
                    dv.get = ap + "." + dw
                }
                dv.splice(dr, 1)
            }
        }
        return e
    }

    function cZ(du) {
        var e = [], ds = {};
        for (var ap = 0; ap < du.length; ap++) {
            var dr = du[ap];
            var dt = dr && typeof dr.$id === "string" ? dr.$id : dr;
            if (!ds[dt]) {
                ds[dt] = e.push(dr)
            }
        }
        return e
    }

    var bk = new h(128);
    var c = /\w\[.*\]|\w\.\w/;
    var di = /(\$proxy\$[a-z]+)\d+$/;
    var aO = /\)\s*$/;
    var bG = /\)\s*\|/g;
    var j = /\|\s*([$\w]+)/g;
    var b6 = /"\s*\["/g;
    var I = /"\s*\(/g;

    function q(ap, e) {
        e = e.replace(aO, "").replace(bG, function () {
                return "],|"
            }).replace(j, function (ds, dr) {
                return "[" + av(dr)
            }).replace(b6, function () {
                return '"],["'
            }).replace(I, function () {
                return '",'
            }) + "]";
        return "return avalon.filters.$filter(" + ap + ", " + e + ")"
    }

    function cb(ap, dz, dI) {
        var dA = dI.type;
        var du = dI.filters || "";
        var dH = dz.map(function (e) {
                return String(e.$id).replace(di, "$1")
            }) + ap + dA + du;
        var dx = aF(ap).concat(), dv = [], dw = [], ds = [], dB = "";
        dz = cZ(dz);
        dI.vars = [];
        for (var dD = 0, dF = dz.length; dD < dF; dD++) {
            if (dx.length) {
                var dJ = "vm" + aI + "_" + dD;
                dw.push(dJ);
                ds.push(dz[dD]);
                dv.push.apply(dv, bM(dx, dz[dD], dJ, dI))
            }
        }
        if (!dv.length && dA === "duplex") {
            return
        }
        if (dA !== "duplex" && (ap.indexOf("||") > -1 || ap.indexOf("&&") > -1)) {
            dI.vars.forEach(function (e) {
                var dK = new RegExp("\\b" + e + "(?:\\.\\w+|\\[\\w+\\])+", "ig");
                ap = ap.replace(dK, function (dM, dN) {
                    var dS = dM.charAt(e.length);
                    var dP = ap.slice(dN + dM.length);
                    var dR = /^\s*\(/.test(dP);
                    if (dS === "." || dS === "[" || dR) {
                        var dL = "var" + String(Math.random()).replace(/^0\./, "");
                        if (dR) {
                            var dQ = dM.split(".");
                            if (dQ.length > 2) {
                                var dO = dQ.pop();
                                dv.push(dL + " = " + dQ.join("."));
                                return dL + "." + dO
                            } else {
                                return dM
                            }
                        }
                        dv.push(dL + " = " + dM);
                        return dL
                    } else {
                        return dM
                    }
                })
            })
        }
        dI.args = ds;
        delete dI.vars;
        var dt = bk.get(dH);
        if (dt) {
            dI.evaluator = dt;
            return
        }
        dB = dv.join(", ");
        if (dB) {
            dB = "var " + dB
        }
        if (/\S/.test(du)) {
            if (!/text|html/.test(dI.type)) {
                throw Error("ms-" + dI.type + "不支持过滤器")
            }
            ap = "\nvar ret" + aI + " = " + ap + ";\r\n";
            ap += q("ret" + aI, du)
        } else {
            if (dA === "duplex") {
                var dr = "'use strict';\nreturn function(vvv){\n\t" + dB + ";\n\tif(!arguments.length){\n\t\treturn " + ap + "\n\t}\n\t" + (!c.test(ap) ? dx.get : ap) + "= vvv;\n} ";
                try {
                    dt = Function.apply(l, dw.concat(dr));
                    dI.evaluator = bk.put(dH, dt)
                } catch (dG) {
                    cp("debug: parse error," + dG.message)
                }
                return
            } else {
                if (dA === "on") {
                    if (ap.indexOf("(") === -1) {
                        ap += ".call(this, $event)"
                    } else {
                        ap = ap.replace("(", ".call(this,")
                    }
                    dw.push("$event");
                    ap = "\nreturn " + ap + ";";
                    var dE = ap.lastIndexOf("\nreturn");
                    var dC = ap.slice(0, dE);
                    var dy = ap.slice(dE);
                    ap = dC + "\n" + dy
                } else {
                    ap = "\nreturn " + ap + ";"
                }
            }
        }
        try {
            dt = Function.apply(l, dw.concat("'use strict';\n" + dB + ap));
            dI.evaluator = bk.put(dH, dt)
        } catch (dG) {
            cp("debug: parse error," + dG.message)
        } finally {
            dx = dv = dw = null
        }
    }

    function ay(ap) {
        var e = an.test(ap);
        if (e) {
            var dr = cM(ap);
            if (dr.length === 1) {
                return dr[0].value
            }
            return dr.map(function (ds) {
                return ds.expr ? "(" + ds.value + ")" : av(ds.value)
            }).join(" + ")
        } else {
            return ap
        }
    }

    function da(ap, e, dr, ds) {
        cb(ap, e, dr);
        if (dr.evaluator && !ds) {
            dr.handler = am[dr.handlerName || dr.type];
            avalon.injectBinding(dr)
        }
    }

    avalon.parseExprProxy = da;
    avalon.scan = function (ap, dr) {
        ap = ap || c2;
        var e = dr ? [].concat(dr) : [];
        bz(ap, e)
    };
    var a8 = dh("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase());

    function f(e, ds, dr) {
        var ap = setTimeout(function () {
            var dt = e.innerHTML;
            clearTimeout(ap);
            if (dt === dr) {
                ds()
            } else {
                f(e, ds, dt)
            }
        })
    }

    function U(e, ap) {
        var dr = e.getAttribute("avalonctrl") || ap.$id;
        e.setAttribute("avalonctrl", dr);
        ap.$events.expr = e.tagName + '[avalonctrl="' + dr + '"]'
    }

    var aV = function (dt, ap, e) {
        var du = dt.getAttribute(ap);
        if (du) {
            for (var dr = 0, ds; ds = e[dr++];) {
                if (ds.hasOwnProperty(du) && typeof ds[du] === "function") {
                    return ds[du]
                }
            }
        }
    };

    function cO(ds, e) {
        for (var ap = 0, dr; dr = ds[ap++];) {
            dr.vmodels = e;
            dg[dr.type](dr, e);
            if (dr.evaluator && dr.element && dr.element.nodeType === 1) {
                dr.element.removeAttribute(dr.name)
            }
        }
        ds.length = 0
    }

    var a3 = b0 && b5.MutationObserver ? function (dr) {
        var ap = dr.firstChild, ds;
        while (ap) {
            var e = ap.nextSibling;
            if (ap.nodeType === 3) {
                if (ds) {
                    ds.nodeValue += ap.nodeValue;
                    dr.removeChild(ap)
                } else {
                    ds = ap
                }
            } else {
                ds = null
            }
            ap = e
        }
    } : 0;
    var aC = /^\s*::/;
    var a0 = /ms-(\w+)-?(.*)/;
    var S = {"if": 10, repeat: 90, data: 100, widget: 110, each: 1400, "with": 1500, duplex: 2000, on: 3000};
    var dd = dh("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit");
    var cx = dh("value,title,alt,checked,selected,disabled,readonly,enabled");

    function L(ap, e) {
        return ap.priority - e.priority
    }

    function b4(dE, dD, dv) {
        var ap = true;
        if (dD.length) {
            var dw = O ? O(dE) : dE.attributes;
            var dG = [];
            var dF = [];
            var dy = {};
            for (var dC = 0, dB; dB = dw[dC++];) {
                if (dB.specified) {
                    if (dv = dB.name.match(a0)) {
                        var ds = dv[1];
                        var dt = dv[2] || "";
                        var dA = dB.value;
                        var dH = dB.name;
                        if (dd[ds]) {
                            dt = ds;
                            ds = "on"
                        } else {
                            if (cx[ds]) {
                                if (ds === "enabled") {
                                    cp("warning!ms-enabled或ms-attr-enabled已经被废弃");
                                    ds = "disabled";
                                    dA = "!(" + dA + ")"
                                }
                                dt = ds;
                                ds = "attr";
                                dH = "ms-" + ds + "-" + dt;
                                dF.push([dB.name, dH, dA])
                            }
                        }
                        dy[dH] = dA;
                        if (typeof dg[ds] === "function") {
                            var dx = dA.replace(aC, "");
                            var dr = dA !== dx;
                            var dz = {
                                type: ds,
                                param: dt,
                                element: dE,
                                name: dH,
                                value: dx,
                                oneTime: dr,
                                uuid: dH + "-" + N(dE),
                                priority: (S[ds] || ds.charCodeAt(0) * 10) + (Number(dt.replace(/\D/g, "")) || 0)
                            };
                            if (ds === "html" || ds === "text") {
                                var du = p(dA);
                                avalon.mix(dz, du);
                                dz.filters = dz.filters.replace(dk, function () {
                                    dz.type = "html";
                                    dz.group = 1;
                                    return ""
                                })
                            } else {
                                if (ds === "duplex") {
                                    var e = dH
                                } else {
                                    if (dH === "ms-if-loop") {
                                        dz.priority += 100
                                    }
                                }
                            }
                            dG.push(dz);
                            if (ds === "widget") {
                                dE.msData = dE.msData || dy
                            }
                        }
                    }
                }
            }
            if (dG.length) {
                dG.sort(L);
                dF.forEach(function (dI) {
                    cp("warning!请改用" + dI[1] + "代替" + dI[0] + "!");
                    dE.removeAttribute(dI[0]);
                    dE.setAttribute(dI[1], dI[2])
                });
                if (e) {
                    if (dy["ms-attr-checked"]) {
                        cp("warning!一个控件不能同时定义ms-attr-checked与" + e)
                    }
                    if (dy["ms-attr-value"]) {
                        cp("warning!一个控件不能同时定义ms-attr-value与" + e)
                    }
                }
                for (dC = 0; dz = dG[dC]; dC++) {
                    ds = dz.type;
                    if (bj.test(ds)) {
                        return cO(dG.slice(0, dC + 1), dD)
                    } else {
                        if (ap) {
                            ap = !dc.test(ds)
                        }
                    }
                }
                cO(dG, dD)
            }
        }
        if (ap && !a8[dE.tagName] && a7.test(dE.innerHTML.replace(c6, "<").replace(au, ">"))) {
            a3 && a3(dE);
            aN(dE, dD)
        }
    }

    var bj = /^if|widget|repeat$/;
    var dc = /^each|with|html|include$/;
    if (!"1"[0]) {
        var cJ = new h(512);
        var bF = /\s+(ms-[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g, b7 = /^['"]/, bo = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/i, T = /&amp;/g;
        var O = function (ap) {
            var dt = ap.outerHTML;
            if (dt.slice(0, 2) === "</" || !dt.trim()) {
                return []
            }
            var dx = dt.match(bo)[0];
            var ds = [], du, dr, dy;
            var dv = cJ.get(dx);
            if (dv) {
                return dv
            }
            while (dr = bF.exec(dx)) {
                dy = dr[2];
                if (dy) {
                    dy = (b7.test(dy) ? dy.slice(1, -1) : dy).replace(T, "&")
                }
                var e = dr[1].toLowerCase();
                du = e.match(a0);
                var dw = {name: e, specified: true, value: dy || ""};
                ds.push(dw)
            }
            return cJ.put(dx, ds)
        }
    }
    function aN(dr, ap) {
        var e = avalon.slice(dr.childNodes);
        aT(e, ap)
    }

    function aT(e, ap) {
        for (var dr = 0, ds; ds = e[dr++];) {
            switch (ds.nodeType) {
                case 1:
                    bz(ds, ap);
                    if (ds.msCallback) {
                        ds.msCallback();
                        ds.msCallback = void 0
                    }
                    break;
                case 3:
                    if (an.test(ds.nodeValue)) {
                        D(ds, ap, dr)
                    }
                    break
            }
        }
    }

    function bz(du, ds, dt) {
        var ap = du.getAttribute("ms-skip");
        if (!du.getAttributeNode) {
            return cp("warning " + du.tagName + " no getAttributeNode method")
        }
        var e = du.getAttributeNode("ms-important");
        var dw = du.getAttributeNode("ms-controller");
        if (typeof ap === "string") {
            return
        } else {
            if (dt = e || dw) {
                var dv = avalon.vmodels[dt.value];
                if (!dv) {
                    return
                }
                ds = dt === e ? [dv] : [dv].concat(ds);
                var dr = dt.name;
                du.removeAttribute(dr);
                avalon(du).removeClass(dr);
                U(du, dv)
            }
        }
        b4(du, ds)
    }

    var dk = /\|\s*html(?:\b|$)/, bw = /\|\|/g, c6 = /&lt;/g, au = /&gt;/g, a5 = /(['"])(\\\1|.)+?\1/g;

    function p(dr) {
        if (dr.indexOf("|") > 0) {
            var e = dr.replace(a5, function (ds) {
                return Array(ds.length + 1).join("1")
            });
            var ap = e.replace(bw, "\u1122\u3344").indexOf("|");
            if (ap > -1) {
                return {filters: dr.slice(ap), value: dr.slice(0, ap), expr: true}
            }
        }
        return {value: dr, filters: "", expr: true}
    }

    function cM(ds) {
        var dr = [], ap, dt = 0, e;
        do {
            e = ds.indexOf(cC, dt);
            if (e === -1) {
                break
            }
            ap = ds.slice(dt, e);
            if (ap) {
                dr.push({value: ap, filters: "", expr: false})
            }
            dt = e + cC.length;
            e = ds.indexOf(bm, dt);
            if (e === -1) {
                break
            }
            ap = ds.slice(dt, e);
            if (ap) {
                dr.push(p(ap, dt))
            }
            dt = e + bm.length
        } while (1);
        ap = ds.slice(dt);
        if (ap) {
            dr.push({value: ap, expr: false, filters: ""})
        }
        return dr
    }

    function D(dt, ap, e) {
        var du = [];
        tokens = cM(dt.data);
        if (tokens.length) {
            for (var dr = 0; token = tokens[dr++];) {
                var ds = cy.createTextNode(token.value);
                if (token.expr) {
                    token.value = token.value.replace(aC, function () {
                        token.oneTime = true;
                        return ""
                    });
                    token.type = "text";
                    token.element = ds;
                    token.filters = token.filters.replace(dk, function (dw, dv, dx) {
                        token.type = "html";
                        return ""
                    });
                    token.pos = e * 1000 + dr;
                    du.push(token)
                }
                ce.appendChild(ds)
            }
            dt.parentNode.replaceChild(ce, dt);
            if (du.length) {
                cO(du, ap)
            }
        }
    }

    var cR = ["autofocus,autoplay,async,allowTransparency,checked,controls", "declare,disabled,defer,defaultChecked,defaultSelected", "contentEditable,isMap,loop,multiple,noHref,noResize,noShade", "open,readOnly,selected"].join(",");
    var A = {};
    cR.replace(bR, function (e) {
        A[e.toLowerCase()] = e
    });
    var bh = {
        "accept-charset": "acceptCharset",
        "char": "ch",
        charoff: "chOff",
        "class": "className",
        "for": "htmlFor",
        "http-equiv": "httpEquiv"
    };
    var i = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan", "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight", "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"].join(",");
    i.replace(bR, function (e) {
        bh[e.toLowerCase()] = e
    });
    var aQ = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/img;
    var a4 = /<noscript.*?>([\s\S]+?)<\/noscript>/im;
    var aB = function () {
        return new (b5.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP")
    };
    var aW = avalon.templateCache = {};
    dg.attr = function (dt, e) {
        var ds = ay(dt.value.trim());
        if (dt.type === "include") {
            var dr = dt.element;
            dt.includeRendered = aV(dr, "data-include-rendered", e);
            dt.includeLoaded = aV(dr, "data-include-loaded", e);
            var ap = dt.includeReplace = !!avalon(dr).data("includeReplace");
            if (avalon(dr).data("includeCache")) {
                dt.templateCache = {}
            }
            dt.startInclude = cy.createComment("ms-include");
            dt.endInclude = cy.createComment("ms-include-end");
            if (ap) {
                dt.element = dt.startInclude;
                dr.parentNode.insertBefore(dt.startInclude, dr);
                dr.parentNode.insertBefore(dt.endInclude, dr.nextSibling)
            } else {
                dr.insertBefore(dt.startInclude, dr.firstChild);
                dr.appendChild(dt.endInclude)
            }
        }
        dt.handlerName = "attr";
        da(ds, e, dt)
    };
    am.attr = function (dL, dD, dH) {
        var dr = dH.type, dB = dH.param;
        if (dr === "css") {
            avalon(dD).css(dB, dL)
        } else {
            if (dr === "attr") {
                var dy = (dL === false) || (dL === null) || (dL === void 0);
                if (!aR && bh[dB]) {
                    dB = bh[dB]
                }
                var dv = A[dB];
                if (typeof dD[dv] === "boolean") {
                    dD[dv] = !!dL;
                    if (!dL) {
                        dy = true
                    }
                }
                if (dy) {
                    return dD.removeAttribute(dB)
                }
                var dw = aw.test(dD) ? false : (cy.namespaces && y(dD)) ? true : dB in dD.cloneNode(false);
                if (dw) {
                    dD[dB] = dL + ""
                } else {
                    dD.setAttribute(dB, dL)
                }
            } else {
                if (dr === "include" && dL) {
                    var dC = dH.vmodels;
                    var dI = dH.includeRendered;
                    var dz = dH.includeLoaded;
                    var dF = dH.includeReplace;
                    var dG = dF ? dD.parentNode : dD;
                    var dE = function (dS) {
                        if (dz) {
                            var dP = dz.apply(dG, [dS].concat(dC));
                            if (typeof dP === "string") {
                                dS = dP
                            }
                        }
                        if (dI) {
                            f(dG, function () {
                                dI.call(dG)
                            }, NaN)
                        }
                        var dQ = dH.includeLastID;
                        if (dH.templateCache && dQ && dQ !== dL) {
                            var dO = dH.templateCache[dQ];
                            if (!dO) {
                                dO = dH.templateCache[dQ] = cy.createElement("div");
                                aD.appendChild(dO)
                            }
                        }
                        dH.includeLastID = dL;
                        while (true) {
                            var dN = dH.startInclude.nextSibling;
                            if (dN && dN !== dH.endInclude) {
                                dG.removeChild(dN);
                                if (dO) {
                                    dO.appendChild(dN)
                                }
                            } else {
                                break
                            }
                        }
                        var dR = bE(dH, dL, dS);
                        var dM = avalon.slice(dR.childNodes);
                        dG.insertBefore(dR, dH.endInclude);
                        aT(dM, dC)
                    };
                    if (dH.param === "src") {
                        if (typeof aW[dL] === "string") {
                            avalon.nextTick(function () {
                                dE(aW[dL])
                            })
                        } else {
                            if (Array.isArray(aW[dL])) {
                                aW[dL].push(dE)
                            } else {
                                var dt = aB();
                                dt.onreadystatechange = function () {
                                    if (dt.readyState === 4) {
                                        var dN = dt.status;
                                        if (dN >= 200 && dN < 300 || dN === 304 || dN === 1223) {
                                            var dP = dt.responseText;
                                            for (var dO = 0, dM; dM = aW[dL][dO++];) {
                                                dM(dP)
                                            }
                                            aW[dL] = dP
                                        }
                                    }
                                };
                                aW[dL] = [dE];
                                dt.open("GET", dL, true);
                                if ("withCredentials" in dt) {
                                    dt.withCredentials = true
                                }
                                dt.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                                dt.send(null)
                            }
                        }
                    } else {
                        var ap = dL && dL.nodeType === 1 ? dL : cy.getElementById(dL);
                        if (ap) {
                            if (ap.tagName === "NOSCRIPT" && !(ap.innerHTML || ap.fixIE78)) {
                                dt = aB();
                                dt.open("GET", location, false);
                                dt.send(null);
                                var dJ = cy.getElementsByTagName("noscript");
                                var ds = (dt.responseText || "").match(aQ) || [];
                                var dx = ds.length;
                                for (var dA = 0; dA < dx; dA++) {
                                    var dK = dJ[dA];
                                    if (dK) {
                                        dK.style.display = "none";
                                        dK.fixIE78 = (ds[dA].match(a4) || ["", "&nbsp;"])[1]
                                    }
                                }
                            }
                            avalon.nextTick(function () {
                                dE(ap.fixIE78 || ap.value || ap.innerText || ap.innerHTML)
                            })
                        }
                    }
                } else {
                    if (!c2.hasAttribute && typeof dL === "string" && (dr === "src" || dr === "href")) {
                        dL = dL.replace(/&amp;/g, "&")
                    }
                    dD[dr] = dL;
                    if (b5.chrome && dD.tagName === "EMBED") {
                        var du = dD.parentNode;
                        var e = document.createComment("ms-src");
                        du.replaceChild(e, dD);
                        du.replaceChild(dD, e)
                    }
                }
            }
        }
    };
    function bE(e, du, ds) {
        var dt = e.templateCache && e.templateCache[du];
        if (dt) {
            var dr = cy.createDocumentFragment(), ap;
            while (ap = dt.firstChild) {
                dr.appendChild(ap)
            }
            return dr
        }
        return avalon.parseHTML(ds)
    }

    "title,alt,src,value,css,include,href".replace(bR, function (e) {
        dg[e] = dg.attr
    });
    dg["class"] = function (dy, dr) {
        var dt = dy.param, dD = dy.value, dv;
        dy.handlerName = "class";
        if (!dt || isFinite(dt)) {
            dy.param = "";
            var dw = dD.replace(aM, function (dE) {
                return dE.replace(/./g, "0")
            }).indexOf(":");
            if (dw === -1) {
                var dx = dD;
                dv = true
            } else {
                dx = dD.slice(0, dw);
                dv = dD.slice(dw + 1)
            }
            if (!an.test(dD)) {
                dx = av(dx)
            } else {
                dx = ay(dx)
            }
            dy.expr = "[" + dx + "," + dv + "]"
        } else {
            dy.expr = "[" + av(dt) + "," + dy.expr + "]";
            dy.oldStyle = dt
        }
        var e = dy.type;
        if (e === "hover" || e === "active") {
            if (!dy.hasBindEvent) {
                var ds = dy.element;
                var ap = avalon(ds);
                var du = "mouseenter";
                var dC = "mouseleave";
                if (e === "active") {
                    ds.tabIndex = ds.tabIndex || -1;
                    du = "mousedown";
                    dC = "mouseup";
                    var dB = ap.bind("mouseleave", function () {
                        dy.toggleClass && ap.removeClass(dy.newClass)
                    })
                }
            }
            var dA = ap.bind(du, function () {
                dy.toggleClass && ap.addClass(dy.newClass)
            });
            var dz = ap.bind(dC, function () {
                dy.toggleClass && ap.removeClass(dy.newClass)
            });
            dy.rollback = function () {
                ap.unbind("mouseleave", dB);
                ap.unbind(du, dA);
                ap.unbind(dC, dz)
            };
            dy.hasBindEvent = true
        }
        da(dy.expr, dr, dy)
    };
    am["class"] = function (e, dr, ds) {
        var ap = avalon(dr);
        ds.newClass = e[0];
        ds.toggleClass = !!e[1];
        if (ds.oldClass && ds.newClass !== ds.oldClass) {
            ap.removeClass(ds.oldClass)
        }
        ds.oldClass = ds.newClass;
        if (ds.type === "class") {
            if (ds.oldStyle) {
                ap.toggleClass(ds.oldStyle, !!e[1])
            } else {
                ap.toggleClass(ds.newClass, ds.toggleClass)
            }
        }
    };
    "hover,active".replace(bR, function (e) {
        dg[e] = dg["class"]
    });
    am.data = function (ds, ap, dr) {
        var e = "data-" + dr.param;
        if (ds && typeof ds === "object") {
            ap[e] = ds
        } else {
            ap.setAttribute(e, String(ds))
        }
    };
    var cT = dg.duplex = function (du, e) {
        var dr = du.element, dx;
        da(du.value, e, du, 1);
        du.changed = aV(dr, "data-duplex-changed", e) || l;
        if (du.evaluator && du.args) {
            var ds = [];
            var dt = dh("string,number,boolean,checked");
            if (dr.type === "radio" && du.param === "") {
                du.param = "checked"
            }
            if (dr.msData) {
                dr.msData["ms-duplex"] = du.value
            }
            du.param.replace(/\w+/g, function (dz) {
                if (/^(checkbox|radio)$/.test(dr.type) && /^(radio|checked)$/.test(dz)) {
                    if (dz === "radio") {
                        cp("ms-duplex-radio已经更名为ms-duplex-checked")
                    }
                    dz = "checked";
                    du.isChecked = true
                }
                if (dz === "bool") {
                    dz = "boolean";
                    cp("ms-duplex-bool已经更名为ms-duplex-boolean")
                } else {
                    if (dz === "text") {
                        dz = "string";
                        cp("ms-duplex-text已经更名为ms-duplex-string")
                    }
                }
                if (dt[dz]) {
                    dx = true
                }
                avalon.Array.ensure(ds, dz)
            });
            if (!dx) {
                ds.push("string")
            }
            du.param = ds.join("-");
            du.bound = function (dA, dB) {
                if (dr.addEventListener) {
                    dr.addEventListener(dA, dB, false)
                } else {
                    dr.attachEvent("on" + dA, dB)
                }
                var dz = du.rollback;
                du.rollback = function () {
                    dr.avalonSetter = null;
                    avalon.unbind(dr, dA, dB);
                    dz && dz()
                }
            };
            for (var dv in avalon.vmodels) {
                var dy = avalon.vmodels[dv];
                dy.$fire("avalon-ms-duplex-init", du)
            }
            var dw = du.pipe || (du.pipe = bc);
            dw(null, du, "init");
            var ap = dr.tagName;
            cT[ap] && cT[ap](dr, du.evaluator.apply(null, du.args), du)
        }
    };

    function ad(e) {
        return e == null ? "" : e
    }

    avalon.duplexHooks = {
        checked: {
            get: function (ap, e) {
                return !e.element.oldValue
            }
        }, string: {
            get: function (e) {
                return e
            }, set: ad
        }, "boolean": {
            get: function (e) {
                return e === "true"
            }, set: ad
        }, number: {
            get: function (ds, dr) {
                var ap = parseFloat(ds);
                if (-ds === -ap) {
                    return ap
                }
                var e = /strong|medium|weak/.exec(dr.element.getAttribute("data-duplex-number")) || ["medium"];
                switch (e[0]) {
                    case"strong":
                        return 0;
                    case"medium":
                        return ds === "" ? "" : 0;
                    case"weak":
                        return ds
                }
            }, set: ad
        }
    };
    function bc(dt, dr, ap, ds) {
        dr.param.replace(/\w+/g, function (e) {
            var du = avalon.duplexHooks[e];
            if (du && typeof du[ap] === "function") {
                dt = du[ap](dt, dr)
            }
        });
        return dt
    }

    var M, cI = [];
    avalon.tick = function (e) {
        if (cI.push(e) === 1) {
            M = setInterval(cw, 60)
        }
    };
    function cw() {
        for (var ap = cI.length - 1; ap >= 0; ap--) {
            var e = cI[ap];
            if (e() === false) {
                cI.splice(ap, 1)
            }
        }
        if (!cI.length) {
            clearInterval(M)
        }
    }

    var bg = l;
    var cV = /text|password|hidden/;
    new function () {
        try {
            var dr = {};
            var dv = HTMLInputElement.prototype;
            var dt = HTMLTextAreaElement.prototype;

            function ap(e) {
                dr[this.tagName].call(this, e);
                if (cV.test(this.type) && !this.msFocus && this.avalonSetter) {
                    this.avalonSetter()
                }
            }

            var du = HTMLInputElement.prototype;
            Object.getOwnPropertyNames(du);
            dr.INPUT = Object.getOwnPropertyDescriptor(dv, "value").set;
            Object.defineProperty(dv, "value", {set: ap});
            dr.TEXTAREA = Object.getOwnPropertyDescriptor(dt, "value").set;
            Object.defineProperty(dt, "value", {set: ap})
        } catch (ds) {
            bg = avalon.tick
        }
    };
    if (b0) {
        avalon.bind(cy, "selectionchange", function (dr) {
            var ap = cy.activeElement;
            if (ap && typeof ap.avalonSetter === "function") {
                ap.avalonSetter()
            }
        })
    }
    cT.INPUT = function (du, dv, dt) {
        var dy = du.type, dr = dt.bound, e = avalon(du), dA = false;

        function dB(dD) {
            dt.changed.call(this, dD, dt)
        }

        function ap() {
            dA = true
        }

        function dx() {
            dA = false
        }

        var dz = function () {
            if (dA) {
                return
            }
            var dE = du.oldValue = du.value;
            var dD = dt.pipe(dE, dt, "get");
            if (e.data("duplexObserve") !== false) {
                dv(dD);
                dB.call(du, dD);
                if (e.data("duplex-focus")) {
                    avalon.nextTick(function () {
                        du.focus()
                    })
                }
            }
        };
        dt.handler = function () {
            var dD = dt.pipe(dv(), dt, "set") + "";
            if (dD !== du.oldValue) {
                du.value = dD
            }
        };
        if (dt.isChecked || dy === "radio") {
            var dw = b0 === 6;
            dz = function () {
                if (e.data("duplexObserve") !== false) {
                    var dD = dt.pipe(du.value, dt, "get");
                    dv(dD);
                    dB.call(du, dD)
                }
            };
            dt.handler = function () {
                var dE = dv();
                var dD = dt.isChecked ? !!dE : dE + "" === du.value;
                du.oldValue = dD;
                if (dw) {
                    setTimeout(function () {
                        du.defaultChecked = dD;
                        du.checked = dD
                    }, 31)
                } else {
                    du.checked = dD
                }
            };
            dr("click", dz)
        } else {
            if (dy === "checkbox") {
                dz = function () {
                    if (e.data("duplexObserve") !== false) {
                        var dF = du.checked ? "ensure" : "remove";
                        var dE = dv();
                        if (!Array.isArray(dE)) {
                            cp("ms-duplex应用于checkbox上要对应一个数组");
                            dE = [dE]
                        }
                        var dD = dt.pipe(du.value, dt, "get");
                        avalon.Array[dF](dE, dD);
                        dB.call(du, dE)
                    }
                };
                dt.handler = function () {
                    var dE = [].concat(dv());
                    var dD = dt.pipe(du.value, dt, "get");
                    du.checked = dE.indexOf(dD) > -1
                };
                dr(aR ? "change" : "click", dz)
            } else {
                var dC = du.getAttribute("data-duplex-event") || "input";
                if (du.attributes["data-event"]) {
                    cp("data-event指令已经废弃，请改用data-duplex-event")
                }
                function ds(dD) {
                    setTimeout(function () {
                        dz(dD)
                    })
                }

                dC.replace(bR, function (dD) {
                    switch (dD) {
                        case"input":
                            if (!b0) {
                                dr("input", dz);
                                dr("compositionstart", ap);
                                dr("compositionend", dx);
                                dr("DOMAutoComplete", dz)
                            } else {
                                if (b0 > 8) {
                                    dr("input", dz)
                                } else {
                                    dr("propertychange", function (dE) {
                                        if (dE.propertyName === "value") {
                                            dz()
                                        }
                                    })
                                }
                                dr("dragend", ds)
                            }
                            break;
                        default:
                            dr(dD, dz);
                            break
                    }
                });
                dr("focus", function () {
                    du.msFocus = true
                });
                dr("blur", function () {
                    du.msFocus = false
                });
                if (cV.test(dy)) {
                    bg(function () {
                        if (c2.contains(du)) {
                            if (!du.msFocus && du.oldValue !== du.value) {
                                dz()
                            }
                        } else {
                            if (!du.msRetain) {
                                return false
                            }
                        }
                    })
                }
                du.avalonSetter = dz
            }
        }
        du.oldValue = du.value;
        avalon.injectBinding(dt);
        dB.call(du, du.value)
    };
    cT.TEXTAREA = cT.INPUT;
    cT.SELECT = function (dr, dt, ds) {
        var ap = avalon(dr);

        function e() {
            if (ap.data("duplexObserve") !== false) {
                var du = ap.val();
                if (Array.isArray(du)) {
                    du = du.map(function (dv) {
                        return ds.pipe(dv, ds, "get")
                    })
                } else {
                    du = ds.pipe(du, ds, "get")
                }
                if (du + "" !== dr.oldValue) {
                    dt(du)
                }
                ds.changed.call(dr, du, ds)
            }
        }

        ds.handler = function () {
            var du = dt();
            du = du && du.$model || du;
            if (Array.isArray(du)) {
                if (!dr.multiple) {
                    cp("ms-duplex在<select multiple=true>上要求对应一个数组")
                }
            } else {
                if (dr.multiple) {
                    cp("ms-duplex在<select multiple=false>不能对应一个数组")
                }
            }
            du = Array.isArray(du) ? du.map(String) : du + "";
            if (du + "" !== dr.oldValue) {
                ap.val(du);
                dr.oldValue = du + ""
            }
        };
        ds.bound("change", e);
        dr.msCallback = function () {
            avalon.injectBinding(ds);
            ds.changed.call(dr, dt(), ds)
        }
    };
    am.html = function (ap, dt, du) {
        var dx = dt.nodeType !== 1;
        var dy = dx ? dt.parentNode : dt;
        if (!dy) {
            return
        }
        ap = ap == null ? "" : ap;
        if (du.oldText !== ap) {
            du.oldText = ap
        } else {
            return
        }
        if (dt.nodeType === 3) {
            var dr = bD("html");
            dy.insertBefore(cy.createComment(dr), dt);
            du.element = cy.createComment(dr + ":end");
            dy.replaceChild(du.element, dt);
            dt = du.element
        }
        if (typeof ap !== "object") {
            var dv = avalon.parseHTML(String(ap))
        } else {
            if (ap.nodeType === 11) {
                dv = ap
            } else {
                if (ap.nodeType === 1 || ap.item) {
                    var e = ap.nodeType === 1 ? ap.childNodes : ap.item;
                    dv = ce.cloneNode(true);
                    while (e[0]) {
                        dv.appendChild(e[0])
                    }
                }
            }
        }
        e = avalon.slice(dv.childNodes);
        if (dx) {
            var dw = dt.nodeValue.slice(0, -4);
            while (true) {
                var ds = dt.previousSibling;
                if (!ds || ds.nodeType === 8 && ds.nodeValue === dw) {
                    break
                } else {
                    dy.removeChild(ds)
                }
            }
            dy.insertBefore(dv, dt)
        } else {
            avalon.clearHTML(dt).appendChild(dv)
        }
        aT(e, du.vmodels)
    };
    dg["if"] = dg.data = dg.text = dg.html = function (ap, e) {
        da(ap.value, e, ap)
    };
    am["if"] = function (du, dr, ds) {
        try {
            if (!dr.parentNode) {
                return
            }
        } catch (dt) {
            return
        }
        if (du) {
            if (dr.nodeType === 8) {
                dr.parentNode.replaceChild(ds.template, dr);
                dr = ds.element = ds.template
            }
            if (dr.getAttribute(ds.name)) {
                dr.removeAttribute(ds.name);
                b4(dr, ds.vmodels)
            }
            ds.rollback = null
        } else {
            if (dr.nodeType === 1) {
                var ap = ds.element = cy.createComment("ms-if");
                dr.parentNode.replaceChild(ap, dr);
                ds.template = dr;
                aD.appendChild(dr);
                ds.rollback = function () {
                    if (dr.parentNode === aD) {
                        aD.removeChild(dr)
                    }
                }
            }
        }
    };
    var bB = /\(([^)]*)\)/;
    dg.on = function (dt, ap) {
        var ds = dt.value;
        dt.type = "on";
        var dr = dt.param.replace(/-\d+$/, "");
        if (typeof dg.on[dr + "Hook"] === "function") {
            dg.on[dr + "Hook"](dt)
        }
        if (ds.indexOf("(") > 0 && ds.indexOf(")") > -1) {
            var e = (ds.match(bB) || ["", ""])[1].trim();
            if (e === "" || e === "$event") {
                ds = ds.replace(bB, "")
            }
        }
        da(ds, ap, dt)
    };
    am.on = function (dt, dr, ds) {
        dt = function (dv) {
            var du = ds.evaluator || l;
            return du.apply(this, ds.args.concat(dv))
        };
        var e = ds.param.replace(/-\d+$/, "");
        if (e === "scan") {
            dt.call(dr, {type: e})
        } else {
            if (typeof ds.specialBind === "function") {
                ds.specialBind(dr, dt)
            } else {
                var ap = avalon.bind(dr, e, dt)
            }
        }
        ds.rollback = function () {
            if (typeof ds.specialUnbind === "function") {
                ds.specialUnbind()
            } else {
                avalon.unbind(dr, e, ap)
            }
        }
    };
    dg.repeat = function (dK, dH) {
        var dt = dK.type;
        da(dK.value, dH, dK, 1);
        dK.proxies = [];
        var dv = false;
        try {
            var dD = dK.$repeat = dK.evaluator.apply(0, dK.args || []);
            var dw = avalon.type(dD);
            if (dw !== "object" && dw !== "array") {
                dv = true;
                avalon.log("warning:" + dK.value + "只能是对象或数组")
            } else {
                dK.xtype = dw
            }
        } catch (dI) {
            dv = true
        }
        var ap = dK.value.split(".") || [];
        if (ap.length > 1) {
            ap.pop();
            var dF = ap[0];
            for (var dG = 0, dC; dC = dH[dG++];) {
                if (dC && dC.hasOwnProperty(dF)) {
                    var ds = dC[dF].$events || {};
                    ds[cH] = ds[cH] || [];
                    ds[cH].push(dK);
                    break
                }
            }
        }
        var dJ = dK.element;
        if (dJ.nodeType === 1) {
            dJ.removeAttribute(dK.name);
            dK.sortedCallback = aV(dJ, "data-with-sorted", dH);
            dK.renderedCallback = aV(dJ, "data-" + dt + "-rendered", dH);
            var dE = bD(dt);
            var dx = cy.createComment(dE);
            var du = cy.createComment(dE + ":end");
            dK.signature = dE;
            dK.template = ce.cloneNode(false);
            if (dt === "repeat") {
                var dz = dJ.parentNode;
                dz.replaceChild(du, dJ);
                dz.insertBefore(dx, du);
                dK.template.appendChild(dJ)
            } else {
                while (dJ.firstChild) {
                    dK.template.appendChild(dJ.firstChild)
                }
                dJ.appendChild(dx);
                dJ.appendChild(du)
            }
            dK.element = du;
            dK.handler = am.repeat;
            dK.rollback = function () {
                var e = dK.element;
                if (!e) {
                    return
                }
                dK.handler("clear")
            }
        }
        if (dv) {
            return
        }
        dK.$outer = {};
        var dB = "$key";
        var dA = "$val";
        if (Array.isArray(dD)) {
            dB = "$first";
            dA = "$last"
        }
        for (dG = 0; dC = dH[dG++];) {
            if (dC.hasOwnProperty(dB) && dC.hasOwnProperty(dA)) {
                dK.$outer = dC;
                break
            }
        }
        var dy = dD.$events;
        var dr = (dy || {})[cH];
        ag(dr, dK);
        if (dw === "object") {
            dK.handler("append")
        } else {
            if (dD.length) {
                dK.handler("add", 0, dD.length)
            }
        }
    };
    am.repeat = function (dX, dH, dW) {
        var dY = this;
        if (!dX && dY.xtype) {
            var dS = dY.$repeat;
            var dt = dY.evaluator.apply(0, dY.args || []);
            if (dY.xtype === "array") {
                if (dS.length === dt.length) {
                    return
                }
                dX = "add";
                dH = 0;
                dY.$repeat = dt;
                dW = dt.length
            } else {
                if (bJ(dS).join(";;") === bJ(dt).join(";;")) {
                    return
                }
                dX = "append";
                dY.$repeat = dt
            }
        }
        if (dX) {
            var dC, ap;
            var dx = dY.element;
            var dr = dl(dY);
            var du = dx.parentNode;
            var dK = dY.proxies;
            var dz = ce.cloneNode(false);
            switch (dX) {
                case"add":
                    var dR = dH + dW;
                    var dJ = [];
                    for (var dV = dH; dV < dR; dV++) {
                        var dT = bQ(dV, dY);
                        dK.splice(dV, 0, dT);
                        bb(dY, dz, dT, dJ)
                    }
                    du.insertBefore(dz, dr[dH] || dx);
                    for (dV = 0; ap = dJ[dV++];) {
                        aT(ap.nodes, ap.vmodels);
                        ap.nodes = ap.vmodels = null
                    }
                    break;
                case"del":
                    cE(dr[dH], dr[dH + dW] || dx);
                    var dB = dK.splice(dH, dW);
                    Q(dB, "each");
                    break;
                case"clear":
                    dC = dr[0];
                    if (dC) {
                        cE(dC, dx);
                        if (dY.xtype === "object") {
                            du.insertBefore(dC, dx)
                        }
                    }
                    Q(dK, "each");
                    break;
                case"move":
                    dC = dr[0];
                    if (dC) {
                        var dD = dC.nodeValue;
                        var dN = [];
                        var dG = [], dI;
                        cE(dC, dx, function () {
                            dG.unshift(this);
                            if (this.nodeValue === dD) {
                                dN.unshift(dG);
                                dG = []
                            }
                        });
                        bi(dN, dH);
                        bi(dK, dH);
                        while (dG = dN.shift()) {
                            while (dI = dG.shift()) {
                                dz.appendChild(dI)
                            }
                        }
                        du.insertBefore(dz, dx)
                    }
                    break;
                case"index":
                    var dw = dK.length - 1;
                    for (; dW = dK[dH]; dH++) {
                        dW.$index = dH;
                        dW.$first = dH === 0;
                        dW.$last = dH === dw
                    }
                    return;
                case"set":
                    dT = dK[dH];
                    if (dT) {
                        cY(dT.$events[dY.param || "el"])
                    }
                    break;
                case"append":
                    var dO = dY.$repeat;
                    var dE = [];
                    dY.proxies = dY.proxies || {};
                    var dP = dY.proxies;
                    dB = [];
                    var dL = dY.element.parentNode.childNodes;
                    var e = false;
                    for (dV = 0; dI = dL[dV++];) {
                        if (dI.nodeValue === dY.signature) {
                            e = true
                        } else {
                            if (dI.nodeValue === dY.signature + ":end") {
                                e = false
                            }
                        }
                        if (e) {
                            dB.push(dI)
                        }
                    }
                    var dv = [], dF;
                    var dA = dY.keyIndex || (dY.keyIndex = {});
                    for (dV = 0; dV < dB.length; dV++) {
                        dW = dB[dV];
                        if (dW.nodeValue === dY.signature) {
                            dF = ce.cloneNode(false);
                            dv.push(dF)
                        }
                        dF.appendChild(dW)
                    }
                    for (var dy in dO) {
                        if (dO.hasOwnProperty(dy) && dy !== "hasOwnProperty") {
                            dE.push(dy)
                        }
                    }
                    for (dV = 0; dy = dE[dV++];) {
                        if (!dP.hasOwnProperty(dy)) {
                            dP[dy] = bv(dP[dy], dy, dY)
                        } else {
                            dP[dy].$val = dO[dy]
                        }
                    }
                    for (dy in dP) {
                        if (dE.indexOf(dy) === -1) {
                            delete dA[dy];
                            d(dP[dy], aA);
                            delete dP[dy]
                        }
                    }
                    dJ = [];
                    var dU = dE;
                    if (dY.sortedCallback) {
                        var ds = dY.sortedCallback.call(du, dE);
                        if (ds && Array.isArray(ds)) {
                            dU = ds
                        }
                    }
                    for (dV = 0; dV < dU.length; dV++) {
                        dy = dU[dV];
                        if (dv[dA[dy]]) {
                            dz.appendChild(dv[dA[dy]]);
                            dJ.push({})
                        } else {
                            bb(dY, dz, dP[dy], dJ)
                        }
                    }
                    for (dV = 0; dV < dU.length; dV++) {
                        dA[dU[dV]] = dV
                    }
                    du.insertBefore(dz, dx);
                    for (dV = 0; ap = dJ[dV++];) {
                        if (ap.nodes) {
                            aT(ap.nodes, ap.vmodels);
                            ap.nodes = ap.vmodels = null
                        }
                    }
                    break
            }
            if (!dY.$repeat || dY.$repeat.hasOwnProperty("$lock")) {
                return
            }
            if (dX === "clear") {
                dX = "del"
            }
            var dM = dY.renderedCallback || l, dQ = arguments;
            if (du.oldValue && du.tagName === "SELECT") {
                avalon(du).val(du.oldValue.split(","))
            }
            dM.apply(du, dQ)
        }
    };
    "with,each".replace(bR, function (e) {
        dg[e] = dg.repeat
    });
    function bb(dw, du, dt, e) {
        var dv = dw.template.cloneNode(true);
        var dr = avalon.slice(dv.childNodes);
        dv.insertBefore(cy.createComment(dw.signature), dv.firstChild);
        du.appendChild(dv);
        var ap = [dt].concat(dw.vmodels);
        var ds = {nodes: dr, vmodels: ap};
        e.push(ds)
    }

    function dl(dt) {
        var ap = [];
        var e = dt.element.parentNode.childNodes;
        for (var dr = 0, ds; ds = e[dr++];) {
            if (ds.nodeValue === dt.signature) {
                ap.push(ds)
            } else {
                if (ds.nodeValue === dt.signature + ":end") {
                    break
                }
            }
        }
        return ap
    }

    function cE(ds, e, dr) {
        while (true) {
            var ap = e.previousSibling;
            if (!ap) {
                break
            }
            ap.parentNode.removeChild(ap);
            dr && dr.call(ap);
            if (ap === ds) {
                break
            }
        }
    }

    var aA = [];

    function a2() {
        var e = cj({
            $key: "", $outer: {}, $host: {}, $val: {
                get: function () {
                    return this.$host[this.$key]
                }, set: function (ap) {
                    this.$host[this.$key] = ap
                }
            }
        }, {$val: 1});
        e.$id = bD("$proxy$with");
        return e
    }

    function bv(ap, e, ds) {
        ap = ap || aA.pop();
        if (!ap) {
            ap = a2()
        } else {
            ap.$reinitialize()
        }
        var dr = ds.$repeat;
        ap.$key = e;
        ap.$host = dr;
        ap.$outer = ds.$outer;
        if (dr.$events) {
            ap.$events.$val = dr.$events[e]
        } else {
            ap.$events = {}
        }
        return ap
    }

    function Q(e) {
        ac(e)
    }

    function ac(e) {
        e.forEach(function (ap) {
            d(ap, aP)
        });
        e.length = 0
    }

    var aP = [];

    function ca(ap) {
        var ds = {$host: [], $outer: {}, $index: 0, $first: false, $last: false, $remove: avalon.noop};
        ds[ap] = {
            get: function () {
                var dt = this.$events;
                var du = dt.$index;
                dt.$index = dt[ap];
                try {
                    return this.$host[this.$index]
                } finally {
                    dt.$index = du
                }
            }, set: function (du) {
                try {
                    var dt = this.$events;
                    var dv = dt.$index;
                    dt.$index = [];
                    this.$host.set(this.$index, du)
                } finally {
                    dt.$index = dv
                }
            }
        };
        var e = {$last: 1, $first: 1, $index: 1};
        var dr = cj(ds, e);
        dr.$id = bD("$proxy$each");
        return dr
    }

    function bQ(dt, dr) {
        var ap = dr.param || "el", du;
        for (var ds = 0, e = aP.length; ds < e; ds++) {
            var dx = aP[ds];
            if (dx && dx.hasOwnProperty(ap)) {
                du = dx;
                aP.splice(ds, 1)
            }
        }
        if (!du) {
            du = ca(ap)
        }
        var dw = dr.$repeat;
        var dv = dw.length - 1;
        du.$index = dt;
        du.$first = dt === 0;
        du.$last = dt === dv;
        du.$host = dw;
        du.$outer = dr.$outer;
        du.$remove = function () {
            return dw.removeAt(du.$index)
        };
        return du
    }

    function d(ds, ap) {
        for (var dr in ds.$events) {
            var e = ds.$events[dr];
            if (Array.isArray(e)) {
                e.forEach(function (dt) {
                    if (typeof dt === "object") {
                        bT(dt)
                    }
                });
                e.length = 0
            }
        }
        ds.$host = ds.$outer = {};
        if (ap.unshift(ds) > ax.maxRepeatSize) {
            ap.pop()
        }
    }

    am.text = function (ds, ap) {
        ds = ds == null ? "" : ds;
        if (ap.nodeType === 3) {
            try {
                ap.data = ds
            } catch (dr) {
            }
        } else {
            if ("textContent" in ap) {
                ap.textContent = ds
            } else {
                ap.innerText = ds
            }
        }
    };
    function aG(ds, dr) {
        var e = "_" + ds;
        if (!aG[e]) {
            var ap = cy.createElement(ds);
            c2.appendChild(ap);
            if (aR) {
                dr = getComputedStyle(ap, null).display
            } else {
                dr = ap.currentStyle.display
            }
            c2.removeChild(ap);
            aG[e] = dr
        }
        return aG[e]
    }

    avalon.parseDisplay = aG;
    dg.visible = function (ap, e) {
        da(ap.value, e, ap)
    };
    am.visible = function (dr, e, ap) {
        if (dr) {
            e.style.display = ap.display || "";
            if (avalon(e).css("display") === "none") {
                e.style.display = ap.display = aG(e.nodeName)
            }
        } else {
            e.style.display = "none"
        }
    };
    dg.widget = function (dw, ds) {
        var dA = dw.value.match(bR);
        var dt = dw.element;
        var dx = dA[0];
        var dr = dA[1];
        if (!dr || dr === "$") {
            dr = bD(dx)
        }
        var dD = dA[2] || dx;
        var du = avalon.ui[dx];
        if (typeof du === "function") {
            ds = dt.vmodels || ds;
            for (var dv = 0, dC; dC = ds[dv++];) {
                if (dC.hasOwnProperty(dD) && typeof dC[dD] === "object") {
                    var ap = dC[dD];
                    ap = ap.$model || ap;
                    break
                }
            }
            if (ap) {
                var dF = ap[dx + "Id"];
                if (typeof dF === "string") {
                    cp("warning!不再支持" + dx + "Id");
                    dr = dF
                }
            }
            var dB = avalon.getWidgetData(dt, dx);
            dw.value = [dx, dr, dD].join(",");
            dw[dx + "Id"] = dr;
            dw.evaluator = l;
            dt.msData["ms-widget-id"] = dr;
            var dE = dw[dx + "Options"] = avalon.mix({}, du.defaults, ap || {}, dB);
            dt.removeAttribute("ms-widget");
            var dz = du(dt, dw, ds) || {};
            if (dz.$id) {
                avalon.vmodels[dr] = dz;
                U(dt, dz);
                try {
                    dz.$init(function () {
                        avalon.scan(dt, [dz].concat(ds));
                        if (typeof dE.onInit === "function") {
                            dE.onInit.call(dt, dz, dE, ds)
                        }
                    })
                } catch (dy) {
                }
                dw.rollback = function () {
                    try {
                        dz.widgetElement = null;
                        dz.$remove()
                    } catch (dG) {
                    }
                    dt.msData = {};
                    delete avalon.vmodels[dz.$id]
                };
                cu(dw, bq);
                if (b5.chrome) {
                    dt.addEventListener("DOMNodeRemovedFromDocument", function () {
                        setTimeout(aZ)
                    })
                }
            } else {
                avalon.scan(dt, ds)
            }
        } else {
            if (ds.length) {
                dt.vmodels = ds
            }
        }
    };
    var bq = [];
    var z = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim;
    var b2 = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g;
    var aU = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig;
    var cS = {
        a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
        img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
        form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
    };
    var co = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var a9 = /([^\#-~| |!])/g;

    function o(dt, dr, dw, dv) {
        dt = (dt + "").replace(/[^0-9+\-Ee.]/g, "");
        var ap = !isFinite(+dt) ? 0 : +dt, e = !isFinite(+dr) ? 3 : Math.abs(dr), dy = dv || ",", ds = dw || ".", dx = "", du = function (dB, dA) {
            var dz = Math.pow(10, dA);
            return "" + (Math.round(dB * dz) / dz).toFixed(dA)
        };
        dx = (e ? du(ap, e) : "" + Math.round(ap)).split(".");
        if (dx[0].length > 3) {
            dx[0] = dx[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, dy)
        }
        if ((dx[1] || "").length < e) {
            dx[1] = dx[1] || "";
            dx[1] += new Array(e - dx[1].length + 1).join("0")
        }
        return dx.join(ds)
    }

    var bf = avalon.filters = {
        uppercase: function (e) {
            return e.toUpperCase()
        }, lowercase: function (e) {
            return e.toLowerCase()
        }, truncate: function (dr, ap, e) {
            ap = ap || 30;
            e = typeof e === "string" ? e : "...";
            return dr.length > ap ? dr.slice(0, ap - e.length) + e : String(dr)
        }, $filter: function (ds) {
            for (var ap = 1, du = arguments.length; ap < du; ap++) {
                var dt = arguments[ap];
                var dr = avalon.filters[dt.shift()];
                if (typeof dr === "function") {
                    var e = [ds].concat(dt);
                    ds = dr.apply(null, e)
                }
            }
            return ds
        }, camelize: m, sanitize: function (e) {
            return e.replace(z, "").replace(aU, function (dr, ap) {
                var ds = dr.toLowerCase().match(/<(\w+)\s/);
                if (ds) {
                    var dt = cS[ds[1]];
                    if (dt) {
                        dr = dr.replace(dt, function (dw, dv, dx) {
                            var du = dx.charAt(0);
                            return dv + "=" + du + "javascript:void(0)" + du
                        })
                    }
                }
                return dr.replace(b2, " ").replace(/\s+/g, " ")
            })
        }, escape: function (e) {
            return String(e).replace(/&/g, "&amp;").replace(co, function (ds) {
                var dr = ds.charCodeAt(0);
                var ap = ds.charCodeAt(1);
                return "&#" + (((dr - 55296) * 1024) + (ap - 56320) + 65536) + ";"
            }).replace(a9, function (ap) {
                return "&#" + ap.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }, currency: function (e, ap, dr) {
            return (ap || "\uFFE5") + o(e, isFinite(dr) ? dr : 2)
        }, number: o
    };
    new function () {
        function ds(dz) {
            return parseInt(dz, 10) || 0
        }

        function dt(dA, dB, dz) {
            var dC = "";
            if (dA < 0) {
                dC = "-";
                dA = -dA
            }
            dA = "" + dA;
            while (dA.length < dB) {
                dA = "0" + dA
            }
            if (dz) {
                dA = dA.substr(dA.length - dB)
            }
            return dC + dA
        }

        function dw(dA, dB, dC, dz) {
            return function (dD) {
                var dE = dD["get" + dA]();
                if (dC > 0 || dE > -dC) {
                    dE += dC
                }
                if (dE === 0 && dC === -12) {
                    dE = 12
                }
                return dt(dE, dB, dz)
            }
        }

        function ap(dA, dz) {
            return function (dD, dB) {
                var dE = dD["get" + dA]();
                var dC = (dz ? ("SHORT" + dA) : dA).toUpperCase();
                return dB[dC][dE]
            }
        }

        function dy(dA) {
            var dz = -1 * dA.getTimezoneOffset();
            var dB = (dz >= 0) ? "+" : "";
            dB += dt(Math[dz > 0 ? "floor" : "ceil"](dz / 60), 2) + dt(Math.abs(dz % 60), 2);
            return dB
        }

        function dv(dA, dz) {
            return dA.getHours() < 12 ? dz.AMPMS[0] : dz.AMPMS[1]
        }

        var du = {
            yyyy: dw("FullYear", 4),
            yy: dw("FullYear", 2, 0, true),
            y: dw("FullYear", 1),
            MMMM: ap("Month"),
            MMM: ap("Month", true),
            MM: dw("Month", 2, 1),
            M: dw("Month", 1, 1),
            dd: dw("Date", 2),
            d: dw("Date", 1),
            HH: dw("Hours", 2),
            H: dw("Hours", 1),
            hh: dw("Hours", 2, -12),
            h: dw("Hours", 1, -12),
            mm: dw("Minutes", 2),
            m: dw("Minutes", 1),
            ss: dw("Seconds", 2),
            s: dw("Seconds", 1),
            sss: dw("Milliseconds", 3),
            EEEE: ap("Day"),
            EEE: ap("Day", true),
            a: dv,
            Z: dy
        };
        var e = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/;
        var dr = /^\/Date\((\d+)\)\/$/;
        bf.date = function (dA, dI) {
            var dM = bf.date.locate, dK = "", dC = [], dH, dD;
            dI = dI || "mediumDate";
            dI = dM[dI] || dI;
            if (typeof dA === "string") {
                if (/^\d+$/.test(dA)) {
                    dA = ds(dA)
                } else {
                    if (dr.test(dA)) {
                        dA = +RegExp.$1
                    } else {
                        var dB = dA.trim();
                        var dz = [0, 0, 0, 0, 0, 0, 0];
                        var dL = new Date(0);
                        dB = dB.replace(/^(\d+)\D(\d+)\D(\d+)/, function (dP, dO, dN, dR) {
                            var dQ = dR.length === 4 ? [dR, dO, dN] : [dO, dN, dR];
                            dz[0] = ds(dQ[0]);
                            dz[1] = ds(dQ[1]) - 1;
                            dz[2] = ds(dQ[2]);
                            return ""
                        });
                        var dF = dL.setFullYear;
                        var dJ = dL.setHours;
                        dB = dB.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (dP, dO, dN, dR, dQ) {
                            dz[3] = ds(dO);
                            dz[4] = ds(dN);
                            dz[5] = ds(dR);
                            if (dQ) {
                                dz[6] = Math.round(parseFloat("0." + dQ) * 1000)
                            }
                            return ""
                        });
                        var dG = 0;
                        var dE = 0;
                        dB = dB.replace(/Z|([+-])(\d\d):?(\d\d)/, function (dP, dN, dQ, dO) {
                            dF = dL.setUTCFullYear;
                            dJ = dL.setUTCHours;
                            if (dN) {
                                dG = ds(dN + dQ);
                                dE = ds(dN + dO)
                            }
                            return ""
                        });
                        dz[3] -= dG;
                        dz[4] -= dE;
                        dF.apply(dL, dz.slice(0, 3));
                        dJ.apply(dL, dz.slice(3));
                        dA = dL
                    }
                }
            }
            if (typeof dA === "number") {
                dA = new Date(dA)
            }
            if (avalon.type(dA) !== "date") {
                return
            }
            while (dI) {
                dD = e.exec(dI);
                if (dD) {
                    dC = dC.concat(dD.slice(1));
                    dI = dC.pop()
                } else {
                    dC.push(dI);
                    dI = null
                }
            }
            dC.forEach(function (dN) {
                dH = du[dN];
                dK += dH ? dH(dA, dM) : dN.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            });
            return dK
        };
        var dx = {
            AMPMS: {0: "上午", 1: "下午"},
            DAY: {0: "星期日", 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五", 6: "星期六"},
            MONTH: {
                0: "1月",
                1: "2月",
                2: "3月",
                3: "4月",
                4: "5月",
                5: "6月",
                6: "7月",
                7: "8月",
                8: "9月",
                9: "10月",
                10: "11月",
                11: "12月"
            },
            SHORTDAY: {"0": "周日", "1": "周一", "2": "周二", "3": "周三", "4": "周四", "5": "周五", "6": "周六"},
            fullDate: "y年M月d日EEEE",
            longDate: "y年M月d日",
            medium: "yyyy-M-d H:mm:ss",
            mediumDate: "yyyy-M-d",
            mediumTime: "H:mm:ss",
            "short": "yy-M-d ah:mm",
            shortDate: "yy-M-d",
            shortTime: "ah:mm"
        };
        dx.SHORTMONTH = dx.MONTH;
        bf.date.locate = dx
    };
    var cL = avalon.modules = {"domReady!": {exports: avalon, state: 3}, avalon: {exports: avalon, state: 4}};
    cL.exports = cL.avalon;
    new function () {
        var dY = [];
        var dz = [];
        var dZ = /\.js$/i;

        function dx(d2, d1) {
            var d3 = "js";
            d2 = d2.replace(/^(\w+)\!/, function (d9, d8) {
                d3 = d8;
                return ""
            });
            if (d3 === "ready") {
                cp("debug: ready!已经被废弃，请使用domReady!");
                d3 = "domReady"
            }
            var d6 = "";
            d2 = d2.replace(dU, function (d8) {
                d6 = d8;
                return ""
            });
            var d7 = "." + d3;
            var d4 = /js|css/.test(d7) ? d7 : "";
            d2 = d2.replace(/\.[a-z0-9]+$/g, function (d8) {
                if (d8 === d7) {
                    d4 = d8;
                    return ""
                } else {
                    return d8
                }
            });
            var d5 = avalon.mix({query: d6, ext: d4, res: d3, name: d2, toUrl: dR}, d1);
            d5.toUrl(d2);
            return d5
        }

        function dW(d6) {
            var d2 = d6.name;
            var d4 = d6.res;
            var d3 = cL[d2];
            var d1 = d2 && d6.urlNoQuery;
            if (d3 && d3.state >= 1) {
                return d2
            }
            d3 = cL[d1];
            if (d3 && d3.state >= 3) {
                r(d3.deps || [], d3.factory, d1);
                return d1
            }
            if (d2 && !d3) {
                d3 = cL[d1] = {id: d1, state: 1};
                var d5 = function (d7) {
                    dv[d4] = d7;
                    d7.load(d2, d6, function (d8) {
                        if (arguments.length && d8 !== void 0) {
                            d3.exports = d8
                        }
                        d3.state = 4;
                        dX()
                    })
                };
                if (!dv[d4]) {
                    r([d4], d5)
                } else {
                    d5(dv[d4])
                }
            }
            return d2 ? d1 : d4 + "!"
        }

        var dI = [];
        var dO = false;
        r = avalon.require = function (d7, d5, d1, ea) {
            if (!dO) {
                dI.push(avalon.slice(arguments));
                if (arguments.length <= 2) {
                    dO = true;
                    var d6 = dI.splice(0, dI.length), d8;
                    while (d8 = d6.shift()) {
                        r.apply(null, d8)
                    }
                }
                return
            }
            if (!Array.isArray(d7)) {
                avalon.error("require方法的第一个参数应为数组 " + d7)
            }
            var eb = [];
            var ec = {};
            var d3 = d1 || "callback" + setTimeout("1");
            ea = ea || {};
            ea.baseUrl = ax.baseUrl;
            var d2 = !!ea.built;
            if (d1) {
                ea.parentUrl = d1.substr(0, d1.lastIndexOf("/"));
                ea.mapUrl = d1.replace(dZ, "")
            }
            if (d2) {
                var d9 = dx(ea.defineName, ea);
                d3 = d9.urlNoQuery
            } else {
                d7.forEach(function (ee) {
                    var ef = dx(ee, ea);
                    var ed = dW(ef);
                    if (ed) {
                        if (!ec[ed]) {
                            eb.push(ed);
                            ec[ed] = "司徒正美"
                        }
                    }
                })
            }
            var d4 = cL[d3];
            if (!d4 || d4.state !== 4) {
                cL[d3] = {id: d3, deps: d2 ? d7.concat() : eb, factory: d5 || l, state: 3}
            }
            if (!d4) {
                dY.push(d3)
            }
            dX()
        };
        r.define = function (d5, d7, d1) {
            if (typeof d5 !== "string") {
                d1 = d7;
                d7 = d5;
                d5 = "anonymous"
            }
            if (!Array.isArray(d7)) {
                d1 = d7;
                d7 = []
            }
            var d4 = {built: !dO, defineName: d5};
            var d3 = [d7, d1, d4];
            d1.require = function (d8) {
                d3.splice(2, 0, d8);
                if (cL[d8]) {
                    cL[d8].state = 3;
                    var d9 = false;
                    try {
                        d9 = dV(cL[d8].deps, d8)
                    } catch (ea) {
                    }
                    if (d9) {
                        avalon.error(d8 + "模块与之前的模块存在循环依赖，请不要直接用script标签引入" + d8 + "模块")
                    }
                }
                delete d1.require;
                r.apply(null, d3)
            };
            var d2 = d4.built ? "unknown" : dH();
            if (d2) {
                var d6 = cL[d2];
                if (d6) {
                    d6.state = 2
                }
                d1.require(d2)
            } else {
                dz.push(d1)
            }
        };
        r.config = ax;
        r.define.amd = cL;
        var dt = ax["orig.paths"] = {};
        var du = ax["orig.map"] = {};
        var dF = ax.packages = [];
        var dw = ax["orig.args"] = {};
        avalon.mix(dm, {
            paths: function (d1) {
                avalon.mix(dt, d1);
                ax.paths = ds(dt)
            }, map: function (d2) {
                avalon.mix(du, d2);
                var d1 = ds(du, 1, 1);
                avalon.each(d1, function (d3, d4) {
                    d4.val = ds(d4.val)
                });
                ax.map = d1
            }, packages: function (d7) {
                d7 = d7.concat(dF);
                var d6 = {};
                var d4 = [];
                for (var d5 = 0, d3; d3 = d7[d5++];) {
                    d3 = typeof d3 === "string" ? {name: d3} : d3;
                    var d2 = d3.name;
                    if (!d6[d2]) {
                        var d1 = dD(d3.location || d2, d3.main || "main");
                        d1 = d1.replace(dZ, "");
                        d4.push(d3);
                        d6[d2] = d3.location = d1;
                        d3.reg = dr(d2)
                    }
                }
                ax.packages = d4.sort()
            }, urlArgs: function (d1) {
                if (typeof d1 === "string") {
                    d1 = {"*": d1}
                }
                avalon.mix(dw, d1);
                ax.urlArgs = ds(dw, 1)
            }, baseUrl: function (d1) {
                if (!dy(d1)) {
                    var d2 = b.getElementsByTagName("base")[0];
                    if (d2) {
                        b.removeChild(d2)
                    }
                    var d3 = cy.createElement("a");
                    d3.href = d1;
                    d1 = dS(d3, "href");
                    if (d2) {
                        b.insertBefore(d2, b.firstChild)
                    }
                }
                if (d1.length > 3) {
                    ax.baseUrl = d1
                }
            }, shim: function (d3) {
                for (var d1 in d3) {
                    var d2 = d3[d1];
                    if (Array.isArray(d2)) {
                        d2 = d3[d1] = {deps: d2}
                    }
                    if (!d2.exportsFn && (d2.exports || d2.init)) {
                        d2.exportsFn = d0(d2)
                    }
                }
                ax.shim = d3
            }
        });
        function dV(d3, d1) {
            for (var d2 = 0, d4; d4 = d3[d2++];) {
                if (cL[d4].state !== 4 && (d4 === d1 || dV(cL[d4].deps, d1))) {
                    return true
                }
            }
        }

        function dK(d2, d1, d3) {
            var d4 = dN(d2.src);
            d2.onload = d2.onreadystatechange = d2.onerror = null;
            if (d1 || (d3 && cL[d4] && !cL[d4].state)) {
                setTimeout(function () {
                    b.removeChild(d2);
                    d2 = null
                });
                cp("debug: 加载 " + d4 + " 失败" + d1 + " " + (!cL[d4].state))
            } else {
                return true
            }
        }

        function dX() {
            loop:for (var d3 = dY.length, d6; d6 = dY[--d3];) {
                var d4 = cL[d6], d5 = d4.deps;
                if (!d5) {
                    continue
                }
                for (var d1 = 0, d2; d2 = d5[d1]; d1++) {
                    if (Object(cL[d2]).state !== 4) {
                        continue loop
                    }
                }
                if (d4.state !== 4) {
                    dY.splice(d3, 1);
                    dA(d4.id, d4.deps, d4.factory);
                    dX()
                }
            }
        }

        var dM = /complete|loaded/;

        function dP(d1, d2, d9) {
            var d3 = cy.createElement("script");
            d3.className = cH;
            var d7 = "onload" in d3;
            var d8 = d7 ? "onload" : "onreadystatechange";

            function d4() {
                var ea = dz.pop();
                ea && ea.require(d2);
                if (d9) {
                    d9()
                }
                if (dK(d3, false, !d7)) {
                    cp("debug: 已成功加载 " + d1);
                    d2 && dY.push(d2);
                    dX()
                }
            }

            var d6 = 0, d5;
            d3[d8] = d7 ? d4 : function () {
                if (dM.test(d3.readyState)) {
                    ++d6;
                    if (d6 === 1) {
                        d5 = setTimeout(d4, 500)
                    } else {
                        clearTimeout(d5);
                        d4()
                    }
                }
            };
            d3.onerror = function () {
                dK(d3, true)
            };
            b.insertBefore(d3, b.firstChild);
            d3.src = d1;
            cp("debug: 正准备加载 " + d1)
        }

        var dv = r.plugins = {
            ready: {load: l}, js: {
                load: function (d2, d4, d3) {
                    var d1 = d4.url;
                    var d6 = d4.urlNoQuery;
                    var d5 = ax.shim[d2.replace(dZ, "")];
                    if (d5) {
                        r(d5.deps || [], function () {
                            var d7 = avalon.slice(arguments);
                            dP(d1, d6, function () {
                                d3(d5.exportsFn ? d5.exportsFn.apply(0, d7) : void 0)
                            })
                        })
                    } else {
                        dP(d1, d6)
                    }
                }
            }, css: {
                load: function (d2, d5, d3) {
                    var d1 = d5.url;
                    var d4 = cy.createElement("link");
                    d4.rel = "stylesheet";
                    d4.href = d1;
                    b.insertBefore(d4, b.firstChild);
                    cp("debug: 已成功加载 " + d1);
                    d3()
                }
            }, text: {
                load: function (d2, d5, d4) {
                    var d1 = d5.url;
                    var d7 = aB();
                    d7.onreadystatechange = function () {
                        if (d7.readyState === 4) {
                            var d8 = d7.status;
                            if (d8 > 399 && d8 < 600) {
                                avalon.error(d1 + " 对应资源不存在或没有开启 CORS")
                            } else {
                                cp("debug: 已成功加载 " + d1);
                                d4(d7.responseText)
                            }
                        }
                    };
                    var d6 = "_=" + (new Date() - 0);
                    var d3 = d1.indexOf("?") === -1 ? d1 + "?" + d6 : d1 + "&" + d6;
                    d7.open("GET", d3, true);
                    if ("withCredentials" in d7) {
                        d7.withCredentials = true
                    }
                    d7.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    d7.send();
                    cp("debug: 正准备加载 " + d1)
                }
            }
        };
        r.checkDeps = dX;
        var dU = /(\?[^#]*)$/;

        function dN(d1) {
            return (d1 || "").replace(dU, "")
        }

        function dy(d1) {
            return /^(?:[a-z]+:)?\/\//i.test(String(d1))
        }

        function dS(d1, d2) {
            return "1"[0] ? d1[d2] : d1.getAttribute(d2, 4)
        }

        function dH() {
            var d1;
            try {
                a.b.c()
            } catch (d6) {
                d1 = d6.stack;
                if (!d1 && b5.opera) {
                    d1 = (String(d6).match(/of linked script \S+/g) || []).join(" ")
                }
            }
            if (d1) {
                d1 = d1.split(/[@ ]/g).pop();
                d1 = d1[0] === "(" ? d1.slice(1, -1) : d1.replace(/\s/, "");
                return dN(d1.replace(/(:\d+)?:\d+$/i, ""))
            }
            var d2 = b.getElementsByTagName("script");
            for (var d4 = d2.length, d5; d5 = d2[--d4];) {
                if (d5.className === cH && d5.readyState === "interactive") {
                    var d3 = dS(d5, "src");
                    return d5.className = dN(d3)
                }
            }
        }

        var dB = /^callback\d+$/;

        function dA(d1, ea, d5) {
            var d2 = Object(cL[d1]);
            d2.state = 4;
            for (var d4 = 0, d8 = [], d9; d9 = ea[d4++];) {
                if (d9 === "exports") {
                    var d3 = d2.exports || (d2.exports = {});
                    d8.push(d3)
                } else {
                    d8.push(cL[d9].exports)
                }
            }
            try {
                var d7 = d5.apply(b5, d8)
            } catch (d6) {
                cp("执行[" + d1 + "]模块的factory抛错： ", d6)
            }
            if (d7 !== void 0) {
                d2.exports = d7
            }
            if (dB.test(d1)) {
                delete cL[d1]
            }
            delete d2.factory;
            return d7
        }

        function dR(d7) {
            if (d7.indexOf(this.res + "!") === 0) {
                d7 = d7.slice(this.res.length + 1)
            }
            var d4 = d7;
            var d3 = 0;
            var d6 = this.baseUrl;
            var d2 = this.parentUrl || d6;
            dG(d7, ax.paths, function (d9, d8) {
                d4 = d4.replace(d8, d9);
                d3 = 1
            });
            if (!d3) {
                dG(d7, ax.packages, function (ea, d8, d9) {
                    d4 = d4.replace(d9.name, d9.location)
                })
            }
            if (this.mapUrl) {
                dG(this.mapUrl, ax.map, function (d8) {
                    dG(d4, d8, function (ea, d9) {
                        d4 = d4.replace(d9, ea);
                        d2 = d6
                    })
                })
            }
            var d5 = this.ext;
            if (d5 && d3 && d4.slice(-d5.length) === d5) {
                d4 = d4.slice(0, -d5.length)
            }
            if (!dy(d4)) {
                d2 = this.built || /^\w/.test(d4) ? d6 : d2;
                d4 = dD(d2, d4)
            }
            var d1 = d4 + d5;
            d4 = d1 + this.query;
            dG(d7, ax.urlArgs, function (d8) {
                d4 += (d4.indexOf("?") === -1 ? "?" : "&") + d8
            });
            this.url = d4;
            return this.urlNoQuery = d1
        }

        function ds(d4, d1, d3) {
            var d2 = ap(d4, d1, d3);
            d2.sort(dT);
            return d2
        }

        function dr(d1) {
            return new RegExp("^" + d1 + "(/|$)")
        }

        function d0(d1) {
            return function () {
                var d2;
                if (d1.init) {
                    d2 = d1.init.apply(b5, arguments)
                }
                return d2 || (d1.exports && dQ(d1.exports))
            }
        }

        function ap(d5, d1, d2) {
            var d6 = [];
            for (var d3 in d5) {
                if (b9.call(d5, d3)) {
                    var d4 = {name: d3, val: d5[d3]};
                    d6.push(d4);
                    d4.reg = d3 === "*" && d1 ? /^/ : dr(d3);
                    if (d2 && d3 !== "*") {
                        d4.reg = new RegExp("/" + d3.replace(/^\//, "") + "(/|$)")
                    }
                }
            }
            return d6
        }

        function dG(d3, d5, d4) {
            d5 = d5 || [];
            for (var d1 = 0, d2; d2 = d5[d1++];) {
                if (d2.reg.test(d3)) {
                    d4(d2.val, d2.name, d2);
                    return false
                }
            }
        }

        function dT(d2, d1) {
            var d4 = d2.name;
            var d3 = d1.name;
            if (d3 === "*") {
                return -1
            }
            if (d4 === "*") {
                return 1
            }
            return d3.length - d4.length
        }

        var e = /\/\w+\/\.\./;

        function dD(d2, d1) {
            if (d2.charAt(d2.length - 1) !== "/") {
                d2 += "/"
            }
            if (d1.slice(0, 2) === "./") {
                return d2 + d1.slice(2)
            }
            if (d1.slice(0, 2) === "..") {
                d2 += d1;
                while (e.test(d2)) {
                    d2 = d2.replace(e, "")
                }
                return d2
            }
            if (d1.slice(0, 1) === "/") {
                return d2 + d1.slice(1)
            }
            return d2 + d1
        }

        function dQ(d2) {
            if (!d2) {
                return d2
            }
            var d1 = b5;
            d2.split(".").forEach(function (d3) {
                d1 = d1[d3]
            });
            return d1
        }

        var dC = cy.scripts[cy.scripts.length - 1];
        var dE = dC.getAttribute("data-main");
        if (dE) {
            dm.baseUrl(dE);
            var dJ = ax.baseUrl;
            ax.baseUrl = dJ.slice(0, dJ.lastIndexOf("/") + 1);
            dP(dJ.replace(dZ, "") + ".js")
        } else {
            var dL = dN(dS(dC, "src"));
            ax.baseUrl = dL.slice(0, dL.lastIndexOf("/") + 1)
        }
    };
    var aK = [], ak;
    var al = function (e) {
        ak = true;
        if (r) {
            cL["domReady!"].state = 4;
            r.checkDeps()
        }
        while (e = aK.shift()) {
            e(avalon)
        }
    };

    function bI() {
        try {
            c2.doScroll("left");
            al()
        } catch (ap) {
            setTimeout(bI)
        }
    }

    if (cy.readyState === "complete") {
        setTimeout(al)
    } else {
        if (aR) {
            cy.addEventListener("DOMContentLoaded", al)
        } else {
            cy.attachEvent("onreadystatechange", function () {
                if (cy.readyState === "complete") {
                    al()
                }
            });
            try {
                var ai = b5.frameElement === null
            } catch (cf) {
            }
            if (c2.doScroll && ai && b5.external) {
                bI()
            }
        }
    }
    avalon.bind(b5, "load", al);
    avalon.ready = function (e) {
        if (!ak) {
            aK.push(e)
        } else {
            e(avalon)
        }
    };
    avalon.config({loader: false});
    avalon.ready(function () {
        avalon.scan(cy.body)
    });
    if (typeof define === "function" && define.amd) {
        define("avalon", [], function () {
            return avalon
        })
    }
    var aE = b5.avalon;
    avalon.noConflict = function (e) {
        if (e && b5.avalon === avalon) {
            b5.avalon = aE
        }
        return avalon
    };
    if (a1 === void 0) {
        b5.avalon = avalon
    }
    return avalon
}));