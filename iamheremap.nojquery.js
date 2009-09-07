/* ======================================================================
    modestmaps.js
   ====================================================================== */

/* ======================================================================
    lib/raphael.js
   ====================================================================== */

/*
 * Raphael 0.7.3 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */


var Raphael = (function () {
    var separator = /[, ]+/,
        create,
        doc = document,
        win = window,
        R = function () {
            return create.apply(R, arguments);
        },
        paper = {},
        availableAttrs = {cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", gradient: 0, height: 0, href: "http://raphaeljs.com/", opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", translation: "0 0", width: 0, x: 0, y: 0},
        availableAnimAttrs = {cx: "number", cy: "number", fill: "colour", "fill-opacity": "number", "font-size": "number", height: "number", opacity: "number", path: "path", r: "number", rotation: "csv", rx: "number", ry: "number", scale: "csv", stroke: "colour", "stroke-opacity": "number", "stroke-width": "number", translation: "csv", width: "number", x: "number", y: "number"},
        events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup"];
    R.version = "0.7.3";
    R.type = (window.SVGAngle ? "SVG" : "VML");
    R.svg = !(R.vml = R.type == "VML");
    R.idGenerator = 0;
    R.fn = {};
    R.toString = function () {
        return  "Your browser " + (this.vml ? "doesn't ": "") + "support" + (this.svg ? "s": "") +
                " SVG.\nYou are running " + unescape("Rapha%EBl%20") + this.version;
    };
    R.setWindow = function (newwin) {
        win = newwin;
        doc = win.document;
    };
    // colour utilities
    R.hsb2rgb = function (hue, saturation, brightness) {
        if (typeof hue == "object" && "h" in hue && "s" in hue && "b" in hue) {
            brightness = hue.b;
            saturation = hue.s;
            hue = hue.h;
        }
        var red,
            green,
            blue;
        if (brightness == 0) {
            return {r: 0, g: 0, b: 0, hex: "#000"};
        }
        if (hue > 1 || saturation > 1 || brightness > 1) {
            hue /= 255;
            saturation /= 255;
            brightness /= 255;
        }
        var i = Math.floor(hue * 6),
            f = (hue * 6) - i,
            p = brightness * (1 - saturation),
            q = brightness * (1 - (saturation * f)),
            t = brightness * (1 - (saturation * (1 - f)));
        red = [brightness, q, p, p, t, brightness, brightness][i];
        green = [t, brightness, brightness, q, p, p, t][i];
        blue = [p, p, t, brightness, brightness, q, p][i];
        red *= 255;
        green *= 255;
        blue *= 255;
        var rgb = {r: red, g: green, b: blue};
        var r = Math.round(red).toString(16);
        if (r.length == 1) {
            r = "0" + r;
        }
        var g = Math.round(green).toString(16);
        if (g.length == 1) {
            g = "0" + g;
        }
        var b = Math.round(blue).toString(16);
        if (b.length == 1) {
            b = "0" + b;
        }
        rgb.hex = "#" + r + g + b;
        return rgb;
    };
    R.rgb2hsb = function (red, green, blue) {
        if (typeof red == "object" && "r" in red && "g" in red && "b" in red) {
            blue = red.b;
            green = red.g;
            red = red.r;
        }
        if (typeof red == "string") {
            var clr = getRGB(red);
            red = clr.r;
            green = clr.g;
            blue = clr.b;
        }
        if (red > 1 || green > 1 || blue > 1) {
            red /= 255;
            green /= 255;
            blue /= 255;
        }
        var max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            hue,
            saturation,
            brightness = max;
        if (min == max) {
            return {h: 0, s: 0, b: max};
        } else {
            var delta = (max - min);
            saturation = delta / max;
            if (red == max) {
                hue = (green - blue) / delta;
            } else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            } else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {h: hue, s: saturation, b: brightness};
    };
    var getRGB = function (colour) {
        var htmlcolors = {aliceblue: "#f0f8ff", amethyst: "#96c", antiquewhite: "#faebd7", aqua: "#0ff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000", blanchedalmond: "#ffebcd", blue: "#00f", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#0ff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#f0f", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#789", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#0f0", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#f0f", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#f00", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#fff", whitesmoke: "#f5f5f5", yellow: "#ff0", yellowgreen: "#9acd32"};
        if (colour.toString().toLowerCase() in htmlcolors) {
            colour = htmlcolors[colour.toString().toLowerCase()];
        }
        if (!colour) {
            return {r: 0, g: 0, b: 0, hex: "#000"};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none"};
        }
        var red, green, blue,
            rgb = colour.match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i);
        if (rgb) {
            if (rgb[2]) {
                blue = parseInt(rgb[2].substring(5), 16);
                green = parseInt(rgb[2].substring(3, 5), 16);
                red = parseInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = parseInt(rgb[3].substring(3) + rgb[3].substring(3), 16);
                green = parseInt(rgb[3].substring(2, 3) + rgb[3].substring(2, 3), 16);
                red = parseInt(rgb[3].substring(1, 2) + rgb[3].substring(1, 2), 16);
            }
            if (rgb[4]) {
                rgb = rgb[4].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10);
                green = parseFloat(rgb[1], 10);
                blue = parseFloat(rgb[2], 10);
            }
            if (rgb[5]) {
                rgb = rgb[5].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10) * 2.55;
                green = parseFloat(rgb[1], 10) * 2.55;
                blue = parseFloat(rgb[2], 10) * 2.55;
            }
            if (rgb[6]) {
                rgb = rgb[6].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10);
                green = parseFloat(rgb[1], 10);
                blue = parseFloat(rgb[2], 10);
                return Raphael.hsb2rgb(red, green, blue);
            }
            if (rgb[7]) {
                rgb = rgb[7].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10) * 2.55;
                green = parseFloat(rgb[1], 10) * 2.55;
                blue = parseFloat(rgb[2], 10) * 2.55;
                return Raphael.hsb2rgb(red, green, blue);
            }
            var rgb = {r: red, g: green, b: blue};
            var r = Math.round(red).toString(16);
            (r.length == 1) && (r = "0" + r);
            var g = Math.round(green).toString(16);
            (g.length == 1) && (g = "0" + g);
            var b = Math.round(blue).toString(16);
            (b.length == 1) && (b = "0" + b);
            rgb.hex = "#" + r + g + b;
            return rgb;
        } else {
            return {r: -1, g: -1, b: -1, hex: "none"};
        }
    };
    R.getColor = function (value) {
        var start = arguments.callee.start = arguments.callee.start || {h: 0, s: 1, b: value || .75};
        var rgb = Raphael.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            if (start.s <= 0) {
                arguments.callee.start = {h: 0, s: 1, b: start.b};
            }
        }
        return rgb.hex;
    };
    R.getColor.reset = function () {
        delete this.start;
    };
    // path utilities
    R.parsePathString = function (pathString) {
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            toString = function () {
                var res = "";
                for (var i = 0, ii = this.length; i < ii; i++) {
                    res += this[i][0] + this[i].join(",").substring(2);
                }
                return res;
            };
        if (pathString.toString.toString() == toString.toString()) {
            return pathString;
        }
        pathString.replace(/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, function (a, b, c) {
            var params = [], name = b.toLowerCase();
            c.replace(/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, function (a, b) {
                b && params.push(+b);
            });
            while (params.length >= paramCounts[name]) {
                data.push([b].concat(params.splice(0, paramCounts[name])));
                if (!paramCounts[name]) {
                    break;
                };
            }
        });
        data.toString = toString;
        return data;
    };
    var pathDimensions = function (path) {
        var pathArray = path;
        if (typeof path == "string") {
            pathArray = Raphael.parsePathString(path);
        }
        pathArray = pathToAbsolute(pathArray);
        var x = [], y = [], length = 0;
        for (var i = 0, ii = pathArray.length; i < ii; i++) {
            switch (pathArray[i][0]) {
                case "Z":
                    break;
                case "A":
                    x.push(pathArray[i][pathArray[i].length - 2]);
                    y.push(pathArray[i][pathArray[i].length - 1]);
                    break;
                default:
                    for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                        if (j % 2) {
                            x.push(pathArray[i][j]);
                        } else {
                            y.push(pathArray[i][j]);
                        }
                    }
            }
        }
        var minx = Math.min.apply(Math, x),
            miny = Math.min.apply(Math, y);
        return {
            x: minx,
            y: miny,
            width: Math.max.apply(Math, x) - minx,
            height: Math.max.apply(Math, y) - miny,
            X: x,
            Y: y
        };
    };
    var pathToRelative = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = R.parsePathString(pathArray);
        }
        var x = 0, y = 0, start = 0;
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            start++;
            res.push(pathArray[0]);
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != pathArray[i][0].toLowerCase()) {
                res[i][0] = pathArray[i][0].toLowerCase();
                switch (res[i][0]) {
                    case "a":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] - x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] - y).toFixed(3);
                        break;
                    case "v":
                        res[i][1] = +(pathArray[i][1] - y).toFixed(3);
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +(pathArray[i][j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "z":
                    break;
                case "h":
                    x += res[i][res[i].length - 1];
                    break;
                case "v":
                    y += res[i][res[i].length - 1];
                    break;
                default:
                    x += res[i][res[i].length - 2];
                    y += res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    var pathToAbsolute = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = R.parsePathString(pathArray);
        }
        var x = 0,
            y = 0,
            start = 0;
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            start++;
            res[0] = pathArray[0];
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != (pathArray[i][0] + "").toUpperCase()) {
                res[i][0] = (pathArray[i][0] + "").toUpperCase();
                switch (res[i][0]) {
                    case "A":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] + x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] + y).toFixed(3);
                        break;
                    case "V":
                        res[i][1] = +pathArray[i][1] + y;
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +pathArray[i][j] + ((j % 2) ? x : y);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "Z":
                    break;
                case "H":
                    x = res[i][1];
                    break;
                case "V":
                    y = res[i][1];
                    break;
                default:
                    x = res[i][res[i].length - 2];
                    y = res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    var pathEqualiser = function (path1, path2) {
        var data = [pathToAbsolute(Raphael.parsePathString(path1)), pathToAbsolute(Raphael.parsePathString(path2))],
            attrs = [{x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}, {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}],
            processPath = function (path, d) {
                if (!path) {
                    return ["U"];
                }
                switch (path[0]) {
                    case "M":
                        d.X = path[1];
                        d.Y = path[2];
                        break;
                    case "S":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["C", nx, ny, path[1], path[2], path[3], path[4]];
                        break;
                    case "T":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["Q", nx, ny, path[1], path[2]];
                        break;
                    case "H":
                        path = ["L", path[1], d.y];
                        break;
                    case "V":
                        path = ["L", d.x, path[1]];
                        break;
                    case "Z":
                        path = ["L", d.X, d.Y];
                        break;
                }
                return path;
            },
            edgeCases = function (a, b, i) {
                if (data[a][i][0] == "M" && data[b][i][0] != "M") {
                    data[b].splice(i, 0, ["M", attrs[b].x, attrs[b].y]);
                    attrs[a].bx = data[a][i][data[a][i].length - 4] || 0;
                    attrs[a].by = data[a][i][data[a][i].length - 3] || 0;
                    attrs[a].x = data[a][i][data[a][i].length - 2];
                    attrs[a].y = data[a][i][data[a][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "L" && data[b][i][0] == "C") {
                    data[a][i] = ["C", attrs[a].x, attrs[a].y, data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "L" && data[b][i][0] == "Q") {
                    data[a][i] = ["Q", data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "Q" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["Q", x, y, x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "A" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["A", 0, 0, data[a][i][3], data[a][i][4], data[a][i][5], x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "U") {
                    data[a][i][0] = data[b][i][0];
                    for (var j = 1, jj = data[b][i].length; j < jj; j++) {
                        data[a][i][j] = (j % 2) ? attrs[a].x : attrs[a].y;
                    }
                }
                return false;
            };
        for (var i = 0; i < Math.max(data[0].length, data[1].length); i++) {
            data[0][i] = processPath(data[0][i], attrs[0]);
            data[1][i] = processPath(data[1][i], attrs[1]);
            if (data[0][i][0] != data[1][i][0] && (edgeCases(0, 1, i) || edgeCases(1, 0, i))) {
                continue;
            }
            attrs[0].bx = data[0][i][data[0][i].length - 4] || 0;
            attrs[0].by = data[0][i][data[0][i].length - 3] || 0;
            attrs[0].x = data[0][i][data[0][i].length - 2];
            attrs[0].y = data[0][i][data[0][i].length - 1];
            attrs[1].bx = data[1][i][data[1][i].length - 4] || 0;
            attrs[1].by = data[1][i][data[1][i].length - 3] || 0;
            attrs[1].x = data[1][i][data[1][i].length - 2];
            attrs[1].y = data[1][i][data[1][i].length - 1];
        }
        return data;
    };
    var toGradient = function (gradient) {
        if (typeof gradient == "string") {
            gradient = gradient.split(/\s*\-\s*/);
            var angle = gradient.shift();
            if (angle.toLowerCase() == "v") {
                angle = 90;
            } else if (angle.toLowerCase() == "h") {
                angle = 0;
            } else {
                angle = parseFloat(angle, 10);
            }
            angle = -angle;
            var grobj = {angle: angle, type: "linear", dots: [], vector: [0, 0, Math.cos(angle * Math.PI / 180).toFixed(3), Math.sin(angle * Math.PI / 180).toFixed(3)]};
            var max = 1 / (Math.max(Math.abs(grobj.vector[2]), Math.abs(grobj.vector[3])) || 1);
            grobj.vector[2] *= max;
            grobj.vector[3] *= max;
            if (grobj.vector[2] < 0) {
                grobj.vector[0] = -grobj.vector[2];
                grobj.vector[2] = 0;
            }
            if (grobj.vector[3] < 0) {
                grobj.vector[1] = -grobj.vector[3];
                grobj.vector[3] = 0;
            }
            grobj.vector[0] = grobj.vector[0].toFixed(3);
            grobj.vector[1] = grobj.vector[1].toFixed(3);
            grobj.vector[2] = grobj.vector[2].toFixed(3);
            grobj.vector[3] = grobj.vector[3].toFixed(3);
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {};
                var par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = getRGB(par[1]).hex;
                par[2] && (dot.offset = par[2] + "%");
                grobj.dots.push(dot);
            }
            for (var i = 1, ii = grobj.dots.length - 1; i < ii; i++) {
                if (!grobj.dots[i].offset) {
                    var start = parseFloat(grobj.dots[i - 1].offset || 0, 10),
                        end = false;
                    for (var j = i + 1; j < ii; j++) {
                        if (grobj.dots[j].offset) {
                            end = grobj.dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = parseFloat(end, 10);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        grobj.dots[i].offset = start + "%";
                    }
                }
            }
            return grobj;
        } else {
            return gradient;
        }
    };
    var getContainer = function () {
        var container, x, y, width, height;
        if (typeof arguments[0] == "string" || typeof arguments[0] == "object") {
            if (typeof arguments[0] == "string") {
                container = doc.getElementById(arguments[0]);
            } else {
                container = arguments[0];
            }
            if (container.tagName) {
                if (arguments[1] == null) {
                    return {
                        container: container,
                        width: container.style.pixelWidth || container.offsetWidth,
                        height: container.style.pixelHeight || container.offsetHeight
                    };
                } else {
                    return {container: container, width: arguments[1], height: arguments[2]};
                }
            }
        } else if (typeof arguments[0] == "number" && arguments.length > 3) {
            return {container: 1, x: arguments[0], y: arguments[1], width: arguments[2], height: arguments[3]};
        }
    };
    var plugins = function (con, scope, add) {
        for (var prop in add) if (!(prop in con)) {
            switch (typeof add[prop]) {
                case "function":
                    con[prop] = con === scope ? add[prop] : function () { add[prop].apply(scope, arguments); };
                break;
                case "object":
                    con[prop] = {};
                    plugins(con[prop], con, add[prop]);
                break;
                default:
                    con[prop] = add[prop];
                break;
            }
        }
    };

    // SVG
    if (R.svg) {
        var thePath = function (params, pathString, SVG) {
            var el = doc.createElementNS(SVG.svgns, "path");
            el.setAttribute("fill", "none");
            if (SVG.canvas) {
                SVG.canvas.appendChild(el);
            }
            var p = new Element(el, SVG);
            p.isAbsolute = true;
            p.type = "path";
            p.last = {x: 0, y: 0, bx: 0, by: 0};
            p.absolutely = function () {
                this.isAbsolute = true;
                return this;
            };
            p.relatively = function () {
                this.isAbsolute = false;
                return this;
            };
            p.moveTo = function (x, y) {
                var d = this.isAbsolute?"M":"m";
                d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
                var oldD = this[0].getAttribute("d") || "";
                (oldD == "M0,0") && (oldD = "");
                this[0].setAttribute("d", oldD + d);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.attrs.path = oldD + d;
                return this;
            };
            p.lineTo = function (x, y) {
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                var d = this.isAbsolute?"L":"l";
                d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x, y) {
                var d = this.isAbsolute ? "A" : "a";
                d += [parseFloat(rx, 10).toFixed(3), parseFloat(ry, 10).toFixed(3), 0, large_arc_flag, sweep_flag, parseFloat(x, 10).toFixed(3), parseFloat(y, 10).toFixed(3)].join(" ");
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + d);
                this.last.x = parseFloat(x, 10);
                this.last.y = parseFloat(y, 10);
                this.attrs.path = oldD + d;
                return this;
            };
            p.cplineTo = function (x1, y1, w1) {
                if (!w1) {
                    return this.lineTo(x1, y1);
                } else {
                    var p = {};
                    var x = parseFloat(x1, 10);
                    var y = parseFloat(y1, 10);
                    var w = parseFloat(w1, 10);
                    var d = this.isAbsolute?"C":"c";
                    var attr = [+this.last.x + w, +this.last.y, x - w, y, x, y];
                    for (var i = 0, ii = attr.length; i < ii; i++) {
                        d += attr[i].toFixed(3) + " ";
                    }
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                    this.last.bx = attr[2];
                    this.last.by = attr[3];
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.attrs.path = oldD + d;
                    return this;
                }
            };
            p.curveTo = function () {
                var p = {},
                    command = [0, 1, 2, 3, "s", 5, "c"];

                var d = command[arguments.length];
                if (this.isAbsolute) {
                    d = d.toUpperCase();
                }
                for (var i = 0, ii = arguments.length; i < ii; i++) {
                    d += parseFloat(arguments[i], 10).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
                this.last.bx = parseFloat(arguments[arguments.length - 4], 10);
                this.last.by = parseFloat(arguments[arguments.length - 3], 10);
                var oldD = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.qcurveTo = function () {
                var p = {},
                    command = [0, 1, "t", 3, "q"];

                var d = command[arguments.length];
                if (this.isAbsolute) {
                    d = d.toUpperCase();
                }
                for (var i = 0, ii = arguments.length; i < ii; i++) {
                    d += parseFloat(arguments[i], 10).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
                if (arguments.length != 2) {
                    this.last.qx = parseFloat(arguments[arguments.length - 4], 10);
                    this.last.qy = parseFloat(arguments[arguments.length - 3], 10);
                }
                var oldD = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.addRoundedCorner = function (r, dir) {
                var R = .5522 * r, rollback = this.isAbsolute, o = this;
                if (rollback) {
                    this.relatively();
                    rollback = function () {
                        o.absolutely();
                    };
                } else {
                    rollback = function () {};
                }
                var actions = {
                    l: function () {
                        return {
                            u: function () {
                                o.curveTo(-R, 0, -r, -(r - R), -r, -r);
                            },
                            d: function () {
                                o.curveTo(-R, 0, -r, r - R, -r, r);
                            }
                        };
                    },
                    r: function () {
                        return {
                            u: function () {
                                o.curveTo(R, 0, r, -(r - R), r, -r);
                            },
                            d: function () {
                                o.curveTo(R, 0, r, r - R, r, r);
                            }
                        };
                    },
                    u: function () {
                        return {
                            r: function () {
                                o.curveTo(0, -R, -(R - r), -r, r, -r);
                            },
                            l: function () {
                                o.curveTo(0, -R, R - r, -r, -r, -r);
                            }
                        };
                    },
                    d: function () {
                        return {
                            r: function () {
                                o.curveTo(0, R, -(R - r), r, r, r);
                            },
                            l: function () {
                                o.curveTo(0, R, R - r, r, -r, r);
                            }
                        };
                    }
                };
                actions[dir[0]]()[dir[1]]();
                rollback();
                return o;
            };
            p.andClose = function () {
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + "Z ");
                this.attrs.path = oldD + "Z ";
                return this;
            };
            if (pathString) {
                p.attrs.path = "" + pathString;
                p.absolutely();
                paper.pathfinder(p, p.attrs.path);
            }
            if (params) {
                setFillAndStroke(p, params);
            }
            return p;
        };
        var addGrdientFill = function (o, gradient, SVG) {
            gradient = toGradient(gradient);
            var el = doc.createElementNS(SVG.svgns, (gradient.type || "linear") + "Gradient");
            el.id = "raphael-gradient-" + Raphael.idGenerator++;
            if (gradient.vector && gradient.vector.length) {
                el.setAttribute("x1", gradient.vector[0]);
                el.setAttribute("y1", gradient.vector[1]);
                el.setAttribute("x2", gradient.vector[2]);
                el.setAttribute("y2", gradient.vector[3]);
            }
            SVG.defs.appendChild(el);
            var isopacity = true;
            for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
                var stop = doc.createElementNS(SVG.svgns, "stop");
                if (gradient.dots[i].offset) {
                    isopacity = false;
                }
                stop.setAttribute("offset", gradient.dots[i].offset ? gradient.dots[i].offset : (i == 0) ? "0%" : "100%");
                stop.setAttribute("stop-color", getRGB(gradient.dots[i].color).hex || "#fff");
                // ignoring opacity for internal points, because VML doesn't support it
                el.appendChild(stop);
            };
            if (isopacity && typeof gradient.dots[ii - 1].opacity != "undefined") {
                stop.setAttribute("stop-opacity", gradient.dots[ii - 1].opacity);
            }
            o.setAttribute("fill", "url(#" + el.id + ")");
            o.style.opacity = 1;
            o.style.fillOpacity = 1;
            o.setAttribute("opacity", 1);
            o.setAttribute("fill-opacity", 1);
        };
        var updatePosition = function (o) {
            if (o.pattern) {
                var bbox = o.node.getBBox();
                o.pattern.setAttribute("patternTransform", "translate(" + [bbox.x, bbox.y].join(",") + ")");
            }
        };
        var setFillAndStroke = function (o, params) {
            var dasharray = {
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            },
            addDashes = function (o, value) {
                value = dasharray[value.toString().toLowerCase()];
                if (value) {
                    var width = o.attrs["stroke-width"] || "1",
                        butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                        dashes = [];
                    for (var i = 0, ii = value.length; i < ii; i++) {
                        dashes.push(value[i] * width + ((i % 2) ? 1 : -1) * butt);
                    }
                    value = dashes.join(",");
                    o.node.setAttribute("stroke-dasharray", value);
                }
            };
            for (var att in params) {
                if (!(att in availableAttrs)) {
                    continue;
                }
                var value = params[att];
                o.attrs[att] = value;
                switch (att) {
                    // Hyperlink
                    case "href":
                    case "title":
                    case "target":
                        var pn = o.node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = doc.createElementNS(o.svg.svgns, "a");
                            pn.insertBefore(hl, o.node);
                            hl.appendChild(o.node);
                            pn = hl;
                        }
                        pn.setAttributeNS(o.svg.xlink, att, value);
                      break;
                    case "path":
                        if (o.type == "path") {
                            o.node.setAttribute("d", "M0,0");
                            paper.pathfinder(o, value);
                        }
                    case "rx":
                    case "cx":
                    case "x":
                        o.node.setAttribute(att, value);
                        updatePosition(o);
                        break;
                    case "ry":
                    case "cy":
                    case "y":
                        o.node.setAttribute(att, value);
                        updatePosition(o);
                        break;
                    case "width":
                        o.node.setAttribute(att, value);
                        break;
                    case "height":
                        o.node.setAttribute(att, value);
                        break;
                    case "src":
                        if (o.type == "image") {
                            o.node.setAttributeNS(svg.xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        o.node.style.strokeWidth = value;
                        // Need following line for Firefox
                        o.node.setAttribute(att, value);
                        if (o.attrs["stroke-dasharray"]) {
                            addDashes(o, o.attrs["stroke-dasharray"]);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value);
                        break;
                    case "rotation":
                        o.rotate(value, true);
                        break;
                    case "translation":
                        var xy = (value + "").split(separator);
                        o.translate((+xy[0] + 1 || 2) - 1, (+xy[1] + 1 || 2) - 1);
                        break;
                    case "scale":
                        var xy = (value + "").split(separator);
                        o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1);
                        break;
                    case "fill":
                        var isURL = value.match(/^url\(([^\)]+)\)$/i);
                        if (isURL) {
                            var el = doc.createElementNS(o.svg.svgns, "pattern");
                            var ig = doc.createElementNS(o.svg.svgns, "image");
                            el.id = "raphael-pattern-" + Raphael.idGenerator++;
                            el.setAttribute("x", 0);
                            el.setAttribute("y", 0);
                            el.setAttribute("patternUnits", "userSpaceOnUse");
                            ig.setAttribute("x", 0);
                            ig.setAttribute("y", 0);
                            ig.setAttributeNS(o.svg.xlink, "href", isURL[1]);
                            el.appendChild(ig);

                            var img = doc.createElement("img");
                            img.style.position = "absolute";
                            img.style.top = "-9999em";
                            img.style.left = "-9999em";
                            img.onload = function () {
                                el.setAttribute("width", this.offsetWidth);
                                el.setAttribute("height", this.offsetHeight);
                                ig.setAttribute("width", this.offsetWidth);
                                ig.setAttribute("height", this.offsetHeight);
                                doc.body.removeChild(this);
                                paper.safari();
                            };
                            doc.body.appendChild(img);
                            img.src = isURL[1];
                            o.svg.defs.appendChild(el);
                            o.node.style.fill = "url(#" + el.id + ")";
                            o.node.setAttribute("fill", "url(#" + el.id + ")");
                            o.pattern = el;
                            updatePosition(o);
                            break;
                        }
                        delete params.gradient;
                        delete o.attrs.gradient;
                        if (typeof o.attrs.opacity != "undefined" && typeof params.opacity == "undefined" ) {
                            o.node.style.opacity = o.attrs.opacity;
                            // Need following line for Firefox
                            o.node.setAttribute("opacity", o.attrs.opacity);
                        }
                        if (typeof o.attrs["fill-opacity"] != "undefined" && typeof params["fill-opacity"] == "undefined" ) {
                            o.node.style.fillOpacity = o.attrs["fill-opacity"];
                            // Need following line for Firefox
                            o.node.setAttribute("fill-opacity", o.attrs["fill-opacity"]);
                        }
                    case "stroke":
                        o.node.style[att] = getRGB(value).hex;
                        // Need following line for Firefox
                        o.node.setAttribute(att, getRGB(value).hex);
                        break;
                    case "gradient":
                        addGrdientFill(o.node, value, o.svg);
                        break;
                    case "opacity":
                    case "fill-opacity":
                        if (o.attrs.gradient) {
                            var gradient = doc.getElementById(o.node.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
                            if (gradient) {
                                var stops = gradient.getElementsByTagName("stop");
                                stops[stops.length - 1].setAttribute("stop-opacity", value);
                            }
                            break;
                        }
                    default :
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        o.node.style[cssrule] = value;
                        // Need following line for Firefox
                        o.node.setAttribute(att, value);
                        break;
                }
            }
            tuneText(o, params);
        };
        var leading = 1.2;
        var tuneText = function (element, params) {
            if (element.type != "text" || !("text" in params || "font" in params || "font-size" in params || "x" in params)) {
                return;
            }
            var fontSize = element.node.firstChild ? parseInt(doc.defaultView.getComputedStyle(element.node.firstChild, "").getPropertyValue("font-size"), 10) : 10;
            var height = 0;

            if ("text" in params) {
                while (element.node.firstChild) {
                    element.node.removeChild(element.node.firstChild);
                }
                var texts = (params.text + "").split("\n");
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    var tspan = doc.createElementNS(element.svg.svgns, "tspan");
                    i && tspan.setAttribute("dy", fontSize * leading);
                    i && tspan.setAttribute("x", element.attrs.x);
                    tspan.appendChild(doc.createTextNode(texts[i]));
                    element.node.appendChild(tspan);
                    height += fontSize * leading;
                }
            } else {
                var texts = element.node.getElementsByTagName("tspan");
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    i && texts[i].setAttribute("dy", fontSize * leading);
                    i && texts[i].setAttribute("x", element.attrs.x);
                    height += fontSize * leading;
                }
            }
            height -= fontSize * (leading - 1);
            var dif = height / 2 - fontSize;
            if (dif) {
                element.node.setAttribute("y", element.attrs.y - dif);
            }
            setTimeout(function () {
            });
        };
        var Element = function (node, svg) {
            var X = 0,
                Y = 0;
            this[0] = node;
            this.node = node;
            this.svg = svg;
            this.attrs = this.attrs || {};
            this.transformations = []; // rotate, translate, scale
            this._ = {
                tx: 0,
                ty: 0,
                rt: {deg: 0, x: 0, y: 0},
                sx: 1,
                sy: 1
            };
        };
        Element.prototype.rotate = function (deg, cx, cy) {
            if (deg == null) {
                return this._.rt.deg;
            }
            var bbox = this.getBBox();
            deg = deg.toString().split(separator);
            if (deg.length - 1) {
                cx = parseFloat(deg[1], 10);
                cy = parseFloat(deg[2], 10);
            }
            deg = parseFloat(deg[0], 10);
            if (cx != null) {
                this._.rt.deg = deg;
            } else {
                this._.rt.deg += deg;
            }
            if (cy == null) {
                cx = null;
            }
            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
            cy = cy == null ? bbox.y + bbox.height / 2 : cy;
            if (this._.rt.deg) {
                this.transformations[0] = ("rotate(" + this._.rt.deg + " " + cx + " " + cy + ")");
            } else {
                this.transformations[0] = "";
            }
            this.node.setAttribute("transform", this.transformations.join(" "));
            return this;
        };
        Element.prototype.hide = function () {
            this.node.style.display = "none";
            return this;
        };
        Element.prototype.show = function () {
            this.node.style.display = "block";
            return this;
        };
        Element.prototype.remove = function () {
            this.node.parentNode.removeChild(this.node);
        };
        Element.prototype.getBBox = function () {
            return this.node.getBBox();
        };
        Element.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (arguments.length == 1 && arguments[0] instanceof Array) {
                var values = {};
                for (var j in arguments[0]) {
                    values[arguments[0][j]] = this.attrs[arguments[0][j]];
                }
                return values;
            }
            if (arguments.length == 2) {
                var params = {};
                params[arguments[0]] = arguments[1];
                setFillAndStroke(this, params);
            } else if (arguments.length == 1 && typeof arguments[0] == "object") {
                setFillAndStroke(this, arguments[0]);
            }
            return this;
        };
        Element.prototype.toFront = function () {
            this.node.parentNode.appendChild(this.node);
            return this;
        };
        Element.prototype.toBack = function () {
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            }
            return this;
        };
        Element.prototype.insertAfter = function (element) {
            if (element.node.nextSibling) {
                element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
            } else {
                element.node.parentNode.appendChild(this.node);
            }
            return this;
        };
        Element.prototype.insertBefore = function (element) {
            element.node.parentNode.insertBefore(this.node, element.node);
            return this;
        };
        var theCircle = function (svg, x, y, r) {
            var el = doc.createElementNS(svg.svgns, "circle");
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
            el.setAttribute("r", r);
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.r = r;
            res.attrs.stroke = "#000";
            res.type = "circle";
            return res;
        };
        var theRect = function (svg, x, y, w, h, r) {
            var el = doc.createElementNS(svg.svgns, "rect");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("width", w);
            el.setAttribute("height", h);
            if (r) {
                el.setAttribute("rx", r);
                el.setAttribute("ry", r);
            }
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.width = w;
            res.attrs.height = h;
            res.attrs.stroke = "#000";
            if (r) {
                res.attrs.rx = res.attrs.ry = r;
            }
            res.type = "rect";
            return res;
        };
        var theEllipse = function (svg, x, y, rx, ry) {
            var el = doc.createElementNS(svg.svgns, "ellipse");
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
            el.setAttribute("rx", rx);
            el.setAttribute("ry", ry);
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.rx = rx;
            res.attrs.ry = ry;
            res.attrs.stroke = "#000";
            res.type = "ellipse";
            return res;
        };
        var theImage = function (svg, src, x, y, w, h) {
            var el = doc.createElementNS(svg.svgns, "image");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("width", w);
            el.setAttribute("height", h);
            el.setAttribute("preserveAspectRatio", "none");
            el.setAttributeNS(svg.xlink, "href", src);
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.width = w;
            res.attrs.height = h;
            res.type = "image";
            return res;
        };
        var theText = function (svg, x, y, text) {
            var el = doc.createElementNS(svg.svgns, "text");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("text-anchor", "middle");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.type = "text";
            setFillAndStroke(res, {font: availableAttrs.font, stroke: "none", fill: "#000", text: text});
            return res;
        };
        var theGroup = function (svg) {
            var el = doc.createElementNS(svg.svgns, "g");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var i = new Element(el, svg);
            for (var f in svg) {
                if (f[0] != "_" && typeof svg[f] == "function") {
                    i[f] = (function (f) {
                        return function () {
                            var e = svg[f].apply(svg, arguments);
                            el.appendChild(e[0]);
                            return e;
                        };
                    })(f);
                }
            }
            i.type = "group";
            return i;
        };
        var setSize = function (width, height) {
            this.width = width || this.width;
            this.height = height || this.height;
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);
            return this;
        };
        var create = function () {
            var con = getContainer.apply(null, arguments);
            var container = con.container,
                x = con.x,
                y = con.y,
                width = con.width,
                height = con.height;
            if (!container) {
                throw new Error("SVG container not found.");
            }
            paper.canvas = doc.createElementNS(paper.svgns, "svg");
            paper.canvas.setAttribute("width", width || 320);
            paper.width = width || 320;
            paper.canvas.setAttribute("height", height || 200);
            paper.height = height || 200;
            if (container == 1) {
                doc.body.appendChild(paper.canvas);
                paper.canvas.style.position = "absolute";
                paper.canvas.style.left = x + "px";
                paper.canvas.style.top = y + "px";
            } else {
                if (container.firstChild) {
                    container.insertBefore(paper.canvas, container.firstChild);
                } else {
                    container.appendChild(paper.canvas);
                }
            }
            container = {
                canvas: paper.canvas,
                clear: function () {
                    while (this.canvas.firstChild) {
                        this.canvas.removeChild(this.canvas.firstChild);
                    }
                    this.defs = doc.createElementNS(paper.svgns, "defs");
                    this.canvas.appendChild(this.defs);
                }
            };
            for (var prop in paper) {
                if (prop != "create") {
                    container[prop] = paper[prop];
                }
            }
            plugins(container, container, R.fn);
            container.clear();
            return container;
        };
        paper.remove = function () {
            this.canvas.parentNode.removeChild(this.canvas);
        };
        paper.svgns = "http://www.w3.org/2000/svg";
        paper.xlink = "http://www.w3.org/1999/xlink";
        paper.safari = function () {
            if (navigator.vendor == "Apple Computer, Inc.") {
                var rect = this.rect(-this.width, -this.height, this.width * 3, this.height * 3).attr({stroke: "none"});
                setTimeout(function () {rect.remove();}, 0);
            }
        };
    }

    // VML
    if (R.vml) {
        thePath = function (params, pathString, VML) {
            var g = createNode("group"), gl = g.style;
            gl.position = "absolute";
            gl.left = 0;
            gl.top = 0;
            gl.width = VML.width + "px";
            gl.height = VML.height + "px";
            var el = createNode("shape"), ol = el.style;
            ol.width = VML.width + "px";
            ol.height = VML.height + "px";
            el.path = "";
            if (params["class"]) {
                el.className = "rvml " + params["class"];
            }
            el.coordsize = this.coordsize;
            el.coordorigin = this.coordorigin;
            g.appendChild(el);
            VML.canvas.appendChild(g);
            var p = new Element(el, g, VML);
            p.isAbsolute = true;
            p.type = "path";
            p.path = [];
            p.last = {x: 0, y: 0, bx: 0, by: 0, isAbsolute: true};
            p.Path = "";
            p.absolutely = function () {
                this.isAbsolute = true;
                return this;
            };
            p.relatively = function () {
                this.isAbsolute = false;
                return this;
            };
            p.moveTo = function (x, y) {
                var d = this.isAbsolute?"m":"t";
                d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
                this.node.path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "M" : "m") + [x, y];
                return this;
            };
            p.lineTo = function (x, y) {
                var d = this.isAbsolute?"l":"r";
                d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
                this[0].path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "L" : "l") + [x, y];
                return this;
            };
            p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x2, y2) {
                // for more information of where this math came from visit:
                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                x2 = (this.isAbsolute ? 0 : this.last.x) + x2;
                y2 = (this.isAbsolute ? 0 : this.last.y) + y2;
                var x1 = this.last.x,
                    y1 = this.last.y,
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        Math.sqrt(Math.abs(rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    d = sweep_flag ? (this.isAbsolute ? "wa" : "wr") : (this.isAbsolute ? "at" : "ar"),
                    left = Math.round(cx - rx),
                    top = Math.round(cy - ry);
                d += [left, top, Math.round(left + rx * 2), Math.round(top + ry * 2), Math.round(x1), Math.round(y1), Math.round(parseFloat(x2, 10)), Math.round(parseFloat(y2, 10))].join(", ");
                this.node.path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x2, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y2, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "A" : "a") + [rx, ry, 0, large_arc_flag, sweep_flag, x2, y2];
                return this;
            };
            p.cplineTo = function (x1, y1, w1) {
                if (!w1) {
                    return this.lineTo(x1, y1);
                } else {
                    var x = Math.round(Math.round(parseFloat(x1, 10) * 100) / 100),
                        y = Math.round(Math.round(parseFloat(y1, 10) * 100) / 100),
                        w = Math.round(Math.round(parseFloat(w1, 10) * 100) / 100),
                        d = this.isAbsolute ? "c" : "v",
                        attr = [Math.round(this.last.x) + w, Math.round(this.last.y), x - w, y, x, y],
                        svgattr = [this.last.x + w1, this.last.y, x1 - w1, y1, x1, y1];
                    d += attr.join(" ") + " ";
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                    this.last.bx = attr[2];
                    this.last.by = attr[3];
                    this.node.path = this.Path += d;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + svgattr;
                    return this;
                }
            };
            p.curveTo = function () {
                var d = this.isAbsolute ? "c" : "v";
                if (arguments.length == 6) {
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[4], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[5], 10);
                    d += [Math.round(parseFloat(arguments[0], 10)),
                         Math.round(parseFloat(arguments[1], 10)),
                         Math.round(parseFloat(arguments[2], 10)),
                         Math.round(parseFloat(arguments[3], 10)),
                         Math.round(parseFloat(arguments[4], 10)),
                         Math.round(parseFloat(arguments[5], 10))].join(" ") + " ";
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 4) {
                    var bx = this.last.x * 2 - this.last.bx;
                    var by = this.last.y * 2 - this.last.by;
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(bx), Math.round(by),
                         Math.round(parseFloat(arguments[0], 10)),
                         Math.round(parseFloat(arguments[1], 10)),
                         Math.round(parseFloat(arguments[2], 10)),
                         Math.round(parseFloat(arguments[3], 10))].join(" ") + " ";
                     this.attrs.path += (this.isAbsolute ? "S" : "s") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                this.node.path = this.Path += d;
                return this;
            };
            p.qcurveTo = function () {
                var d = "qb";
                if (arguments.length == 4) {
                    this.last.qx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                    this.last.qy = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(this.last.qx),
                         Math.round(this.last.qy),
                         Math.round(this.last.x),
                         Math.round(this.last.y)].join(" ") + " ";
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "Q" : "q") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 2) {
                    this.last.qx = this.last.x * 2 - this.last.qx;
                    this.last.qy = this.last.y * 2 - this.last.qy;
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(this.last.qx),
                         Math.round(this.last.qy),
                         Math.round(this.last.x),
                         Math.round(this.last.y)].join(" ") + " ";
                     this.attrs.path += (this.isAbsolute ? "T" : "t") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                this.node.path = this.Path += d;
                this.path.push({type: "qcurve", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
                return this;
            };
            p.addRoundedCorner = function (r, dir) {
                var R = .5522 * r, rollback = this.isAbsolute, o = this;
                if (rollback) {
                    this.relatively();
                    rollback = function () {
                        o.absolutely();
                    };
                } else {
                    rollback = function () {};
                }
                var actions = {
                    l: function () {
                        return {
                            u: function () {
                                o.curveTo(-R, 0, -r, -(r - R), -r, -r);
                            },
                            d: function () {
                                o.curveTo(-R, 0, -r, r - R, -r, r);
                            }
                        };
                    },
                    r: function () {
                        return {
                            u: function () {
                                o.curveTo(R, 0, r, -(r - R), r, -r);
                            },
                            d: function () {
                                o.curveTo(R, 0, r, r - R, r, r);
                            }
                        };
                    },
                    u: function () {
                        return {
                            r: function () {
                                o.curveTo(0, -R, -(R - r), -r, r, -r);
                            },
                            l: function () {
                                o.curveTo(0, -R, R - r, -r, -r, -r);
                            }
                        };
                    },
                    d: function () {
                        return {
                            r: function () {
                                o.curveTo(0, R, -(R - r), r, r, r);
                            },
                            l: function () {
                                o.curveTo(0, R, R - r, r, -r, r);
                            }
                        };
                    }
                };
                actions[dir.charAt(0)]()[dir.charAt(1)]();
                rollback();
                return o;
            };
            p.andClose = function () {
                this.node.path = (this.Path += "x e");
                this.attrs.path += "z";
                return this;
            };
            if (pathString) {
                p.absolutely();
                p.attrs.path = "";
                paper.pathfinder(p, "" + pathString);
            }
            // p.setBox();
            setFillAndStroke(p, params);
            if (params.gradient) {
                addGrdientFill(p, params.gradient);
            }
            return p;
        };
        var setFillAndStroke = function (o, params) {
            var s = o.node.style,
                res = o;
            o.attrs = o.attrs || {};
            for (var par in params) {
                o.attrs[par] = params[par];
            }
            params.href && (o.node.href = params.href);
            params.title && (o.node.title = params.title);
            params.target && (o.node.target = params.target);
            if (params.path && o.type == "path") {
                o.Path = "";
                o.path = [];
                paper.pathfinder(o, params.path);
            }
            if (params.rotation != null) {
                o.rotate(params.rotation, true);
            }
            if (params.translation) {
                var xy = (params.translation + "").split(separator);
                o.translate(xy[0], xy[1]);
            }
            if (params.scale) {
                var xy = (params.scale + "").split(separator);
                o.scale(xy[0], xy[1]);
            }
            if (o.type == "image" && params.src) {
                o.node.src = params.src;
            }
            if (o.type == "image" && params.opacity) {
                o.node.filterOpacity = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + (params.opacity * 100) + ")";
                o.node.style.filter = (o.node.filterMatrix || "") + (o.node.filterOpacity || "");
            }
            params.font && (s.font = params.font);
            params["font-family"] && (s.fontFamily = params["font-family"]);
            params["font-size"] && (s.fontSize = params["font-size"]);
            params["font-weight"] && (s.fontWeight = params["font-weight"]);
            params["font-style"] && (s.fontStyle = params["font-style"]);
            if (typeof params.opacity != "undefined" || typeof params["stroke-width"] != "undefined" || typeof params.fill != "undefined" || typeof params.stroke != "undefined" || params["stroke-width"] || params["stroke-opacity"] || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                o = o.shape || o.node;
                var fill = (o.getElementsByTagName("fill") && o.getElementsByTagName("fill")[0]) || createNode("fill");
                if ("fill-opacity" in params || "opacity" in params) {
                    fill.opacity = ((+params["fill-opacity"] + 1 || 2) - 1) * ((+params.opacity + 1 || 2) - 1);
                }
                if (params.fill) {
                    fill.on = true;
                }
                if (typeof fill.on == "undefined" || params.fill == "none") {
                    fill.on = false;
                }
                if (fill.on && params.fill) {
                    var isURL = params.fill.match(/^url\(([^\)]+)\)$/i);
                    if (isURL) {
                        fill.src = isURL[1];
                        fill.type = "tile";
                    } else {
                        fill.color = getRGB(params.fill).hex;
                        fill.src = "";
                        fill.type = "solid";
                    }
                }
                o.appendChild(fill);
                var stroke = (o.getElementsByTagName("stroke") && o.getElementsByTagName("stroke")[0]) || createNode("stroke");
                if ((params.stroke && params.stroke != "none") || params["stroke-width"] || typeof params["stroke-opacity"] != "undefined" || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                    stroke.on = true;
                }
                if (params.stroke == "none" || typeof stroke.on == "undefined" || params.stroke == 0) {
                    stroke.on = false;
                }
                if (stroke.on && params.stroke) {
                    stroke.color = getRGB(params.stroke).hex;
                }
                stroke.opacity = ((+params["stroke-opacity"] + 1 || 2) - 1) * ((+params.opacity + 1 || 2) - 1);
                params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                stroke.miterlimit = params["stroke-miterlimit"] || 8;
                params["stroke-linecap"] && (stroke.endcap = {butt: "flat", square: "square", round: "round"}[params["stroke-linecap"]] || "miter");
                params["stroke-width"] && (stroke.weight = (parseFloat(params["stroke-width"], 10) || 1) * 12 / 16);
                if (params["stroke-dasharray"]) {
                    var dasharray = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    stroke.dashstyle = dasharray[params["stroke-dasharray"]] || "";
                }
                o.appendChild(stroke);
            }
            if (res.type == "text") {
                var span = doc.createElement("span"),
                    s = span.style;
                res.attrs.font && (s.font = res.attrs.font);
                res.attrs["font-family"] && (s.fontFamily = res.attrs["font-family"]);
                res.attrs["font-size"] && (s.fontSize = res.attrs["font-size"]);
                res.attrs["font-weight"] && (s.fontWeight = res.attrs["font-weight"]);
                res.attrs["font-style"] && (s.fontStyle = res.attrs["font-style"]);
                res.node.parentNode.appendChild(span);
                span.innerText = res.node.string;
                res.W = res.attrs.w = span.offsetWidth;
                res.H = res.attrs.h = span.offsetHeight;
                res.X = res.attrs.x;
                res.Y = res.attrs.y + Math.round(res.H / 2);
                res.node.parentNode.removeChild(span);

                // text-anchor emulation
                switch(res.attrs["text-anchor"]) {
                    case "start":
                        res.node.style["v-text-align"] = "left";
                        res.bbx = Math.round(res.W / 2);
                    break;
                    case "end":
                        res.node.style["v-text-align"] = "right";
                        res.bbx = -Math.round(res.W / 2);
                    break;
                    default:
                        res.node.style["v-text-align"] = "center";
                    break;
                }
            }
        };
        var getAngle = function (a, b, c, d) {
            var angle = Math.round(Math.atan((parseFloat(c, 10) - parseFloat(a, 10)) / (parseFloat(d, 10) - parseFloat(b, 10))) * 57.29) || 0;
            if (!angle && parseFloat(a, 10) < parseFloat(b, 10)) {
                angle = 180;
            }
            angle -= 180;
            if (angle < 0) {
                angle += 360;
            }
            return angle;
        };
        var addGrdientFill = function (o, gradient) {
            gradient = toGradient(gradient);
            o.attrs = o.attrs || {};
            var attrs = o.attrs;
            o.attrs.gradient = gradient;
            o = o.shape || o[0];
            var fill = o.getElementsByTagName("fill");
            if (fill.length) {
                fill = fill[0];
            } else {
                fill = createNode("fill");
            }
            if (gradient.dots.length) {
                fill.on = true;
                fill.method = "none";
                fill.type = ((gradient.type + "").toLowerCase() == "radial") ? "gradientTitle" : "gradient";
                if (typeof gradient.dots[0].color != "undefined") {
                    fill.color = getRGB(gradient.dots[0].color).hex;
                }
                if (typeof gradient.dots[gradient.dots.length - 1].color != "undefined") {
                    fill.color2 = getRGB(gradient.dots[gradient.dots.length - 1].color).hex;
                }
                var colors = [];
                for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
                    if (gradient.dots[i].offset) {
                        colors.push(gradient.dots[i].offset + " " + getRGB(gradient.dots[i].color).hex);
                    }
                };
                var fillOpacity = typeof gradient.dots[gradient.dots.length - 1].opacity == "undefined" ? (typeof attrs.opacity == "undefined" ? 1 : attrs.opacity) : gradient.dots[gradient.dots.length - 1].opacity;
                if (colors.length) {
                    fill.colors.value = colors.join(",");
                    fillOpacity = typeof attrs.opacity == "undefined" ? 1 : attrs.opacity;
                } else {
                    fill.colors.value = "0% " + fill.color;
                }
                fill.opacity = fillOpacity;
                if (typeof gradient.angle != "undefined") {
                    fill.angle = (-gradient.angle + 270) % 360;
                } else if (gradient.vector) {
                    fill.angle = getAngle.apply(null, gradient.vector);
                }
                if ((gradient.type + "").toLowerCase() == "radial") {
                    fill.focus = "100%";
                    fill.focusposition = "0.5 0.5";
                }
            }
        };
        var Element = function (node, group, vml) {
            var Rotation = 0,
                RotX = 0,
                RotY = 0,
                Scale = 1;
            this[0] = node;
            this.node = node;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.Group = group;
            this.vml = vml;
            this._ = {
                tx: 0,
                ty: 0,
                rt: {deg:0},
                sx: 1,
                sy: 1
            };
        };
        Element.prototype.rotate = function (deg, cx, cy) {
            if (deg == null) {
                return this._.rt.deg;
            }
            deg = deg.toString().split(separator);
            if (deg.length - 1) {
                cx = parseFloat(deg[1], 10);
                cy = parseFloat(deg[2], 10);
            }
            deg = parseFloat(deg[0], 10);
            if (cx != null) {
                this._.rt.deg = deg;
            } else {
                this._.rt.deg += deg;
            }
            if (cy == null) {
                cx = null;
            }
            this._.rt.cx = cx;
            this._.rt.cy = cy;
            this.setBox(null, cx, cy);
            this.Group.style.rotation = this._.rt.deg;
            return this;
        };
        Element.prototype.setBox = function (params, cx, cy) {
            var gs = this.Group.style,
                os = (this.shape && this.shape.style) || this.node.style;
            for (var i in params) {
                this.attrs[i] = params[i];
            }
            cx = cx || this._.rt.cx;
            cy = cy || this._.rt.cy;
            var attr = this.attrs, x, y, w, h;
            switch (this.type) {
                case "circle":
                    x = attr.cx - attr.r;
                    y = attr.cy - attr.r;
                    w = h = attr.r * 2;
                    break;
                case "ellipse":
                    x = attr.cx - attr.rx;
                    y = attr.cy - attr.ry;
                    w = attr.rx * 2;
                    h = attr.ry * 2;
                    break;
                case "rect":
                case "image":
                    x = attr.x;
                    y = attr.y;
                    w = attr.width || 0;
                    h = attr.height || 0;
                    break;
                case "text":
                    this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("");
                    x = attr.x - Math.round(this.W / 2);
                    y = attr.y - this.H / 2;
                    w = this.W;
                    h = this.H;
                    break;
                case "path":
                    if (!this.attrs.path) {
                        x = 0;
                        y = 0;
                        w = this.vml.width;
                        h = this.vml.height;
                    } else {
                        var dim = pathDimensions(this.attrs.path),
                        x = dim.x;
                        y = dim.y;
                        w = dim.width;
                        h = dim.height;
                    }
                    break;
                default:
                    x = 0;
                    y = 0;
                    w = this.vml.width;
                    h = this.vml.height;
                    break;
            }
            cx = (cx == null) ? x + w / 2 : cx;
            cy = (cy == null) ? y + h / 2 : cy;
            var left = cx - this.vml.width / 2,
                top = cy - this.vml.height / 2;
            if (this.type == "path" || this.type == "text") {
                gs.left = left + "px";
                gs.top = top + "px";
                this.X = this.type == "text" ? x : -left;
                this.Y = this.type == "text" ? y : -top;
                this.W = w;
                this.H = h;
                os.left = -left + "px";
                os.top = -top + "px";
            } else {
                gs.left = left + "px";
                gs.top = top + "px";
                this.X = x;
                this.Y = y;
                this.W = w;
                this.H = h;
                gs.width = this.vml.width + "px";
                gs.height = this.vml.height + "px";
                os.left = x - left + "px";
                os.top = y - top + "px";
                os.width = w + "px";
                os.height = h + "px";
            }
        };
        Element.prototype.hide = function () {
            this.Group.style.display = "none";
            return this;
        };
        Element.prototype.show = function () {
            this.Group.style.display = "block";
            return this;
        };
        Element.prototype.getBBox = function () {
            this.bbx = this.bbx || 0;
            return {
                x: this.X + this.bbx,
                y: this.Y,
                width: this.W,
                height: this.H
            };
        };
        Element.prototype.remove = function () {
            this[0].parentNode.removeChild(this[0]);
            this.Group.parentNode.removeChild(this.Group);
            this.shape && this.shape.parentNode.removeChild(this.shape);
        };
        Element.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (this.attrs && arguments.length == 1 && arguments[0] instanceof Array) {
                var values = {};
                for (var i = 0, ii = arguments[0].length; i < ii; i++) {
                    values[arguments[0][i]] = this.attrs[arguments[0][i]];
                };
                return values;
            }
            var params;
            if (arguments.length == 2) {
                params = {};
                params[arguments[0]] = arguments[1];
            }
            if (arguments.length == 1 && typeof arguments[0] == "object") {
                params = arguments[0];
            }
            if (params) {
                if (params.gradient) {
                    addGrdientFill(this, params.gradient);
                }
                if (params.text && this.type == "text") {
                    this.node.string = params.text;
                }
                if (params.id) {
                    this.node.id = params.id;
                }
                setFillAndStroke(this, params);
                this.setBox(params);
            }
            return this;
        };
        Element.prototype.toFront = function () {
            this.Group.parentNode.appendChild(this.Group);
            return this;
        };
        Element.prototype.toBack = function () {
            if (this.Group.parentNode.firstChild != this.Group) {
                this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
            }
            return this;
        };
        Element.prototype.insertAfter = function (element) {
            if (element.Group.nextSibling) {
                element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
            } else {
                element.Group.parentNode.appendChild(this.Group);
            }
            return this;
        };
        Element.prototype.insertBefore = function (element) {
            element.Group.parentNode.insertBefore(this.Group, element.Group);
            return this;
        };
        var theCircle = function (vml, x, y, r) {
            var g = createNode("group");
            var o = createNode("oval");
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "circle";
            setFillAndStroke(res, {stroke: "#000", fill: "none"});
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.r = r;
            res.setBox({x: x - r, y: y - r, width: r * 2, height: r * 2});
            return res;
        };
        var theRect = function (vml, x, y, w, h, r) {
            var g = createNode("group");
            var o = createNode(r ? "roundrect" : "rect");
            if (r) {
                o.arcsize = r / (Math.min(w, h));
            }
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "rect";
            setFillAndStroke(res, {stroke: "#000"});
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = w;
            res.attrs.h = h;
            res.attrs.r = r;
            res.setBox({x: x, y: y, width: w, height: h});
            return res;
        };
        var theEllipse = function (vml, x, y, rx, ry) {
            var g = createNode("group");
            var o = createNode("oval");
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "ellipse";
            setFillAndStroke(res, {stroke: "#000"});
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.rx = rx;
            res.attrs.ry = ry;
            res.setBox({x: x - rx, y: y - ry, width: rx * 2, height: ry * 2});
            return res;
        };
        var theImage = function (vml, src, x, y, w, h) {
            var g = createNode("group");
            var o = createNode("image");
            o.src = src;
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "image";
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = w;
            res.attrs.h = h;
            res.setBox({x: x, y: y, width: w, height: h});
            return res;
        };
        var theText = function (vml, x, y, text) {
            var g = createNode("group"), gs = g.style;
            var el = createNode("shape"), ol = el.style;
            var path = createNode("path"), ps = path.style;
            path.v = ["m", Math.round(x), ", ", Math.round(y - 2), "l", Math.round(x) + 1, ", ", Math.round(y - 2)].join("");
            path.textpathok = true;
            ol.width = vml.width;
            ol.height = vml.height;
            gs.position = "absolute";
            gs.left = 0;
            gs.top = 0;
            gs.width = vml.width;
            gs.height = vml.height;
            var o = createNode("textpath");
            o.string = text;
            o.on = true;
            o.coordsize = vml.coordsize;
            o.coordorigin = vml.coordorigin;
            el.appendChild(o);
            el.appendChild(path);
            g.appendChild(el);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.shape = el;
            res.textpath = path;
            res.type = "text";
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = 1;
            res.attrs.h = 1;
            setFillAndStroke(res, {font: availableAttrs.font, stroke: "none", fill: "#000"});
            return res;
        };
        var setSize = function (width, height) {
            this.width = width || this.width;
            this.height = height || this.height;
            this.canvas.style.width = this.width + "px";
            this.canvas.style.height = this.height + "px";
            this.canvas.parentNode.style.clip = "rect(0 " + this.width + " " + this.height + " 0)";
            this.canvas.coordsize = this.width + " " + this.height;
            return this;
        };
        doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            if (!doc.namespaces.rvml) {
                doc.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
            }
            var createNode = function (tagName) {
                return doc.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            var createNode = function (tagName) {
                return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
        var create = function () {
            var con = getContainer.apply(null, arguments);
            var container = con.container,
                x = con.x,
                y = con.y,
                width = con.width,
                height = con.height;
            if (!container) {
                throw new Error("VML container not found.");
            }
            var c = doc.createElement("div"),
                d = doc.createElement("div"),
                r = paper.canvas = createNode("group"),
                cs = c.style, rs = r.style;
            paper.width = width;
            paper.height = height;
            width = width || "320px";
            height = height || "200px";
            cs.clip = "rect(0 " + width + "px " + height + "px 0)";
            cs.top = "-2px";
            cs.left = "-2px";
            cs.position = "absolute";
            rs.position = "absolute";
            d.style.position = "relative";
            rs.width  = width;
            rs.height = height;
            r.coordsize = (/%$/.test(width) ? width : parseFloat(width, 10)) + " " + (/%$/.test(height) ? height : parseFloat(height, 10));
            r.coordorigin = "0 0";

            var b = createNode("rect"), bs = b.style;
            bs.left = bs.top = 0;
            bs.width  = rs.width;
            bs.height = rs.height;
            b.filled = b.stroked = "f";

            r.appendChild(b);
            c.appendChild(r);
            d.appendChild(c);
            if (container == 1) {
                doc.body.appendChild(d);
                cs.position = "absolute";
                cs.left = x + "px";
                cs.top = y + "px";
                cs.width = width;
                cs.height = height;
                container = {
                    style: {
                        width: width,
                        height: height
                    }
                };
            } else {
                cs.width = container.style.width = width;
                cs.height = container.style.height = height;
                if (container.firstChild) {
                    container.insertBefore(d, container.firstChild);
                } else {
                    container.appendChild(d);
                }
            }
            for (var prop in paper) {
                container[prop] = paper[prop];
            }
            plugins(container, container, R.fn);
            container.clear = function () {
                var todel = [];
                for (var i = 0, ii = r.childNodes.length; i < ii; i++) {
                    if (r.childNodes[i] != b) {
                        todel.push(r.childNodes[i]);
                    }
                }
                for (i = 0, ii = todel.length; i < ii; i++) {
                    r.removeChild(todel[i]);
                }
            };
            return container;
        };
        paper.remove = function () {
            this.canvas.parentNode.parentNode.parentNode.removeChild(this.canvas.parentNode.parentNode);
        };
        paper.safari = function () {};
    }

    // rest

    // Events
    var addEvent = (function () {
        if (doc.addEventListener) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    return fn.call(element, e);
                };
                obj.addEventListener(type, f, false);
                return function () {
                    obj.removeEventListener(type, f, false);
                    return true;
                };
            };
        } else if (doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    return fn.call(element, e || win.event);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                if (type == "mouseover") {
                    obj.attachEvent("onmouseenter", f);
                    return function () {
                        obj.detachEvent("onmouseenter", f);
                        return detacher();
                    };
                } else if (type == "mouseout") {
                    obj.attachEvent("onmouseleave", f);
                    return function () {
                        obj.detachEvent("onmouseleave", f);
                        return detacher();
                    };
                }
                return detacher;
            };
        }
    })();
    for (var i = events.length; i--;) {
        (function (eventName) {
            Element.prototype[eventName] = function (fn) {
                if (typeof fn == "function") {
                    this.events = this.events || {};
                    this.events[eventName] = this.events[eventName] || {};
                    this.events[eventName][fn] = this.events[eventName][fn] || [];
                    this.events[eventName][fn].push(addEvent(this.shape || this.node, eventName, fn, this));
                }
                return this;
            };
            Element.prototype["un" + eventName] = function (fn) {
                this.events &&
                this.events[eventName] &&
                this.events[eventName][fn] &&
                this.events[eventName][fn].length &&
                this.events[eventName][fn].shift()() &&
                !this.events[eventName][fn].length &&
                delete this.events[eventName][fn];
            };

        })(events[i]);
    }
    paper.circle = function (x, y, r) {
        return theCircle(this, x, y, r);
    };
    paper.rect = function (x, y, w, h, r) {
        return theRect(this, x, y, w, h, r);
    };
    paper.ellipse = function (x, y, rx, ry) {
        return theEllipse(this, x, y, rx, ry);
    };
    paper.path = function (params, pathString) {
        return thePath(params, pathString, this);
    };
    paper.image = function (src, x, y, w, h) {
        return theImage(this, src, x, y, w, h);
    };
    paper.text = function (x, y, text) {
        return theText(this, x, y, text);
    };
    paper.group = function () {
        return this;
    };
    paper.drawGrid = function (x, y, w, h, wv, hv, color) {
        color = color || "#000";
        var path = ["M", x, y, "L", x + w, y, x + w, y + h, x, y + h, x, y],
            rowHeight = h / hv,
            columnWidth = w / wv;
        for (var i = 1; i < hv; i++) {
            path = path.concat(["M", x, y + i * rowHeight, "L", x + w, y + i * rowHeight]);
        }
        for (var i = 1; i < wv; i++) {
            path = path.concat(["M", x + i * columnWidth, y, "L", x + i * columnWidth, y + h]);
        }
        return this.path({stroke: color, "stroke-width": 1}, path.join(","));
    };
    paper.pathfinder = function (p, path) {
        var commands = {
            M: function (x, y) {
                this.moveTo(x, y);
            },
            C: function (x1, y1, x2, y2, x3, y3) {
                this.curveTo(x1, y1, x2, y2, x3, y3);
            },
            Q: function (x1, y1, x2, y2) {
                this.qcurveTo(x1, y1, x2, y2);
            },
            T: function (x, y) {
                this.qcurveTo(x, y);
            },
            S: function (x1, y1, x2, y2) {
                p.curveTo(x1, y1, x2, y2);
            },
            L: function (x, y) {
                p.lineTo(x, y);
            },
            H: function (x) {
                this.lineTo(x, this.last.y);
            },
            V: function (y) {
                this.lineTo(this.last.x, y);
            },
            A: function (rx, ry, xaxisrotation, largearcflag, sweepflag, x, y) {
                this.arcTo(rx, ry, largearcflag, sweepflag, x, y);
            },
            Z: function () {
                this.andClose();
            }
        };

        path = pathToAbsolute(path);
        for (var i = 0, ii = path.length; i < ii; i++) {
            var b = path[i].shift();
            commands[b].apply(p, path[i]);
        }
    };
    paper.set = function (itemsArray) {
        return new Set(itemsArray);
    };
    paper.setSize = setSize;
    Element.prototype.stop = function () {
        clearTimeout(this.animation_in_progress);
    };
    Element.prototype.scale = function (x, y) {
        if (x == null && y == null) {
            return {x: this._.sx, y: this._.sy};
        }
        y = y || x;
        // following line is for IE, apparently NaN is not always falsy
        isNaN(y) && (y = x);
        var dx, dy, cx, cy;
        if (x != 0) {
            var dirx = Math.round(x / Math.abs(x)),
                diry = Math.round(y / Math.abs(y)),
                s = this.node.style;
            dx = this.attr("x");
            dy = this.attr("y");
            cx = this.attr("cx");
            cy = this.attr("cy");
            if (dirx != 1 || diry != 1) {
                if (this.transformations) {
                    this.transformations[2] = "scale(" + [dirx, diry] + ")";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                    dx = (dirx < 0) ? -this.attr("x") - this.attrs.width * x * dirx / this._.sx : this.attr("x");
                    dy = (diry < 0) ? -this.attr("y") - this.attrs.height * y * diry / this._.sy : this.attr("y");
                    cx = this.attr("cx") * dirx;
                    cy = this.attr("cy") * diry;
                } else {
                    this.node.filterMatrix = " progid:DXImageTransform.Microsoft.Matrix(M11=" + dirx +
                        ", M12=0, M21=0, M22=" + diry +
                        ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            } else {
                if (this.transformations) {
                    this.transformations[2] = "";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                } else {
                    this.node.filterMatrix = "";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            }
            switch (this.type) {
                case "rect":
                case "image":
                    this.attr({
                        width: this.attrs.width * x * dirx / this._.sx,
                        height: this.attrs.height * y * diry / this._.sy,
                        x: dx,
                        y: dy
                    });
                    break;
                case "circle":
                case "ellipse":
                    this.attr({
                        rx: this.attrs.rx * x * dirx / this._.sx,
                        ry: this.attrs.ry * y * diry / this._.sy,
                        r: this.attrs.r * x * diry / this._.sx,
                        cx: cx,
                        cy: cy
                    });
                    break;
                case "path":
                    var path = pathToRelative(Raphael.parsePathString(this.attr("path"))),
                        skip = true,
                        dim = pathDimensions(this.attrs.path);
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        if (path[i][0].toUpperCase() == "M" && skip) {
                            continue;
                        } else {
                            skip = false;
                        }
                        if (this.svg && path[i][0].toUpperCase() == "A") {
                            path[i][path[i].length - 2] *= x * dirx;
                            path[i][path[i].length - 1] *= y * diry;
                            path[i][1] *= x;
                            path[i][2] *= y;
                        } else {
                            for (var j = 1, jj = path[i].length; j < jj; j++) {
                                path[i][j] *= (j % 2) ? x * dirx / this._.sx : y * diry / this._.sy;
                            }
                        }
                    }
                    var dim2 = pathDimensions(path),
                        dx = dim.x + dim.width / 2 - dim2.x - dim2.width / 2,
                        dy = dim.y + dim.height / 2 - dim2.y - dim2.height / 2;
                    path = pathToRelative(path);
                    path[0][1] += dx;
                    path[0][2] += dy;

                    this.attr({path: path.join(" ")});
            }
        }
        this._.sx = x;
        this._.sy = y;
        return this;
    };
    Element.prototype.animate = function (params, ms, callback) {
        clearTimeout(this.animation_in_progress);
        var from = {},
            to = {},
            diff = {},
            t = {x: 0, y: 0};
        for (var attr in params) {
            if (attr in availableAnimAttrs) {
                from[attr] = this.attr(attr);
                if (typeof from[attr] == "undefined") {
                    from[attr] = availableAttrs[attr];
                }
                to[attr] = params[attr];
                switch (availableAnimAttrs[attr]) {
                    case "number":
                        diff[attr] = (to[attr] - from[attr]) / ms;
                        break;
                    case "colour":
                        from[attr] = getRGB(from[attr]);
                        var toColour = getRGB(to[attr]);
                        diff[attr] = {
                            r: (toColour.r - from[attr].r) / ms,
                            g: (toColour.g - from[attr].g) / ms,
                            b: (toColour.b - from[attr].b) / ms
                        };
                        break;
                    case "path":
                        var pathes = pathEqualiser(from[attr], to[attr]);
                        from[attr] = pathes[0];
                        to[attr] = pathes[1];
                        diff[attr] = [];
                        for (var i = 0, ii = from[attr].length; i < ii; i++) {
                            diff[attr][i] = [0];
                            for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                            }
                        }
                        break;
                    case "csv":
                        var values = params[attr].toString().split(separator),
                            from2 = from[attr].toString().split(separator);
                        if (attr == "translation") {
                            from[attr] = [0, 0];
                            diff[attr] = [values[0] / ms, values[1] / ms];
                        } else if (attr == "rotation") {
                            from[attr] = (from2[1] == values[1] && from2[2] == values[2]) ? from2 : [0, values[1], values[2]];
                            diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0];
                        } else {
                            from[attr] = (from[attr] + "").split(separator);
                            diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][0]) / ms];
                        }
                        to[attr] = values;
                }
            }
        }
        var start = new Date(),
            prev = 0,
            that = this;
        (function () {
            var time = (new Date()).getTime() - start.getTime(),
                set = {},
                now;
            if (time < ms) {
                for (var attr in from) {
                    switch (availableAnimAttrs[attr]) {
                        case "number":
                            now = +from[attr] + time * diff[attr];
                            break;
                        case "colour":
                            now = "rgb(" + [
                                Math.round(from[attr].r + time * diff[attr].r),
                                Math.round(from[attr].g + time * diff[attr].g),
                                Math.round(from[attr].b + time * diff[attr].b)
                            ].join(",") + ")";
                            break;
                        case "path":
                            now = [];
                            for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                now[i] = [from[attr][i][0]];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    now[i][j] = from[attr][i][j] + time * diff[attr][i][j];
                                }
                                now[i] = now[i].join(" ");
                            }
                            now = now.join(" ");
                            break;
                        case "csv":
                            if (attr == "translation") {
                                var x = diff[attr][0] * (time - prev),
                                    y = diff[attr][1] * (time - prev);
                                t.x += x;
                                t.y += y;
                                now = [x, y].join(" ");
                            } else if (attr == "rotation") {
                                now = +from[attr][0] + time * diff[attr][0];
                                from[attr][1] && (now += "," + from[attr][1] + "," + from[attr][2]);
                            } else {
                                now = [+from[attr][0] + time * diff[attr][0], +from[attr][1] + time * diff[attr][1]].join(" ");
                            }
                            break;
                    }
                    if (attr == "font-size") {
                        set[attr] = now + "px";
                    } else {
                        set[attr] = now;
                    }
                }
                that.attr(set);
                that.animation_in_progress = setTimeout(arguments.callee, 0);
                paper.safari();
            } else {
                (t.x || t.y) && that.translate(-t.x, -t.y);
                that.attr(params);
                clearTimeout(that.animation_in_progress);
                paper.safari();
                (typeof callback == "function") && callback.call(that);
            }
            prev = time;
        })();
        return this;
    };
    Element.prototype.translate = function (x, y) {
        if (x == null) {
            return {x: this._.tx, y: this._.ty};
        }
        this._.tx += +x;
        this._.ty += +y;
        switch (this.type) {
            case "circle":
            case "ellipse":
                this.attr({cx: this.attrs.cx + x, cy: this.attrs.cy + y});
                break;
            case "rect":
            case "image":
            case "text":
                this.attr({x: this.attrs.x + +x, y: this.attrs.y + +y});
                break;
            case "path":
                var path = pathToRelative(this.attrs.path);
                path[0][1] += +x;
                path[0][2] += +y;
                this.attr({path: path.join(" ")});
            break;
        }
        return this;
    };

    // Set
    var Set = function (itemsArray) {
        this.items = [];
        this.length = (itemsArray && itemsArray.length) || 0;
        if (itemsArray && itemsArray.constructor == Array) {
            for (var i = itemsArray.length; i--;) {
                if (itemsArray[i].constructor == Element) {
                    this.items[this.items.length] = itemsArray[i];
                }
            }
        }
    };
    Set.prototype.push = function (item) {
        if (item && item.constructor == Element) {
            var len = this.items.length;
            this.items[len] = item;
            this[len] = item;
            this.length++;
        }
        return this;
    };
    Set.prototype.pull = function (id) {
        var res = this.items.splice(id, 1)[0];
        for (var j = id, jj = this.items.length; j < jj; j++) {
            this[j] = this[j + 1];
        }
        delete this[jj + 1];
        this.length--;
        return res;
    };
    for (var method in Element.prototype) {
        Set.prototype[method] = (function (methodname) {
            return function () {
                for (var i = this.items.length; i--;) {
                    this.items[i][methodname].apply(this.items[i], arguments);
                }
                return this;
            };
        })(method);
    }
    Set.prototype.getBBox = function () {
        var x = [], y = [], w = [], h = [];
        for (var i = this.items.length; i--;) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            w.push(box.x + box.width);
            h.push(box.y + box.height);
        }
        x = Math.min.apply(Math, x);
        y = Math.min.apply(Math, y);
        return {
            x: x,
            y: y,
            width: Math.max.apply(Math, w) - x,
            height: Math.max.apply(Math, h) - y
        };
    };

    return R;
})();
/* ======================================================================
    src/modestmaps.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = {};
    }
}

//////////////////////////// Make inheritance bearable

com.modestmaps.extend = function(child, parent) {
    for (var property in parent.prototype) {
        if (typeof child.prototype[property] == "undefined") {
            child.prototype[property] = parent.prototype[property];
        }
    }
    return child;
};

/////////////////////////// Eeeeeeeeeeeeeeeeeeeeeevents

com.modestmaps.cancelEvent = function(e) {
    //console.log('cancel: ' + e);
    // there's more than one way to skin this cat
    e.cancelBubble = true;
    e.cancel = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();    
    return false;
};

// see http://ejohn.org/apps/jselect/event.html for the originals

com.modestmaps.addEvent = function( obj, type, fn ) {
    if ( obj.attachEvent ) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent( 'on'+type, obj[type+fn] );
    }
    else {
        obj.addEventListener( type, fn, false );
        if (type == 'mousewheel') {
            obj.addEventListener( 'DOMMouseScroll', fn, false );
        }
    }
};

com.modestmaps.removeEvent = function( obj, type, fn ) {
    if ( obj.detachEvent ) {
        obj.detachEvent( 'on'+type, obj[type+fn] );
        obj[type+fn] = null;
    }
    else {
        obj.removeEventListener( type, fn, false );
        if (type == 'mousewheel') {
            obj.removeEventListener( 'DOMMouseScroll', fn, false );
        }
    }
};

//////////////////////////// Core

com.modestmaps.Point = function(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
};

com.modestmaps.Point.prototype = {
    x: 0,
    y: 0,
    toString: function() {
        return "(" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ")";
    }
};

com.modestmaps.Coordinate = function(row, column, zoom) {
    this.row = row;
    this.column = column;
    this.zoom = zoom;
};

com.modestmaps.Coordinate.prototype = {

    row: 0,
    column: 0,
    zoom: 0,

    toString: function() {
        return "(" + this.row.toFixed(3) + ", " + this.column.toFixed(3) + " @" + this.zoom.toFixed(3) + ")";
    },

    toKey: function() {
        var a = parseInt(this.row);
        var b = parseInt(this.column);
        var c = parseInt(this.zoom);
        a=a-b;	a=a-c;	a=a^(c >>> 13);
        b=b-c;	b=b-a;	b=b^(a << 8); 
        c=c-a;	c=c-b;	c=c^(b >>> 13);
        a=a-b;	a=a-c;	a=a^(c >>> 12);
        b=b-c;	b=b-a;	b=b^(a << 16);
        c=c-a;	c=c-b;	c=c^(b >>> 5);
        a=a-b;	a=a-c;	a=a^(c >>> 3);
        b=b-c;	b=b-a;	b=b^(a << 10);
        c=c-a;	c=c-b;	c=c^(b >>> 15);
        return c;
    },

    copy: function() {
        return new com.modestmaps.Coordinate(this.row, this.column, this.zoom);
    },

    container: function() {
        return new com.modestmaps.Coordinate(Math.floor(this.row), Math.floor(this.column), Math.floor(this.zoom));
    },

    zoomTo: function(destination) {
        var power = Math.pow(2, destination - this.zoom);
        return new com.modestmaps.Coordinate(this.row * power,
                          this.column * power,
                          destination);
    },
    
    zoomBy: function(distance) {
        var power = Math.pow(2, distance);
        return new com.modestmaps.Coordinate(this.row * power,
                          this.column * power,
                          this.zoom + distance);
    },

    up: function(distance) {
        if (distance == undefined)	distance = 1;
        return new com.modestmaps.Coordinate(this.row - distance, this.column, this.zoom);
    },

    right: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row, this.column + distance, this.zoom);
    },

    down: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row + distance, this.column, this.zoom);
    },

    left: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row, this.column - distance, this.zoom);
    }
};

//////////////////////////// Geo

com.modestmaps.Location = function(lat, lon) {
    this.lat = parseFloat(lat);
    this.lon = parseFloat(lon);
};

com.modestmaps.Location.prototype = {
    lat: 0,
    lon: 0,
    toString: function() {
        return "(" + this.lat.toFixed(3) + ", " + this.lon.toFixed(3) + ")";
    }
};

com.modestmaps.Transformation = function(ax, bx, cx, ay, by, cy) {
    this.ax = ax;
    this.bx = bx;
    this.cx = cx;
    this.ay = ay;
    this.by = by;
    this.cy = cy;
};

com.modestmaps.Transformation.prototype = {
    ax: 0, 
    bx: 0, 
    cx: 0, 
    ay: 0, 
    by: 0, 
    cy: 0,
    
    transform: function(point) {
        return new com.modestmaps.Point(this.ax*point.x + this.bx*point.y + this.cx,
                         this.ay*point.x + this.by*point.y + this.cy);
    },
                         
    untransform: function(point) {
        return new com.modestmaps.Point((point.x*this.by - point.y*this.bx - this.cx*this.by + this.cy*this.bx) / (this.ax*this.by - this.ay*this.bx),
                         (point.x*this.ay - point.y*this.ax - this.cx*this.ay + this.cy*this.ax) / (this.bx*this.ay - this.by*this.ax));
    },

    deriveTransformation: function(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y, c1x, c1y, c2x, c2y) {
        // Generates a transform based on three pairs of points, a1 -> a2, b1 -> b2, c1 -> c2.
        var x = this.linearSolution(a1x, a1y, a2x, b1x, b1y, b2x, c1x, c1y, c2x);
        var y = this.linearSolution(a1x, a1y, a2y, b1x, b1y, b2y, c1x, c1y, c2y);
        return new com.modestmaps.Transformation(x[0], x[1], x[2], y[0], y[1], y[2]);
    },

    linearSolution: function(r1, s1, t1, r2, s2, t2, r3, s3, t3) {
        /* Solves a system of linear equations.

          t1 = (a * r1) + (b + s1) + c
          t2 = (a * r2) + (b + s2) + c
          t3 = (a * r3) + (b + s3) + c

        r1 - t3 are the known values.
        a, b, c are the unknowns to be solved.
        returns the a, b, c coefficients.
        */

        // make them all floats
        r1 = parseFloat(r1);
        s1 = parseFloat(s1);
        t1 = parseFloat(t1);
        r2 = parseFloat(r2);
        s2 = parseFloat(s2);
        t2 = parseFloat(t2);
        r3 = parseFloat(r3);
        s3 = parseFloat(s3);
        t3 = parseFloat(t3);

        var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3))) / (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3)));

        var b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3))) / (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));

        var c = t1 - (r1 * a) - (s1 * b);
    
        return [ a, b, c ];
    }
};

