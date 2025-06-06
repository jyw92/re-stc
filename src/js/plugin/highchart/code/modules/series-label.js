/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(a) {
    "object" === typeof module && module.exports ? (a["default"] = a,
    module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/series-label", ["highcharts"], function(x) {
        a(x);
        a.Highcharts = x;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
}
)(function(a) {
    function x(a, q, C, f) {
        a.hasOwnProperty(q) || (a[q] = f.apply(null, C),
        "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{
            detail: {
                path: q,
                module: a[q]
            }
        })))
    }
    a = a ? a._modules : {};
    x(a, "Extensions/SeriesLabel/SeriesLabelDefaults.js", [], function() {
        return {
            enabled: !0,
            connectorAllowed: !1,
            connectorNeighbourDistance: 24,
            format: void 0,
            formatter: void 0,
            minFontSize: null,
            maxFontSize: null,
            onArea: null,
            style: {
                fontSize: "0.8em",
                fontWeight: "bold"
            },
            useHTML: !1,
            boxesToAvoid: []
        }
    });
    x(a, "Extensions/SeriesLabel/SeriesLabelUtilities.js", [], function() {
        function a(a, f, q, y, m, w) {
            a = (w - f) * (q - a) - (y - f) * (m - a);
            return 0 < a ? !0 : !(0 > a)
        }
        function q(C, f, q, y, m, w, A, B) {
            return a(C, f, m, w, A, B) !== a(q, y, m, w, A, B) && a(C, f, q, y, m, w) !== a(C, f, q, y, A, B)
        }
        return {
            boxIntersectLine: function(a, f, x, y, m, w, A, B) {
                return q(a, f, a + x, f, m, w, A, B) || q(a + x, f, a + x, f + y, m, w, A, B) || q(a, f + y, a + x, f + y, m, w, A, B) || q(a, f, a, f + y, m, w, A, B)
            },
            intersectRect: function(a, f) {
                return !(f.left > a.right || f.right < a.left || f.top > a.bottom || f.bottom < a.top)
            }
        }
    });
    x(a, "Extensions/SeriesLabel/SeriesLabel.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Chart/Chart.js"], a["Core/Templating.js"], a["Core/Defaults.js"], a["Extensions/SeriesLabel/SeriesLabelDefaults.js"], a["Extensions/SeriesLabel/SeriesLabelUtilities.js"], a["Core/Utilities.js"]], function(a, q, x, f, P, y, m) {
        function w(t, a, r, b, k) {
            const d = t.chart
              , h = t.options.label || {}
              , e = E(h.onArea, !!t.area)
              , g = e || h.connectorAllowed;
            var c = d.boxesToAvoid;
            let G = Number.MAX_VALUE
              , f = Number.MAX_VALUE;
            var n;
            let q;
            var D;
            let u, z;
            for (z = 0; c && z < c.length; z += 1)
                if (Q(c[z], {
                    left: a,
                    right: a + b.width,
                    top: r,
                    bottom: r + b.height
                }))
                    return !1;
            for (z = 0; z < d.series.length; z += 1) {
                const F = d.series[z];
                c = F.interpolatedPoints && [...F.interpolatedPoints];
                if (F.visible && c) {
                    var l = d.plotHeight / 10;
                    for (D = d.plotTop; D <= d.plotTop + d.plotHeight; D += l)
                        c.unshift({
                            chartX: d.plotLeft,
                            chartY: D
                        }),
                        c.push({
                            chartX: d.plotLeft + d.plotWidth,
                            chartY: D
                        });
                    for (l = 1; l < c.length; l += 1) {
                        if (c[l].chartX >= a - 16 && c[l - 1].chartX <= a + b.width + 16) {
                            if (K(a, r, b.width, b.height, c[l - 1].chartX, c[l - 1].chartY, c[l].chartX, c[l].chartY))
                                return !1;
                            t === F && !n && k && (n = K(a - 16, r - 16, b.width + 32, b.height + 32, c[l - 1].chartX, c[l - 1].chartY, c[l].chartX, c[l].chartY))
                        }
                        !g && !n || t === F && !e || (D = a + b.width / 2 - c[l].chartX,
                        u = r + b.height / 2 - c[l].chartY,
                        G = Math.min(G, D * D + u * u))
                    }
                    if (!e && g && t === F && (k && !n || G < Math.pow(h.connectorNeighbourDistance || 1, 2))) {
                        for (l = 1; l < c.length; l += 1)
                            n = Math.min(Math.pow(a + b.width / 2 - c[l].chartX, 2) + Math.pow(r + b.height / 2 - c[l].chartY, 2), Math.pow(a - c[l].chartX, 2) + Math.pow(r - c[l].chartY, 2), Math.pow(a + b.width - c[l].chartX, 2) + Math.pow(r - c[l].chartY, 2), Math.pow(a + b.width - c[l].chartX, 2) + Math.pow(r + b.height - c[l].chartY, 2), Math.pow(a - c[l].chartX, 2) + Math.pow(r + b.height - c[l].chartY, 2)),
                            n < f && (f = n,
                            q = c[l]);
                        n = !0
                    }
                }
            }
            return !k || n ? {
                x: a,
                y: r,
                weight: G - (q ? f : 0),
                connectorPoint: q
            } : !1
        }
        function A(a) {
            a.boxesToAvoid = [];
            const t = a.labelSeries || []
              , r = a.boxesToAvoid;
            a.series.forEach(b => (b.points || []).forEach(a => (a.dataLabels || []).forEach(a => {
                const {width: d, height: k} = a.getBBox()
                  , g = a.translateX + (b.xAxis ? b.xAxis.pos : b.chart.plotLeft);
                a = a.translateY + (b.yAxis ? b.yAxis.pos : b.chart.plotTop);
                r.push({
                    left: g,
                    top: a,
                    right: g + d,
                    bottom: a + k
                })
            }
            )));
            t.forEach(function(b) {
                const a = b.options.label || {};
                b.interpolatedPoints = B(b);
                r.push(...a.boxesToAvoid || [])
            });
            a.series.forEach(function(b) {
                function k(b, a, d) {
                    const c = Math.max(r, E(x, -Infinity))
                      , e = Math.min(r + f, E(y, Infinity));
                    return b > c && b <= e - d.width && a >= n && a <= n + q - d.height
                }
                var d = b.options.label;
                if (d && (b.xAxis || b.yAxis)) {
                    var h = "highcharts-color-" + E(b.colorIndex, "none"), t = !b.labelBySeries, g = d.minFontSize, c = d.maxFontSize, e = a.inverted, r = e ? b.yAxis.pos : b.xAxis.pos, n = e ? b.xAxis.pos : b.yAxis.pos, f = a.inverted ? b.yAxis.len : b.xAxis.len, q = a.inverted ? b.xAxis.len : b.yAxis.len, u = b.interpolatedPoints, z = E(d.onArea, !!b.area), l = [], m = b.xData || [], p, v = b.labelBySeries;
                    if (z && !e) {
                        e = [b.xAxis.toPixels(m[0]), b.xAxis.toPixels(m[m.length - 1])];
                        var x = Math.min.apply(Math, e);
                        var y = Math.max.apply(Math, e)
                    }
                    if (b.visible && !b.boosted && u) {
                        v || (v = b.name,
                        "string" === typeof d.format ? v = R(d.format, b, a) : d.formatter && (v = d.formatter.call(b)),
                        b.labelBySeries = v = a.renderer.label(v, 0, 0, "connector", 0, 0, d.useHTML).addClass("highcharts-series-label highcharts-series-label-" + b.index + " " + (b.options.className || "") + " " + h),
                        a.renderer.styledMode || (h = "string" === typeof b.color ? b.color : "#666666",
                        v.css(L({
                            color: z ? a.renderer.getContrast(h) : h
                        }, d.style || {})),
                        v.attr({
                            opacity: a.renderer.forExport ? 1 : 0,
                            stroke: b.color,
                            "stroke-width": 1
                        })),
                        g && c && v.css({
                            fontSize: g + (b.sum || 0) / (b.chart.labelSeriesMaxSum || 0) * (c - g) + "px"
                        }),
                        v.attr({
                            padding: 0,
                            zIndex: 3
                        }).add());
                        g = v.getBBox();
                        g.width = Math.round(g.width);
                        for (e = u.length - 1; 0 < e; --e)
                            z ? (c = u[e].chartX - g.width / 2,
                            h = (u[e].chartCenterY || 0) - g.height / 2,
                            k(c, h, g) && (p = w(b, c, h, g))) : (c = u[e].chartX + 3,
                            h = u[e].chartY - g.height - 3,
                            k(c, h, g) && (p = w(b, c, h, g, !0)),
                            p && l.push(p),
                            c = u[e].chartX + 3,
                            h = u[e].chartY + 3,
                            k(c, h, g) && (p = w(b, c, h, g, !0)),
                            p && l.push(p),
                            c = u[e].chartX - g.width - 3,
                            h = u[e].chartY + 3,
                            k(c, h, g) && (p = w(b, c, h, g, !0)),
                            p && l.push(p),
                            c = u[e].chartX - g.width - 3,
                            h = u[e].chartY - g.height - 3,
                            k(c, h, g) && (p = w(b, c, h, g, !0))),
                            p && l.push(p);
                        if (d.connectorAllowed && !l.length && !z)
                            for (c = r + f - g.width; c >= r; c -= 16)
                                for (h = n; h < n + q - g.height; h += 16)
                                    (p = w(b, c, h, g, !0)) && l.push(p);
                        if (l.length) {
                            if (l.sort( (b, a) => a.weight - b.weight),
                            p = l[0],
                            (a.boxesToAvoid || []).push({
                                left: p.x,
                                right: p.x + g.width,
                                top: p.y,
                                bottom: p.y + g.height
                            }),
                            (l = Math.sqrt(Math.pow(Math.abs(p.x - (v.x || 0)), 2) + Math.pow(Math.abs(p.y - (v.y || 0)), 2))) && b.labelBySeries) {
                                d = {
                                    opacity: a.renderer.forExport ? 1 : 0,
                                    x: p.x,
                                    y: p.y
                                };
                                u = {
                                    opacity: 1
                                };
                                10 >= l && (u = {
                                    x: d.x,
                                    y: d.y
                                },
                                d = {});
                                let c;
                                t && (c = I(b.options.animation),
                                c.duration *= .2);
                                b.labelBySeries.attr(L(d, {
                                    anchorX: p.connectorPoint && (p.connectorPoint.plotX || 0) + r,
                                    anchorY: p.connectorPoint && (p.connectorPoint.plotY || 0) + n
                                })).animate(u, c);
                                b.options.kdNow = !0;
                                b.buildKDTree();
                                if (b = b.searchPoint({
                                    chartX: p.x,
                                    chartY: p.y
                                }, !0))
                                    v.closest = [b, p.x - (b.plotX || 0), p.y - (b.plotY || 0)]
                            }
                        } else
                            v && (b.labelBySeries = v.destroy())
                    } else
                        v && (b.labelBySeries = v.destroy())
                }
            });
            S(a, "afterDrawSeriesLabels")
        }
        function B(a) {
            function e(a) {
                const c = Math.round((a.plotX || 0) / 8) + "," + Math.round((a.plotY || 0) / 8);
                t[c] || (t[c] = 1,
                b.push(a))
            }
            if (a.xAxis || a.yAxis) {
                var r = a.points
                  , b = []
                  , k = a.graph || a.area
                  , d = k && k.element
                  , h = a.chart.inverted
                  , f = a.xAxis
                  , g = a.yAxis
                  , c = h ? g.pos : f.pos;
                h = h ? f.pos : g.pos;
                f = E((a.options.label || {}).onArea, !!a.area);
                var q = g.getThreshold(a.options.threshold)
                  , t = {};
                if (a.getPointSpline && d && d.getPointAtLength && !f && r.length < (a.chart.plotSizeX || 0) / 16) {
                    var n = k.toD && k.attr("d");
                    k.toD && k.attr({
                        d: k.toD
                    });
                    g = d.getTotalLength();
                    for (a = 0; a < g; a += 16)
                        f = d.getPointAtLength(a),
                        e({
                            chartX: c + f.x,
                            chartY: h + f.y,
                            plotX: f.x,
                            plotY: f.y
                        });
                    n && k.attr({
                        d: n
                    });
                    r = r[r.length - 1];
                    e({
                        chartX: c + (r.plotX || 0),
                        chartY: h + (r.plotY || 0)
                    })
                } else
                    for (g = r.length,
                    a = 0; a < g; a += 1) {
                        d = r[a];
                        const {plotX: b, plotY: g, plotHigh: t} = d;
                        if (H(b) && H(g)) {
                            k = {
                                plotX: b,
                                plotY: g,
                                chartX: c + b,
                                chartY: h + g
                            };
                            f && (t && (k.plotY = t,
                            k.chartY = h + t),
                            k.chartCenterY = h + ((t ? t : g) + E(d.yBottom, q)) / 2);
                            if (n) {
                                d = Math.abs(k.chartX - n.chartX);
                                var m = Math.abs(k.chartY - n.chartY);
                                d = Math.max(d, m);
                                if (16 < d)
                                    for (d = Math.ceil(d / 16),
                                    m = 1; m < d; m += 1)
                                        e({
                                            chartX: n.chartX + m / d * (k.chartX - n.chartX),
                                            chartY: n.chartY + m / d * (k.chartY - n.chartY),
                                            chartCenterY: (n.chartCenterY || 0) + m / d * ((k.chartCenterY || 0) - (n.chartCenterY || 0)),
                                            plotX: (n.plotX || 0) + m / d * (b - (n.plotX || 0)),
                                            plotY: (n.plotY || 0) + m / d * (g - (n.plotY || 0))
                                        })
                            }
                            e(k);
                            n = k
                        }
                    }
                return b
            }
        }
        function C(a) {
            if (this.renderer) {
                const e = this;
                let f = I(e.renderer.globalAnimation).duration;
                e.labelSeries = [];
                e.labelSeriesMaxSum = 0;
                e.seriesLabelTimer && m.clearTimeout(e.seriesLabelTimer);
                e.series.forEach(function(b) {
                    const k = b.options.label || {}
                      , d = b.labelBySeries
                      , h = d && d.closest;
                    k.enabled && b.visible && (b.graph || b.area) && !b.boosted && e.labelSeries && (e.labelSeries.push(b),
                    k.minFontSize && k.maxFontSize && b.yData && (b.sum = b.yData.reduce( (a, b) => (a || 0) + (b || 0), 0),
                    e.labelSeriesMaxSum = Math.max(e.labelSeriesMaxSum || 0, b.sum || 0)),
                    "load" === a.type && (f = Math.max(f, I(b.options.animation).duration)),
                    h && ("undefined" !== typeof h[0].plotX ? d.animate({
                        x: h[0].plotX + h[1],
                        y: h[0].plotY + h[2]
                    }) : d.attr({
                        opacity: 0
                    })))
                });
                e.seriesLabelTimer = T(function() {
                    e.series && e.labelSeries && A(e)
                }, e.renderer.forExport || !f ? 0 : f)
            }
        }
        function O(a, e, f, b, k) {
            const d = k && k.anchorX;
            k = k && k.anchorY;
            let h, m, g = f / 2;
            H(d) && H(k) && (h = [["M", d, k]],
            m = e - k,
            0 > m && (m = -b - m),
            m < f && (g = d < a + f / 2 ? m : f - m),
            k > e + b ? h.push(["L", a + g, e + b]) : k < e ? h.push(["L", a + g, e]) : d < a ? h.push(["L", a, e + b / 2]) : d > a + f && h.push(["L", a + f, e + b / 2]));
            return h || []
        }
        const {animObject: I} = a
          , {format: R} = x
          , {setOptions: M} = f
          , {boxIntersectLine: K, intersectRect: Q} = y
          , {addEvent: N, extend: L, fireEvent: S, isNumber: H, pick: E, syncTimeout: T} = m
          , J = [];
        "";
        return {
            compose: function(a, e) {
                m.pushUnique(J, a) && (N(q, "load", C),
                N(q, "redraw", C));
                m.pushUnique(J, e) && (e.prototype.symbols.connector = O);
                m.pushUnique(J, M) && M({
                    plotOptions: {
                        series: {
                            label: P
                        }
                    }
                })
            }
        }
    });
    x(a, "masters/modules/series-label.src.js", [a["Core/Globals.js"], a["Extensions/SeriesLabel/SeriesLabel.js"]], function(a, q) {
        q.compose(a.Chart, a.SVGRenderer)
    })
});
//# sourceMappingURL=series-label.js.map
