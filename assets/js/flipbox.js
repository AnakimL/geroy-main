"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* FlipBook v1.0.0-165 */
(function () {
  if (!this.flipbook) {
    var e = {},
        n = {},
        t = function t(n) {
      var t = [],
          n = n || "";

      for (var o in e) {
        0 === o.indexOf(n) && t.push(o);
      }

      return t;
    },
        o = function o(a, s) {
      var l,
          d = r(s, a),
          p = n[d];
      if (p) return p.exports;
      if (!(l = e[d] || e[d = r(d, "./index")])) throw "module '" + a + "' not found";
      p = {
        id: d,
        exports: {}
      };

      try {
        n[d] = p;

        var f = function f(e) {
          return o(e, i(d));
        };

        return f.modules = t, l(p.exports, f, p), p.exports;
      } catch (c) {
        throw delete n[d], c;
      }
    },
        r = function r(e, n) {
      var t,
          o,
          r = [];
      t = /^\.\.?(\/|$)/.test(n) ? [e, n].join("/").split("/") : n.split("/");

      for (var i = 0, a = t.length; a > i; i++) {
        o = t[i], ".." == o ? r.pop() : "." != o && "" != o && r.push(o);
      }

      return r.join("/");
    },
        i = function i(e) {
      return e.split("/").slice(0, -1).join("/");
    };

    this.flipbook = function (e) {
      return o(e, "");
    }, this.flipbook.define = function (n) {
      for (var t in n) {
        e[t] = n[t];
      }
    }, this.flipbook.modules = t;
  }

  return this.flipbook.define;
}).call(void 0)({
  "cog/events": function cogEvents(e, n, t) {
    var o,
        r,
        i,
        a = [].slice;
    i = n("../util/uid"), r = n("../util/array/without"), o = function () {
      function e() {}

      return e.mixin = function () {
        var e, n, t, o, r, i, s;

        for (o = arguments.length >= 1 ? a.call(arguments, 0) : [], r = 0, i = o.length; i > r; r++) {
          t = o[r], s = this.prototype;

          for (n in s) {
            e = s[n], t[n] = e;
          }
        }

        return this;
      }, e.prototype.emit = function () {
        var e, n, t, o, r, i, s;
        if (n = arguments[0], e = arguments.length >= 2 ? a.call(arguments, 1) : [], !(null != (i = this._events) ? i[n] : void 0)) return !1;

        for (s = this._events[n], o = 0, r = s.length; r > o; o++) {
          t = s[o], t.apply(null, e);
        }

        return !0;
      }, e.prototype.trigger = e.prototype.emit, e.prototype.fire = e.prototype.emit, e.prototype.addListener = function (e, n) {
        var t;
        return this.emit("newListener", e, n), (null != (t = null != this._events ? this._events : this._events = {})[e] ? (t = null != this._events ? this._events : this._events = {})[e] : t[e] = []).push(n), this;
      }, e.prototype.on = e.prototype.addListener, e.prototype.once = function (e, n) {
        var _t,
            o = this;

        return _t = function t() {
          return o.removeListener(e, _t), n.apply(null, arguments);
        }, this.on(e, _t), this;
      }, e.prototype.removeListener = function (e, n) {
        var t, o;
        return (null != (o = this._events) ? o[e] : void 0) ? (this._events[e] = function () {
          var o, r, i, a;

          for (i = this._events[e], a = [], o = 0, r = i.length; r > o; o++) {
            t = i[o], t !== n && a.push(t);
          }

          return a;
        }.call(this), 0 === this._events[e].length && delete this._events[e], this) : this;
      }, e.prototype.off = e.prototype.removeListener, e.prototype.removeAllListeners = function (e) {
        return null != this._events && delete this._events[e], this;
      }, e.prototype.listeners = function (e) {
        var n;
        return (null != (n = this._events) ? n[e] : void 0) ? this.events[e] : [];
      }, e.prototype.listenTo = function (e, n, t) {
        var o, r;
        return null == e || null == n || null == t ? this : (o = null != e._emitterId ? e._emitterId : e._emitterId = i(), null == (r = null != this._emitterBindings ? this._emitterBindings : this._emitterBindings = {})[o] && (r[o] = []), this._emitterBindings[o].push({
          target: e,
          message: n,
          action: t
        }), e.on(n, t), this);
      }, e.prototype.stopListening = function (e, n, t) {
        var o, i, a, s, l, d, p, f, c, u, h, g, b, m, k;
        if (null == this._emitterBindings) return this;

        if (null == e) {
          m = this._emitterBindings;

          for (s in m) {
            for (a = m[s], f = 0, h = a.length; h > f; f++) {
              k = a[f], p = k.target, l = k.message, o = k.action, p.off(l, o);
            }
          }

          this._emitterBindings = {};
        } else {
          if (a = this._emitterBindings[e._emitterId], null == a) return this;
          if (d = [], null == n) for (; i = a.pop();) {
            p = i.target, l = i.message, o = i.action, p.off(l, o);
          } else if (null == t) for (c = 0, g = a.length; g > c; c++) {
            i = a[c], i.message === n && (p = i.target, l = i.message, o = i.action, p.off(l, o), d.push(i));
          } else for (u = 0, b = a.length; b > u; u++) {
            i = a[u], i.message === n && i.action === t && (p = i.target, l = i.message, o = i.action, p.off(l, o), d.push(i));
          }
          d.length > 0 && (this._emitterBindings[e._emitterId] = r(a, d));
        }

        return null != e && 0 === this._emitterBindings[e._emitterId].length && delete this._emitterBindings[e._emitterId], this;
      }, e.prototype.stop = e.prototype.stopListening, e;
    }(), t.exports = o;
  },
  "cog/object": function cogObject(e, n, t) {
    var o, r, i;
    r = n("./events"), i = function i(e) {
      var n, t, o, r, i, a;

      for (a = Array.prototype.slice.call(arguments, 1), r = 0, i = a.length; i > r; r++) {
        if (t = a[r]) for (n in t) {
          o = t[n], e[n] = o;
        }
      }

      return e;
    }, o = function () {
      function e(e) {
        null == e && (e = {}), this._previous = {}, i(this, e);
      }

      return r.mixin(e.prototype), e.prototype.get = function (e, n) {
        var t, o;
        return null != (t = null != (o = "function" == typeof this[e] ? this[e]() : void 0) ? o : this[e]) ? t : n;
      }, e.prototype.toggle = function (e, n) {
        return "boolean" == typeof n ? this.set(e, n) : this.set(e, !this.get(e)), this;
      }, e.prototype.set = function (e, n) {
        var t, o, r, i, a;
        if (t = {}, o = !1, "string" == typeof e) this[e] !== n && (i = this[e], this[e] = n, t[e] = n, this._previous[e] = i, o = !0, this.fire("change:" + e, n, i, this));else for (r in e) {
          a = e[r], this[r] !== a && (i = this[r], this[r] = a, t[r] = a, this._previous[r] = i, o = !0, this.fire("change:" + r, a, i, this));
        }
        return o && this.fire("change", t, this), this._previous = {}, this;
      }, e.prototype.hasChanged = function (e) {
        return e in this._previous;
      }, e.prototype.previous = function (e) {
        var n;
        return null != (n = this._previous[e]) ? n : null;
      }, e;
    }(), t.exports = o;
  },
  "cog/view": function cogView(e, n, t) {
    var o, r, i, a;
    r = n("./events"), a = n("util/uid"), i = n("util/log").prefix("cog.view:"), o = function () {
      function e(e) {
        var n, t, o, r;
        this.options = null != e ? e : {}, n = null != (t = null != (o = this.constructor.name) ? o : this.constructor.displayName) ? t : "view", this.id = a("" + n + "-"), this.model = null != (r = this.options.model) ? r : {}, this._createElem(), this.assignEvents(), "function" == typeof this.initialize && this.initialize();
      }

      return r.mixin(e, e.prototype), e.prototype.tagName = "div", e.prototype.className = "view", e.prototype.template = null, e.prototype.events = {}, e.prototype.outlets = {}, e.prototype._createElem = function () {
        return this.elem = null != this.options.elem ? $(this.options.elem) : $("<" + this.tagName + " id='" + this.id + "' class='" + this.className + "'></" + this.tagName + ">");
      }, e.prototype.assignEvents = function () {
        var e, n, t, o, r;
        r = this.events;

        for (t in r) {
          e = r[t], n = t.split(" "), n.length > 1 ? (t = n.shift(), o = n.join(" "), this.elem.on(t, o, this[e])) : this.elem.on(t, this[e]);
        }

        return this;
      }, e.prototype.unassignEvents = function () {
        var e, n, t, o, r;
        r = this.events;

        for (t in r) {
          e = r[t], n = t.split(" "), n.length > 1 ? (t = n.shift(), o = n.join(" "), this.elem.off(t, o, this[e])) : this.elem.off(t, this[e]);
        }

        return this;
      }, e.prototype.assignOutlets = function () {
        var e, n, t;
        this.ui = {}, t = this.outlets;

        for (e in t) {
          n = t[e], this.ui[e] = this.elem.find(n), this[e] = this.elem.find(n);
        }

        return this;
      }, e.prototype.unassignOutlets = function () {
        var e, n, t;
        t = this.ui;

        for (n in t) {
          e = t[n], delete this.ui[n], delete this[n];
        }

        return this;
      }, e.prototype.dispose = function () {
        return this.unassignEvents(), this.unassignOutlets(), this;
      }, e.prototype.close = function () {
        return "function" == typeof this.beforeClose && this.beforeClose(), this.dispose(), this.elem.remove(), "function" == typeof this.onClose && this.onClose(), this;
      }, e.prototype.remove = function () {
        return this.unassignEvents(), this.elem.remove(), this;
      }, e.prototype.detach = function () {
        return this.elem.detach(), this;
      }, e.prototype.getData = function () {
        var e, n;
        return null != (n = "function" == typeof (e = this.model).toJSON ? e.toJSON() : void 0) ? n : this.model;
      }, e.prototype.appendTo = function (e) {
        return this.containingElem = e, this.render(), e.append(this.elem), "function" == typeof this.onDomActive && this.onDomActive(), this;
      }, e.prototype.render = function () {
        var e, n;
        return "function" == typeof this.beforeRender && this.beforeRender(), this.fire("before:render", this), e = this.getData(), n = this.template(e), this.elem.html(n), this.assignOutlets(), "function" == typeof this.onRender && this.onRender(), this.fire("render", this), this;
      }, e;
    }(), t.exports = o;
  },
  env: function env(e, n, t) {
    var o, r, i, a;
    i = null != (a = "undefined" != typeof window && null !== window ? window : global) ? a : this, r = null != r ? r : {
      userAgent: "non-browser"
    }, o = function () {
      var e;
      return null != i.localStorage ? (e = localStorage.getItem("firstTimeToFlipBook"), localStorage.setItem("firstTimeToFlipBook", !1), e !== !1 && "false" !== e) : !1;
    }(), t.exports = {
      version: n("version"),
      embedded: !0,
      debug: !1,
      test: !1,
      firstRun: o,
      mobile: null != r.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
      msie: null != r.userAgent.match(/(MSIE)/)
    };
  },
  lifecycle: function lifecycle(e, n, t) {
    var o, r;
    o = n("cog/events"), r = {}, o.mixin(r), t.exports = r;
  },
  main: function main(e, n) {
    var t, o, r, i, a, s, l, d, p;
    r = n("env"), l = n("util/log").prefix("flipbook:"), o = n("util/ensure"), s = n("lifecycle"), p = n("scanner"), d = n("plugin"), t = n("viewer/index"), i = function i() {
      return r.mobile ? o.libs.hammer() : null;
    }, o("jquery", i, function (e) {
      if (null != e) throw e;
      return $(a);
    }), a = function a() {
      return r.debug && l.level(2), l.info("FlipBook v" + r.version), l.debug("ENV", r), d.install(), s.fire("init"), p.run(), s.fire("ready");
    }, r.debug && r.mobile && o("firebug", function () {
      return window.onerror = function (e) {
        return l.info("ERROR!", e);
      };
    });
  },
  plugin: function plugin(e, n, t) {
    var o, r, i, a, s;
    i = n("util/log").prefix("plugin:"), a = n("scanner"), s = n("viewer/validator"), o = n("viewer/index"), r = function r(e, n) {
      var t, r;
      if ("scan" === e) t = a.run();else if ("string" == typeof e && null != n) "set" === e && "object" == _typeof(n) ? $(this).data("controller").set(n) : $(this).data("controller").set(e, n);else {
        if ("object" != _typeof(e)) throw Error("Unknown arguments for flipbook");
        if (s(e)) return r = new o(e), this !== window && r.appendTo($(this)), this;
        i.info("! Invalid model:", s.errors(), e);
      }
      return this;
    }, t.exports = {
      install: function install() {
        return $.fn.flipbook = r, $.flipbook = r;
      }
    };
  },
  scanner: function scanner(e, n, t) {
    var o, r, i, a, s, l;
    a = n("util/log").prefix("scanner:"), i = n("lifecycle"), l = n("viewer/validator"), o = n("viewer/index"), s = [], t.exports = r = {
      define: function define(e) {
        return s.push(e), this;
      },
      scan: function scan() {
        var e, n, t, o, r, i, a, l;

        for (n = [], o = 0, i = s.length; i > o; o++) {
          for (t = s[o], l = t(), r = 0, a = l.length; a > r; r++) {
            e = l[r], n.push(e);
          }
        }

        return n;
      },
      build: function build(e) {
        var n, t, r, i, s, d;

        for (i = 0, s = e.length; s > i; i++) {
          d = e[i], n = d.item, t = d.model, l(t) ? $(n).is(".flipbook-container") || (r = new o(t), r.appendTo($(n)), $(n).addClass("flipbook-container")) : a.info("! Invalid model:", l.errors(), t);
        }

        return this;
      },
      run: function run() {
        return this.build(this.scan());
      }
    }, r.define(function () {
      var e;
      return e = [], $("[data-flipbook]").each(function (n, t) {
        var o, r, i, a, s, l, d, p, f;

        for (o = $(t).data("flipbook"), i = {}, f = o.split(","), d = 0, p = f.length; p > d; d++) {
          s = f[d], a = s.split(":"), r = a.shift(), l = a.join(":"), i[$.trim(r)] = $.trim(l);
        }

        return e.push({
          item: t,
          model: i
        });
      }), e;
    }), r.define(function () {
      var e, n;
      return n = [], e = /-([a-z])/g, $("[data-flipbook-pages]").each(function (t, o) {
        var r, i, a, s, l, d, p, f, c;

        for (t = $(o), i = {}, p = o.attributes, l = 0, d = p.length; d > l; l++) {
          r = p[l], a = (null != (f = r.name) ? f : r.nodeName) + "", 0 === a.indexOf("data-flipbook-") && (a = a.replace("data-flipbook-", ""), s = a.replace(e, function (e) {
            return e[1].toUpperCase();
          }), i[s] = null != (c = r.value) ? c : r.nodeValue);
        }

        return n.push({
          item: o,
          model: i
        });
      }), n;
    }), r.define(function () {
      var e, n;
      return n = [], e = /-([a-z])/g, $("[flipbook-pages]").each(function (t, o) {
        var r, i, a, s, l, d, p, f, c;

        for (t = $(o), i = {}, p = o.attributes, l = 0, d = p.length; d > l; l++) {
          r = p[l], a = (null != (f = r.name) ? f : r.nodeName) + "", 0 === a.indexOf("flipbook-") && (a = a.replace("flipbook-", ""), s = a.replace(e, function (e) {
            return e[1].toUpperCase();
          }), i[s] = null != (c = r.value) ? c : r.nodeValue);
        }

        return n.push({
          item: o,
          model: i
        });
      }), n;
    }), r.define(function () {
      var e, n;
      return n = [], e = /-([a-z])/g, $("flipbook").each(function (t, o) {
        var r, i, a, s, l, d, p, f, c;

        for (t = $(o), i = {}, p = o.attributes, l = 0, d = p.length; d > l; l++) {
          r = p[l], a = (null != (f = r.name) ? f : r.nodeName) + "", s = a.replace(e, function (e) {
            return e[1].toUpperCase();
          }), i[s] = null != (c = r.value) ? c : r.nodeValue;
        }

        return n.push({
          item: o,
          model: i
        });
      }), n;
    });
  },
  start: function start(e, n, t) {
    t.exports = n("./main");
  },
  "themes/embedded": function themesEmbedded(e, n, t) {
    var o = null,
        r = 'flipbook {\n  display: block;\n}\n.flipbook div,\n.flipbook span,\n.flipbook object,\n.flipbook iframe,\n.flipbook h1,\n.flipbook h2,\n.flipbook h3,\n.flipbook h4,\n.flipbook h5,\n.flipbook h6,\n.flipbook p,\n.flipbook pre,\n.flipbook a,\n.flipbook abbr,\n.flipbook acronym,\n.flipbook address,\n.flipbook code,\n.flipbook del,\n.flipbook dfn,\n.flipbook em,\n.flipbook img,\n.flipbook dl,\n.flipbook dt,\n.flipbook dd,\n.flipbook ol,\n.flipbook ul,\n.flipbook li,\n.flipbook fieldset,\n.flipbook form,\n.flipbook label,\n.flipbook legend,\n.flipbook caption,\n.flipbook tbody,\n.flipbook tfoot,\n.flipbook thead,\n.flipbook tr {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-weight: inherit;\n  font-style: inherit;\n  font-family: inherit;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n.flipbook table {\n  border-collapse: separate;\n  border-spacing: 0;\n  vertical-align: middle;\n}\n.flipbook caption,\n.flipbook th,\n.flipbook td {\n  text-align: left;\n  font-weight: normal;\n  vertical-align: middle;\n}\n.flipbook a img {\n  border: none;\n}\n.flipbook,\n.flipbook * {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.flipbook {\n  font-family: "Helvetica Neue", Helvetica, Sans-Serif;\n  font-size: 16px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 100%;\n  max-width: 100%;\n  cursor: default;\n  margin: 0 auto;\n}\n.flipbook:focus {\n  outline: 0;\n  border: 0;\n}\n.flipbook header {\n  z-index: 5;\n  display: relative;\n}\n.flipbook header h3 {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n  font-size: 120%;\n  white-space: nowrap;\n}\n.flipbook header h3 span {\n  font-weight: normal;\n  font-size: 85%;\n}\n.flipbook header .zoom,\n.flipbook header .help {\n  padding: 2px;\n  width: 26px;\n  float: right;\n  text-align: center;\n  cursor: pointer;\n}\n.flipbook header .zoom span,\n.flipbook header .help span {\n  display: block;\n  text-align: center;\n}\n.flipbook header .zoom.disabled,\n.flipbook header .help.disabled {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n  cursor: default;\n}\n.flipbook header .zoom span {\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  -o-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n.flipbook header .help {\n  font-family: "times new roman", serif;\n}\n.flipbook .screen-stack {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  max-width: 100%;\n  z-index: 10;\n}\n.flipbook .screen-stack .errors {\n  padding: 25px;\n  text-align: center;\n  border: 1px solid #f00;\n  background-color: #fff;\n  color: #800000;\n}\n.flipbook .screen-stack .blocker {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.flipbook .screen-stack .screen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  max-width: 100%;\n  text-align: center;\n}\n.flipbook .screen-stack .screen img {\n  max-width: 100%;\n  margin: 0 auto;\n}\n.flipbook .screen-stack .screen.content-screen {\n  display: none;\n  height: 100%;\n  background: rgba(0,0,0,0.7);\n  color: #fff;\n  width: 100%;\n  position: relative;\n  text-shadow: 0px 1px 0px #000;\n}\n.flipbook .screen-stack .screen.content-screen .container {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n.flipbook .screen-stack .screen.content-screen .body {\n  display: table-cell;\n  vertical-align: middle;\n}\n.flipbook .screen-stack .screen.content-screen .close {\n  position: absolute;\n  display: block;\n  top: 0.5em;\n  right: 1em;\n  font-size: 25px;\n  font-family: Times, Serif;\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  -o-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg);\n  cursor: pointer;\n}\n.flipbook .screen-stack .screen.help-content {\n  padding: 1em;\n  overflow: auto;\n  font-size: 12px;\n}\n.flipbook .screen-stack .screen.help-content dt {\n  padding: 1em;\n  font-weight: bold;\n  font-size: 120%;\n}\n.flipbook .screen-stack .screen.help-content dt span {\n  font-size: 120%;\n}\n.flipbook .screen-stack .screen.help-content dd {\n  margin-bottom: 2em;\n}\n.flipbook .screen-stack .screen.help-content table {\n  display: inline-block;\n}\n.flipbook .screen-stack .screen.help-content th {\n  text-align: right;\n  color: #999;\n  white-space: nowrap;\n}\n.flipbook .screen-stack .screen.help-content th kbd {\n  font-family: Times, Serif;\n  display: inline-block;\n  text-align: center;\n  min-width: 2em;\n  font-size: 11px;\n  color: #fff;\n  border: 1px solid #ddd;\n  border-bottom: 3px solid #ddd;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  padding: 0.25em;\n  text-shadow: none;\n  text-transform: uppercase;\n  border-color: #aaa;\n  border-bottom-color: #999;\n  background-color: #ddd;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ddd), color-stop(1, #fff));\n  background: -webkit-linear-gradient(top, #ddd 0, #fff 100%);\n  background: -moz-linear-gradient(top, #ddd 0, #fff 100%);\n  background: -o-linear-gradient(top, #ddd 0, #fff 100%);\n  background: -ms-linear-gradient(top, #ddd 0, #fff 100%);\n  background: linear-gradient(top, #ddd 0, #fff 100%);\n  color: #555;\n  -webkit-box-shadow: 0px 2px 2px #000;\n  box-shadow: 0px 2px 2px #000;\n}\n.flipbook .screen-stack .screen.help-content td {\n  padding: 0.25em;\n  padding-left: 1em;\n  text-align: left;\n  vertical-align: middel;\n}\n.flipbook .screen-stack .screen.help-content .info {\n  display: absolute;\n  bottom: 0px;\n}\n.flipbook .screen-stack .screen.the-end {\n  text-align: center;\n}\n.flipbook .screen-stack .screen.the-end .body {\n  text-align: center;\n}\n.flipbook .screen-stack .screen.the-end .restart {\n  display: inline-block;\n  border: 3px dotted #fff;\n  -webkit-border-radius: 15px;\n  border-radius: 15px;\n  cursor: pointer;\n}\n.flipbook .screen-stack .screen.the-end .restart .icon {\n  text-align: center;\n  font-size: 75px;\n  display: block;\n  cursor: pointer;\n  line-height: 75px;\n}\n.flipbook .screen-stack .screen.the-end .restart label {\n  text-align: center;\n  display: block;\n  font-size: 90%;\n  margin: 15px;\n  cursor: pointer;\n  text-shadow: 0px 1px 0px #000;\n}\n.flipbook footer {\n  text-align: center;\n  z-index: 5;\n}\n.flipbook footer.copyright {\n  font-size: 75%;\n  padding: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n}\n.flipbook footer.pager {\n  position: relative;\n  padding: 3px;\n  height: 35px;\n  line-height: 28px;\n}\n.flipbook footer.pager .progress {\n  display: block;\n  height: 28px;\n  margin: 0 33px;\n  position: relative;\n}\n.flipbook footer.pager .progress.errors .bar.background {\n  visibility: hidden;\n}\n.flipbook footer.pager .progress .bar {\n  position: absolute;\n  height: 14px;\n  line-height: 14px;\n  top: 7px;\n  overflow: hidden;\n}\n.flipbook footer.pager .progress .bar span {\n  background: rgba(255,255,255,0.1);\n  display: block;\n  float: right;\n  height: 14px;\n  overflow: hidden;\n  width: 1px;\n}\n.flipbook footer.pager .progress .bar.done {\n  width: 100% !important;\n}\n.flipbook footer.pager .progress .bar.done span {\n  display: none;\n}\n.flipbook footer.pager .progress .bar.start {\n  opacity: 0;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\n  filter: alpha(opacity=0);\n}\n.flipbook footer.pager .progress .bar.start span {\n  display: none;\n}\n.flipbook footer.pager .progress .bar.background {\n  background: #aaa;\n  width: 100%;\n}\n.flipbook footer.pager .progress .bar.loading {\n  background-color: #bbb;\n  width: 1%;\n  height: 10px;\n  top: 9px;\n}\n.flipbook footer.pager .progress .bar.location {\n  background-color: #ccc;\n  width: 0%;\n  height: 12px;\n  top: 8px;\n}\n.flipbook footer.pager .progress .bar.position {\n  width: 100%;\n  text-align: center;\n  font-size: 10px;\n}\n.flipbook footer.pager .button {\n  width: 30px;\n  height: 28px;\n  line-height: 28px;\n  overflow: hidden;\n  cursor: pointer;\n  font-size: 195%;\n}\n.flipbook footer.pager .button span {\n  display: block;\n}\n.flipbook footer.pager .button.nextPage {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n}\n.flipbook footer.pager .button.prevPage {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n}\n.flipbook footer.pager .button.prevPage span {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.flipbook footer.pager .button.disabled {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n  cursor: default;\n}\n.flipbook.animated .bar {\n  -webkit-transition: width 150ms, opacity 150ms;\n  -moz-transition: width 150ms, opacity 150ms;\n  -o-transition: width 150ms, opacity 150ms;\n  -ms-transition: width 150ms, opacity 150ms;\n  transition: width 150ms, opacity 150ms;\n}\n.flipbook.animated .button {\n  -webkit-transition: opacity 150ms;\n  -moz-transition: opacity 150ms;\n  -o-transition: opacity 150ms;\n  -ms-transition: opacity 150ms;\n  transition: opacity 150ms;\n}\n.flipbook.isMobile .help-content .body {\n  overflow: scroll !important;\n}\n.flipbook.isMobile .help-content dl {\n  margin: 0 auto;\n  margin-bottom: 1em !important;\n  max-width: 20em;\n}\n.flipbook.isMobile .help-content dt {\n  padding-bottom: 0px !important;\n}\n.flipbook.isMobile .help-content dd {\n  margin: 0 !important;\n}\n.flipbook.isDesktop.inactive .bar,\n.flipbook.isDesktop.inactive .button,\n.flipbook.isDesktop.inactive .header h3 {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n}\n.flipbook.isDesktop .the-end .restart:hover {\n  background: rgba(0,0,0,0.2);\n}\n.flipbook.zoomed {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 1000000;\n}\n.flipbook.zoomed header .zoom span {\n  -webkit-transform: rotate(135deg);\n  -moz-transform: rotate(135deg);\n  -o-transform: rotate(135deg);\n  -ms-transform: rotate(135deg);\n  transform: rotate(135deg);\n}\n.flipbook.zoomed .screen-stack {\n  display: table !important;\n  position: absolute !important;\n  left: 0px !important;\n  right: 0px !important;\n}\n.flipbook.zoomed .screen-stack .blocker {\n  position: absolute !important;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  right: 0;\n}\n.flipbook.zoomed .screen-stack .screen {\n  position: static !important;\n  vertical-align: middle !important;\n  text-align: center;\n  width: 100%;\n  height: 100%;\n}\n.flipbook.zoomed .screen-stack .screen img {\n  display: inline;\n}\n.flipbook.zoomed .screen-stack .screen.content-screen {\n  position: absolute !important;\n}\n.flipbook.zoomed .copyright {\n  position: absolute !important;\n  bottom: 35px !important;\n  width: 100% !important;\n}\n.flipbook.zoomed .pager {\n  position: absolute !important;\n  bottom: 0 !important;\n  width: 100% !important;\n}\n.flipbook.theme-dark {\n  font-family: "Helvetica Neue", Helvetica, Sans-Serif;\n  color: #ddd;\n  color: #fff;\n  background-color: #222;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n  -webkit-border-bottom-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n  -webkit-box-shadow: 0px 2px 4px #999;\n  box-shadow: 0px 2px 4px #999;\n}\n.flipbook.theme-dark:focus {\n  color: #fff;\n}\n.flipbook.theme-dark .button {\n  color: #ccc;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n}\n.flipbook.theme-dark .button.disabled {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n}\n.flipbook.theme-dark .button.down {\n  background: #393939;\n}\n.flipbook.theme-dark header {\n  background: none;\n  padding: 5px;\n}\n.flipbook.theme-dark header h3 {\n  padding-left: 5px;\n  text-shadow: 0px -2px 0px #000;\n}\n.flipbook.theme-dark header h3 span {\n  color: #aaa;\n}\n.flipbook.theme-dark .screen-stack .errors {\n  padding: 25px;\n  text-align: center;\n  color: #900;\n  border: 0;\n  background-color: #fff;\n  border: 1px solid #000;\n}\n.flipbook.theme-dark .screen-stack .screen {\n  background-color: #000;\n}\n.flipbook.theme-dark .screen-stack .screen.content-screen {\n  background: rgba(0,0,0,0.7);\n  color: #fff;\n  text-align: center;\n}\n.flipbook.theme-dark footer {\n  background: none;\n}\n.flipbook.theme-dark footer.copyright {\n  background: #000;\n  border-bottom: 1px solid #333;\n  color: #555;\n}\n.flipbook.theme-dark footer.pager {\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.flipbook.theme-dark footer.pager .progress .bar {\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.flipbook.theme-dark footer.pager .progress .bar.done {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  border: 0;\n}\n.flipbook.theme-dark footer.pager .progress .bar.background {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  background: #000;\n}\n.flipbook.theme-dark footer.pager .progress .bar.loading {\n  background-color: #3f3f3f;\n}\n.flipbook.theme-dark footer.pager .progress .bar.loading.done {\n  background-color: #1a1a1a;\n}\n.flipbook.theme-dark footer.pager .progress .bar.location {\n  background-color: #444;\n  border-right: 1px solid #000;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(1, #333));\n  background: -webkit-linear-gradient(top, #444 0, #333 100%);\n  background: -moz-linear-gradient(top, #444 0, #333 100%);\n  background: -o-linear-gradient(top, #444 0, #333 100%);\n  background: -ms-linear-gradient(top, #444 0, #333 100%);\n  background: linear-gradient(top, #444 0, #333 100%);\n}\n.flipbook.theme-dark footer.pager .progress .bar.location span {\n  background-color: #000;\n}\n.flipbook.theme-dark footer.pager .progress .bar.position {\n  color: #777;\n  text-shadow: 0px -1px 0px #000;\n}\n.flipbook.theme-dark.zoomed {\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-dark.zoomed header {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-dark.zoomed footer {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-dark.zoomed .screen {\n  background-color: #000;\n}\n.flipbook.theme-dark.isDesktop .button:hover {\n  background: #393939;\n}\n.flipbook.theme-dark.isDesktop .button.disabled:hover {\n  background: none;\n}\n.flipbook.theme-gray {\n  font-family: "Helvetica Neue", Helvetica, Sans-Serif;\n  color: #555;\n  color: #000;\n}\n.flipbook.theme-gray:focus {\n  color: #000;\n}\n.flipbook.theme-gray .button {\n  color: #666;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n}\n.flipbook.theme-gray .button.disabled {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n}\n.flipbook.theme-gray .button.down {\n  background: #bbb;\n}\n.flipbook.theme-gray header {\n  border-top: 1px solid #ddd;\n  background: #ccc;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  margin: 0 4px;\n  padding: 5px;\n}\n.flipbook.theme-gray header h3 {\n  padding-left: 5px;\n  text-shadow: 0px 1px 0px #eee;\n}\n.flipbook.theme-gray header h3 span {\n  color: #888;\n}\n.flipbook.theme-gray .screen-stack {\n  -webkit-box-shadow: 0px 2px 9px #777;\n  box-shadow: 0px 2px 9px #777;\n}\n.flipbook.theme-gray .screen-stack .errors {\n  padding: 25px;\n  text-align: center;\n  border: 0;\n}\n.flipbook.theme-gray .screen-stack .screen.the-end {\n  background: rgba(0,0,0,0.7);\n  color: #fff;\n  text-align: center;\n}\n.flipbook.theme-gray footer {\n  background: #ccc;\n  margin: 0 4px;\n}\n.flipbook.theme-gray footer.copyright {\n  background: #bbb;\n  color: #777;\n  text-shadow: 0px 1px 0px #eee;\n}\n.flipbook.theme-gray footer.pager {\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-top: 1px solid #ddd;\n  border-bottom: 1px solid #bbb;\n}\n.flipbook.theme-gray footer.pager .progress .bar {\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.flipbook.theme-gray footer.pager .progress .bar.done {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  border: 0;\n}\n.flipbook.theme-gray footer.pager .progress .bar.background {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  background: #aaa;\n}\n.flipbook.theme-gray footer.pager .progress .bar.loading {\n  background-color: #bbb;\n}\n.flipbook.theme-gray footer.pager .progress .bar.location {\n  background-color: #ccc;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ddd), color-stop(1, #aaa));\n  background: -webkit-linear-gradient(top, #ddd 0, #aaa 100%);\n  background: -moz-linear-gradient(top, #ddd 0, #aaa 100%);\n  background: -o-linear-gradient(top, #ddd 0, #aaa 100%);\n  background: -ms-linear-gradient(top, #ddd 0, #aaa 100%);\n  background: linear-gradient(top, #ddd 0, #aaa 100%);\n  border-right: 1px solid #aaa;\n}\n.flipbook.theme-gray footer.pager .progress .bar.position {\n  color: #777;\n  text-shadow: 0px 1px 0px #ddd;\n}\n.flipbook.theme-gray.zoomed {\n  background-color: #fff;\n  background-color: #efefef;\n}\n.flipbook.theme-gray.zoomed header {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-gray.zoomed .screen-stack {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.flipbook.theme-gray.zoomed footer {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-gray.isDesktop .button:hover {\n  background: #e0e0e0;\n}\n.flipbook.theme-gray.isDesktop .button.disabled:hover {\n  background: none;\n}\n.flipbook.theme-gray.isDesktop .button.down:hover {\n  background: #b9b9b9;\n}\n.flipbook.theme-light,\n.flipbook.theme-light-shiny {\n  font-family: "Helvetica Neue", Helvetica, Sans-Serif;\n  color: #555;\n  color: #000;\n  background: #fff;\n  -webkit-box-shadow: 0px 1px 4px #aaa;\n  box-shadow: 0px 1px 4px #aaa;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n}\n.flipbook.theme-light:focus,\n.flipbook.theme-light-shiny:focus {\n  color: #000;\n}\n.flipbook.theme-light .button,\n.flipbook.theme-light-shiny .button {\n  color: #777;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n  border: 1px solid transparent;\n}\n.flipbook.theme-light .button.disabled,\n.flipbook.theme-light-shiny .button.disabled {\n  opacity: 0.3;\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  filter: alpha(opacity=30);\n}\n.flipbook.theme-light .button.down,\n.flipbook.theme-light-shiny .button.down {\n  background: #ddd;\n  border: 1px solid #ccc;\n}\n.flipbook.theme-light header,\n.flipbook.theme-light-shiny header {\n  border: 1px solid #ccc;\n  background: none;\n  padding: 5px;\n  z-index: 20;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(1, #f0f0f0));\n  background: -webkit-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -moz-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -o-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -ms-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: linear-gradient(top, #fff 0, #f0f0f0 100%);\n  -webkit-border-top-left-radius: 3px;\n  border-top-left-radius: 3px;\n  -webkit-border-top-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.flipbook.theme-light header h3,\n.flipbook.theme-light-shiny header h3 {\n  padding-left: 5px;\n  text-shadow: 0px 2px 0px #fff;\n}\n.flipbook.theme-light header h3 span,\n.flipbook.theme-light-shiny header h3 span {\n  color: #999;\n}\n.flipbook.theme-light .screen-stack,\n.flipbook.theme-light-shiny .screen-stack {\n  z-index: 10;\n}\n.flipbook.theme-light .screen-stack .errors,\n.flipbook.theme-light-shiny .screen-stack .errors {\n  padding: 25px;\n  text-align: center;\n  border: 0;\n}\n.flipbook.theme-light .screen-stack .screen.content-screen,\n.flipbook.theme-light-shiny .screen-stack .screen.content-screen {\n  background: rgba(0,0,0,0.7);\n  color: #fff;\n  text-align: center;\n}\n.flipbook.theme-light footer.copyright,\n.flipbook.theme-light-shiny footer.copyright {\n  color: #999;\n  background: #bbb;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #e0e0e0), color-stop(1, #efefef));\n  background: -webkit-linear-gradient(top, #e0e0e0 0, #efefef 100%);\n  background: -moz-linear-gradient(top, #e0e0e0 0, #efefef 100%);\n  background: -o-linear-gradient(top, #e0e0e0 0, #efefef 100%);\n  background: -ms-linear-gradient(top, #e0e0e0 0, #efefef 100%);\n  background: linear-gradient(top, #e0e0e0 0, #efefef 100%);\n  text-shadow: 0px 1px 0px #fff;\n}\n.flipbook.theme-light footer.pager,\n.flipbook.theme-light-shiny footer.pager {\n  border: 1px solid #ccc;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(1, #f0f0f0));\n  background: -webkit-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -moz-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -o-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: -ms-linear-gradient(top, #fff 0, #f0f0f0 100%);\n  background: linear-gradient(top, #fff 0, #f0f0f0 100%);\n  -webkit-border-bottom-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n  -webkit-border-bottom-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.flipbook.theme-light footer.pager .progress .bar,\n.flipbook.theme-light-shiny footer.pager .progress .bar {\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.flipbook.theme-light footer.pager .progress .bar.done,\n.flipbook.theme-light-shiny footer.pager .progress .bar.done {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  border: 0;\n}\n.flipbook.theme-light footer.pager .progress .bar.background,\n.flipbook.theme-light-shiny footer.pager .progress .bar.background {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  background: #ccc;\n}\n.flipbook.theme-light footer.pager .progress .bar.loading,\n.flipbook.theme-light-shiny footer.pager .progress .bar.loading {\n  background-color: #dadada;\n}\n.flipbook.theme-light footer.pager .progress .bar.location,\n.flipbook.theme-light-shiny footer.pager .progress .bar.location {\n  background-color: #eee;\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(1, #ddd));\n  background: -webkit-linear-gradient(top, #fff 0, #ddd 100%);\n  background: -moz-linear-gradient(top, #fff 0, #ddd 100%);\n  background: -o-linear-gradient(top, #fff 0, #ddd 100%);\n  background: -ms-linear-gradient(top, #fff 0, #ddd 100%);\n  background: linear-gradient(top, #fff 0, #ddd 100%);\n  border-right: 1px solid #ccc;\n}\n.flipbook.theme-light footer.pager .progress .bar.position,\n.flipbook.theme-light-shiny footer.pager .progress .bar.position {\n  color: #999;\n  text-shadow: 0px 1px 0px #fff;\n}\n.flipbook.theme-light.zoomed,\n.flipbook.theme-light-shiny.zoomed {\n  -webkit-border-radius: 0;\n  border-radius: 0;\n}\n.flipbook.theme-light.zoomed header,\n.flipbook.theme-light-shiny.zoomed header {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n  z-index: 9999;\n}\n.flipbook.theme-light.zoomed footer,\n.flipbook.theme-light-shiny.zoomed footer {\n  margin: 0;\n  -webkit-border-radius: 0;\n  border-radius: 0;\n  z-index: 9999;\n}\n.flipbook.theme-light.isDesktop .button:hover,\n.flipbook.theme-light-shiny.isDesktop .button:hover {\n  background: #fff;\n  border: 1px solid #ddd;\n}\n.flipbook.theme-light.isDesktop .button.disabled:hover,\n.flipbook.theme-light-shiny.isDesktop .button.disabled:hover {\n  background: none;\n}\n.flipbook.theme-light.isDesktop .button.down:hover,\n.flipbook.theme-light-shiny.isDesktop .button.down:hover {\n  background: #d9d9d9;\n  border: 1px solid #ccc;\n}\n.flipbook.theme-light-shiny header {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(0.48, #f5f5f5), color-stop(0.52, #eee), color-stop(1, #fff));\n  background: -webkit-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -moz-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -o-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -ms-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n}\n.flipbook.theme-light-shiny footer.pager {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(0.48, #f5f5f5), color-stop(0.52, #eee), color-stop(1, #fff));\n  background: -webkit-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -moz-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -o-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -ms-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n}\n.flipbook.theme-light-shiny footer.pager .progress .bar.background {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #aaa), color-stop(1, #ccc));\n  background: -webkit-linear-gradient(top, #ccc 0, #aaa 50%, #ccc 100%);\n  background: -moz-linear-gradient(top, #ccc 0, #aaa 50%, #ccc 100%);\n  background: -o-linear-gradient(top, #ccc 0, #aaa 50%, #ccc 100%);\n  background: -ms-linear-gradient(top, #ccc 0, #aaa 50%, #ccc 100%);\n  background: linear-gradient(top, #ccc 0, #aaa 50%, #ccc 100%);\n}\n.flipbook.theme-light-shiny footer.pager .progress .bar.loading {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #dadada), color-stop(0.5, #d0d0d0), color-stop(1, #dadada));\n  background: -webkit-linear-gradient(top, #dadada 0, #d0d0d0 50%, #dadada 100%);\n  background: -moz-linear-gradient(top, #dadada 0, #d0d0d0 50%, #dadada 100%);\n  background: -o-linear-gradient(top, #dadada 0, #d0d0d0 50%, #dadada 100%);\n  background: -ms-linear-gradient(top, #dadada 0, #d0d0d0 50%, #dadada 100%);\n  background: linear-gradient(top, #dadada 0, #d0d0d0 50%, #dadada 100%);\n}\n.flipbook.theme-light-shiny footer.pager .progress .bar.location {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(0.48, #f5f5f5), color-stop(0.52, #eee), color-stop(1, #fff));\n  background: -webkit-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -moz-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -o-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: -ms-linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n  background: linear-gradient(top, #fff 0, #f5f5f5 48%, #eee 52%, #fff 100%);\n}\n.flipbook.theme-minimal header h3 span {\n  color: #999;\n}\n.flipbook.theme-minimal footer .bar {\n  margin: 0 2px !important;\n}\n.flipbook.theme-minimal footer .copyright {\n  color: #ddd !important;\n}\n.flipbook.theme-minimal footer .location span {\n  color: #ddd !important;\n}\n.flipbook.theme-minimal.zoomed header,\n.flipbook.theme-minimal.zoomed footer,\n.flipbook.theme-minimal.zoomed .screen-stack {\n  background-color: #fff;\n}\n';
    t.exports = {
      content: r,
      isActive: function isActive() {
        return null != o;
      },
      activate: function activate(e) {
        return null == o ? (e = e || document.getElementsByTagName("HEAD")[0] || document.body || document, o = document.createElement("style"), o.innerHTML = r, e.appendChild(o), this) : void 0;
      },
      deactivate: function deactivate() {
        return null != o && (o.parentNode.removeChild(o), o = null), this;
      }
    };
  },
  "util/array/without": function utilArrayWithout(e, n, t) {
    var o = [].indexOf || function (e) {
      for (var n = 0, t = this.length; t > n; n++) {
        if (n in this && this[n] === e) return n;
      }

      return -1;
    };

    t.exports = function (e, n) {
      var t, r, i, a;

      for (a = [], r = 0, i = e.length; i > r; r++) {
        t = e[r], 0 > o.call(n, t) && a.push(t);
      }

      return a;
    };
  },
  "util/defaults": function utilDefaults(e, n, t) {
    var _o, r;

    r = n("./type"), t.exports = _o = function o(e) {
      var n, t, i, a, s, l;

      for (l = Array.prototype.slice.call(arguments, 1), a = 0, s = l.length; s > a; a++) {
        if (t = l[a]) for (n in t) {
          i = t[n], null == e[n] ? e[n] = i : "object" === r(e[n]) && (e[n] = _o({}, e[n], i));
        }
      }

      return e;
    };
  },
  "util/ensure": function utilEnsure(e, n, t) {
    var o,
        r,
        i,
        a,
        s = [].slice;
    o = {
      angular: function (_angular) {
        function angular() {
          return _angular.apply(this, arguments);
        }

        angular.toString = function () {
          return _angular.toString();
        };

        return angular;
      }(function () {
        return "undefined" != typeof angular && null !== angular ? angular : "//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js";
      }),
      backbone: function backbone() {
        return "undefined" != typeof Backbone && null !== Backbone ? Backbone : "//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js";
      },
      fastclick: function fastclick() {
        return "undefined" != typeof FastClick && null !== FastClick ? FastClick : "//cdnjs.cloudflare.com/ajax/libs/fastclick/0.6.0/fastclick.min.js";
      },
      firebug: function firebug() {
        return "undefined" != typeof FBL && null !== FBL ? FBL : "https://getfirebug.com/releases/lite/1.4/firebug-lite.js";
      },
      hammer: function hammer() {
        return "undefined" != typeof Hammer && null !== Hammer ? Hammer : "https://raw.github.com/EightMedia/hammer.js/v1.0.3/dist/hammer.min.js";
      },
      jquery: function jquery() {
        return "undefined" != typeof jQuery && null !== jQuery ? jQuery : "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
      },
      jqueryui: function jqueryui() {
        var e;
        return null != (e = "undefined" != typeof jQuery && null !== jQuery ? jQuery.Widget : void 0) ? e : "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js";
      },
      underscore: function underscore() {
        return "undefined" != typeof _ && null !== _ ? _ : "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js";
      },
      webfont: function webfont() {
        return "undefined" != typeof WebFont && null !== WebFont ? WebFont : "//ajax.googleapis.com/ajax/libs/webfont/1.1.2/webfont.js";
      },
      zepto: function zepto() {
        return "undefined" != typeof Zepto && null !== Zepto ? Zepto : "//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js";
      }
    }, a = "file:" === location.protocol ? "http:" : "", r = function r(e, n) {
      var t, r, s, l;
      return r = null != (s = null != (l = "function" == typeof e ? e() : void 0) ? l : "function" == typeof o[e] ? o[e]() : void 0) ? s : null, "string" != typeof r ? n(null) : (t = document.createElement("script"), t.type = "text/javascript", i.defer && (t.defer = !0), i.async && (t.async = !0), t.onload = function () {
        return n(null);
      }, t.onerror = function () {
        return n(Error("Could not load external resource: " + e + " from " + r));
      }, t.src = "/" === r[0] ? "" + a + r : r, t.onreadystatechange = function () {
        return "loaded" === t.readyState || "complete" === t.readyState ? (t.onreadystatechange = null, n(null)) : void 0;
      }, document.getElementsByTagName("HTML")[0].appendChild(t), t);
    }, i = function i() {
      var e, n, _t2, o;

      return n = arguments.length >= 1 ? s.call(arguments, 0) : [], e = "function" == typeof n.slice(-1)[0] ? n.pop() : function (e) {
        if (null != e) throw e;
        return "undefined" != typeof console && null !== console ? "function" == typeof console.log ? console.log("Library loading complete.") : void 0 : void 0;
      }, o = n.shift(), _t2 = function t(i) {
        return null != i ? e(i) : 0 === n.length ? e(null) : (o = n.shift(), r(o, _t2));
      }, r(o, _t2), null;
    }, i.async = !0, i.defer = !1, i.libs = o, t !== void 0 && null !== t ? t.exports = i : this.ensure = i;
  },
  "util/log": function utilLog(e, n, t) {
    var o, r, i, a, s, l, d, p, f;
    l = 1, o = function () {
      return "undefined" != typeof console && null !== console ? function (e, n) {
        return console[e].apply(console, n);
      } : function () {};
    }(), s = function s(e) {
      return null != e && (l = function () {
        switch (e) {
          case -1:
          case "none":
          case "n":
            return -1;

          case 0:
          case "quiet":
          case "1":
            return 0;

          case 1:
          case "info":
          case "i":
            return 1;

          case 2:
          case "debug":
          case "d":
            return 2;

          default:
            return l;
        }
      }()), l;
    }, p = function p() {
      return 0 > l ? void 0 : o("log", arguments);
    }, a = function a() {
      return 1 > l ? void 0 : o("info", arguments);
    }, r = function r() {
      return 2 > l ? void 0 : o("warn", arguments);
    }, i = function i() {
      var e, n;
      return n = Error(), null != n.stack && (e = n.stack.split("\n"), "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("Error", e[2].trim())), o("warn", arguments);
    }, f = Array.prototype.slice, d = function d(e) {
      return {
        level: s,
        say: function say() {
          var n;
          if (!(0 > l)) return (n = f.call(arguments)).unshift(e), p.apply(p, n);
        },
        info: function info() {
          var n;
          if (!(1 > l)) return (n = f.call(arguments)).unshift(e), a.apply(a, n);
        },
        debug: function debug() {
          var n;
          if (!(2 > l)) return (n = f.call(arguments)).unshift(e), r.apply(r, n);
        },
        error: function error() {
          var n;
          return (n = f.call(arguments)).unshift(e), i.apply(i, n);
        }
      };
    }, t.exports = {
      level: s,
      info: a,
      debug: r,
      error: i,
      say: p,
      prefix: d
    }, Function.prototype.bind && console && "object" == _typeof(console.log) && ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function (e) {
      console[e] = this.bind(console[e], console);
    }, Function.prototype.call);
  },
  "util/number/pad": function utilNumberPad(e, n, t) {
    var o;

    t.exports = o = function o(e, n) {
      var t;

      for (t = "" + e; n > t.length;) {
        t = "0" + t;
      }

      return t;
    };
  },
  "util/positions": function utilPositions(e, n, t) {
    var o, r, i, a;
    a = n("./log").prefix("positions:"), r = function r(e) {
      var n, t;
      return n = $(null != (t = e.delegateTarget) ? t : e.currentTarget).offset(), null != e.gesture ? e.gesture.center.pageX - n.left : e.pageX - n.left;
    }, i = function i(e) {
      var n;
      return null != e.offsetX ? (a.info("offsetX", e.offsetX, e), e.offsetX) : (n = $(e.currentTarget).offset(), null != e.gesture ? e.gesture.center.pageX - n.left : e.pageX - n.left);
    }, o = r, t.exports = {
      getX: o
    };
  },
  "util/preloader": function utilPreloader(e, n, t) {
    var o,
        r,
        i = function i(e, n) {
      return function () {
        return e.apply(n, arguments);
      };
    };

    r = n("./log").prefix("preloader:"), o = function () {
      function e(e) {
        this.didError = i(this.didError, this), this.didLoad = i(this.didLoad, this), this.elem = $(e);
      }

      return e.prototype.onError = function (e) {
        return this.errorCallback = e, this;
      }, e.prototype.onProgress = function (e) {
        return this.progressCallback = e, this;
      }, e.prototype.onLoad = function (e) {
        return this.loadCallback = e, this;
      }, e.prototype.start = function () {
        var e,
            n = this;
        return this.imageList = e = this.elem.find("img"), this.total = e.length, this.count = 0, this.errors = 0, e.each(function (e, t) {
          return !t.complete && "complete" !== (null != t.readyState) || (n.count += 1, 0 !== t.width || 0 !== t.height) ? void 0 : n.errors += 1;
        }), e.on("error", this.didError).on("load", this.didLoad), this.total === this.count && (this.errors > 0 ? setTimeout(function () {
          return n.didError(null);
        }, 1) : (this.count -= 1, setTimeout(function () {
          return n.didLoad(null);
        }, 1))), this;
      }, e.prototype.didLoad = function (e) {
        var n, t;

        if (this.count += 1, n = Math.floor(100 * (this.count / this.total)), "function" == typeof this.progressCallback && this.progressCallback(n), this.count >= this.total) {
          "function" == typeof this.progressCallback && this.progressCallback(100);

          try {
            return "function" == typeof this.loadCallback ? this.loadCallback(e) : void 0;
          } finally {
            null != (t = this.imageList) && "function" == typeof t.off && t.off(), delete this.imageList, delete this.elem;
          }
        }
      }, e.prototype.didError = function (e) {
        var n;
        "function" == typeof this.progressCallback && this.progressCallback(100);

        try {
          return "function" == typeof this.errorCallback ? this.errorCallback(e) : void 0;
        } finally {
          null != (n = this.imageList) && "function" == typeof n.off && n.off(), delete this.elem, delete this.imageList;
        }
      }, e;
    }(), t.exports = function (e) {
      return new o(e);
    };
  },
  "util/type": function utilType(e, n, t) {
    var o;
    o = function () {
      var e, n, t, o, r, i, a;

      for (o = Object.prototype.toString, n = /\[object HTML(.*)\]/, e = {}, a = "Boolean Number String Function Array Date RegExp Undefined Null NodeList".split(" "), r = 0, i = a.length; i > r; r++) {
        t = a[r], e["[object " + t + "]"] = t.toLowerCase();
      }

      return function (t) {
        var r, i;
        return i = o.call(t), (r = e[i]) ? r : (r = i.match(n)) ? r[1].toLowerCase() : "object";
      };
    }(), t !== void 0 && null !== t ? t.exports = o : this.type = o;
  },
  "util/uid": function utilUid(e, n, t) {
    var o;
    o = 0, t.exports = function (e) {
      return null == e && (e = ""), e + ++o;
    };
  },
  version: function version(e, n, t) {
    t.exports = "1.0.0-165";
  },
  "viewer/concerns/animated": function viewerConcernsAnimated(e, n, t) {
    t.exports = function (e, n) {
      return n.on("change:animated", function (n) {
        return e.toggleClass("animated", n);
      });
    };
  },
  "viewer/concerns/buttons": function viewerConcernsButtons(e, n, t) {
    var o, r;
    r = n("env"), o = function o(e, n) {
      return function (t, o) {
        var i, a, s, l, d, p, f, c, u;

        for (a = e.find(t).addClass("disabled").hide(), s = o.action, i = o.update, n.once("change:ready", function () {
          return a.show(), null != i ? i.call(a) : a.removeClass("disabled");
        }), u = (null != (c = o.states) ? c : "").split(","), p = 0, f = u.length; f > p; p++) {
          d = u[p], n.on("change:" + d, function () {
            return i.call(a);
          });
        }

        return l = function l() {
          return a.is(".disabled") ? void 0 : n.trigger(s);
        }, r.mobile ? Hammer(a.get(0), {
          prevent_default: !0
        }).on("tap", l) : a.on("click", l);
      };
    }, t.exports = function (e, n) {
      var t;
      return t = o(e, n), t(".prevPage", {
        action: "cmd:page:prev",
        states: "currentPage",
        update: function update() {
          return this.toggleClass("disabled", n.isFirstPage());
        }
      }), t(".nextPage", {
        action: "cmd:page:next",
        states: "currentPage,endScreen",
        update: function update() {
          return this.toggleClass("disabled", n.isLastPage() && n.endScreen);
        }
      }), t(".zoom", {
        action: "cmd:zoom:toggle",
        states: "showZoomButton",
        update: function update() {
          return this.removeClass("disabled"), this.toggle(n.showZoomButton && !n.zoomDisabled);
        }
      }), t(".help", {
        action: "cmd:help:toggle",
        states: "helpScreen,endScreen,showHelpButton",
        update: function update() {
          return this.toggleClass("disabled", n.endScreen), this.toggleClass("down", n.helpScreen), this.toggle(n.showHelpButton);
        }
      });
    };
  },
  "viewer/concerns/end": function viewerConcernsEnd(e, n, t) {
    var o;
    o = n("env"), t.exports = function (e, n) {
      var t, r, i, a, s;
      return a = e.find(".the-end"), s = a.find(".restart"), t = a.find(".close"), i = function i(e) {
        return null != e && "function" == typeof e.preventDefault && e.preventDefault(), null != e && "function" == typeof e.stopPropagation && e.stopPropagation(), n.set({
          currentPage: 0,
          endScreen: !1,
          helpScreen: !1
        });
      }, n.on("change:endScreen", function (e) {
        return n.animated ? e ? a.fadeIn("fast") : a.fadeOut("fast") : a.toggle(e), n.contentScreenVisible = e;
      }), n.on("cmd:restart", i), o.mobile ? Hammer(s.get(0), {
        prevent_default: !0
      }).on("tap", i) : s.on("click", i), r = function r(e) {
        return e.preventDefault(), e.stopPropagation(), n.set({
          endScreen: !1
        });
      }, o.mobile ? Hammer(t.get(0), {
        prevent_default: !0
      }).on("tap", r) : t.on("click", r);
    };
  },
  "viewer/concerns/focus": function viewerConcernsFocus(e, n, t) {
    var o;
    o = n("util/log").prefix("focus:"), t.exports = function (e, n) {
      var t = this;
      return n.on("change:active", function (n) {
        return t.active = n, e.toggleClass("inactive", !n).toggleClass("active", n);
      }), e.on("focus", function () {
        return n.set({
          active: !0
        });
      }), e.on("blur", function () {
        return n.greedyKeys || e.is(".zoomed") ? void 0 : n.set({
          active: !1
        });
      });
    };
  },
  "viewer/concerns/help": function viewerConcernsHelp(e, n, t) {
    var o, r, i;
    o = n("env"), i = n("util/log").prefix("helpScreen:"), t.exports = r = function r(e, n) {
      var t, r, i, a, s;
      return i = e.find(".help-content"), a = i.find(".intro"), t = i.find(".close"), n.on("change:helpScreen", function (e) {
        return e && a.toggle(o.firstRun), n.animated ? e ? i.fadeIn("fast") : i.fadeOut("fast", function () {
          return a.hide();
        }) : i.toggle(e), n.contentScreenVisible = e;
      }), s = function s() {
        return n.ready && !n.endScreen ? n.toggle("helpScreen") : void 0;
      }, n.on("cmd:help:toggle", s), n.on("ready", function () {
        return o.firstRun ? setTimeout(function () {
          return n.set({
            helpScreen: !0
          }), o.firstRun = !1;
        }, 400) : void 0;
      }), r = function r(e) {
        return e.preventDefault(), e.stopPropagation(), n.set({
          helpScreen: !1
        });
      }, o.mobile ? Hammer(t.get(0), {
        prevent_default: !0
      }).on("tap", r) : t.on("click", r);
    };
  },
  "viewer/concerns/keyboard": function viewerConcernsKeyboard(e, n, t) {
    var o,
        r,
        i,
        a,
        s,
        l,
        d,
        p,
        f,
        c = [].indexOf || function (e) {
      for (var n = 0, t = this.length; t > n; n++) {
        if (n in this && this[n] === e) return n;
      }

      return -1;
    };

    r = n("env"), s = n("util/log").prefix("keyboard:"), o = null, i = {
      listening: !1,
      init: function init() {
        return r.mobile || this.listening ? void 0 : this.listen();
      },
      listen: function listen() {
        return r.mobile || this.listening ? void 0 : ($(document).on("keydown", this.onKeyInput), this.listening = !0);
      },
      stopListening: function stopListening() {
        return !r.mobile && this.listening ? ($(document).off("keydown", this.onKeyInput), this.listening = !1) : void 0;
      },
      onKeyInput: function onKeyInput(e) {
        return null != o ? o.state.trigger("key:input", e) : void 0;
      }
    }, l = [32, 39, 68, 221], d = [37, 65, 219], f = [27], p = [], a = {
      "cmd:page:next": [32, 39, 68, 221],
      "cmd:page:prev": [37, 65, 219],
      "cmd:restart": [82],
      "cmd:zoom:out": [27],
      "cmd:zoom:toggle": [90],
      "cmd:help:toggle": [72, 191]
    }, t.exports = function (e, n) {
      var t;
      return i.init(), t = function t(e) {
        var t, o, r;

        if (n.ready && n.active) {
          for (t in a) {
            if (o = a[t], r = e.which, c.call(o, r) >= 0) return n.trigger(t), e.metaKey || e.ctrlKey || e.preventDefault(), !1;
          }

          return null;
        }
      }, n.on("key:input", t), n.on("change:active", function (e) {
        return o = e ? n.controller : null;
      });
    };
  },
  "viewer/concerns/loading": function viewerConcernsLoading(e, n, t) {
    var o, r;
    o = n("util/log").prefix("loading:"), r = n("util/preloader"), t.exports = function (e, n) {
      var t, o, i, a, s, l;
      return t = e.find(".progress .loading").show(), i = function i(e) {
        return t.width("" + e + "%");
      }, o = function o(e) {
        return t.toggle(e), t.toggleClass("done"), n.off("change:loading", i);
      }, n.on("change:loading", i), n.once("change:loaded", o), a = function a() {
        return n.set({
          loaded: !1
        }), n.trigger("load:error");
      }, s = function s() {
        return n.set({
          loaded: !0
        }), n.trigger("loaded"), n.trigger("load:complete");
      }, l = function l(e) {
        return n.set("loading", e);
      }, r(e).onError(a).onLoad(s).onProgress(l).start();
    };
  },
  "viewer/concerns/metadata": function viewerConcernsMetadata(e, n, t) {
    var o, r;
    r = n("util/log").prefix("metadata:"), o = function o(e, n) {
      return function (t, o, r) {
        var i, a;
        return i = e.find(o), a = function a(e) {
          return r.call(i, e);
        }, n.on("change:" + t, a), a(n[t]);
      };
    }, t.exports = function (e, n) {
      var t, r;
      return t = o(e, n), t("copyright", ".copyright", function (e) {
        return null != e && "" !== e ? this.html(e).attr("title", e).show() : this.hide();
      }), r = function r(e) {
        var t;
        return t = "" + n.title + " <span>" + n.author + "</span>", e.html(t).attr("title", n.title).show();
      }, t("title", "header h3", function () {
        return r(this);
      }), t("author", "header h3", function () {
        return r(this);
      });
    };
  },
  "viewer/concerns/msie": function viewerConcernsMsie(e, n, t) {
    var o, r;
    o = n("env"), r = n("util/log").prefix("msie:"), t.exports = function (e, n) {
      var t;
      if (o.msie) return e.attr("tabindex", "0"), t = function t() {
        return e.focus();
      }, n.on("change:currentPage", t), n.on("change:helpScreen", t), n.on("change:endScreen", t);
    };
  },
  "viewer/concerns/progress": function viewerConcernsProgress(e, n, t) {
    var o, r, i, a;
    o = n("env"), i = n("util/log").prefix("progressBar:"), r = n("util/positions").getX, t.exports = a = function a(e, n) {
      var t, a, s, l, d, p, _f, c;

      return d = e.find(".progress"), l = e.find(".bar").not(".position"), a = d.find(".location").hide(), s = d.find(".position"), c = function c() {
        var e;
        return e = n.getPercentageRead(), a.width("" + e + "%"), a.toggleClass("done", n.isLastPage()), a.toggleClass("start", n.isFirstPage()), s.html("" + (n.currentPage + 1) + " / " + n.pages);
      }, n.once("change:loaded", function (e) {
        return a.toggle(e), s.toggle(n.showLocation), c();
      }), n.once("ready", function () {
        return l.toggle(n.showProgress);
      }), n.on("change:showProgress", function (e) {
        return l.toggle(e), e ? c : void 0;
      }), n.on("change:showLocation", function (e) {
        return s.toggle(e);
      }), n.on("change:currentPage", function (e) {
        return n.isValidPage(e) ? c() : void 0;
      }), t = function t(e) {
        var t, o, s, l, p, f, c;
        return t = "mousemove" === e.type || "drag" === e.type, i.info("didTapScrubber", t, e.type), c = r(e), o = null, f = d.width(), s = c / f, p = s * (n.pages - 1), l = t ? Math.round(p) : (o = a.width(), o > c ? Math.floor(p) : Math.ceil(p)), n.set({
          currentPage: l
        });
      }, p = function p(o) {
        return n.ready && n.showProgress ? (d.on("mousemove", t).find("span").hide(), e.on("mouseleave", _f), $(document).on("mouseup", _f), i.info("Finished binding..."), t(o)) : void 0;
      }, _f = function f(n) {
        return i.info("stopScrubbing", n.type), d.off("mousemove", t).find("span").show(), e.off("mouseleave", _f), $(document).off("mouseup", _f);
      }, o.mobile ? Hammer(d.get(0), {
        prevent_default: !0
      }).on("tap", t).on("drag", t) : d.on("mousedown", p);
    };
  },
  "viewer/concerns/screen": function viewerConcernsScreen(e, n, t) {
    var o, r, i;
    o = n("env"), i = n("util/log").prefix("screen:"), r = n("util/positions").getX, t.exports = function (e, n) {
      var t, i, a, s, l, d, p, f, c, u;
      return p = e.find(".screen-stack"), l = null, n.on("change:loaded", function (e) {
        return p.toggle(e);
      }), a = function a(t) {
        return null == t && (t = n.currentPage), e.find(".screen").get(t);
      }, u = function u(e, n) {
        return a(e).style.display = "table-cell", a(n).style.display = "none";
      }, d = function d() {
        var e;
        return e = "table-cell", a().style.display = e;
      }, s = function s() {
        return $(a()).hide();
      }, n.on("change:currentPage", u), n.on("change:ready", d), n.on("cmd:current:show", d), n.on("cmd:current:hide", s), i = function i(e) {
        var t, o;
        if (!n.contentScreenVisible && n.ready) return t = $(null != (o = e.delegateTarget) ? o : e.currentTarget), null != e && "function" == typeof e.preventDefault && e.preventDefault(), r(e) < t.width() / 2 ? n.trigger("cmd:page:prev") : n.trigger("cmd:page:next"), !1;
      }, f = function f() {
        return null != l ? (n.trigger(l), l = null) : void 0;
      }, c = function c(e) {
        return function () {
          return n.trigger(e);
        };
      }, t = function t(e) {
        return function () {
          return l = e;
        };
      }, o.mobile ? Hammer(p.get(0), {
        prevent_default: !0
      }).on("swipeleft", c("cmd:page:next")).on("swiperight", c("cmd:page:prev")).on("tap", i).on("hold", c("cmd:help:toggle")).on("pinchout", t("cmd:zoom:in")).on("pinchin", t("cmd:zoom:out")).on("release", f) : p.on("click", i);
    };
  },
  "viewer/concerns/sizing": function viewerConcernsSizing(e, n, t) {
    var o;
    o = n("util/log").prefix("sizing:"), t.exports = function (e, n) {
      var t, o, r, i, a, s, l, d;
      return a = 0, i = 0, r = 0, o = 0, d = e.find(".screen-stack"), n.on("resize", function () {
        return e.is(".zoomed") ? s() : l();
      }), t = function t() {
        var t, s;
        return s = d.is(":visible"), s || d.show(), t = e.find("img").get(0), n.imageWidth = a = t.width, n.imageHeight = i = t.height, n.imageFullWidth = r = t.naturalWidth, n.imageFullHeight = o = t.naturalHeight, s ? void 0 : d.hide();
      }, n.on("sizes:calc", t), l = function l() {
        return e.css({
          height: ""
        }), n.animated && !n.ready && n.autofit ? e.animate({
          width: n.imageWidth
        }) : n.autofit ? e.css({
          width: n.imageWidth
        }) : e.css({
          width: ""
        }), n.ready && d.css({
          height: n.imageHeight
        }), e.find("img").css({
          maxWidth: "100%",
          maxHeight: ""
        });
      }, s = function s() {
        var n, t, i;
        return n = $(window), t = n.height(), i = n.width(), e.css({
          width: i,
          height: t
        }), t -= e.find(".pager").outerHeight(), t -= e.find("header").outerHeight(), t -= e.find(".copyright").outerHeight(), d.css({
          height: t
        }), e.find("img").css({
          maxWidth: Math.min(i, r),
          maxHeight: Math.min(t, o)
        });
      };
    };
  },
  "viewer/concerns/theme": function viewerConcernsTheme(e, n, t) {
    var o, r;
    o = n("env"), r = n("util/log").prefix("theme:"), o.embedded && n("themes/embedded").activate(), t.exports = function (e, n) {
      var t, o;
      return t = function t(e) {
        return "theme-" + e;
      }, o = function o(n, _o2) {
        return null != _o2 && e.removeClass(t(_o2)), e.addClass(t(null != n ? n : "light"));
      }, n.on("change:theme", o), o(n.theme);
    };
  },
  "viewer/concerns/zoom": function viewerConcernsZoom(e, n, t) {
    var o;
    o = n("util/log").prefix("zoom:"), t.exports = function (e, n) {
      var t, o, r;
      return o = e.find(".screen-stack"), r = function r(o) {
        var r;
        if (!(n.zoomDisabled || o && e.is(".zoomed") || !o && !e.is(".zoomed"))) return n.trigger("cmd:current:hide"), e.is(".zoomed") ? (e.detach(), e.removeClass("zoomed"), n.controller.containingElem.append(e), $(window).off("resize", t), t()) : (e.detach(), e.addClass("zoomed"), r = $("body"), r.after(e), $(window).on("resize", t), t()), e.focus(), n.trigger("cmd:current:show");
      }, t = function t() {
        return n.trigger("resize");
      }, n.on("change:zoomed", r);
    };
  },
  "viewer/index": function viewerIndex(e, n, t) {
    var o,
        r,
        i,
        a,
        s,
        l,
        d,
        p,
        f,
        c,
        u,
        h,
        g,
        b,
        m,
        k = {}.hasOwnProperty,
        v = function v(e, n) {
      function t() {
        this.constructor = e;
      }

      for (var o in n) {
        k.call(n, o) && (e[o] = n[o]);
      }

      return t.prototype = n.prototype, e.prototype = new t(), e.__super__ = n.prototype, e;
    },
        y = function y(e, n) {
      return function () {
        return e.apply(n, arguments);
      };
    };

    d = n("env"), g = n("util/uid"), h = n("util/number/pad"), u = n("util/log").prefix("viewer:"), p = n("cog/events"), l = n("util/defaults"), b = n("./validator"), c = n("lifecycle"), r = n("cog/view"), o = n("cog/object"), f = n("util/positions").getX, s = function s(e, n) {
      return e = e.replace("####", h(n, 4)), e = e.replace("###", h(n, 3)), e = e.replace("##", h(n, 2)), e = e.replace("#", n);
    }, a = function (e) {
      function n() {
        return m = n.__super__.constructor.apply(this, arguments);
      }

      return v(n, e), n.prototype.isLastPage = function () {
        return this.currentPage === this.getLastPage();
      }, n.prototype.isFirstPage = function () {
        return 0 === this.currentPage;
      }, n.prototype.getNextPage = function () {
        return Math.min(this.currentPage + 1, this.getLastPage());
      }, n.prototype.getPrevPage = function () {
        return Math.max(this.currentPage - 1, 0);
      }, n.prototype.getLastPage = function () {
        return this.pages - 1;
      }, n.prototype.isValidPage = function (e) {
        return e >= 0 && this.pages > e;
      }, n.prototype.getPercentageRead = function () {
        return 0 === this.currentPage ? 0 : this.isLastPage() ? 100 : Math.min(Math.round(100 * (this.currentPage / this.getLastPage())), 100);
      }, n;
    }(o), i = function (e) {
      function t(e) {
        this.hideCurrent = y(this.hideCurrent, this), this.showCurrent = y(this.showCurrent, this), this.onLoadError = y(this.onLoadError, this), this.onReady = y(this.onReady, this), this.onLoad = y(this.onLoad, this), this.onPrevPage = y(this.onPrevPage, this), this.onNextPage = y(this.onNextPage, this), this.doZoomOut = y(this.doZoomOut, this), this.doZoomIn = y(this.doZoomIn, this), this.toggleZoom = y(this.toggleZoom, this), t.__super__.constructor.call(this, {
          model: e
        });
      }

      return v(t, e), t.prototype.className = "flipbook", t.prototype.template = n("./template"), t.prototype.outlets = {
        stack: ".screen-stack",
        pagerArea: ".pager",
        progressBar: ".progress"
      }, t.prototype.initialize = function () {
        if (!b(this.model, !0)) throw "Invalid settings: " + b.errors();
        return this.elem.hide().data("controller", this), this.screenCount = this.model.pages || this.model.images.length || 0, this.state = new a(this.model), this.state.set({
          controller: this,
          currentPage: 0,
          ready: !1,
          active: !1,
          loaded: !1,
          zoomed: !1,
          endScreen: !1,
          helpScreen: !1,
          contentScreenVisible: !1
        }), this.state.on("cmd:page:next", this.onNextPage), this.state.on("cmd:page:prev", this.onPrevPage), this.state.on("cmd:zoom:toggle", this.toggleZoom), this.state.on("cmd:zoom:out", this.doZoomOut), this.state.on("cmd:zoom:in", this.doZoomIn), this.state.on("load:complete", this.onLoad), this.state.on("load:error", this.onLoadError), this.state.on("ready", this.onReady), this.screenCountIdx = this.screenCount - 1, this.current = 0, this.elem.attr("tabindex", "0").addClass("inactive").toggleClass("isMobile", d.mobile).toggleClass("isDesktop", !d.mobile), c.fire("created", this);
      }, t.prototype.get = function (e) {
        return this.state.get(e);
      }, t.prototype.set = function (e, n) {
        return this.state.set(e, n), this;
      }, t.prototype.focus = function () {
        return this.elem.focus();
      }, t.prototype.toggleZoom = function () {
        return this.state.ready ? this.state.toggle("zoomed") : void 0;
      }, t.prototype.doZoomIn = function () {
        return this.state.zoomed ? void 0 : this.state.set({
          zoomed: !0
        });
      }, t.prototype.doZoomOut = function () {
        return this.state.zoomed ? this.state.set({
          zoomed: !1
        }) : void 0;
      }, t.prototype.onNextPage = function () {
        return this.state.ready ? this.state.isLastPage() ? this.state.set({
          endScreen: !0
        }) : this.state.endScreen || this.state.helpScreen ? this.state.set({
          endScreen: !1,
          helpScreen: !1
        }) : this.state.set({
          currentPage: this.state.getNextPage()
        }) : void 0;
      }, t.prototype.onPrevPage = function () {
        return this.state.ready ? this.state.endScreen || this.state.helpScreen ? this.state.set({
          endScreen: !1,
          helpScreen: !1
        }) : this.state.set({
          currentPage: this.state.getPrevPage()
        }) : void 0;
      }, t.prototype.onLoad = function () {
        return this.state.trigger("ready"), this.state.set({
          ready: !0
        });
      }, t.prototype.onReady = function () {
        return this.state.trigger("cmd:current:show"), this.state.trigger("sizes:calc"), this.state.trigger("resize"), this.state.animated === !1 ? this.stack.css({
          height: this.state.imageHeight,
          opacity: 1
        }) : this.stack.css({
          opacity: 0
        }).animate({
          height: this.state.imageHeight,
          opacity: 1
        });
      }, t.prototype.onLoadError = function () {
        var e;
        return u.info("ERROR Loading images"), this.elem.addClass("errors"), this.stack.find("img").remove(), e = $("<div class='errors'></div>").html(this.state.loadingErrorMsg).hide(), this.stack.append(e).show(), e.slideDown();
      }, t.prototype.showCurrent = function () {
        return this.state.trigger("cmd:current:show");
      }, t.prototype.hideCurrent = function () {
        return this.state.trigger("cmd:current:hide");
      }, t.prototype.getData = function () {
        var e, n, t, o, r, i, a, p, f, c, u;
        if (i = [], !this.state.scanForImages && null == this.state.images) for (n = this.model.start, a = this.model.start + this.screenCountIdx, t = p = n; a >= n ? a >= p : p >= a; t = a >= n ? ++p : --p) {
          r = {
            src: s(this.model.path, t)
          }, i.push(r);
        }
        if (null != this.state.images) for (this.state.pages = this.state.images.length, u = this.state.images, f = 0, c = u.length; c > f; f++) {
          o = u[f], r = {
            src: o
          }, i.push(r);
        }
        return e = l({}, this.state), e.screens = i, e.id = this.id, e.tapOrClick = function () {
          return d.mobile ? "tap" : "click";
        }, e.isMobile = d.mobile, e;
      }, t.prototype.beforeRender = function () {
        return this.state.scanForImages && (u.info("Scanning for images..."), this.imageList = this.containingElem.find("img").remove(), this.screenCount = this.state.pages = this.imageList.length, this.screenCountIdx = this.screenCount - 1), this.containingElem.empty();
      }, t.prototype.onRender = function () {
        var e, t, o, r, i;

        for (null != this.imageList && (this.stack.prepend(this.imageList), this.stack.find("img").wrap('<div class="screen"/>')), this.stack.find(".screen").hide(), this.stack.css({
          backgroundColor: this.state.background
        }), r = n.modules("viewer/concerns/"), i = [], t = 0, o = r.length; o > t; t++) {
          e = r[t], i.push(n(e).call(this, this.elem, this.state));
        }

        return i;
      }, t.prototype.onDomActive = function () {
        return this.state.animated === !1 ? this.elem.show() : (this.elem.addClass("animated"), this.elem.fadeIn()), this.model.autofocus ? this.elem.focus() : void 0;
      }, t;
    }(r), t.exports = i;
  },
  "viewer/template": function viewerTemplate(e, n, t) {
    t.exports = function (e) {
      e || (e = {});

      var n,
          t = [],
          o = function o(e) {
        return e && e.ecoSafe ? e : e !== void 0 && null != e ? i(e) : "";
      },
          r = e.safe,
          i = e.escape;

      return n = e.safe = function (e) {
        if (e && e.ecoSafe) return e;
        (void 0 === e || null == e) && (e = "");
        var n = new String(e);
        return n.ecoSafe = !0, n;
      }, i || (i = e.escape = function (e) {
        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      }), function () {
        (function () {
          var e, n, r, i, a;

          for (t.push('<header>\n  <div class="zoom button"><span>&#10132;</span></div>\n  <div class="help button"><span>i</span></div>\n  <h3 title="'), t.push(o(this.title)), t.push('">'), t.push(o(this.title)), t.push("<span>"), t.push(o(this.author)), t.push('</span></h3>\n</header>\n<div class="screen-stack">'), a = this.screens, e = r = 0, i = a.length; i > r; e = ++r) {
            n = a[e], t.push(' \n<div class="screen"><img src="'), t.push(o(n.src)), t.push('"/></div> \n');
          }

          t.push(' \n  <div class="blocker content-screen">\n    &nbsp;\n  </div>\n  <div class="screen the-end content-screen">\n    <div class="container">\n      <div class="body">\n        <div class="close">&oplus;</div>\n        <div class="restart">\n          <span class="icon">&#8634;</span>\n          <label>Restart from<br/>beginning.</label>\n        </div>    \n      </div>\n    </div>\n  </div>\n  <div class="screen help-content content-screen">\n    <div class="container">\n      <div class="body">\n        <div class="close">&oplus;</div>\n        <div class="intro">\n          <dl>\n            <dt>Welcome!</dt>\n            <dd>\n              <p>\n                This seems to be your first time reading a comic with<br>\n                the FlipBook reader, so here\'s a quick rundown:\n              </p>\n            </dd>\n          </dl>\n        </div>\n        <dl>\n        '), this.isMobile ? (t.push("\n          <dt><span>&#9702;</span> Tap</dt>\n          <dd>On the right half of the comic to see the next screen, tap on the\n            left half to go back.</dd>\n          \n          <dt><span>&#8644;</span> Swipe</dt>\n          <dd>Left or right to progress through the screens.</dd>\n\n          <dt><span>&bull;</span> Hold</dt>\n          <dd>To show or hide this help screen.</dd>\n        "), this.zoomDisabled || t.push("\n          <dt><span>&harr;</span> Pinch</dt>\n          <dd>Out to zoom viewer, in to shrink.</dd>\n        "), t.push("\n        ")) : (t.push("\n          <dt>Mouse</dt>\n          <dd><p>Click on the right half of the comic to see the next<br>\n            screen, click on the left half to go back.</p></dd>\n\n          <dt>Keyboard</dt>\n          <dd>\n            <table>\n              <tr>\n                <th><kbd class='space'>SPACE</kbd> <kbd>&rarr;</kbd> <kbd>]</kbd> <kbd>d</kbd></th>\n                <td>Next screen.</td>\n              </tr>\n              <tr>\n                <th><kbd>&larr;</kbd> <kbd>[</kbd> <kbd>a</kbd></th>\n                <td>Previous screen.</td>\n              </tr>\n              "), this.zoomDisabled || t.push("\n              <tr>\n                <th><kbd>z</kbd></th>\n                <td>Toggles zoom mode.</td>\n              </tr>\n              <tr>\n                <th><kbd>ESC</kbd></th>\n                <td>Cancels zoom mode.</td>\n              </tr>\n              "), t.push("\n              <tr>\n                <th><kbd>r</kbd></th>\n                <td>Restart from the beginning.</td>\n              </tr>\n              <tr>\n                <th><kbd>h</kbd> <kbd>?</kbd></th>\n                <td>Toggles this help screen.</td>\n              </tr>\n            </table>\n          </dd>\n        ")), t.push('\n        </dl>\n        <p class="info"><small>FlipBook v1.0.0-165</small></p>\n      </div>\n    </div>\n  </div>\n</div> \n<footer class="copyright" title="'), t.push(o(this.copyright)), t.push('"><span>'), t.push(o(this.copyright)), t.push('</span></footer> \n<footer class="pager"> \n<div class="prevPage button"><span>&#8227;</span></div><!-- lsaquo -->\n<div class="progress">\n  <div class="bar background done"><span>&nbsp;</span></div>\n  <div class="bar loading"><span>&nbsp;</span></div>\n  <div class="bar location"><span>&nbsp;</span></div>\n  <div class="bar position"><span>&nbsp;</span></div>\n</div> \n<div class="nextPage button"><span>&#8227;</span></div><!-- rsaquo -->\n</footer>');
        }).call(this);
      }.call(e), e.safe = r, e.escape = i, t.join("");
    };
  },
  "viewer/validator": function viewerValidator(e, n, t) {
    var o, r, i, a, s, l, d, p, f, c, u;
    d = n("util/log").prefix("validator:"), c = n("util/type"), i = [], o = function o(e, n) {
      return null == e ? n : "true" === e || "yes" === e;
    }, f = function f(e, n) {
      return null == e ? n : e + "";
    }, l = function l(e, n) {
      return null == e ? n : parseInt(e, 10);
    }, r = function r(e, n, t) {
      return e[n] = o(e[n], t);
    }, s = function s(e, n, t) {
      return e[n] = l(e[n], t);
    }, p = function p(e, n, t) {
      return e[n] = f(e[n], t);
    }, a = function a(e) {
      return s(e, "pages", 0), s(e, "start", 1), r(e, "animated", !0), r(e, "autofocus", !1), r(e, "autofit", !0), r(e, "showHelpButton", !0), r(e, "showZoomButton", !0), r(e, "showLocation", !0), r(e, "showProgress", !0), r(e, "zoomDisabled", !1), r(e, "greedyKeys", !1), p(e, "copyright", ""), p(e, "author", ""), p(e, "background", ""), p(e, "title", "&nbsp;"), p(e, "loadingErrorMsg", "There was a problem loading the images, please refresh your browser.");
    }, t.exports = u = function u(e, n) {
      return null == n && (n = !1), i = [], (null != e ? e : e = {}).scanForImages = null != e.path && null != e.pages ? !1 : null != e.images && "array" === c(e.images) ? !1 : !0, 0 === i.length ? (n && a(e), !0) : !1;
    }, u.errors = function () {
      return i.join(", ");
    };
  }
}), (void 0).flipbook("start");