com.modestmaps.Projection = function(zoom, transformation) {
    if (!transformation) transformation = com.modestmaps.Transformation(1, 0, 0, 0, 1, 0);
    this.zoom = zoom;
    this.transformation = transformation;
};

com.modestmaps.Projection.prototype = {

    zoom: 0,
    transformation: null,
    
    rawProject: function(point) {
        alert("Abstract method not implemented by subclass.");
    },
        
    rawUnproject: function(point) {
        alert("Abstract method not implemented by subclass.");
    },

    project: function(point) {
        point = this.rawProject(point);
        if(this.transformation) {
            point = this.transformation.transform(point);
        }
        return point;
    },
    
    unproject: function(point) {
        if(this.transformation) {
            point = this.transformation.untransform(point);
        }
        point = this.rawUnproject(point);
        return point;
    },
        
    locationCoordinate: function(location) {
        var point = new com.modestmaps.Point(Math.PI * location.lon / 180.0, Math.PI * location.lat / 180.0);
        point = this.project(point);
        return new com.modestmaps.Coordinate(point.y, point.x, this.zoom);
    },

    coordinateLocation: function(coordinate) {
        coordinate = coordinate.zoomTo(this.zoom);
        var point = new com.modestmaps.Point(coordinate.column, coordinate.row);
        point = this.unproject(point);
        return new com.modestmaps.Location(180.0 * point.y / Math.PI, 180.0 * point.x / Math.PI);
    }
};

