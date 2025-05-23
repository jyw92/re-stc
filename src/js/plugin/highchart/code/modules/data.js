/*
 Highcharts JS v11.1.0 (2023-06-05)

 Data module

 (c) 2012-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
    var c = 0;
    return function() {
        return c < a.length ? {
            done: !1,
            value: a[c++]
        } : {
            done: !0
        }
    }
}
;
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
    if (a == Array.prototype || a == Object.prototype)
        return a;
    a[c] = b.value;
    return a
}
;
$jscomp.getGlobal = function(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var c = 0; c < a.length; ++c) {
        var b = a[c];
        if (b && b.Math == Math)
            return b
    }
    throw Error("Cannot find global object");
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.SymbolClass = function(a, c) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: c
    })
}
;
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
}
;
$jscomp.Symbol = function() {
    function a(b) {
        if (this instanceof a)
            throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (b || "") + "_" + c++,b)
    }
    var c = 0;
    return a
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
}
;
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.iteratorFromArray = function(a, c) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var b = 0
      , d = {
        next: function() {
            if (b < a.length) {
                var h = b++;
                return {
                    value: c(h, a[h]),
                    done: !1
                }
            }
            d.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return d.next()
        }
    };
    d[Symbol.iterator] = function() {
        return d
    }
    ;
    return d
}
;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, c) {
    var b = $jscomp.propertyToPolyfillSymbol[c];
    if (null == b)
        return a[c];
    b = a[b];
    return void 0 !== b ? b : a[c]
};
$jscomp.polyfill = function(a, c, b, d) {
    c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, d) : $jscomp.polyfillUnisolated(a, c, b, d))
}
;
$jscomp.polyfillUnisolated = function(a, c, b, d) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
        var h = a[d];
        h in b || (b[h] = {});
        b = b[h]
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {
        configurable: !0,
        writable: !0,
        value: c
    })
}
;
$jscomp.polyfillIsolated = function(a, c, b, d) {
    var h = a.split(".");
    a = 1 === h.length;
    d = h[0];
    d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var q = 0; q < h.length - 1; q++) {
        var v = h[q];
        v in d || (d[v] = {});
        d = d[v]
    }
    h = h[h.length - 1];
    b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? d[h] : null;
    c = c(b);
    null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {
        configurable: !0,
        writable: !0,
        value: c
    }) : c !== b && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h,
    h = $jscomp.propertyToPolyfillSymbol[h],
    $jscomp.defineProperty(d, h, {
        configurable: !0,
        writable: !0,
        value: c
    })))
}
;
$jscomp.polyfill("Array.prototype.values", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a, b) {
            return b
        })
    }
}, "es8", "es3");
(function(a) {
    "object" === typeof module && module.exports ? (a["default"] = a,
    module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/data", ["highcharts"], function(c) {
        a(c);
        a.Highcharts = c;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
}
)(function(a) {
    function c(a, c, h, q) {
        a.hasOwnProperty(c) || (a[c] = q.apply(null, h),
        "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{
            detail: {
                path: c,
                module: a[c]
            }
        })))
    }
    a = a ? a._modules : {};
    c(a, "Core/HttpUtilities.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, c) {
        const {doc: b} = a
          , {createElement: d, discardElement: v, merge: E, objectEach: A} = c
          , I = {
            ajax: function(a) {
                const c = {
                    json: "application/json",
                    xml: "application/xml",
                    text: "text/plain",
                    octet: "application/octet-stream"
                }
                  , b = new XMLHttpRequest;
                if (!a.url)
                    return !1;
                b.open((a.type || "get").toUpperCase(), a.url, !0);
                a.headers && a.headers["Content-Type"] || b.setRequestHeader("Content-Type", c[a.dataType || "json"] || c.text);
                A(a.headers, function(a, c) {
                    b.setRequestHeader(c, a)
                });
                a.responseType && (b.responseType = a.responseType);
                b.onreadystatechange = function() {
                    let c;
                    if (4 === b.readyState) {
                        if (200 === b.status) {
                            if ("blob" !== a.responseType && (c = b.responseText,
                            "json" === a.dataType))
                                try {
                                    c = JSON.parse(c)
                                } catch (B) {
                                    if (B instanceof Error) {
                                        a.error && a.error(b, B);
                                        return
                                    }
                                }
                            return a.success && a.success(c, b)
                        }
                        a.error && a.error(b, b.responseText)
                    }
                }
                ;
                a.data && "string" !== typeof a.data && (a.data = JSON.stringify(a.data));
                b.send(a.data)
            },
            getJSON: function(a, b) {
                I.ajax({
                    url: a,
                    success: b,
                    dataType: "json",
                    headers: {
                        "Content-Type": "text/plain"
                    }
                })
            },
            post: function(a, c, h) {
                const q = d("form", E({
                    method: "post",
                    action: a,
                    enctype: "multipart/form-data"
                }, h), {
                    display: "none"
                }, b.body);
                A(c, function(a, b) {
                    d("input", {
                        type: "hidden",
                        name: b,
                        value: a
                    }, void 0, q)
                });
                q.submit();
                v(q)
            }
        };
        "";
        return I
    });
    c(a, "Extensions/Data.js", [a["Core/Chart/Chart.js"], a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/HttpUtilities.js"], a["Core/Series/Point.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, c, h, q, v, E, A) {
        function b(f) {
            return !(!f || !(f.rowsURL || f.csvURL || f.columnsURL))
        }
        const {getOptions: d} = c
          , {doc: L} = h
          , {ajax: H} = q
          , {seriesTypes: F} = E
          , {addEvent: B, defined: C, extend: M, fireEvent: N, isNumber: J, merge: x, objectEach: O, pick: G, splat: P} = A;
        class D {
            static data(f, a={}, k) {
                return new D(f,a,k)
            }
            static rowsToColumns(f) {
                let a, k, n, e, g;
                if (f)
                    for (g = [],
                    k = f.length,
                    a = 0; a < k; a++)
                        for (e = f[a].length,
                        n = 0; n < e; n++)
                            g[n] || (g[n] = []),
                            g[n][a] = f[a][n];
                return g
            }
            constructor(a, l={}, k) {
                this.rowsToColumns = D.rowsToColumns;
                this.dateFormats = {
                    "YYYY/mm/dd": {
                        regex: /^([0-9]{4})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{1,2})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[1], a[2] - 1, +a[3]) : NaN
                        }
                    },
                    "dd/mm/YYYY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3], a[2] - 1, +a[1]) : NaN
                        },
                        alternative: "mm/dd/YYYY"
                    },
                    "mm/dd/YYYY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3], a[1] - 1, +a[2]) : NaN
                        }
                    },
                    "dd/mm/YY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                        parser: function(a) {
                            if (!a)
                                return NaN;
                            let f = +a[3];
                            f = f > (new Date).getFullYear() - 2E3 ? f + 1900 : f + 2E3;
                            return Date.UTC(f, a[2] - 1, +a[1])
                        },
                        alternative: "mm/dd/YY"
                    },
                    "mm/dd/YY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3] + 2E3, a[1] - 1, +a[2]) : NaN
                        }
                    }
                };
                this.chart = k;
                this.chartOptions = l;
                this.options = a;
                this.rawColumns = [];
                this.init(a, l, k)
            }
            init(a, l, k) {
                let f = a.decimalPoint, e;
                l && (this.chartOptions = l);
                k && (this.chart = k);
                "." !== f && "," !== f && (f = void 0);
                this.options = a;
                this.columns = a.columns || this.rowsToColumns(a.rows) || [];
                this.firstRowAsNames = G(a.firstRowAsNames, this.firstRowAsNames, !0);
                this.decimalRegex = f && new RegExp("^(-?[0-9]+)" + f + "([0-9]+)$");
                void 0 !== this.liveDataTimeout && clearTimeout(this.liveDataTimeout);
                this.rawColumns = [];
                this.columns.length && (this.dataFound(),
                e = !b(a));
                e || (e = this.fetchLiveData());
                e || (e = !!this.parseCSV().length);
                e || (e = !!this.parseTable().length);
                e || (e = this.parseGoogleSpreadsheet());
                !e && a.afterComplete && a.afterComplete()
            }
            getColumnDistribution() {
                const a = this.chartOptions;
                var l = this.options;
                const k = []
                  , b = function(a) {
                    return (F[a || "line"].prototype.pointArrayMap || [0]).length
                }
                  , e = a && a.chart && a.chart.type
                  , g = []
                  , c = [];
                l = l && l.seriesMapping || a && a.series && a.series.map(function() {
                    return {
                        x: 0
                    }
                }) || [];
                let z = 0, p;
                (a && a.series || []).forEach(a => {
                    g.push(b(a.type || e))
                }
                );
                l.forEach(a => {
                    k.push(a.x || 0)
                }
                );
                0 === k.length && k.push(0);
                l.forEach(f => {
                    const l = new K
                      , k = g[z] || b(e)
                      , n = (a && a.series || [])[z] || {}
                      , u = F[n.type || e || "line"].prototype.pointArrayMap
                      , r = u || ["y"];
                    (C(f.x) || n.isCartesian || !u) && l.addColumnReader(f.x, "x");
                    O(f, function(a, f) {
                        "x" !== f && l.addColumnReader(a, f)
                    });
                    for (p = 0; p < k; p++)
                        l.hasReader(r[p]) || l.addColumnReader(void 0, r[p]);
                    c.push(l);
                    z++
                }
                );
                l = F[e || "line"].prototype.pointArrayMap;
                "undefined" === typeof l && (l = ["y"]);
                this.valueCount = {
                    global: b(e),
                    xColumns: k,
                    individual: g,
                    seriesBuilders: c,
                    globalPointArrayMap: l
                }
            }
            dataFound() {
                this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
                this.getColumnDistribution();
                this.parseTypes();
                !1 !== this.parsed() && this.complete()
            }
            parseCSV(a) {
                function f(a, f, e, l) {
                    function k(f) {
                        m = a[f];
                        d = a[f - 1];
                        h = a[f + 1]
                    }
                    function c(a) {
                        r.length < t + 1 && r.push([a]);
                        r[t][r[t].length - 1] !== a && r[t].push(a)
                    }
                    function b() {
                        z > w || w > p ? (++w,
                        u = "") : (!isNaN(parseFloat(u)) && isFinite(u) ? (u = parseFloat(u),
                        c("number")) : isNaN(Date.parse(u)) ? c("string") : (u = u.replace(/\//g, "-"),
                        c("date")),
                        g.length < t + 1 && g.push([]),
                        e || (g[t][f] = u),
                        u = "",
                        ++t,
                        ++w)
                    }
                    let n = 0
                      , m = ""
                      , d = ""
                      , h = ""
                      , u = ""
                      , w = 0
                      , t = 0;
                    if (a.trim().length && "#" !== a.trim()[0]) {
                        for (; n < a.length; n++)
                            if (k(n),
                            '"' === m)
                                for (k(++n); n < a.length && ('"' !== m || '"' === d || '"' === h); ) {
                                    if ('"' !== m || '"' === m && '"' !== d)
                                        u += m;
                                    k(++n)
                                }
                            else
                                l && l[m] ? l[m](m, u) && b() : m === q ? b() : u += m;
                        b()
                    }
                }
                function k(a) {
                    let f = 0
                      , l = 0
                      , k = !1;
                    a.some(function(a, e) {
                        let k = !1, c, g, b = "";
                        if (13 < e)
                            return !0;
                        for (let n = 0; n < a.length; n++) {
                            e = a[n];
                            c = a[n + 1];
                            g = a[n - 1];
                            if ("#" === e)
                                break;
                            if ('"' === e)
                                if (k) {
                                    if ('"' !== g && '"' !== c) {
                                        for (; " " === c && n < a.length; )
                                            c = a[++n];
                                        "undefined" !== typeof m[c] && m[c]++;
                                        k = !1
                                    }
                                } else
                                    k = !0;
                            else
                                "undefined" !== typeof m[e] ? (b = b.trim(),
                                isNaN(Date.parse(b)) ? !isNaN(b) && isFinite(b) || m[e]++ : m[e]++,
                                b = "") : b += e;
                            "," === e && l++;
                            "." === e && f++
                        }
                    });
                    k = m[";"] > m[","] ? ";" : ",";
                    c.decimalPoint || (c.decimalPoint = f > l ? "." : ",",
                    e.decimalRegex = new RegExp("^(-?[0-9]+)" + c.decimalPoint + "([0-9]+)$"));
                    return k
                }
                function b(a, f) {
                    const l = []
                      , k = [];
                    let b, g = [], n = 0, m = !1, d;
                    if (!f || f > a.length)
                        f = a.length;
                    for (; n < f; n++)
                        if ("undefined" !== typeof a[n] && a[n] && a[n].length)
                            for (b = a[n].trim().replace(/\//g, " ").replace(/\-/g, " ").replace(/\./g, " ").split(" "),
                            g = ["", "", ""],
                            d = 0; d < b.length; d++)
                                d < g.length && (b[d] = parseInt(b[d], 10),
                                b[d] && (k[d] = !k[d] || k[d] < b[d] ? b[d] : k[d],
                                "undefined" !== typeof l[d] ? l[d] !== b[d] && (l[d] = !1) : l[d] = b[d],
                                31 < b[d] ? g[d] = 100 > b[d] ? "YY" : "YYYY" : 12 < b[d] && 31 >= b[d] ? (g[d] = "dd",
                                m = !0) : g[d].length || (g[d] = "mm")));
                    if (m) {
                        for (d = 0; d < l.length; d++)
                            !1 !== l[d] ? 12 < k[d] && "YY" !== g[d] && "YYYY" !== g[d] && (g[d] = "YY") : 12 < k[d] && "mm" === g[d] && (g[d] = "dd");
                        3 === g.length && "dd" === g[1] && "dd" === g[2] && (g[2] = "YY");
                        a = g.join("/");
                        return (c.dateFormats || e.dateFormats)[a] ? a : (N("deduceDateFailed"),
                        "YYYY/mm/dd")
                    }
                    return "YYYY/mm/dd"
                }
                const e = this
                  , g = this.columns = []
                  , c = a || this.options
                  , z = "undefined" !== typeof c.startColumn && c.startColumn ? c.startColumn : 0
                  , p = c.endColumn || Number.MAX_VALUE
                  , r = []
                  , m = {
                    ",": 0,
                    ";": 0,
                    "\t": 0
                };
                var d = c.csv;
                a = "undefined" !== typeof c.startRow && c.startRow ? c.startRow : 0;
                let h = c.endRow || Number.MAX_VALUE, q, t = 0;
                d && c.beforeParse && (d = c.beforeParse.call(this, d));
                if (d) {
                    d = d.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(c.lineDelimiter || "\n");
                    if (!a || 0 > a)
                        a = 0;
                    if (!h || h >= d.length)
                        h = d.length - 1;
                    c.itemDelimiter ? q = c.itemDelimiter : (q = null,
                    q = k(d));
                    let e = 0;
                    for (t = a; t <= h; t++)
                        "#" === d[t][0] ? e++ : f(d[t], t - a - e);
                    c.columnTypes && 0 !== c.columnTypes.length || !r.length || !r[0].length || "date" !== r[0][1] || c.dateFormat || (c.dateFormat = b(g[0]));
                    this.dataFound()
                }
                return g
            }
            parseTable() {
                var a = this.options;
                const l = this.columns || []
                  , k = a.startRow || 0
                  , c = a.endRow || Number.MAX_VALUE
                  , e = a.startColumn || 0
                  , g = a.endColumn || Number.MAX_VALUE;
                a.table && (a = a.table,
                "string" === typeof a && (a = L.getElementById(a)),
                [].forEach.call(a.getElementsByTagName("tr"), (a, f) => {
                    f >= k && f <= c && [].forEach.call(a.children, (a, c) => {
                        const b = l[c - e];
                        let d = 1;
                        if (("TD" === a.tagName || "TH" === a.tagName) && c >= e && c <= g)
                            for (l[c - e] || (l[c - e] = []),
                            l[c - e][f - k] = a.innerHTML; f - k >= d && void 0 === b[f - k - d]; )
                                b[f - k - d] = null,
                                d++
                    }
                    )
                }
                ),
                this.dataFound());
                return l
            }
            fetchLiveData() {
                function a(f) {
                    function b(b, g, n) {
                        function m() {
                            e && k.liveDataURL === b && (l.liveDataTimeout = setTimeout(a, h))
                        }
                        if (!b || !/^(http|\/|\.\/|\.\.\/)/.test(b))
                            return b && c.error && c.error("Invalid URL"),
                            !1;
                        f && (clearTimeout(l.liveDataTimeout),
                        k.liveDataURL = b);
                        H({
                            url: b,
                            dataType: n || "json",
                            success: function(a) {
                                k && k.series && g(a);
                                m()
                            },
                            error: function(a, f) {
                                3 > ++d && m();
                                return c.error && c.error(f, a)
                            }
                        });
                        return !0
                    }
                    b(g.csvURL, function(a) {
                        k.update({
                            data: {
                                csv: a
                            }
                        })
                    }, "text") || b(g.rowsURL, function(a) {
                        k.update({
                            data: {
                                rows: a
                            }
                        })
                    }) || b(g.columnsURL, function(a) {
                        k.update({
                            data: {
                                columns: a
                            }
                        })
                    })
                }
                const l = this
                  , k = this.chart
                  , c = this.options
                  , e = c.enablePolling
                  , g = x(c);
                let d = 0
                  , h = 1E3 * (c.dataRefreshRate || 2);
                if (!b(c))
                    return !1;
                1E3 > h && (h = 1E3);
                delete c.csvURL;
                delete c.rowsURL;
                delete c.columnsURL;
                a(!0);
                return b(c)
            }
            parseGoogleSpreadsheet() {
                function a(f) {
                    const e = ["https://sheets.googleapis.com/v4/spreadsheets", d, "values", h(), "?alt=json&majorDimension=COLUMNS&valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING&key=" + b.googleAPIKey].join("/");
                    H({
                        url: e,
                        dataType: "json",
                        success: function(e) {
                            f(e);
                            b.enablePolling && (c.liveDataTimeout = setTimeout(function() {
                                a(f)
                            }, g))
                        },
                        error: function(a, f) {
                            return b.error && b.error(f, a)
                        }
                    })
                }
                const c = this
                  , b = this.options
                  , d = b.googleSpreadsheetKey
                  , e = this.chart
                  , g = Math.max(1E3 * (b.dataRefreshRate || 2), 4E3)
                  , h = () => {
                    if (b.googleSpreadsheetRange)
                        return b.googleSpreadsheetRange;
                    const a = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(b.startColumn || 0) || "A") + ((b.startRow || 0) + 1);
                    let f = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(G(b.endColumn, -1)) || "ZZ";
                    C(b.endRow) && (f += b.endRow + 1);
                    return `${a}:${f}`
                }
                ;
                d && (delete b.googleSpreadsheetKey,
                a(function(a) {
                    a = a.values;
                    if (!a || 0 === a.length)
                        return !1;
                    const f = a.reduce( (a, f) => Math.max(a, f.length), 0);
                    a.forEach(a => {
                        for (let b = 0; b < f; b++)
                            "undefined" === typeof a[b] && (a[b] = null)
                    }
                    );
                    e && e.series ? e.update({
                        data: {
                            columns: a
                        }
                    }) : (c.columns = a,
                    c.dataFound())
                }));
                return !1
            }
            trim(a, b) {
                "string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""),
                b && /^-?[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")),
                this.decimalRegex && (a = a.replace(this.decimalRegex, "$1.$2")));
                return a
            }
            parseTypes() {
                const a = this.columns || [];
                let b = a.length;
                for (; b--; )
                    this.parseColumn(a[b], b)
            }
            parseColumn(a, b) {
                const c = this.rawColumns
                  , f = this.columns
                  , e = this.firstRowAsNames
                  , g = -1 !== this.valueCount.xColumns.indexOf(b)
                  , d = [];
                var l = this.chartOptions;
                const h = (this.options.columnTypes || [])[b];
                l = g && (l && l.xAxis && "category" === P(l.xAxis)[0].type || "string" === h);
                const r = C(a.name);
                let m = a.length;
                let q, v, x, t, w;
                for (c[b] || (c[b] = []); m--; ) {
                    var y = d[m] || a[m];
                    v = this.trim(y);
                    x = this.trim(y, !0);
                    q = parseFloat(x);
                    "undefined" === typeof c[b][m] && (c[b][m] = v);
                    l || 0 === m && e && !r ? a[m] = "" + v : +x === q ? (a[m] = q,
                    31536E6 < q && "float" !== h ? a.isDatetime = !0 : a.isNumeric = !0,
                    "undefined" !== typeof a[m + 1] && (w = q > a[m + 1])) : (v && v.length && (t = this.parseDate(y)),
                    g && J(t) && "float" !== h ? (d[m] = y,
                    a[m] = t,
                    a.isDatetime = !0,
                    "undefined" !== typeof a[m + 1] && (y = t > a[m + 1],
                    y !== w && "undefined" !== typeof w && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat,
                    m = a.length,
                    this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a.unsorted = !0),
                    w = y)) : (a[m] = "" === v ? null : v,
                    0 !== m && (a.isDatetime || a.isNumeric) && (a.mixed = !0)))
                }
                g && a.mixed && (f[b] = c[b]);
                if (g && w && this.options.sort)
                    for (b = 0; b < f.length; b++)
                        f[b].reverse(),
                        e && f[b].unshift(f[b].pop())
            }
            parseDate(a) {
                var b = this.options.parseDate;
                let c, f, e = this.options.dateFormat || this.dateFormat, d;
                if (b)
                    c = b(a);
                else if ("string" === typeof a) {
                    if (e)
                        (b = this.dateFormats[e]) || (b = this.dateFormats["YYYY/mm/dd"]),
                        (d = a.match(b.regex)) && (c = b.parser(d));
                    else
                        for (f in this.dateFormats)
                            if (b = this.dateFormats[f],
                            d = a.match(b.regex)) {
                                this.dateFormat = f;
                                this.alternativeFormat = b.alternative;
                                c = b.parser(d);
                                break
                            }
                    d || (a.match(/:.+(GMT|UTC|[Z+-])/) && (a = a.replace(/\s*(?:GMT|UTC)?([+-])(\d\d)(\d\d)$/, "$1$2:$3").replace(/(?:\s+|GMT|UTC)([+-])/, "$1").replace(/(\d)\s*(?:GMT|UTC|Z)$/, "$1+00:00")),
                    d = Date.parse(a),
                    "object" === typeof d && null !== d && d.getTime ? c = d.getTime() - 6E4 * d.getTimezoneOffset() : J(d) && (c = d - 6E4 * (new Date(d)).getTimezoneOffset()))
                }
                return c
            }
            getData() {
                if (this.columns)
                    return this.rowsToColumns(this.columns).slice(1)
            }
            parsed() {
                if (this.options.parsed)
                    return this.options.parsed.call(this, this.columns)
            }
            complete() {
                var a = this.columns;
                const b = this.options
                  , c = [];
                let d;
                var e, g;
                if (b.complete || b.afterComplete) {
                    if (this.firstRowAsNames)
                        for (e = 0; e < a.length; e++) {
                            var h = a[e];
                            C(h.name) || (h.name = G(h.shift(), "").toString())
                        }
                    h = [];
                    {
                        var q = a.length;
                        var p = this.valueCount.seriesBuilders;
                        e = [];
                        var r = [];
                        let b;
                        for (g = 0; g < q; g += 1)
                            e.push(!0);
                        for (q = 0; q < p.length; q += 1)
                            for (b = p[q].getReferencedColumnIndexes(),
                            g = 0; g < b.length; g += 1)
                                e[b[g]] = !1;
                        for (g = 0; g < e.length; g += 1)
                            e[g] && r.push(g)
                    }
                    for (e = 0; e < this.valueCount.seriesBuilders.length; e++)
                        p = this.valueCount.seriesBuilders[e],
                        p.populateColumns(r) && c.push(p);
                    for (; 0 < r.length; ) {
                        p = new K;
                        p.addColumnReader(0, "x");
                        e = r.indexOf(0);
                        -1 !== e && r.splice(e, 1);
                        for (e = 0; e < this.valueCount.global; e++)
                            p.addColumnReader(void 0, this.valueCount.globalPointArrayMap[e]);
                        p.populateColumns(r) && c.push(p)
                    }
                    0 < c.length && 0 < c[0].readers.length && (p = a[c[0].readers[0].columnIndex],
                    "undefined" !== typeof p && (p.isDatetime ? d = "datetime" : p.isNumeric || (d = "category")));
                    if ("category" === d)
                        for (e = 0; e < c.length; e++)
                            for (p = c[e],
                            r = 0; r < p.readers.length; r++)
                                "x" === p.readers[r].configName && (p.readers[r].configName = "name");
                    for (e = 0; e < c.length; e++) {
                        p = c[e];
                        r = [];
                        for (g = 0; g < a[0].length; g++)
                            r[g] = p.read(a, g);
                        h[e] = {
                            data: r
                        };
                        p.name && (h[e].name = p.name);
                        "category" === d && (h[e].turboThreshold = 0)
                    }
                    a = {
                        series: h
                    };
                    d && (a.xAxis = {
                        type: d
                    },
                    "category" === d && (a.xAxis.uniqueNames = !1));
                    b.complete && b.complete(a);
                    b.afterComplete && b.afterComplete(a)
                }
            }
            update(a, b) {
                const c = this.chart
                  , d = c.options;
                a && (a.afterComplete = function(a) {
                    a && (a.xAxis && c.xAxis[0] && a.xAxis.type === c.xAxis[0].options.type && delete a.xAxis,
                    c.update(a, b, !0))
                }
                ,
                x(!0, d.data, a),
                d.data && d.data.googleSpreadsheetKey && !a.columns && delete d.data.columns,
                this.init(d.data))
            }
        }
        B(a, "init", function(a) {
            const b = this
              , c = a.args[1];
            var f = d().data;
            let e = a.args[0] || {};
            (f || e && e.data) && !b.hasDataDef && (b.hasDataDef = !0,
            f = x(f, e.data),
            b.data = new D(M(f, {
                afterComplete: function(a) {
                    let d, f;
                    if (Object.hasOwnProperty.call(e, "series"))
                        if ("object" === typeof e.series)
                            for (d = Math.max(e.series.length, a && a.series ? a.series.length : 0); d--; )
                                f = e.series[d] || {},
                                e.series[d] = x(f, a && a.series ? a.series[d] : {});
                        else
                            delete e.series;
                    e = x(a, e);
                    b.init(e, c)
                }
            }),e,b),
            a.preventDefault())
        });
        class K {
            constructor() {
                this.readers = [];
                this.pointIsArray = !0
            }
            populateColumns(a) {
                let b = !0;
                this.readers.forEach(b => {
                    "undefined" === typeof b.columnIndex && (b.columnIndex = a.shift())
                }
                );
                this.readers.forEach(a => {
                    "undefined" === typeof a.columnIndex && (b = !1)
                }
                );
                return b
            }
            read(a, b) {
                const c = this.pointIsArray
                  , d = c ? [] : {};
                this.readers.forEach(e => {
                    const f = a[e.columnIndex][b];
                    c ? d.push(f) : 0 < e.configName.indexOf(".") ? v.prototype.setNestedProperty(d, f, e.configName) : d[e.configName] = f
                }
                );
                if ("undefined" === typeof this.name && 2 <= this.readers.length) {
                    const b = [];
                    this.readers.forEach(function(a) {
                        "x" !== a.configName && "name" !== a.configName && "y" !== a.configName || "undefined" === typeof a.columnIndex || b.push(a.columnIndex)
                    });
                    2 <= b.length && (b.shift(),
                    b.sort(function(a, b) {
                        return a - b
                    }),
                    this.name = a[b.shift()].name)
                }
                return d
            }
            addColumnReader(a, b) {
                this.readers.push({
                    columnIndex: a,
                    configName: b
                });
                "x" !== b && "y" !== b && "undefined" !== typeof b && (this.pointIsArray = !1)
            }
            getReferencedColumnIndexes() {
                const a = [];
                let b, c;
                for (b = 0; b < this.readers.length; b += 1)
                    c = this.readers[b],
                    "undefined" !== typeof c.columnIndex && a.push(c.columnIndex);
                return a
            }
            hasReader(a) {
                let b, c;
                for (b = 0; b < this.readers.length; b += 1)
                    if (c = this.readers[b],
                    c.configName === a)
                        return !0
            }
        }
        "";
        return D
    });
    c(a, "masters/modules/data.src.js", [a["Core/Globals.js"], a["Core/HttpUtilities.js"], a["Extensions/Data.js"]], function(a, c, h) {
        a.ajax = c.ajax;
        a.data = h.data;
        a.getJSON = c.getJSON;
        a.post = c.post;
        a.Data = h;
        a.HttpUtilities = c
    })
});
//# sourceMappingURL=data.js.map
