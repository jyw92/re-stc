/*
 Highcharts JS v11.1.0 (2023-06-05)

 Accessibility module

 (c) 2010-2021 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
'use strict';
(function(b) {
    "object" === typeof module && module.exports ? (b["default"] = b,
    module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function(x) {
        b(x);
        b.Highcharts = x;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
}
)(function(b) {
    function x(b, r, q, l) {
        b.hasOwnProperty(r) || (b[r] = l.apply(null, q),
        "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{
            detail: {
                path: r,
                module: b[r]
            }
        })))
    }
    b = b ? b._modules : {};
    x(b, "Accessibility/Utils/HTMLUtilities.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function(b, r) {
        function q(b) {
            if ("function" === typeof u.MouseEvent)
                return new u.MouseEvent(b.type,b);
            if (m.createEvent) {
                const n = m.createEvent("MouseEvent");
                if (n.initMouseEvent)
                    return n.initMouseEvent(b.type, b.bubbles, b.cancelable, b.view || u, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget),
                    n
            }
            return l(b.type)
        }
        function l(b, k, g) {
            k = k || {
                x: 0,
                y: 0
            };
            return "function" === typeof u.MouseEvent ? new u.MouseEvent(b,{
                bubbles: !0,
                cancelable: !0,
                composed: !0,
                button: 0,
                buttons: 1,
                relatedTarget: g || z,
                view: u,
                detail: "click" === b ? 1 : 0,
                screenX: k.x,
                screenY: k.y,
                clientX: k.x,
                clientY: k.y
            }) : m.createEvent && (g = m.createEvent("MouseEvent"),
            g.initMouseEvent) ? (g.initMouseEvent(b, !0, !0, u, "click" === b ? 1 : 0, k.x, k.y, k.x, k.y, !1, !1, !1, !1, 0, null),
            g) : {
                type: b
            }
        }
        const {doc: m, win: u} = b
          , {css: v} = r
          , z = u.EventTarget && new u.EventTarget || "none";
        return {
            addClass: function(b, k) {
                b.classList ? b.classList.add(k) : 0 > b.className.indexOf(k) && (b.className += " " + k)
            },
            cloneMouseEvent: q,
            cloneTouchEvent: function(b) {
                var n = b => {
                    const a = [];
                    for (let c = 0; c < b.length; ++c) {
                        const d = b.item(c);
                        d && a.push(d)
                    }
                    return a
                }
                ;
                if ("function" === typeof u.TouchEvent)
                    return n = new u.TouchEvent(b.type,{
                        touches: n(b.touches),
                        targetTouches: n(b.targetTouches),
                        changedTouches: n(b.changedTouches),
                        ctrlKey: b.ctrlKey,
                        shiftKey: b.shiftKey,
                        altKey: b.altKey,
                        metaKey: b.metaKey,
                        bubbles: b.bubbles,
                        cancelable: b.cancelable,
                        composed: b.composed,
                        detail: b.detail,
                        view: b.view
                    }),
                    b.defaultPrevented && n.preventDefault(),
                    n;
                n = q(b);
                n.touches = b.touches;
                n.changedTouches = b.changedTouches;
                n.targetTouches = b.targetTouches;
                return n
            },
            escapeStringForHTML: function(b) {
                return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
            },
            getElement: function(b) {
                return m.getElementById(b)
            },
            getFakeMouseEvent: l,
            getHeadingTagNameForElement: function(b) {
                const n = a => {
                    a = parseInt(a.slice(1), 10);
                    return "h" + Math.min(6, a + 1)
                }
                  , g = a => {
                    var c;
                    a: {
                        for (c = a; c = c.previousSibling; ) {
                            const a = c.tagName || "";
                            if (/H[1-6]/.test(a)) {
                                c = a;
                                break a
                            }
                        }
                        c = ""
                    }
                    if (c)
                        return n(c);
                    a = a.parentElement;
                    if (!a)
                        return "p";
                    c = a.tagName;
                    return /H[1-6]/.test(c) ? n(c) : g(a)
                }
                ;
                return g(b)
            },
            removeChildNodes: function(b) {
                for (; b.lastChild; )
                    b.removeChild(b.lastChild)
            },
            removeClass: function(b, k) {
                b.classList ? b.classList.remove(k) : b.className = b.className.replace(new RegExp(k,"g"), "")
            },
            removeElement: function(b) {
                b && b.parentNode && b.parentNode.removeChild(b)
            },
            reverseChildNodes: function(b) {
                let n = b.childNodes.length;
                for (; n--; )
                    b.appendChild(b.childNodes[n])
            },
            simulatedEventTarget: z,
            stripHTMLTagsFromString: function(b) {
                return "string" === typeof b ? b.replace(/<\/?[^>]+(>|$)/g, "") : b
            },
            visuallyHideElement: function(b) {
                v(b, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    marginTop: "-3px",
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                    filter: "alpha(opacity=1)",
                    opacity: .01
                })
            }
        }
    });
    x(b, "Accessibility/A11yI18n.js", [b["Core/Templating.js"], b["Core/Utilities.js"]], function(b, r) {
        const {format: q} = b
          , {getNestedProperty: l, pick: m} = r;
        var u;
        (function(b) {
            function z(a, c) {
                var d = a.indexOf("#each(")
                  , e = a.indexOf("#plural(")
                  , f = a.indexOf("[");
                const b = a.indexOf("]");
                if (-1 < d) {
                    f = a.slice(d).indexOf(")") + d;
                    var B = a.substring(0, d);
                    e = a.substring(f + 1);
                    f = a.substring(d + 6, f).split(",");
                    d = Number(f[1]);
                    a = "";
                    if (c = l(f[0], c))
                        for (d = isNaN(d) ? c.length : d,
                        d = 0 > d ? c.length + d : Math.min(d, c.length),
                        f = 0; f < d; ++f)
                            a += B + c[f] + e;
                    return a.length ? a : ""
                }
                if (-1 < e) {
                    B = a.slice(e).indexOf(")") + e;
                    a = a.substring(e + 8, B).split(",");
                    switch (Number(l(a[0], c))) {
                    case 0:
                        a = m(a[4], a[1]);
                        break;
                    case 1:
                        a = m(a[2], a[1]);
                        break;
                    case 2:
                        a = m(a[3], a[1]);
                        break;
                    default:
                        a = a[1]
                    }
                    a ? (c = a,
                    c = c.trim && c.trim() || c.replace(/^\s+|\s+$/g, "")) : c = "";
                    return c
                }
                return -1 < f ? (e = a.substring(0, f),
                a = Number(a.substring(f + 1, b)),
                c = l(e, c),
                !isNaN(a) && c && (0 > a ? (B = c[c.length + a],
                "undefined" === typeof B && (B = c[0])) : (B = c[a],
                "undefined" === typeof B && (B = c[c.length - 1]))),
                "undefined" !== typeof B ? B : "") : "{" + a + "}"
            }
            function n(a, c, d) {
                const e = (a, f) => {
                    a = a.slice(f || 0);
                    const c = a.indexOf("{")
                      , e = a.indexOf("}");
                    if (-1 < c && e > c)
                        return {
                            statement: a.substring(c + 1, e),
                            begin: f + c + 1,
                            end: f + e
                        }
                }
                  , f = [];
                let b, B, g = 0;
                do
                    b = e(a, g),
                    B = a.substring(g, b && b.begin - 1),
                    B.length && f.push({
                        value: B,
                        type: "constant"
                    }),
                    b && f.push({
                        value: b.statement,
                        type: "statement"
                    }),
                    g = b ? b.end + 1 : g + 1;
                while (b);
                f.forEach(a => {
                    "statement" === a.type && (a.value = z(a.value, c))
                }
                );
                return q(f.reduce( (a, f) => a + f.value, ""), c, d)
            }
            function k(a, c) {
                a = a.split(".");
                let d = this.options.lang
                  , e = 0;
                for (; e < a.length; ++e)
                    d = d && d[a[e]];
                return "string" === typeof d ? n(d, c, this) : ""
            }
            const g = [];
            b.compose = function(a) {
                r.pushUnique(g, a) && (a.prototype.langFormat = k);
                return a
            }
            ;
            b.i18nFormat = n
        }
        )(u || (u = {}));
        return u
    });
    x(b, "Accessibility/Utils/ChartUtilities.js", [b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function(b, r, q) {
        function l(a, f) {
            const c = f.type
              , e = a.hcEvents;
            k.createEvent && (a.dispatchEvent || a.fireEvent) ? a.dispatchEvent ? a.dispatchEvent(f) : a.fireEvent(c, f) : e && e[c] ? d(a, c, f) : a.element && l(a.element, f)
        }
        function m(a) {
            const f = a.chart
              , c = {};
            let e = "Seconds";
            c.Seconds = ((a.dataMax || a.max || 0) - (a.dataMin || a.min || 0)) / 1E3;
            c.Minutes = c.Seconds / 60;
            c.Hours = c.Minutes / 60;
            c.Days = c.Hours / 24;
            ["Minutes", "Hours", "Days"].forEach(function(a) {
                2 < c[a] && (e = a)
            });
            const d = c[e].toFixed("Seconds" !== e && "Minutes" !== e ? 1 : 0);
            return f.langFormat("accessibility.axis.timeRange" + e, {
                chart: f,
                axis: a,
                range: d.replace(".0", "")
            })
        }
        function u(a) {
            const f = a.chart;
            var c = f.options;
            const e = c && c.accessibility && c.accessibility.screenReaderSection.axisRangeDateFormat || ""
              , d = {
                min: a.dataMin || a.min || 0,
                max: a.dataMax || a.max || 0
            };
            c = function(c) {
                return a.dateTime ? f.time.dateFormat(e, d[c]) : d[c].toString()
            }
            ;
            return f.langFormat("accessibility.axis.rangeFromTo", {
                chart: f,
                axis: a,
                rangeFrom: c("min"),
                rangeTo: c("max")
            })
        }
        function v(a) {
            if (a.points && a.points.length)
                return (a = c(a.points, a => !!a.graphic)) && a.graphic && a.graphic.element
        }
        function z(a) {
            const c = v(a);
            return c && c.parentNode || a.graph && a.graph.element || a.group && a.group.element
        }
        function n(a, c) {
            c.setAttribute("aria-hidden", !1);
            c !== a.renderTo && c.parentNode && c.parentNode !== k.body && (Array.prototype.forEach.call(c.parentNode.childNodes, function(a) {
                a.hasAttribute("aria-hidden") || a.setAttribute("aria-hidden", !0)
            }),
            n(a, c.parentNode))
        }
        const {doc: k} = b
          , {stripHTMLTagsFromString: g} = r
          , {defined: a, find: c, fireEvent: d} = q;
        return {
            fireEventOnWrappedOrUnwrappedElement: l,
            getChartTitle: function(a) {
                return g(a.options.title.text || a.langFormat("accessibility.defaultChartTitle", {
                    chart: a
                }))
            },
            getAxisDescription: function(a) {
                var c, d;
                return a && ((null === (c = a.options.accessibility) || void 0 === c ? void 0 : c.description) || (null === (d = a.axisTitle) || void 0 === d ? void 0 : d.textStr) || a.options.id || a.categories && "categories" || a.dateTime && "Time" || "values")
            },
            getAxisRangeDescription: function(a) {
                var c = a.options || {};
                return c.accessibility && "undefined" !== typeof c.accessibility.rangeDescription ? c.accessibility.rangeDescription : a.categories ? (c = a.chart,
                a = a.dataMax && a.dataMin ? c.langFormat("accessibility.axis.rangeCategories", {
                    chart: c,
                    axis: a,
                    numCategories: a.dataMax - a.dataMin + 1
                }) : "",
                a) : !a.dateTime || 0 !== a.min && 0 !== a.dataMin ? u(a) : m(a)
            },
            getPointFromXY: function(a, f, d) {
                let b = a.length, e;
                for (; b--; )
                    if (e = c(a[b].points || [], function(a) {
                        return a.x === f && a.y === d
                    }))
                        return e
            },
            getSeriesFirstPointElement: v,
            getSeriesFromName: function(a, c) {
                return c ? (a.series || []).filter(function(a) {
                    return a.name === c
                }) : a.series
            },
            getSeriesA11yElement: z,
            unhideChartElementFromAT: n,
            hideSeriesFromAT: function(a) {
                (a = z(a)) && a.setAttribute("aria-hidden", !0)
            },
            scrollToPoint: function(c) {
                var f = c.series.xAxis
                  , b = c.series.yAxis;
                const e = f && f.scrollbar ? f : b;
                if ((f = e && e.scrollbar) && a(f.to) && a(f.from)) {
                    b = f.to - f.from;
                    if (a(e.dataMin) && a(e.dataMax)) {
                        var g = e.toPixels(e.dataMin)
                          , n = e.toPixels(e.dataMax);
                        c = (e.toPixels(c["xAxis" === e.coll ? "x" : "y"] || 0) - g) / (n - g)
                    } else
                        c = 0;
                    f.updatePosition(c - b / 2, c + b / 2);
                    d(f, "changed", {
                        from: f.from,
                        to: f.to,
                        trigger: "scrollbar",
                        DOMEvent: null
                    })
                }
            }
        }
    });
    x(b, "Accessibility/Utils/DOMElementProvider.js", [b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r) {
        const {doc: q} = b
          , {removeElement: l} = r;
        class m {
            constructor() {
                this.elements = []
            }
            createElement() {
                const b = q.createElement.apply(q, arguments);
                this.elements.push(b);
                return b
            }
            destroyCreatedElements() {
                this.elements.forEach(function(b) {
                    l(b)
                });
                this.elements = []
            }
        }
        return m
    });
    x(b, "Accessibility/Utils/EventProvider.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function(b, r) {
        const {addEvent: q} = r;
        class l {
            constructor() {
                this.eventRemovers = []
            }
            addEvent() {
                const m = q.apply(b, arguments);
                this.eventRemovers.push(m);
                return m
            }
            removeAddedEvents() {
                this.eventRemovers.forEach(b => b());
                this.eventRemovers = []
            }
        }
        return l
    });
    x(b, "Accessibility/AccessibilityComponent.js", [b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/DOMElementProvider.js"], b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function(b, r, q, l, m) {
        const {fireEventOnWrappedOrUnwrappedElement: u} = b
          , {getFakeMouseEvent: v} = l;
        ({extend: b} = m);
        class z {
            constructor() {
                this.proxyProvider = this.keyCodes = this.eventProvider = this.domElementProvider = this.chart = void 0
            }
            initBase(b, k) {
                this.chart = b;
                this.eventProvider = new q;
                this.domElementProvider = new r;
                this.proxyProvider = k;
                this.keyCodes = {
                    left: 37,
                    right: 39,
                    up: 38,
                    down: 40,
                    enter: 13,
                    space: 32,
                    esc: 27,
                    tab: 9,
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36
                }
            }
            addEvent(b, k, g, a) {
                return this.eventProvider.addEvent(b, k, g, a)
            }
            createElement(b, k) {
                return this.domElementProvider.createElement(b, k)
            }
            fakeClickEvent(b) {
                const n = v("click");
                u(b, n)
            }
            destroyBase() {
                this.domElementProvider.destroyCreatedElements();
                this.eventProvider.removeAddedEvents()
            }
        }
        b(z.prototype, {
            init() {},
            getKeyboardNavigation: function() {},
            onChartUpdate() {},
            onChartRender() {},
            destroy() {}
        });
        return z
    });
    x(b, "Accessibility/KeyboardNavigationHandler.js", [b["Core/Utilities.js"]], function(b) {
        const {find: r} = b;
        class q {
            constructor(b, m) {
                this.chart = b;
                this.keyCodeMap = m.keyCodeMap || [];
                this.validate = m.validate;
                this.init = m.init;
                this.terminate = m.terminate;
                this.response = {
                    success: 1,
                    prev: 2,
                    next: 3,
                    noHandler: 4,
                    fail: 5
                }
            }
            run(b) {
                const m = b.which || b.keyCode;
                let q = this.response.noHandler;
                const l = r(this.keyCodeMap, function(b) {
                    return -1 < b[0].indexOf(m)
                });
                l ? q = l[1].call(this, m, b) : 9 === m && (q = this.response[b.shiftKey ? "prev" : "next"]);
                return q
            }
        }
        "";
        return q
    });
    x(b, "Accessibility/Components/ContainerComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r, q, l, m) {
        const {unhideChartElementFromAT: u, getChartTitle: v} = q
          , {doc: z} = l
          , {stripHTMLTagsFromString: n} = m;
        class k extends b {
            onChartUpdate() {
                this.handleSVGTitleElement();
                this.setSVGContainerLabel();
                this.setGraphicContainerAttrs();
                this.setRenderToAttrs();
                this.makeCreditsAccessible()
            }
            handleSVGTitleElement() {
                const b = this.chart
                  , a = "highcharts-title-" + b.index
                  , c = n(b.langFormat("accessibility.svgContainerTitle", {
                    chartTitle: v(b)
                }));
                if (c.length) {
                    const d = this.svgTitleElement = this.svgTitleElement || z.createElementNS("http://www.w3.org/2000/svg", "title");
                    d.textContent = c;
                    d.id = a;
                    b.renderTo.insertBefore(d, b.renderTo.firstChild)
                }
            }
            setSVGContainerLabel() {
                const b = this.chart
                  , a = b.langFormat("accessibility.svgContainerLabel", {
                    chartTitle: v(b)
                });
                b.renderer.box && a.length && b.renderer.box.setAttribute("aria-label", a)
            }
            setGraphicContainerAttrs() {
                const b = this.chart
                  , a = b.langFormat("accessibility.graphicContainerLabel", {
                    chartTitle: v(b)
                });
                a.length && b.container.setAttribute("aria-label", a)
            }
            setRenderToAttrs() {
                const b = this.chart
                  , a = "disabled" !== b.options.accessibility.landmarkVerbosity
                  , c = b.langFormat("accessibility.chartContainerLabel", {
                    title: v(b),
                    chart: b
                });
                c && (b.renderTo.setAttribute("role", a ? "region" : "group"),
                b.renderTo.setAttribute("aria-label", c))
            }
            makeCreditsAccessible() {
                const b = this.chart
                  , a = b.credits;
                a && (a.textStr && a.element.setAttribute("aria-label", b.langFormat("accessibility.credits", {
                    creditsStr: n(a.textStr)
                })),
                u(b, a.element))
            }
            getKeyboardNavigation() {
                const b = this.chart;
                return new r(b,{
                    keyCodeMap: [],
                    validate: function() {
                        return !0
                    },
                    init: function() {
                        const a = b.accessibility;
                        a && a.keyboardNavigation.tabindexContainer.focus()
                    }
                })
            }
            destroy() {
                this.chart.renderTo.setAttribute("aria-hidden", !0)
            }
        }
        return k
    });
    x(b, "Accessibility/FocusBorder.js", [b["Core/Renderer/SVG/SVGLabel.js"], b["Core/Utilities.js"]], function(b, r) {
        const {addEvent: q, pick: l} = r;
        var m;
        (function(m) {
            function u() {
                const a = this.focusElement
                  , c = this.options.accessibility.keyboardNavigation.focusBorder;
                a && (a.removeFocusBorder(),
                c.enabled && a.addFocusBorder(c.margin, {
                    stroke: c.style.color,
                    strokeWidth: c.style.lineWidth,
                    r: c.style.borderRadius
                }))
            }
            function z(a, c) {
                const b = this.options.accessibility.keyboardNavigation.focusBorder;
                (c = c || a.element) && c.focus && (c.hcEvents && c.hcEvents.focusin || q(c, "focusin", function() {}),
                c.focus(),
                b.hideBrowserFocusOutline && (c.style.outline = "none"));
                this.focusElement && this.focusElement.removeFocusBorder();
                this.focusElement = a;
                this.renderFocusBorder()
            }
            function n(a) {
                if (!a.focusBorderDestroyHook) {
                    var c = a.destroy;
                    a.destroy = function() {
                        a.focusBorder && a.focusBorder.destroy && a.focusBorder.destroy();
                        return c.apply(a, arguments)
                    }
                    ;
                    a.focusBorderDestroyHook = c
                }
            }
            function k(a, c) {
                this.focusBorder && this.removeFocusBorder();
                const d = this.getBBox()
                  , f = l(a, 3)
                  , e = this.parentGroup;
                var E = this.scaleX || e && e.scaleX
                  , k = this.scaleY || e && e.scaleY;
                E = (E ? !k : k) ? Math.abs(E || k || 1) : (Math.abs(E || 1) + Math.abs(k || 1)) / 2;
                d.x += this.translateX ? this.translateX : 0;
                d.y += this.translateY ? this.translateY : 0;
                k = d.x - f;
                let A = d.y - f
                  , y = d.width + 2 * f
                  , h = d.height + 2 * f;
                var t = this instanceof b;
                if ("text" === this.element.nodeName || t) {
                    const a = !!this.rotation;
                    if (t)
                        var p = {
                            x: a ? 1 : 0,
                            y: 0
                        };
                    else {
                        var C = p = 0;
                        "middle" === this.attr("text-anchor") ? p = C = .5 : this.rotation ? p = .25 : C = .75;
                        p = {
                            x: p,
                            y: C
                        }
                    }
                    C = +this.attr("x");
                    const c = +this.attr("y");
                    isNaN(C) || (k = C - d.width * p.x - f);
                    isNaN(c) || (A = c - d.height * p.y - f);
                    t && a && (t = y,
                    y = h,
                    h = t,
                    isNaN(C) || (k = C - d.height * p.x - f),
                    isNaN(c) || (A = c - d.width * p.y - f))
                }
                this.focusBorder = this.renderer.rect(k, A, y, h, parseInt((c && c.r || 0).toString(), 10) / E).addClass("highcharts-focus-border").attr({
                    zIndex: 99
                }).add(e);
                this.renderer.styledMode || this.focusBorder.attr({
                    stroke: c && c.stroke,
                    "stroke-width": (c && c.strokeWidth || 0) / E
                });
                g(this, a, c);
                n(this)
            }
            function g(a, ...c) {
                a.focusBorderUpdateHooks || (a.focusBorderUpdateHooks = {},
                e.forEach(b => {
                    b += "Setter";
                    const d = a[b] || a._defaultSetter;
                    a.focusBorderUpdateHooks[b] = d;
                    a[b] = function() {
                        const b = d.apply(a, arguments);
                        a.addFocusBorder.apply(a, c);
                        return b
                    }
                }
                ))
            }
            function a() {
                c(this);
                this.focusBorderDestroyHook && (this.destroy = this.focusBorderDestroyHook,
                delete this.focusBorderDestroyHook);
                this.focusBorder && (this.focusBorder.destroy(),
                delete this.focusBorder)
            }
            function c(a) {
                a.focusBorderUpdateHooks && (Object.keys(a.focusBorderUpdateHooks).forEach(c => {
                    const b = a.focusBorderUpdateHooks[c];
                    b === a._defaultSetter ? delete a[c] : a[c] = b
                }
                ),
                delete a.focusBorderUpdateHooks)
            }
            const d = []
              , e = "x y transform width height r d stroke-width".split(" ");
            m.compose = function(c, b) {
                r.pushUnique(d, c) && (c = c.prototype,
                c.renderFocusBorder = u,
                c.setFocusToElement = z);
                r.pushUnique(d, b) && (b = b.prototype,
                b.addFocusBorder = k,
                b.removeFocusBorder = a)
            }
        }
        )(m || (m = {}));
        return m
    });
    x(b, "Accessibility/Utils/Announcer.js", [b["Core/Renderer/HTML/AST.js"], b["Accessibility/Utils/DOMElementProvider.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function(b, r, q, l, m) {
        const {doc: u} = q
          , {addClass: v, visuallyHideElement: z} = l
          , {attr: n} = m;
        class k {
            constructor(b, a) {
                this.chart = b;
                this.domElementProvider = new r;
                this.announceRegion = this.addAnnounceRegion(a)
            }
            destroy() {
                this.domElementProvider.destroyCreatedElements()
            }
            announce(g) {
                b.setElementHTML(this.announceRegion, g);
                this.clearAnnouncementRegionTimer && clearTimeout(this.clearAnnouncementRegionTimer);
                this.clearAnnouncementRegionTimer = setTimeout( () => {
                    this.announceRegion.innerHTML = b.emptyHTML;
                    delete this.clearAnnouncementRegionTimer
                }
                , 1E3)
            }
            addAnnounceRegion(b) {
                const a = this.chart.announcerContainer || this.createAnnouncerContainer()
                  , c = this.domElementProvider.createElement("div");
                n(c, {
                    "aria-hidden": !1,
                    "aria-live": b
                });
                this.chart.styledMode ? v(c, "highcharts-visually-hidden") : z(c);
                a.appendChild(c);
                return c
            }
            createAnnouncerContainer() {
                const b = this.chart
                  , a = u.createElement("div");
                n(a, {
                    "aria-hidden": !1,
                    "class": "highcharts-announcer-container"
                });
                a.style.position = "relative";
                b.renderTo.insertBefore(a, b.renderTo.firstChild);
                return b.announcerContainer = a
            }
        }
        return k
    });
    x(b, "Accessibility/Components/AnnotationsA11y.js", [b["Accessibility/Utils/HTMLUtilities.js"]], function(b) {
        function r(b) {
            return (b.annotations || []).reduce( (b, k) => {
                k.options && !1 !== k.options.visible && (b = b.concat(k.labels));
                return b
            }
            , [])
        }
        function q(b) {
            return b.options && b.options.accessibility && b.options.accessibility.description || b.graphic && b.graphic.text && b.graphic.text.textStr || ""
        }
        function l(b) {
            var n = b.options && b.options.accessibility && b.options.accessibility.description;
            if (n)
                return n;
            n = b.chart;
            const k = q(b)
              , g = b.points.filter(a => !!a.graphic).map(a => {
                const b = a.accessibility && a.accessibility.valueDescription || a.graphic && a.graphic.element && a.graphic.element.getAttribute("aria-label") || "";
                a = a && a.series.name || "";
                return (a ? a + ", " : "") + "data point " + b
            }
            ).filter(a => !!a)
              , a = g.length
              , c = "accessibility.screenReaderSection.annotations.description" + (1 < a ? "MultiplePoints" : a ? "SinglePoint" : "NoPoints");
            b = {
                annotationText: k,
                annotation: b,
                numPoints: a,
                annotationPoint: g[0],
                additionalAnnotationPoints: g.slice(1)
            };
            return n.langFormat(c, b)
        }
        function m(b) {
            return r(b).map(b => (b = u(v(l(b)))) ? `<li>${b}</li>` : "")
        }
        const {escapeStringForHTML: u, stripHTMLTagsFromString: v} = b;
        return {
            getAnnotationsInfoHTML: function(b) {
                const n = b.annotations;
                return n && n.length ? `<ul style="list-style-type: none">${m(b).join(" ")}</ul>` : ""
            },
            getAnnotationLabelDescription: l,
            getAnnotationListItems: m,
            getPointAnnotationTexts: function(b) {
                const n = r(b.series.chart).filter(k => -1 < k.points.indexOf(b));
                return n.length ? n.map(b => `${q(b)}`) : []
            }
        }
    });
    x(b, "Accessibility/Components/InfoRegionsComponent.js", [b["Accessibility/A11yI18n.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/Announcer.js"], b["Accessibility/Components/AnnotationsA11y.js"], b["Core/Renderer/HTML/AST.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Core/Templating.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function(b, r, q, l, m, u, L, z, n, k) {
        function g(a, b) {
            var c = b[0]
              , p = a.series && a.series[0] || {};
            p = {
                numSeries: a.series.length,
                numPoints: p.points && p.points.length,
                chart: a,
                mapTitle: a.mapView && a.mapView.geoMap && a.mapView.geoMap.title
            };
            if (!c)
                return a.langFormat("accessibility.chartTypes.emptyChart", p);
            if ("map" === c || "tiledwebmap" === c)
                return p.mapTitle ? a.langFormat("accessibility.chartTypes.mapTypeDescription", p) : a.langFormat("accessibility.chartTypes.unknownMap", p);
            if (1 < a.types.length)
                return a.langFormat("accessibility.chartTypes.combinationChart", p);
            {
                b = b[0];
                c = a.langFormat("accessibility.seriesTypeDescriptions." + b, p);
                const d = a.series && 2 > a.series.length ? "Single" : "Multiple";
                a = (a.langFormat("accessibility.chartTypes." + b + d, p) || a.langFormat("accessibility.chartTypes.default" + d, p)) + (c ? " " + c : "")
            }
            return a
        }
        const {getAnnotationsInfoHTML: a} = l
          , {getAxisDescription: c, getAxisRangeDescription: d, getChartTitle: e, unhideChartElementFromAT: f} = u
          , {format: E} = L
          , {doc: B} = z
          , {addClass: J, getElement: v, getHeadingTagNameForElement: F, stripHTMLTagsFromString: x, visuallyHideElement: A} = n
          , {attr: y, pick: h} = k;
        class t extends r {
            constructor() {
                super(...arguments);
                this.announcer = void 0;
                this.screenReaderSections = {}
            }
            init() {
                const a = this.chart
                  , b = this;
                this.initRegionsDefinitions();
                this.addEvent(a, "aftergetTableAST", function(a) {
                    b.onDataTableCreated(a)
                });
                this.addEvent(a, "afterViewData", function(a) {
                    a.wasHidden && (b.dataTableDiv = a.element,
                    setTimeout(function() {
                        b.focusDataTable()
                    }, 300))
                });
                this.announcer = new q(a,"assertive")
            }
            initRegionsDefinitions() {
                const a = this;
                this.screenReaderSections = {
                    before: {
                        element: null,
                        buildContent: function(b) {
                            const c = b.options.accessibility.screenReaderSection.beforeChartFormatter;
                            return c ? c(b) : a.defaultBeforeChartFormatter(b)
                        },
                        insertIntoDOM: function(a, b) {
                            b.renderTo.insertBefore(a, b.renderTo.firstChild)
                        },
                        afterInserted: function() {
                            "undefined" !== typeof a.sonifyButtonId && a.initSonifyButton(a.sonifyButtonId);
                            "undefined" !== typeof a.dataTableButtonId && a.initDataTableButton(a.dataTableButtonId)
                        }
                    },
                    after: {
                        element: null,
                        buildContent: function(b) {
                            const c = b.options.accessibility.screenReaderSection.afterChartFormatter;
                            return c ? c(b) : a.defaultAfterChartFormatter()
                        },
                        insertIntoDOM: function(a, b) {
                            b.renderTo.insertBefore(a, b.container.nextSibling)
                        },
                        afterInserted: function() {
                            a.chart.accessibility && a.chart.accessibility.keyboardNavigation.updateExitAnchor()
                        }
                    }
                }
            }
            onChartRender() {
                const a = this;
                this.linkedDescriptionElement = this.getLinkedDescriptionElement();
                this.setLinkedDescriptionAttrs();
                Object.keys(this.screenReaderSections).forEach(function(b) {
                    a.updateScreenReaderSection(b)
                })
            }
            getLinkedDescriptionElement() {
                var a = this.chart.options.accessibility.linkedDescription;
                if (a) {
                    if ("string" !== typeof a)
                        return a;
                    a = E(a, this.chart);
                    a = B.querySelectorAll(a);
                    if (1 === a.length)
                        return a[0]
                }
            }
            setLinkedDescriptionAttrs() {
                const a = this.linkedDescriptionElement;
                a && (a.setAttribute("aria-hidden", "true"),
                J(a, "highcharts-linked-description"))
            }
            updateScreenReaderSection(a) {
                const b = this.chart
                  , c = this.screenReaderSections[a]
                  , d = c.buildContent(b)
                  , h = c.element = c.element || this.createElement("div")
                  , p = h.firstChild || this.createElement("div");
                d ? (this.setScreenReaderSectionAttribs(h, a),
                m.setElementHTML(p, d),
                h.appendChild(p),
                c.insertIntoDOM(h, b),
                b.styledMode ? J(p, "highcharts-visually-hidden") : A(p),
                f(b, p),
                c.afterInserted && c.afterInserted()) : (h.parentNode && h.parentNode.removeChild(h),
                c.element = null)
            }
            setScreenReaderSectionAttribs(a, b) {
                const c = this.chart
                  , d = c.langFormat("accessibility.screenReaderSection." + b + "RegionLabel", {
                    chart: c,
                    chartTitle: e(c)
                });
                y(a, {
                    id: `highcharts-screen-reader-region-${b}-${c.index}`,
                    "aria-label": d || void 0
                });
                a.style.position = "relative";
                d && a.setAttribute("role", "all" === c.options.accessibility.landmarkVerbosity ? "region" : "group")
            }
            defaultBeforeChartFormatter() {
                var c = this.chart;
                const d = c.options.accessibility.screenReaderSection.beforeChartFormat;
                if (!d)
                    return "";
                var h = this.getAxesDescription();
                const f = c.sonify && c.options.sonification && c.options.sonification.enabled
                  , w = "highcharts-a11y-sonify-data-btn-" + c.index
                  , t = "hc-linkto-highcharts-data-table-" + c.index
                  , y = a(c)
                  , A = c.langFormat("accessibility.screenReaderSection.annotations.heading", {
                    chart: c
                });
                h = {
                    headingTagName: F(c.renderTo),
                    chartTitle: e(c),
                    typeDescription: this.getTypeDescriptionText(),
                    chartSubtitle: this.getSubtitleText(),
                    chartLongdesc: this.getLongdescText(),
                    xAxisDescription: h.xAxis,
                    yAxisDescription: h.yAxis,
                    playAsSoundButton: f ? this.getSonifyButtonText(w) : "",
                    viewTableButton: c.getCSV ? this.getDataTableButtonText(t) : "",
                    annotationsTitle: y ? A : "",
                    annotationsList: y
                };
                c = b.i18nFormat(d, h, c);
                this.dataTableButtonId = t;
                this.sonifyButtonId = w;
                return c.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
            }
            defaultAfterChartFormatter() {
                const a = this.chart
                  , c = a.options.accessibility.screenReaderSection.afterChartFormat;
                if (!c)
                    return "";
                const d = {
                    endOfChartMarker: this.getEndOfChartMarkerText()
                };
                return b.i18nFormat(c, d, a).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
            }
            getLinkedDescription() {
                const a = this.linkedDescriptionElement;
                return x(a && a.innerHTML || "")
            }
            getLongdescText() {
                const a = this.chart.options;
                var b = a.caption;
                b = b && b.text;
                const c = this.getLinkedDescription();
                return a.accessibility.description || c || b || ""
            }
            getTypeDescriptionText() {
                const a = this.chart;
                return a.types ? a.options.accessibility.typeDescription || g(a, a.types) : ""
            }
            getDataTableButtonText(a) {
                var b = this.chart;
                b = b.langFormat("accessibility.table.viewAsDataTableButtonText", {
                    chart: b,
                    chartTitle: e(b)
                });
                return '<button id="' + a + '">' + b + "</button>"
            }
            getSonifyButtonText(a) {
                var b = this.chart;
                if (b.options.sonification && !1 === b.options.sonification.enabled)
                    return "";
                b = b.langFormat("accessibility.sonification.playAsSoundButtonText", {
                    chart: b,
                    chartTitle: e(b)
                });
                return '<button id="' + a + '">' + b + "</button>"
            }
            getSubtitleText() {
                const a = this.chart.options.subtitle;
                return x(a && a.text || "")
            }
            getEndOfChartMarkerText() {
                const a = this.chart
                  , b = a.langFormat("accessibility.screenReaderSection.endOfChartMarker", {
                    chart: a
                });
                return '<div id="highcharts-end-of-chart-marker-' + a.index + '">' + b + "</div>"
            }
            onDataTableCreated(a) {
                const b = this.chart;
                if (b.options.accessibility.enabled) {
                    this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded", "true");
                    const c = a.tree.attributes || {};
                    c.tabindex = -1;
                    c.summary = b.langFormat("accessibility.table.tableSummary", {
                        chart: b
                    });
                    a.tree.attributes = c
                }
            }
            focusDataTable() {
                var a = this.dataTableDiv;
                (a = a && a.getElementsByTagName("table")[0]) && a.focus && a.focus()
            }
            initSonifyButton(a) {
                const b = this.sonifyButton = v(a)
                  , c = this.chart
                  , d = a => {
                    b && (b.setAttribute("aria-hidden", "true"),
                    b.setAttribute("aria-label", ""));
                    a.preventDefault();
                    a.stopPropagation();
                    a = c.langFormat("accessibility.sonification.playAsSoundClickAnnouncement", {
                        chart: c
                    });
                    this.announcer.announce(a);
                    setTimeout( () => {
                        b && (b.removeAttribute("aria-hidden"),
                        b.removeAttribute("aria-label"));
                        c.sonify && c.sonify()
                    }
                    , 1E3)
                }
                ;
                b && c && (b.setAttribute("tabindex", -1),
                b.onclick = function(a) {
                    (c.options.accessibility && c.options.accessibility.screenReaderSection.onPlayAsSoundClick || d).call(this, a, c)
                }
                )
            }
            initDataTableButton(a) {
                const b = this.viewDataTableButton = v(a)
                  , c = this.chart;
                a = a.replace("hc-linkto-", "");
                b && (y(b, {
                    tabindex: -1,
                    "aria-expanded": !!v(a)
                }),
                b.onclick = c.options.accessibility.screenReaderSection.onViewDataTableClick || function() {
                    c.viewData()
                }
                )
            }
            getAxesDescription() {
                const a = this.chart;
                var b = function(b, c) {
                    b = a[b];
                    return 1 < b.length || b[0] && h(b[0].options.accessibility && b[0].options.accessibility.enabled, c)
                }
                  , c = !!a.types && 0 > a.types.indexOf("map") && 0 > a.types.indexOf("treemap") && 0 > a.types.indexOf("tilemap");
                const d = !!a.hasCartesianSeries
                  , f = b("xAxis", !a.angular && d && c);
                b = b("yAxis", d && c);
                c = {};
                f && (c.xAxis = this.getAxisDescriptionText("xAxis"));
                b && (c.yAxis = this.getAxisDescriptionText("yAxis"));
                return c
            }
            getAxisDescriptionText(a) {
                const b = this.chart
                  , h = b[a];
                return b.langFormat("accessibility.axis." + a + "Description" + (1 < h.length ? "Plural" : "Singular"), {
                    chart: b,
                    names: h.map(function(a) {
                        return c(a)
                    }),
                    ranges: h.map(function(a) {
                        return d(a)
                    }),
                    numAxes: h.length
                })
            }
            destroy() {
                this.announcer && this.announcer.destroy()
            }
        }
        return t
    });
    x(b, "Accessibility/Components/MenuComponent.js", [b["Core/Chart/Chart.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r, q, l, m, u) {
        const {attr: v} = r
          , {getChartTitle: z, unhideChartElementFromAT: n} = m
          , {getFakeMouseEvent: k} = u;
        class g extends q {
            init() {
                const a = this.chart
                  , b = this;
                this.addEvent(a, "exportMenuShown", function() {
                    b.onMenuShown()
                });
                this.addEvent(a, "exportMenuHidden", function() {
                    b.onMenuHidden()
                });
                this.createProxyGroup()
            }
            onMenuHidden() {
                const a = this.chart.exportContextMenu;
                a && a.setAttribute("aria-hidden", "true");
                this.setExportButtonExpandedState("false")
            }
            onMenuShown() {
                const a = this.chart
                  , b = a.exportContextMenu;
                b && (this.addAccessibleContextMenuAttribs(),
                n(a, b));
                this.setExportButtonExpandedState("true")
            }
            setExportButtonExpandedState(a) {
                this.exportButtonProxy && this.exportButtonProxy.buttonElement.setAttribute("aria-expanded", a)
            }
            onChartRender() {
                const a = this.chart
                  , b = a.focusElement
                  , d = a.accessibility;
                this.proxyProvider.clearGroup("chartMenu");
                this.proxyMenuButton();
                this.exportButtonProxy && b && b === a.exportingGroup && (b.focusBorder ? a.setFocusToElement(b, this.exportButtonProxy.buttonElement) : d && d.keyboardNavigation.tabindexContainer.focus())
            }
            proxyMenuButton() {
                const a = this.chart
                  , b = this.proxyProvider
                  , d = a.exportSVGElements && a.exportSVGElements[0];
                {
                    var e = a.options.exporting;
                    const b = a.exportSVGElements && a.exportSVGElements[0];
                    e = !!(e && !1 !== e.enabled && e.accessibility && e.accessibility.enabled && b && b.element)
                }
                e && d && (this.exportButtonProxy = b.addProxyElement("chartMenu", {
                    click: d
                }, {
                    "aria-label": a.langFormat("accessibility.exporting.menuButtonLabel", {
                        chart: a,
                        chartTitle: z(a)
                    }),
                    "aria-expanded": !1,
                    title: a.options.lang.contextButtonTitle || null
                }))
            }
            createProxyGroup() {
                this.chart && this.proxyProvider && this.proxyProvider.addGroup("chartMenu", "div")
            }
            addAccessibleContextMenuAttribs() {
                const a = this.chart;
                var b = a.exportDivElements;
                b && b.length && (b.forEach(a => {
                    a && ("LI" !== a.tagName || a.children && a.children.length ? a.setAttribute("aria-hidden", "true") : a.setAttribute("tabindex", -1))
                }
                ),
                (b = b[0] && b[0].parentNode) && v(b, {
                    "aria-hidden": void 0,
                    "aria-label": a.langFormat("accessibility.exporting.chartMenuLabel", {
                        chart: a
                    }),
                    role: "list"
                }))
            }
            getKeyboardNavigation() {
                const a = this.keyCodes
                  , b = this.chart
                  , d = this;
                return new l(b,{
                    keyCodeMap: [[[a.left, a.up], function() {
                        return d.onKbdPrevious(this)
                    }
                    ], [[a.right, a.down], function() {
                        return d.onKbdNext(this)
                    }
                    ], [[a.enter, a.space], function() {
                        return d.onKbdClick(this)
                    }
                    ]],
                    validate: function() {
                        return !!b.exporting && !1 !== b.options.exporting.enabled && !1 !== b.options.exporting.accessibility.enabled
                    },
                    init: function() {
                        const a = d.exportButtonProxy
                          , c = d.chart.exportingGroup;
                        a && c && b.setFocusToElement(c, a.buttonElement)
                    },
                    terminate: function() {
                        b.hideExportMenu()
                    }
                })
            }
            onKbdPrevious(a) {
                const b = this.chart
                  , d = b.options.accessibility;
                a = a.response;
                let e = b.highlightedExportItemIx || 0;
                for (; e--; )
                    if (b.highlightExportItem(e))
                        return a.success;
                return d.keyboardNavigation.wrapAround ? (b.highlightLastExportItem(),
                a.success) : a.prev
            }
            onKbdNext(a) {
                const b = this.chart
                  , d = b.options.accessibility;
                a = a.response;
                for (let c = (b.highlightedExportItemIx || 0) + 1; c < b.exportDivElements.length; ++c)
                    if (b.highlightExportItem(c))
                        return a.success;
                return d.keyboardNavigation.wrapAround ? (b.highlightExportItem(0),
                a.success) : a.next
            }
            onKbdClick(a) {
                const b = this.chart
                  , d = b.exportDivElements[b.highlightedExportItemIx]
                  , e = (b.exportSVGElements && b.exportSVGElements[0]).element;
                b.openMenu ? this.fakeClickEvent(d) : (this.fakeClickEvent(e),
                b.highlightExportItem(0));
                return a.response.success
            }
        }
        (function(a) {
            function c() {
                var a = this.exportSVGElements && this.exportSVGElements[0];
                if (a && (a = a.element,
                a.onclick))
                    a.onclick(k("click"))
            }
            function d() {
                const a = this.exportDivElements;
                a && this.exportContextMenu && this.openMenu && (a.forEach(a => {
                    if (a && "highcharts-menu-item" === a.className && a.onmouseout)
                        a.onmouseout(k("mouseout"))
                }
                ),
                this.highlightedExportItemIx = 0,
                this.exportContextMenu.hideMenu(),
                this.container.focus())
            }
            function e(a) {
                const b = this.exportDivElements && this.exportDivElements[a]
                  , c = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx];
                if (b && "LI" === b.tagName && (!b.children || !b.children.length)) {
                    const d = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus;
                    b.focus && d && b.focus();
                    if (c && c.onmouseout)
                        c.onmouseout(k("mouseout"));
                    if (b.onmouseover)
                        b.onmouseover(k("mouseover"));
                    this.highlightedExportItemIx = a;
                    return !0
                }
                return !1
            }
            function f() {
                if (this.exportDivElements) {
                    let a = this.exportDivElements.length;
                    for (; a--; )
                        if (this.highlightExportItem(a))
                            return !0
                }
                return !1
            }
            const E = [];
            a.compose = function(a) {
                r.pushUnique(E, a) && (a = b.prototype,
                a.hideExportMenu = d,
                a.highlightExportItem = e,
                a.highlightLastExportItem = f,
                a.showExportMenu = c)
            }
        }
        )(g || (g = {}));
        return g
    });
    x(b, "Accessibility/KeyboardNavigation.js", [b["Core/Globals.js"], b["Accessibility/Components/MenuComponent.js"], b["Core/Utilities.js"], b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r, q, l, m) {
        const {doc: u, win: v} = b
          , {addEvent: z, fireEvent: n} = q
          , {getElement: k, simulatedEventTarget: g} = m;
        class a {
            constructor(a, b) {
                this.components = this.chart = void 0;
                this.currentModuleIx = NaN;
                this.exitAnchor = this.eventProvider = void 0;
                this.modules = [];
                this.tabindexContainer = void 0;
                this.init(a, b)
            }
            init(a, b) {
                const c = this.eventProvider = new l;
                this.chart = a;
                this.components = b;
                this.modules = [];
                this.currentModuleIx = 0;
                this.update();
                c.addEvent(this.tabindexContainer, "keydown", a => this.onKeydown(a));
                c.addEvent(this.tabindexContainer, "focus", a => this.onFocus(a));
                ["mouseup", "touchend"].forEach(a => c.addEvent(u, a, a => this.onMouseUp(a)));
                ["mousedown", "touchstart"].forEach(b => c.addEvent(a.renderTo, b, () => {
                    this.isClickingChart = !0
                }
                ))
            }
            update(a) {
                var b = this.chart.options.accessibility;
                b = b && b.keyboardNavigation;
                const c = this.components;
                this.updateContainerTabindex();
                b && b.enabled && a && a.length ? (this.modules = a.reduce(function(a, b) {
                    b = c[b].getKeyboardNavigation();
                    return a.concat(b)
                }, []),
                this.updateExitAnchor()) : (this.modules = [],
                this.currentModuleIx = 0,
                this.removeExitAnchor())
            }
            updateExitAnchor() {
                const a = k(`highcharts-end-of-chart-marker-${this.chart.index}`);
                this.removeExitAnchor();
                a ? (this.makeElementAnExitAnchor(a),
                this.exitAnchor = a) : this.createExitAnchor()
            }
            move(a) {
                var b = this.modules && this.modules[this.currentModuleIx];
                b && b.terminate && b.terminate(a);
                this.chart.focusElement && this.chart.focusElement.removeFocusBorder();
                this.currentModuleIx += a;
                if (b = this.modules && this.modules[this.currentModuleIx]) {
                    if (b.validate && !b.validate())
                        return this.move(a);
                    if (b.init)
                        return b.init(a),
                        !0
                }
                this.currentModuleIx = 0;
                this.exiting = !0;
                0 < a ? this.exitAnchor && this.exitAnchor.focus() : this.tabindexContainer.focus();
                return !1
            }
            onFocus(a) {
                var b = this.chart;
                a = a.relatedTarget && b.container.contains(a.relatedTarget);
                !(b = (b = b.options.accessibility) && b.keyboardNavigation) || !b.enabled || this.exiting || this.tabbingInBackwards || this.isClickingChart || a || (a = this.getFirstValidModuleIx(),
                null !== a && (this.currentModuleIx = a,
                this.modules[a].init(1)));
                this.exiting = !1
            }
            onMouseUp(a) {
                delete this.isClickingChart;
                if (!this.keyboardReset && a.relatedTarget !== g) {
                    const b = this.chart;
                    a.target && b.container.contains(a.target) || ((a = this.modules && this.modules[this.currentModuleIx || 0]) && a.terminate && a.terminate(),
                    this.currentModuleIx = 0);
                    b.focusElement && (b.focusElement.removeFocusBorder(),
                    delete b.focusElement);
                    this.keyboardReset = !0
                }
            }
            onKeydown(a) {
                a = a || v.event;
                const b = this.modules && this.modules.length && this.modules[this.currentModuleIx];
                let c;
                this.exiting = this.keyboardReset = !1;
                if (b) {
                    const d = b.run(a);
                    d === b.response.success ? c = !0 : d === b.response.prev ? c = this.move(-1) : d === b.response.next && (c = this.move(1));
                    c && (a.preventDefault(),
                    a.stopPropagation())
                }
            }
            updateContainerTabindex() {
                var a = this.chart.options.accessibility;
                a = a && a.keyboardNavigation;
                a = !(a && !1 === a.enabled);
                const b = this.chart;
                var e = b.container;
                b.renderTo.hasAttribute("tabindex") && (e.removeAttribute("tabindex"),
                e = b.renderTo);
                this.tabindexContainer = e;
                const f = e.getAttribute("tabindex");
                a && !f ? e.setAttribute("tabindex", "0") : a || b.container.removeAttribute("tabindex")
            }
            createExitAnchor() {
                const a = this.chart
                  , b = this.exitAnchor = u.createElement("div");
                a.renderTo.appendChild(b);
                this.makeElementAnExitAnchor(b)
            }
            makeElementAnExitAnchor(a) {
                const b = this.tabindexContainer.getAttribute("tabindex") || 0;
                a.setAttribute("class", "highcharts-exit-anchor");
                a.setAttribute("tabindex", b);
                a.setAttribute("aria-hidden", !1);
                this.addExitAnchorEventsToEl(a)
            }
            removeExitAnchor() {
                this.exitAnchor && this.exitAnchor.parentNode && (this.exitAnchor.parentNode.removeChild(this.exitAnchor),
                delete this.exitAnchor)
            }
            addExitAnchorEventsToEl(a) {
                const b = this.chart
                  , c = this;
                this.eventProvider.addEvent(a, "focus", function(a) {
                    a = a || v.event;
                    const d = !(a.relatedTarget && b.container.contains(a.relatedTarget) || c.exiting);
                    b.focusElement && delete b.focusElement;
                    d ? (c.tabbingInBackwards = !0,
                    c.tabindexContainer.focus(),
                    delete c.tabbingInBackwards,
                    a.preventDefault(),
                    c.modules && c.modules.length && (c.currentModuleIx = c.modules.length - 1,
                    (a = c.modules[c.currentModuleIx]) && a.validate && !a.validate() ? c.move(-1) : a && a.init(-1))) : c.exiting = !1
                })
            }
            getFirstValidModuleIx() {
                const a = this.modules.length;
                for (let b = 0; b < a; ++b) {
                    const a = this.modules[b];
                    if (!a.validate || a.validate())
                        return b
                }
                return null
            }
            destroy() {
                this.removeExitAnchor();
                this.eventProvider.removeAddedEvents();
                this.chart.container.removeAttribute("tabindex")
            }
        }
        (function(a) {
            function c() {
                const a = this;
                n(this, "dismissPopupContent", {}, function() {
                    a.tooltip && a.tooltip.hide(0);
                    a.hideExportMenu()
                })
            }
            function e(a) {
                27 === (a.which || a.keyCode) && b.charts && b.charts.forEach(a => {
                    a && a.dismissPopupContent && a.dismissPopupContent()
                }
                )
            }
            const f = [];
            a.compose = function(a) {
                r.compose(a);
                q.pushUnique(f, a) && (a.prototype.dismissPopupContent = c);
                q.pushUnique(f, u) && z(u, "keydown", e);
                return a
            }
        }
        )(a || (a = {}));
        return a
    });
    x(b, "Accessibility/Components/LegendComponent.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Globals.js"], b["Core/Legend/Legend.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r, q, l, m, u, L, z) {
        function n(a) {
            const b = a.legend && a.legend.allItems
              , c = a.options.legend.accessibility || {};
            a = a.colorAxis && a.colorAxis.some(a => !a.dataClasses || !a.dataClasses.length);
            return !(!b || !b.length || a || !1 === c.enabled)
        }
        function k(a, b) {
            const c = b.legendItem || {};
            b.setState(a ? "hover" : "", !0);
            for (const h of ["group", "label", "symbol"])
                (b = (b = c[h]) && b.element || b) && d(b, a ? "mouseover" : "mouseout")
        }
        const {animObject: g} = b
          , {doc: a} = r
          , {addEvent: c, fireEvent: d, isNumber: e, pick: f, syncTimeout: E} = l
          , {getChartTitle: B} = L
          , {stripHTMLTagsFromString: v, addClass: I, removeClass: x} = z;
        class G extends m {
            constructor() {
                super(...arguments);
                this.highlightedLegendItemIx = NaN;
                this.proxyGroup = null
            }
            init() {
                const a = this;
                this.recreateProxies();
                this.addEvent(q, "afterScroll", function() {
                    this.chart === a.chart && (a.proxyProvider.updateGroupProxyElementPositions("legend"),
                    a.updateLegendItemProxyVisibility(),
                    -1 < a.highlightedLegendItemIx && this.chart.highlightLegendItem(a.highlightedLegendItemIx))
                });
                this.addEvent(q, "afterPositionItem", function(b) {
                    this.chart === a.chart && this.chart.renderer && a.updateProxyPositionForItem(b.item)
                });
                this.addEvent(q, "afterRender", function() {
                    this.chart === a.chart && this.chart.renderer && a.recreateProxies() && E( () => a.proxyProvider.updateGroupProxyElementPositions("legend"), g(f(this.chart.renderer.globalAnimation, !0)).duration)
                })
            }
            updateLegendItemProxyVisibility() {
                const a = this.chart
                  , b = a.legend
                  , c = b.currentPage || 1
                  , d = b.clipHeight || 0;
                let f;
                (b.allItems || []).forEach(h => {
                    if (h.a11yProxyElement) {
                        var e = b.pages && b.pages.length;
                        const w = h.a11yProxyElement.element;
                        var p = !1;
                        f = h.legendItem || {};
                        e && (h = f.pageIx || 0,
                        e = f.y || 0,
                        p = f.label ? Math.round(f.label.getBBox().height) : 0,
                        p = e + p - b.pages[h] > d || h !== c - 1);
                        p ? a.styledMode ? I(w, "highcharts-a11y-invisible") : w.style.visibility = "hidden" : (x(w, "highcharts-a11y-invisible"),
                        w.style.visibility = "")
                    }
                }
                )
            }
            onChartRender() {
                n(this.chart) || this.removeProxies()
            }
            highlightAdjacentLegendPage(a) {
                const b = this.chart;
                var c = b.legend;
                a = (c.currentPage || 1) + a;
                var d = c.pages || [];
                if (0 < a && a <= d.length) {
                    d = 0;
                    for (const h of c.allItems)
                        ((h.legendItem || {}).pageIx || 0) + 1 === a && (c = b.highlightLegendItem(d)) && (this.highlightedLegendItemIx = d),
                        ++d
                }
            }
            updateProxyPositionForItem(a) {
                a.a11yProxyElement && a.a11yProxyElement.refreshPosition()
            }
            recreateProxies() {
                var b = a.activeElement;
                const c = this.proxyGroup;
                b = b && c && c.contains(b);
                this.removeProxies();
                return n(this.chart) ? (this.addLegendProxyGroup(),
                this.proxyLegendItems(),
                this.updateLegendItemProxyVisibility(),
                this.updateLegendTitle(),
                b && this.chart.highlightLegendItem(this.highlightedLegendItemIx),
                !0) : !1
            }
            removeProxies() {
                this.proxyProvider.removeGroup("legend")
            }
            updateLegendTitle() {
                var a = this.chart;
                const b = v((a.legend && a.legend.options.title && a.legend.options.title.text || "").replace(/<br ?\/?>/g, " "));
                a = a.langFormat("accessibility.legend.legendLabel" + (b ? "" : "NoTitle"), {
                    chart: a,
                    legendTitle: b,
                    chartTitle: B(a)
                });
                this.proxyProvider.updateGroupAttrs("legend", {
                    "aria-label": a
                })
            }
            addLegendProxyGroup() {
                this.proxyGroup = this.proxyProvider.addGroup("legend", "ul", {
                    "aria-label": "_placeholder_",
                    role: "all" === this.chart.options.accessibility.landmarkVerbosity ? "region" : null
                })
            }
            proxyLegendItems() {
                const a = this;
                let b;
                ((this.chart.legend || {}).allItems || []).forEach(c => {
                    b = c.legendItem || {};
                    b.label && b.label.element && a.proxyLegendItem(c)
                }
                )
            }
            proxyLegendItem(a) {
                const b = a.legendItem || {};
                if (b.label && b.group) {
                    var c = this.chart.langFormat("accessibility.legend.legendItem", {
                        chart: this.chart,
                        itemName: v(a.name),
                        item: a
                    });
                    a.a11yProxyElement = this.proxyProvider.addProxyElement("legend", {
                        click: b.label,
                        visual: (b.group.div ? b.label : b.group).element
                    }, {
                        tabindex: -1,
                        "aria-pressed": a.visible,
                        "aria-label": c
                    })
                }
            }
            getKeyboardNavigation() {
                const a = this.keyCodes
                  , b = this
                  , c = this.chart;
                return new u(c,{
                    keyCodeMap: [[[a.left, a.right, a.up, a.down], function(a) {
                        return b.onKbdArrowKey(this, a)
                    }
                    ], [[a.enter, a.space], function() {
                        return b.onKbdClick(this)
                    }
                    ], [[a.pageDown, a.pageUp], function(c) {
                        b.highlightAdjacentLegendPage(c === a.pageDown ? 1 : -1);
                        return this.response.success
                    }
                    ]],
                    validate: function() {
                        return b.shouldHaveLegendNavigation()
                    },
                    init: function() {
                        c.highlightLegendItem(0);
                        b.highlightedLegendItemIx = 0
                    },
                    terminate: function() {
                        b.highlightedLegendItemIx = -1;
                        c.legend.allItems.forEach(a => k(!1, a))
                    }
                })
            }
            onKbdArrowKey(a, b) {
                const c = this.keyCodes
                  , d = a.response
                  , f = this.chart
                  , e = f.options.accessibility
                  , H = f.legend.allItems.length;
                b = b === c.left || b === c.up ? -1 : 1;
                if (f.highlightLegendItem(this.highlightedLegendItemIx + b))
                    return this.highlightedLegendItemIx += b,
                    d.success;
                1 < H && e.keyboardNavigation.wrapAround && a.init(b);
                return d.success
            }
            onKbdClick(a) {
                const b = this.chart.legend.allItems[this.highlightedLegendItemIx];
                b && b.a11yProxyElement && b.a11yProxyElement.click();
                return a.response.success
            }
            shouldHaveLegendNavigation() {
                if (!n(this.chart))
                    return !1;
                const a = this.chart
                  , b = (a.options.legend || {}).accessibility || {};
                return !!(a.legend.display && b.keyboardNavigation && b.keyboardNavigation.enabled)
            }
        }
        (function(a) {
            function b(a) {
                var b = this.legend.allItems
                  , c = this.accessibility && this.accessibility.components.legend.highlightedLegendItemIx;
                const h = b[a];
                var d = h.legendItem || {};
                return h ? (e(c) && b[c] && k(!1, b[c]),
                b = this.legend,
                a = (b.allItems[a].legendItem || {}).pageIx,
                c = b.currentPage,
                "undefined" !== typeof a && a + 1 !== c && b.scroll(1 + a - c),
                d = d.label,
                a = h.a11yProxyElement && h.a11yProxyElement.buttonElement,
                d && d.element && a && this.setFocusToElement(d, a),
                k(!0, h),
                !0) : !1
            }
            function h(a) {
                const b = a.item;
                this.chart.options.accessibility.enabled && b && b.a11yProxyElement && b.a11yProxyElement.buttonElement.setAttribute("aria-pressed", a.visible ? "true" : "false")
            }
            const d = [];
            a.compose = function(a, f) {
                l.pushUnique(d, a) && (a.prototype.highlightLegendItem = b);
                l.pushUnique(d, f) && c(f, "afterColorizeItem", h)
            }
        }
        )(G || (G = {}));
        return G
    });
    x(b, "Accessibility/Components/SeriesComponent/SeriesDescriber.js", [b["Accessibility/Components/AnnotationsA11y.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Core/Templating.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function(b, r, q, l, m) {
        function u(a) {
            const b = a.index;
            return a.series && a.series.data && K(b) ? t(a.series.data, function(a) {
                return !!(a && "undefined" !== typeof a.index && a.index > b && a.graphic && a.graphic.element)
            }) || null : null
        }
        function v(a) {
            const b = a.chart.options.accessibility.series.pointDescriptionEnabledThreshold;
            return !!(!1 !== b && a.points && a.points.length >= b)
        }
        function z(a) {
            const b = a.options.accessibility || {};
            return !v(a) && !b.exposeAsGroupOnly
        }
        function n(a) {
            const b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation;
            return !(!a.points || !(a.points.length < b.pointNavigationEnabledThreshold || !1 === b.pointNavigationEnabledThreshold))
        }
        function k(a, b) {
            var c = a.series
              , h = c.chart;
            a = h.options.accessibility.point || {};
            const d = c.options.accessibility && c.options.accessibility.point || {};
            c = c.tooltipOptions || {};
            h = h.options.lang;
            return p(b) ? A(b, d.valueDecimals || a.valueDecimals || c.valueDecimals || -1, h.decimalPoint, h.accessibility.thousandsSep || h.thousandsSep) : b
        }
        function g(a) {
            const b = (a.options.accessibility || {}).description;
            return b && a.chart.langFormat("accessibility.series.description", {
                description: b,
                series: a
            }) || ""
        }
        function a(a, b) {
            return a.chart.langFormat("accessibility.series." + b + "Description", {
                name: B(a[b]),
                series: a
            })
        }
        function c(a, b, c) {
            const h = b || ""
              , d = c || "";
            return a.series.pointArrayMap.reduce(function(b, c) {
                {
                    const b = k(a, H(a[c], a.options[c]));
                    c = void 0 !== b ? c + ": " + h + b + d : b
                }
                return c ? b + (b.length ? ", " : "") + c : b
            }, "")
        }
        function d(a) {
            var b = a.series
              , h = 1 < b.chart.series.length || b.options.name
              , d = a.series;
            var f = d.chart;
            var e = d.options.accessibility;
            e = e && e.point && e.point.valueDescriptionFormat || f.options.accessibility.point.valueDescriptionFormat;
            d = H(d.xAxis && d.xAxis.options.accessibility && d.xAxis.options.accessibility.enabled, !f.angular && "flowmap" !== d.type);
            if (d) {
                var p = a.series;
                var t = p.chart;
                var C = p.options.accessibility && p.options.accessibility.point || {}
                  , w = t.options.accessibility.point || {};
                (p = p.xAxis && p.xAxis.dateTime) ? (p = p.getXDateFormat(a.x || 0, t.options.tooltip.dateTimeLabelFormats),
                C = C.dateFormatter && C.dateFormatter(a) || w.dateFormatter && w.dateFormatter(a) || C.dateFormat || w.dateFormat || p,
                t = t.time.dateFormat(C, a.x || 0, void 0)) : t = void 0;
                C = (a.series.xAxis || {}).categories && K(a.category) && ("" + a.category).replace("<br/>", " ");
                w = K(a.id) && 0 > ("" + a.id).indexOf("highcharts-");
                p = "x, " + a.x;
                t = a.name || t || C || (w ? a.id : p)
            } else
                t = "";
            C = t;
            t = K(a.index) ? a.index + 1 : "";
            {
                w = a.series;
                var y = w.chart.options.accessibility.point || {}
                  , g = w.chart.options.accessibility && w.chart.options.accessibility.point || {};
                const b = w.tooltipOptions || {};
                p = g.valuePrefix || y.valuePrefix || b.valuePrefix || "";
                y = g.valueSuffix || y.valueSuffix || b.valueSuffix || "";
                g = k(a, a["undefined" !== typeof a.value ? "value" : "y"]);
                w = a.isNull ? w.chart.langFormat("accessibility.series.nullPointValue", {
                    point: a
                }) : w.pointArrayMap ? c(a, p, y) : p + g + y
            }
            f = G(e, {
                point: a,
                index: t,
                xDescription: C,
                value: w,
                separator: d ? ", " : ""
            }, f);
            e = (e = a.options && a.options.accessibility && a.options.accessibility.description) ? " " + e : "";
            b = h ? " " + b.name + "." : "";
            h = a.series.chart;
            d = E(a);
            t = {
                point: a,
                annotations: d
            };
            h = d.length ? h.langFormat("accessibility.series.pointAnnotationsDescription", t) : "";
            a.accessibility = a.accessibility || {};
            a.accessibility.valueDescription = f;
            return f + e + b + (h ? " " + h : "")
        }
        function e(a) {
            const b = z(a)
              , c = n(a)
              , f = a.chart.options.accessibility.point.describeNull;
            (b || c) && a.points.forEach(c => {
                var e;
                if (!(e = c.graphic && c.graphic.element)) {
                    var p = c.series;
                    e = p && p.chart;
                    p = p && p.is("sunburst");
                    e = e && e.options.accessibility.point.describeNull;
                    if (e = c.isNull && !p && e) {
                        p = c.series;
                        var t = u(c);
                        p = (e = t && t.graphic) ? e.parentGroup : p.graph || p.group;
                        t = t ? {
                            x: H(c.plotX, t.plotX, 0),
                            y: H(c.plotY, t.plotY, 0)
                        } : {
                            x: H(c.plotX, 0),
                            y: H(c.plotY, 0)
                        };
                        t = c.series.chart.renderer.rect(t.x, t.y, 1, 1);
                        t.attr({
                            "class": "highcharts-a11y-mock-point",
                            fill: "none",
                            opacity: 0,
                            "fill-opacity": 0,
                            "stroke-opacity": 0
                        });
                        p && p.element ? (c.graphic = t,
                        c.hasMockGraphic = !0,
                        t.add(p),
                        p.element.insertBefore(t.element, e ? e.element : null),
                        e = t.element) : e = void 0
                    }
                }
                p = c.options && c.options.accessibility && !1 === c.options.accessibility.enabled;
                if (e)
                    if (c.isNull && !f)
                        e.setAttribute("aria-hidden", !0);
                    else if (e.setAttribute("tabindex", "-1"),
                    a.chart.styledMode || (e.style.outline = "none"),
                    b && !p) {
                        var w, y, g;
                        p = c.series;
                        t = (null === (w = p.options.accessibility) || void 0 === w ? void 0 : w.point) || {};
                        w = p.chart.options.accessibility.point || {};
                        c = h(C(t.descriptionFormat) && G(t.descriptionFormat, c, p.chart) || (null === (y = t.descriptionFormatter) || void 0 === y ? void 0 : y.call(t, c)) || C(w.descriptionFormat) && G(w.descriptionFormat, c, p.chart) || (null === (g = w.descriptionFormatter) || void 0 === g ? void 0 : g.call(w, c)) || d(c));
                        e.setAttribute("role", "img");
                        e.setAttribute("aria-label", c)
                    } else
                        e.setAttribute("aria-hidden", !0)
            }
            )
        }
        function f(b) {
            const c = b.chart;
            var h = c.types || [];
            const d = g(b);
            var f = function(a) {
                return c[a] && 1 < c[a].length && b[a]
            };
            const e = b.index + 1;
            var p = a(b, "xAxis");
            const t = a(b, "yAxis");
            var C = {
                seriesNumber: e,
                series: b,
                chart: c
            };
            h = 1 < h.length ? "Combination" : "";
            C = c.langFormat("accessibility.series.summary." + b.type + h, C) || c.langFormat("accessibility.series.summary.default" + h, C);
            f = (f("yAxis") ? " " + t + "." : "") + (f("xAxis") ? " " + p + "." : "");
            p = H(b.options.accessibility && b.options.accessibility.descriptionFormat, c.options.accessibility.series.descriptionFormat, "");
            return G(p, {
                seriesDescription: C,
                authorDescription: d ? " " + d : "",
                axisDescription: f,
                series: b,
                chart: c,
                seriesNumber: e
            }, void 0)
        }
        const {getPointAnnotationTexts: E} = b
          , {getAxisDescription: B, getSeriesFirstPointElement: J, getSeriesA11yElement: I, unhideChartElementFromAT: x} = r
          , {format: G, numberFormat: A} = q
          , {reverseChildNodes: y, stripHTMLTagsFromString: h} = l
          , {find: t, isNumber: p, isString: C, pick: H, defined: K} = m;
        return {
            defaultPointDescriptionFormatter: d,
            defaultSeriesDescriptionFormatter: f,
            describeSeries: function(a) {
                var b = a.chart
                  , c = J(a);
                const d = I(a);
                var p = b.is3d && b.is3d();
                if (d) {
                    d.lastChild !== c || p || y(d);
                    e(a);
                    x(b, d);
                    {
                        p = a.chart;
                        b = p.options.chart;
                        c = 1 < p.series.length;
                        p = p.options.accessibility.series.describeSingleSeries;
                        const h = (a.options.accessibility || {}).exposeAsGroupOnly;
                        b = !(b.options3d && b.options3d.enabled && c) && (c || p || h || v(a))
                    }
                    b ? (b = a.chart.options.accessibility,
                    c = b.landmarkVerbosity,
                    (a.options.accessibility || {}).exposeAsGroupOnly ? d.setAttribute("role", "img") : "all" === c ? d.setAttribute("role", "region") : d.setAttribute("role", "group"),
                    d.setAttribute("tabindex", "-1"),
                    a.chart.styledMode || (d.style.outline = "none"),
                    d.setAttribute("aria-label", h(b.series.descriptionFormatter && b.series.descriptionFormatter(a) || f(a)))) : d.removeAttribute("aria-label")
                }
            }
        }
    });
    x(b, "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/Utils/Announcer.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Components/SeriesComponent/SeriesDescriber.js"]], function(b, r, q, l, m, u) {
        function v(a) {
            const b = a.series.data.filter(b => a.x === b.x && a.y === b.y);
            return 1 === b.length ? b[0] : a
        }
        function z(a, b) {
            const c = (a || []).concat(b || []).reduce( (a, b) => {
                a[b.name + b.index] = b;
                return a
            }
            , {});
            return Object.keys(c).map(a => c[a])
        }
        const {addEvent: n, defined: k} = r
          , {getChartTitle: g} = l
          , {defaultPointDescriptionFormatter: a, defaultSeriesDescriptionFormatter: c} = u;
        class d {
            constructor(a) {
                this.announcer = void 0;
                this.dirty = {
                    allSeries: {}
                };
                this.eventProvider = void 0;
                this.lastAnnouncementTime = 0;
                this.chart = a
            }
            init() {
                const a = this.chart
                  , b = a.options.accessibility.announceNewData.interruptUser ? "assertive" : "polite";
                this.lastAnnouncementTime = 0;
                this.dirty = {
                    allSeries: {}
                };
                this.eventProvider = new m;
                this.announcer = new q(a,b);
                this.addEventListeners()
            }
            destroy() {
                this.eventProvider.removeAddedEvents();
                this.announcer.destroy()
            }
            addEventListeners() {
                const a = this
                  , b = this.chart
                  , c = this.eventProvider;
                c.addEvent(b, "afterApplyDrilldown", function() {
                    a.lastAnnouncementTime = 0
                });
                c.addEvent(b, "afterAddSeries", function(b) {
                    a.onSeriesAdded(b.series)
                });
                c.addEvent(b, "redraw", function() {
                    a.announceDirtyData()
                })
            }
            onSeriesAdded(a) {
                this.chart.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0,
                this.dirty.allSeries[a.name + a.index] = a,
                this.dirty.newSeries = k(this.dirty.newSeries) ? void 0 : a)
            }
            announceDirtyData() {
                const a = this;
                if (this.chart.options.accessibility.announceNewData && this.dirty.hasDirty) {
                    let b = this.dirty.newPoint;
                    b && (b = v(b));
                    this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(b => a.dirty.allSeries[b]), this.dirty.newSeries, b);
                    this.dirty = {
                        allSeries: {}
                    }
                }
            }
            queueAnnouncement(a, b, c) {
                var d = this.chart.options.accessibility.announceNewData;
                if (d.enabled) {
                    const f = +new Date;
                    d = Math.max(0, d.minAnnounceInterval - (f - this.lastAnnouncementTime));
                    a = z(this.queuedAnnouncement && this.queuedAnnouncement.series, a);
                    if (b = this.buildAnnouncementMessage(a, b, c))
                        this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer),
                        this.queuedAnnouncement = {
                            time: f,
                            message: b,
                            series: a
                        },
                        this.queuedAnnouncementTimer = setTimeout( () => {
                            this && this.announcer && (this.lastAnnouncementTime = +new Date,
                            this.announcer.announce(this.queuedAnnouncement.message),
                            delete this.queuedAnnouncement,
                            delete this.queuedAnnouncementTimer)
                        }
                        , d)
                }
            }
            buildAnnouncementMessage(d, f, k) {
                const e = this.chart;
                var n = e.options.accessibility.announceNewData;
                if (n.announcementFormatter && (d = n.announcementFormatter(d, f, k),
                !1 !== d))
                    return d.length ? d : null;
                d = b.charts && 1 < b.charts.length ? "Multiple" : "Single";
                d = f ? "newSeriesAnnounce" + d : k ? "newPointAnnounce" + d : "newDataAnnounce";
                n = g(e);
                return e.langFormat("accessibility.announceNewData." + d, {
                    chartTitle: n,
                    seriesDesc: f ? c(f) : null,
                    pointDesc: k ? a(k) : null,
                    point: k,
                    series: f
                })
            }
        }
        (function(a) {
            function b(a) {
                const b = this.chart
                  , c = this.newDataAnnouncer;
                c && c.chart === b && b.options.accessibility.announceNewData.enabled && (c.dirty.newPoint = k(c.dirty.newPoint) ? void 0 : a.point)
            }
            function c() {
                const a = this.chart
                  , b = this.newDataAnnouncer;
                b && b.chart === a && a.options.accessibility.announceNewData.enabled && (b.dirty.hasDirty = !0,
                b.dirty.allSeries[this.name + this.index] = this)
            }
            a.composedMembers = [];
            a.compose = function(d) {
                r.pushUnique(a.composedMembers, d) && (n(d, "addPoint", b),
                n(d, "updatedData", c))
            }
        }
        )(d || (d = {}));
        return d
    });
    x(b, "Accessibility/ProxyElement.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function(b, r, q, l, m) {
        const {doc: u} = b
          , {attr: v, css: z, merge: n} = r
          , {fireEventOnWrappedOrUnwrappedElement: k} = l
          , {cloneMouseEvent: g, cloneTouchEvent: a, getFakeMouseEvent: c, removeElement: d} = m;
        class e {
            constructor(a, b, c, d) {
                this.chart = a;
                this.target = b;
                this.groupType = c;
                c = "ul" === c;
                this.eventProvider = new q;
                const f = c ? u.createElement("li") : null
                  , e = this.buttonElement = u.createElement("button");
                a.styledMode || this.hideButtonVisually(e);
                f ? (c && !a.styledMode && (f.style.listStyle = "none"),
                f.appendChild(e),
                this.element = f) : this.element = e;
                this.updateTarget(b, d)
            }
            click() {
                var a = this.getTargetPosition();
                a.x += a.width / 2;
                a.y += a.height / 2;
                a = c("click", a);
                k(this.target.click, a)
            }
            updateTarget(a, b) {
                this.target = a;
                this.updateCSSClassName();
                const c = b || {};
                Object.keys(c).forEach(a => {
                    null === c[a] && delete c[a]
                }
                );
                v(this.buttonElement, n({
                    "aria-label": this.getTargetAttr(a.click, "aria-label")
                }, c));
                this.eventProvider.removeAddedEvents();
                this.addProxyEventsToButton(this.buttonElement, a.click);
                this.refreshPosition()
            }
            refreshPosition() {
                const a = this.getTargetPosition();
                z(this.buttonElement, {
                    width: (a.width || 1) + "px",
                    height: (a.height || 1) + "px",
                    left: (Math.round(a.x) || 0) + "px",
                    top: (Math.round(a.y) || 0) + "px"
                })
            }
            remove() {
                this.eventProvider.removeAddedEvents();
                d(this.element)
            }
            updateCSSClassName() {
                var a = this.chart.legend;
                a = a.group && a.group.div;
                a = -1 < (a && a.className || "").indexOf("highcharts-no-tooltip");
                const b = -1 < (this.getTargetAttr(this.target.click, "class") || "").indexOf("highcharts-no-tooltip");
                this.buttonElement.className = a || b ? "highcharts-a11y-proxy-button highcharts-no-tooltip" : "highcharts-a11y-proxy-button"
            }
            addProxyEventsToButton(b, c) {
                "click touchstart touchend touchcancel touchmove mouseover mouseenter mouseleave mouseout".split(" ").forEach(d => {
                    const f = 0 === d.indexOf("touch");
                    this.eventProvider.addEvent(b, d, b => {
                        const d = f ? a(b) : g(b);
                        c && k(c, d);
                        b.stopPropagation();
                        f || b.preventDefault()
                    }
                    , {
                        passive: !1
                    })
                }
                )
            }
            hideButtonVisually(a) {
                z(a, {
                    borderWidth: 0,
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    outline: "none",
                    opacity: .001,
                    filter: "alpha(opacity=1)",
                    zIndex: 999,
                    overflow: "hidden",
                    padding: 0,
                    margin: 0,
                    display: "block",
                    position: "absolute",
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)"
                })
            }
            getTargetPosition() {
                var a = this.target.click;
                a = a.element ? a.element : a;
                a = this.target.visual || a;
                if (this.chart.renderTo && a && a.getBoundingClientRect) {
                    a = a.getBoundingClientRect();
                    const b = this.chart.pointer.getChartPosition();
                    return {
                        x: (a.left - b.left) / b.scaleX,
                        y: (a.top - b.top) / b.scaleY,
                        width: a.right / b.scaleX - a.left / b.scaleX,
                        height: a.bottom / b.scaleY - a.top / b.scaleY
                    }
                }
                return {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1
                }
            }
            getTargetAttr(a, b) {
                return a.element ? a.element.getAttribute(b) : a.getAttribute(b)
            }
        }
        return e
    });
    x(b, "Accessibility/ProxyProvider.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/DOMElementProvider.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/ProxyElement.js"]], function(b, r, q, l, m, u) {
        const {doc: v} = b
          , {attr: z, css: n} = r
          , {unhideChartElementFromAT: k} = q
          , {removeElement: g, removeChildNodes: a} = m;
        class c {
            constructor(a) {
                this.chart = a;
                this.domElementProvider = new l;
                this.groups = {};
                this.groupOrder = [];
                this.beforeChartProxyPosContainer = this.createProxyPosContainer("before");
                this.afterChartProxyPosContainer = this.createProxyPosContainer("after");
                this.update()
            }
            addProxyElement(a, b, c) {
                const d = this.groups[a];
                if (!d)
                    throw Error("ProxyProvider.addProxyElement: Invalid group key " + a);
                a = new u(this.chart,b,d.type,c);
                d.proxyContainerElement.appendChild(a.element);
                d.proxyElements.push(a);
                return a
            }
            addGroup(a, b, c) {
                var d = this.groups[a];
                if (d)
                    return d.groupElement;
                d = this.domElementProvider.createElement(b);
                let e;
                c && c.role && "div" !== b ? (e = this.domElementProvider.createElement("div"),
                e.appendChild(d)) : e = d;
                e.className = "highcharts-a11y-proxy-group highcharts-a11y-proxy-group-" + a.replace(/\W/g, "-");
                this.groups[a] = {
                    proxyContainerElement: d,
                    groupElement: e,
                    type: b,
                    proxyElements: []
                };
                z(e, c || {});
                "ul" === b && d.setAttribute("role", "list");
                this.afterChartProxyPosContainer.appendChild(e);
                this.updateGroupOrder(this.groupOrder);
                return e
            }
            updateGroupAttrs(a, b) {
                const c = this.groups[a];
                if (!c)
                    throw Error("ProxyProvider.updateGroupAttrs: Invalid group key " + a);
                z(c.groupElement, b)
            }
            updateGroupOrder(b) {
                this.groupOrder = b.slice();
                if (!this.isDOMOrderGroupOrder()) {
                    var c = b.indexOf("series")
                      , d = -1 < c ? b.slice(0, c) : b
                      , g = -1 < c ? b.slice(c + 1) : [];
                    b = v.activeElement;
                    ["before", "after"].forEach(b => {
                        const c = this["before" === b ? "beforeChartProxyPosContainer" : "afterChartProxyPosContainer"];
                        b = "before" === b ? d : g;
                        a(c);
                        b.forEach(a => {
                            (a = this.groups[a]) && c.appendChild(a.groupElement)
                        }
                        )
                    }
                    );
                    (this.beforeChartProxyPosContainer.contains(b) || this.afterChartProxyPosContainer.contains(b)) && b && b.focus && b.focus()
                }
            }
            clearGroup(b) {
                const c = this.groups[b];
                if (!c)
                    throw Error("ProxyProvider.clearGroup: Invalid group key " + b);
                a(c.proxyContainerElement)
            }
            removeGroup(a) {
                const b = this.groups[a];
                b && (g(b.groupElement),
                delete this.groups[a])
            }
            update() {
                this.updatePosContainerPositions();
                this.updateGroupOrder(this.groupOrder);
                this.updateProxyElementPositions()
            }
            updateProxyElementPositions() {
                Object.keys(this.groups).forEach(this.updateGroupProxyElementPositions.bind(this))
            }
            updateGroupProxyElementPositions(a) {
                (a = this.groups[a]) && a.proxyElements.forEach(a => a.refreshPosition())
            }
            destroy() {
                this.domElementProvider.destroyCreatedElements()
            }
            createProxyPosContainer(a) {
                const b = this.domElementProvider.createElement("div");
                b.setAttribute("aria-hidden", "false");
                b.className = "highcharts-a11y-proxy-container" + (a ? "-" + a : "");
                n(b, {
                    top: "0",
                    left: "0"
                });
                this.chart.styledMode || (b.style.whiteSpace = "nowrap",
                b.style.position = "absolute");
                return b
            }
            getCurrentGroupOrderInDOM() {
                const a = a => {
                    const b = Object.keys(this.groups);
                    let c = b.length;
                    for (; c--; ) {
                        const d = b[c]
                          , e = this.groups[d];
                        if (e && a === e.groupElement)
                            return d
                    }
                }
                ;
                var b = b => {
                    const c = [];
                    b = b.children;
                    for (let d = 0; d < b.length; ++d) {
                        const e = a(b[d]);
                        e && c.push(e)
                    }
                    return c
                }
                ;
                const c = b(this.beforeChartProxyPosContainer);
                b = b(this.afterChartProxyPosContainer);
                c.push("series");
                return c.concat(b)
            }
            isDOMOrderGroupOrder() {
                const a = this.getCurrentGroupOrderInDOM()
                  , b = this.groupOrder.filter(a => "series" === a || !!this.groups[a]);
                let c = a.length;
                if (c !== b.length)
                    return !1;
                for (; c--; )
                    if (a[c] !== b[c])
                        return !1;
                return !0
            }
            updatePosContainerPositions() {
                const a = this.chart;
                if (!a.renderer.forExport) {
                    var b = a.renderer.box;
                    a.container.insertBefore(this.afterChartProxyPosContainer, b.nextSibling);
                    a.container.insertBefore(this.beforeChartProxyPosContainer, b);
                    k(this.chart, this.afterChartProxyPosContainer);
                    k(this.chart, this.beforeChartProxyPosContainer)
                }
            }
        }
        return c
    });
    x(b, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function() {
        return {
            lang: {
                rangeSelectorZoom: "Zoom",
                rangeSelectorFrom: "",
                rangeSelectorTo: "\u2192"
            },
            rangeSelector: {
                allButtonsEnabled: !1,
                buttons: void 0,
                buttonSpacing: 5,
                dropdown: "responsive",
                enabled: void 0,
                verticalAlign: "top",
                buttonTheme: {
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputBoxBorderColor: "none",
                inputBoxHeight: 17,
                inputBoxWidth: void 0,
                inputDateFormat: "%e %b %Y",
                inputDateParser: void 0,
                inputEditDateFormat: "%Y-%m-%d",
                inputEnabled: !0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                inputSpacing: 5,
                selected: void 0,
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                inputStyle: {
                    color: "#334eff",
                    cursor: "pointer",
                    fontSize: "0.8em"
                },
                labelStyle: {
                    color: "#666666",
                    fontSize: "0.8em"
                }
            }
        }
    });
    x(b, "Stock/RangeSelector/RangeSelectorComposition.js", [b["Core/Defaults.js"], b["Stock/RangeSelector/RangeSelectorDefaults.js"], b["Core/Utilities.js"]], function(b, r, q) {
        function l() {
            const a = this.range
              , b = a.type
              , c = this.max
              , d = this.chart.time
              , e = function(a, c) {
                const h = "year" === b ? "FullYear" : "Month"
                  , p = new d.Date(a)
                  , t = d.get(h, p);
                d.set(h, p, t + c);
                t === d.get(h, p) && d.set("Date", p, 0);
                return p.getTime() - a
            };
            let f, g;
            B(a) ? (f = c - a,
            g = a) : a && (f = c + e(c, -(a.count || 1)),
            this.chart && (this.chart.fixedRange = c - f));
            const w = I(this.dataMin, Number.MIN_VALUE);
            B(f) || (f = w);
            f <= w && (f = w,
            "undefined" === typeof g && (g = e(f, a.count)),
            this.newMax = Math.min(f + g, I(this.dataMax, Number.MAX_VALUE)));
            B(c) ? !B(a) && a && a._offsetMin && (f += a._offsetMin) : f = void 0;
            return f
        }
        function m() {
            this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new A(this))
        }
        function u() {
            var a = this.axes;
            const b = this.rangeSelector;
            b && (B(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick),
            delete b.deferredYTDClick),
            a.forEach(a => {
                a.updateNames();
                a.setScale()
            }
            ),
            this.getAxisMargins(),
            b.render(),
            a = b.options.verticalAlign,
            b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
        }
        function v(a) {
            let b, c, p, f;
            const e = a.rangeSelector
              , g = () => {
                e && (b = a.xAxis[0].getExtremes(),
                c = a.legend,
                f = e && e.options.verticalAlign,
                B(b.min) && e.render(b.min, b.max),
                c.display && "top" === f && f === c.options.verticalAlign && (p = x(a.spacingBox),
                p.y = "vertical" === c.options.layout ? a.plotTop : p.y + e.getHeight(),
                c.group.placed = !1,
                c.align(p)))
            }
            ;
            e && (E(F, b => b[0] === a) || F.push([a, [d(a.xAxis[0], "afterSetExtremes", function(a) {
                e && e.render(a.min, a.max)
            }), d(a, "redraw", g)]]),
            g())
        }
        function z() {
            for (let a = 0, b = F.length; a < b; ++a) {
                const b = F[a];
                if (b[0] === this) {
                    b[1].forEach(a => a());
                    F.splice(a, 1);
                    break
                }
            }
        }
        function n() {
            var a = this.rangeSelector;
            a && (a = a.getHeight(),
            this.extraTopMargin && (this.plotTop += a),
            this.extraBottomMargin && (this.marginBottom += a))
        }
        function k() {
            var a = this.rangeSelector;
            a && !a.options.floating && (a.render(),
            a = a.options.verticalAlign,
            "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
        }
        function g(a) {
            var b = a.options.rangeSelector;
            a = this.extraBottomMargin;
            const c = this.extraTopMargin;
            let d = this.rangeSelector;
            b && b.enabled && !e(d) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0,
            this.rangeSelector = d = new A(this));
            this.extraTopMargin = this.extraBottomMargin = !1;
            d && (v(this),
            b = b && b.verticalAlign || d.options && d.options.verticalAlign,
            d.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)),
            this.extraBottomMargin !== a || this.extraTopMargin !== c) && (this.isDirtyBox = !0)
        }
        const {defaultOptions: a, setOptions: c} = b
          , {addEvent: d, defined: e, extend: f, find: E, isNumber: B, merge: x, pick: I} = q
          , F = []
          , G = [];
        let A;
        return {
            compose: function(b, h, e) {
                A = e;
                q.pushUnique(G, b) && (b.prototype.minFromRange = l);
                q.pushUnique(G, h) && (d(h, "afterGetContainer", m),
                d(h, "beforeRender", u),
                d(h, "destroy", z),
                d(h, "getMargins", n),
                d(h, "render", k),
                d(h, "update", g),
                h.prototype.callbacks.push(v));
                q.pushUnique(G, c) && (f(a, {
                    rangeSelector: r.rangeSelector
                }),
                f(a.lang, r.lang))
            }
        }
    });
    x(b, "Stock/RangeSelector/RangeSelector.js", [b["Core/Axis/Axis.js"], b["Core/Defaults.js"], b["Core/Globals.js"], b["Stock/RangeSelector/RangeSelectorComposition.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function(b, r, q, l, m, u) {
        function v(a) {
            if (-1 !== a.indexOf("%L"))
                return "text";
            const b = "aAdewbBmoyY".split("").some(b => -1 !== a.indexOf("%" + b))
              , c = "HkIlMS".split("").some(b => -1 !== a.indexOf("%" + b));
            return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text"
        }
        const {defaultOptions: z} = r
          , {addEvent: n, createElement: k, css: g, defined: a, destroyObjectProperties: c, discardElement: d, extend: e, fireEvent: f, isNumber: E, merge: B, objectEach: x, pad: I, pick: F, pInt: G, splat: A} = u;
        class y {
            static compose(a, b) {
                l.compose(a, b, y)
            }
            constructor(a) {
                this.buttons = void 0;
                this.buttonOptions = y.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.options = void 0;
                this.chart = a;
                this.init(a)
            }
            clickButton(c, d) {
                const h = this.chart
                  , e = this.buttonOptions[c]
                  , t = h.xAxis[0];
                var g = h.scroller && h.scroller.getUnionExtremes() || t || {}
                  , w = e.type;
                const k = e.dataGrouping;
                let y = g.dataMin, m = g.dataMax, q, D = t && Math.round(Math.min(t.max, F(m, t.max))), l;
                g = e._range;
                let r, u, v, z = !0;
                if (null !== y && null !== m) {
                    h.fixedRange = g;
                    this.setSelected(c);
                    k && (this.forcedDataGrouping = !0,
                    b.prototype.setDataGrouping.call(t || {
                        chart: this.chart
                    }, k, !1),
                    this.frozenStates = e.preserveDataGrouping);
                    if ("month" === w || "year" === w)
                        t ? (w = {
                            range: e,
                            max: D,
                            chart: h,
                            dataMin: y,
                            dataMax: m
                        },
                        q = t.minFromRange.call(w),
                        E(w.newMax) && (D = w.newMax),
                        z = !1) : g = e;
                    else if (g)
                        q = Math.max(D - g, y),
                        D = Math.min(q + g, m),
                        z = !1;
                    else if ("ytd" === w)
                        if (t) {
                            if ("undefined" === typeof m || "undefined" === typeof y)
                                y = Number.MAX_VALUE,
                                m = Number.MIN_VALUE,
                                h.series.forEach(a => {
                                    if (a = a.xData)
                                        y = Math.min(a[0], y),
                                        m = Math.max(a[a.length - 1], m)
                                }
                                ),
                                d = !1;
                            w = this.getYTDExtremes(m, y, h.time.useUTC);
                            q = r = w.min;
                            D = w.max
                        } else {
                            this.deferredYTDClick = c;
                            return
                        }
                    else
                        "all" === w && t && (h.navigator && h.navigator.baseSeries[0] && (h.navigator.baseSeries[0].xAxis.options.range = void 0),
                        q = y,
                        D = m);
                    z && e._offsetMin && a(q) && (q += e._offsetMin);
                    e._offsetMax && a(D) && (D += e._offsetMax);
                    this.dropdown && (this.dropdown.selectedIndex = c + 1);
                    t ? t.setExtremes(q, D, F(d, !0), void 0, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: e
                    }) : (l = A(h.options.xAxis)[0],
                    v = l.range,
                    l.range = g,
                    u = l.min,
                    l.min = r,
                    n(h, "load", function() {
                        l.range = v;
                        l.min = u
                    }));
                    f(this, "afterBtnClick")
                }
            }
            setSelected(a) {
                this.selected = this.options.selected = a
            }
            init(a) {
                const b = this
                  , c = a.options.rangeSelector
                  , d = c.buttons || b.defaultButtons.slice()
                  , h = c.selected
                  , e = function() {
                    const a = b.minInput
                      , c = b.maxInput;
                    a && a.blur && f(a, "blur");
                    c && c.blur && f(c, "blur")
                };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = d;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(n(a.container, "mousedown", e));
                this.eventsToUnbind.push(n(a, "resize", e));
                d.forEach(b.computeButtonRange);
                "undefined" !== typeof h && d[h] && this.clickButton(h, !1);
                this.eventsToUnbind.push(n(a, "load", function() {
                    a.xAxis && a.xAxis[0] && n(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                }))
            }
            updateButtonStates() {
                const a = this;
                var b = this.chart;
                const c = this.dropdown
                  , d = b.xAxis[0]
                  , e = Math.round(d.max - d.min)
                  , f = !d.hasVisibleSeries
                  , g = b.scroller && b.scroller.getUnionExtremes() || d
                  , k = g.dataMin
                  , n = g.dataMax;
                b = a.getYTDExtremes(n, k, b.time.useUTC);
                const y = b.min
                  , m = b.max
                  , D = a.selected
                  , A = a.options.allButtonsEnabled
                  , q = a.buttons;
                let l = E(D);
                a.buttonOptions.forEach( (b, h) => {
                    var p = b._range
                      , t = b.type
                      , g = b.count || 1;
                    const C = q[h]
                      , w = b._offsetMax - b._offsetMin
                      , H = h === D
                      , K = p > n - k
                      , M = p < d.minRange;
                    b = 0;
                    let r = !1
                      , u = !1;
                    p = p === e;
                    ("month" === t || "year" === t) && e + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[t] * g - w && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[t] * g + w ? p = !0 : "ytd" === t ? (p = m - y + w === e,
                    r = !H) : "all" === t && (p = d.max - d.min >= n - k,
                    u = !H && l && p);
                    t = !A && (K || M || u || f);
                    g = H && p || p && !l && !r || H && a.frozenStates;
                    t ? b = 3 : g && (l = !0,
                    b = 2);
                    C.state !== b && (C.setState(b),
                    c && (c.options[h + 1].disabled = t,
                    2 === b && (c.selectedIndex = h + 1)),
                    0 === b && D === h && a.setSelected())
                }
                )
            }
            computeButtonRange(a) {
                const b = a.type
                  , c = a.count || 1
                  , d = {
                    millisecond: 1,
                    second: 1E3,
                    minute: 6E4,
                    hour: 36E5,
                    day: 864E5,
                    week: 6048E5
                };
                if (d[b])
                    a._range = d[b] * c;
                else if ("month" === b || "year" === b)
                    a._range = 864E5 * {
                        month: 30,
                        year: 365
                    }[b] * c;
                a._offsetMin = F(a.offsetMin, 0);
                a._offsetMax = F(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            }
            getInputValue(a) {
                a = "min" === a ? this.minInput : this.maxInput;
                const b = this.chart.options.rangeSelector
                  , c = this.chart.time;
                return a ? ("text" === a.type && b.inputDateParser || this.defaultInputDateParser)(a.value, c.useUTC, c) : 0
            }
            setInputValue(b, c) {
                const d = this.options
                  , h = this.chart.time
                  , e = "min" === b ? this.minInput : this.maxInput;
                b = "min" === b ? this.minDateBox : this.maxDateBox;
                if (e) {
                    var f = e.getAttribute("data-hc-time");
                    f = a(f) ? Number(f) : void 0;
                    a(c) && (a(f) && e.setAttribute("data-hc-time-previous", f),
                    e.setAttribute("data-hc-time", c),
                    f = c);
                    e.value = h.dateFormat(this.inputTypeFormats[e.type] || d.inputEditDateFormat, f);
                    b && b.attr({
                        text: h.dateFormat(d.inputDateFormat, f)
                    })
                }
            }
            setInputExtremes(a, b, c) {
                if (a = "min" === a ? this.minInput : this.maxInput) {
                    const d = this.inputTypeFormats[a.type]
                      , h = this.chart.time;
                    d && (b = h.dateFormat(d, b),
                    a.min !== b && (a.min = b),
                    c = h.dateFormat(d, c),
                    a.max !== c && (a.max = c))
                }
            }
            showInput(a) {
                const b = "min" === a ? this.minDateBox : this.maxDateBox;
                if ((a = "min" === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
                    const c = "text" === a.type
                      , {translateX: d, translateY: h} = this.inputGroup
                      , {inputBoxWidth: e} = this.options;
                    g(a, {
                        width: c ? b.width + (e ? -2 : 20) + "px" : "auto",
                        height: b.height - 2 + "px",
                        border: "2px solid silver"
                    });
                    c && e ? g(a, {
                        left: d + b.x + "px",
                        top: h + "px"
                    }) : g(a, {
                        left: Math.min(Math.round(b.x + d - (a.offsetWidth - b.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
                        top: h - (a.offsetHeight - b.height) / 2 + "px"
                    })
                }
            }
            hideInput(a) {
                (a = "min" === a ? this.minInput : this.maxInput) && g(a, {
                    top: "-9999em",
                    border: 0,
                    width: "1px",
                    height: "1px"
                })
            }
            defaultInputDateParser(a, b, c) {
                var d = a.split("/").join("-").split(" ").join("T");
                -1 === d.indexOf("T") && (d += "T00:00");
                if (b)
                    d += "Z";
                else {
                    var h;
                    if (h = q.isSafari)
                        h = d,
                        h = !(6 < h.length && (h.lastIndexOf("-") === h.length - 6 || h.lastIndexOf("+") === h.length - 6));
                    h && (h = (new Date(d)).getTimezoneOffset() / 60,
                    d += 0 >= h ? `+${I(-h)}:00` : `-${I(h)}:00`)
                }
                d = Date.parse(d);
                E(d) || (a = a.split("-"),
                d = Date.UTC(G(a[0]), G(a[1]) - 1, G(a[2])));
                c && b && E(d) && (d += c.getTimezoneOffset(d));
                return d
            }
            drawInput(a) {
                function b() {
                    const {maxInput: b, minInput: d} = f
                      , h = c.xAxis[0];
                    var e = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : h;
                    const p = e.dataMin;
                    e = e.dataMax;
                    let g = f.getInputValue(a);
                    g !== Number(D.getAttribute("data-hc-time-previous")) && E(g) && (D.setAttribute("data-hc-time-previous", g),
                    m && b && E(p) ? g > Number(b.getAttribute("data-hc-time")) ? g = void 0 : g < p && (g = p) : d && E(e) && (g < Number(d.getAttribute("data-hc-time")) ? g = void 0 : g > e && (g = e)),
                    "undefined" !== typeof g && h.setExtremes(m ? g : h.min, m ? h.max : g, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    }))
                }
                const {chart: c, div: d, inputGroup: h} = this
                  , f = this
                  , w = c.renderer.style || {};
                var n = c.renderer;
                const y = c.options.rangeSelector
                  , m = "min" === a;
                var A = z.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
                A = n.label(A, 0).addClass("highcharts-range-label").attr({
                    padding: A ? 2 : 0,
                    height: A ? y.inputBoxHeight : 0
                }).add(h);
                n = n.label("", 0).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: y.inputBoxWidth,
                    height: y.inputBoxHeight,
                    "text-align": "center"
                }).on("click", function() {
                    f.showInput(a);
                    f[a + "Input"].focus()
                });
                c.styledMode || n.attr({
                    stroke: y.inputBoxBorderColor,
                    "stroke-width": 1
                });
                n.add(h);
                const D = k("input", {
                    name: a,
                    className: "highcharts-range-selector"
                }, void 0, d);
                D.setAttribute("type", v(y.inputDateFormat || "%e %b %Y"));
                c.styledMode || (A.css(B(w, y.labelStyle)),
                n.css(B({
                    color: "#333333"
                }, w, y.inputStyle)),
                g(D, e({
                    position: "absolute",
                    border: 0,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: w.fontSize,
                    fontFamily: w.fontFamily,
                    top: "-9999em"
                }, y.inputStyle)));
                D.onfocus = () => {
                    f.showInput(a)
                }
                ;
                D.onblur = () => {
                    D === q.doc.activeElement && b();
                    f.hideInput(a);
                    f.setInputValue(a);
                    D.blur()
                }
                ;
                let l = !1;
                D.onchange = () => {
                    l || (b(),
                    f.hideInput(a),
                    D.blur())
                }
                ;
                D.onkeypress = a => {
                    13 === a.keyCode && b()
                }
                ;
                D.onkeydown = a => {
                    l = !0;
                    38 !== a.keyCode && 40 !== a.keyCode || b()
                }
                ;
                D.onkeyup = () => {
                    l = !1
                }
                ;
                return {
                    dateBox: n,
                    input: D,
                    label: A
                }
            }
            getPosition() {
                var a = this.chart;
                const b = a.options.rangeSelector;
                a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10
                }
            }
            getYTDExtremes(a, b, c) {
                const d = this.chart.time;
                var e = new d.Date(a);
                const h = d.get("FullYear", e);
                c = c ? d.Date.UTC(h, 0, 1) : +new d.Date(h,0,1);
                b = Math.max(b, c);
                e = e.getTime();
                return {
                    max: Math.min(a || e, e),
                    min: b
                }
            }
            render(b, c) {
                var d = this.chart
                  , e = d.renderer;
                const h = d.container;
                var f = d.options;
                const g = f.rangeSelector
                  , t = F(f.chart.style && f.chart.style.zIndex, 0) + 1;
                f = g.inputEnabled;
                if (!1 !== g.enabled) {
                    this.rendered || (this.group = e.g("range-selector-group").attr({
                        zIndex: 7
                    }).add(),
                    this.div = k("div", void 0, {
                        position: "relative",
                        height: 0,
                        zIndex: t
                    }),
                    this.buttonOptions.length && this.renderButtons(),
                    h.parentNode && h.parentNode.insertBefore(this.div, h),
                    f && (this.inputGroup = e.g("input-group").add(this.group),
                    e = this.drawInput("min"),
                    this.minDateBox = e.dateBox,
                    this.minLabel = e.label,
                    this.minInput = e.input,
                    e = this.drawInput("max"),
                    this.maxDateBox = e.dateBox,
                    this.maxLabel = e.label,
                    this.maxInput = e.input));
                    if (f && (this.setInputValue("min", b),
                    this.setInputValue("max", c),
                    b = d.scroller && d.scroller.getUnionExtremes() || d.xAxis[0] || {},
                    a(b.dataMin) && a(b.dataMax) && (d = d.xAxis[0].minRange || 0,
                    this.setInputExtremes("min", b.dataMin, Math.min(b.dataMax, this.getInputValue("max")) - d),
                    this.setInputExtremes("max", Math.max(b.dataMin, this.getInputValue("min")) + d, b.dataMax)),
                    this.inputGroup)) {
                        let a = 0;
                        [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(b => {
                            if (b) {
                                const {width: c} = b.getBBox();
                                c && (b.attr({
                                    x: a
                                }),
                                a += c + g.inputSpacing)
                            }
                        }
                        )
                    }
                    this.alignElements();
                    this.rendered = !0
                }
            }
            renderButtons() {
                const {buttons: a, chart: b, options: c} = this
                  , d = z.lang
                  , e = b.renderer
                  , g = B(c.buttonTheme)
                  , w = g && g.states
                  , y = g.width || 28;
                delete g.width;
                delete g.states;
                this.buttonGroup = e.g("range-selector-buttons").add(this.group);
                const m = this.dropdown = k("select", void 0, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    border: 0,
                    top: "-9999em",
                    cursor: "pointer",
                    opacity: .0001
                }, this.div);
                n(m, "touchstart", () => {
                    m.style.fontSize = "16px"
                }
                );
                [[q.isMS ? "mouseover" : "mouseenter"], [q.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach( ([b,c]) => {
                    n(m, b, () => {
                        const d = a[this.currentButtonIndex()];
                        d && f(d.element, c || b)
                    }
                    )
                }
                );
                this.zoomText = e.label(d && d.rangeSelectorZoom || "", 0).attr({
                    padding: c.buttonTheme.padding,
                    height: c.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0
                }).add(this.buttonGroup);
                this.chart.styledMode || (this.zoomText.css(c.labelStyle),
                g["stroke-width"] = F(g["stroke-width"], 0));
                k("option", {
                    textContent: this.zoomText.textStr,
                    disabled: !0
                }, void 0, m);
                this.buttonOptions.forEach( (b, c) => {
                    k("option", {
                        textContent: b.title || b.text
                    }, void 0, m);
                    a[c] = e.button(b.text, 0, 0, a => {
                        const d = b.events && b.events.click;
                        let e;
                        d && (e = d.call(b, a));
                        !1 !== e && this.clickButton(c);
                        this.isActive = !0
                    }
                    , g, w && w.hover, w && w.select, w && w.disabled).attr({
                        "text-align": "center",
                        width: y
                    }).add(this.buttonGroup);
                    b.title && a[c].attr("title", b.title)
                }
                )
            }
            alignElements() {
                const {buttonGroup: a, buttons: b, chart: c, group: d, inputGroup: e, options: f, zoomText: g} = this;
                var k = c.options;
                const n = k.exporting && !1 !== k.exporting.enabled && k.navigation && k.navigation.buttonOptions
                  , {buttonPosition: y, inputPosition: m, verticalAlign: A} = f;
                k = (a, b) => n && this.titleCollision(c) && "top" === A && "right" === b.align && b.y - a.getBBox().height - 12 < (n.y || 0) + (n.height || 0) + c.spacing[0] ? -40 : 0;
                var q = c.plotLeft;
                if (d && y && m) {
                    var l = y.x - c.spacing[3];
                    if (a) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            let a = 0;
                            g && (a += g.getBBox().width + 5);
                            b.forEach( (c, d) => {
                                a += c.width;
                                d !== b.length - 1 && (a += f.buttonSpacing)
                            }
                            );
                            this.initialButtonGroupWidth = a
                        }
                        q -= c.spacing[3];
                        this.updateButtonStates();
                        var r = k(a, y);
                        this.alignButtonGroup(r);
                        d.placed = a.placed = c.hasLoaded
                    }
                    r = 0;
                    e && (r = k(e, m),
                    "left" === m.align ? l = q : "right" === m.align && (l = -Math.max(c.axisOffset[1], -r)),
                    e.align({
                        y: m.y,
                        width: e.getBBox().width,
                        align: m.align,
                        x: m.x + l - 2
                    }, !0, c.spacingBox),
                    e.placed = c.hasLoaded);
                    this.handleCollision(r);
                    d.align({
                        verticalAlign: A
                    }, !0, c.spacingBox);
                    k = d.alignAttr.translateY;
                    q = d.getBBox().height + 20;
                    l = 0;
                    "bottom" === A && (l = (l = c.legend && c.legend.options) && "bottom" === l.verticalAlign && l.enabled && !l.floating ? c.legend.legendHeight + F(l.margin, 10) : 0,
                    q = q + l - 20,
                    l = k - q - (f.floating ? 0 : f.y) - (c.titleOffset ? c.titleOffset[2] : 0) - 10);
                    if ("top" === A)
                        f.floating && (l = 0),
                        c.titleOffset && c.titleOffset[0] && (l = c.titleOffset[0]),
                        l += c.margin[0] - c.spacing[0] || 0;
                    else if ("middle" === A)
                        if (m.y === y.y)
                            l = k;
                        else if (m.y || y.y)
                            l = 0 > m.y || 0 > y.y ? l - Math.min(m.y, y.y) : k - q;
                    d.translate(f.x, f.y + Math.floor(l));
                    const {minInput: h, maxInput: p, dropdown: t} = this;
                    f.inputEnabled && h && p && (h.style.marginTop = d.translateY + "px",
                    p.style.marginTop = d.translateY + "px");
                    t && (t.style.marginTop = d.translateY + "px")
                }
            }
            alignButtonGroup(a, b) {
                const {chart: c, options: d, buttonGroup: e} = this
                  , {buttonPosition: f} = d
                  , h = c.plotLeft - c.spacing[3];
                let g = f.x - c.spacing[3];
                "right" === f.align ? g += a - h : "center" === f.align && (g -= h / 2);
                e && e.align({
                    y: f.y,
                    width: F(b, this.initialButtonGroupWidth),
                    align: f.align,
                    x: g
                }, !0, c.spacingBox)
            }
            positionButtons() {
                const {buttons: a, chart: b, options: c, zoomText: d} = this
                  , e = b.hasLoaded ? "animate" : "attr"
                  , {buttonPosition: f} = c
                  , g = b.plotLeft;
                let k = g;
                d && "hidden" !== d.visibility && (d[e]({
                    x: F(g + f.x, g)
                }),
                k += f.x + d.getBBox().width + 5);
                for (let b = 0, d = this.buttonOptions.length; b < d; ++b)
                    if ("hidden" !== a[b].visibility)
                        a[b][e]({
                            x: k
                        }),
                        k += a[b].width + c.buttonSpacing;
                    else
                        a[b][e]({
                            x: g
                        })
            }
            handleCollision(a) {
                const {chart: b, buttonGroup: c, inputGroup: d} = this
                  , {buttonPosition: e, dropdown: f, inputPosition: h} = this.options
                  , g = () => {
                    let a = 0;
                    this.buttons.forEach(b => {
                        b = b.getBBox();
                        b.width > a && (a = b.width)
                    }
                    );
                    return a
                }
                  , k = b => {
                    if (d && c) {
                        const f = d.alignAttr.translateX + d.alignOptions.x - a + d.getBBox().x + 2
                          , g = d.alignOptions.width
                          , k = c.alignAttr.translateX + c.getBBox().x;
                        return k + b > f && f + g > k && e.y < h.y + d.getBBox().height
                    }
                    return !1
                }
                  , n = () => {
                    d && c && d.attr({
                        translateX: d.alignAttr.translateX + (b.axisOffset[1] >= -a ? 0 : -a),
                        translateY: d.alignAttr.translateY + c.getBBox().height + 10
                    })
                }
                ;
                if (c) {
                    if ("always" === f) {
                        this.collapseButtons(a);
                        k(g()) && n();
                        return
                    }
                    "never" === f && this.expandButtons()
                }
                d && c ? h.align === e.align || k(this.initialButtonGroupWidth + 20) ? "responsive" === f ? (this.collapseButtons(a),
                k(g()) && n()) : n() : "responsive" === f && this.expandButtons() : c && "responsive" === f && (this.initialButtonGroupWidth > b.plotWidth ? this.collapseButtons(a) : this.expandButtons())
            }
            collapseButtons(a) {
                const {buttons: b, buttonOptions: c, chart: d, dropdown: e, options: f, zoomText: h} = this
                  , g = d.userOptions.rangeSelector && d.userOptions.rangeSelector.buttonTheme || {}
                  , k = a => ({
                    text: a ? `${a} \u25be` : "\u25be",
                    width: "auto",
                    paddingLeft: F(f.buttonTheme.paddingLeft, g.padding, 8),
                    paddingRight: F(f.buttonTheme.paddingRight, g.padding, 8)
                });
                h && h.hide();
                let n = !1;
                c.forEach( (a, c) => {
                    c = b[c];
                    2 !== c.state ? c.hide() : (c.show(),
                    c.attr(k(a.text)),
                    n = !0)
                }
                );
                n || (e && (e.selectedIndex = 0),
                b[0].show(),
                b[0].attr(k(this.zoomText && this.zoomText.textStr)));
                const {align: m} = f.buttonPosition;
                this.positionButtons();
                "right" !== m && "center" !== m || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                this.showDropdown()
            }
            expandButtons() {
                const {buttons: a, buttonOptions: b, options: c, zoomText: d} = this;
                this.hideDropdown();
                d && d.show();
                b.forEach( (b, d) => {
                    d = a[d];
                    d.show();
                    d.attr({
                        text: b.text,
                        width: c.buttonTheme.width || 28,
                        paddingLeft: F(c.buttonTheme.paddingLeft, "unset"),
                        paddingRight: F(c.buttonTheme.paddingRight, "unset")
                    });
                    2 > d.state && d.setState(0)
                }
                );
                this.positionButtons()
            }
            currentButtonIndex() {
                const {dropdown: a} = this;
                return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
            }
            showDropdown() {
                const {buttonGroup: a, buttons: b, chart: c, dropdown: d} = this;
                if (a && d) {
                    const {translateX: e, translateY: f} = a
                      , h = b[this.currentButtonIndex()].getBBox();
                    g(d, {
                        left: c.plotLeft + e + "px",
                        top: f + .5 + "px",
                        width: h.width + "px",
                        height: h.height + "px"
                    });
                    this.hasVisibleDropdown = !0
                }
            }
            hideDropdown() {
                const {dropdown: a} = this;
                a && (g(a, {
                    top: "-9999em",
                    width: "1px",
                    height: "1px"
                }),
                this.hasVisibleDropdown = !1)
            }
            getHeight() {
                var a = this.options
                  , b = this.group;
                const c = a.y
                  , d = a.buttonPosition.y
                  , e = a.inputPosition.y;
                if (a.height)
                    return a.height;
                this.alignElements();
                a = b ? b.getBBox(!0).height + 13 + c : 0;
                b = Math.min(e, d);
                if (0 > e && 0 > d || 0 < e && 0 < d)
                    a += Math.abs(b);
                return a
            }
            titleCollision(a) {
                return !(a.options.title.text || a.options.subtitle.text)
            }
            update(a) {
                const b = this.chart;
                B(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                this.render()
            }
            destroy() {
                const a = this
                  , b = a.minInput
                  , e = a.maxInput;
                a.eventsToUnbind && (a.eventsToUnbind.forEach(a => a()),
                a.eventsToUnbind = void 0);
                c(a.buttons);
                b && (b.onfocus = b.onblur = b.onchange = null);
                e && (e.onfocus = e.onblur = e.onchange = null);
                x(a, function(b, c) {
                    b && "chart" !== c && (b instanceof m ? b.destroy() : b instanceof window.HTMLElement && d(b));
                    b !== y.prototype[c] && (a[c] = null)
                }, this)
            }
        }
        e(y.prototype, {
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m",
                title: "View 1 month"
            }, {
                type: "month",
                count: 3,
                text: "3m",
                title: "View 3 months"
            }, {
                type: "month",
                count: 6,
                text: "6m",
                title: "View 6 months"
            }, {
                type: "ytd",
                text: "YTD",
                title: "View year to date"
            }, {
                type: "year",
                count: 1,
                text: "1y",
                title: "View 1 year"
            }, {
                type: "all",
                text: "All",
                title: "View all"
            }],
            inputTypeFormats: {
                "datetime-local": "%Y-%m-%dT%H:%M:%S",
                date: "%Y-%m-%d",
                time: "%H:%M:%S"
            }
        });
        "";
        return y
    });
    x(b, "Accessibility/Components/RangeSelectorComponent.js", [b["Stock/RangeSelector/RangeSelector.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/Announcer.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Core/Utilities.js"]], function(b, r, q, l, m, u) {
        const {unhideChartElementFromAT: v, getAxisRangeDescription: z} = q
          , {addEvent: n, attr: k} = u;
        class g extends r {
            constructor() {
                super(...arguments);
                this.announcer = void 0
            }
            init() {
                this.announcer = new l(this.chart,"polite")
            }
            onChartUpdate() {
                const a = this.chart
                  , b = this
                  , d = a.rangeSelector;
                d && (this.updateSelectorVisibility(),
                this.setDropdownAttrs(),
                d.buttons && d.buttons.length && d.buttons.forEach(a => {
                    b.setRangeButtonAttrs(a)
                }
                ),
                d.maxInput && d.minInput && ["minInput", "maxInput"].forEach(function(c, f) {
                    if (c = d[c])
                        v(a, c),
                        b.setRangeInputAttrs(c, "accessibility.rangeSelector." + (f ? "max" : "min") + "InputLabel")
                }))
            }
            updateSelectorVisibility() {
                const a = this.chart
                  , b = a.rangeSelector
                  , d = b && b.dropdown
                  , e = b && b.buttons || [];
                b && b.hasVisibleDropdown && d ? (v(a, d),
                e.forEach(a => a.element.setAttribute("aria-hidden", !0))) : (d && d.setAttribute("aria-hidden", !0),
                e.forEach(b => v(a, b.element)))
            }
            setDropdownAttrs() {
                var a = this.chart;
                const b = a.rangeSelector && a.rangeSelector.dropdown;
                b && (a = a.langFormat("accessibility.rangeSelector.dropdownLabel", {
                    rangeTitle: a.options.lang.rangeSelectorZoom
                }),
                b.setAttribute("aria-label", a),
                b.setAttribute("tabindex", -1))
            }
            setRangeButtonAttrs(a) {
                k(a.element, {
                    tabindex: -1,
                    role: "button"
                })
            }
            setRangeInputAttrs(a, b) {
                const c = this.chart;
                k(a, {
                    tabindex: -1,
                    "aria-label": c.langFormat(b, {
                        chart: c
                    })
                })
            }
            onButtonNavKbdArrowKey(a, b) {
                const c = a.response
                  , e = this.keyCodes
                  , f = this.chart
                  , g = f.options.accessibility.keyboardNavigation.wrapAround;
                b = b === e.left || b === e.up ? -1 : 1;
                return f.highlightRangeSelectorButton(f.highlightedRangeSelectorItemIx + b) ? c.success : g ? (a.init(b),
                c.success) : c[0 < b ? "next" : "prev"]
            }
            onButtonNavKbdClick(a) {
                a = a.response;
                const b = this.chart;
                3 !== b.oldRangeSelectorItemState && this.fakeClickEvent(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element);
                return a.success
            }
            onAfterBtnClick() {
                var a = this.chart;
                const b = z(a.xAxis[0]);
                (a = a.langFormat("accessibility.rangeSelector.clickButtonAnnouncement", {
                    chart: a,
                    axisRangeDescription: b
                })) && this.announcer.announce(a)
            }
            onInputKbdMove(a) {
                const b = this.chart;
                var d = b.rangeSelector;
                const e = b.highlightedInputRangeIx = (b.highlightedInputRangeIx || 0) + a;
                if (1 < e || 0 > e) {
                    if (b.accessibility)
                        return b.accessibility.keyboardNavigation.exiting = !0,
                        b.accessibility.keyboardNavigation.tabindexContainer.focus(),
                        b.accessibility.keyboardNavigation.move(a)
                } else
                    d && (a = d[e ? "maxDateBox" : "minDateBox"],
                    d = d[e ? "maxInput" : "minInput"],
                    a && d && b.setFocusToElement(a, d));
                return !0
            }
            onInputNavInit(a) {
                const b = this;
                var d = this.chart;
                const e = 0 < a ? 0 : 1;
                var f = d.rangeSelector;
                const g = f && f[e ? "maxDateBox" : "minDateBox"];
                a = f && f.minInput;
                f = f && f.maxInput;
                d.highlightedInputRangeIx = e;
                if (g && a && f) {
                    d.setFocusToElement(g, e ? f : a);
                    this.removeInputKeydownHandler && this.removeInputKeydownHandler();
                    d = a => {
                        (a.which || a.keyCode) === this.keyCodes.tab && b.onInputKbdMove(a.shiftKey ? -1 : 1) && (a.preventDefault(),
                        a.stopPropagation())
                    }
                    ;
                    const c = n(a, "keydown", d)
                      , k = n(f, "keydown", d);
                    this.removeInputKeydownHandler = () => {
                        c();
                        k()
                    }
                }
            }
            onInputNavTerminate() {
                const a = this.chart.rangeSelector || {};
                a.maxInput && a.hideInput("max");
                a.minInput && a.hideInput("min");
                this.removeInputKeydownHandler && (this.removeInputKeydownHandler(),
                delete this.removeInputKeydownHandler)
            }
            initDropdownNav() {
                const a = this.chart
                  , b = a.rangeSelector
                  , d = b && b.dropdown;
                b && d && (a.setFocusToElement(b.buttonGroup, d),
                this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(),
                this.removeDropdownKeydownHandler = n(d, "keydown", b => {
                    const c = a.accessibility;
                    (b.which || b.keyCode) === this.keyCodes.tab && (b.preventDefault(),
                    b.stopPropagation(),
                    c && (c.keyboardNavigation.tabindexContainer.focus(),
                    c.keyboardNavigation.move(b.shiftKey ? -1 : 1)))
                }
                ))
            }
            getRangeSelectorButtonNavigation() {
                const a = this.chart
                  , b = this.keyCodes
                  , d = this;
                return new m(a,{
                    keyCodeMap: [[[b.left, b.right, b.up, b.down], function(a) {
                        return d.onButtonNavKbdArrowKey(this, a)
                    }
                    ], [[b.enter, b.space], function() {
                        return d.onButtonNavKbdClick(this)
                    }
                    ]],
                    validate: function() {
                        return !!(a.rangeSelector && a.rangeSelector.buttons && a.rangeSelector.buttons.length)
                    },
                    init: function(b) {
                        var c = a.rangeSelector;
                        c && c.hasVisibleDropdown ? d.initDropdownNav() : c && (c = c.buttons.length - 1,
                        a.highlightRangeSelectorButton(0 < b ? 0 : c))
                    },
                    terminate: function() {
                        d.removeDropdownKeydownHandler && (d.removeDropdownKeydownHandler(),
                        delete d.removeDropdownKeydownHandler)
                    }
                })
            }
            getRangeSelectorInputNavigation() {
                const a = this.chart
                  , b = this;
                return new m(a,{
                    keyCodeMap: [],
                    validate: function() {
                        return !!(a.rangeSelector && a.rangeSelector.inputGroup && "hidden" !== a.rangeSelector.inputGroup.element.style.visibility && !1 !== a.options.rangeSelector.inputEnabled && a.rangeSelector.minInput && a.rangeSelector.maxInput)
                    },
                    init: function(a) {
                        b.onInputNavInit(a)
                    },
                    terminate: function() {
                        b.onInputNavTerminate()
                    }
                })
            }
            getKeyboardNavigation() {
                return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()]
            }
            destroy() {
                this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler();
                this.removeInputKeydownHandler && this.removeInputKeydownHandler();
                this.announcer && this.announcer.destroy()
            }
        }
        (function(a) {
            function c(a) {
                const b = this.rangeSelector && this.rangeSelector.buttons || []
                  , c = this.highlightedRangeSelectorItemIx
                  , d = this.rangeSelector && this.rangeSelector.selected;
                "undefined" !== typeof c && b[c] && c !== d && b[c].setState(this.oldRangeSelectorItemState || 0);
                this.highlightedRangeSelectorItemIx = a;
                return b[a] ? (this.setFocusToElement(b[a].box, b[a].element),
                a !== d && (this.oldRangeSelectorItemState = b[a].state,
                b[a].setState(1)),
                !0) : !1
            }
            function d() {
                const a = this.chart.accessibility;
                if (a && a.components.rangeSelector)
                    return a.components.rangeSelector.onAfterBtnClick()
            }
            const e = [];
            a.compose = function(a, g) {
                u.pushUnique(e, a) && (a.prototype.highlightRangeSelectorButton = c);
                u.pushUnique(e, g) && n(b, "afterBtnClick", d)
            }
        }
        )(g || (g = {}));
        return g
    });
    x(b, "Accessibility/Components/SeriesComponent/ForcedMarkers.js", [b["Core/Utilities.js"]], function(b) {
        const {addEvent: r, merge: q} = b;
        var l;
        (function(m) {
            function l(a) {
                q(!0, a, {
                    marker: {
                        enabled: !0,
                        states: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                })
            }
            function v(a) {
                return a.marker.states && a.marker.states.normal && a.marker.states.normal.opacity
            }
            function z() {
                if (this.chart.styledMode) {
                    if (this.markerGroup)
                        this.markerGroup[this.a11yMarkersForced ? "addClass" : "removeClass"]("highcharts-a11y-markers-hidden");
                    this._hasPointMarkers && this.points && this.points.length && this.points.forEach(a => {
                        a.graphic && (a.graphic[a.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-hidden"),
                        a.graphic[!1 === a.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-visible"))
                    }
                    )
                }
            }
            function n(a) {
                this.resetA11yMarkerOptions = q(a.options.marker || {}, this.userOptions.marker || {})
            }
            function k() {
                var a = this.options
                  , b = !1 !== (this.options.accessibility && this.options.accessibility.enabled);
                if (b = this.chart.options.accessibility.enabled && b)
                    b = this.chart.options.accessibility,
                    b = this.points.length < b.series.pointDescriptionEnabledThreshold || !1 === b.series.pointDescriptionEnabledThreshold;
                if (b) {
                    if (a.marker && !1 === a.marker.enabled && (this.a11yMarkersForced = !0,
                    l(this.options)),
                    this._hasPointMarkers && this.points && this.points.length)
                        for (a = this.points.length; a--; ) {
                            b = this.points[a];
                            const c = b.options;
                            var d = b.hasForcedA11yMarker;
                            delete b.hasForcedA11yMarker;
                            c.marker && (d = d && 0 === v(c),
                            c.marker.enabled && !d ? (q(!0, c.marker, {
                                states: {
                                    normal: {
                                        opacity: v(c) || 1
                                    }
                                }
                            }),
                            b.hasForcedA11yMarker = !1) : !1 === c.marker.enabled && (l(c),
                            b.hasForcedA11yMarker = !0))
                        }
                } else
                    this.a11yMarkersForced && (delete this.a11yMarkersForced,
                    (a = this.resetA11yMarkerOptions) && this.update({
                        marker: {
                            enabled: a.enabled,
                            states: {
                                normal: {
                                    opacity: a.states && a.states.normal && a.states.normal.opacity
                                }
                            }
                        }
                    }),
                    delete this.resetA11yMarkerOptions)
            }
            const g = [];
            m.compose = function(a) {
                b.pushUnique(g, a) && (r(a, "afterSetOptions", n),
                r(a, "render", k),
                r(a, "afterRender", z))
            }
        }
        )(l || (l = {}));
        return l
    });
    x(b, "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js", [b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Utils/ChartUtilities.js"]], function(b, r, q, l, m, u, x, z) {
        function n(a) {
            const b = a.index
              , c = a.series.points;
            let d = c.length;
            if (c[b] !== a)
                for (; d--; ) {
                    if (c[d] === a)
                        return d
                }
            else
                return b
        }
        function k(a) {
            const b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation
              , c = a.options.accessibility || {}
              , d = c.keyboardNavigation;
            return d && !1 === d.enabled || !1 === c.enabled || !1 === a.options.enableMouseTracking || !a.visible || b.pointNavigationEnabledThreshold && b.pointNavigationEnabledThreshold <= a.points.length
        }
        function g(a) {
            const b = a.series.chart.options.accessibility
              , c = a.options.accessibility && !1 === a.options.accessibility.enabled;
            return a.isNull && b.keyboardNavigation.seriesNavigation.skipNullPoints || !1 === a.visible || !1 === a.isInside || c || k(a.series)
        }
        function a(a) {
            a = a.series || [];
            const b = a.length;
            for (let d = 0; d < b; ++d)
                if (!k(a[d])) {
                    a: {
                        var c = a[d].points || [];
                        const b = c.length;
                        for (let a = 0; a < b; ++a)
                            if (!g(c[a])) {
                                c = c[a];
                                break a
                            }
                        c = null
                    }
                    if (c)
                        return c
                }
            return null
        }
        function c(a) {
            let b = a.series.length
              , c = !1;
            for (; b-- && !(a.highlightedPoint = a.series[b].points[a.series[b].points.length - 1],
            c = a.series[b].highlightNextValidPoint()); )
                ;
            return c
        }
        function d(b) {
            delete b.highlightedPoint;
            return (b = a(b)) ? b.highlight() : !1
        }
        const {seriesTypes: e} = q
          , {doc: f} = l
          , {defined: v, fireEvent: B} = m
          , {getPointFromXY: L, getSeriesFromName: I, scrollToPoint: F} = z;
        class G {
            constructor(a, b) {
                this.keyCodes = b;
                this.chart = a
            }
            init() {
                const c = this
                  , d = this.chart
                  , e = this.eventProvider = new x;
                e.addEvent(r, "destroy", function() {
                    return c.onSeriesDestroy(this)
                });
                e.addEvent(d, "afterApplyDrilldown", function() {
                    {
                        const b = a(this);
                        b && b.highlight(!1)
                    }
                });
                e.addEvent(d, "drilldown", function(a) {
                    a = a.point;
                    const b = a.series;
                    c.lastDrilledDownPoint = {
                        x: a.x,
                        y: a.y,
                        seriesName: b ? b.name : ""
                    }
                });
                e.addEvent(d, "drillupall", function() {
                    setTimeout(function() {
                        c.onDrillupAll()
                    }, 10)
                });
                e.addEvent(b, "afterSetState", function() {
                    const a = this.graphic && this.graphic.element
                      , b = f.activeElement;
                    var c = b && b.getAttribute("class");
                    c = c && -1 < c.indexOf("highcharts-a11y-proxy-button");
                    d.highlightedPoint === this && b !== a && !c && a && a.focus && a.focus()
                })
            }
            onDrillupAll() {
                const b = this.lastDrilledDownPoint
                  , c = this.chart
                  , d = b && I(c, b.seriesName);
                let e;
                b && d && v(b.x) && v(b.y) && (e = L(d, b.x, b.y));
                e = e || a(c);
                c.container && c.container.focus();
                e && e.highlight && e.highlight(!1)
            }
            getKeyboardNavigationHandler() {
                const b = this
                  , e = this.keyCodes
                  , f = this.chart
                  , g = f.inverted;
                return new u(f,{
                    keyCodeMap: [[g ? [e.up, e.down] : [e.left, e.right], function(a) {
                        return b.onKbdSideways(this, a)
                    }
                    ], [g ? [e.left, e.right] : [e.up, e.down], function(a) {
                        return b.onKbdVertical(this, a)
                    }
                    ], [[e.enter, e.space], function(a, b) {
                        if (a = f.highlightedPoint)
                            b.point = a,
                            B(a.series, "click", b),
                            a.firePointEvent("click");
                        return this.response.success
                    }
                    ], [[e.home], function() {
                        d(f);
                        return this.response.success
                    }
                    ], [[e.end], function() {
                        c(f);
                        return this.response.success
                    }
                    ], [[e.pageDown, e.pageUp], function(a) {
                        f.highlightAdjacentSeries(a === e.pageDown);
                        return this.response.success
                    }
                    ]],
                    init: function() {
                        return b.onHandlerInit(this)
                    },
                    validate: function() {
                        return !!a(f)
                    },
                    terminate: function() {
                        return b.onHandlerTerminate()
                    }
                })
            }
            onKbdSideways(a, b) {
                const c = this.keyCodes;
                return this.attemptHighlightAdjacentPoint(a, b === c.right || b === c.down)
            }
            onHandlerInit(a) {
                const b = this.chart;
                b.options.accessibility.keyboardNavigation.seriesNavigation.rememberPointFocus && b.highlightedPoint ? b.highlightedPoint.highlight() : d(b);
                return a.response.success
            }
            onKbdVertical(a, b) {
                const c = this.chart;
                var d = this.keyCodes;
                b = b === d.down || b === d.right;
                d = c.options.accessibility.keyboardNavigation.seriesNavigation;
                if (d.mode && "serialize" === d.mode)
                    return this.attemptHighlightAdjacentPoint(a, b);
                c[c.highlightedPoint && c.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" : "highlightAdjacentSeries"](b);
                return a.response.success
            }
            onHandlerTerminate() {
                const a = this.chart
                  , b = a.options.accessibility.keyboardNavigation;
                a.tooltip && a.tooltip.hide(0);
                const c = a.highlightedPoint && a.highlightedPoint.series;
                if (c && c.onMouseOut)
                    c.onMouseOut();
                if (a.highlightedPoint && a.highlightedPoint.onMouseOut)
                    a.highlightedPoint.onMouseOut();
                b.seriesNavigation.rememberPointFocus || delete a.highlightedPoint
            }
            attemptHighlightAdjacentPoint(a, b) {
                const e = this.chart
                  , f = e.options.accessibility.keyboardNavigation.wrapAround;
                return e.highlightAdjacentPoint(b) ? a.response.success : f && (b ? d(e) : c(e)) ? a.response.success : a.response[b ? "next" : "prev"]
            }
            onSeriesDestroy(a) {
                const b = this.chart;
                b.highlightedPoint && b.highlightedPoint.series === a && (delete b.highlightedPoint,
                b.focusElement && b.focusElement.removeFocusBorder())
            }
            destroy() {
                this.eventProvider.removeAddedEvents()
            }
        }
        (function(a) {
            function b(a) {
                var b = this.series;
                const c = this.highlightedPoint;
                var d = c && n(c) || 0;
                const e = c && c.series.points || [];
                var f = this.series && this.series[this.series.length - 1];
                f = f && f.points && f.points[f.points.length - 1];
                if (!b[0] || !b[0].points)
                    return !1;
                if (c) {
                    if (b = b[c.series.index + (a ? 1 : -1)],
                    d = e[d + (a ? 1 : -1)],
                    !d && b && (d = b.points[a ? 0 : b.points.length - 1]),
                    !d)
                        return !1
                } else
                    d = a ? b[0].points[0] : f;
                return g(d) ? (b = d.series,
                k(b) ? this.highlightedPoint = a ? b.points[b.points.length - 1] : b.points[0] : this.highlightedPoint = d,
                this.highlightAdjacentPoint(a)) : d.highlight()
            }
            function c(a) {
                const b = this.highlightedPoint;
                let c = Infinity, d;
                if (!v(b.plotX) || !v(b.plotY))
                    return !1;
                this.series.forEach(e => {
                    k(e) || e.points.forEach(f => {
                        if (v(f.plotY) && v(f.plotX) && f !== b) {
                            var k = f.plotY - b.plotY
                              , h = Math.abs(f.plotX - b.plotX);
                            h = Math.abs(k) * Math.abs(k) + h * h * 4;
                            e.yAxis && e.yAxis.reversed && (k *= -1);
                            !(0 >= k && a || 0 <= k && !a || 5 > h || g(f)) && h < c && (c = h,
                            d = f)
                        }
                    }
                    )
                }
                );
                return d ? d.highlight() : !1
            }
            function d(a) {
                const b = this.highlightedPoint;
                var c = this.series && this.series[this.series.length - 1]
                  , d = c && c.points && c.points[c.points.length - 1];
                if (!this.highlightedPoint)
                    return c = a ? this.series && this.series[0] : c,
                    (d = a ? c && c.points && c.points[0] : d) ? d.highlight() : !1;
                c = this.series[b.series.index + (a ? -1 : 1)];
                if (!c)
                    return !1;
                d = f(b, c, 4);
                if (!d)
                    return !1;
                if (k(c))
                    return d.highlight(),
                    a = this.highlightAdjacentSeries(a),
                    a ? a : (b.highlight(),
                    !1);
                d.highlight();
                return d.series.highlightNextValidPoint()
            }
            function f(a, b, c, d) {
                let e = Infinity;
                let f, g = b.points.length;
                const k = a => !(v(a.plotX) && v(a.plotY));
                if (!k(a)) {
                    for (; g--; ) {
                        var h = b.points[g];
                        k(h) || (h = (a.plotX - h.plotX) * (a.plotX - h.plotX) * (c || 1) + (a.plotY - h.plotY) * (a.plotY - h.plotY) * (d || 1),
                        h < e && (e = h,
                        f = g))
                    }
                    return v(f) ? b.points[f] : void 0
                }
            }
            function l(a=!0) {
                const b = this.series.chart;
                if (!this.isNull && a)
                    this.onMouseOver();
                else
                    b.tooltip && b.tooltip.hide(0);
                F(this);
                this.graphic && (b.setFocusToElement(this.graphic),
                !a && b.focusElement && b.focusElement.removeFocusBorder());
                b.highlightedPoint = this;
                return this
            }
            function q() {
                var a = this.chart.highlightedPoint
                  , b = (a && a.series) === this ? n(a) : 0;
                a = this.points;
                const c = a.length;
                if (a && c) {
                    for (let d = b; d < c; ++d)
                        if (!g(a[d]))
                            return a[d].highlight();
                    for (; 0 <= b; --b)
                        if (!g(a[b]))
                            return a[b].highlight()
                }
                return !1
            }
            const r = [];
            a.compose = function(a, f, g) {
                m.pushUnique(r, a) && (a = a.prototype,
                a.highlightAdjacentPoint = b,
                a.highlightAdjacentPointVertical = c,
                a.highlightAdjacentSeries = d);
                m.pushUnique(r, f) && (f.prototype.highlight = l);
                m.pushUnique(r, g) && (f = g.prototype,
                f.keyboardMoveVertical = !0,
                ["column", "gantt", "pie"].forEach(a => {
                    e[a] && (e[a].prototype.keyboardMoveVertical = !1)
                }
                ),
                f.highlightNextValidPoint = q)
            }
        }
        )(G || (G = {}));
        return G
    });
    x(b, "Accessibility/Components/SeriesComponent/SeriesComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Components/SeriesComponent/ForcedMarkers.js"], b["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"], b["Accessibility/Components/SeriesComponent/SeriesDescriber.js"], b["Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js"]], function(b, r, q, l, m, u) {
        const {hideSeriesFromAT: v} = r
          , {describeSeries: z} = m;
        class n extends b {
            static compose(b, g, a) {
                l.compose(a);
                q.compose(a);
                u.compose(b, g, a)
            }
            init() {
                this.newDataAnnouncer = new l(this.chart);
                this.newDataAnnouncer.init();
                this.keyboardNavigation = new u(this.chart,this.keyCodes);
                this.keyboardNavigation.init();
                this.hideTooltipFromATWhenShown();
                this.hideSeriesLabelsFromATWhenShown()
            }
            hideTooltipFromATWhenShown() {
                const b = this;
                this.chart.tooltip && this.addEvent(this.chart.tooltip.constructor, "refresh", function() {
                    this.chart === b.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", !0)
                })
            }
            hideSeriesLabelsFromATWhenShown() {
                this.addEvent(this.chart, "afterDrawSeriesLabels", function() {
                    this.series.forEach(function(b) {
                        b.labelBySeries && b.labelBySeries.attr("aria-hidden", !0)
                    })
                })
            }
            onChartRender() {
                this.chart.series.forEach(function(b) {
                    !1 !== (b.options.accessibility && b.options.accessibility.enabled) && b.visible ? z(b) : v(b)
                })
            }
            getKeyboardNavigation() {
                return this.keyboardNavigation.getKeyboardNavigationHandler()
            }
            destroy() {
                this.newDataAnnouncer.destroy();
                this.keyboardNavigation.destroy()
            }
        }
        return n
    });
    x(b, "Accessibility/Components/ZoomComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Core/Utilities.js"]], function(b, r, q, l, m) {
        const {unhideChartElementFromAT: v} = r
          , {getFakeMouseEvent: x} = q
          , {attr: z, pick: n} = m;
        class k extends b {
            constructor() {
                super(...arguments);
                this.focusedMapNavButtonIx = -1
            }
            init() {
                const b = this
                  , a = this.chart;
                this.proxyProvider.addGroup("zoom", "div");
                ["afterShowResetZoom", "afterApplyDrilldown", "drillupall"].forEach(c => {
                    b.addEvent(a, c, function() {
                        b.updateProxyOverlays()
                    })
                }
                )
            }
            onChartUpdate() {
                const b = this.chart
                  , a = this;
                b.mapNavigation && b.mapNavigation.navButtons.forEach( (c, d) => {
                    v(b, c.element);
                    a.setMapNavButtonAttrs(c.element, "accessibility.zoom.mapZoom" + (d ? "Out" : "In"))
                }
                )
            }
            setMapNavButtonAttrs(b, a) {
                const c = this.chart;
                a = c.langFormat(a, {
                    chart: c
                });
                z(b, {
                    tabindex: -1,
                    role: "button",
                    "aria-label": a
                })
            }
            onChartRender() {
                this.updateProxyOverlays()
            }
            updateProxyOverlays() {
                const b = this.chart;
                this.proxyProvider.clearGroup("zoom");
                b.resetZoomButton && this.createZoomProxyButton(b.resetZoomButton, "resetZoomProxyButton", b.langFormat("accessibility.zoom.resetZoomButton", {
                    chart: b
                }));
                b.drillUpButton && b.breadcrumbs && b.breadcrumbs.list && this.createZoomProxyButton(b.drillUpButton, "drillUpProxyButton", b.langFormat("accessibility.drillUpButton", {
                    chart: b,
                    buttonText: b.breadcrumbs.getButtonText(b.breadcrumbs.list[b.breadcrumbs.list.length - 1])
                }))
            }
            createZoomProxyButton(b, a, c) {
                this[a] = this.proxyProvider.addProxyElement("zoom", {
                    click: b
                }, {
                    "aria-label": c,
                    tabindex: -1
                })
            }
            getMapZoomNavigation() {
                const b = this.keyCodes
                  , a = this.chart
                  , c = this;
                return new l(a,{
                    keyCodeMap: [[[b.up, b.down, b.left, b.right], function(a) {
                        return c.onMapKbdArrow(this, a)
                    }
                    ], [[b.tab], function(a, b) {
                        return c.onMapKbdTab(this, b)
                    }
                    ], [[b.space, b.enter], function() {
                        return c.onMapKbdClick(this)
                    }
                    ]],
                    validate: function() {
                        return !!(a.mapView && a.mapNavigation && a.mapNavigation.navButtons.length)
                    },
                    init: function(a) {
                        return c.onMapNavInit(a)
                    }
                })
            }
            onMapKbdArrow(b, a) {
                var c = this.chart
                  , d = this.keyCodes;
                const e = c.container;
                var f = a === d.up || a === d.down;
                a = (f ? c.plotHeight : c.plotWidth) / 10 * (a === d.left || a === d.up ? 1 : -1);
                d = 10 * Math.random();
                c = {
                    x: e.offsetLeft + c.plotLeft + c.plotWidth / 2 + d,
                    y: e.offsetTop + c.plotTop + c.plotHeight / 2 + d
                };
                f = f ? {
                    x: c.x,
                    y: c.y + a
                } : {
                    x: c.x + a,
                    y: c.y
                };
                [x("mousedown", c), x("mousemove", f), x("mouseup", f)].forEach(a => e.dispatchEvent(a));
                return b.response.success
            }
            onMapKbdTab(b, a) {
                const c = this.chart;
                b = b.response;
                const d = (a = a.shiftKey) && !this.focusedMapNavButtonIx || !a && this.focusedMapNavButtonIx;
                c.mapNavigation.navButtons[this.focusedMapNavButtonIx].setState(0);
                if (d)
                    return c.mapView && c.mapView.zoomBy(),
                    b[a ? "prev" : "next"];
                this.focusedMapNavButtonIx += a ? -1 : 1;
                a = c.mapNavigation.navButtons[this.focusedMapNavButtonIx];
                c.setFocusToElement(a.box, a.element);
                a.setState(2);
                return b.success
            }
            onMapKbdClick(b) {
                this.fakeClickEvent(this.chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].element);
                return b.response.success
            }
            onMapNavInit(b) {
                const a = this.chart;
                var c = a.mapNavigation.navButtons[0];
                const d = a.mapNavigation.navButtons[1];
                c = 0 < b ? c : d;
                a.setFocusToElement(c.box, c.element);
                c.setState(2);
                this.focusedMapNavButtonIx = 0 < b ? 0 : 1
            }
            simpleButtonNavigation(b, a, c) {
                const d = this.keyCodes
                  , e = this
                  , f = this.chart;
                return new l(f,{
                    keyCodeMap: [[[d.tab, d.up, d.down, d.left, d.right], function(a, b) {
                        return this.response[a === d.tab && b.shiftKey || a === d.left || a === d.up ? "prev" : "next"]
                    }
                    ], [[d.space, d.enter], function() {
                        const a = c(this, f);
                        return n(a, this.response.success)
                    }
                    ]],
                    validate: function() {
                        return f[b] && f[b].box && e[a].buttonElement
                    },
                    init: function() {
                        f.setFocusToElement(f[b].box, e[a].buttonElement)
                    }
                })
            }
            getKeyboardNavigation() {
                return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function(b, a) {
                    a.zoomOut()
                }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function(b, a) {
                    a.drillUp();
                    return b.response.prev
                }), this.getMapZoomNavigation()]
            }
        }
        return k
    });
    x(b, "Accessibility/HighContrastMode.js", [b["Core/Globals.js"]], function(b) {
        const {doc: r, isMS: q, win: l} = b;
        return {
            isHighContrastModeActive: function() {
                var b = /(Edg)/.test(l.navigator.userAgent);
                if (l.matchMedia && b)
                    return l.matchMedia("(-ms-high-contrast: active)").matches;
                if (q && l.getComputedStyle) {
                    b = r.createElement("div");
                    b.style.backgroundImage = "url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)";
                    r.body.appendChild(b);
                    const m = (b.currentStyle || l.getComputedStyle(b)).backgroundImage;
                    r.body.removeChild(b);
                    return "none" === m
                }
                return l.matchMedia && l.matchMedia("(forced-colors: active)").matches
            },
            setHighContrastTheme: function(b) {
                b.highContrastModeActive = !0;
                const m = b.options.accessibility.highContrastTheme;
                b.update(m, !1);
                b.series.forEach(function(b) {
                    const l = m.plotOptions[b.type] || {};
                    b.update({
                        color: l.color || "windowText",
                        colors: [l.color || "windowText"],
                        borderColor: l.borderColor || "window"
                    });
                    b.points.forEach(function(b) {
                        b.options && b.options.color && b.update({
                            color: l.color || "windowText",
                            borderColor: l.borderColor || "window"
                        }, !1)
                    })
                });
                b.redraw()
            }
        }
    });
    x(b, "Accessibility/HighContrastTheme.js", [], function() {
        return {
            chart: {
                backgroundColor: "window"
            },
            title: {
                style: {
                    color: "windowText"
                }
            },
            subtitle: {
                style: {
                    color: "windowText"
                }
            },
            colorAxis: {
                minColor: "windowText",
                maxColor: "windowText",
                stops: []
            },
            colors: ["windowText"],
            xAxis: {
                gridLineColor: "windowText",
                labels: {
                    style: {
                        color: "windowText"
                    }
                },
                lineColor: "windowText",
                minorGridLineColor: "windowText",
                tickColor: "windowText",
                title: {
                    style: {
                        color: "windowText"
                    }
                }
            },
            yAxis: {
                gridLineColor: "windowText",
                labels: {
                    style: {
                        color: "windowText"
                    }
                },
                lineColor: "windowText",
                minorGridLineColor: "windowText",
                tickColor: "windowText",
                title: {
                    style: {
                        color: "windowText"
                    }
                }
            },
            tooltip: {
                backgroundColor: "window",
                borderColor: "windowText",
                style: {
                    color: "windowText"
                }
            },
            plotOptions: {
                series: {
                    lineColor: "windowText",
                    fillColor: "window",
                    borderColor: "windowText",
                    edgeColor: "windowText",
                    borderWidth: 1,
                    dataLabels: {
                        connectorColor: "windowText",
                        color: "windowText",
                        style: {
                            color: "windowText",
                            textOutline: "none"
                        }
                    },
                    marker: {
                        lineColor: "windowText",
                        fillColor: "windowText"
                    }
                },
                pie: {
                    color: "window",
                    colors: ["window"],
                    borderColor: "windowText",
                    borderWidth: 1
                },
                boxplot: {
                    fillColor: "window"
                },
                candlestick: {
                    lineColor: "windowText",
                    fillColor: "window"
                },
                errorbar: {
                    fillColor: "window"
                }
            },
            legend: {
                backgroundColor: "window",
                itemStyle: {
                    color: "windowText"
                },
                itemHoverStyle: {
                    color: "windowText"
                },
                itemHiddenStyle: {
                    color: "#555"
                },
                title: {
                    style: {
                        color: "windowText"
                    }
                }
            },
            credits: {
                style: {
                    color: "windowText"
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: "windowText"
                },
                activeDataLabelStyle: {
                    color: "windowText"
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: "windowText",
                    theme: {
                        fill: "window"
                    }
                }
            },
            rangeSelector: {
                buttonTheme: {
                    fill: "window",
                    stroke: "windowText",
                    style: {
                        color: "windowText"
                    },
                    states: {
                        hover: {
                            fill: "window",
                            stroke: "windowText",
                            style: {
                                color: "windowText"
                            }
                        },
                        select: {
                            fill: "#444",
                            stroke: "windowText",
                            style: {
                                color: "windowText"
                            }
                        }
                    }
                },
                inputBoxBorderColor: "windowText",
                inputStyle: {
                    backgroundColor: "window",
                    color: "windowText"
                },
                labelStyle: {
                    color: "windowText"
                }
            },
            navigator: {
                handles: {
                    backgroundColor: "window",
                    borderColor: "windowText"
                },
                outlineColor: "windowText",
                maskFill: "transparent",
                series: {
                    color: "windowText",
                    lineColor: "windowText"
                },
                xAxis: {
                    gridLineColor: "windowText"
                }
            },
            scrollbar: {
                barBackgroundColor: "#444",
                barBorderColor: "windowText",
                buttonArrowColor: "windowText",
                buttonBackgroundColor: "window",
                buttonBorderColor: "windowText",
                rifleColor: "windowText",
                trackBackgroundColor: "window",
                trackBorderColor: "windowText"
            }
        }
    });
    x(b, "Accessibility/Options/A11yDefaults.js", [], function() {
        return {
            accessibility: {
                enabled: !0,
                screenReaderSection: {
                    beforeChartFormat: "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
                    afterChartFormat: "{endOfChartMarker}",
                    axisRangeDateFormat: "%Y-%m-%d %H:%M:%S"
                },
                series: {
                    descriptionFormat: "{seriesDescription}{authorDescription}{axisDescription}",
                    describeSingleSeries: !1,
                    pointDescriptionEnabledThreshold: 200
                },
                point: {
                    valueDescriptionFormat: "{xDescription}{separator}{value}.",
                    describeNull: !0
                },
                landmarkVerbosity: "all",
                linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description',
                keyboardNavigation: {
                    enabled: !0,
                    focusBorder: {
                        enabled: !0,
                        hideBrowserFocusOutline: !0,
                        style: {
                            color: "#334eff",
                            lineWidth: 2,
                            borderRadius: 3
                        },
                        margin: 2
                    },
                    order: ["series", "zoom", "rangeSelector", "legend", "chartMenu"],
                    wrapAround: !0,
                    seriesNavigation: {
                        skipNullPoints: !0,
                        pointNavigationEnabledThreshold: !1,
                        rememberPointFocus: !1
                    }
                },
                announceNewData: {
                    enabled: !1,
                    minAnnounceInterval: 5E3,
                    interruptUser: !1
                }
            },
            legend: {
                accessibility: {
                    enabled: !0,
                    keyboardNavigation: {
                        enabled: !0
                    }
                }
            },
            exporting: {
                accessibility: {
                    enabled: !0
                }
            }
        }
    });
    x(b, "Accessibility/Options/LangDefaults.js", [], function() {
        return {
            accessibility: {
                defaultChartTitle: "Chart",
                chartContainerLabel: "{title}. Highcharts interactive chart.",
                svgContainerLabel: "Interactive chart",
                drillUpButton: "{buttonText}",
                credits: "Chart credits: {creditsStr}",
                thousandsSep: ",",
                svgContainerTitle: "",
                graphicContainerLabel: "",
                screenReaderSection: {
                    beforeRegionLabel: "",
                    afterRegionLabel: "",
                    annotations: {
                        heading: "Chart annotations summary",
                        descriptionSinglePoint: "{annotationText}. Related to {annotationPoint}",
                        descriptionMultiplePoints: "{annotationText}. Related to {annotationPoint}{#each additionalAnnotationPoints}, also related to {this}{/each}",
                        descriptionNoPoints: "{annotationText}"
                    },
                    endOfChartMarker: "End of interactive chart."
                },
                sonification: {
                    playAsSoundButtonText: "Play as sound, {chartTitle}",
                    playAsSoundClickAnnouncement: "Play"
                },
                legend: {
                    legendLabelNoTitle: "Toggle series visibility, {chartTitle}",
                    legendLabel: "Chart legend: {legendTitle}",
                    legendItem: "Show {itemName}"
                },
                zoom: {
                    mapZoomIn: "Zoom chart",
                    mapZoomOut: "Zoom out chart",
                    resetZoomButton: "Reset zoom"
                },
                rangeSelector: {
                    dropdownLabel: "{rangeTitle}",
                    minInputLabel: "Select start date.",
                    maxInputLabel: "Select end date.",
                    clickButtonAnnouncement: "Viewing {axisRangeDescription}"
                },
                table: {
                    viewAsDataTableButtonText: "View as data table, {chartTitle}",
                    tableSummary: "Table representation of chart."
                },
                announceNewData: {
                    newDataAnnounce: "Updated data for chart {chartTitle}",
                    newSeriesAnnounceSingle: "New data series: {seriesDesc}",
                    newPointAnnounceSingle: "New data point: {pointDesc}",
                    newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}",
                    newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}"
                },
                seriesTypeDescriptions: {
                    boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                    arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
                    areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.",
                    bubble: "Bubble charts are scatter charts where each data point also has a size value.",
                    columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.",
                    errorbar: "Errorbar series are used to display the variability of the data.",
                    funnel: "Funnel charts are used to display reduction of data in stages.",
                    pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
                    waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                },
                chartTypes: {
                    emptyChart: "Empty chart",
                    mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.",
                    unknownMap: "Map of unspecified region with {numSeries} data series.",
                    combinationChart: "Combination chart with {numSeries} data series.",
                    defaultSingle: "Chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                    defaultMultiple: "Chart with {numSeries} data series.",
                    splineSingle: "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                    splineMultiple: "Line chart with {numSeries} lines.",
                    lineSingle: "Line chart with {numPoints} data {#eq numPoints 1}point{else}points{/eq}.",
                    lineMultiple: "Line chart with {numSeries} lines.",
                    columnSingle: "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
                    columnMultiple: "Bar chart with {numSeries} data series.",
                    barSingle: "Bar chart with {numPoints} {#eq numPoints 1}bar{else}bars{/eq}.",
                    barMultiple: "Bar chart with {numSeries} data series.",
                    pieSingle: "Pie chart with {numPoints} {#eq numPoints 1}slice{else}slices{/eq}.",
                    pieMultiple: "Pie chart with {numSeries} pies.",
                    scatterSingle: "Scatter chart with {numPoints} {#eq numPoints 1}point{else}points{/eq}.",
                    scatterMultiple: "Scatter chart with {numSeries} data series.",
                    boxplotSingle: "Boxplot with {numPoints} {#eq numPoints 1}box{else}boxes{/eq}.",
                    boxplotMultiple: "Boxplot with {numSeries} data series.",
                    bubbleSingle: "Bubble chart with {numPoints} {#eq numPoints 1}bubbles{else}bubble{/eq}.",
                    bubbleMultiple: "Bubble chart with {numSeries} data series."
                },
                axis: {
                    xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
                    xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
                    yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}",
                    yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.",
                    timeRangeDays: "Data range: {range} days.",
                    timeRangeHours: "Data range: {range} hours.",
                    timeRangeMinutes: "Data range: {range} minutes.",
                    timeRangeSeconds: "Data range: {range} seconds.",
                    rangeFromTo: "Data ranges from {rangeFrom} to {rangeTo}.",
                    rangeCategories: "Data range: {numCategories} categories."
                },
                exporting: {
                    chartMenuLabel: "Chart menu",
                    menuButtonLabel: "View chart menu, {chartTitle}"
                },
                series: {
                    summary: {
                        "default": "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        defaultCombination: "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        line: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        lineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        spline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        splineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        column: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                        columnCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                        bar: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                        barCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.",
                        pie: "{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                        pieCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.",
                        scatter: "{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                        scatterCombination: "{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.",
                        boxplot: "{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                        boxplotCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.",
                        bubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                        bubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                        map: "{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                        mapCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.",
                        mapline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        maplineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.",
                        mapbubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.",
                        mapbubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}."
                    },
                    description: "{description}",
                    xAxisDescription: "X axis, {name}",
                    yAxisDescription: "Y axis, {name}",
                    nullPointValue: "No value",
                    pointAnnotationsDescription: "{#each annotations}Annotation: {this}{/each}"
                }
            }
        }
    });
    x(b, "Accessibility/Options/DeprecatedOptions.js", [b["Core/Utilities.js"]], function(b) {
        function r(b, k, g) {
            let a, c = 0;
            for (; c < k.length - 1; ++c)
                a = k[c],
                b = b[a] = z(b[a], {});
            b[k[k.length - 1]] = g
        }
        function q(b, k, g, a) {
            function c(a, b) {
                return b.reduce(function(a, b) {
                    return a[b]
                }, a)
            }
            const d = c(b.options, k)
              , e = c(b.options, g);
            Object.keys(a).forEach(function(c) {
                const f = d[c];
                "undefined" !== typeof f && (r(e, a[c], f),
                x(32, !1, b, {
                    [k.join(".") + "." + c]: g.join(".") + "." + a[c].join(".")
                }))
            })
        }
        function l(b) {
            const k = b.options.chart
              , g = b.options.accessibility || {};
            ["description", "typeDescription"].forEach(function(a) {
                k[a] && (g[a] = k[a],
                x(32, !1, b, {
                    [`chart.${a}`]: `use accessibility.${a}`
                }))
            })
        }
        function m(b) {
            b.axes.forEach(function(k) {
                (k = k.options) && k.description && (k.accessibility = k.accessibility || {},
                k.accessibility.description = k.description,
                x(32, !1, b, {
                    "axis.description": "use axis.accessibility.description"
                }))
            })
        }
        function v(b) {
            const k = {
                description: ["accessibility", "description"],
                exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"],
                pointDescriptionFormatter: ["accessibility", "point", "descriptionFormatter"],
                skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"],
                "accessibility.pointDescriptionFormatter": ["accessibility", "point", "descriptionFormatter"]
            };
            b.series.forEach(function(g) {
                Object.keys(k).forEach(function(a) {
                    let c = g.options[a];
                    "accessibility.pointDescriptionFormatter" === a && (c = g.options.accessibility && g.options.accessibility.pointDescriptionFormatter);
                    "undefined" !== typeof c && (r(g.options, k[a], "skipKeyboardNavigation" === a ? !c : c),
                    x(32, !1, b, {
                        [`series.${a}`]: "series." + k[a].join(".")
                    }))
                })
            })
        }
        const {error: x, pick: z} = b;
        return function(b) {
            l(b);
            m(b);
            b.series && v(b);
            q(b, ["accessibility"], ["accessibility"], {
                pointDateFormat: ["point", "dateFormat"],
                pointDateFormatter: ["point", "dateFormatter"],
                pointDescriptionFormatter: ["point", "descriptionFormatter"],
                pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"],
                pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"],
                pointValueDecimals: ["point", "valueDecimals"],
                pointValuePrefix: ["point", "valuePrefix"],
                pointValueSuffix: ["point", "valueSuffix"],
                screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"],
                describeSingleSeries: ["series", "describeSingleSeries"],
                seriesDescriptionFormatter: ["series", "descriptionFormatter"],
                onTableAnchorClick: ["screenReaderSection", "onViewDataTableClick"],
                axisRangeDateFormat: ["screenReaderSection", "axisRangeDateFormat"]
            });
            q(b, ["accessibility", "keyboardNavigation"], ["accessibility", "keyboardNavigation", "seriesNavigation"], {
                skipNullPoints: ["skipNullPoints"],
                mode: ["mode"]
            });
            q(b, ["lang", "accessibility"], ["lang", "accessibility"], {
                legendItem: ["legend", "legendItem"],
                legendLabel: ["legend", "legendLabel"],
                mapZoomIn: ["zoom", "mapZoomIn"],
                mapZoomOut: ["zoom", "mapZoomOut"],
                resetZoomButton: ["zoom", "resetZoomButton"],
                screenReaderRegionLabel: ["screenReaderSection", "beforeRegionLabel"],
                rangeSelectorButton: ["rangeSelector", "buttonText"],
                rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"],
                rangeSelectorMinInput: ["rangeSelector", "minInputLabel"],
                svgContainerEnd: ["screenReaderSection", "endOfChartMarker"],
                viewAsDataTable: ["table", "viewAsDataTableButtonText"],
                tableSummary: ["table", "tableSummary"]
            })
        }
    });
    x(b, "Accessibility/Accessibility.js", [b["Core/Defaults.js"], b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/A11yI18n.js"], b["Accessibility/Components/ContainerComponent.js"], b["Accessibility/FocusBorder.js"], b["Accessibility/Components/InfoRegionsComponent.js"], b["Accessibility/KeyboardNavigation.js"], b["Accessibility/Components/LegendComponent.js"], b["Accessibility/Components/MenuComponent.js"], b["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"], b["Accessibility/ProxyProvider.js"], b["Accessibility/Components/RangeSelectorComponent.js"], b["Accessibility/Components/SeriesComponent/SeriesComponent.js"], b["Accessibility/Components/ZoomComponent.js"], b["Accessibility/HighContrastMode.js"], b["Accessibility/HighContrastTheme.js"], b["Accessibility/Options/A11yDefaults.js"], b["Accessibility/Options/LangDefaults.js"], b["Accessibility/Options/DeprecatedOptions.js"]], function(b, r, q, l, m, u, x, z, n, k, g, a, c, d, e, f, E, B, J, I, F) {
        ({defaultOptions: b} = b);
        const {doc: v} = r
          , {addEvent: A, extend: y, fireEvent: h, merge: t} = q
          , {removeElement: p} = l;
        class C {
            constructor(a) {
                this.proxyProvider = this.keyboardNavigation = this.components = this.chart = void 0;
                this.init(a)
            }
            init(a) {
                this.chart = a;
                v.addEventListener ? (F(a),
                this.proxyProvider = new c(this.chart),
                this.initComponents(),
                this.keyboardNavigation = new n(a,this.components)) : (this.zombie = !0,
                this.components = {},
                a.renderTo.setAttribute("aria-hidden", !0))
            }
            initComponents() {
                const a = this.chart
                  , b = this.proxyProvider
                  , c = a.options.accessibility;
                this.components = {
                    container: new u,
                    infoRegions: new z,
                    legend: new k,
                    chartMenu: new g,
                    rangeSelector: new d,
                    series: new e,
                    zoom: new f
                };
                c.customComponents && y(this.components, c.customComponents);
                const h = this.components;
                this.getComponentOrder().forEach(function(c) {
                    h[c].initBase(a, b);
                    h[c].init()
                })
            }
            getComponentOrder() {
                if (!this.components)
                    return [];
                if (!this.components.series)
                    return Object.keys(this.components);
                const a = Object.keys(this.components).filter(a => "series" !== a);
                return ["series"].concat(a)
            }
            update() {
                const a = this.components
                  , b = this.chart;
                var c = b.options.accessibility;
                h(b, "beforeA11yUpdate");
                b.types = this.getChartTypes();
                c = c.keyboardNavigation.order;
                this.proxyProvider.updateGroupOrder(c);
                this.getComponentOrder().forEach(function(c) {
                    a[c].onChartUpdate();
                    h(b, "afterA11yComponentUpdate", {
                        name: c,
                        component: a[c]
                    })
                });
                this.keyboardNavigation.update(c);
                !b.highContrastModeActive && E.isHighContrastModeActive() && E.setHighContrastTheme(b);
                h(b, "afterA11yUpdate", {
                    accessibility: this
                })
            }
            destroy() {
                const a = this.chart || {}
                  , b = this.components;
                Object.keys(b).forEach(function(a) {
                    b[a].destroy();
                    b[a].destroyBase()
                });
                this.proxyProvider && this.proxyProvider.destroy();
                a.announcerContainer && p(a.announcerContainer);
                this.keyboardNavigation && this.keyboardNavigation.destroy();
                a.renderTo && a.renderTo.setAttribute("aria-hidden", !0);
                a.focusElement && a.focusElement.removeFocusBorder()
            }
            getChartTypes() {
                const a = {};
                this.chart.series.forEach(function(b) {
                    a[b.type] = 1
                });
                return Object.keys(a)
            }
        }
        (function(b) {
            function c() {
                this.accessibility && this.accessibility.destroy()
            }
            function f() {
                this.a11yDirty && this.renderTo && (delete this.a11yDirty,
                this.updateA11yEnabled());
                const a = this.accessibility;
                a && !a.zombie && (a.proxyProvider.updateProxyElementPositions(),
                a.getComponentOrder().forEach(function(b) {
                    a.components[b].onChartRender()
                }))
            }
            function h(a) {
                if (a = a.options.accessibility)
                    a.customComponents && (this.options.accessibility.customComponents = a.customComponents,
                    delete a.customComponents),
                    t(!0, this.options.accessibility, a),
                    this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(),
                    delete this.accessibility);
                this.a11yDirty = !0
            }
            function l() {
                let a = this.accessibility;
                const c = this.options.accessibility;
                c && c.enabled ? a && !a.zombie ? a.update() : (this.accessibility = a = new b(this),
                !a.zombie) && a.update() : a ? (a.destroy && a.destroy(),
                delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0)
            }
            function p() {
                this.series.chart.accessibility && (this.series.chart.a11yDirty = !0)
            }
            const r = [];
            b.i18nFormat = m.i18nFormat;
            b.compose = function(b, v, t, u, w, y) {
                n.compose(b);
                a.compose(u);
                k.compose(b, v);
                g.compose(b);
                e.compose(b, t, u);
                m.compose(b);
                x.compose(b, w);
                y && d.compose(b, y);
                q.pushUnique(r, b) && (b.prototype.updateA11yEnabled = l,
                A(b, "destroy", c),
                A(b, "render", f),
                A(b, "update", h),
                ["addSeries", "init"].forEach(a => {
                    A(b, a, function() {
                        this.a11yDirty = !0
                    })
                }
                ),
                ["afterApplyDrilldown", "drillupall"].forEach(a => {
                    A(b, a, function() {
                        const a = this.accessibility;
                        a && !a.zombie && a.update()
                    })
                }
                ));
                q.pushUnique(r, t) && A(t, "update", p);
                q.pushUnique(r, u) && ["update", "updatedData", "remove"].forEach(a => {
                    A(u, a, function() {
                        this.chart.accessibility && (this.chart.a11yDirty = !0)
                    })
                }
                )
            }
        }
        )(C || (C = {}));
        t(!0, b, J, {
            accessibility: {
                highContrastTheme: B
            },
            lang: I
        });
        return C
    });
    x(b, "masters/modules/accessibility.src.js", [b["Core/Globals.js"], b["Accessibility/Accessibility.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Components/SeriesComponent/SeriesDescriber.js"]], function(b, r, q, l, m, u, x) {
        b.i18nFormat = r.i18nFormat;
        b.A11yChartUtilities = l;
        b.A11yHTMLUtilities = m;
        b.AccessibilityComponent = q;
        b.KeyboardNavigationHandler = u;
        b.SeriesAccessibilityDescriber = x;
        r.compose(b.Chart, b.Legend, b.Point, b.Series, b.SVGElement, b.RangeSelector)
    })
});
//# sourceMappingURL=accessibility.js.map