com.modestmaps.LinearProjection = function(zoom, transformation) {
    com.modestmaps.Projection.call(this, zoom, transformation);
};

com.modestmaps.LinearProjection.prototype = {
    rawProject: function(point) {
        return new com.modestmaps.Point(point.x, point.y);
    },
    rawUnproject: function(point) {
        return new com.modestmaps.Point(point.x, point.y);
    }
};

com.modestmaps.extend(com.modestmaps.LinearProjection, com.modestmaps.Projection);

com.modestmaps.MercatorProjection = function(zoom, transformation) {
    // super!
    com.modestmaps.Projection.call(this, zoom, transformation);
};

com.modestmaps.MercatorProjection.prototype = {
    rawProject: function(point) {
        return new com.modestmaps.Point(point.x,
                     Math.log(Math.tan(0.25 * Math.PI + 0.5 * point.y)));
    },

    rawUnproject: function(point) {
        return new com.modestmaps.Point(point.x,
                     2 * Math.atan(Math.pow(Math.E, point.y)) - 0.5 * Math.PI);
    }
};

com.modestmaps.extend(com.modestmaps.MercatorProjection, com.modestmaps.Projection);

//////////////////////////// Providers

com.modestmaps.MapProvider = function(getTileUrl) {
    if (getTileUrl) {
        this.getTileUrl = getTileUrl;
    }
};

com.modestmaps.MapProvider.prototype = {

    // defaults to Google-y Mercator style maps
    // see http://modestmaps.com/calculator.html for how to generate these magic numbers
    projection: new com.modestmaps.MercatorProjection(26, new com.modestmaps.Transformation(1.068070779e7, 0, 3.355443185e7, 0, -1.068070890e7, 3.355443057e7)),
    tileWidth: 256,
    tileHeight: 256,

    getTileUrl: function(coordinate) {
        alert("Abstract method not implemented by subclass.");
    },
    
    locationCoordinate: function(location) {
        return this.projection.locationCoordinate(location);
    },

    coordinateLocation: function(location) {
        return this.projection.coordinateLocation(location);
    },

    sourceCoordinate: function(coordinate) {
        var wrappedColumn = coordinate.column % Math.pow(2, coordinate.zoom);

        while (wrappedColumn < 0) {
            wrappedColumn += Math.pow(2, coordinate.zoom);
        }
            
        return new com.modestmaps.Coordinate(coordinate.row, wrappedColumn, coordinate.zoom);
    }
};

com.modestmaps.BlueMarbleProvider = function() {
    com.modestmaps.MapProvider.call(this, function(coordinate) {
        var img = coordinate.zoom.toFixed(0) +'-r'+ coordinate.row.toFixed(0) +'-c'+ coordinate.column.toFixed(0) + '.jpg';
        return 'http://s3.amazonaws.com/com.modestmaps.bluemarble/' + img;
    });
};

com.modestmaps.extend(com.modestmaps.BlueMarbleProvider, com.modestmaps.MapProvider);

//////////////////////////// Map

com.modestmaps.Map = function(parent, provider, dimensions) {
    /* Instance of a map intended for drawing to a div.
    
        parent
            DOM element
    
        provider
            Instance of IMapProvider
            
        dimensions
            Size of output image, instance of Point

    */
    if (typeof parent == 'string') {
        parent = document.getElementById(parent);
    }
    this.parent = parent;
    
    this.parent.style.position = 'relative';
    this.parent.style.width = parseInt(dimensions.x) + 'px';
    this.parent.style.height = parseInt(dimensions.y) + 'px';
    this.parent.style.padding = '0';
    this.parent.style.overflow = 'hidden';
    this.parent.style.backgroundColor = '#eee';
    
    com.modestmaps.addEvent(this.parent, 'dblclick', this.getDoubleClick());
    com.modestmaps.addEvent(this.parent, 'mousedown', this.getMouseDown());
    com.modestmaps.addEvent(this.parent, 'mousewheel', this.getMouseWheel());

    // add an invisible layer so that image.onload will have a srcElement in IE6
    this.loadingLayer = document.createElement('div');
    this.loadingLayer.id = 'loading layer';
    this.loadingLayer.style.display = 'none';
    this.parent.appendChild(this.loadingLayer);

    this.layers = [];

    // add a div for each zoom level
    for (var z = 0; z <= 20; z++) {
        var layer = document.createElement('div');
        layer.id = 'zoom-'+z;
        layer.style.margin = '0';
        layer.style.padding = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.position = 'absolute';
        layer.style.top = '0px';
        layer.style.left = '0px';
        this.parent.appendChild(layer);
        this.layers.push(layer);
    }
    
    this.provider = provider;
    this.dimensions = dimensions;
    this.coordinate = new com.modestmaps.Coordinate(0.5,0.5,0);
    this.tiles = {};
    this.requestedTiles = {};

    this.requestCount = 0;
    this.maxSimultaneousRequests = 4;
    this.requestQueue = [];
    
    this.tileCacheSize = 0;
    
    this.callbacks = { zoomed: [], panned: [], centered: [], extentset: [] };
};

com.modestmaps.Map.prototype = {

    parent: null,
    provider: null,
    dimensions: null,
    coordinate: null,

    tiles: null,
    requestedTiles: null,
    layers: null,

    requestCount: null,
    maxSimultaneousRequests: null,
    requestQueue: null,
    
    tileCacheSize: null,
    
    callbacks: null,

    toString: function() {
        return 'Map(' + this.provider.toString() + this.dimensions.toString() + this.coordinate.toString() + ')';
    },
    
    addCallback: function(event, callback)
    {
        if (typeof(callback) == 'function' && this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    },
    
    dispatchCallback: function(event, message)
    {
        if(this.callbacks[event]) {
            for (var i = 0; i < this.callbacks[event].length; i += 1) {
                try {
                    this.callbacks[event][i](this, message);
                } catch(e) {
                    // meh
                }
            }
        }
    },

    createOverlay: function(id) 
    {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = this.dimensions.x;
        canvas.height = this.dimensions.y;
        canvas.style.margin = '0';
        canvas.style.padding = '0';
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';        
        this.parent.appendChild(canvas);
    },

    // events

    mouseDownHandler: null,

    getMouseDown: function() {
        if (!this.mouseDownHandler) {
            var theMap = this;
            this.mouseDownHandler = function(e) {
                if (!e) var e = window.event;
    
                com.modestmaps.addEvent(document, 'mouseup', theMap.getMouseUp());
                com.modestmaps.addEvent(document, 'mousemove', theMap.getMouseMove());
                        
                theMap.prevMouse = new com.modestmaps.Point(e.clientX, e.clientY);
                
                theMap.parent.style.cursor = 'move';
            
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseDownHandler;
    },
    
    mouseMoveHandler: null,
    
    getMouseMove: function() {
        if (!this.mouseMoveHandler) {
            var theMap = this;
            this.mouseMoveHandler = function(e) {
                if (!e) e = window.event;
    
                if (theMap.prevMouse) {
                    theMap.panBy(e.clientX - theMap.prevMouse.x, e.clientY - theMap.prevMouse.y);
                    theMap.prevMouse.x = e.clientX;
                    theMap.prevMouse.y = e.clientY;
                }
            
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseMoveHandler;
    },

    mouseUpHandler: null,

    getMouseUp: function() {
        if (!this.mouseUpHandler) {
            var theMap = this;
            this.mouseUpHandler = function(e) {
                if (!e) e = window.event;
    
                com.modestmaps.removeEvent(document, 'mouseup', theMap.getMouseUp());
                com.modestmaps.removeEvent(document, 'mousemove', theMap.getMouseMove());
        
                theMap.prevMouse = null;

                theMap.parent.style.cursor = '';                
        
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseUpHandler;
    },
    
    mouseWheelHandler: null,

    getMouseWheel: function() {
        if (!this.mouseWheelHandler) {
            var theMap = this;
            var prevTime = new Date().getTime();
            this.mouseWheelHandler = function(e) {
                if (!e) e = window.event;
    
                var delta = 0;
                
                if (e.wheelDelta) {
                    delta = e.wheelDelta;
                }
                else if (e.detail) {
                    delta = -e.detail;
                }
    
                // limit mousewheeling to once every 200ms
                var timeSince = new Date().getTime() - prevTime;
    
                if (delta != 0 && (timeSince > 200)) {
                    
                    var point = theMap.getMousePoint(e);
                    
                    theMap.zoomByAbout(delta > 0 ? 1 : -1, point);
                    
                    prevTime = new Date().getTime();
                }
                
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseWheelHandler;
    },

    doubleClickHandler: null,

    getDoubleClick: function() {
        if (!this.doubleClickHandler) {
            var theMap = this;
            this.doubleClickHandler = function(e) {
                if (!e) e = window.event;
    
                var point = theMap.getMousePoint(e);
                
                // use shift-double-click to zoom out
                theMap.zoomByAbout(e.shiftKey ? -1 : 1, point);    
                
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.doubleClickHandler;
    },

    // interaction helper

    getMousePoint: function(e)
    {
        // start with just the mouse (x, y)
        var point = new com.modestmaps.Point(e.clientX, e.clientY);
        
        // correct for scrolled document
        point.x += document.body.scrollLeft + document.documentElement.scrollLeft;
        point.y += document.body.scrollTop + document.documentElement.scrollTop;

        // correct for nested offsets in DOM
        for(var node = this.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        
        return point;
    },
    
    // zooming
    
    zoomIn: function() {
        this.zoomBy(1);
    },

    zoomOut: function() {
        this.zoomBy(-1);
    },
    
    setZoom: function(z) {
        this.zoomBy(z - this.coordinate.zoom);
    },
    
    zoomBy: function(zoomOffset) {
        this.coordinate = this.coordinate.zoomBy(zoomOffset);
        this.draw();

        this.dispatchCallback('zoomed', zoomOffset);
    },
    
    zoomByAbout: function(zoomOffset, point) {
        var location = this.pointLocation(point);
        this.coordinate = this.coordinate.zoomBy(zoomOffset);
        var newPoint = this.locationPoint(location);
        this.panBy(point.x - newPoint.x, point.y - newPoint.y);

        this.dispatchCallback('zoomed', zoomOffset);
    },

    // panning
    
    panBy: function(dx, dy) {
        this.coordinate.column -= dx / this.provider.tileWidth;
        this.coordinate.row -= dy / this.provider.tileHeight;
        this.draw();

        this.dispatchCallback('panned', [dx, dy]);
    },

    panLeft: function() {
        this.panBy(100,0);
    },
    
    panRight: function() {
        this.panBy(-100,0);
    },
    
    panDown: function() {
        this.panBy(0,-100);
    },
    
    panUp: function() {
        this.panBy(0,100);
    },
    
    // positioning
    
    setCenter: function(location) {
        this.setCenterZoom(location, this.coordinate.zoom);
    },
    
    setCenterZoom: function(location, zoom) {
        this.coordinate = this.provider.locationCoordinate(location).zoomTo(zoom);
        this.draw();

        this.dispatchCallback('centered', [location, zoom]);
    },

    setExtent: function(locations) {

        var TL, BR;
        for (var i = 0; i < locations.length; i++) {
            var coordinate = this.provider.locationCoordinate(locations[i]);
            if (TL) {
                TL.row = Math.min(TL.row, coordinate.row);
                TL.column = Math.min(TL.column, coordinate.column);
                TL.zoom = Math.min(TL.zoom, coordinate.zoom);
                BR.row = Math.max(BR.row, coordinate.row);
                BR.column = Math.max(BR.column, coordinate.column);
                BR.zoom = Math.max(BR.zoom, coordinate.zoom);
            }
            else {
                TL = coordinate.copy();
                BR = coordinate.copy();
            }
        }
        
        var width = this.dimensions.x + 1;
        var height = this.dimensions.y + 1; 
        
        // multiplication factor between horizontal span and map width
        var hFactor = (BR.column - TL.column) / (width / this.provider.tileWidth);
    
        // multiplication factor expressed as base-2 logarithm, for zoom difference
        var hZoomDiff = Math.log(hFactor) / Math.log(2);
            
        // possible horizontal zoom to fit geographical extent in map width
        var hPossibleZoom = TL.zoom - Math.ceil(hZoomDiff);
            
        // multiplication factor between vertical span and map height
        var vFactor = (BR.row - TL.row) / (height / this.provider.tileHeight);
            
        // multiplication factor expressed as base-2 logarithm, for zoom difference
        var vZoomDiff = Math.log(vFactor) / Math.log(2);
            
        // possible vertical zoom to fit geographical extent in map height
        var vPossibleZoom = TL.zoom - Math.ceil(vZoomDiff);
            
        // initial zoom to fit extent vertically and horizontally
        var initZoom = Math.min(hPossibleZoom, vPossibleZoom);
    
        // additionally, make sure it's not outside the boundaries set by provider limits
        // initZoom = min(initZoom, provider.outerLimits()[1].zoom)
        // initZoom = max(initZoom, provider.outerLimits()[0].zoom)
    
        // coordinate of extent center
        var centerRow = (TL.row + BR.row) / 2;
        var centerColumn = (TL.column + BR.column) / 2;
        var centerZoom = TL.zoom;
        
        this.coordinate = new com.modestmaps.Coordinate(centerRow, centerColumn, centerZoom).zoomTo(initZoom);
        this.draw();

        this.dispatchCallback('extentset', locations);
    },
    
    // projecting points on and off screen
    
    coordinatePoint: function(coord)
    {
        /* Return an x, y point on the map image for a given coordinate. */
        
        if(coord.zoom != this.coordinate.zoom) {
            coord = coord.zoomTo(this.coordinate.zoom);
        }
        
        // distance from the center of the map
        var point = new com.modestmaps.Point(this.dimensions.x/2, this.dimensions.y/2);
        point.x += this.provider.tileWidth * (coord.column - this.coordinate.column);
        point.y += this.provider.tileHeight * (coord.row - this.coordinate.row);
        
        return point;
    },

    pointCoordinate: function(point)
    {
        /* Return a coordinate on the map image for a given x, y point. */
        
        // new point coordinate reflecting distance from map center, in tile widths
        var coord = this.coordinate.copy();
        coord.column += (point.x - this.dimensions.x/2) / this.provider.tileWidth;
        coord.row += (point.y - this.dimensions.y/2) / this.provider.tileHeight;
        
        return coord;
    },

    locationPoint: function(location)
    {
        /* Return an x, y point on the map image for a given geographical location. */
        return this.coordinatePoint(this.provider.locationCoordinate(location));
    },
    
    pointLocation: function(point)
    {
        /* Return a geographical location on the map image for a given x, y point. */
        return this.provider.coordinateLocation(this.pointCoordinate(point));
    },
    
    // inspecting

    getExtent: function() {
        var extent = [];
        extent.push(this.pointLocation(new com.modestmaps.Point(0,0)));
        extent.push(this.pointLocation(this.dimensions));
        return extent;
    },
    
    getCenter: function() {
        return this.provider.coordinateLocation(this.coordinate);
    },
    
    getZoom: function() {
        return this.coordinate.zoom;
    },
    
    // rendering    
    
    draw: function(onlyThisLayer) {

//        console.log('requestQueue: ' + this.requestQueue.length);
//        console.log('requestCount: ' + this.requestCount);
//        console.log('tileCacheSize: ' + this.tileCacheSize);

        //console.log('--- begin draw ' + onlyThisLayer);
        
        // so this is the corner, taking the container offset into account
        var baseCoord = this.coordinate.container();
        var baseCorner = new com.modestmaps.Point(this.dimensions.x/2, this.dimensions.y/2);
        baseCorner.x += (baseCoord.column - this.coordinate.column) * this.provider.tileWidth;
        baseCorner.y += (baseCoord.row - this.coordinate.row) * this.provider.tileHeight;

        // get back to the top left
        while (baseCorner.x > 0) {
            baseCorner.x -= this.provider.tileWidth;
            baseCoord.column -= 1;
        }
        while (baseCorner.y > 0) {
            baseCorner.y -= this.provider.tileHeight;
            baseCoord.row -= 1;
        }

        var wantedTiles = { };
        
        var thisLayer = document.getElementById('zoom-'+parseInt(baseCoord.zoom));
        thisLayer.coordinate = this.coordinate.copy();
        
        var showParentLayer = false;
        
        var tileCoord = baseCoord.copy();

        for (var y = baseCorner.y; y < this.dimensions.y; y += this.provider.tileHeight) {
            for (var x = baseCorner.x; x < this.dimensions.x; x += this.provider.tileWidth) {
                var tileKey = tileCoord.toKey();
                wantedTiles[tileKey] = true;
                if (!this.tiles[tileKey]) {
                    if (!this.requestedTiles[tileKey]) {
                        this.requestTile(tileCoord);
                    }
                    showParentLayer = true;
                    if (!onlyThisLayer) {
                        for (var pz = 1; pz <= 5; pz++) {
                            var parentKey = tileCoord.zoomBy(-pz).container().toKey();
                            wantedTiles[parentKey] = true;
                        }
                        var childCoord = tileCoord.zoomBy(1);
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.column += 1;
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.row += 1;
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.column -= 1;
                        wantedTiles[childCoord.toKey()] = true;
                    }
                }
                else {
                    var tile = this.tiles[tileKey];
                    if (!document.getElementById(tile.id)) {
                        thisLayer.appendChild(tile);
                    }
                    tile.style.left = x + 'px';
                    tile.style.top = y + 'px';
                }
                tileCoord.column += 1;
            }
            tileCoord.row += 1;
            tileCoord.column = baseCoord.column;
        }
        
        //console.log(showParentLayer);
        
        if (!onlyThisLayer || !showParentLayer) {

            // layers that would be scaled too big:
            for (var i = 0; i < baseCoord.zoom-5; i++) {
                var layer = this.layers[i];
                layer.style.display = 'none';

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    layer.removeChild(visibleTiles[j]);
                }                    
            }

            // layers that would be scaled too small, and tiles would be too numerous:
            for (var i = baseCoord.zoom+2; i < this.layers.length; i++) {
                var layer = this.layers[i];
                layer.style.display = 'none';

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    layer.removeChild(visibleTiles[j]);
                }                    
            }
        
            // layers we want to see, if they have tiles that are in wantedTiles
            for (var i = Math.max(0, baseCoord.zoom-5); i < Math.min(baseCoord.zoom+2, this.layers.length); i++) {

                var layer = this.layers[i];

                var scale = 1;

                var theCoord = null;

                if (layer.coordinate) {
                    layer.style.display = 'block';
                    if (layer != thisLayer) {
                        theCoord = this.coordinate.zoomTo(layer.coordinate.zoom);
                        scale = Math.pow(2, this.coordinate.zoom - layer.coordinate.zoom);
                    }
                }
                else {
                    layer.style.display = 'none';
                }

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    var tile = visibleTiles[j];
                    if (!wantedTiles[tile.id]) {
                        layer.removeChild(tile);
                    }
                    else if (theCoord) {
                        var tx = ((this.dimensions.x/2) + (tile.coord.column - theCoord.column) * this.provider.tileWidth * scale);
                        var ty = ((this.dimensions.y/2) + (tile.coord.row - theCoord.row) * this.provider.tileHeight * scale);
                        tile.style.left = parseInt(tx) + 'px'; 
                        tile.style.top = parseInt(ty) + 'px'; 
                        tile.width = this.provider.tileWidth * scale;
                        tile.height = this.provider.tileHeight * scale;
                    }
                    else {
                        tile.width = this.provider.tileWidth;
                        tile.height = this.provider.tileHeight;                    
                    }
                }
            }
            
        }

        for (var tileKey in this.requestedTiles) {
            if (!wantedTiles[tileKey]) {
                var tile = this.requestedTiles[tileKey];
                this.cancelTileRequest(tile);
                tile = null;
            }
        }
        
        this.processQueue();
        
        //console.log('--- end draw ' + onlyThisLayer);
    },
    
    redrawTimer: undefined,
    
    requestRedraw: function() {
        if (this.redrawTimer) clearTimeout(this.redrawTimer);
        this.redrawTimer = setTimeout(this.getRedraw(), 1000);
    },

    _redraw: null,
    
    getRedraw: function() {
        // let's only create this closure once...
        if (!this._redraw) {
            var theMap = this;
            this._redraw = function() {
                theMap.draw();
            }
        }
        return this._redraw;
    },
    
    requestTile: function(tileCoord) {
        var tileKey = tileCoord.toKey();
        if (!this.requestedTiles[tileKey]) {
            var tile = document.createElement('img'); // TODO: benchmark vs new Image() (in all browsers)
            tile.id = tileKey;
            tile.width = this.provider.tileWidth;
            tile.height = this.provider.tileHeight;
            tile.style.position = 'absolute';
            this.requestedTiles[tileKey] = tile;
            this.requestQueue.push( { tile: tile, coord: tileCoord.copy() });
        }
    },
    
    processQueue: function() {
        if (this.requestQueue.length > 8) {
            this.requestQueue.sort(this.getCenterDistanceCompare());
        }
        while (this.requestCount < this.maxSimultaneousRequests && this.requestQueue.length > 0) {
            var request = this.requestQueue.pop();
            if (request) {
                this.requestCount++;
                // add it to the DOM in a hidden layer, this is a bit of a hack, but it's
                // so that the event we get in image.onload has srcElement assigned in IE6
                this.loadingLayer.appendChild(request.tile);                
                // set these before tile.src to avoid missing a tile that's already cached            
                request.tile.onload = request.tile.onerror = this.getLoadComplete();
                request.tile.src = this.provider.getTileUrl(request.coord);
                request.tile.coord = request.coord; // FIXME: store this elsewhere to avoid scary memory leaks
                // keep things tidy
                request.tile = request.coord = null;
            }
        }
    },

    cancelTileRequest: function(tile) {
        // whether we've done the request or not...
        delete this.requestedTiles[tile.id];    
        if (tile.src) { // FIXME: what if the tile *should* have a null URL?
            tile.onload = tile.onerror = null;
            //delete tile['coord']; // causes an error in IE6
            tile.coord = null;
            // not sure if this is necessary, but hopefully it guarantees the tile stops loading?
            tile.src = null;
            // pull it back out of the DOM
            this.loadingLayer.removeChild(tile);
            // correct this...
            this.requestCount--;
        }
        else {
            for (var i = 0; i < this.requestQueue.length; i++) {
                var request = this.requestQueue[i];
                if (request && request.tile === tile) {
                    this.requestQueue[i] = null;
                    request.tile = request.coord = null;
                }
            }
        }
    },
    
    _loadComplete: null,
    
    getLoadComplete: function() {
        // let's only create this closure once...
        if (!this._loadComplete) {
            var theMap = this;
            this._loadComplete = function(e) {
                if (!e) var e = event || window.event;

                // srcElement for IE, target for FF, Safari etc.
                var tile = e.srcElement || e.target;

                // unset these straight away so we don't call this twice
                tile.onload = tile.onerror = null;

                // pull it back out of the DOM so that draw will add it correctly later
                theMap.loadingLayer.removeChild(tile);
                
                theMap.requestCount--;

                delete theMap.requestedTiles[tile.id];

                // NB:- complete is also true onerror if we got a 404
                if (tile.complete || (tile.readyState && tile.readyState == 'complete')) {
                    theMap.tiles[tile.id] = tile;
                    theMap.tileCacheSize++;
                }
                else {
                    // if it didn't finish clear its src to make sure it really stops loading
                    // FIXME: if we don't add it to theMap.tiles then we'll request it 
                    // again if and when the map moves - that's probably broken behaviour
                    tile.src = null;
                }
                
                // TODO: can we position the tile here instead of redrawing all tiles?
                theMap.draw(true);
                theMap.requestRedraw(); // all layers, will remove as well as reposition things
            }
        }
        return this._loadComplete;
    },
    
    getCenterDistanceCompare: function() {
        var theCoordinate = this.coordinate;
        return function(r1, r2) {
            if (r1 && r2) {
                var c1 = r1.coord;
                var c2 = r2.coord;
                var ds1 = Math.abs(theCoordinate.row - c1.row) + Math.abs(theCoordinate.column - c1.column);
                var ds2 = Math.abs(theCoordinate.row - c2.row) + Math.abs(theCoordinate.column - c2.column);
                return ds1 < ds2 ? 1 : ds1 > ds2 ? -1 : 0;
            }
            return r1 ? 1 : r2 ? -1 : 0;
        }
    }
    
};
/* ======================================================================
    src/mapproviders/cloudmade.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.CloudMadeProvider = function(key, style) {
    this.key = key;
    this.style = style;
}

com.modestmaps.CloudMadeProvider.prototype = {
    key: null,
    style: null,
    getTileUrl: function(coord) {
        coord = this.sourceCoordinate(coord);
        var worldSize = Math.pow(2, coord.zoom);
        var server = new Array('a.', 'b.', 'c.', '')[parseInt(worldSize * coord.row + coord.column) % 4];
        var imgPath = new Array(this.key, this.style, this.tileWidth, coord.zoom, coord.column, coord.row).join('/');
        return 'http://' + server + 'tile.cloudmade.com/' + imgPath + '.png';
    }
}

com.modestmaps.extend(com.modestmaps.CloudMadeProvider, com.modestmaps.MapProvider);
/* ======================================================================
    src/extras/mapcontrols-raphael.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.MapControls = function(map)
{
    // get your div on
    
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.left = '0px';
    this.div.style.top = '0px';
    map.parent.appendChild(this.div);

    this.canvas = Raphael(this.div, 200, 100);

    /*
    var left = this.canvas.circle(15, 30, 10).attr("fill", "red");
    var lefta = this.canvas.path({fill: "white"}, "M -6 0 L 3 -5 L 3 5").translate(15, 30);
    var down = this.canvas.circle(40, 45, 10).attr("fill", "red");
    var downa = this.canvas.path({fill: "white"}, "M 0 6 L -5 -3 L 5 -3").translate(40, 45);
    var right = this.canvas.circle(65, 30, 10).attr("fill", "red");
    var righta = this.canvas.path({fill: "white"}, "M 6 0 L -3 -5 L -3 5").translate(65, 30);
    var up = this.canvas.circle(40, 15, 10).attr("fill", "red");
    var upa = this.canvas.path({fill: "white"}, "M 0 -6 L -5 3 L 5 3").translate(40, 15);
    */
    var zin = this.canvas.circle(25, 25, 10).attr("fill", "red");
    var zina = this.canvas.path({stroke: "white", 'stroke-width': 2}, "M -5 0 L 5 0 M 0 -5 L 0 5").translate(25, 25);
    var zout = this.canvas.circle(25, 55, 10).attr("fill", "red");
    var zouta = this.canvas.path({stroke: "white", 'stroke-width': 2}, "M -5 0 L 5 0").translate(25, 55);

    /*
    lefta.node.onclick = left.node.onclick = function() { map.panLeft() };
    righta.node.onclick = right.node.onclick = function() { map.panRight() };
    upa.node.onclick = up.node.onclick = function() { map.panUp() };
    downa.node.onclick = down.node.onclick = function() { map.panDown() };
    */
    zina.node.onclick = zin.node.onclick = function() { map.zoomIn() };
    zouta.node.onclick = zout.node.onclick = function() { map.zoomOut() };
    
    /*
    lefta.node.style.cursor = left.node.style.cursor = 'pointer';
    righta.node.style.cursor = right.node.style.cursor = 'pointer';
    upa.node.style.cursor = up.node.style.cursor = 'pointer';
    downa.node.style.cursor = down.node.style.cursor = 'pointer';
    */
    zina.node.style.cursor = zin.node.style.cursor = 'pointer';
    zouta.node.style.cursor = zout.node.style.cursor = 'pointer';
    
};

com.modestmaps.MapControls.prototype = {

    div: null,
    canvas: null
    
};
/* ======================================================================
    src/overlays/polygonmarker-raphael.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.PolygonMarker = function(map, locations, fillStyle, fillAlpha, strokeStyle)
{
    this.fillStyle = fillStyle;
    this.fillAlpha = fillAlpha;
    this.strokeStyle = strokeStyle;

    this.coords = [];

    // top left    
    var maxLat = locations[0].lat;
    var minLon = locations[0].lon;

    // bottom right
    var minLat = locations[0].lat;
    var maxLon = locations[0].lon;
    
    for (var i = 0; i < locations.length; i++) {
        this.coords.push(map.provider.locationCoordinate(locations[i]));
        minLat = Math.min(minLat, locations[i].lat);
        maxLat = Math.max(maxLat, locations[i].lat);
        minLon = Math.min(minLon, locations[i].lon);
        maxLon = Math.max(maxLon, locations[i].lon);
    }

    var topLeftLocation = new com.modestmaps.Location(maxLat, minLon);
    var bottomRightLocation = new com.modestmaps.Location(minLat, maxLon);

//    console.log(topLeftLocation);
//    console.log(bottomRightLocation);
    
    this.topLeftCoord = map.provider.locationCoordinate(topLeftLocation);
    this.bottomRightCoord = map.provider.locationCoordinate(bottomRightLocation);
    
//    console.log(this.topLeftCoord);
//    console.log(this.bottomRightCoord);


    // listen for events
    
    var follower = this;    
    var callback = function(m, a) { return follower.draw(m); };
    map.addCallback('panned', callback);
    map.addCallback('zoomed', callback);
    map.addCallback('centered', callback);
    map.addCallback('extentset', callback);
    
    // get your div on
    
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    map.parent.appendChild(this.div);
    
    this.draw(map);
}

com.modestmaps.PolygonMarker.prototype = {

    div: null,
    canvas: null,

    coords: null,
    topLeftCoord: null,
    bottomRightCoord: null,
    
    drawZoom: null,
    
    fillStyle: null,
    fillAlpha: null,
    strokeStyle: null,
    
    draw: function(map)
    {
        try {
            var point = map.coordinatePoint(this.topLeftCoord);

        } catch(e) {
            // too soon?
            return;
        }
        
        /* if(point.x + this.dimensions.x + this.offset.x < 0) {
            // too far left
            this.div.style.display = 'none';
        
        } else if(point.y + this.dimensions.y + this.offset.y < 0) {
            // too far up
            this.div.style.display = 'none';
        
        } else if(point.x + this.offset.x > map.dimensions.x) {
            // too far right
            this.div.style.display = 'none';
        
        } else if(point.y + this.offset.y > map.dimensions.y) {
            // too far down
            this.div.style.display = 'none';

        } else {
            this.div.style.display = 'block';
            this.div.style.left = point.x + this.offset.x + 'px';
            this.div.style.top = point.y + this.offset.y + 'px';
        } */
        
        this.div.style.display = 'block';
        this.div.style.left = point.x + 'px';
        this.div.style.top = point.y + 'px';

        if (this.drawZoom != map.getZoom()) {

            var topLeftPoint = map.coordinatePoint(this.topLeftCoord);
            var bottomRightPoint = map.coordinatePoint(this.bottomRightCoord);
        
            var canvasWidth = bottomRightPoint.x - topLeftPoint.x;
            var canvasHeight = bottomRightPoint.y - topLeftPoint.y;
        
            if (this.canvas) {
                this.canvas.remove();
                // TODO: resize?
            }

            this.canvas = Raphael(this.div, canvasWidth, canvasHeight);
        
            var points = [];
            for (var i = 0; i < this.coords.length; i++) {
                var point = map.coordinatePoint(this.coords[i]);
                point.x -= topLeftPoint.x;
                point.y -= topLeftPoint.y;
                points.push(point);
            }

            var pathParams = {};

            if (this.fillStyle) {
                pathParams['fill'] = this.fillStyle;
                pathParams['fill-opacity'] = this.fillAlpha;
            }
            if (this.strokeStyle) pathParams['stroke'] = this.strokeStyle;
            
            var path = this.canvas.path(pathParams);

            path.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                path.lineTo(points[i].x, points[i].y);
            }
            path.andClose();
            
            this.drawZoom = map.getZoom();
        }        
        
    },

    clear: function(){
        this.canvas.clear();
        this.coords = [];
    }
};
/* ======================================================================
    uri.js
   ====================================================================== */

/* ======================================================================
    querystring.js
   ====================================================================== */

/* Client-side access to querystring name=value pairs
	Version 1.3
	28 May 2008
	
	License (Simplified BSD):
	http://adamv.com/dev/javascript/qslicense.txt
*/
function Querystring(qs) { // optionally pass a querystring to parse
	this.params = {};
	
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&'); // parse out name/value pairs separated via &
	
// split out each name=value pair
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		
		var value = (pair.length==2)
			? decodeURIComponent(pair[1])
			: name;
		
		this.params[name] = value;
	}
}

Querystring.prototype.get = function(key, default_) {
	var value = this.params[key];
	return (value != null) ? value : default_;
}

Querystring.prototype.contains = function(key) {
	var value = this.params[key];
	return (value != null);
}
/* ======================================================================
    uri.src.js
   ====================================================================== */

/*

info.aaronland.URI library v1.0
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.URI){
    info.aaronland.URI = {};
}

info.aaronland.URI = function(){
    this.querystring;
    this.query;

    this.init();
};

info.aaronland.URI.prototype = window.location;

info.aaronland.URI.prototype.init = function(){

    if (window.location.hash != ''){
        this.querystring = window.location.hash.substring(1);
    }
    
    else {
        this.querystring = window.location.search.substring(1);
    }

    this.query = new Querystring(this.querystring);
};

// -*-java-*-
/* ======================================================================
    flickr-api.js
   ====================================================================== */

/* ======================================================================
    jsr.src.js
   ====================================================================== */

// jsr_class.js
//
// JSONscriptRequest -- a simple class for making HTTP requests
// using dynamically generated script tags and JSON
//
// Author: Jason Levitt
// Date: December 7th, 2005
//
// A SECURITY WARNING FROM DOUGLAS CROCKFORD:
// "The dynamic <script> tag hack suffers from a problem. It allows a page 
// to access data from any server in the web, which is really useful. 
// Unfortunately, the data is returned in the form of a script. That script 
// can deliver the data, but it runs with the same authority as scripts on 
// the base page, so it is able to steal cookies or misuse the authorization 
// of the user with the server. A rogue script can do destructive things to 
// the relationship between the user and the base server."
//
// So, be extremely cautious in your use of this script.
//
//
// Sample Usage:
//
// <script type="text/javascript" src="jsr_class.js"></script>
// 
// function callbackfunc(jsonData) {
//      alert('Latitude = ' + jsonData.ResultSet.Result[0].Latitude + 
//            '  Longitude = ' + jsonData.ResultSet.Result[0].Longitude);
//      aObj.removeScriptTag();
// }
//
// request = 'http://api.local.yahoo.com/MapsService/V1/geocode?appid=YahooDemo&
//            output=json&callback=callbackfunc&location=78704';
// aObj = new JSONscriptRequest(request);
// aObj.buildScriptTag();
// aObj.addScriptTag();
//
//


// Constructor -- pass a REST request URL to the constructor
//
function JSONscriptRequest(fullUrl) {
    // REST request path
    this.fullUrl = fullUrl; 
    // Keep IE from caching requests
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    // Get the DOM location to put the script tag
    this.headLoc = document.getElementsByTagName("head").item(0);
    // Generate a unique script tag id
    this.scriptId = 'JscriptId' + JSONscriptRequest.scriptCounter++;
}

// Static script ID counter
JSONscriptRequest.scriptCounter = 1;

// buildScriptTag method
//
JSONscriptRequest.prototype.buildScriptTag = function () {

    // Create the script tag
    this.scriptObj = document.createElement("script");
    
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("charset", "utf-8");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
}
 
// removeScriptTag method
// 
JSONscriptRequest.prototype.removeScriptTag = function () {
    // Destroy the script tag
    this.headLoc.removeChild(this.scriptObj);  
}

// addScriptTag method
//
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
}
/* ======================================================================
    md5.src.js
   ====================================================================== */

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
/* ======================================================================
    flickr-api.src.js
   ====================================================================== */

/*

info.aaronland.flickr.API library v1.01
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.flickr){
    info.aaronland.flickr = {};
}

info.aaronland.flickr.API = function(args){

    this.args = args;

    this._host = 'api.flickr.com';
    this._endpoint = '/services/rest';

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;
}

info.aaronland.flickr.API.prototype.api_call = function(method, args){

    this.log('calling: ' + method);

    args['noCacheIE'] = (new Date()).getTime();
    var url = this.api_call_url(method, args);

    var skip_ie_cachebuster=1;
    this.json_request(url, skip_ie_cachebuster);
};

info.aaronland.flickr.API.prototype.api_call_url = function(method, args){

    args['api_key'] = this.args['key'];
    args['method'] = method;
    args['format'] = 'json';
    args['nojsoncallback'] = 1;

    // Imagine a world where the signature is pre-generated
    // server-side and passed to the JS by a templating system

    if ((args['auth_token']) && (! args['api_sig'])){
    	var sig = this.sign_args(args);
    	args['api_sig'] = sig;
    }

    var params = new Array();

    for (prop in args){
        var str = prop + '=' + encodeURIComponent(args[prop]);
        params.push(str);
    }

    var url = 'http://' + this._host + this._endpoint;
    url += '?';
    url += params.join("&");
    
    this.log('request: ' + url)
    return url;
};

info.aaronland.flickr.API.prototype.sign_args = function(args){

    var keys = new Array();
    var str = '';

    for (prop in args){
        keys.push(prop);
    }

    keys.sort();

    for (i in keys){
        var prop = keys[i];
        str += prop + args[prop];
    }
    
    this.log('signing: ********' + str);

    return hex_md5(this.args['secret'] + str);
};

info.aaronland.flickr.API.prototype.json_request = function(url, skip_ie_cachebuster){
                    
    jsr = new JSONscriptRequest(url); 

    if (skip_ie_cachebuster){
       jsr.noCacheIE = '';
    }

    jsr.buildScriptTag(); 
    jsr.addScriptTag();
};

info.aaronland.flickr.API.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[flickr] ' + msg);
};

// -*-java-*-
/* ======================================================================
    geolocation.js
   ====================================================================== */

/* ======================================================================
    geolocation.src.js
   ====================================================================== */

/*

info.aaronland.geolocation library v1.02
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.geo = {};
}

// this is still a bit up in the air...

info.aaronland.geo.canhasLocation = function(){};
    
info.aaronland.geo.canhasLocation.prototype.survey = function(args){

    this.canhas_w3cgeo = ((typeof(navigator) == 'object') && (navigator['geolocation'])) ? 1 : 0;
    this.canhas_loki = (typeof(Loki) == 'object') ? 1 : 0;
    this.canhas_google = (typeof(google) == 'object') ? 1 : 0;

    // loki

    if ((this.canhas_loki) && (! args['loki_apikey'])){
        this.canhas_loki = 0;
    }

    // in summary...

    this.canhas_geolocation = 0;

    if ((this.canhas_w3cgeo) || (this.canhas_loki) || (this.canhas_google)){
        this.canhas_geolocation = 1;
    }

    return this.canhas_geolocation;
};

// inherits from canhasLocation

info.aaronland.geo.Location = function(args){

    this.survey(args);
    this.args = args;

    this.canhas_console = (typeof(console) != 'undefined') ? 1 : 0;

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);
    this.log("loki support: " + this.canhas_loki);
    this.log("w3cgeo support: " + this.canhas_w3cgeo);
    this.log("geolocation support: " + this.canhas_geolocation);
};

info.aaronland.geo.Location.prototype = new info.aaronland.geo.canhasLocation;

info.aaronland.geo.Location.prototype.findMyLocation = function(doThisOnSuccess, doThisIfNot){

    // Assume that if you've passed a Loki API key that's what
    // you want to use (this assumption probably doesn't hold
    // for things with a GPS unit but one step at a time...)

    var _self = this;

    if ((this.canhas_loki) && (this.args['loki_apikey'])){
        this.log("find my location with loki");
        
        // http://sarver.org/2009/05/29/where-20-location-on-the-web/

        var loki = new LokiAPI();

        loki.onSuccess = function(location) {
            _self.log("loki dispatch returned (success)");
            doThisOnSuccess(location.latitude, location.longitude);
        };
            
        loki.onFailure = function(error, msg){
            _self.log("loki dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error + ', ' + msg);
        };
        
        loki.setKey(this.args['loki_apikey']);
        loki.requestLocation(true, loki.FULL_STREET_ADDRESS_LOOKUP);

        this.log("loki positioning dispatched");
        return;
    }

    // w3cgeo

    if (this.canhas_w3cgeo){

        this.log("find my location with w3cgeo");

        // http://labs.mozilla.com/2008/10/introducing-geode/

        _onSuccess = function(position){

            var latitude;
            var longitude;

            if (typeof(position['coords']) == 'object'){
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            }

            else {
                latitude = position.latitude;
                longitude = position.longitude;

                _self.log("this looks like geode's w3cgeo, who knows what will happen now...");
            }

            _self.log("w3cgeo dispatch returned (success)");
            doThisOnSuccess(latitude, longitude);   
        };

        _onFailure = function(error){
            _self.log("w3cgeo dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error.code + ',' + error.message);            
        };

        navigator.geolocation.getCurrentPosition(_onSuccess, _onFailure);

        this.log("w3cgeo positioning displatched");
        return;
    }

    // teh google

    if (this.canhas_google){

        // http://code.google.com/apis/gears/api_geolocation.html#example

        if (google['gears']){
            this.log("find my location with (google) gears");

            var geo = google.gears.factory.create('beta.geolocation');

            _onSuccess = function(position) {
                _self.log("gears dispatch returned (success)");
                doThisOnSuccess(position.latitude, position.longitude);
            };

            _onFailure = function (postionError){
                _self.log("gears dispatch returned (failed)");
                doThisIfNot('Attempt to get location failed: ' + positionError.message);
            };

            geo.getCurrentPosition(_onSuccess, _onFailure);

            this.log("gears positioning displatched");
            return;
        }

        // http://briancray.com/2009/05/29/find-web-visitors-location-javascript-google-api/

        if ((google['loader']) && (google['loader']['ClientLocation'])){

            this.log("find my location with (google) client location");

            lat = google.loader.ClientLocation.latitude;
            lon = google.loader.ClientLocation.longitude;

            doThisOnSuccess(lat, lon);
            return;
        }
    }

    doThisIfNot("unable to find a location provider ... where are you???");
    return;
};

info.aaronland.geo.Location.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[geolocation] ' + msg);
};

// -*-java-*-
/* ======================================================================
    geocoder.js
   ====================================================================== */

/* ======================================================================
    geocoder.src.js
   ====================================================================== */

// http://github.com/straup/js-geocoder/tree/master

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.geo){
    info.aaronland.geo = {};
}

info.aaronland.geo.GeocoderResult = function(provider, query, lat, lon, zoom){
    this.provider = provider;
    this.query = query;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
}

info.aaronland.geo.GeocoderError = function(provider, query, errmsg){
    this.provider = provider;
    this.query = query;
    this.message = errmsg;
}

info.aaronland.geo.GeocoderCapabilities = function(args){

    // to do: build a default (ordered) set of providers based on capabilities
    // that can be used if the user does not pass their own list

    this.has_google = 0;
    this.has_bing = 0;
    this.has_cloudmade = 0;
    this.has_flickr = 0;
    this.has_placemaker = 0;
    this.has_geonames = 0;
    this.has_geocoder_us = 0;

    this.can_geocode = 0;
    this.providers = [];

    // google

    if (typeof(google) == 'object'){
        this.has_google = 1;
        this.can_geocode += 1;

        this.providers.push('google');
    }

    // cloudmade

    if ((typeof(CM) == 'object') && (typeof(CM.Geocoder) == 'function')){
        this.has_cloudmade = 1;
        this.can_geocode += 1;
        
        if ((args) && (! args['cloudmade_apikey'])){
            this.has_cloudmade = 0;
            this.can_geocode -= 1;
        }

        else {
            this.providers.push('cloudmade');
        }
    }

    // flickr

    if (typeof(info.aaronland.flickr) == 'object'){
        this.has_flickr = 1;
        this.can_geocode += 1;

        if ((args) && (! args['flickr_apikey'])){
            this.has_flickr = 0;
            this.can_geocode -= 1;
        }

        else {
            this.providers.push('flickr');
        }
    }

    // placemaker

    if (typeof(Placemaker) == 'object'){
        this.has_placemaker = 1;
        this.can_geocode += 1;

        if ((args) && (! args['placemaker_apikey'])){
            this.has_placemaker = 0;
            this.can_geocode -= 1;        
        }

        else {
            this.providers.push('placemaker');
        }
    }

    // bing

    if (typeof(VEMap) == 'function'){
        this.has_bing = 1;
        this.can_geocode += 1;

        this.providers.push('bing');
    }

}

info.aaronland.geo.Geocoder = function(args){

    this.args = args;

    this.capabilities = new info.aaronland.geo.GeocoderCapabilities(args);
    this.providers = this.capabilities.providers;

    if (args['providers']){
        this.providers = args['providers'];
    }

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;

    this.timer_geocode = null;

    this.current_provider = null;
    this.current_query = null;

    this.on_success = null;
    this.on_fail = null;
};

info.aaronland.geo.Geocoder.prototype.geocode = function(query, doThisOnSuccess, doThisIfNot, idx){

    if (this.timer_geocode) {
        this.log("terminating previously geocoding operation");

        clearTimeout(this.timer_geocode);
        this.timer_geocode = null;
    }

    if (typeof(idx) == 'undefined'){
        idx = 0;
    }

    var delay = (idx == 0) ? 1500 : 0;

    var _self = this;

    this.timer_geocode = setTimeout(function(){
                        
            var provider = _self.providers[ idx ];
        
            _self.current_provider = provider;
            _self.current_query = query;
            
            _self.log("geocode w/ " + provider);
            
            var local_doThisIfNot = doThisIfNot;
            
            if ((idx < _self.providers.length) && (idx != _self.providers.length)){
                
                var next_idx = idx + 1;
                var next_provider = _self.providers[ next_idx ];               
                
                local_doThisIfNot = function(){
                    
                    _self.log("geocoding failed, trying again w/ " + next_provider);
                    _self.geocode(query, doThisOnSuccess, doThisIfNot, next_idx);
                    return;
                };
            }
            
            _self.on_success = doThisOnSuccess;
            _self.on_fail = local_doThisIfNot;
            
            if (provider == 'bing'){
                _self._bing();
                return;
            }
            
            else if (provider == 'cloudmade'){
                _self._cloudmade();
                return;
            }
            
            else if (provider == 'flickr'){
                _self._flickr();
                return;
            }
            
            else if (provider == 'geocoder.us'){
                _self._geocoder_us();
                return;
            }
            
            else if (provider == 'geonames'){
                _self._geonames();
                return;
            }
            
            else if (provider == 'google'){
                _self._google();
                return;
            }
            
            else if (provider == 'placemaker'){
                _self._placemaker();
                return;
            }
            
            else {
                _self.error('unknown provider');
                return;
            }
        }, delay);

    this.log("query for '" + query + "' will be dispatched in " + delay + "ms");
    return;
};

info.aaronland.geo.Geocoder.prototype._google = function(){

    // http://code.google.com/apis/maps/documentation/v3/services.html#GeocodingRequests

    if (! this.capabilities.has_google){
        this.error('missing libraries');
        return;
    }

    var _self = this;

    var _geocodeComplete = function(results, status) {

        if (status != google.maps.GeocoderStatus.OK){
            _self.error('server error');
            return;
        }

        if ((! results) || (! results.length)){
            _self.error('no results');
            return;
        }
        
        loc = results[0].geometry;
        lat = loc.location.lat();
        lon = loc.location.lng();
        type = loc.location_type;

        if (type == google.maps.GeocoderLocationType.ROOFTOP){
            zoom = 17;
        }
        
        else if (type == google.maps.GeocoderLocationType.RANGE_INTERPOLATED){
            zoom = 15;
        }
        
        else if (type == google.maps.GeocoderLocationType.GEOMETRIC_CENTER){
            zoom = 13;
        }
        
        else {
            zoom = 11;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    var goog = new google.maps.Geocoder();
    goog.geocode({'address' : this.current_query}, _geocodeComplete);

    this.log("google geocoding request dispatched");
    return;
};

info.aaronland.geo.Geocoder.prototype._bing = function(){

    // http://msdn.microsoft.com/en-us/library/cc161074.aspx

    if (! this.capabilities.has_bing){
        this.error('missing libraries');
        return;
    }

    var _self = this;

    var _bingCallback = function(shapeLayer, findResults, places, moreResults, errorMsg){

        if (places == null){
            _self.error('no results: ' + errorMsg);
            return
        }

        var loc = places[0].LatLong;
        var zoom = 17;	// sudo, make me more better

        _self.success(loc.Latitude, loc.Longitude, zoom);
        return;
    };

    // no, really...

    var div = document.createElement('div');
    div.setAttribute('id', 'invisible_map');
    div.setAttribute('style', 'display:none');
    document.body.appendChild(div);

    var bing = new VEMap('invisible_map');
    bing.LoadMap();

    // the mind reels...

    bing.Find(null,    // what
              this.current_query, // where
              null,    // VEFindType (always VEFindType.Businesses)
              null,    // VEShapeLayer (base by default)
              null,    // start index for results (0 by default)
              null,    // max number of results (default is 10)
              null,    // show results? (default is true)
              null,    // create pushpin for what results? (ignored since what is null)
              null,    // use default disambiguation? (default is true)
              null,    // set best map view? (default is true)
              _bingCallback);  // call back function

    this.log("bing geocoding request dispatched");
    return;
};

info.aaronland.geo.Geocoder.prototype._flickr = function(){

    if (! this.capabilities.has_flickr){
        this.error('missing flickr libraries or api key');
        return;
    }

    var _self = this;

    // dirty dirty dirty...

    window['_flickrGeocodeComplete'] = function(rsp){

        if (rsp.stat == 'fail'){
            _self.error("received (failed) response from flickr");
            return;
        }

        var count = rsp.places.total;

        if (! count){
            _self.error("received (failed) response from flickr");
            return;
        }

        if (count > 1){
            _self.log("geocoding returned " + count + " results, using the first...");
        }

        var place = rsp.places.place[0];
        var lat = place.latitude;
        var lon = place.longitude;
        var type = place.place_type;

        if (type == 'neighbourhood'){
            zoom = 15;
        }
        
        else if (type == 'locality'){
            zoom = 13;
        }
        
        else if (type == 'county'){
            zoom = 10;
        }

        else if (type == 'country'){
            zoom = 7;
        }
        
        else {
            zoom = 3;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    //

    var flickr_args = {
        'key' : this.args['flickr_apikey'],
        'enable_logging' : this.args['enable_logging'],
    };

    var flickr = new info.aaronland.flickr.API(flickr_args);
    var method = 'flickr.places.find';

    var args = {
        'query': this.current_query,
        'jsoncallback': '_flickrGeocodeComplete'
    };

    flickr.api_call(method, args);

    this.log("query dispatched to " + flickr);
    return;
};

info.aaronland.geo.Geocoder.prototype._geonames = function(){

    this.error('geonames support not complete');
    return;

    // var url = 'http://ws.geonames.org/searchJSON?q=' + encodeURIComponent(this.current_query);
};

info.aaronland.geo.Geocoder.prototype._cloudmade = function(){

    // http://developers.cloudmade.com/projects/web-maps-lite/examples/geocoding

    if (! this.capabilities.has_cloudmade){
        this.error('missing cloudmade libraries or api key');
        return;
    }

    var _self = this;

    var _geocodeComplete = function(rsp){

        if (! rsp.found){
            _self.error("received (failed) response from cloudmade");
            return;
        }

        // work out zoom level based on rsp.features[0].properties.place

        var loc = rsp.features[0].centroid.coordinates;
        var zoom = null;

        _self.success(loc[0], loc[1], null);
        return;
    };

    var cm = new CM.Geocoder(this.args['cloudmade_apikey']);
    cm.getLocations(this.current_query, _geocodeComplete);

    this.log("query dispatched to cloudmade");
};

info.aaronland.geo.Geocoder.prototype._placemaker = function(){

    // http://icant.co.uk/jsplacemaker/

    if (! this.capabilities.has_placemaker){
        this.err('missing placemaker libraries or api key');
        return;
    }

    var _self = this;

    var _onMatch = function(rsp){
        
        if (rsp.error){
            _self.error(rsp.error);
            return;
        }

        var match = rsp.match;
        var place = (typeof(match[0]) == 'undefined') ? match.place : match[0].place;

        var woeid = place.woeId;

        var lat = place.centroid.latitude;
        var lon = place.centroid.longitude;
        var zoom = 2;

        switch (place.type){
        	case 'Suburb' :
                    zoom = 14;
                    break;
        	case 'Town' :
                    zoom = 12;
                    break;
        	case 'County' :
                    zoom = 10;
                    break;
        	case 'State' :
                    zoom = 7;
                    break;
        	default :
                    zoom = 5;
                    break;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    Placemaker.config.appID = this.args['placemaker_apikey'];
    Placemaker.getPlaces(this.current_query, _onMatch, 'en-us');

    this.log('query dispatched to placemaker');
}

info.aaronland.geo.Geocoder.prototype._geocoder_us = function(){

    this.error('geocoder.us support not complete');
    return;

    window['_geocoderUSGeocodeComplete'] = function (rsp){
    };

    var url = 'http://rpc.geocoder.us/service/json?jsoncallback=_geocoderUSGeocodeCallback';
    url += '&address=' + encodeURIComponent(this.current_query);

    jsr = new JSONscriptRequest(url); 

    jsr.noCacheIE = '';
    jsr.buildScriptTag(); 
    jsr.addScriptTag();

    this.log('query dispatched to geocoder.us');
}

info.aaronland.geo.Geocoder.prototype.success = function(lat, lon, zoom){

    this.log(this.current_provider + ' returned OK: ' + lat + ',' + lon + ',' + zoom);
    var result = new info.aaronland.geo.GeocoderResult(this.current_provider, this.current_query, lat, lon, zoom);

    this.on_success(result);
    return;
}

info.aaronland.geo.Geocoder.prototype.error = function(msg){

    this.log(this.current_provider + ' failed: ' + msg);

    var error = new info.aaronland.geo.GeocoderError(this.current_provider, this.current_query, msg);

    this.on_fail(error);
    return;
}

info.aaronland.geo.Geocoder.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    if (! this.canhas_console){
        return;
    }

    console.log("[geocoder] " + msg);
};

// -*-java-*-
/* ======================================================================
    reversegeocoder.js
   ====================================================================== */

/* ======================================================================
    reversegeocoder.src.js
   ====================================================================== */

// http://github.com/straup/js-reversegeocoder/tree/master

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.geo){
    info.aaronland.geo = {};
}

info.aaronland.geo.ReverseGeocoderResult = function(provider, pt, uuid, name){
    this.provider = provider;
    this.pt = pt;
    this.uuid = uuid;
    this.name = name;
}

info.aaronland.geo.ReverseGeocoderError = function(provider, query, errmsg){
    this.provider = provider;
    this.query = query;
    this.message = errmsg;
}

info.aaronland.geo.ReverseGeocoderCapabilities = function(args){

    this.has_google = 0;
    this.has_flickr = 0;

    this.can_reverse_geocode = 0;
    this.providers = [];

    // flickr

    if (typeof(info.aaronland.flickr) == 'object'){
        this.has_flickr = 1;
        this.can_reverse_geocode += 1;

        if ((args) && (! args['flickr_apikey'])){
            this.has_flickr = 0;
            this.can_reverse_geocode -= 1;
        }

        else {
            this.providers.push('flickr');
        }
    }

    // google

    if (typeof(google) == 'object'){
        this.has_google = 1;
        this.can_reverse_geocode += 1;

        this.providers.push('google');
    }

}

info.aaronland.geo.ReverseGeocoder = function(args){

    this.args = args;

    this.capabilities = new info.aaronland.geo.ReverseGeocoderCapabilities(args);
    this.providers = this.capabilities.providers;

    if ((args) && (args['providers'])){
        this.providers = args['providers'];
    }

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;

    this.timer_reversegeo = null;
    this.current_provider = null;
    this.current_query = null;

    this.on_success = null;
    this.on_fail = null;
};

info.aaronland.geo.ReverseGeocoder.prototype.reverse_geocode = function(pt, doThisOnSuccess, doThisIfNot, idx){

    if (this.timer_reversegeo){
        this.log("terminating previously running reverse geocoder");

        clearTimeout(this.timer_reversegeo);
        this.timer_reversegeo = null;
    }

    if (this.providers.length == 0){
        this.error("No valid providers");
        return;
    }

    if (typeof(idx) == 'undefined'){
        idx = 0;
    }

    var delay = (idx == 0) ? 1500 : 0;

    var _self = this;

    this.timer_reversegeo = setTimeout(function(){
            
            var provider = _self.providers[ idx ];

            _self.current_provider = provider;
            _self.current_query = pt;

            var local_doThisIfNot = doThisIfNot;

            if ((idx < _self.providers.length) && (idx != _self.providers.length)){
                
                var next_idx = idx + 1;
                var next_provider = _self.providers[ next_idx ];
            
                local_doThisIfNot = function(){
                    _self.reverse_geocode(pt, doThisOnSuccess, doThisIfNot, next_idx);
                    return;
                };
            }

            _self.on_success = doThisOnSuccess;
            _self.on_fail = local_doThisIfNot;

            if (provider == 'flickr'){
                _self._flickr();
                return;
            }

            else if (provider == 'google'){
                _self._google();
                return;
            }

            else {
                _self.error('unknown provider');
                return;
            }

        }, delay);

    return;
};

info.aaronland.geo.ReverseGeocoder.prototype._google = function(){

    // http://www.flickr.com/services/api/flickr.places.findByLatLon.html

    if (! this.capabilities.has_google){
        this.error('missing libraries');
        return;
    }

    var pt = this.current_query;
    var _self = this;

    var _geocodeComplete = function(results, status) {

        if (status != google.maps.GeocoderStatus.OK){
            _self.error('server error');
            return;
        }

        if ((! results) || (! results.length)){
            _self.error('no results');
            return;
        }
        
        var addr = results[0].formatted_address;

        _self.success(0, addr);
        return;
    };

    var latlng = new google.maps.LatLng(pt['lat'], pt['lon'], 16);

    var goog = new google.maps.Geocoder();
    goog.geocode({'latLng' : latlng}, _geocodeComplete);
};

info.aaronland.geo.ReverseGeocoder.prototype._flickr = function(){

    // http://code.google.com/apis/maps/documentation/v3/reference.html#Geocoder

    if (! this.capabilities.has_flickr){
        this.error('missing flickr libraries or api key');
        return;
    }

    var pt = this.current_query;
    var _self = this;

    window['_reverseGeocodeComplete'] = function(rsp){

        if (rsp.stat == 'fail'){
            _self.error("reverse geocoding failed: " + rsp.message);
            return;
        }

        if (rsp.places.total == 0){
            _self.error("unable to reverse geocode your current position");
            return;
        }

        var name = rsp.places.place[0].name;
        var woeid = rsp.places.place[0].woeid;

        _self.success(woeid, name);
        return;
    };

    var method = 'flickr.places.findByLatLon';
    var accuracy = pt['zoom'];
    
    if (accuracy > 16){
        accuracy = 16;
    }

    var args = {
        'lat': pt['lat'],
        'lon': pt['lon'],
        'accuracy' : accuracy,
        'jsoncallback': '_reverseGeocodeComplete'
    };

    var flickr_args = {
        'key' : this.args['flickr_apikey'],
        'enable_logging' : this.args['enable_logging'],
    };

    var flickr = new info.aaronland.flickr.API(flickr_args)
    flickr.api_call(method, args);

    _self.log("reverse geocoding request dispatched");

    return;
}

info.aaronland.geo.ReverseGeocoder.prototype.success = function(uuid, name){

    this.log(this.current_provider + ' returned OK');
    var result = new info.aaronland.geo.ReverseGeocoderResult(this.current_provider, this.current_query, uuid, name);

    this.on_success(result);
    return;
}

info.aaronland.geo.ReverseGeocoder.prototype.error = function(msg){

    this.log(this.current_provider + ' failed: ' + msg);
    var error = new info.aaronland.geo.ReverseGeocoderError(this.current_provider, this.current_query, msg);

    this.on_fail(error);
    return;
}

info.aaronland.geo.ReverseGeocoder.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    if (! this.canhas_console){
        return;
    }

    console.log("[reversegeo] " + msg);
};

// -*-java-*-
/* ======================================================================
    iamheremap.src.js
   ====================================================================== */

/*

info.aaronland.iamhere.Map library v1.1.1
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

// note: the use of jquery is probably overkill.
// patches are welcome.

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.iamhere = {};
}

info.aaronland.iamhere.Map = function(target, args){

    // the basics

    var _self = this;
    this.args = args;

    // because we read/write to the #hash component
    // for generating permalinks on the fly having
    // real live query parameters becomes ugly and
    // problematic. so, kick it in the shins and move
    // on...

    var loc = window.location;
    var search = loc.search;

    if ((! this.args['disable_query_args']) && (search)){
        var url = loc.protocol + '//' + loc.host + loc.pathname + '#' + search.substring(1);
        window.location = url;
        return;
    }

    // okay, let's get started!

    this.original_title = document.title;
    this.map_obj = null;

    this.timer_warning;
    this.timer_reversegeo;

    this.flickr = null;
    this.geocoder = null;
    this.reverse_geocoder = null;

    this.paths_woe = new Array();

    // get/set cookies for last location, maybe?

    this.lat = 0;
    this.lon = 0;
    this.zoom = 2;

    this.woeid = 0;

    // the URI at load time; not necessarily
    // the permalink that will be generated
    // as the user moves around.

    this.uri = new info.aaronland.URI();
    
    // the URI is the command line, or something like that

    if (! this.args['disable_query_args']){
        this.loadQueryArgs();
    }

    // capabilities

    this.canhas_geocoder = 0;
    this.canhas_reversegeocoder = 0;
    this.canhas_geolocation = 0;

    // geocoder
    // note - we are using the automagic default list
    // of providers assigned by the Geocoder.Capabilities
    // class based on the contents of this.args

    this.geocoder = new info.aaronland.geo.Geocoder(this.args)
    this.canhas_geocoder = this.geocoder.capabilities.can_geocode;

    // reverse geocoder
    // note - we are not using the automagic list of providers
    // because we want a woeid in order to do the shapefile luv

    var rg_args = this.args;
    rg_args['providers'] = ['flickr'];

    this.reverse_geocoder = new info.aaronland.geo.ReverseGeocoder(rg_args);
    this.canhas_reversegeocoder = this.reverse_geocoder.capabilities.can_reverse_geocode;

    // geolocation
    // not entirely sure about this interface...

    var canhas = new info.aaronland.geo.canhasLocation();
    
    if (canhas.survey(args)){
        this.canhas_geolocation = 1;
    }

    // flickr

    this.canhas_flickr = (typeof(info.aaronland.flickr) == 'object') ? 1 : 0;

    if ((this.canhas_flickr) && (! this.args['flickr_apikey'])){
        this.canhas_flickr = 0;
    }

    if (this.canhas_flickr){

        var flickr_args = {
            'key' : this.args['flickr_apikey'],
            'enable_logging' : this.args['enable_logging'],
        };

        this.flickr = new info.aaronland.flickr.API(flickr_args);
    }

    // reporting

    this.log("flickr support: " + this.canhas_flickr);
    this.log("geocoder support: " + this.canhas_geocoder);
    this.log("reverse geocoder support: " + this.canhas_reversegeocoder);
    this.log("geolocation support: " + this.canhas_geolocation);

    // squirt in the map container elements

    this.map_height = 400;
    this.map_width = $(document).width();

    if (args['map_width']){
        this.map_width = args['map_width'];
    }

    if (args['map_height']){
        this.map_height = args['map_height'];
    }

    var crosshair_y = (this.map_height / 2) - 8;
    var crosshair_x = this.map_width / 2;

    // please to make the inline css go away...

    // to do: generate a uuid to append to iamhere_*
    // identifiers so that more than one map may be
    // embedded in a page...

    var html = '';

    if ((this.canhas_geocoder) || (this.canhas_geolocation)){
    	html += '<form id="iamhere_geocoder" style="text-align:center;max-width:' + this.map_width + ';">';

        if (this.canhas_geocoder){

            html += '<input id="iamhere_geocode_me" type="text" name="location" size="30%;" value="" style="border:1px solid;padding:1px;" />' + 
                    '<input id="iamhere_find_this" type="submit" value="&#8592; FIND THIS PLACE" style="border:1px solid; margin-left:10px;" />';
	}

        if (this.canhas_geolocation){
            var label = (this.canhas_geocoder) ? "or find my location" : "find my location";
            html += '<input id="iamhere_find_me" type="submit" value="' + label + '" style="border:1px solid;margin-left:10px;" />';
        }

        html += '</form>';
    }

    // sudo, add support to make the map/crosshair work 
    // with window resizing...

    html += '<div id="iamhere_chooser" style="position:relative;max-width:' + this.map_width + ';">' + 
    	    '<div id="iamhere_viewport"></div>' +
            '<div id="iamhere_crosshair" style="' +
            'position: absolute;top:' + crosshair_y + 'px;height:19px;width:19px;left:' + crosshair_x + ';margin-left:-8px;display:block;' + 
    	    'background-position: center center;background-repeat: no-repeat;' + 
    	    '"></div></div>'; 

    if (this.args['modestmaps_provider'] == 'CloudMade'){

        var date = new Date();
        var yyyy = date.getYear() + 1900;

        html += '<div id="iamhere_osm_notice" style="' + 
            	'text-align:right;font-size:10px;font-family:sans-serif;margin-top:5px;max-width:' + this.map_width + ';' + 
                '">Map data <a href="http://creativecommons.org/licenses/by-sa/3.0/">CCBYSA</a> ' + yyyy + ' <a href="http://openstreetmap.org/">OpenStreetMap.org</a> contributors</a></div>';
    }

    html += '<div id="iamhere_coordinates" style="' + 
            'min-height:10pt;font-family:sans-serif;font-weight:700;font-size:10pt;margin-bottom:5px;margin-top:15px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_location" style="'+
            'min-height:10pt;font-family:sans-serif;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_warning" style="'+    
            'min-height:10pt;color:red;font-family:serif;font-style:italic;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>';

    $("#" + target).html(html);

    // http://www.sveinbjorn.org/dataurls_css
    // this is just a nuisance to do above...

    var data_url = '"data:image/gif;base64,R0lGODlhEwATAKEBAAAAAP///////////' +
    		   'yH5BAEKAAIALAAAAAATABMAAAIwlI+pGhALRXuRuWopPnOj7hngEpRm6Z' + 
    		   'ymAbTuC7eiitJlNHr5tmN99cNdQpIhsVIAADs="';

    $("#iamhere_crosshair").css("background", "url(" + data_url + ")");

    // geocoding

    $("#iamhere_find_this").click(function(){
            var loc = $("#iamhere_geocode_me").val();

            if (loc == ''){
                _self.displayWarning("nothing to geocode!");
                return false;
            }

            _self.geocode(loc);
            return false;
    });

    // positioning (geo-location)

    $("#iamhere_find_me").click(function(){
            _self.displayLocation("<em>establishing current location</em>");
            _self.findMyLocation();
            return false;
    });

    // dwim (zoom in/out when the crosshairs are clicked)

    $("#iamhere_crosshair").dblclick(function(e){
            var action = _self.map_obj.getDoubleClick();
            action(e);
    });

    // load the map

    this.loadModestMap();
};

info.aaronland.iamhere.Map.prototype.loadModestMap = function(){

    var _self = this;

    //

    var provider = this.args['modestmaps_provider'];

    if (typeof(provider) == 'object'){
        this.log("modestmaps provider is already instantiated, carry on");
    }

    else if (provider == 'CloudMade'){
        provider = new com.modestmaps.CloudMadeProvider(this.args['cloudmade_apikey'], this.args['map_style']);
    }

    else { } 

    // sudo, check to see there's a cookie with last location maybe?

    var canhas_point = ((this.args['latitude']) && (this.args['longitude'])) ? 1 : 0;

    var lat = (canhas_point) ? this.args['latitude'] : this.lat;
    var lon = (canhas_point) ? this.args['longitude'] : this.lon;
    var zoom = (this.args['zoom']) ? this.args['zoom'] : this.zoom;

    lat = Number(lat);
    lon = Number(lon);
    zoom = Number(zoom);

    // hello, little map-y fella

    var pt = new com.modestmaps.Point(this.map_width, this.map_height);

    this.map_obj = new com.modestmaps.Map('iamhere_viewport', provider, pt)
    var controls = new com.modestmaps.MapControls(this.map_obj);

    this.goTo(lat, lon, zoom);

    // events 

    _onChange = function (){
        $("#iamhere_warning").hide();

        var center = _self.map_obj.getCenter();
        var zoom = _self.map_obj.getZoom();

        _self.lat = center.lat;
        _self.lon = center.lon;
        _self.zoom = zoom;
        _self.woeid = 0;

        _self.log("on change, map centered on " + center.toString() + " @" + zoom);

        _self.updateContext();
        _self.reverseGeocode(center.lat, center.lon);
    };

    this.map_obj.addCallback("zoomed", _onChange);
    this.map_obj.addCallback("panned", _onChange);
    this.map_obj.addCallback("centered", _onChange);
};

// sudo, make me a generic "who's on first" library...

info.aaronland.iamhere.Map.prototype.findMyLocation = function(cb){

    var _self = this;

    // x_dispatch_my_dispatch

    _doThisOnSuccess = function(lat, lon, cb){

        if (cb){
            cb(lat, lon);
            return;
        }

        _self.goTo(lat, lon, 14);
    };

    _doThisIfNot = function(msg){
        _self.displayLocation("");
        _self.displayWarning(msg);
    };

    var loc = new info.aaronland.geo.Location(this.args);
    loc.findMyLocation(_doThisOnSuccess, _doThisIfNot);
};

info.aaronland.iamhere.Map.prototype.geocode = function(query){

    var _self = this;

    var doThisOnSuccess = function(rsp){
        _self.goTo(rsp.lat, rsp.lon, rsp.zoom);
        return;
    };

    var doThisIfNot = function(rsp){
        _self.displayWarning("geocoding failed with message: " + rsp.message);
        _self.displayLocation("");
        return;
    };

    this.geocoder.geocode(query, doThisOnSuccess, doThisIfNot);
}

info.aaronland.iamhere.Map.prototype.reverseGeocode = function(lat, lon){

    if (! this.canhas_reversegeocoder){
        return;
    }

    if (this.timer_reversegeo){
        clearTimeout(this.timer_reversegeo);
    }
    
    // the reverse geocoder object itself has a time
    // but since this is going to get called on every
    // onchange event (that's probably not ideal) we'll
    // add some timeout love here too...

    var _self = this;

    this.timer_reversegeo = setTimeout(function(){
            _self._reverseGeocode(lat, lon);
    }, 1500);

};

info.aaronland.iamhere.Map.prototype._reverseGeocode = function(lat, lon){

    this.displayLocation("");

    // seriously, just don't bother...

    if ((parseInt(lat) == 0) && (parseInt(lon) == 0)){
        return;
    }

    var _self = this;

    var doThisOnSuccess = function(rsp){

        _self.woeid = rsp['uuid'];
        _self.woeid_name = rsp['name'];
        
        _self.displayLocation(rsp['name'], rsp['uuid']);
            
        if (_self.args['auto_display_shapefiles']){
            _self.drawShapefile(rsp['uuid']);
        }
        
        return;
    };

    var doThisIfNot = function(rsp){
        _self.displayLocation("<em>unable to reverse geocode your current position</em>");
        _self.displayWarning("reverse geocoding failed: " + rsp.message);
        return;
    };

    _self.displayLocation("<em>reverse geocoding</em>");

    var zoom = _self.map_obj.getZoom();
    var pt = {'lat' : lat, 'lon' : lon, 'zoom' : zoom}

    this.reverse_geocoder.reverse_geocode(pt, doThisOnSuccess, doThisIfNot);

    _self.log("reverse geocoding " + lat + "," + lon + "," + zoom);
    return;
};

info.aaronland.iamhere.Map.prototype.drawShapefile = function(woeid){

    if (! this.flickr){
        return;
    }

    this.log("draw shapefile for woeid " + woeid);

    var _self = this;

    _drawShapefileComplete = function(rsp){

        _self.log("shapefile dispatch returned");

       	if (rsp.stat == 'fail'){
      		_self.displayWarning("fetching shapefiles failed: " + rsp.message);
            	return;
        }

        if (! rsp.place.has_shapedata){
            _self.displayWarning("woe id has no shapedata");            
            return;
       	}

        // clean up any existing paths_woe

        var count_paths_woe = _self.paths_woe.length;

        if (count_paths_woe){
            for (var i = 0; i < count_paths_woe; i++){
                _self.paths_woe[i].clear();
            }

            self.paths_woe = new Array();
        }

        // sudo, make me a config option

        var fillStyle = 'orange';
        var fillAlpha = 0.5;
        var strokeStyle = 'pink';

        var lines = rsp.place.shapedata.polylines.polyline;
        var count = lines.length;

        for (var i = 0; i < count; i++){

            var coords = lines[i]._content.split(" ");
            var points = []

            for (var j = 0; j < coords.length; j++){
                var pt = coords[j].split(",");
                var loc = new com.modestmaps.Location(pt[0], pt[1]);
                points.push(loc);
            }

            var path = new com.modestmaps.PolygonMarker(_self.map_obj, points, fillStyle, fillAlpha, strokeStyle);
            _self.paths_woe.push(path);
        }

        _self.log('draw shapefiles complete');
    };

    var method = 'flickr.places.getInfo';
    var args = {'woe_id':woeid, 'jsoncallback': '_drawShapefileComplete'};

    this.flickr.api_call(method, args);

    this.log("shapefile request dispatched");
    return;
};

info.aaronland.iamhere.Map.prototype.goTo = function(lat, lon, zoom, do_reversegeocoding){

    this.lat = lat;
    this.lon = lon;

    this.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
    this.reverseGeocode(lat, lon);
};

info.aaronland.iamhere.Map.prototype.loadQueryArgs = function(allowed){
    
    this.log("loading query arguments");   

    var params_map = {
        'latitude' : 'latitude',
        'longitude' : 'longitude',
        'zoom' : 'zoom',
        'style' : 'map_style',
        'shapefiles' : 'auto_display_shapefiles',
    };

    for (var public_key in params_map){

        var private_key = params_map[public_key];

        if (this.uri.query.contains(public_key)){
            var value = this.uri.query.get(public_key);
            this.args[private_key] = value;

            this.log('assigned ' + private_key + ': ' + value); 
        }
    }
};

info.aaronland.iamhere.Map.prototype.generatePermalink = function(){
    var loc = window.location;
    var permalink = loc.protocol + '//' + loc.host + loc.pathname + '#' + this.generatePermahash();
    return permalink;
};

info.aaronland.iamhere.Map.prototype.generatePermahash = function(){

    var params = this.uri.query.params;
    permalink = new Array();

    permalink.push('latitude=' + encodeURIComponent(this.lat));
    permalink.push('longitude=' + encodeURIComponent(this.lon));
    permalink.push('zoom=' + encodeURIComponent(this.zoom));

    for (key in params){

        if ((key == 'latitude') || (key == 'longitude') || (key == 'zoom')){
            continue;
        }

        else if (key == 'style'){
            permalink.push('style=' + encodeURIComponent(this.args['map_style']));
        }

        // this will deal with shapefiles
        // as well as anything else that happened
        // to be passed in like &horse=yes

        else {
            permalink.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
    }

    return permalink.join("&");
};

info.aaronland.iamhere.Map.prototype.setPermahash = function(){
    location.href = "#" + this.generatePermahash();
};

info.aaronland.iamhere.Map.prototype.formatCoord = function(coord){

    var decimals = this.args['max_decimal_points'];

    if (decimals){
        coord = Number(coord).toFixed(decimals);
    }

    return coord;
};

info.aaronland.iamhere.Map.prototype.formatDegree = function(value, axis){

    var dir = value;
    var val = Math.abs(value);

    var deg = Math.floor(val);
    val = (val - deg) * 60;

    var min = Math.floor(val);

    val = (val - min) * 60;

    var sec = Math.floor(val);
    var str = deg + '&#176;';

    if (min <= 9){
        str += '0';
    }

    str += min + "'";

    if (sec <= 9){
        str += '0';
    }

    str += sec + '"';

    if (axis == 'lat'){
        str += (dir >= 0) ? 'N' : 'S';
    }

    else {
        str += (dir >= 0) ? 'E' : 'W';
    }

    return str;
};

info.aaronland.iamhere.Map.prototype.displayCoordinates = function(lat, lon){
    
    // lon is not passed during geocoding when we 
    // display a message while we wait for a response

    if (! lon){
        $("#iamhere_coordinates").html(label);
        return;
    }

    var lat = this.formatCoord(lat);
    var lon = this.formatCoord(lon);

    var plain =  lat + ", " + lon;
    var pretty = this.formatDegree(lat, 'lat') + " " + this.formatDegree(lon, 'lon');

    var label = plain + " (" + pretty + ")";
    $("#iamhere_coordinates").html(label);

    this.updateDocumentTitle(lat, lon);
};

info.aaronland.iamhere.Map.prototype.displayLocation = function(placename, woeid){

    var loc = placename;

    if (woeid){

        var extra = ' (WOE ID <a href="#" id="woe_' + woeid +'">' + woeid + '</a>)';

        if (this.args['auto_display_shapefiles']){
            extra = ' (WOE ID ' + woeid + ')';
        }

        loc += extra;
    }

    $("#iamhere_location").html(loc);

    if (this.args['auto_display_shapefiles']){
        return;
    }

    if (woeid){
	var _self = this;

    	$("#woe_" + woeid).click(function(){
                _self.drawShapefile(woeid);
                return false;
        });
    }

    if (woeid){

        var lat = this.formatCoord(this.lat);
        var lon = this.formatCoord(this.lon);
 
       this.updateDocumentTitle(lat, lon, placename);
    }

};

info.aaronland.iamhere.Map.prototype.displayWarning = function(msg){
    
    this.log('warning: ' + msg);

    $("#iamhere_warning").html(msg);
    $("#iamhere_warning").show();

    if (this.timer_warning) {
        clearTimeout(this.timer_warning);
        this.timer_warning = null;
    }

    this.timer_warning = setTimeout(function() {
            $("#iamhere_warning").hide();
    }, 1500);
};

info.aaronland.iamhere.Map.prototype.updateDocumentTitle = function(lat, lon, placename){

    if (! this.args['refresh_title']){
        return;
    }

    var title = this.original_title + ' : ' + lat + ", " + lon;

    if (placename){
        title = title + ' (' + placename + ')';
    }

    document.title = title;
};

info.aaronland.iamhere.Map.prototype.updateContext = function(){
    this.displayCoordinates(this.lat, this.lon);

    if (! this.args['disable_query_args']){
        this.setPermahash();
    }
};

info.aaronland.iamhere.Map.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (typeof(console) != 'object'){
        return;
    }

    console.log('[iamhere] ' + msg);
};

// backwards compatibility...

info.aaronland.iamhere.Map.prototype.format_degree = function(value, axis){
    this.log("obj.format_degree is depracated, you should use obj.formatDegree");
    return this.formatDegree(value, axis);
};

info.aaronland.iamhere.Map.prototype.display_coordinates = function(lat, lon){
    this.log("obj.display_coordinates is depracated, you should use obj.displayCoordinates");
    return this.displayCoordinates(lat, lon);
};

info.aaronland.iamhere.Map.prototype.display_location = function(placename, woeid){
    this.log("obj.display_location is depracated, you should use obj.displayLocation");
    return this.displayLocation(placename, woeid);
};

info.aaronland.iamhere.Map.prototype.display_warning = function(msg){
    this.log("obj.display_display is depracated, you should use obj.displayWarning");
    return this.displayWarning(msg);
};

// -*-java-*-
