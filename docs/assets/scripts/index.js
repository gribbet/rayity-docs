/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Functionality related to managing GLSL expressions
 */
Object.defineProperty(exports, "__esModule", { value: true });
var context = [];
/** Create an [[Expression]] */
function expression(body, dependencies) {
    dependencies = dependencies || context;
    var id = generateId(body);
    var self = {
        id: id,
        body: body,
        dependencies: dependencies,
        toString: function () {
            if (context.indexOf(self) === -1)
                context.push(self);
            return id;
        }
    };
    context = [];
    return self;
}
exports.expression = expression;
function generateId(body) {
    return "a" + hash(body).toString(16);
}
function hash(x) {
    var hash = 5381;
    for (var i = 0; i < x.length; i++)
        hash = (hash * 33) ^ x.charCodeAt(i);
    return hash >>> 0;
}
/** A constant-valued [[Expression]] */
function value(x, y, z) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = x; }
    if (z === void 0) { z = y; }
    return expression(x.toPrecision(10) + ", " + y.toPrecision(10) + ", " + z.toPrecision(10), []);
}
exports.value = value;
/** An expression which is equal to a named variable */
function variable(name) {
    return expression(name, []);
}
exports.variable = variable;
/** A random value */
function random(seed) {
    return expression("fract(sin(dot(" + seed + " + 1000.0, vec3(12.9898, 78.233, 26.724))) * 43758.5453)");
}
exports.random = random;
/** Minimum of x, y, and z components */
function minNorm(v) {
    return expression("min(min(" + v + ".x, " + v + ".y), " + v + ".z)");
}
exports.minNorm = minNorm;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Material]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var expression_1 = __webpack_require__(0);
/** Create a [[Material]] */
function material(values) {
    return Object.assign({
        transmittance: expression_1.value(0),
        smoothness: expression_1.value(0),
        refraction: expression_1.value(1),
        scatter: expression_1.value(0),
        color: expression_1.value(1, 1, 1),
        emissivity: expression_1.value(0, 0, 0)
    }, values || {});
}
exports.material = material;
/** Create a spotlight [[Material]] */
function spotlight(options) {
    options = options || {};
    var direction = options.direction || expression_1.value(0, 1, 0);
    var color = options.color || expression_1.value(1, 1, 1);
    var spread = options.spread || expression_1.value(0.05);
    var ambient = options.ambient || expression_1.value(0);
    return material({
        color: expression_1.value(0),
        emissivity: expression_1.expression(color + " / " + spread + ".x * pow(dot(normalize(p), normalize(" + direction + ")) * 0.5 + 0.5, 1.0 / " + spread + ".x - 1.0) + " + ambient)
    });
}
exports.spotlight = spotlight;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mixpanel = __webpack_require__(6);
var token = "7ab7815e830c8dbe458296b30465b7da";
if (window.location.hostname === "gribbet.github.io")
    token = "0f7b50ed2b090ae369958d2398f93a2f";
mixpanel.init(token);
track("Load", {
    "Path": window.location.pathname.replace("/rayity-docs/", "")
});
function track(event, parameters) {
    if (parameters === void 0) { parameters = {}; }
    mixpanel.track(event, parameters);
}
exports.track = track;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating shape distance functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var expression_1 = __webpack_require__(0);
/** Create a [[Shape]] */
function shape(call) {
    return {
        call: call
    };
}
exports.shape = shape;
/** Null distance function */
function zero() {
    return shape(function (p) {
        return expression_1.expression("MAX_VALUE");
    });
}
exports.zero = zero;
/** Unit distance function */
function unit() {
    return shape(function (p) {
        return expression_1.expression("-MAX_VALUE");
    });
}
exports.unit = unit;
/**
 * <example id="sphere" />
 *
 * Sphere of diameter 1
 */
function sphere() {
    return shape(function (p) {
        return expression_1.expression("length(" + p + ") - 0.5");
    });
}
exports.sphere = sphere;
/** Plane given a `normal` and `offset` */
function plane(normal, offset) {
    return shape(function (p) {
        return expression_1.expression("dot(" + p + ", " + normal + ") + " + offset + ".x");
    });
}
exports.plane = plane;
function unitShape(normals) {
    return normals.reduce(function (s, n) {
        return intersection(s, plane(n, expression_1.value(-0.5)));
    }, unit());
}
/**
 * <example id="tetrahedron" />
 *
 * Tetrahedron with circumscribed diameter of 1
 */
function tetrahedron() {
    var l = Math.sqrt(3);
    return unitShape([
        expression_1.value(-1 / l, -1 / l, -1 / l),
        expression_1.value(-1 / l, 1 / l, 1 / l),
        expression_1.value(1 / l, -1 / l, 1 / l),
        expression_1.value(1 / l, 1 / l, -1 / l),
    ]);
}
exports.tetrahedron = tetrahedron;
/**
 * <example id="cube" />
 *
 * Cube of width 1
 */
function cube() {
    return unitShape([
        expression_1.value(1, 0, 0),
        expression_1.value(-1, 0, 0),
        expression_1.value(0, 1, 0),
        expression_1.value(0, -1, 0),
        expression_1.value(0, 0, 1),
        expression_1.value(0, 0, -1)
    ]);
}
exports.cube = cube;
/**
 * <example id="octohedron" />
 *
 * Octohedron with circumscribed diameter of 1
 */
function octohedron() {
    var l = Math.sqrt(3);
    return unitShape([
        expression_1.value(1 / l, 1 / l, 1 / l),
        expression_1.value(1 / l, 1 / l, -1 / l),
        expression_1.value(1 / l, -1 / l, 1 / l),
        expression_1.value(1 / l, -1 / l, -1 / l),
        expression_1.value(-1 / l, 1 / l, 1 / l),
        expression_1.value(-1 / l, 1 / l, -1 / l),
        expression_1.value(-1 / l, -1 / l, 1 / l),
        expression_1.value(-1 / l, -1 / l, -1 / l),
    ]);
}
exports.octohedron = octohedron;
/**
 * <example id="dodecahedron" />
 *
 * Dodecahedron with circumscribed diameter of 1.
 */
function dodecahedron() {
    var phi = 0.5 * (1 + Math.sqrt(5));
    var l = Math.sqrt(phi * phi + 1);
    return unitShape([
        expression_1.value(phi / l, 1 / l, 0),
        expression_1.value(phi / l, -1 / l, 0),
        expression_1.value(0, phi / l, 1 / l),
        expression_1.value(0, phi / l, -1 / l),
        expression_1.value(1 / l, 0, phi / l),
        expression_1.value(-1 / l, 0, phi / l),
        expression_1.value(-phi / l, 1 / l, 0),
        expression_1.value(-phi / l, -1 / l, 0),
        expression_1.value(0, -phi / l, 1 / l),
        expression_1.value(0, -phi / l, -1 / l),
        expression_1.value(1 / l, 0, -phi / l),
        expression_1.value(-1 / l, 0, -phi / l)
    ]);
}
exports.dodecahedron = dodecahedron;
/**
 * <example id="cylinder" />
 *
 * Cylinder of diameter 1 along the (0, 1, 0) axis
 */
function cylinder() {
    return shape(function (p) {
        return expression_1.expression("length(" + p + ".xz) - 0.5");
    });
}
exports.cylinder = cylinder;
/**
 * <example id="torus" />
 *
 * Torus with outer diameter of 1, inner radius of 0.1
 */
function torus() {
    return shape(function (p) {
        return expression_1.expression("length(vec2(length(" + p + ".xz) - 0.5, " + p + ".y)) - 0.1");
    });
}
exports.torus = torus;
/** Move a [[Shape]] by `x` */
function translate(x, a) {
    return shape(function (p) {
        return a.call(expression_1.expression(p + " - " + x));
    });
}
exports.translate = translate;
/** Scale a [[Shape]] by `x` */
function scale(x, a) {
    return shape(function (p) {
        var q = a.call(expression_1.expression(p + " / " + x + ".x"));
        return expression_1.expression(q + " * " + x + ".x");
    });
}
exports.scale = scale;
/** Variable radius sphere with radius calculcated using `x` */
function spheroid(x) {
    return shape(function (p) { return expression_1.expression("length(" + p + ") - " + x(p)); });
}
exports.spheroid = spheroid;
function max(a) {
    return shape(function (p) {
        return a.call(expression_1.expression("max(" + p + ", 0.0)"));
    });
}
exports.max = max;
/** Stretch a [[Shape]] */
function stretch(x, a) {
    return shape(function (p) {
        return expression_1.expression(a.call(expression_1.expression(p + " / " + x)) + " * " + expression_1.minNorm(x));
    });
}
exports.stretch = stretch;
/**
 * <example id="repeat" />
 *
 * Repeat a [[Shape]] with repetition factor `x`
 */
function repeat(x, a) {
    return shape(function (p) {
        return a.call(expression_1.expression("mod(" + p + " - " + x + " * 0.5, " + x + ") - " + x + " * 0.5"));
    });
}
exports.repeat = repeat;
/** The union of two [[Shape]]s */
function union(a, b) {
    return shape(function (p) {
        var da = a.call(p);
        var db = b.call(p);
        return expression_1.expression("min(" + da + ", " + db + ")");
    });
}
exports.union = union;
/** The intersection of two [[Shape]]s */
function intersection(a, b) {
    return shape(function (p) {
        var da = a.call(p);
        var db = b.call(p);
        return expression_1.expression("max(" + da + ", " + db + ")");
    });
}
exports.intersection = intersection;
/** The difference of two [[Shape]]s */
function difference(a, b) {
    return shape(function (p) {
        var da = a.call(p);
        var db = b.call(p);
        return expression_1.expression("max(" + da + ", -" + db + ")");
    });
}
exports.difference = difference;
function smoothMin(k, a, b) {
    var h = expression_1.expression("clamp(0.5 + 0.5 * (" + b + " - " + a + ") / " + k + ", 0.0, 1.0)");
    return expression_1.expression("mix(" + b + ", " + a + ", " + h + ") - " + k + " * " + h + " * (1.0 - " + h + ")");
}
function smoothMax(k, a, b) {
    var h = expression_1.expression("clamp(0.5 - 0.5 * (" + b + " - " + a + ") / " + k + ", 0.0, 1.0)");
    return expression_1.expression("mix(" + b + ", " + a + ", " + h + ") + " + k + " * " + h + " * (1.0 - " + h + ")");
}
/** Smooth union */
function smoothUnion(k, a, b) {
    return shape(function (p) {
        return smoothMin(k, a.call(p), b.call(p));
    });
}
exports.smoothUnion = smoothUnion;
/** Smooth intersection */
function smoothIntersection(k, a, b) {
    return shape(function (p) {
        return smoothMax(k, a.call(p), b.call(p));
    });
}
exports.smoothIntersection = smoothIntersection;
/** Smooth difference */
function smoothDifference(k, a, b) {
    return shape(function (p) {
        return smoothMax(k, a.call(p), expression_1.expression(b.call(p) + " * -1.0"));
    });
}
exports.smoothDifference = smoothDifference;
/** Expand a [[Shape]] by distance `k` */
function expand(k, a) {
    return shape(function (p) {
        var da = a.call(p);
        return expression_1.expression(da + " - " + k + ".x");
    });
}
exports.expand = expand;
/** Twist a [[Shape]] along the x-axis */
function twistX(x, a) {
    return shape(function (p) {
        return rotateX(expression_1.expression("vec3(" + p + ".x * " + x + ".x)"), a).call(p);
    });
}
exports.twistX = twistX;
/** Twist a [[Shape]] along the y-axis */
function twistY(x, a) {
    return shape(function (p) {
        return rotateY(expression_1.expression("vec3(" + p + ".y * " + x + ".x)"), a).call(p);
    });
}
exports.twistY = twistY;
/** Twist a [[Shape]] along the z-axis */
function twistZ(x, a) {
    return shape(function (p) {
        return rotateZ(expression_1.expression("vec3(" + p + ".z * " + x + ".x)"), a).call(p);
    });
}
exports.twistZ = twistZ;
/** Rotate a [[Shape]] about the x-axis */
function rotateX(x, a) {
    return shape(function (p) {
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(1, 0, 0, 0, " + c + ".x, " + c + ".y, 0, -" + c + ".y, " + c + ".x) * " + p));
    });
}
exports.rotateX = rotateX;
/** Rotate a [[Shape]] about the y-axis */
function rotateY(x, a) {
    return shape(function (p) {
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(" + c + ".x, 0, -" + c + ".y, 0, 1, 0, " + c + ".y, 0, " + c + ".x) * " + p));
    });
}
exports.rotateY = rotateY;
/** Rotate a [[Shape]] about the z-axis */
function rotateZ(x, a) {
    return shape(function (p) {
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(" + c + ".x, " + c + ".y, 0, -" + c + ".y, " + c + ".x, 0, 0, 0, 1) * " + p));
    });
}
exports.rotateZ = rotateZ;
/** Rotate a [[Shape]] about an arbitrary axis */
function rotate(axis, x, a) {
    return shape(function (p) {
        var u = expression_1.expression("normalize(" + axis + ")");
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(\n\t\t\t" + c + ".x + " + u + ".x * " + u + ".x * (1.0 - " + c + ".x), \n\t\t\t" + u + ".x * " + u + ".y * (1.0 - " + c + ".x) - " + u + ".z * " + c + ".y,\n\t\t\t" + u + ".x * " + u + ".z * (1.0 - " + c + ".x) + " + u + ".y * " + c + ".y,\n\t\t\t" + u + ".y * " + u + ".x * (1.0 - " + c + ".x) + " + u + ".z * " + c + ".y,\n\t\t\t" + c + ".x + " + u + ".y * " + u + ".y * (1.0 - " + c + ".x),\n\t\t\t" + u + ".x * " + u + ".y * (1.0 - " + c + ".x) - " + u + ".x * " + c + ".y,\n\t\t\t" + u + ".z * " + u + ".x * (1.0 - " + c + ".x) - " + u + ".y * " + c + ".y,\n\t\t\t" + u + ".z * " + u + ".y * (1.0 - " + c + ".x) + " + u + ".x * " + c + ".y,\n\t\t\t" + c + ".x +  " + u + ".z * " + u + ".z * (1.0 - " + c + ".x)) * " + p));
    });
}
exports.rotate = rotate;
/** Wrap a [[Shape]] about the x-axis */
function wrapX(a) {
    return shape(function (p) {
        var c = expression_1.expression("length(" + p + ".yz)");
        var q = expression_1.expression("1, 1, max(0.01, abs(" + p + ".z))");
        return expression_1.expression(a.call(expression_1.expression(p + ".x, asin(" + p + ".y / " + c + ".x), " + c + ".x")) + " * " + expression_1.minNorm(q));
    });
}
exports.wrapX = wrapX;
/** Mirror a [[Shape]] */
function mirror(normal, a) {
    return shape(function (p) {
        return a.call(expression_1.expression(p + " - 2.0 * min(0.0, dot(" + p + ", " + normal + ")) * " + normal));
    });
}
exports.mirror = mirror;
/** Offset a [[Shape]] */
function offset(x, a) {
    return shape(function (p) { return a.call(expression_1.expression(p + " - " + x(p))); });
}
exports.offset = offset;
/**
 * <example id="smoothBox" />
 *
 * A box with rounded corners
 */
function smoothBox(dimensions, radius) {
    return mirror(expression_1.value(1, 0, 0), mirror(expression_1.value(0, 1, 0), mirror(expression_1.value(0, 0, 1), translate(expression_1.expression("0.5 * (" + dimensions + " - " + radius + ")"), max(scale(radius, sphere()))))));
}
exports.smoothBox = smoothBox;
/**
 * <example id="box" />
 *
 * A box with aritrary dimensions
 */
function box(dimensions) {
    return shape(function (p) {
        var d = expression_1.expression("abs(" + p + ") - " + dimensions + " * 0.5");
        return expression_1.expression("max(min(" + d + ".x, min(" + d + ".y, " + d + ".z)), 0.0) + length(max(" + d + ", 0.0))");
    });
}
exports.box = box;
/**
 * <example id="sierpinski" />
 *
 * A sierpinksi fractal
 */
function sierpinski(iterations, a) {
    if (iterations === void 0) { iterations = 5; }
    if (a === void 0) { a = tetrahedron(); }
    var l = Math.sqrt(2);
    return Array(iterations)
        .fill(0)
        .reduce(function (shape, i) {
        return mirror(expression_1.value(1 / l, 1 / l, 0), mirror(expression_1.value(0, 1 / l, 1 / l), mirror(expression_1.value(1 / l, 0, 1 / l), scale(expression_1.value(0.5), translate(expression_1.value(0.5 * Math.sqrt(3)), shape)))));
    }, a);
}
exports.sierpinski = sierpinski;
/**
 * <example id="tree" />
 *
 * A recursive tree [[Shape]]
 */
function tree(iterations, shape) {
    if (iterations === void 0) { iterations = 7; }
    var factor = 0.6;
    var length = 1;
    var width = 0.15;
    var angle = 30 / 180 * Math.PI;
    if (iterations <= 1)
        return smoothBox(expression_1.value(width, length, width), expression_1.value(width));
    else {
        shape = tree(iterations - 1, shape);
        return union(shape, mirror(expression_1.value(1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)), mirror(expression_1.value(1 / Math.sqrt(2), 0, -1 / Math.sqrt(2)), translate(expression_1.value(length * factor / 2 * Math.sin(angle), length / 2 * (1 + factor / 2 * Math.cos(angle)), 0), scale(expression_1.value(factor), rotateY(expression_1.value(0.1), rotateZ(expression_1.value(angle), shape)))))));
    }
}
exports.tree = tree;
/** [[repeat]] where the repetition index can be used to generate the [[Shape]] */
function modulate(x, a, buffer) {
    if (buffer === void 0) { buffer = expression_1.value(0.01); }
    return shape(function (p) {
        var offset = expression_1.expression(p + " + " + x + " * 0.5");
        var index = expression_1.expression("floor(" + offset + " / " + x + ")");
        var center = expression_1.expression(index + " * " + x);
        var local = expression_1.expression(p + " - " + center);
        var mask = shape(function (p) {
            var a = expression_1.expression(buffer + " + " + x + " * 0.5 - abs(" + p + ")");
            return expression_1.expression("min(min(" + a + ".x, " + a + ".y), " + a + ".z)");
        });
        return union(mask, a(index))
            .call(local);
    });
}
exports.modulate = modulate;
/** Choose a shape randomly */
function choose(x, shapes) {
    return shape(function (p) {
        return expression_1.expression(shapes
            .map(function (_) { return _.call(p); })
            .reduce(function (code, d, i) {
            return code + (x + ".x < " + ((i + 1) / shapes.length).toPrecision(6) + " ? " + d + " : ");
        }, "") + "vec3(0)");
    });
}
exports.choose = choose;
/** Truchet */
function truchet() {
    var base = intersection(cube(), union(union(translate(expression_1.value(0.5, 0, 0.5), torus()), translate(expression_1.value(-0.5, 0.5, 0), rotateX(expression_1.value(Math.PI / 2), torus()))), translate(expression_1.value(0, -0.5, -0.5), rotateZ(expression_1.value(Math.PI / 2), torus()))));
    return modulate(expression_1.value(1, 1, 1), function (index) {
        return choose(expression_1.random(index), [
            base,
            rotateX(expression_1.value(Math.PI / 2), base),
            rotateX(expression_1.value(Math.PI), base),
            rotateX(expression_1.value(3 * Math.PI / 2), base)
        ]);
    });
}
exports.truchet = truchet;
/**
 * <example id="skull" />
 *
 * Skull
 */
function skull() {
    var skull = translate(expression_1.value(0, 0.05, 0), spheroid(function (p) { return expression_1.expression("0.333 * cos(cos(" + p + ".y * 11.0 + 0.55) * " + p + ".z * 2.3)"); }));
    var globeFront = translate(expression_1.value(0.1, 0.23, 0), scale(expression_1.value(0.574), sphere()));
    skull = smoothUnion(expression_1.value(0.09), skull, globeFront);
    var globeBack = translate(expression_1.value(-0.1, 0.24, 0), scale(expression_1.value(0.574), sphere()));
    skull = smoothUnion(expression_1.value(0.09), skull, globeBack);
    var eyeBrow = translate(expression_1.value(0.24, 0.07, 0.1), spheroid(function (p) { return expression_1.expression("0.126 * cos(" + p + ".y * 7.0 + 0.49)"); }));
    skull = smoothUnion(expression_1.value(0.02), skull, eyeBrow);
    var lateralHole = translate(expression_1.value(0.15, -0.01, 0.31), spheroid(function (p) { return expression_1.expression("0.098 * cos(" + p + ".x * 0.59 + 0.089)"); }));
    skull = smoothDifference(expression_1.value(0.02), skull, lateralHole);
    var cheekBone = translate(expression_1.value(0.21, -0.13, 0.18), scale(expression_1.value(0.077), sphere()));
    skull = smoothUnion(expression_1.value(0.04), skull, cheekBone);
    var inside = translate(expression_1.value(0, 0.05, 0), spheroid(function (p) { return expression_1.expression("0.315 * cos(cos(" + p + ".y * 11.0 + 0.55) * " + p + ".z * 2.3)"); }));
    inside = smoothUnion(expression_1.value(0.02), inside, translate(expression_1.value(0.10, 0.23, 0), scale(expression_1.value(0.511), sphere())));
    inside = smoothUnion(expression_1.value(0.02), inside, translate(expression_1.value(-0.1, 0.24, 0), scale(expression_1.value(0.511), sphere())));
    inside = smoothUnion(expression_1.value(0.02), inside, translate(expression_1.value(0, 0.24, 0), scale(expression_1.value(0.511), sphere())));
    skull = smoothDifference(expression_1.value(0.02), skull, inside);
    var eyeBall = translate(expression_1.value(0.32, -0.04, 0.140), spheroid(function (p) { return expression_1.expression("0.098 * cos(" + p + ".y * 10.0 - 0.04)"); }));
    skull = smoothDifference(expression_1.value(0.03), skull, eyeBall);
    var nose = translate(expression_1.value(0.22, -0.05, 0), spheroid(function (p) { return expression_1.expression("0.123 * cos(sin(" + p + ".y * 22.0 - 1.1) * " + p + ".z * 24.0)"); }));
    nose = smoothDifference(expression_1.value(0.02), nose, translate(expression_1.value(0.32, -0.04, 0.140), spheroid(function (p) { return expression_1.expression("0.123 * cos(" + p + ".y * 10.0 - 0.4)"); })));
    nose = smoothDifference(expression_1.value(0.02), nose, translate(expression_1.value(0, 0.05, 0), spheroid(function (p) { return expression_1.expression("0.32 * cos(cos(" + p + ".y * 11.0 + 0.5) * " + p + ".z * 2.3)"); })));
    skull = smoothUnion(expression_1.value(0.015), skull, nose);
    var noseInside = translate(expression_1.value(0.228, -0.09, 0), spheroid(function (p) { return expression_1.expression("0.11 * cos(sin(" + p + ".y * 18.0 - 1.62) * " + p + ".z * 29.0)"); }));
    skull = smoothDifference(expression_1.value(0.005), skull, noseInside);
    var cut = translate(expression_1.value(-0.15, -0.97, 0), scale(expression_1.value(1.75), sphere()));
    skull = smoothDifference(expression_1.value(0.01), skull, cut);
    var upperJaw = translate(expression_1.value(0.13, -0.26, 0), scale(expression_1.value(0.315), sphere()));
    upperJaw = smoothDifference(expression_1.value(0.01), upperJaw, translate(expression_1.value(0.125, -0.3, 0), scale(expression_1.value(0.28), sphere())));
    upperJaw = smoothDifference(expression_1.value(0.03), upperJaw, translate(expression_1.value(-0.2, -0.1, 0), scale(expression_1.value(0.63), sphere())));
    upperJaw = smoothDifference(expression_1.value(0.03), upperJaw, translate(expression_1.value(0.13, -0.543, 0), scale(expression_1.value(0.63), sphere())));
    upperJaw = difference(upperJaw, translate(expression_1.value(0, 0.02, 0), spheroid(function (p) { return expression_1.expression("0.315 * cos(cos(" + p + ".y * 11.0 + 0.22) * " + p + ".z * 2.3)"); })));
    skull = smoothUnion(expression_1.value(0.04), skull, upperJaw);
    var lowerJaw = translate(expression_1.value(0.1, -0.32, 0), scale(expression_1.value(0.301), sphere()));
    lowerJaw = smoothDifference(expression_1.value(0.02), lowerJaw, translate(expression_1.value(0.1, -0.32, 0), scale(expression_1.value(0.259), sphere())));
    lowerJaw = smoothDifference(expression_1.value(0.02), lowerJaw, translate(expression_1.value(0.1, -0.034, 0), scale(expression_1.value(0.721), sphere())));
    lowerJaw = smoothDifference(expression_1.value(0.02), lowerJaw, translate(expression_1.value(0, -0.4, 0), scale(expression_1.value(0.245), sphere())));
    lowerJaw = smoothUnion(expression_1.value(0.13), lowerJaw, offset(function (p) { return expression_1.expression("0.04 - 0.03 * cos(" + p + ".y * 20.2), -0.23, 0.27 + sin(" + p + ".y) * 0.27"); }, box(expression_1.value(0.06, 0.24, 0.028))));
    lowerJaw = difference(lowerJaw, translate(expression_1.value(0, 0.153, 0.2), scale(expression_1.value(0.595), sphere())));
    lowerJaw = smoothUnion(expression_1.value(0.08), lowerJaw, translate(expression_1.value(0.19, -0.44, 0.05), scale(expression_1.value(0.035), sphere())));
    skull = smoothUnion(expression_1.value(0.02), skull, lowerJaw);
    var teeth = translate(expression_1.value(0.26, -0.29, 0.018), scale(expression_1.value(0.0371), sphere()));
    teeth = union(teeth, translate(expression_1.value(0.25, -0.288, 0.05), scale(expression_1.value(0.035), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.235, -0.29, 0.08), scale(expression_1.value(0.035), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.215, -0.285, 0.1), scale(expression_1.value(0.035), sphere())));
    ;
    teeth = difference(teeth, translate(expression_1.value(0.16, -0.35, 0), scale(expression_1.value(0.231), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.18, -0.28, 0.115), scale(expression_1.value(0.035), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.14, -0.28, 0.115), scale(expression_1.value(0.042), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.11, -0.28, 0.115), scale(expression_1.value(0.042), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.08, -0.28, 0.115), scale(expression_1.value(0.042), sphere())));
    ;
    skull = smoothUnion(expression_1.value(0.03), skull, teeth);
    teeth = translate(expression_1.value(0.23, -0.34, 0.018), scale(expression_1.value(0.0371), sphere()));
    teeth = union(teeth, translate(expression_1.value(0.22, -0.34, 0.048), scale(expression_1.value(0.0353), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.20, -0.345, 0.078), scale(expression_1.value(0.0353), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.17, -0.35, 0.098), scale(expression_1.value(0.0353), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.14, -0.35, 0.11), scale(expression_1.value(0.0353), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.11, -0.35, 0.11), scale(expression_1.value(0.0353), sphere())));
    ;
    teeth = union(teeth, translate(expression_1.value(0.08, -0.35, 0.11), scale(expression_1.value(0.0353), sphere())));
    ;
    skull = smoothUnion(expression_1.value(0.025), skull, teeth);
    skull = mirror(expression_1.value(0, 0, 1), skull);
    return skull;
}
exports.skull = skull;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Camera]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var expression_1 = __webpack_require__(0);
/** Create a [[Camera]] */
function camera(values) {
    values = values || {};
    return {
        eye: values.eye || expression_1.value(0, 0, -1),
        target: values.target || expression_1.value(0, 0, 0),
        up: values.up || expression_1.value(0, 1, 0),
        fieldOfView: values.fieldOfView || expression_1.value(45 / 180.0 * Math.PI),
        aperture: values.aperture || expression_1.value(0.0),
        focalFactor: values.focalFactor || expression_1.value(1.0)
    };
}
exports.camera = camera;
/** Create an orbiting [[Camera]] controlled by the mouse */
function orbit(values) {
    values = values || {};
    values.target = values.target || expression_1.value(0, 0, 0);
    values.offset = values.offset || expression_1.value(0, 0);
    values.radius = values.radius || expression_1.value(1);
    var r = expression_1.value(Math.PI, Math.PI / 2);
    var q = spherical(expression_1.expression("vec3(mouse + " + values.offset + ".xy + vec2(0.5, 1), 1) * " + r));
    return camera({
        target: values.target,
        eye: expression_1.expression(values.target + " + " + values.radius + ".x * " + q),
        up: values.up,
        fieldOfView: values.fieldOfView,
        aperture: values.aperture,
        focalFactor: values.focalFactor
    });
}
exports.orbit = orbit;
function spherical(a) {
    return expression_1.expression("vec3(sin(" + a + ".y) * cos(" + a + ".x), cos(" + a + ".y), sin(" + a + ".y) * sin(" + a + ".x))");
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(2);
__webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Config = {
    DEBUG: false,
    LIB_VERSION: '2.13.0'
};

// since es6 imports are static and we run unit tests from the console, window won't be defined when importing this file
var win;
if (typeof(window) === 'undefined') {
    win = {
        navigator: {}
    };
} else {
    win = window;
}



/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */

var ArrayProto = Array.prototype;
var FuncProto = Function.prototype;
var ObjProto = Object.prototype;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var windowConsole = win.console;
var navigator$1 = win.navigator;
var document$1 = win.document;
var userAgent = navigator$1.userAgent;
var nativeBind = FuncProto.bind;
var nativeForEach = ArrayProto.forEach;
var nativeIndexOf = ArrayProto.indexOf;
var nativeIsArray = Array.isArray;
var breaker = {};
var _ = {
    trim: function(str) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
};

// Console override
var console$1 = {
    /** @type {function(...[*])} */
    log: function() {
        if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
            try {
                windowConsole.log.apply(windowConsole, arguments);
            } catch (err) {
                _.each(arguments, function(arg) {
                    windowConsole.log(arg);
                });
            }
        }
    },
    /** @type {function(...[*])} */
    error: function() {
        if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
            var args = ['Mixpanel error:'].concat(_.toArray(arguments));
            try {
                windowConsole.error.apply(windowConsole, args);
            } catch (err) {
                _.each(args, function(arg) {
                    windowConsole.error(arg);
                });
            }
        }
    },
    /** @type {function(...[*])} */
    critical: function() {
        if (!_.isUndefined(windowConsole) && windowConsole) {
            var args = ['Mixpanel error:'].concat(_.toArray(arguments));
            try {
                windowConsole.error.apply(windowConsole, args);
            } catch (err) {
                _.each(args, function(arg) {
                    windowConsole.error(arg);
                });
            }
        }
    }
};


// UNDERSCORE
// Embed part of the Underscore Library
_.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }
    if (!_.isFunction(func)) {
        throw new TypeError();
    }
    args = slice.call(arguments, 2);
    bound = function() {
        if (!(this instanceof bound)) {
            return func.apply(context, args.concat(slice.call(arguments)));
        }
        var ctor = {};
        ctor.prototype = func.prototype;
        var self = new ctor();
        ctor.prototype = null;
        var result = func.apply(self, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
            return result;
        }
        return self;
    };
    return bound;
};

_.bind_instance_methods = function(obj) {
    for (var func in obj) {
        if (typeof(obj[func]) === 'function') {
            obj[func] = _.bind(obj[func], obj);
        }
    }
};

/**
 * @param {*=} obj
 * @param {function(...[*])=} iterator
 * @param {Object=} context
 */
_.each = function(obj, iterator, context) {
    if (obj === null || obj === undefined) {
        return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                return;
            }
        }
    } else {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === breaker) {
                    return;
                }
            }
        }
    }
};

_.escapeHTML = function(s) {
    var escaped = s;
    if (escaped && _.isString(escaped)) {
        escaped = escaped
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    return escaped;
};

_.extend = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            if (source[prop] !== void 0) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

_.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

// from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
_.isFunction = function(f) {
    try {
        return /^\s*\bfunction\b/.test(f);
    } catch (x) {
        return false;
    }
};

_.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
};

_.toArray = function(iterable) {
    if (!iterable) {
        return [];
    }
    if (iterable.toArray) {
        return iterable.toArray();
    }
    if (_.isArray(iterable)) {
        return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
        return slice.call(iterable);
    }
    return _.values(iterable);
};

_.values = function(obj) {
    var results = [];
    if (obj === null) {
        return results;
    }
    _.each(obj, function(value) {
        results[results.length] = value;
    });
    return results;
};

_.identity = function(value) {
    return value;
};

_.include = function(obj, target) {
    var found = false;
    if (obj === null) {
        return found;
    }
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1;
    }
    _.each(obj, function(value) {
        if (found || (found = (value === target))) {
            return breaker;
        }
    });
    return found;
};

_.includes = function(str, needle) {
    return str.indexOf(needle) !== -1;
};

// Underscore Addons
_.inherit = function(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
};

_.isObject = function(obj) {
    return (obj === Object(obj) && !_.isArray(obj));
};

_.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_.isUndefined = function(obj) {
    return obj === void 0;
};

_.isString = function(obj) {
    return toString.call(obj) == '[object String]';
};

_.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
};

_.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
};

_.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};

_.encodeDates = function(obj) {
    _.each(obj, function(v, k) {
        if (_.isDate(v)) {
            obj[k] = _.formatDate(v);
        } else if (_.isObject(v)) {
            obj[k] = _.encodeDates(v); // recurse
        }
    });
    return obj;
};

_.timestamp = function() {
    Date.now = Date.now || function() {
        return +new Date;
    };
    return Date.now();
};

_.formatDate = function(d) {
    // YYYY-MM-DDTHH:MM:SS in UTC
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds());
};

_.safewrap = function(f) {
    return function() {
        try {
            return f.apply(this, arguments);
        } catch (e) {
            console$1.critical('Implementation error. Please contact support@mixpanel.com.');
        }
    };
};

_.safewrap_class = function(klass, functions) {
    for (var i = 0; i < functions.length; i++) {
        klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]]);
    }
};

_.safewrap_instance_methods = function(obj) {
    for (var func in obj) {
        if (typeof(obj[func]) === 'function') {
            obj[func] = _.safewrap(obj[func]);
        }
    }
};

_.strip_empty_properties = function(p) {
    var ret = {};
    _.each(p, function(v, k) {
        if (_.isString(v) && v.length > 0) {
            ret[k] = v;
        }
    });
    return ret;
};

/*
 * this function returns a copy of object after truncating it.  If
 * passed an Array or Object it will iterate through obj and
 * truncate all the values recursively.
 */
_.truncate = function(obj, length) {
    var ret;

    if (typeof(obj) === 'string') {
        ret = obj.slice(0, length);
    } else if (_.isArray(obj)) {
        ret = [];
        _.each(obj, function(val) {
            ret.push(_.truncate(val, length));
        });
    } else if (_.isObject(obj)) {
        ret = {};
        _.each(obj, function(val, key) {
            ret[key] = _.truncate(val, length);
        });
    } else {
        ret = obj;
    }

    return ret;
};

_.JSONEncode = (function() {
    return function(mixed_val) {
        var value = mixed_val;
        var quote = function(string) {
            var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // eslint-disable-line no-control-regex
            var meta = { // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            escapable.lastIndex = 0;
            return escapable.test(string) ?
                '"' + string.replace(escapable, function(a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        };

        var str = function(key, holder) {
            var gap = '';
            var indent = '    ';
            var i = 0; // The loop counter.
            var k = ''; // The member key.
            var v = ''; // The member value.
            var length = 0;
            var mind = gap;
            var partial = [];
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.

                    return String(value);

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];

                    // Is the value an array?
                    if (toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' :
                            gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' :
                        gap ? '{' + partial.join(',') + '' +
                        mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        };

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        });
    };
})();

_.JSONDecode = (function() { // https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
    var at, // The index of the current character
        ch, // The current character
        escapee = {
            '"': '"',
            '\\': '\\',
            '/': '/',
            'b': '\b',
            'f': '\f',
            'n': '\n',
            'r': '\r',
            't': '\t'
        },
        text,
        error = function(m) {
            throw {
                name: 'SyntaxError',
                message: m,
                at: at,
                text: text
            };
        },
        next = function(c) {
            // If a c parameter is provided, verify that it matches the current character.
            if (c && c !== ch) {
                error('Expected \'' + c + '\' instead of \'' + ch + '\'');
            }
            // Get the next character. When there are no more characters,
            // return the empty string.
            ch = text.charAt(at);
            at += 1;
            return ch;
        },
        number = function() {
            // Parse a number value.
            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error('Bad number');
            } else {
                return number;
            }
        },

        string = function() {
            // Parse a string value.
            var hex,
                i,
                string = '',
                uffff;
            // When parsing for string values, we must look for " and \ characters.
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    }
                    if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error('Bad string');
        },
        white = function() {
            // Skip whitespace.
            while (ch && ch <= ' ') {
                next();
            }
        },
        word = function() {
            // true, false, or null.
            switch (ch) {
                case 't':
                    next('t');
                    next('r');
                    next('u');
                    next('e');
                    return true;
                case 'f':
                    next('f');
                    next('a');
                    next('l');
                    next('s');
                    next('e');
                    return false;
                case 'n':
                    next('n');
                    next('u');
                    next('l');
                    next('l');
                    return null;
            }
            error('Unexpected "' + ch + '"');
        },
        value, // Placeholder for the value function.
        array = function() {
            // Parse an array value.
            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array; // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad array');
        },
        object = function() {
            // Parse an object value.
            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object; // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad object');
        };

    value = function() {
        // Parse a JSON value. It could be an object, an array, a string,
        // a number, or a word.
        white();
        switch (ch) {
            case '{':
                return object();
            case '[':
                return array();
            case '"':
                return string();
            case '-':
                return number();
            default:
                return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

    // Return the json_parse function. It will have access to all of the
    // above functions and variables.
    return function(source) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error('Syntax error');
        }

        return result;
    };
})();

_.base64Encode = function(data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = _.utf8Encode(data);

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }

    return enc;
};

_.utf8Encode = function(string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    var utftext = '',
        start,
        end;
    var stringl = 0,
        n;

    start = end = 0;
    stringl = string.length;

    for (n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if ((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
};

_.UUID = (function() {

    // Time/ticks information
    // 1*new Date() is a cross browser version of Date.now()
    var T = function() {
        var d = 1 * new Date(),
            i = 0;

        // this while loop figures how many browser ticks go by
        // before 1*new Date() returns a new number, ie the amount
        // of ticks that go by per millisecond
        while (d == 1 * new Date()) {
            i++;
        }

        return d.toString(16) + i.toString(16);
    };

    // Math.Random entropy
    var R = function() {
        return Math.random().toString(16).replace('.', '');
    };

    // User agent entropy
    // This function takes the user agent string, and then xors
    // together each sequence of 8 bytes.  This produces a final
    // sequence of 8 bytes which it returns as hex.
    var UA = function() {
        var ua = userAgent,
            i, ch, buffer = [],
            ret = 0;

        function xor(result, byte_array) {
            var j, tmp = 0;
            for (j = 0; j < byte_array.length; j++) {
                tmp |= (buffer[j] << j * 8);
            }
            return result ^ tmp;
        }

        for (i = 0; i < ua.length; i++) {
            ch = ua.charCodeAt(i);
            buffer.unshift(ch & 0xFF);
            if (buffer.length >= 4) {
                ret = xor(ret, buffer);
                buffer = [];
            }
        }

        if (buffer.length > 0) {
            ret = xor(ret, buffer);
        }

        return ret.toString(16);
    };

    return function() {
        var se = (screen.height * screen.width).toString(16);
        return (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
    };
})();

// _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false tracking data
_.isBlockedUA = function(ua) {
    if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) {
        return true;
    }
    return false;
};

/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */
_.HTTPBuildQuery = function(formdata, arg_separator) {
    var use_val, use_key, tmp_arr = [];

    if (_.isUndefined(arg_separator)) {
        arg_separator = '&';
    }

    _.each(formdata, function(val, key) {
        use_val = encodeURIComponent(val.toString());
        use_key = encodeURIComponent(key);
        tmp_arr[tmp_arr.length] = use_key + '=' + use_val;
    });

    return tmp_arr.join(arg_separator);
};

_.getQueryParam = function(url, param) {
    // Expects a raw URL

    param = param.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + param + '=([^&#]*)',
        regex = new RegExp(regexS),
        results = regex.exec(url);
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
        return '';
    } else {
        return decodeURIComponent(results[1]).replace(/\+/g, ' ');
    }
};

_.getHashParam = function(hash, param) {
    var matches = hash.match(new RegExp(param + '=([^&]*)'));
    return matches ? matches[1] : null;
};

// _.cookie
// Methods partially borrowed from quirksmode.org/js/cookies.html
_.cookie = {
    get: function(name) {
        var nameEQ = name + '=';
        var ca = document$1.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },

    parse: function(name) {
        var cookie;
        try {
            cookie = _.JSONDecode(_.cookie.get(name)) || {};
        } catch (err) {
            // noop
        }
        return cookie;
    },

    set_seconds: function(name, value, seconds, cross_subdomain, is_secure) {
        var cdomain = '',
            expires = '',
            secure = '';

        if (cross_subdomain) {
            var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                domain = matches ? matches[0] : '';

            cdomain = ((domain) ? '; domain=.' + domain : '');
        }

        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        if (is_secure) {
            secure = '; secure';
        }

        document$1.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
    },

    set: function(name, value, days, cross_subdomain, is_secure) {
        var cdomain = '', expires = '', secure = '';

        if (cross_subdomain) {
            var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                domain = matches ? matches[0] : '';

            cdomain   = ((domain) ? '; domain=.' + domain : '');
        }

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        if (is_secure) {
            secure = '; secure';
        }

        var new_cookie_val = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
        document$1.cookie = new_cookie_val;
        return new_cookie_val;
    },

    remove: function(name, cross_subdomain) {
        _.cookie.set(name, '', -1, cross_subdomain);
    }
};

// _.localStorage
_.localStorage = {
    error: function(msg) {
        console$1.error('localStorage error: ' + msg);
    },

    get: function(name) {
        try {
            return window.localStorage.getItem(name);
        } catch (err) {
            _.localStorage.error(err);
        }
        return null;
    },

    parse: function(name) {
        try {
            return _.JSONDecode(_.localStorage.get(name)) || {};
        } catch (err) {
            // noop
        }
        return null;
    },

    set: function(name, value) {
        try {
            window.localStorage.setItem(name, value);
        } catch (err) {
            _.localStorage.error(err);
        }
    },

    remove: function(name) {
        try {
            window.localStorage.removeItem(name);
        } catch (err) {
            _.localStorage.error(err);
        }
    }
};

_.register_event = (function() {
    // written by Dean Edwards, 2005
    // with input from Tino Zijdel - crisp@xs4all.nl
    // with input from Carl Sverre - mail@carlsverre.com
    // with input from Mixpanel
    // http://dean.edwards.name/weblog/2005/10/add-event/
    // https://gist.github.com/1930440

    /**
     * @param {Object} element
     * @param {string} type
     * @param {function(...[*])} handler
     * @param {boolean=} oldSchool
     * @param {boolean=} useCapture
     */
    var register_event = function(element, type, handler, oldSchool, useCapture) {
        if (!element) {
            console$1.error('No valid element provided to register_event');
            return;
        }

        if (element.addEventListener && !oldSchool) {
            element.addEventListener(type, handler, !!useCapture);
        } else {
            var ontype = 'on' + type;
            var old_handler = element[ontype]; // can be undefined
            element[ontype] = makeHandler(element, handler, old_handler);
        }
    };

    function makeHandler(element, new_handler, old_handlers) {
        var handler = function(event) {
            event = event || fixEvent(window.event);

            // this basically happens in firefox whenever another script
            // overwrites the onload callback and doesn't pass the event
            // object to previously defined callbacks.  All the browsers
            // that don't define window.event implement addEventListener
            // so the dom_loaded handler will still be fired as usual.
            if (!event) {
                return undefined;
            }

            var ret = true;
            var old_result, new_result;

            if (_.isFunction(old_handlers)) {
                old_result = old_handlers(event);
            }
            new_result = new_handler.call(element, event);

            if ((false === old_result) || (false === new_result)) {
                ret = false;
            }

            return ret;
        };

        return handler;
    }

    function fixEvent(event) {
        if (event) {
            event.preventDefault = fixEvent.preventDefault;
            event.stopPropagation = fixEvent.stopPropagation;
        }
        return event;
    }
    fixEvent.preventDefault = function() {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
    };

    return register_event;
})();

_.dom_query = (function() {
    /* document.getElementsBySelector(selector)
    - returns an array of element objects from the current document
    matching the CSS selector. Selectors can contain element names,
    class names and ids and can be nested. For example:

    elements = document.getElementsBySelector('div#main p a.external')

    Will return an array of all 'a' elements with 'external' in their
    class attribute that are contained inside 'p' elements that are
    contained inside the 'div' element which has id="main"

    New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
    See http://www.w3.org/TR/css3-selectors/#attribute-selectors

    Version 0.4 - Simon Willison, March 25th 2003
    -- Works in Phoenix 0.5, Mozilla 1.3, Opera 7, Internet Explorer 6, Internet Explorer 5 on Windows
    -- Opera 7 fails

    Version 0.5 - Carl Sverre, Jan 7th 2013
    -- Now uses jQuery-esque `hasClass` for testing class name
    equality.  This fixes a bug related to '-' characters being
    considered not part of a 'word' in regex.
    */

    function getAllChildren(e) {
        // Returns all children of element. Workaround required for IE5/Windows. Ugh.
        return e.all ? e.all : e.getElementsByTagName('*');
    }

    var bad_whitespace = /[\t\r\n]/g;

    function hasClass(elem, selector) {
        var className = ' ' + selector + ' ';
        return ((' ' + elem.className + ' ').replace(bad_whitespace, ' ').indexOf(className) >= 0);
    }

    function getElementsBySelector(selector) {
        // Attempt to fail gracefully in lesser browsers
        if (!document$1.getElementsByTagName) {
            return [];
        }
        // Split selector in to tokens
        var tokens = selector.split(' ');
        var token, bits, tagName, found, foundCount, i, j, k, elements, currentContextIndex;
        var currentContext = [document$1];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');
            if (token.indexOf('#') > -1) {
                // Token is an ID selector
                bits = token.split('#');
                tagName = bits[0];
                var id = bits[1];
                var element = document$1.getElementById(id);
                if (!element || (tagName && element.nodeName.toLowerCase() != tagName)) {
                    // element not found or tag with that ID not found, return false
                    return [];
                }
                // Set currentContext to contain just this element
                currentContext = [element];
                continue; // Skip to next token
            }
            if (token.indexOf('.') > -1) {
                // Token contains a class selector
                bits = token.split('.');
                tagName = bits[0];
                var className = bits[1];
                if (!tagName) {
                    tagName = '*';
                }
                // Get elements matching tag, filter them for class selector
                found = [];
                foundCount = 0;
                for (j = 0; j < currentContext.length; j++) {
                    if (tagName == '*') {
                        elements = getAllChildren(currentContext[j]);
                    } else {
                        elements = currentContext[j].getElementsByTagName(tagName);
                    }
                    for (k = 0; k < elements.length; k++) {
                        found[foundCount++] = elements[k];
                    }
                }
                currentContext = [];
                currentContextIndex = 0;
                for (j = 0; j < found.length; j++) {
                    if (found[j].className &&
                        _.isString(found[j].className) && // some SVG elements have classNames which are not strings
                        hasClass(found[j], className)
                    ) {
                        currentContext[currentContextIndex++] = found[j];
                    }
                }
                continue; // Skip to next token
            }
            // Code to deal with attribute selectors
            var token_match = token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
            if (token_match) {
                tagName = token_match[1];
                var attrName = token_match[2];
                var attrOperator = token_match[3];
                var attrValue = token_match[4];
                if (!tagName) {
                    tagName = '*';
                }
                // Grab all of the tagName elements within current context
                found = [];
                foundCount = 0;
                for (j = 0; j < currentContext.length; j++) {
                    if (tagName == '*') {
                        elements = getAllChildren(currentContext[j]);
                    } else {
                        elements = currentContext[j].getElementsByTagName(tagName);
                    }
                    for (k = 0; k < elements.length; k++) {
                        found[foundCount++] = elements[k];
                    }
                }
                currentContext = [];
                currentContextIndex = 0;
                var checkFunction; // This function will be used to filter the elements
                switch (attrOperator) {
                    case '=': // Equality
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName) == attrValue);
                        };
                        break;
                    case '~': // Match one of space seperated words
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).match(new RegExp('\\b' + attrValue + '\\b')));
                        };
                        break;
                    case '|': // Match start with value followed by optional hyphen
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?')));
                        };
                        break;
                    case '^': // Match starts with value
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).indexOf(attrValue) === 0);
                        };
                        break;
                    case '$': // Match ends with value - fails with "Warning" in Opera 7
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length);
                        };
                        break;
                    case '*': // Match ends with value
                        checkFunction = function(e) {
                            return (e.getAttribute(attrName).indexOf(attrValue) > -1);
                        };
                        break;
                    default:
                        // Just test for existence of attribute
                        checkFunction = function(e) {
                            return e.getAttribute(attrName);
                        };
                }
                currentContext = [];
                currentContextIndex = 0;
                for (j = 0; j < found.length; j++) {
                    if (checkFunction(found[j])) {
                        currentContext[currentContextIndex++] = found[j];
                    }
                }
                // alert('Attribute Selector: '+tagName+' '+attrName+' '+attrOperator+' '+attrValue);
                continue; // Skip to next token
            }
            // If we get here, token is JUST an element (not a class or ID selector)
            tagName = token;
            found = [];
            foundCount = 0;
            for (j = 0; j < currentContext.length; j++) {
                elements = currentContext[j].getElementsByTagName(tagName);
                for (k = 0; k < elements.length; k++) {
                    found[foundCount++] = elements[k];
                }
            }
            currentContext = found;
        }
        return currentContext;
    }

    return function(query) {
        if (_.isElement(query)) {
            return [query];
        } else if (_.isObject(query) && !_.isUndefined(query.length)) {
            return query;
        } else {
            return getElementsBySelector.call(this, query);
        }
    };
})();

_.info = {
    campaignParams: function() {
        var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
            kw = '',
            params = {};
        _.each(campaign_keywords, function(kwkey) {
            kw = _.getQueryParam(document$1.URL, kwkey);
            if (kw.length) {
                params[kwkey] = kw;
            }
        });

        return params;
    },

    searchEngine: function(referrer) {
        if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
            return 'google';
        } else if (referrer.search('https?://(.*)bing.com') === 0) {
            return 'bing';
        } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
            return 'yahoo';
        } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
            return 'duckduckgo';
        } else {
            return null;
        }
    },

    searchInfo: function(referrer) {
        var search = _.info.searchEngine(referrer),
            param = (search != 'yahoo') ? 'q' : 'p',
            ret = {};

        if (search !== null) {
            ret['$search_engine'] = search;

            var keyword = _.getQueryParam(referrer, param);
            if (keyword.length) {
                ret['mp_keyword'] = keyword;
            }
        }

        return ret;
    },

    /**
     * This function detects which browser is running this script.
     * The order of the checks are important since many user agents
     * include key words used in later checks.
     */
    browser: function(user_agent, vendor, opera) {
        vendor = vendor || ''; // vendor is undefined for at least IE9
        if (opera || _.includes(user_agent, ' OPR/')) {
            if (_.includes(user_agent, 'Mini')) {
                return 'Opera Mini';
            }
            return 'Opera';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry';
        } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
            return 'Internet Explorer Mobile';
        } else if (_.includes(user_agent, 'Edge')) {
            return 'Microsoft Edge';
        } else if (_.includes(user_agent, 'FBIOS')) {
            return 'Facebook Mobile';
        } else if (_.includes(user_agent, 'Chrome')) {
            return 'Chrome';
        } else if (_.includes(user_agent, 'CriOS')) {
            return 'Chrome iOS';
        } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
            return 'UC Browser';
        } else if (_.includes(user_agent, 'FxiOS')) {
            return 'Firefox iOS';
        } else if (_.includes(vendor, 'Apple')) {
            if (_.includes(user_agent, 'Mobile')) {
                return 'Mobile Safari';
            }
            return 'Safari';
        } else if (_.includes(user_agent, 'Android')) {
            return 'Android Mobile';
        } else if (_.includes(user_agent, 'Konqueror')) {
            return 'Konqueror';
        } else if (_.includes(user_agent, 'Firefox')) {
            return 'Firefox';
        } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
            return 'Internet Explorer';
        } else if (_.includes(user_agent, 'Gecko')) {
            return 'Mozilla';
        } else {
            return '';
        }
    },

    /**
     * This function detects which browser version is running this script,
     * parsing major and minor version (e.g., 42.1). User agent strings from:
     * http://www.useragentstring.com/pages/useragentstring.php
     */
    browserVersion: function(userAgent, vendor, opera) {
        var browser = _.info.browser(userAgent, vendor, opera);
        var versionRegexs = {
            'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
            'Microsoft Edge': /Edge\/(\d+(\.\d+)?)/,
            'Chrome': /Chrome\/(\d+(\.\d+)?)/,
            'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
            'UC Browser' : /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
            'Safari': /Version\/(\d+(\.\d+)?)/,
            'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
            'Opera': /(Opera|OPR)\/(\d+(\.\d+)?)/,
            'Firefox': /Firefox\/(\d+(\.\d+)?)/,
            'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
            'Konqueror': /Konqueror:(\d+(\.\d+)?)/,
            'BlackBerry': /BlackBerry (\d+(\.\d+)?)/,
            'Android Mobile': /android\s(\d+(\.\d+)?)/,
            'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
            'Mozilla': /rv:(\d+(\.\d+)?)/
        };
        var regex = versionRegexs[browser];
        if (regex === undefined) {
            return null;
        }
        var matches = userAgent.match(regex);
        if (!matches) {
            return null;
        }
        return parseFloat(matches[matches.length - 2]);
    },

    os: function() {
        var a = userAgent;
        if (/Windows/i.test(a)) {
            if (/Phone/.test(a) || /WPDesktop/.test(a)) {
                return 'Windows Phone';
            }
            return 'Windows';
        } else if (/(iPhone|iPad|iPod)/.test(a)) {
            return 'iOS';
        } else if (/Android/.test(a)) {
            return 'Android';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
            return 'BlackBerry';
        } else if (/Mac/i.test(a)) {
            return 'Mac OS X';
        } else if (/Linux/.test(a)) {
            return 'Linux';
        } else {
            return '';
        }
    },

    device: function(user_agent) {
        if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
            return 'Windows Phone';
        } else if (/iPad/.test(user_agent)) {
            return 'iPad';
        } else if (/iPod/.test(user_agent)) {
            return 'iPod Touch';
        } else if (/iPhone/.test(user_agent)) {
            return 'iPhone';
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry';
        } else if (/Android/.test(user_agent)) {
            return 'Android';
        } else {
            return '';
        }
    },

    referringDomain: function(referrer) {
        var split = referrer.split('/');
        if (split.length >= 3) {
            return split[2];
        }
        return '';
    },

    properties: function() {
        return _.extend(_.strip_empty_properties({
            '$os': _.info.os(),
            '$browser': _.info.browser(userAgent, navigator$1.vendor, window.opera),
            '$referrer': document$1.referrer,
            '$referring_domain': _.info.referringDomain(document$1.referrer),
            '$device': _.info.device(userAgent)
        }), {
            '$current_url': window.location.href,
            '$browser_version': _.info.browserVersion(userAgent, navigator$1.vendor, window.opera),
            '$screen_height': screen.height,
            '$screen_width': screen.width,
            'mp_lib': 'web',
            '$lib_version': Config.LIB_VERSION
        });
    },

    people_properties: function() {
        return _.extend(_.strip_empty_properties({
            '$os': _.info.os(),
            '$browser': _.info.browser(userAgent, navigator$1.vendor, window.opera)
        }), {
            '$browser_version': _.info.browserVersion(userAgent, navigator$1.vendor, window.opera)
        });
    },

    pageviewInfo: function(page) {
        return _.strip_empty_properties({
            'mp_page': page,
            'mp_referrer': document$1.referrer,
            'mp_browser': _.info.browser(userAgent, navigator$1.vendor, window.opera),
            'mp_platform': _.info.os()
        });
    }
};

// EXPORTS (for closure compiler)
_['toArray']            = _.toArray;
_['isObject']           = _.isObject;
_['JSONEncode']         = _.JSONEncode;
_['JSONDecode']         = _.JSONDecode;
_['isBlockedUA']        = _.isBlockedUA;
_['isEmptyObject']      = _.isEmptyObject;
_['info']               = _.info;
_['info']['device']     = _.info.device;
_['info']['browser']    = _.info.browser;
_['info']['properties'] = _.info.properties;

// specifying these locally here since some websites override the global Node var
// ex: https://www.codingame.com/
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var autotrack = {
    _initializedTokens: [],

    _previousElementSibling: function(el) {
        if (el.previousElementSibling) {
            return el.previousElementSibling;
        } else {
            do {
                el = el.previousSibling;
            } while (el && el.nodeType !== ELEMENT_NODE);
            return el;
        }
    },

    _loadScript: function(scriptUrlToLoad, callback) {
        var scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = scriptUrlToLoad;
        scriptTag.onload = callback;

        var scripts = document.getElementsByTagName('script');
        if (scripts.length > 0) {
            scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
        } else {
            document.body.appendChild(scriptTag);
        }
    },

    _getClassName: function(elem) {
        switch(typeof elem.className) {
            case 'string':
                return elem.className;
            case 'object': // handle cases where className might be SVGAnimatedString or some other type
                return elem.className.baseVal || elem.getAttribute('class') || '';
            default: // future proof
                return '';
        }
    },

    _getPropertiesFromElement: function(elem) {
        var props = {
            'classes': this._getClassName(elem).split(' '),
            'tag_name': elem.tagName.toLowerCase()
        };

        if (_.includes(['input', 'select', 'textarea'], elem.tagName.toLowerCase())) {
            var formFieldValue = this._getFormFieldValue(elem);
            if (this._includeProperty(elem, formFieldValue)) {
                props['value'] = formFieldValue;
            }
        }

        _.each(elem.attributes, function(attr) {
            props['attr__' + attr.name] = attr.value;
        });

        var nthChild = 1;
        var nthOfType = 1;
        var currentElem = elem;
        while (currentElem = this._previousElementSibling(currentElem)) { // eslint-disable-line no-cond-assign
            nthChild++;
            if (currentElem.tagName === elem.tagName) {
                nthOfType++;
            }
        }
        props['nth_child'] = nthChild;
        props['nth_of_type'] = nthOfType;

        return props;
    },

    /*
     * Due to potential reference discrepancies (such as the webcomponents.js polyfill)
     * We want to match tagNames instead of specific reference because something like element === document.body
     * won't always work because element might not be a native element.
     */
    _isTag: function(el, tag) {
        return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase();
    },

    _shouldTrackDomEvent: function(element, event) {
        if (!element || this._isTag(element, 'html') || element.nodeType !== ELEMENT_NODE) {
            return false;
        }
        var tag = element.tagName.toLowerCase();
        switch (tag) {
            case 'html':
                return false;
            case 'form':
                return event.type === 'submit';
            case 'input':
                if (['button', 'submit'].indexOf(element.getAttribute('type')) === -1) {
                    return event.type === 'change';
                } else {
                    return event.type === 'click';
                }
            case 'select':
            case 'textarea':
                return event.type === 'change';
            default:
                return event.type === 'click';
        }
    },

    _getDefaultProperties: function(eventType) {
        return {
            '$event_type': eventType,
            '$ce_version': 1,
            '$host': window.location.host,
            '$pathname': window.location.pathname
        };
    },

    _getInputValue: function(input) {
        var value = null;
        var type = input.type.toLowerCase();
        switch(type) {
            case 'checkbox':
                if (input.checked) {
                    value = [input.value];
                }
                break;
            case 'radio':
                if (input.checked) {
                    value = input.value;
                }
                break;
            default:
                value = input.value;
                break;
        }
        return value;
    },

    _getSelectValue: function(select) {
        var value;
        if (select.multiple) {
            var values = [];
            _.each(select.querySelectorAll('[selected]'), function(option) {
                values.push(option.value);
            });
            value = values;
        } else {
            value = select.value;
        }
        return value;
    },

    _includeProperty: function(input, value) {
        for (var curEl = input; curEl.parentNode && !this._isTag(curEl, 'body'); curEl = curEl.parentNode) {
            var classes = this._getClassName(curEl).split(' ');
            if (_.includes(classes, 'mp-sensitive') || _.includes(classes, 'mp-no-track')) {
                return false;
            }
        }

        if (_.includes(this._getClassName(input).split(' '), 'mp-include')) {
            return true;
        }

        if (value === null) {
            return false;
        }

        // don't include hidden or password fields
        var type = input.type || '';
        switch(type.toLowerCase()) {
            case 'hidden':
                return false;
            case 'password':
                return false;
        }

        // filter out data from fields that look like sensitive fields
        var name = input.name || input.id || '';
        var sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;
        if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
            return false;
        }

        if (typeof value === 'string') {
            // check to see if input value looks like a credit card number
            // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html
            var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
            if (ccRegex.test((value || '').replace(/[\- ]/g, ''))) {
                return false;
            }

            // check to see if input value looks like a social security number
            var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/;
            if (ssnRegex.test(value)) {
                return false;
            }
        }

        return true;
    },

    _getFormFieldValue: function(field) {
        var val;
        switch(field.tagName.toLowerCase()) {
            case 'input':
                val = this._getInputValue(field);
                break;
            case 'select':
                val = this._getSelectValue(field);
                break;
            default:
                val = field.value || field.textContent;
                break;
        }
        return this._includeProperty(field, val) ? val : null;
    },

    _getFormFieldProperties: function(form) {
        var formFieldProps = {};
        _.each(form.elements, function(field) {
            var name = field.getAttribute('name') || field.getAttribute('id');
            if (name !== null) {
                name = '$form_field__' + name;
                var val = this._getFormFieldValue(field);
                if (this._includeProperty(field, val)) {
                    var prevFieldVal = formFieldProps[name];
                    if (prevFieldVal !== undefined) { // combine values for inputs of same name
                        formFieldProps[name] = [].concat(prevFieldVal, val);
                    } else {
                        formFieldProps[name] = val;
                    }
                }
            }
        }, this);
        return formFieldProps;
    },

    _extractCustomPropertyValue: function(customProperty) {
        var propValues = [];
        _.each(document.querySelectorAll(customProperty['css_selector']), function(matchedElem) {
            if (['input', 'select'].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
                propValues.push(matchedElem['value']);
            } else if (matchedElem['textContent']) {
                propValues.push(matchedElem['textContent']);
            }
        });
        return propValues.join(', ');
    },

    _getCustomProperties: function(targetElementList) {
        var props = {};
        _.each(this._customProperties, function(customProperty) {
            _.each(customProperty['event_selectors'], function(eventSelector) {
                var eventElements = document.querySelectorAll(eventSelector);
                _.each(eventElements, function(eventElement) {
                    if (_.includes(targetElementList, eventElement)) {
                        props[customProperty['name']] = this._extractCustomPropertyValue(customProperty);
                    }
                }, this);
            }, this);
        }, this);
        return props;
    },

    _getEventTarget: function(e) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
        if (typeof e.target === 'undefined') {
            return e.srcElement;
        } else {
            return e.target;
        }
    },

    _trackEvent: function(e, instance) {
        /*** Don't mess with this code without running IE8 tests on it ***/
        var target = this._getEventTarget(e);
        if (target.nodeType === TEXT_NODE) { // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
            target = target.parentNode;
        }

        if (this._shouldTrackDomEvent(target, e)) {
            var targetElementList = [target];
            var curEl = target;
            while (curEl.parentNode && !this._isTag(curEl, 'body')) {
                targetElementList.push(curEl.parentNode);
                curEl = curEl.parentNode;
            }

            var elementsJson = [];
            var href, elementText, form, explicitNoTrack = false;
            _.each(targetElementList, function(el, idx) {
                // if the element or a parent element is an anchor tag
                // include the href as a property
                if (el.tagName.toLowerCase() === 'a') {
                    href = el.getAttribute('href');
                } else if (el.tagName.toLowerCase() === 'form') {
                    form = el;
                }
                // crawl up to max of 5 nodes to populate text content
                if (!elementText && idx < 5 && el.textContent) {
                    var textContent = _.trim(el.textContent);
                    if (textContent) {
                        elementText = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
                    }
                }

                // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
                var classes = this._getClassName(el).split(' ');
                if (_.includes(classes, 'mp-no-track')) {
                    explicitNoTrack = true;
                }

                elementsJson.push(this._getPropertiesFromElement(el));
            }, this);

            if (explicitNoTrack) {
                return false;
            }

            var props = _.extend(
                this._getDefaultProperties(e.type),
                {
                    '$elements':  elementsJson,
                    '$el_attr__href': href,
                    '$el_text': elementText
                },
                this._getCustomProperties(targetElementList)
            );

            if (form && (e.type === 'submit' || e.type === 'click')) {
                _.extend(props, this._getFormFieldProperties(form));
            }
            instance.track('$web_event', props);
            return true;
        }
    },

    // only reason is to stub for unit tests
    // since you can't override window.location props
    _navigate: function(href) {
        window.location.href = href;
    },

    _addDomEventHandlers: function(instance) {
        var handler = _.bind(function(e) {
            e = e || window.event;
            this._trackEvent(e, instance);
        }, this);
        _.register_event(document, 'submit', handler, false, true);
        _.register_event(document, 'change', handler, false, true);
        _.register_event(document, 'click', handler, false, true);
    },

    _customProperties: {},
    init: function(instance) {
        if (!(document && document.body)) {
            console.log('document not ready yet, trying again in 500 milliseconds...');
            var that = this;
            setTimeout(function() { that.init(instance); }, 500);
            return;
        }

        var token = instance.get_config('token');
        if (this._initializedTokens.indexOf(token) > -1) {
            console.log('autotrack already initialized for token "' + token + '"');
            return;
        }
        this._initializedTokens.push(token);

        if (!this._maybeLoadEditor(instance)) { // don't autotrack actions when the editor is enabled
            var parseDecideResponse = _.bind(function(response) {
                if (response && response['config'] && response['config']['enable_collect_everything'] === true) {

                    if (response['custom_properties']) {
                        this._customProperties = response['custom_properties'];
                    }

                    instance.track('$web_event', _.extend({
                        '$title': document.title
                    }, this._getDefaultProperties('pageview')));

                    this._addDomEventHandlers(instance);

                } else {
                    instance['__autotrack_enabled'] = false;
                }
            }, this);

            instance._send_request(
                instance.get_config('api_host') + '/decide/', {
                    'verbose': true,
                    'version': '1',
                    'lib': 'web',
                    'token': token
                },
                instance._prepare_callback(parseDecideResponse)
            );
        }
    },

    _editorParamsFromHash: function(instance, hash) {
        var editorParams;
        try {
            var state = _.getHashParam(hash, 'state');
            state = JSON.parse(decodeURIComponent(state));
            var expiresInSeconds = _.getHashParam(hash, 'expires_in');
            editorParams = {
                'accessToken': _.getHashParam(hash, 'access_token'),
                'accessTokenExpiresAt': (new Date()).getTime() + (Number(expiresInSeconds) * 1000),
                'bookmarkletMode': !!state['bookmarkletMode'],
                'projectId': state['projectId'],
                'projectOwnerId': state['projectOwnerId'],
                'projectToken': state['token'],
                'readOnly': state['readOnly'],
                'userFlags': state['userFlags'],
                'userId': state['userId']
            };
            window.sessionStorage.setItem('editorParams', JSON.stringify(editorParams));

            if (state['desiredHash']) {
                window.location.hash = state['desiredHash'];
            } else if (window.history) {
                history.replaceState('', document.title, window.location.pathname + window.location.search); // completely remove hash
            } else {
                window.location.hash = ''; // clear hash (but leaves # unfortunately)
            }
        } catch (e) {
            console.error('Unable to parse data from hash', e);
        }
        return editorParams;
    },

    /**
     * To load the visual editor, we need an access token and other state. That state comes from one of three places:
     * 1. In the URL hash params if the customer is using an old snippet
     * 2. From session storage under the key `_mpcehash` if the snippet already parsed the hash
     * 3. From session storage under the key `editorParams` if the editor was initialized on a previous page
     */
    _maybeLoadEditor: function(instance) {
        try {
            var parseFromUrl = false;
            if (_.getHashParam(window.location.hash, 'state')) {
                var state = _.getHashParam(window.location.hash, 'state');
                state = JSON.parse(decodeURIComponent(state));
                parseFromUrl = state['action'] === 'mpeditor';
            }
            var parseFromStorage = !!window.sessionStorage.getItem('_mpcehash');
            var editorParams;

            if (parseFromUrl) { // happens if they are initializing the editor using an old snippet
                editorParams = this._editorParamsFromHash(instance, window.location.hash);
            } else if (parseFromStorage) { // happens if they are initialized the editor and using the new snippet
                editorParams = this._editorParamsFromHash(instance, window.sessionStorage.getItem('_mpcehash'));
                window.sessionStorage.removeItem('_mpcehash');
            } else { // get credentials from sessionStorage from a previous initialzation
                editorParams = JSON.parse(window.sessionStorage.getItem('editorParams') || '{}');
            }

            if (editorParams['projectToken'] && instance.get_config('token') === editorParams['projectToken']) {
                this._loadEditor(instance, editorParams);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },

    _loadEditor: function(instance, editorParams) {
        if (!window['_mpEditorLoaded']) { // only load the codeless event editor once, even if there are multiple instances of MixpanelLib
            window['_mpEditorLoaded'] = true;
            var editorUrl = instance.get_config('app_host')
              + '/js-bundle/reports/collect-everything/editor.js?_ts='
              + (new Date()).getTime();
            this._loadScript(editorUrl, function() {
                window['mp_load_editor'](editorParams);
            });
            return true;
        }
        return false;
    },

    // this is a mechanism to ramp up CE with no server-side interaction.
    // when CE is active, every page load results in a decide request. we
    // need to gently ramp this up so we don't overload decide. this decides
    // deterministically if CE is enabled for this project by modding the char
    // value of the project token.
    enabledForProject: function(token, numBuckets, numEnabledBuckets) {
        numBuckets = !_.isUndefined(numBuckets) ? numBuckets : 10;
        numEnabledBuckets = !_.isUndefined(numEnabledBuckets) ? numEnabledBuckets : 10;
        var charCodeSum = 0;
        for (var i = 0; i < token.length; i++) {
            charCodeSum += token.charCodeAt(i);
        }
        return (charCodeSum % numBuckets) < numEnabledBuckets;
    },

    isBrowserSupported: function() {
        return _.isFunction(document.querySelectorAll);
    }
};

_.bind_instance_methods(autotrack);
_.safewrap_instance_methods(autotrack);

/*
 * Mixpanel JS Library
 *
 * Copyright 2012, Mixpanel, Inc. All Rights Reserved
 * http://mixpanel.com/
 *
 * Includes portions of Underscore.js
 * http://documentcloud.github.com/underscore/
 * (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
 * Released under the MIT License.
 */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name mixpanel-2.8.min.js
// ==/ClosureCompiler==

/*
SIMPLE STYLE GUIDE:

this.x === public function
this._x === internal - only use within this file
this.__x === private - only use within the class

Globals should be all caps
*/

var init_type;       // MODULE or SNIPPET loader
var mixpanel_master; // main mixpanel instance / object
var INIT_MODULE  = 0;
var INIT_SNIPPET = 1;

/*
 * Constants
 */
/** @const */   var PRIMARY_INSTANCE_NAME     = 'mixpanel';
/** @const */   var SET_QUEUE_KEY             = '__mps';
/** @const */   var SET_ONCE_QUEUE_KEY        = '__mpso';
/** @const */   var ADD_QUEUE_KEY             = '__mpa';
/** @const */   var APPEND_QUEUE_KEY          = '__mpap';
/** @const */   var UNION_QUEUE_KEY           = '__mpu';
/** @const */   var SET_ACTION                = '$set';
/** @const */   var SET_ONCE_ACTION           = '$set_once';
/** @const */   var ADD_ACTION                = '$add';
/** @const */   var APPEND_ACTION             = '$append';
/** @const */   var UNION_ACTION              = '$union';
// This key is deprecated, but we want to check for it to see whether aliasing is allowed.
/** @const */   var PEOPLE_DISTINCT_ID_KEY    = '$people_distinct_id';
/** @const */   var ALIAS_ID_KEY              = '__alias';
/** @const */   var CAMPAIGN_IDS_KEY          = '__cmpns';
/** @const */   var EVENT_TIMERS_KEY          = '__timers';
/** @const */   var RESERVED_PROPERTIES       = [
    SET_QUEUE_KEY,
    SET_ONCE_QUEUE_KEY,
    ADD_QUEUE_KEY,
    APPEND_QUEUE_KEY,
    UNION_QUEUE_KEY,
    PEOPLE_DISTINCT_ID_KEY,
    ALIAS_ID_KEY,
    CAMPAIGN_IDS_KEY,
    EVENT_TIMERS_KEY
];

/*
 * Dynamic... constants? Is that an oxymoron?
 */
var HTTP_PROTOCOL = (('https:' === document.location.protocol) ? 'https://' : 'http://');

    // http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
    // https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#withCredentials
var USE_XHR = (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest());

    // IE<10 does not support cross-origin XHR's but script tags
    // with defer won't block window.onload; ENQUEUE_REQUESTS
    // should only be true for Opera<12
var ENQUEUE_REQUESTS = !USE_XHR && (userAgent.indexOf('MSIE') === -1) && (userAgent.indexOf('Mozilla') === -1);

/*
 * Module-level globals
 */
var DEFAULT_CONFIG = {
    'api_host':               HTTP_PROTOCOL + 'api.mixpanel.com',
    'app_host':               HTTP_PROTOCOL + 'mixpanel.com',
    'autotrack':              true,
    'cdn':                    HTTP_PROTOCOL + 'cdn.mxpnl.com',
    'cross_subdomain_cookie': true,
    'persistence':            'cookie',
    'persistence_name':       '',
    'cookie_name':            '',
    'loaded':                 function() {},
    'store_google':           true,
    'save_referrer':          true,
    'test':                   false,
    'verbose':                false,
    'img':                    false,
    'track_pageview':         true,
    'debug':                  false,
    'track_links_timeout':    300,
    'cookie_expiration':      365,
    'upgrade':                false,
    'disable_persistence':    false,
    'disable_cookie':         false,
    'secure_cookie':          false,
    'ip':                     true,
    'property_blacklist':     []
};

var DOM_LOADED = false;

/**
 * DomTracker Object
 * @constructor
 */
var DomTracker = function() {};

// interface
DomTracker.prototype.create_properties = function() {};
DomTracker.prototype.event_handler = function() {};
DomTracker.prototype.after_track_handler = function() {};

DomTracker.prototype.init = function(mixpanel_instance) {
    this.mp = mixpanel_instance;
    return this;
};

/**
 * @param {Object|string} query
 * @param {string} event_name
 * @param {Object=} properties
 * @param {function(...[*])=} user_callback
 */
DomTracker.prototype.track = function(query, event_name, properties, user_callback) {
    var that = this;
    var elements = _.dom_query(query);

    if (elements.length === 0) {
        console$1.error('The DOM query (' + query + ') returned 0 elements');
        return;
    }

    _.each(elements, function(element) {
        _.register_event(element, this.override_event, function(e) {
            var options = {};
            var props = that.create_properties(properties, this);
            var timeout = that.mp.get_config('track_links_timeout');

            that.event_handler(e, this, options);

            // in case the mixpanel servers don't get back to us in time
            window.setTimeout(that.track_callback(user_callback, props, options, true), timeout);

            // fire the tracking event
            that.mp.track(event_name, props, that.track_callback(user_callback, props, options));
        });
    }, this);

    return true;
};

/**
 * @param {function(...[*])} user_callback
 * @param {Object} props
 * @param {boolean=} timeout_occured
 */
DomTracker.prototype.track_callback = function(user_callback, props, options, timeout_occured) {
    timeout_occured = timeout_occured || false;
    var that = this;

    return function() {
        // options is referenced from both callbacks, so we can have
        // a 'lock' of sorts to ensure only one fires
        if (options.callback_fired) { return; }
        options.callback_fired = true;

        if (user_callback && user_callback(timeout_occured, props) === false) {
            // user can prevent the default functionality by
            // returning false from their callback
            return;
        }

        that.after_track_handler(props, options, timeout_occured);
    };
};

DomTracker.prototype.create_properties = function(properties, element) {
    var props;

    if (typeof(properties) === 'function') {
        props = properties(element);
    } else {
        props = _.extend({}, properties);
    }

    return props;
};

/**
 * LinkTracker Object
 * @constructor
 * @extends DomTracker
 */
var LinkTracker = function() {
    this.override_event = 'click';
};
_.inherit(LinkTracker, DomTracker);

LinkTracker.prototype.create_properties = function(properties, element) {
    var props = LinkTracker.superclass.create_properties.apply(this, arguments);

    if (element.href) { props['url'] = element.href; }

    return props;
};

LinkTracker.prototype.event_handler = function(evt, element, options) {
    options.new_tab = (
        evt.which === 2 ||
        evt.metaKey ||
        evt.ctrlKey ||
        element.target === '_blank'
    );
    options.href = element.href;

    if (!options.new_tab) {
        evt.preventDefault();
    }
};

LinkTracker.prototype.after_track_handler = function(props, options) {
    if (options.new_tab) { return; }

    setTimeout(function() {
        window.location = options.href;
    }, 0);
};

/**
 * FormTracker Object
 * @constructor
 * @extends DomTracker
 */
var FormTracker = function() {
    this.override_event = 'submit';
};
_.inherit(FormTracker, DomTracker);

FormTracker.prototype.event_handler = function(evt, element, options) {
    options.element = element;
    evt.preventDefault();
};

FormTracker.prototype.after_track_handler = function(props, options) {
    setTimeout(function() {
        options.element.submit();
    }, 0);
};

/**
 * Mixpanel Persistence Object
 * @constructor
 */
var MixpanelPersistence = function(config) {
    this['props'] = {};
    this.campaign_params_saved = false;

    if (config['persistence_name']) {
        this.name = 'mp_' + config['persistence_name'];
    } else {
        this.name = 'mp_' + config['token'] + '_mixpanel';
    }

    var storage_type = config['persistence'];
    if (storage_type !== 'cookie' && storage_type !== 'localStorage') {
        console$1.critical('Unknown persistence type ' + storage_type + '; falling back to cookie');
        storage_type = config['persistence'] = 'cookie';
    }

    var localStorage_supported = function() {
        var supported = true;
        try {
            var key = '__mplssupport__',
                val = 'xyz';
            _.localStorage.set(key, val);
            if (_.localStorage.get(key) !== val) {
                supported = false;
            }
            _.localStorage.remove(key);
        } catch (err) {
            supported = false;
        }
        if (!supported) {
            console$1.error('localStorage unsupported; falling back to cookie store');
        }
        return supported;
    };
    if (storage_type === 'localStorage' && localStorage_supported()) {
        this.storage = _.localStorage;
    } else {
        this.storage = _.cookie;
    }

    this.load();
    this.update_config(config);
    this.upgrade(config);
    this.save();
};

MixpanelPersistence.prototype.properties = function() {
    var p = {};
    // Filter out reserved properties
    _.each(this['props'], function(v, k) {
        if (!_.include(RESERVED_PROPERTIES, k)) {
            p[k] = v;
        }
    });
    return p;
};

MixpanelPersistence.prototype.load = function() {
    if (this.disabled) { return; }

    var entry = this.storage.parse(this.name);

    if (entry) {
        this['props'] = _.extend({}, entry);
    }
};

MixpanelPersistence.prototype.upgrade = function(config) {
    var upgrade_from_old_lib = config['upgrade'],
        old_cookie_name,
        old_cookie;

    if (upgrade_from_old_lib) {
        old_cookie_name = 'mp_super_properties';
        // Case where they had a custom cookie name before.
        if (typeof(upgrade_from_old_lib) === 'string') {
            old_cookie_name = upgrade_from_old_lib;
        }

        old_cookie = this.storage.parse(old_cookie_name);

        // remove the cookie
        this.storage.remove(old_cookie_name);
        this.storage.remove(old_cookie_name, true);

        if (old_cookie) {
            this['props'] = _.extend(
                this['props'],
                old_cookie['all'],
                old_cookie['events']
            );
        }
    }

    if (!config['cookie_name'] && config['name'] !== 'mixpanel') {
        // special case to handle people with cookies of the form
        // mp_TOKEN_INSTANCENAME from the first release of this library
        old_cookie_name = 'mp_' + config['token'] + '_' + config['name'];
        old_cookie = this.storage.parse(old_cookie_name);

        if (old_cookie) {
            this.storage.remove(old_cookie_name);
            this.storage.remove(old_cookie_name, true);

            // Save the prop values that were in the cookie from before -
            // this should only happen once as we delete the old one.
            this.register_once(old_cookie);
        }
    }

    if (this.storage === _.localStorage) {
        old_cookie = _.cookie.parse(this.name);

        _.cookie.remove(this.name);
        _.cookie.remove(this.name, true);

        if (old_cookie) {
            this.register_once(old_cookie);
        }
    }
};

MixpanelPersistence.prototype.save = function() {
    if (this.disabled) { return; }
    this._expire_notification_campaigns();
    this.storage.set(
        this.name,
        _.JSONEncode(this['props']),
        this.expire_days,
        this.cross_subdomain,
        this.secure
    );
};

MixpanelPersistence.prototype.remove = function() {
    // remove both domain and subdomain cookies
    this.storage.remove(this.name, false);
    this.storage.remove(this.name, true);
};

// removes the storage entry and deletes all loaded data
// forced name for tests
MixpanelPersistence.prototype.clear = function() {
    this.remove();
    this['props'] = {};
};

/**
 * @param {Object} props
 * @param {*=} default_value
 * @param {number=} days
 */
MixpanelPersistence.prototype.register_once = function(props, default_value, days) {
    if (_.isObject(props)) {
        if (typeof(default_value) === 'undefined') { default_value = 'None'; }
        this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

        _.each(props, function(val, prop) {
            if (!this['props'][prop] || this['props'][prop] === default_value) {
                this['props'][prop] = val;
            }
        }, this);

        this.save();

        return true;
    }
    return false;
};

/**
 * @param {Object} props
 * @param {number=} days
 */
MixpanelPersistence.prototype.register = function(props, days) {
    if (_.isObject(props)) {
        this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

        _.extend(this['props'], props);

        this.save();

        return true;
    }
    return false;
};

MixpanelPersistence.prototype.unregister = function(prop) {
    if (prop in this['props']) {
        delete this['props'][prop];
        this.save();
    }
};

MixpanelPersistence.prototype._expire_notification_campaigns = _.safewrap(function() {
    var campaigns_shown = this['props'][CAMPAIGN_IDS_KEY],
        EXPIRY_TIME = Config.DEBUG ? 60 * 1000 : 60 * 60 * 1000; // 1 minute (Config.DEBUG) / 1 hour (PDXN)
    if (!campaigns_shown) {
        return;
    }
    for (var campaign_id in campaigns_shown) {
        if (1 * new Date() - campaigns_shown[campaign_id] > EXPIRY_TIME) {
            delete campaigns_shown[campaign_id];
        }
    }
    if (_.isEmptyObject(campaigns_shown)) {
        delete this['props'][CAMPAIGN_IDS_KEY];
    }
});

MixpanelPersistence.prototype.update_campaign_params = function() {
    if (!this.campaign_params_saved) {
        this.register_once(_.info.campaignParams());
        this.campaign_params_saved = true;
    }
};

MixpanelPersistence.prototype.update_search_keyword = function(referrer) {
    this.register(_.info.searchInfo(referrer));
};

// EXPORTED METHOD, we test this directly.
MixpanelPersistence.prototype.update_referrer_info = function(referrer) {
    // If referrer doesn't exist, we want to note the fact that it was type-in traffic.
    this.register_once({
        '$initial_referrer': referrer || '$direct',
        '$initial_referring_domain': _.info.referringDomain(referrer) || '$direct'
    }, '');
};

MixpanelPersistence.prototype.get_referrer_info = function() {
    return _.strip_empty_properties({
        '$initial_referrer': this['props']['$initial_referrer'],
        '$initial_referring_domain': this['props']['$initial_referring_domain']
    });
};

// safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object
MixpanelPersistence.prototype.safe_merge = function(props) {
    _.each(this['props'], function(val, prop) {
        if (!(prop in props)) {
            props[prop] = val;
        }
    });

    return props;
};

MixpanelPersistence.prototype.update_config = function(config) {
    this.default_expiry = this.expire_days = config['cookie_expiration'];
    this.set_disabled(config['disable_persistence']);
    this.set_cross_subdomain(config['cross_subdomain_cookie']);
    this.set_secure(config['secure_cookie']);
};

MixpanelPersistence.prototype.set_disabled = function(disabled) {
    this.disabled = disabled;
    if (this.disabled) {
        this.remove();
    }
};

MixpanelPersistence.prototype.set_cross_subdomain = function(cross_subdomain) {
    if (cross_subdomain !== this.cross_subdomain) {
        this.cross_subdomain = cross_subdomain;
        this.remove();
        this.save();
    }
};

MixpanelPersistence.prototype.get_cross_subdomain = function() {
    return this.cross_subdomain;
};

MixpanelPersistence.prototype.set_secure = function(secure) {
    if (secure !== this.secure) {
        this.secure = secure ? true : false;
        this.remove();
        this.save();
    }
};

MixpanelPersistence.prototype._add_to_people_queue = function(queue, data) {
    var q_key = this._get_queue_key(queue),
        q_data = data[queue],
        set_q = this._get_or_create_queue(SET_ACTION),
        set_once_q = this._get_or_create_queue(SET_ONCE_ACTION),
        add_q = this._get_or_create_queue(ADD_ACTION),
        union_q = this._get_or_create_queue(UNION_ACTION),
        append_q = this._get_or_create_queue(APPEND_ACTION, []);

    if (q_key === SET_QUEUE_KEY) {
        // Update the set queue - we can override any existing values
        _.extend(set_q, q_data);
        // if there was a pending increment, override it
        // with the set.
        this._pop_from_people_queue(ADD_ACTION, q_data);
        // if there was a pending union, override it
        // with the set.
        this._pop_from_people_queue(UNION_ACTION, q_data);
    } else if (q_key === SET_ONCE_QUEUE_KEY) {
        // only queue the data if there is not already a set_once call for it.
        _.each(q_data, function(v, k) {
            if (!(k in set_once_q)) {
                set_once_q[k] = v;
            }
        });
    } else if (q_key === ADD_QUEUE_KEY) {
        _.each(q_data, function(v, k) {
            // If it exists in the set queue, increment
            // the value
            if (k in set_q) {
                set_q[k] += v;
            } else {
                // If it doesn't exist, update the add
                // queue
                if (!(k in add_q)) {
                    add_q[k] = 0;
                }
                add_q[k] += v;
            }
        }, this);
    } else if (q_key === UNION_QUEUE_KEY) {
        _.each(q_data, function(v, k) {
            if (_.isArray(v)) {
                if (!(k in union_q)) {
                    union_q[k] = [];
                }
                // We may send duplicates, the server will dedup them.
                union_q[k] = union_q[k].concat(v);
            }
        });
    } else if (q_key === APPEND_QUEUE_KEY) {
        append_q.push(q_data);
    }

    console$1.log('MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):');
    console$1.log(data);

    this.save();
};

MixpanelPersistence.prototype._pop_from_people_queue = function(queue, data) {
    var q = this._get_queue(queue);
    if (!_.isUndefined(q)) {
        _.each(data, function(v, k) {
            delete q[k];
        }, this);

        this.save();
    }
};

MixpanelPersistence.prototype._get_queue_key = function(queue) {
    if (queue === SET_ACTION) {
        return SET_QUEUE_KEY;
    } else if (queue === SET_ONCE_ACTION) {
        return SET_ONCE_QUEUE_KEY;
    } else if (queue === ADD_ACTION) {
        return ADD_QUEUE_KEY;
    } else if (queue === APPEND_ACTION) {
        return APPEND_QUEUE_KEY;
    } else if (queue === UNION_ACTION) {
        return UNION_QUEUE_KEY;
    } else {
        console$1.error('Invalid queue:', queue);
    }
};

MixpanelPersistence.prototype._get_queue = function(queue) {
    return this['props'][this._get_queue_key(queue)];
};
MixpanelPersistence.prototype._get_or_create_queue = function(queue, default_val) {
    var key = this._get_queue_key(queue);
    default_val = _.isUndefined(default_val) ? {} : default_val;

    return this['props'][key] || (this['props'][key] = default_val);
};

MixpanelPersistence.prototype.set_event_timer = function(event_name, timestamp) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {};
    timers[event_name] = timestamp;
    this['props'][EVENT_TIMERS_KEY] = timers;
    this.save();
};

MixpanelPersistence.prototype.remove_event_timer = function(event_name) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {};
    var timestamp = timers[event_name];
    if (!_.isUndefined(timestamp)) {
        delete this['props'][EVENT_TIMERS_KEY][event_name];
        this.save();
    }
    return timestamp;
};

/**
 * Mixpanel Library Object
 * @constructor
 */
var MixpanelLib = function() {};

/**
 * Mixpanel People Object
 * @constructor
 */
var MixpanelPeople = function() {};

var MPNotif;

/**
 * create_mplib(token:string, config:object, name:string)
 *
 * This function is used by the init method of MixpanelLib objects
 * as well as the main initializer at the end of the JSLib (that
 * initializes document.mixpanel as well as any additional instances
 * declared before this file has loaded).
 */
var create_mplib = function(token, config, name) {
    var instance,
        target = (name === PRIMARY_INSTANCE_NAME) ? mixpanel_master : mixpanel_master[name];

    if (target && init_type === INIT_MODULE) {
        instance = target;
    } else {
        if (target && !_.isArray(target)) {
            console$1.error('You have already initialized ' + name);
            return;
        }
        instance = new MixpanelLib();
    }

    instance._init(token, config, name);

    instance['people'] = new MixpanelPeople();
    instance['people']._init(instance);

    // if any instance on the page has debug = true, we set the
    // global debug to be true
    Config.DEBUG = Config.DEBUG || instance.get_config('debug');

    instance['__autotrack_enabled'] = instance.get_config('autotrack');
    if (instance.get_config('autotrack')) {
        var num_buckets = 100;
        var num_enabled_buckets = 100;
        if (!autotrack.enabledForProject(instance.get_config('token'), num_buckets, num_enabled_buckets)) {
            instance['__autotrack_enabled'] = false;
            console$1.log('Not in active bucket: disabling Automatic Event Collection.');
        } else if (!autotrack.isBrowserSupported()) {
            instance['__autotrack_enabled'] = false;
            console$1.log('Disabling Automatic Event Collection because this browser is not supported');
        } else {
            autotrack.init(instance);
        }

        try {
            add_dom_event_counting_handlers(instance);
        } catch (e) {
            console$1.error(e);
        }
    }

    // if target is not defined, we called init after the lib already
    // loaded, so there won't be an array of things to execute
    if (!_.isUndefined(target) && _.isArray(target)) {
        // Crunch through the people queue first - we queue this data up &
        // flush on identify, so it's better to do all these operations first
        instance._execute_array.call(instance['people'], target['people']);
        instance._execute_array(target);
    }

    return instance;
};

// Initialization methods

/**
 * This function initializes a new instance of the Mixpanel tracking object.
 * All new instances are added to the main mixpanel object as sub properties (such as
 * mixpanel.library_name) and also returned by this function. To define a
 * second instance on the page, you would call:
 *
 *     mixpanel.init('new token', { your: 'config' }, 'library_name');
 *
 * and use it like so:
 *
 *     mixpanel.library_name.track(...);
 *
 * @param {String} token   Your Mixpanel API token
 * @param {Object} [config]  A dictionary of config options to override
 * @param {String} [name]    The name for the new mixpanel instance that you want created
 */
MixpanelLib.prototype.init = function (token, config, name) {
    if (_.isUndefined(name)) {
        console$1.error('You must name your new library: init(token, config, name)');
        return;
    }
    if (name === PRIMARY_INSTANCE_NAME) {
        console$1.error('You must initialize the main mixpanel object right after you include the Mixpanel js snippet');
        return;
    }

    var instance = create_mplib(token, config, name);
    mixpanel_master[name] = instance;
    instance._loaded();

    return instance;
};

// mixpanel._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the mixpanel
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//
MixpanelLib.prototype._init = function(token, config, name) {
    this['__loaded'] = true;
    this['config'] = {};

    this.set_config(_.extend({}, DEFAULT_CONFIG, config, {
        'name': name,
        'token': token,
        'callback_fn': ((name === PRIMARY_INSTANCE_NAME) ? name : PRIMARY_INSTANCE_NAME + '.' + name) + '._jsc'
    }));

    this['_jsc'] = function() {};

    this.__dom_loaded_queue = [];
    this.__request_queue = [];
    this.__disabled_events = [];
    this._flags = {
        'disable_all_events': false,
        'identify_called': false
    };

    this['persistence'] = this['cookie'] = new MixpanelPersistence(this['config']);
    this.register_once({'distinct_id': _.UUID()}, '');
};

// Private methods

MixpanelLib.prototype._loaded = function() {
    this.get_config('loaded')(this);

    // this happens after so a user can call identify/name_tag in
    // the loaded callback
    if (this.get_config('track_pageview')) {
        this.track_pageview();
    }
};

MixpanelLib.prototype._dom_loaded = function() {
    _.each(this.__dom_loaded_queue, function(item) {
        this._track_dom.apply(this, item);
    }, this);
    _.each(this.__request_queue, function(item) {
        this._send_request.apply(this, item);
    }, this);
    delete this.__dom_loaded_queue;
    delete this.__request_queue;
};

MixpanelLib.prototype._track_dom = function(DomClass, args) {
    if (this.get_config('img')) {
        console$1.error('You can\'t use DOM tracking functions with img = true.');
        return false;
    }

    if (!DOM_LOADED) {
        this.__dom_loaded_queue.push([DomClass, args]);
        return false;
    }

    var dt = new DomClass().init(this);
    return dt.track.apply(dt, args);
};

/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */
MixpanelLib.prototype._prepare_callback = function(callback, data) {
    if (_.isUndefined(callback)) {
        return null;
    }

    if (USE_XHR) {
        var callback_function = function(response) {
            callback(response, data);
        };
        return callback_function;
    } else {
        // if the user gives us a callback, we store as a random
        // property on this instances jsc function and update our
        // callback string to reflect that.
        var jsc = this['_jsc'];
        var randomized_cb = '' + Math.floor(Math.random() * 100000000);
        var callback_string = this.get_config('callback_fn') + '[' + randomized_cb + ']';
        jsc[randomized_cb] = function(response) {
            delete jsc[randomized_cb];
            callback(response, data);
        };
        return callback_string;
    }
};

MixpanelLib.prototype._send_request = function(url, data, callback) {
    if (ENQUEUE_REQUESTS) {
        this.__request_queue.push(arguments);
        return;
    }

    // needed to correctly format responses
    var verbose_mode = this.get_config('verbose');
    if (data['verbose']) { verbose_mode = true; }

    if (this.get_config('test')) { data['test'] = 1; }
    if (verbose_mode) { data['verbose'] = 1; }
    if (this.get_config('img')) { data['img'] = 1; }
    if (!USE_XHR) {
        if (callback) {
            data['callback'] = callback;
        } else if (verbose_mode || this.get_config('test')) {
            // Verbose output (from verbose mode, or an error in test mode) is a json blob,
            // which by itself is not valid javascript. Without a callback, this verbose output will
            // cause an error when returned via jsonp, so we force a no-op callback param.
            // See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
            data['callback'] = '(function(){})';
        }
    }

    data['ip'] = this.get_config('ip')?1:0;
    data['_'] = new Date().getTime().toString();
    url += '?' + _.HTTPBuildQuery(data);

    if ('img' in data) {
        var img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
    } else if (USE_XHR) {
        try {
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            // send the mp_optout cookie
            // withCredentials cannot be modified until after calling .open on Android and Mobile Safari
            req.withCredentials = true;
            req.onreadystatechange = function () {
                if (req.readyState === 4) { // XMLHttpRequest.DONE == 4, except in safari 4
                    if (req.status === 200) {
                        if (callback) {
                            if (verbose_mode) {
                                callback(_.JSONDecode(req.responseText));
                            } else {
                                callback(Number(req.responseText));
                            }
                        }
                    } else {
                        var error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText;
                        console$1.error(error);
                        if (callback) {
                            if (verbose_mode) {
                                callback({status: 0, error: error});
                            } else {
                                callback(0);
                            }
                        }
                    }
                }
            };
            req.send(null);
        } catch (e) {
            console$1.error(e);
        }
    } else {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = url;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    }
};

/**
 * _execute_array() deals with processing any mixpanel function
 * calls that were called before the Mixpanel library were loaded
 * (and are thus stored in an array so they can be called later)
 *
 * Note: we fire off all the mixpanel function calls && user defined
 * functions BEFORE we fire off mixpanel tracking calls. This is so
 * identify/register/set_config calls can properly modify early
 * tracking calls.
 *
 * @param {Array} array
 */
MixpanelLib.prototype._execute_array = function(array) {
    var fn_name, alias_calls = [], other_calls = [], tracking_calls = [];
    _.each(array, function(item) {
        if (item) {
            fn_name = item[0];
            if (typeof(item) === 'function') {
                item.call(this);
            } else if (_.isArray(item) && fn_name === 'alias') {
                alias_calls.push(item);
            } else if (_.isArray(item) && fn_name.indexOf('track') !== -1 && typeof(this[fn_name]) === 'function') {
                tracking_calls.push(item);
            } else {
                other_calls.push(item);
            }
        }
    }, this);

    var execute = function(calls, context) {
        _.each(calls, function(item) {
            this[item[0]].apply(this, item.slice(1));
        }, context);
    };

    execute(alias_calls, this);
    execute(other_calls, this);
    execute(tracking_calls, this);
};

/**
 * push() keeps the standard async-array-push
 * behavior around after the lib is loaded.
 * This is only useful for external integrations that
 * do not wish to rely on our convenience methods
 * (created in the snippet).
 *
 * ### Usage:
 *     mixpanel.push(['register', { a: 'b' }]);
 *
 * @param {Array} item A [function_name, args...] array to be executed
 */
MixpanelLib.prototype.push = function(item) {
    this._execute_array([item]);
};

/**
 * Disable events on the Mixpanel object. If passed no arguments,
 * this function disables tracking of any event. If passed an
 * array of event names, those events will be disabled, but other
 * events will continue to be tracked.
 *
 * Note: this function does not stop other mixpanel functions from
 * firing, such as register() or people.set().
 *
 * @param {Array} [events] An array of event names to disable
 */
MixpanelLib.prototype.disable = function(events) {
    if (typeof(events) === 'undefined') {
        this._flags.disable_all_events = true;
    } else {
        this.__disabled_events = this.__disabled_events.concat(events);
    }
};

/**
 * Track an event. This is the most important and
 * frequently used Mixpanel function.
 *
 * ### Usage:
 *
 *     // track an event named 'Registered'
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * To track link clicks or form submissions, see track_links() or track_forms().
 *
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Function} [callback] If provided, the callback function will be called after tracking the event.
 */
MixpanelLib.prototype.track = function(event_name, properties, callback) {
    if (typeof(callback) !== 'function') {
        callback = function() {};
    }

    if (_.isUndefined(event_name)) {
        console$1.error('No event name provided to mixpanel.track');
        return;
    }

    if (this._event_is_disabled(event_name)) {
        callback(0);
        return;
    }

    // set defaults
    properties = properties || {};
    properties['token'] = this.get_config('token');

    // set $duration if time_event was previously called for this event
    var start_timestamp = this['persistence'].remove_event_timer(event_name);
    if (!_.isUndefined(start_timestamp)) {
        var duration_in_ms = new Date().getTime() - start_timestamp;
        properties['$duration'] = parseFloat((duration_in_ms / 1000).toFixed(3));
    }

    // update persistence
    this['persistence'].update_search_keyword(document.referrer);

    if (this.get_config('store_google')) { this['persistence'].update_campaign_params(); }
    if (this.get_config('save_referrer')) { this['persistence'].update_referrer_info(document.referrer); }

    // note: extend writes to the first object, so lets make sure we
    // don't write to the persistence properties object and info
    // properties object by passing in a new object

    // update properties with pageview info and super-properties
    properties = _.extend(
        {},
        _.info.properties(),
        this['persistence'].properties(),
        properties
    );

    try {
        if (this.get_config('autotrack') && event_name !== 'mp_page_view' && event_name !== '$create_alias') {
            // The point of $__c is to count how many clicks occur per tracked event. Since we're
            // tracking an event in this function, we need to reset the $__c value.
            properties = _.extend({}, properties, this.mp_counts);
            this.mp_counts = {'$__c': 0};
            _.cookie.set('mp_' + this.get_config('name') + '__c', 0, 1, true);
        }
    } catch (e) {
        console$1.error(e);
    }

    var property_blacklist = this.get_config('property_blacklist');
    if (_.isArray(property_blacklist)) {
        _.each(property_blacklist, function(blacklisted_prop) {
            delete properties[blacklisted_prop];
        });
    } else {
        console$1.error('Invalid value for property_blacklist config: ' + property_blacklist);
    }

    var data = {
        'event': event_name,
        'properties': properties
    };

    var truncated_data = _.truncate(data, 255);
    var json_data      = _.JSONEncode(truncated_data);
    var encoded_data   = _.base64Encode(json_data);

    console$1.log('MIXPANEL REQUEST:');
    console$1.log(truncated_data);

    this._send_request(
        this.get_config('api_host') + '/track/',
        { 'data': encoded_data },
        this._prepare_callback(callback, truncated_data)
    );

    return truncated_data;
};

/**
 * Track a page view event, which is currently ignored by the server.
 * This function is called by default on page load unless the
 * track_pageview configuration variable is false.
 *
 * @param {String} [page] The url of the page to record. If you don't include this, it defaults to the current url.
 * @api private
 */
MixpanelLib.prototype.track_pageview = function(page) {
    if (_.isUndefined(page)) {
        page = document.location.href;
    }
    this.track('mp_page_view', _.info.pageviewInfo(page));
};

/**
 * Track clicks on a set of document elements. Selector must be a
 * valid query. Elements must exist on the page at the time track_links is called.
 *
 * ### Usage:
 *
 *     // track click for link id #nav
 *     mixpanel.track_links('#nav', 'Clicked Nav Link');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the Mixpanel
 * servers to respond. If they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] A properties object or function that returns a dictionary of properties when passed a DOMElement
 */
MixpanelLib.prototype.track_links = function() {
    return this._track_dom.call(this, LinkTracker, arguments);
};

/**
 * Track form submissions. Selector must be a valid query.
 *
 * ### Usage:
 *
 *     // track submission for form id 'register'
 *     mixpanel.track_forms('#register', 'Created Account');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the mixpanel
 * servers to respond, if they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] This can be a set of properties, or a function that returns a set of properties after being passed a DOMElement
 */
MixpanelLib.prototype.track_forms = function() {
    return this._track_dom.call(this, FormTracker, arguments);
};

/**
 * Time an event by including the time between this call and a
 * later 'track' call for the same event in the properties sent
 * with the event.
 *
 * ### Usage:
 *
 *     // time an event named 'Registered'
 *     mixpanel.time_event('Registered');
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * When called for a particular event name, the next track call for that event
 * name will include the elapsed time between the 'time_event' and 'track'
 * calls. This value is stored as seconds in the '$duration' property.
 *
 * @param {String} event_name The name of the event.
 */
MixpanelLib.prototype.time_event = function(event_name) {
    if (_.isUndefined(event_name)) {
        console$1.error('No event name provided to mixpanel.time_event');
        return;
    }

    if (this._event_is_disabled(event_name)) {
        return;
    }

    this['persistence'].set_event_timer(event_name,  new Date().getTime());
};

/**
 * Register a set of super properties, which are included with all
 * events. This will overwrite previous super property values.
 *
 * ### Usage:
 *
 *     // register 'Gender' as a super property
 *     mixpanel.register({'Gender': 'Female'});
 *
 *     // register several super properties when a user signs up
 *     mixpanel.register({
 *         'Email': 'jdoe@example.com',
 *         'Account Type': 'Free'
 *     });
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {Number} [days] How many days since the user's last visit to store the super properties
 */
MixpanelLib.prototype.register = function(props, days) {
    this['persistence'].register(props, days);
};

/**
 * Register a set of super properties only once. This will not
 * overwrite previous super property values, unlike register().
 *
 * ### Usage:
 *
 *     // register a super property for the first time only
 *     mixpanel.register_once({
 *         'First Login Date': new Date().toISOString()
 *     });
 *
 * ### Notes:
 *
 * If default_value is specified, current super properties
 * with that value will be overwritten.
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
 * @param {Number} [days] How many days since the users last visit to store the super properties
 */
MixpanelLib.prototype.register_once = function(props, default_value, days) {
    this['persistence'].register_once(props, default_value, days);
};

/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 */
MixpanelLib.prototype.unregister = function(property) {
    this['persistence'].unregister(property);
};

MixpanelLib.prototype._register_single = function(prop, value) {
    var props = {};
    props[prop] = value;
    this.register(props);
};

/**
 * Identify a user with a unique ID. All subsequent
 * actions caused by this user will be tied to this unique ID. This
 * property is used to track unique visitors. If the method is
 * never called, then unique visitors will be identified by a UUID
 * generated the first time they visit the site.
 *
 * ### Notes:
 *
 * You can call this function to overwrite a previously set
 * unique ID for the current user. Mixpanel cannot translate
 * between IDs at this time, so when you change a user's ID
 * they will appear to be a new user.
 *
 * identify() should not be called to link anonymous activity to
 * subsequent activity when a unique ID is first assigned.
 * Use alias() when a unique ID is first assigned (registration), and
 * use identify() to identify the user with that unique ID on an ongoing
 * basis (e.g., each time a user logs in after registering).
 * Do not call identify() at the same time as alias().
 *
 * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
 */
MixpanelLib.prototype.identify = function(unique_id, _set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
    // Optional Parameters
    //  _set_callback:function  A callback to be run if and when the People set queue is flushed
    //  _add_callback:function  A callback to be run if and when the People add queue is flushed
    //  _append_callback:function  A callback to be run if and when the People append queue is flushed
    //  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
    //  _union_callback:function  A callback to be run if and when the People union queue is flushed

    // identify only changes the distinct id if it doesn't match either the existing or the alias;
    // if it's new, blow away the alias as well.
    if (unique_id !== this.get_distinct_id() && unique_id !== this.get_property(ALIAS_ID_KEY)) {
        this.unregister(ALIAS_ID_KEY);
        this._register_single('distinct_id', unique_id);
    }
    this._check_and_handle_notifications(this.get_distinct_id());
    this._flags.identify_called = true;
    // Flush any queued up people requests
    this['people']._flush(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback);
};

/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */
MixpanelLib.prototype.reset = function() {
    this['persistence'].clear();
    this._flags.identify_called = false;
    this.register_once({'distinct_id': _.UUID()}, '');
};

/**
 * Returns the current distinct id of the user. This is either the id automatically
 * generated by the library or the id that has been passed by a call to identify().
 *
 * ### Notes:
 *
 * get_distinct_id() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // set distinct_id after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             distinct_id = mixpanel.get_distinct_id();
 *         }
 *     });
 */
MixpanelLib.prototype.get_distinct_id = function() {
    return this.get_property('distinct_id');
};

/**
 * Create an alias, which Mixpanel will use to link two distinct_ids going forward (not retroactively).
 * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
 * following is a valid scenario:
 *
 *     mixpanel.alias('new_id', 'existing_id');
 *     ...
 *     mixpanel.alias('newer_id', 'new_id');
 *
 * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
 *
 * ### Notes:
 *
 * The best practice is to call alias() when a unique ID is first created for a user
 * (e.g., when a user first registers for an account and provides an email address).
 * alias() should never be called more than once for a given user, except to
 * chain a newer ID to a previously new ID, as described above.
 *
 * @param {String} alias A unique identifier that you want to use for this user in the future.
 * @param {String} [original] The current identifier being used for this user.
 */
MixpanelLib.prototype.alias = function(alias, original) {
    // If the $people_distinct_id key exists in persistence, there has been a previous
    // mixpanel.people.identify() call made for this user. It is VERY BAD to make an alias with
    // this ID, as it will duplicate users.
    if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
        console$1.critical('Attempting to create alias for existing People user - aborting.');
        return -2;
    }

    var _this = this;
    if (_.isUndefined(original)) {
        original = this.get_distinct_id();
    }
    if (alias !== original) {
        this._register_single(ALIAS_ID_KEY, alias);
        return this.track('$create_alias', { 'alias': alias, 'distinct_id': original }, function() {
            // Flush the people queue
            _this.identify(alias);
        });
    } else {
        console$1.error('alias matches current distinct_id - skipping api call.');
        this.identify(alias);
        return -1;
    }
};

/**
 * Provide a string to recognize the user by. The string passed to
 * this method will appear in the Mixpanel Streams product rather
 * than an automatically generated name. Name tags do not have to
 * be unique.
 *
 * This value will only be included in Streams data.
 *
 * @param {String} name_tag A human readable name for the user
 * @api private
 */
MixpanelLib.prototype.name_tag = function(name_tag) {
    this._register_single('mp_name_tag', name_tag);
};

/**
 * Update the configuration of a mixpanel library instance.
 *
 * The default config is:
 *
 *     {
 *       // super properties cookie expiration (in days)
 *       cookie_expiration:          365
 *
 *       // super properties span subdomains
 *       cross_subdomain_cookie:     true
 *
 *       // if this is true, the mixpanel cookie or localStorage entry
 *       // will be deleted, and no user persistence will take place
 *       disable_persistence:        false
 *
 *       // type of persistent store for super properties (cookie/
 *       // localStorage) if set to 'localStorage', any existing
 *       // mixpanel cookie value with the same persistence_name
 *       // will be transferred to localStorage and deleted
 *       persistence:                'cookie'
 *
 *       // name for super properties persistent store
 *       persistence_name:           ''
 *
 *       // names of properties/superproperties which should never
 *       // be sent with track() calls
 *       property_blacklist:         []
 *
 *       // if this is true, mixpanel cookies will be marked as
 *       // secure, meaning they will only be transmitted over https
 *       secure_cookie:              false
 *
 *       // the amount of time track_links will
 *       // wait for Mixpanel's servers to respond
 *       track_links_timeout:        300
 *
 *       // should we track a page view on page load
 *       track_pageview:             true
 *
 *       // if you set upgrade to be true, the library will check for
 *       // a cookie from our old js library and import super
 *       // properties from it, then the old cookie is deleted
 *       // The upgrade config option only works in the initialization,
 *       // so make sure you set it when you create the library.
 *       upgrade:                    false
 *     }
 *
 *
 * @param {Object} config A dictionary of new configuration values to update
 */
MixpanelLib.prototype.set_config = function(config) {
    if (_.isObject(config)) {
        _.extend(this['config'], config);

        if (!this.get_config('persistence_name')) {
            this['config']['persistence_name'] = this['config']['cookie_name'];
        }
        if (!this.get_config('disable_persistence')) {
            this['config']['disable_persistence'] = this['config']['disable_cookie'];
        }

        if (this['persistence']) {
            this['persistence'].update_config(this['config']);
        }
        Config.DEBUG = Config.DEBUG || this.get_config('debug');
    }
};

/**
 * returns the current config object for the library.
 */
MixpanelLib.prototype.get_config = function(prop_name) {
    return this['config'][prop_name];
};

/**
 * Returns the value of the super property named property_name. If no such
 * property is set, get_property() will return the undefined value.
 *
 * ### Notes:
 *
 * get_property() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // grab value for 'user_id' after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             user_id = mixpanel.get_property('user_id');
 *         }
 *     });
 *
 * @param {String} property_name The name of the super property you want to retrieve
 */
MixpanelLib.prototype.get_property = function(property_name) {
    return this['persistence']['props'][property_name];
};

MixpanelLib.prototype.toString = function() {
    var name = this.get_config('name');
    if (name !== PRIMARY_INSTANCE_NAME) {
        name = PRIMARY_INSTANCE_NAME + '.' + name;
    }
    return name;
};

MixpanelLib.prototype._event_is_disabled = function(event_name) {
    return _.isBlockedUA(userAgent) ||
        this._flags.disable_all_events ||
        _.include(this.__disabled_events, event_name);
};

MixpanelLib.prototype._check_and_handle_notifications = function(distinct_id) {
    if (!distinct_id || this._flags.identify_called || this.get_config('disable_notifications')) {
        return;
    }

    console$1.log('MIXPANEL NOTIFICATION CHECK');

    var data = {
        'verbose':     true,
        'version':     '2',
        'lib':         'web',
        'token':       this.get_config('token'),
        'distinct_id': distinct_id
    };
    var self = this;
    this._send_request(
        this.get_config('api_host') + '/decide/',
        data,
        this._prepare_callback(function(r) {
            if (r['notifications'] && r['notifications'].length > 0) {
                self._show_notification.call(self, r['notifications'][0]);
            }
        })
    );
};

MixpanelLib.prototype._show_notification = function(notification_data) {
    var notification = new MPNotif(notification_data, this);
    notification.show();
};

MixpanelPeople.prototype._init = function(mixpanel_instance) {
    this._mixpanel = mixpanel_instance;
};

/*
 * Set properties on a user record.
 *
 * ### Usage:
 *
 *     mixpanel.people.set('gender', 'm');
 *
 *     // or set multiple properties at once
 *     mixpanel.people.set({
 *         'Company': 'Acme',
 *         'Plan': 'Premium',
 *         'Upgrade date': new Date()
 *     });
 *     // properties can be strings, integers, dates, or lists
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.set = function(prop, to, callback) {
    var data = {};
    var $set = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $set[k] = v;
            }
        }, this);
        callback = to;
    } else {
        $set[prop] = to;
    }

    // make sure that the referrer info has been updated and saved
    if (this._get_config('save_referrer')) {
        this._mixpanel['persistence'].update_referrer_info(document.referrer);
    }

    // update $set object with default people properties
    $set = _.extend(
        {},
        _.info.people_properties(),
        this._mixpanel['persistence'].get_referrer_info(),
        $set
    );

    data[SET_ACTION] = $set;

    return this._send_request(data, callback);
};

/*
 * Set properties on a user record, only if they do not yet exist.
 * This will not overwrite previous people property values, unlike
 * people.set().
 *
 * ### Usage:
 *
 *     mixpanel.people.set_once('First Login Date', new Date());
 *
 *     // or set multiple properties at once
 *     mixpanel.people.set_once({
 *         'First Login Date': new Date(),
 *         'Starting Plan': 'Premium'
 *     });
 *
 *     // properties can be strings, integers or dates
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.set_once = function(prop, to, callback) {
    var data = {};
    var $set_once = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $set_once[k] = v;
            }
        }, this);
        callback = to;
    } else {
        $set_once[prop] = to;
    }
    data[SET_ONCE_ACTION] = $set_once;
    return this._send_request(data, callback);
};

/*
 * Increment/decrement numeric people analytics properties.
 *
 * ### Usage:
 *
 *     mixpanel.people.increment('page_views', 1);
 *
 *     // or, for convenience, if you're just incrementing a counter by
 *     // 1, you can simply do
 *     mixpanel.people.increment('page_views');
 *
 *     // to decrement a counter, pass a negative number
 *     mixpanel.people.increment('credits_left', -1);
 *
 *     // like mixpanel.people.set(), you can increment multiple
 *     // properties at once:
 *     mixpanel.people.increment({
 *         counter1: 1,
 *         counter2: 6
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and numeric values.
 * @param {Number} [by] An amount to increment the given property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.increment = function(prop, by, callback) {
    var data = {};
    var $add = {};
    if (_.isObject(prop)) {
        _.each(prop, function(v, k) {
            if (!this._is_reserved_property(k)) {
                if (isNaN(parseFloat(v))) {
                    console$1.error('Invalid increment value passed to mixpanel.people.increment - must be a number');
                    return;
                } else {
                    $add[k] = v;
                }
            }
        }, this);
        callback = by;
    } else {
        // convenience: mixpanel.people.increment('property'); will
        // increment 'property' by 1
        if (_.isUndefined(by)) {
            by = 1;
        }
        $add[prop] = by;
    }
    data[ADD_ACTION] = $add;

    return this._send_request(data, callback);
};

/*
 * Append a value to a list-valued people analytics property.
 *
 * ### Usage:
 *
 *     // append a value to a list, creating it if needed
 *     mixpanel.people.append('pages_visited', 'homepage');
 *
 *     // like mixpanel.people.set(), you can append multiple
 *     // properties at once:
 *     mixpanel.people.append({
 *         list1: 'bob',
 *         list2: 123
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [value] An item to append to the list
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.append = function(list_name, value, callback) {
    var data = {};
    var $append = {};
    if (_.isObject(list_name)) {
        _.each(list_name, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $append[k] = v;
            }
        }, this);
        callback = value;
    } else {
        $append[list_name] = value;
    }
    data[APPEND_ACTION] = $append;

    return this._send_request(data, callback);
};

/*
 * Merge a given list with a list-valued people analytics property,
 * excluding duplicate values.
 *
 * ### Usage:
 *
 *     // merge a value to a list, creating it if needed
 *     mixpanel.people.union('pages_visited', 'homepage');
 *
 *     // like mixpanel.people.set(), you can append multiple
 *     // properties at once:
 *     mixpanel.people.union({
 *         list1: 'bob',
 *         list2: 123
 *     });
 *
 *     // like mixpanel.people.append(), you can append multiple
 *     // values to the same list:
 *     mixpanel.people.union({
 *         list1: ['bob', 'billy']
 *     });
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [value] Value / values to merge with the given property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.union = function(list_name, values, callback) {
    var data = {};
    var $union = {};
    if (_.isObject(list_name)) {
        _.each(list_name, function(v, k) {
            if (!this._is_reserved_property(k)) {
                $union[k] = _.isArray(v) ? v : [v];
            }
        }, this);
        callback = values;
    } else {
        $union[list_name] = _.isArray(values) ? values : [values];
    }
    data[UNION_ACTION] = $union;

    return this._send_request(data, callback);
};

/*
 * Record that you have charged the current user a certain amount
 * of money. Charges recorded with track_charge() will appear in the
 * Mixpanel revenue report.
 *
 * ### Usage:
 *
 *     // charge a user $50
 *     mixpanel.people.track_charge(50);
 *
 *     // charge a user $30.50 on the 2nd of january
 *     mixpanel.people.track_charge(30.50, {
 *         '$time': new Date('jan 1 2012')
 *     });
 *
 * @param {Number} amount The amount of money charged to the current user
 * @param {Object} [properties] An associative array of properties associated with the charge
 * @param {Function} [callback] If provided, the callback will be called when the server responds
 */
MixpanelPeople.prototype.track_charge = function(amount, properties, callback) {
    if (!_.isNumber(amount)) {
        amount = parseFloat(amount);
        if (isNaN(amount)) {
            console$1.error('Invalid value passed to mixpanel.people.track_charge - must be a number');
            return;
        }
    }

    return this.append('$transactions', _.extend({
        '$amount': amount
    }, properties), callback);
};

/*
 * Permanently clear all revenue report transactions from the
 * current user's people analytics profile.
 *
 * ### Usage:
 *
 *     mixpanel.people.clear_charges();
 *
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */
MixpanelPeople.prototype.clear_charges = function(callback) {
    return this.set('$transactions', [], callback);
};

/*
 * Permanently deletes the current people analytics profile from
 * Mixpanel (using the current distinct_id).
 *
 * ### Usage:
 *
 *     // remove the all data you have stored about the current user
 *     mixpanel.people.delete_user();
 *
 */
MixpanelPeople.prototype.delete_user = function() {
    if (!this._identify_called()) {
        console$1.error('mixpanel.people.delete_user() requires you to call identify() first');
        return;
    }
    var data = {'$delete': this._mixpanel.get_distinct_id()};
    return this._send_request(data);
};

MixpanelPeople.prototype.toString = function() {
    return this._mixpanel.toString() + '.people';
};

MixpanelPeople.prototype._send_request = function(data, callback) {
    data['$token'] = this._get_config('token');
    data['$distinct_id'] = this._mixpanel.get_distinct_id();

    var date_encoded_data = _.encodeDates(data);
    var truncated_data    = _.truncate(date_encoded_data, 255);
    var json_data         = _.JSONEncode(date_encoded_data);
    var encoded_data      = _.base64Encode(json_data);

    if (!this._identify_called()) {
        this._enqueue(data);
        if (!_.isUndefined(callback)) {
            if (this._get_config('verbose')) {
                callback({status: -1, error: null});
            } else {
                callback(-1);
            }
        }
        return truncated_data;
    }

    console$1.log('MIXPANEL PEOPLE REQUEST:');
    console$1.log(truncated_data);

    this._mixpanel._send_request(
        this._get_config('api_host') + '/engage/',
        {'data': encoded_data},
        this._mixpanel._prepare_callback(callback, truncated_data)
    );

    return truncated_data;
};

MixpanelPeople.prototype._get_config = function(conf_var) {
    return this._mixpanel.get_config(conf_var);
};

MixpanelPeople.prototype._identify_called = function() {
    return this._mixpanel._flags.identify_called === true;
};

// Queue up engage operations if identify hasn't been called yet.
MixpanelPeople.prototype._enqueue = function(data) {
    if (SET_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, data);
    } else if (SET_ONCE_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, data);
    } else if (ADD_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, data);
    } else if (APPEND_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, data);
    } else if (UNION_ACTION in data) {
        this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, data);
    } else {
        console$1.error('Invalid call to _enqueue():', data);
    }
};

// Flush queued engage operations - order does not matter,
// and there are network level race conditions anyway
MixpanelPeople.prototype._flush = function(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
    var _this = this;
    var $set_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ACTION));
    var $set_once_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ONCE_ACTION));
    var $add_queue = _.extend({}, this._mixpanel['persistence']._get_queue(ADD_ACTION));
    var $append_queue = this._mixpanel['persistence']._get_queue(APPEND_ACTION);
    var $union_queue = _.extend({}, this._mixpanel['persistence']._get_queue(UNION_ACTION));

    if (!_.isUndefined($set_queue) && _.isObject($set_queue) && !_.isEmptyObject($set_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(SET_ACTION, $set_queue);
        this.set($set_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, $set_queue);
            }
            if (!_.isUndefined(_set_callback)) {
                _set_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($set_once_queue) && _.isObject($set_once_queue) && !_.isEmptyObject($set_once_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(SET_ONCE_ACTION, $set_once_queue);
        this.set_once($set_once_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, $set_once_queue);
            }
            if (!_.isUndefined(_set_once_callback)) {
                _set_once_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($add_queue) && _.isObject($add_queue) && !_.isEmptyObject($add_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(ADD_ACTION, $add_queue);
        this.increment($add_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, $add_queue);
            }
            if (!_.isUndefined(_add_callback)) {
                _add_callback(response, data);
            }
        });
    }

    if (!_.isUndefined($union_queue) && _.isObject($union_queue) && !_.isEmptyObject($union_queue)) {
        _this._mixpanel['persistence']._pop_from_people_queue(UNION_ACTION, $union_queue);
        this.union($union_queue, function(response, data) {
            // on bad response, we want to add it back to the queue
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, $union_queue);
            }
            if (!_.isUndefined(_union_callback)) {
                _union_callback(response, data);
            }
        });
    }

    // we have to fire off each $append individually since there is
    // no concat method server side
    if (!_.isUndefined($append_queue) && _.isArray($append_queue) && $append_queue.length) {
        var $append_item;
        var callback = function(response, data) {
            if (response === 0) {
                _this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, $append_item);
            }
            if (!_.isUndefined(_append_callback)) {
                _append_callback(response, data);
            }
        };
        for (var i = $append_queue.length - 1; i >= 0; i--) {
            $append_item = $append_queue.pop();
            _this.append($append_item, callback);
        }
        // Save the shortened append queue
        _this._mixpanel['persistence'].save();
    }
};

MixpanelPeople.prototype._is_reserved_property = function(prop) {
    return prop === '$distinct_id' || prop === '$token';
};


// Internal class for notification display
MixpanelLib._Notification = function(notif_data, mixpanel_instance) {
    _.bind_instance_methods(this);

    this.mixpanel    = mixpanel_instance;
    this.persistence = this.mixpanel['persistence'];

    this.campaign_id = _.escapeHTML(notif_data['id']);
    this.message_id  = _.escapeHTML(notif_data['message_id']);

    this.body            = (_.escapeHTML(notif_data['body']) || '').replace(/\n/g, '<br/>');
    this.cta             = _.escapeHTML(notif_data['cta']) || 'Close';
    this.notif_type      = _.escapeHTML(notif_data['type']) || 'takeover';
    this.style           = _.escapeHTML(notif_data['style']) || 'light';
    this.title           = _.escapeHTML(notif_data['title']) || '';
    this.video_width     = MPNotif.VIDEO_WIDTH;
    this.video_height    = MPNotif.VIDEO_HEIGHT;

    // These fields are url-sanitized in the backend already.
    this.dest_url        = notif_data['cta_url'] || null;
    this.image_url       = notif_data['image_url'] || null;
    this.thumb_image_url = notif_data['thumb_image_url'] || null;
    this.video_url       = notif_data['video_url'] || null;

    this.clickthrough = true;
    if (!this.dest_url) {
        this.dest_url = '#dismiss';
        this.clickthrough = false;
    }

    this.mini = this.notif_type === 'mini';
    if (!this.mini) {
        this.notif_type = 'takeover';
    }
    this.notif_width = !this.mini ? MPNotif.NOTIF_WIDTH : MPNotif.NOTIF_WIDTH_MINI;

    this._set_client_config();
    this.imgs_to_preload = this._init_image_html();
    this._init_video();
};

MPNotif = MixpanelLib._Notification;

MPNotif.ANIM_TIME         = 200;
MPNotif.MARKUP_PREFIX     = 'mixpanel-notification';
MPNotif.BG_OPACITY        = 0.6;
MPNotif.NOTIF_TOP         = 25;
MPNotif.NOTIF_START_TOP   = 200;
MPNotif.NOTIF_WIDTH       = 388;
MPNotif.NOTIF_WIDTH_MINI  = 420;
MPNotif.NOTIF_HEIGHT_MINI = 85;
MPNotif.THUMB_BORDER_SIZE = 5;
MPNotif.THUMB_IMG_SIZE    = 60;
MPNotif.THUMB_OFFSET      = Math.round(MPNotif.THUMB_IMG_SIZE / 2);
MPNotif.VIDEO_WIDTH       = 595;
MPNotif.VIDEO_HEIGHT      = 334;

MPNotif.prototype.show = function() {
    var self = this;
    this._set_client_config();

    // don't display until HTML body exists
    if (!this.body_el) {
        setTimeout(function() { self.show(); }, 300);
        return;
    }

    this._init_styles();
    this._init_notification_el();

    // wait for any images to load before showing notification
    this._preload_images(this._attach_and_animate);
};

MPNotif.prototype.dismiss = _.safewrap(function() {
    if (!this.marked_as_shown) {
        // unexpected condition: user interacted with notif even though we didn't consider it
        // visible (see _mark_as_shown()); send tracking signals to mark delivery
        this._mark_delivery({'invisible': true});
    }

    var exiting_el = this.showing_video ? this._get_el('video') : this._get_notification_display_el();
    if (this.use_transitions) {
        this._remove_class('bg', 'visible');
        this._add_class(exiting_el, 'exiting');
        setTimeout(this._remove_notification_el, MPNotif.ANIM_TIME);
    } else {
        var notif_attr, notif_start, notif_goal;
        if (this.mini) {
            notif_attr  = 'right';
            notif_start = 20;
            notif_goal  = -100;
        } else {
            notif_attr  = 'top';
            notif_start = MPNotif.NOTIF_TOP;
            notif_goal  = MPNotif.NOTIF_START_TOP + MPNotif.NOTIF_TOP;
        }
        this._animate_els([
            {
                el:    this._get_el('bg'),
                attr:  'opacity',
                start: MPNotif.BG_OPACITY,
                goal:  0.0
            },
            {
                el:    exiting_el,
                attr:  'opacity',
                start: 1.0,
                goal:  0.0
            },
            {
                el:    exiting_el,
                attr:  notif_attr,
                start: notif_start,
                goal:  notif_goal
            }
        ], MPNotif.ANIM_TIME, this._remove_notification_el);
    }
});

MPNotif.prototype._add_class = _.safewrap(function(el, class_name) {
    class_name = MPNotif.MARKUP_PREFIX + '-' + class_name;
    if (typeof el === 'string') {
        el = this._get_el(el);
    }
    if (!el.className) {
        el.className = class_name;
    } else if (!~(' ' + el.className + ' ').indexOf(' ' + class_name + ' ')) {
        el.className += ' ' + class_name;
    }
});
MPNotif.prototype._remove_class = _.safewrap(function(el, class_name) {
    class_name = MPNotif.MARKUP_PREFIX + '-' + class_name;
    if (typeof el === 'string') {
        el = this._get_el(el);
    }
    if (el.className) {
        el.className = (' ' + el.className + ' ')
                .replace(' ' + class_name + ' ', '')
                .replace(/^[\s\xA0]+/, '')
                .replace(/[\s\xA0]+$/, '');
    }
});

MPNotif.prototype._animate_els = _.safewrap(function(anims, mss, done_cb, start_time) {
    var self = this,
        in_progress = false,
        ai, anim,
        cur_time = 1 * new Date(), time_diff;

    start_time = start_time || cur_time;
    time_diff = cur_time - start_time;

    for (ai = 0; ai < anims.length; ai++) {
        anim = anims[ai];
        if (typeof anim.val === 'undefined') {
            anim.val = anim.start;
        }
        if (anim.val !== anim.goal) {
            in_progress = true;
            var anim_diff = anim.goal - anim.start,
                anim_dir = anim.goal >= anim.start ? 1 : -1;
            anim.val = anim.start + anim_diff * time_diff / mss;
            if (anim.attr !== 'opacity') {
                anim.val = Math.round(anim.val);
            }
            if ((anim_dir > 0 && anim.val >= anim.goal) || (anim_dir < 0 && anim.val <= anim.goal)) {
                anim.val = anim.goal;
            }
        }
    }
    if (!in_progress) {
        if (done_cb) {
            done_cb();
        }
        return;
    }

    for (ai = 0; ai < anims.length; ai++) {
        anim = anims[ai];
        if (anim.el) {
            var suffix = anim.attr === 'opacity' ? '' : 'px';
            anim.el.style[anim.attr] = String(anim.val) + suffix;
        }
    }
    setTimeout(function() { self._animate_els(anims, mss, done_cb, start_time); }, 10);
});

MPNotif.prototype._attach_and_animate = _.safewrap(function() {
    var self = this;

    // no possibility to double-display
    if (this.shown || this._get_shown_campaigns()[this.campaign_id]) {
        return;
    }
    this.shown = true;

    this.body_el.appendChild(this.notification_el);
    setTimeout(function() {
        var notif_el = self._get_notification_display_el();
        if (self.use_transitions) {
            if (!self.mini) {
                self._add_class('bg', 'visible');
            }
            self._add_class(notif_el, 'visible');
            self._mark_as_shown();
        } else {
            var notif_attr, notif_start, notif_goal;
            if (self.mini) {
                notif_attr  = 'right';
                notif_start = -100;
                notif_goal  = 20;
            } else {
                notif_attr  = 'top';
                notif_start = MPNotif.NOTIF_START_TOP + MPNotif.NOTIF_TOP;
                notif_goal  = MPNotif.NOTIF_TOP;
            }
            self._animate_els([
                {
                    el:    self._get_el('bg'),
                    attr:  'opacity',
                    start: 0.0,
                    goal:  MPNotif.BG_OPACITY
                },
                {
                    el:    notif_el,
                    attr:  'opacity',
                    start: 0.0,
                    goal:  1.0
                },
                {
                    el:    notif_el,
                    attr:  notif_attr,
                    start: notif_start,
                    goal:  notif_goal
                }
            ], MPNotif.ANIM_TIME, self._mark_as_shown);
        }
    }, 100);
    _.register_event(self._get_el('cancel'), 'click', function(e) {
        e.preventDefault();
        self.dismiss();
    });
    var click_el = self._get_el('button') ||
                       self._get_el('mini-content');
    _.register_event(click_el, 'click', function(e) {
        e.preventDefault();
        if (self.show_video) {
            self._track_event('$campaign_open', {'$resource_type': 'video'});
            self._switch_to_video();
        } else {
            self.dismiss();
            if (self.clickthrough) {
                self._track_event('$campaign_open', {'$resource_type': 'link'}, function() {
                    window.location.href = self.dest_url;
                });
            }
        }
    });
});

MPNotif.prototype._get_el = function(id) {
    return document.getElementById(MPNotif.MARKUP_PREFIX + '-' + id);
};

MPNotif.prototype._get_notification_display_el = function() {
    return this._get_el(this.notif_type);
};

MPNotif.prototype._get_shown_campaigns = function() {
    return this.persistence['props'][CAMPAIGN_IDS_KEY] || (this.persistence['props'][CAMPAIGN_IDS_KEY] = {});
};

MPNotif.prototype._browser_lte = function(browser, version) {
    return this.browser_versions[browser] && this.browser_versions[browser] <= version;
};

MPNotif.prototype._init_image_html = function() {
    var imgs_to_preload = [];

    if (!this.mini) {
        if (this.image_url) {
            imgs_to_preload.push(this.image_url);
            this.img_html = '<img id="img" src="' + this.image_url + '"/>';
        } else {
            this.img_html = '';
        }
        if (this.thumb_image_url) {
            imgs_to_preload.push(this.thumb_image_url);
            this.thumb_img_html =
                    '<div id="thumbborder-wrapper"><div id="thumbborder"></div></div>' +
                    '<img id="thumbnail"' +
                        ' src="' + this.thumb_image_url + '"' +
                        ' width="' + MPNotif.THUMB_IMG_SIZE + '"' +
                        ' height="' + MPNotif.THUMB_IMG_SIZE + '"' +
                    '/>' +
                    '<div id="thumbspacer"></div>';
        } else {
            this.thumb_img_html = '';
        }
    } else {
        this.thumb_image_url = this.thumb_image_url || '//cdn.mxpnl.com/site_media/images/icons/notifications/mini-news-dark.png';
        imgs_to_preload.push(this.thumb_image_url);
    }

    return imgs_to_preload;
};

MPNotif.prototype._init_notification_el = function() {
    var notification_html = '';
    var video_src         = '';
    var video_html        = '';
    var cancel_html       = '<div id="cancel">' +
                                    '<div id="cancel-icon"></div>' +
                                '</div>';

    this.notification_el = document.createElement('div');
    this.notification_el.id = MPNotif.MARKUP_PREFIX + '-wrapper';
    if (!this.mini) {
        // TAKEOVER notification
        var close_html  = (this.clickthrough || this.show_video) ? '' : '<div id="button-close"></div>',
            play_html   = this.show_video ? '<div id="button-play"></div>' : '';
        if (this._browser_lte('ie', 7)) {
            close_html = '';
            play_html = '';
        }
        notification_html =
                '<div id="takeover">' +
                    this.thumb_img_html +
                    '<div id="mainbox">' +
                        cancel_html +
                        '<div id="content">' +
                            this.img_html +
                            '<div id="title">' + this.title + '</div>' +
                            '<div id="body">' + this.body + '</div>' +
                            '<div id="tagline">' +
                                '<a href="http://mixpanel.com?from=inapp" target="_blank">POWERED BY MIXPANEL</a>' +
                            '</div>' +
                        '</div>' +
                        '<div id="button">' +
                            close_html +
                            '<a id="button-link" href="' + this.dest_url + '">' + this.cta + '</a>' +
                            play_html +
                        '</div>' +
                    '</div>' +
                '</div>';
    } else {
        // MINI notification
        notification_html =
                '<div id="mini">' +
                    '<div id="mainbox">' +
                        cancel_html +
                        '<div id="mini-content">' +
                            '<div id="mini-icon">' +
                                '<div id="mini-icon-img"></div>' +
                            '</div>' +
                            '<div id="body">' +
                                '<div id="body-text"><div>' + this.body + '</div></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div id="mini-border"></div>' +
                '</div>';
    }
    if (this.youtube_video) {
        video_src = '//www.youtube.com/embed/' + this.youtube_video +
                '?wmode=transparent&showinfo=0&modestbranding=0&rel=0&autoplay=1&loop=0&vq=hd1080';
        if (this.yt_custom) {
            video_src += '&enablejsapi=1&html5=1&controls=0';
            video_html =
                    '<div id="video-controls">' +
                        '<div id="video-progress" class="video-progress-el">' +
                            '<div id="video-progress-total" class="video-progress-el"></div>' +
                            '<div id="video-elapsed" class="video-progress-el"></div>' +
                        '</div>' +
                        '<div id="video-time" class="video-progress-el"></div>' +
                    '</div>';
        }
    } else if (this.vimeo_video) {
        video_src = '//player.vimeo.com/video/' + this.vimeo_video + '?autoplay=1&title=0&byline=0&portrait=0';
    }
    if (this.show_video) {
        this.video_iframe =
                '<iframe id="' + MPNotif.MARKUP_PREFIX + '-video-frame" ' +
                    'width="' + this.video_width + '" height="' + this.video_height + '" ' +
                    ' src="' + video_src + '"' +
                    ' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen="1" scrolling="no"' +
                '></iframe>';
        video_html =
                '<div id="video-' + (this.flip_animate ? '' : 'no') + 'flip">' +
                    '<div id="video">' +
                        '<div id="video-holder"></div>' +
                        video_html +
                    '</div>' +
                '</div>';
    }
    var main_html = video_html + notification_html;
    if (this.flip_animate) {
        main_html =
                (this.mini ? notification_html : '') +
                '<div id="flipcontainer"><div id="flipper">' +
                    (this.mini ? video_html : main_html) +
                '</div></div>';
    }

    this.notification_el.innerHTML =
            ('<div id="overlay" class="' + this.notif_type + '">' +
                '<div id="campaignid-' + this.campaign_id + '">' +
                    '<div id="bgwrapper">' +
                        '<div id="bg"></div>' +
                        main_html +
                    '</div>' +
                '</div>' +
            '</div>')
            .replace(/class=\"/g, 'class="' + MPNotif.MARKUP_PREFIX + '-')
            .replace(/id=\"/g, 'id="' + MPNotif.MARKUP_PREFIX + '-');
};

MPNotif.prototype._init_styles = function() {
    if (this.style === 'dark') {
        this.style_vals = {
            bg:             '#1d1f25',
            bg_actions:     '#282b32',
            bg_hover:       '#3a4147',
            bg_light:       '#4a5157',
            border_gray:    '#32353c',
            cancel_opacity: '0.4',
            mini_hover:     '#2a3137',
            text_title:     '#fff',
            text_main:      '#9498a3',
            text_tagline:   '#464851',
            text_hover:     '#ddd'
        };
    } else {
        this.style_vals = {
            bg:             '#fff',
            bg_actions:     '#e7eaee',
            bg_hover:       '#eceff3',
            bg_light:       '#f5f5f5',
            border_gray:    '#e4ecf2',
            cancel_opacity: '1.0',
            mini_hover:     '#fafafa',
            text_title:     '#5c6578',
            text_main:      '#8b949b',
            text_tagline:   '#ced9e6',
            text_hover:     '#7c8598'
        };
    }
    var shadow = '0px 0px 35px 0px rgba(45, 49, 56, 0.7)',
        video_shadow = shadow,
        mini_shadow = shadow,
        thumb_total_size = MPNotif.THUMB_IMG_SIZE + MPNotif.THUMB_BORDER_SIZE * 2,
        anim_seconds = (MPNotif.ANIM_TIME / 1000) + 's';
    if (this.mini) {
        shadow = 'none';
    }

    // don't display on small viewports
    var notif_media_queries = {},
        min_width = MPNotif.NOTIF_WIDTH_MINI + 20;
    notif_media_queries['@media only screen and (max-width: ' + (min_width - 1) + 'px)'] = {
        '#overlay': {
            'display': 'none'
        }
    };
    var notif_styles = {
        '.flipped': {
            'transform': 'rotateY(180deg)'
        },
        '#overlay': {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'overflow': 'auto',
            'text-align': 'center',
            'z-index': '10000',
            'font-family': '"Helvetica", "Arial", sans-serif',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale'
        },
        '#overlay.mini': {
            'height': '0',
            'overflow': 'visible'
        },
        '#overlay a': {
            'width': 'initial',
            'padding': '0',
            'text-decoration': 'none',
            'text-transform': 'none',
            'color': 'inherit'
        },
        '#bgwrapper': {
            'position': 'relative',
            'width': '100%',
            'height': '100%'
        },
        '#bg': {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'min-width': this.doc_width * 4 + 'px',
            'min-height': this.doc_height * 4 + 'px',
            'background-color': 'black',
            'opacity': '0.0',
            '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)', // IE8
            'filter': 'alpha(opacity=60)', // IE5-7
            'transition': 'opacity ' + anim_seconds
        },
        '#bg.visible': {
            'opacity': MPNotif.BG_OPACITY
        },
        '.mini #bg': {
            'width': '0',
            'height': '0',
            'min-width': '0'
        },
        '#flipcontainer': {
            'perspective': '1000px',
            'position': 'absolute',
            'width': '100%'
        },
        '#flipper': {
            'position': 'relative',
            'transform-style': 'preserve-3d',
            'transition': '0.3s'
        },
        '#takeover': {
            'position': 'absolute',
            'left': '50%',
            'width': MPNotif.NOTIF_WIDTH + 'px',
            'margin-left': Math.round(-MPNotif.NOTIF_WIDTH / 2) + 'px',
            'backface-visibility': 'hidden',
            'transform': 'rotateY(0deg)',
            'opacity': '0.0',
            'top': MPNotif.NOTIF_START_TOP + 'px',
            'transition': 'opacity ' + anim_seconds + ', top ' + anim_seconds
        },
        '#takeover.visible': {
            'opacity': '1.0',
            'top': MPNotif.NOTIF_TOP + 'px'
        },
        '#takeover.exiting': {
            'opacity': '0.0',
            'top': MPNotif.NOTIF_START_TOP + 'px'
        },
        '#thumbspacer': {
            'height': MPNotif.THUMB_OFFSET + 'px'
        },
        '#thumbborder-wrapper': {
            'position': 'absolute',
            'top': (-MPNotif.THUMB_BORDER_SIZE) + 'px',
            'left': (MPNotif.NOTIF_WIDTH / 2 - MPNotif.THUMB_OFFSET - MPNotif.THUMB_BORDER_SIZE) + 'px',
            'width': thumb_total_size + 'px',
            'height': (thumb_total_size / 2) + 'px',
            'overflow': 'hidden'
        },
        '#thumbborder': {
            'position': 'absolute',
            'width': thumb_total_size + 'px',
            'height': thumb_total_size + 'px',
            'border-radius': thumb_total_size + 'px',
            'background-color': this.style_vals.bg_actions,
            'opacity': '0.5'
        },
        '#thumbnail': {
            'position': 'absolute',
            'top': '0px',
            'left': (MPNotif.NOTIF_WIDTH / 2 - MPNotif.THUMB_OFFSET) + 'px',
            'width': MPNotif.THUMB_IMG_SIZE + 'px',
            'height': MPNotif.THUMB_IMG_SIZE + 'px',
            'overflow': 'hidden',
            'z-index': '100',
            'border-radius': MPNotif.THUMB_IMG_SIZE + 'px'
        },
        '#mini': {
            'position': 'absolute',
            'right': '20px',
            'top': MPNotif.NOTIF_TOP + 'px',
            'width': this.notif_width + 'px',
            'height': MPNotif.NOTIF_HEIGHT_MINI * 2 + 'px',
            'margin-top': 20 - MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'backface-visibility': 'hidden',
            'opacity': '0.0',
            'transform': 'rotateX(90deg)',
            'transition': 'opacity 0.3s, transform 0.3s, right 0.3s'
        },
        '#mini.visible': {
            'opacity': '1.0',
            'transform': 'rotateX(0deg)'
        },
        '#mini.exiting': {
            'opacity': '0.0',
            'right': '-150px'
        },
        '#mainbox': {
            'border-radius': '4px',
            'box-shadow': shadow,
            'text-align': 'center',
            'background-color': this.style_vals.bg,
            'font-size': '14px',
            'color': this.style_vals.text_main
        },
        '#mini #mainbox': {
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'margin-top': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '3px',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini-border': {
            'height': (MPNotif.NOTIF_HEIGHT_MINI + 6) + 'px',
            'width': (MPNotif.NOTIF_WIDTH_MINI + 6) + 'px',
            'position': 'absolute',
            'top': '-3px',
            'left': '-3px',
            'margin-top': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '6px',
            'opacity': '0.25',
            'background-color': '#fff',
            'z-index': '-1',
            'box-shadow': mini_shadow
        },
        '#mini-icon': {
            'position': 'relative',
            'display': 'inline-block',
            'width': '75px',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'border-radius': '3px 0 0 3px',
            'background-color': this.style_vals.bg_actions,
            'background': 'linear-gradient(135deg, ' + this.style_vals.bg_light + ' 0%, ' + this.style_vals.bg_actions + ' 100%)',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini:hover #mini-icon': {
            'background-color': this.style_vals.mini_hover
        },
        '#mini:hover #mainbox': {
            'background-color': this.style_vals.mini_hover
        },
        '#mini-icon-img': {
            'position': 'absolute',
            'background-image': 'url(' + this.thumb_image_url + ')',
            'width': '48px',
            'height': '48px',
            'top': '20px',
            'left': '12px'
        },
        '#content': {
            'padding': '30px 20px 0px 20px'
        },
        '#mini-content': {
            'text-align': 'left',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'cursor': 'pointer'
        },
        '#img': {
            'width': '328px',
            'margin-top': '30px',
            'border-radius': '5px'
        },
        '#title': {
            'max-height': '600px',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'padding': '25px 0px 20px 0px',
            'font-size': '19px',
            'font-weight': 'bold',
            'color': this.style_vals.text_title
        },
        '#body': {
            'max-height': '600px',
            'margin-bottom': '25px',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'line-height': '21px',
            'font-size': '15px',
            'font-weight': 'normal',
            'text-align': 'left'
        },
        '#mini #body': {
            'display': 'inline-block',
            'max-width': '250px',
            'margin': '0 0 0 30px',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px',
            'font-size': '16px',
            'letter-spacing': '0.8px',
            'color': this.style_vals.text_title
        },
        '#mini #body-text': {
            'display': 'table',
            'height': MPNotif.NOTIF_HEIGHT_MINI + 'px'
        },
        '#mini #body-text div': {
            'display': 'table-cell',
            'vertical-align': 'middle'
        },
        '#tagline': {
            'margin-bottom': '15px',
            'font-size': '10px',
            'font-weight': '600',
            'letter-spacing': '0.8px',
            'color': '#ccd7e0',
            'text-align': 'left'
        },
        '#tagline a': {
            'color': this.style_vals.text_tagline,
            'transition': 'color ' + anim_seconds
        },
        '#tagline a:hover': {
            'color': this.style_vals.text_hover
        },
        '#cancel': {
            'position': 'absolute',
            'right': '0',
            'width': '8px',
            'height': '8px',
            'padding': '10px',
            'border-radius': '20px',
            'margin': '12px 12px 0 0',
            'box-sizing': 'content-box',
            'cursor': 'pointer',
            'transition': 'background-color ' + anim_seconds
        },
        '#mini #cancel': {
            'margin': '7px 7px 0 0'
        },
        '#cancel-icon': {
            'width': '8px',
            'height': '8px',
            'overflow': 'hidden',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/cancel-x.png)',
            'opacity': this.style_vals.cancel_opacity
        },
        '#cancel:hover': {
            'background-color': this.style_vals.bg_hover
        },
        '#button': {
            'display': 'block',
            'height': '60px',
            'line-height': '60px',
            'text-align': 'center',
            'background-color': this.style_vals.bg_actions,
            'border-radius': '0 0 4px 4px',
            'overflow': 'hidden',
            'cursor': 'pointer',
            'transition': 'background-color ' + anim_seconds
        },
        '#button-close': {
            'display': 'inline-block',
            'width': '9px',
            'height': '60px',
            'margin-right': '8px',
            'vertical-align': 'top',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/close-x-' + this.style + '.png)',
            'background-repeat': 'no-repeat',
            'background-position': '0px 25px'
        },
        '#button-play': {
            'display': 'inline-block',
            'width': '30px',
            'height': '60px',
            'margin-left': '15px',
            'background-image': 'url(//cdn.mxpnl.com/site_media/images/icons/notifications/play-' + this.style + '-small.png)',
            'background-repeat': 'no-repeat',
            'background-position': '0px 15px'
        },
        'a#button-link': {
            'display': 'inline-block',
            'vertical-align': 'top',
            'text-align': 'center',
            'font-size': '17px',
            'font-weight': 'bold',
            'overflow': 'hidden',
            'word-wrap': 'break-word',
            'color': this.style_vals.text_title,
            'transition': 'color ' + anim_seconds
        },
        '#button:hover': {
            'background-color': this.style_vals.bg_hover,
            'color': this.style_vals.text_hover
        },
        '#button:hover a': {
            'color': this.style_vals.text_hover
        },

        '#video-noflip': {
            'position': 'relative',
            'top': (-this.video_height * 2) + 'px'
        },
        '#video-flip': {
            'backface-visibility': 'hidden',
            'transform': 'rotateY(180deg)'
        },
        '#video': {
            'position': 'absolute',
            'width': (this.video_width - 1) + 'px',
            'height': this.video_height + 'px',
            'top': MPNotif.NOTIF_TOP + 'px',
            'margin-top': '100px',
            'left': '50%',
            'margin-left': Math.round(-this.video_width / 2) + 'px',
            'overflow': 'hidden',
            'border-radius': '5px',
            'box-shadow': video_shadow,
            'transform': 'translateZ(1px)', // webkit rendering bug http://stackoverflow.com/questions/18167981/clickable-link-area-unexpectedly-smaller-after-css-transform
            'transition': 'opacity ' + anim_seconds + ', top ' + anim_seconds
        },
        '#video.exiting': {
            'opacity': '0.0',
            'top': this.video_height + 'px'
        },
        '#video-holder': {
            'position': 'absolute',
            'width': (this.video_width - 1) + 'px',
            'height': this.video_height + 'px',
            'overflow': 'hidden',
            'border-radius': '5px'
        },
        '#video-frame': {
            'margin-left': '-1px',
            'width': this.video_width + 'px'
        },
        '#video-controls': {
            'opacity': '0',
            'transition': 'opacity 0.5s'
        },
        '#video:hover #video-controls': {
            'opacity': '1.0'
        },
        '#video .video-progress-el': {
            'position': 'absolute',
            'bottom': '0',
            'height': '25px',
            'border-radius': '0 0 0 5px'
        },
        '#video-progress': {
            'width': '90%'
        },
        '#video-progress-total': {
            'width': '100%',
            'background-color': this.style_vals.bg,
            'opacity': '0.7'
        },
        '#video-elapsed': {
            'width': '0',
            'background-color': '#6cb6f5',
            'opacity': '0.9'
        },
        '#video #video-time': {
            'width': '10%',
            'right': '0',
            'font-size': '11px',
            'line-height': '25px',
            'color': this.style_vals.text_main,
            'background-color': '#666',
            'border-radius': '0 0 5px 0'
        }
    };

    // IE hacks
    if (this._browser_lte('ie', 8)) {
        _.extend(notif_styles, {
            '* html #overlay': {
                'position': 'absolute'
            },
            '* html #bg': {
                'position': 'absolute'
            },
            'html, body': {
                'height': '100%'
            }
        });
    }
    if (this._browser_lte('ie', 7)) {
        _.extend(notif_styles, {
            '#mini #body': {
                'display': 'inline',
                'zoom': '1',
                'border': '1px solid ' + this.style_vals.bg_hover
            },
            '#mini #body-text': {
                'padding': '20px'
            },
            '#mini #mini-icon': {
                'display': 'none'
            }
        });
    }

    // add vendor-prefixed style rules
    var VENDOR_STYLES   = ['backface-visibility', 'border-radius', 'box-shadow', 'opacity',
                               'perspective', 'transform', 'transform-style', 'transition'],
        VENDOR_PREFIXES = ['khtml', 'moz', 'ms', 'o', 'webkit'];
    for (var selector in notif_styles) {
        for (var si = 0; si < VENDOR_STYLES.length; si++) {
            var prop = VENDOR_STYLES[si];
            if (prop in notif_styles[selector]) {
                var val = notif_styles[selector][prop];
                for (var pi = 0; pi < VENDOR_PREFIXES.length; pi++) {
                    notif_styles[selector]['-' + VENDOR_PREFIXES[pi] + '-' + prop] = val;
                }
            }
        }
    }

    var inject_styles = function(styles, media_queries) {
        var create_style_text = function(style_defs) {
            var st = '';
            for (var selector in style_defs) {
                var mp_selector = selector
                        .replace(/#/g, '#' + MPNotif.MARKUP_PREFIX + '-')
                        .replace(/\./g, '.' + MPNotif.MARKUP_PREFIX + '-');
                st += '\n' + mp_selector + ' {';
                var props = style_defs[selector];
                for (var k in props) {
                    st += k + ':' + props[k] + ';';
                }
                st += '}';
            }
            return st;
        };
        var create_media_query_text = function(mq_defs) {
            var mqt = '';
            for (var mq in mq_defs) {
                mqt += '\n' + mq + ' {' + create_style_text(mq_defs[mq]) + '\n}';
            }
            return mqt;
        };

        var style_text = create_style_text(styles) + create_media_query_text(media_queries),
            head_el = document.head || document.getElementsByTagName('head')[0] || document.documentElement,
            style_el = document.createElement('style');
        head_el.appendChild(style_el);
        style_el.setAttribute('type', 'text/css');
        if (style_el.styleSheet) { // IE
            style_el.styleSheet.cssText = style_text;
        } else {
            style_el.textContent = style_text;
        }
    };
    inject_styles(notif_styles, notif_media_queries);
};

MPNotif.prototype._init_video = _.safewrap(function() {
    if (!this.video_url) {
        return;
    }
    var self = this;

    // Youtube iframe API compatibility
    self.yt_custom = 'postMessage' in window;

    self.dest_url = self.video_url;
    var youtube_match = self.video_url.match(
                // http://stackoverflow.com/questions/2936467/parse-youtube-video-id-using-preg-match
                /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
            ),
        vimeo_match = self.video_url.match(
                /vimeo\.com\/.*?(\d+)/i
            );
    if (youtube_match) {
        self.show_video = true;
        self.youtube_video = youtube_match[1];

        if (self.yt_custom) {
            window['onYouTubeIframeAPIReady'] = function() {
                if (self._get_el('video-frame')) {
                    self._yt_video_ready();
                }
            };

            // load Youtube iframe API; see https://developers.google.com/youtube/iframe_api_reference
            var tag = document.createElement('script');
            tag.src = '//www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    } else if (vimeo_match) {
        self.show_video = true;
        self.vimeo_video = vimeo_match[1];
    }

    // IE <= 7, FF <= 3: fall through to video link rather than embedded player
    if (self._browser_lte('ie', 7) || self._browser_lte('firefox', 3)) {
        self.show_video = false;
        self.clickthrough = true;
    }
});

MPNotif.prototype._mark_as_shown = _.safewrap(function() {
    // click on background to dismiss
    var self = this;
    _.register_event(self._get_el('bg'), 'click', function() {
        self.dismiss();
    });

    var get_style = function(el, style_name) {
        var styles = {};
        if (document.defaultView && document.defaultView.getComputedStyle) {
            styles = document.defaultView.getComputedStyle(el, null); // FF3 requires both args
        } else if (el.currentStyle) { // IE
            styles = el.currentStyle;
        }
        return styles[style_name];
    };

    if (this.campaign_id) {
        var notif_el = this._get_el('overlay');
        if (notif_el && get_style(notif_el, 'visibility') !== 'hidden' && get_style(notif_el, 'display') !== 'none') {
            this._mark_delivery();
        }
    }
});

MPNotif.prototype._mark_delivery = _.safewrap(function(extra_props) {
    if (!this.marked_as_shown) {
        this.marked_as_shown = true;

        if (this.campaign_id) {
            // mark notification shown (local cache)
            this._get_shown_campaigns()[this.campaign_id] = 1 * new Date();
            this.persistence.save();
        }

        // track delivery
        this._track_event('$campaign_delivery', extra_props);

        // mark notification shown (mixpanel property)
        this.mixpanel['people']['append']({
            '$campaigns': this.campaign_id,
            '$notifications': {
                'campaign_id': this.campaign_id,
                'message_id':  this.message_id,
                'type':        'web',
                'time':        new Date()
            }
        });
    }
});

MPNotif.prototype._preload_images = function(all_loaded_cb) {
    var self = this;
    if (this.imgs_to_preload.length === 0) {
        all_loaded_cb();
        return;
    }

    var preloaded_imgs = 0;
    var img_objs = [];
    var onload = function() {
        preloaded_imgs++;
        if (preloaded_imgs === self.imgs_to_preload.length && all_loaded_cb) {
            all_loaded_cb();
            all_loaded_cb = null;
        }
    };
    for (var i = 0; i < this.imgs_to_preload.length; i++) {
        var img = new Image();
        img.onload = onload;
        img.src = this.imgs_to_preload[i];
        if (img.complete) {
            onload();
        }
        img_objs.push(img);
    }

    // IE6/7 doesn't fire onload reliably
    if (this._browser_lte('ie', 7)) {
        setTimeout(function() {
            var imgs_loaded = true;
            for (i = 0; i < img_objs.length; i++) {
                if (!img_objs[i].complete) {
                    imgs_loaded = false;
                }
            }
            if (imgs_loaded && all_loaded_cb) {
                all_loaded_cb();
                all_loaded_cb = null;
            }
        }, 500);
    }
};

MPNotif.prototype._remove_notification_el = _.safewrap(function() {
    window.clearInterval(this._video_progress_checker);
    this.notification_el.style.visibility = 'hidden';
    this.body_el.removeChild(this.notification_el);
});

MPNotif.prototype._set_client_config = function() {
    var get_browser_version = function(browser_ex) {
        var match = navigator.userAgent.match(browser_ex);
        return match && match[1];
    };
    this.browser_versions = {};
    this.browser_versions['chrome']  = get_browser_version(/Chrome\/(\d+)/);
    this.browser_versions['firefox'] = get_browser_version(/Firefox\/(\d+)/);
    this.browser_versions['ie']      = get_browser_version(/MSIE (\d+).+/);
    if (!this.browser_versions['ie'] && !(window.ActiveXObject) && 'ActiveXObject' in window) {
        this.browser_versions['ie'] = 11;
    }

    this.body_el = document.body || document.getElementsByTagName('body')[0];
    if (this.body_el) {
        this.doc_width = Math.max(
                this.body_el.scrollWidth, document.documentElement.scrollWidth,
                this.body_el.offsetWidth, document.documentElement.offsetWidth,
                this.body_el.clientWidth, document.documentElement.clientWidth
            );
        this.doc_height = Math.max(
                this.body_el.scrollHeight, document.documentElement.scrollHeight,
                this.body_el.offsetHeight, document.documentElement.offsetHeight,
                this.body_el.clientHeight, document.documentElement.clientHeight
            );
    }

    // detect CSS compatibility
    var ie_ver = this.browser_versions['ie'];
    var sample_styles = document.createElement('div').style,
        is_css_compatible = function(rule) {
            if (rule in sample_styles) {
                return true;
            }
            if (!ie_ver) {
                rule = rule[0].toUpperCase() + rule.slice(1);
                var props = ['O' + rule, 'Webkit' + rule, 'Moz' + rule];
                for (var i = 0; i < props.length; i++) {
                    if (props[i] in sample_styles) {
                        return true;
                    }
                }
            }
            return false;
        };
    this.use_transitions = this.body_el &&
        is_css_compatible('transition') &&
        is_css_compatible('transform');
    this.flip_animate = (this.browser_versions['chrome'] >= 33 || this.browser_versions['firefox'] >= 15) &&
        this.body_el &&
        is_css_compatible('backfaceVisibility') &&
        is_css_compatible('perspective') &&
        is_css_compatible('transform');
};

MPNotif.prototype._switch_to_video = _.safewrap(function() {
    var self = this,
        anims = [
            {
                el:    self._get_notification_display_el(),
                attr:  'opacity',
                start: 1.0,
                goal:  0.0
            },
            {
                el:    self._get_notification_display_el(),
                attr:  'top',
                start: MPNotif.NOTIF_TOP,
                goal:  -500
            },
            {
                el:    self._get_el('video-noflip'),
                attr:  'opacity',
                start: 0.0,
                goal:  1.0
            },
            {
                el:    self._get_el('video-noflip'),
                attr:  'top',
                start: -self.video_height * 2,
                goal:  0
            }
        ];

    if (self.mini) {
        var bg = self._get_el('bg'),
            overlay = self._get_el('overlay');
        bg.style.width = '100%';
        bg.style.height = '100%';
        overlay.style.width = '100%';

        self._add_class(self._get_notification_display_el(), 'exiting');
        self._add_class(bg, 'visible');

        anims.push({
            el:    self._get_el('bg'),
            attr:  'opacity',
            start: 0.0,
            goal:  MPNotif.BG_OPACITY
        });
    }

    var video_el = self._get_el('video-holder');
    video_el.innerHTML = self.video_iframe;

    var video_ready = function() {
        if (window['YT'] && window['YT']['loaded']) {
            self._yt_video_ready();
        }
        self.showing_video = true;
        self._get_notification_display_el().style.visibility = 'hidden';
    };
    if (self.flip_animate) {
        self._add_class('flipper', 'flipped');
        setTimeout(video_ready, MPNotif.ANIM_TIME);
    } else {
        self._animate_els(anims, MPNotif.ANIM_TIME, video_ready);
    }
});

MPNotif.prototype._track_event = function(event_name, properties, cb) {
    if (this.campaign_id) {
        properties = properties || {};
        properties = _.extend(properties, {
            'campaign_id':     this.campaign_id,
            'message_id':      this.message_id,
            'message_type':    'web_inapp',
            'message_subtype': this.notif_type
        });
        this.mixpanel['track'](event_name, properties, cb);
    } else if (cb) {
        cb.call();
    }
};

MPNotif.prototype._yt_video_ready = _.safewrap(function() {
    var self = this;
    if (self.video_inited) {
        return;
    }
    self.video_inited = true;

    var progress_bar  = self._get_el('video-elapsed'),
        progress_time = self._get_el('video-time'),
        progress_el   = self._get_el('video-progress');

    new window['YT']['Player'](MPNotif.MARKUP_PREFIX + '-video-frame', {
        'events': {
            'onReady': function(event) {
                var ytplayer = event['target'],
                    video_duration = ytplayer['getDuration'](),
                    pad = function(i) {
                        return ('00' + i).slice(-2);
                    },
                    update_video_time = function(current_time) {
                        var secs = Math.round(video_duration - current_time),
                            mins = Math.floor(secs / 60),
                            hours = Math.floor(mins / 60);
                        secs -= mins * 60;
                        mins -= hours * 60;
                        progress_time.innerHTML = '-' + (hours ? hours + ':' : '') + pad(mins) + ':' + pad(secs);
                    };
                update_video_time(0);
                self._video_progress_checker = window.setInterval(function() {
                    var current_time = ytplayer['getCurrentTime']();
                    progress_bar.style.width = (current_time / video_duration * 100) + '%';
                    update_video_time(current_time);
                }, 250);
                _.register_event(progress_el, 'click', function(e) {
                    var clickx = Math.max(0, e.pageX - progress_el.getBoundingClientRect().left);
                    ytplayer['seekTo'](video_duration * clickx / progress_el.clientWidth, true);
                });
            }
        }
    });
});

// EXPORTS (for closure compiler)

// MixpanelLib Exports
MixpanelLib.prototype['init']                            = MixpanelLib.prototype.init;
MixpanelLib.prototype['reset']                           = MixpanelLib.prototype.reset;
MixpanelLib.prototype['disable']                         = MixpanelLib.prototype.disable;
MixpanelLib.prototype['time_event']                      = MixpanelLib.prototype.time_event;
MixpanelLib.prototype['track']                           = MixpanelLib.prototype.track;
MixpanelLib.prototype['track_links']                     = MixpanelLib.prototype.track_links;
MixpanelLib.prototype['track_forms']                     = MixpanelLib.prototype.track_forms;
MixpanelLib.prototype['track_pageview']                  = MixpanelLib.prototype.track_pageview;
MixpanelLib.prototype['register']                        = MixpanelLib.prototype.register;
MixpanelLib.prototype['register_once']                   = MixpanelLib.prototype.register_once;
MixpanelLib.prototype['unregister']                      = MixpanelLib.prototype.unregister;
MixpanelLib.prototype['identify']                        = MixpanelLib.prototype.identify;
MixpanelLib.prototype['alias']                           = MixpanelLib.prototype.alias;
MixpanelLib.prototype['name_tag']                        = MixpanelLib.prototype.name_tag;
MixpanelLib.prototype['set_config']                      = MixpanelLib.prototype.set_config;
MixpanelLib.prototype['get_config']                      = MixpanelLib.prototype.get_config;
MixpanelLib.prototype['get_property']                    = MixpanelLib.prototype.get_property;
MixpanelLib.prototype['get_distinct_id']                 = MixpanelLib.prototype.get_distinct_id;
MixpanelLib.prototype['toString']                        = MixpanelLib.prototype.toString;
MixpanelLib.prototype['_check_and_handle_notifications'] = MixpanelLib.prototype._check_and_handle_notifications;
MixpanelLib.prototype['_show_notification']              = MixpanelLib.prototype._show_notification;

// MixpanelPersistence Exports
MixpanelPersistence.prototype['properties']            = MixpanelPersistence.prototype.properties;
MixpanelPersistence.prototype['update_search_keyword'] = MixpanelPersistence.prototype.update_search_keyword;
MixpanelPersistence.prototype['update_referrer_info']  = MixpanelPersistence.prototype.update_referrer_info;
MixpanelPersistence.prototype['get_cross_subdomain']   = MixpanelPersistence.prototype.get_cross_subdomain;
MixpanelPersistence.prototype['clear']                 = MixpanelPersistence.prototype.clear;

// MixpanelPeople Exports
MixpanelPeople.prototype['set']           = MixpanelPeople.prototype.set;
MixpanelPeople.prototype['set_once']      = MixpanelPeople.prototype.set_once;
MixpanelPeople.prototype['increment']     = MixpanelPeople.prototype.increment;
MixpanelPeople.prototype['append']        = MixpanelPeople.prototype.append;
MixpanelPeople.prototype['union']         = MixpanelPeople.prototype.union;
MixpanelPeople.prototype['track_charge']  = MixpanelPeople.prototype.track_charge;
MixpanelPeople.prototype['clear_charges'] = MixpanelPeople.prototype.clear_charges;
MixpanelPeople.prototype['delete_user']   = MixpanelPeople.prototype.delete_user;
MixpanelPeople.prototype['toString']      = MixpanelPeople.prototype.toString;

_.safewrap_class(MixpanelLib, ['identify', '_check_and_handle_notifications', '_show_notification']);

var instances = {};
var extend_mp = function() {
    // add all the sub mixpanel instances
    _.each(instances, function(instance, name) {
        if (name !== PRIMARY_INSTANCE_NAME) { mixpanel_master[name] = instance; }
    });

    // add private functions as _
    mixpanel_master['_'] = _;
};

var override_mp_init_func = function() {
    // we override the snippets init function to handle the case where a
    // user initializes the mixpanel library after the script loads & runs
    mixpanel_master['init'] = function(token, config, name) {
        if (name) {
            // initialize a sub library
            if (!mixpanel_master[name]) {
                mixpanel_master[name] = instances[name] = create_mplib(token, config, name);
                mixpanel_master[name]._loaded();
            }
            return mixpanel_master[name];
        } else {
            var instance = mixpanel_master;

            if (instances[PRIMARY_INSTANCE_NAME]) {
                // main mixpanel lib already initialized
                instance = instances[PRIMARY_INSTANCE_NAME];
            } else if (token) {
                // intialize the main mixpanel lib
                instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME);
                instance._loaded();
                instances[PRIMARY_INSTANCE_NAME] = instance;
            }

            mixpanel_master = instance;
            if (init_type === INIT_SNIPPET) {
                window[PRIMARY_INSTANCE_NAME] = mixpanel_master;
            }
            extend_mp();
        }
    };
};

var add_dom_loaded_handler = function() {
    // Cross browser DOM Loaded support
    function dom_loaded_handler() {
        // function flag since we only want to execute this once
        if (dom_loaded_handler.done) { return; }
        dom_loaded_handler.done = true;

        DOM_LOADED = true;
        ENQUEUE_REQUESTS = false;

        _.each(instances, function(inst) {
            inst._dom_loaded();
        });
    }

    function do_scroll_check() {
        try {
            document.documentElement.doScroll('left');
        } catch(e) {
            setTimeout(do_scroll_check, 1);
            return;
        }

        dom_loaded_handler();
    }

    if (document.addEventListener) {
        if (document.readyState === 'complete') {
            // safari 4 can fire the DOMContentLoaded event before loading all
            // external JS (including this file). you will see some copypasta
            // on the internet that checks for 'complete' and 'loaded', but
            // 'loaded' is an IE thing
            dom_loaded_handler();
        } else {
            document.addEventListener('DOMContentLoaded', dom_loaded_handler, false);
        }
    } else if (document.attachEvent) {
        // IE
        document.attachEvent('onreadystatechange', dom_loaded_handler);

        // check to make sure we arn't in a frame
        var toplevel = false;
        try {
            toplevel = window.frameElement === null;
        } catch(e) {
            // noop
        }

        if (document.documentElement.doScroll && toplevel) {
            do_scroll_check();
        }
    }

    // fallback handler, always will work
    _.register_event(window, 'load', dom_loaded_handler, true);
};

var add_dom_event_counting_handlers = function(instance) {
    var name = instance.get_config('name');

    instance.mp_counts = instance.mp_counts || {};
    instance.mp_counts['$__c'] = parseInt(_.cookie.get('mp_' + name + '__c')) || 0;

    var increment_count = function() {
        instance.mp_counts['$__c'] = (instance.mp_counts['$__c'] || 0) + 1;
        _.cookie.set('mp_' + name + '__c', instance.mp_counts['$__c'], 1, true);
    };

    var evtCallback = function() {
        try {
            instance.mp_counts = instance.mp_counts || {};
            increment_count();
        } catch (e) {
            console$1.error(e);
        }
    };
    _.register_event(document, 'submit', evtCallback);
    _.register_event(document, 'change', evtCallback);
    var mousedownTarget = null;
    _.register_event(document, 'mousedown', function(e) {
        mousedownTarget = e.target;
    });
    _.register_event(document, 'mouseup', function(e) {
        if (e.target === mousedownTarget) {
            evtCallback(e);
        }
    });
};

function init_as_module() {
    init_type = INIT_MODULE;
    mixpanel_master = new MixpanelLib();

    override_mp_init_func();
    mixpanel_master['init']();
    add_dom_loaded_handler();

    return mixpanel_master;
}

var mixpanel = init_as_module();

module.exports = mixpanel;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tracking_1 = __webpack_require__(2);
var lib_1 = __webpack_require__(8);
function example(id, scene, _options) {
    var element = document.querySelector("example#" + id);
    if (element === null)
        return null;
    var view = null;
    var example = {
        start: function () {
            if (view !== null)
                return;
            view = lib_1.viewer(element, scene, _options || lib_1.options({}));
            tracking_1.track("Example", { "ID": id });
        },
        stop: function () {
            if (view === null)
                return;
            view.stop();
        }
    };
    element.addEventListener("click", function () {
        return example.start();
    });
    return example;
}
function simpleExample(id, shape) {
    return example(id, lib_1.scene({
        camera: lib_1.orbit({
            radius: lib_1.value(2.5),
            offset: lib_1.value(-0.2, -0.5),
        }),
        models: [
            lib_1.model({
                shape: lib_1.scale(lib_1.value(1000), lib_1.sphere()),
                material: lib_1.spotlight({
                    direction: lib_1.value(1, 1, 0),
                    spread: lib_1.value(0.25),
                    color: lib_1.value(0.25),
                    ambient: lib_1.value(1)
                })
            }),
            lib_1.model({
                shape: shape,
                material: lib_1.material({
                    color: lib_1.value(0.8, 0.9, 0.1)
                })
            })
        ]
    }), lib_1.options({
        width: 128,
        height: 128,
        epsilon: 1e-4,
        steps: 100,
        bounces: 5,
        cheapNormals: false,
        gamma: 1.0
    }));
}
simpleExample("sphere", lib_1.sphere());
simpleExample("tetrahedron", lib_1.scale(lib_1.value(0.75), lib_1.tetrahedron()));
simpleExample("cube", lib_1.cube());
simpleExample("octohedron", lib_1.octohedron());
simpleExample("dodecahedron", lib_1.dodecahedron());
simpleExample("cylinder", lib_1.scale(lib_1.value(0.5), lib_1.cylinder()));
simpleExample("torus", lib_1.torus());
simpleExample("repeat", lib_1.scale(lib_1.value(0.25), lib_1.repeat(lib_1.value(2, 0, 2), lib_1.cube())));
simpleExample("smoothBox", lib_1.smoothBox(lib_1.value(1.5, 1, 1), lib_1.value(0.25)));
simpleExample("box", lib_1.box(lib_1.value(1, 0.5, 0.5)));
simpleExample("sierpinski", lib_1.scale(lib_1.value(0.75), lib_1.sierpinski()));
simpleExample("tree", lib_1.translate(lib_1.value(0, -0.5, 0), lib_1.scale(lib_1.value(0.75), lib_1.tree())));
simpleExample("skull", lib_1.rotateZ(lib_1.value(-Math.PI / 4), lib_1.skull()));
example("cornell", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(7),
    }),
    models: [
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, -1, 0), lib_1.value(2))
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(2))
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 0, 1), lib_1.value(2))
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(1, 0, 0), lib_1.value(2)),
            material: lib_1.material({
                color: lib_1.value(1, 0.5, 0.5)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(-1, 0, 0), lib_1.value(2)),
            material: lib_1.material({
                color: lib_1.value(0.5, 1, 0.5)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(0, 1.999, 0), lib_1.intersection(lib_1.scale(lib_1.value(2), lib_1.cylinder()), lib_1.plane(lib_1.value(0, -1, 0), lib_1.value(0)))),
            material: lib_1.material({
                emissivity: lib_1.value(2, 1.6, 1.3)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(-0.2, -1.5, 1), lib_1.sphere()),
            material: lib_1.material({
                color: lib_1.value(0.7, 0.7, 1),
                smoothness: lib_1.value(0.999),
                transmittance: lib_1.value(0.9),
                refraction: lib_1.value(1.4)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(1, -1.5, -0.5), lib_1.rotateY(lib_1.value(0.5), lib_1.smoothBox(lib_1.value(1, 1, 1), lib_1.value(0.25)))),
            material: lib_1.material({
                color: lib_1.value(0.7, 0.7, 1),
                smoothness: lib_1.value(0.999)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(-1, -1.5, -0.8), lib_1.rotateY(lib_1.value(0.8), lib_1.box(lib_1.value(1, 2.5, 1)))),
            material: lib_1.material({
                color: lib_1.value(0.8)
            })
        })
    ]
}), lib_1.options({
    width: 512,
    height: 512,
    bounces: 15,
    steps: 40,
    epsilon: 0.0001
}));
example("simple", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(4),
        offset: lib_1.value(0.25, -0.5)
    }),
    models: [
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0.5)),
            material: lib_1.material({
                color: lib_1.value(0.6)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(-0.5, 0, 0), lib_1.sphere()),
            material: lib_1.material({
                color: lib_1.value(0.8, 0.4, 0.8)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(0.5, 0, 0), lib_1.cube()),
            material: lib_1.material({
                color: lib_1.value(0.8, 0.9, 0.1)
            })
        })
    ]
}));
example("skulls", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(3),
        offset: lib_1.value(-0.3, -0.4),
        aperture: lib_1.value(0.1)
    }),
    models: [
        lib_1.model({
            shape: lib_1.scale(lib_1.value(1000), lib_1.sphere()),
            material: lib_1.spotlight({
                direction: lib_1.value(1, 1, 0),
                spread: lib_1.value(0.1),
                color: lib_1.value(0.5),
                ambient: lib_1.value(1)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0.3)),
            material: lib_1.material({
                color: lib_1.value(0.5)
            })
        }),
        lib_1.model({
            shape: lib_1.repeat(lib_1.value(1.3, 0, 1), lib_1.rotateZ(lib_1.value(-Math.PI / 4), lib_1.skull())),
            material: lib_1.material({
                smoothness: lib_1.value(0.99),
                color: lib_1.value(0.4, 0.6, 0.8)
            })
        })
    ]
}), lib_1.options({
    stepFactor: 0.6,
    steps: 50,
    bounces: 5
}));
example("modulation", lib_1.scene({
    air: lib_1.material({
        scatter: lib_1.value(1000),
    }),
    camera: lib_1.orbit({
        fieldOfView: lib_1.value(60 / 180 * Math.PI),
        radius: lib_1.value(10),
        aperture: lib_1.value(0.1),
        target: lib_1.value(0, 0, 0),
        offset: lib_1.value(0.25, -0.5)
    }),
    models: [
        lib_1.model({
            shape: lib_1.scale(lib_1.value(1000), lib_1.sphere()),
            material: lib_1.spotlight({
                color: lib_1.value(1),
                direction: lib_1.value(1, 1, 1),
                spread: lib_1.value(0.1),
                ambient: lib_1.value(0)
            })
        }),
        lib_1.model({
            shape: lib_1.intersection(lib_1.modulate(lib_1.value(1, 100, 1), function (index) {
                return lib_1.smoothBox(lib_1.expression("0.9, 1.0 + 5.0 * " + lib_1.random(index) + ".x, 0.9"), lib_1.value(0.5));
            }), lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(-6))),
            material: lib_1.material({
                color: lib_1.value(0.7, 0.6, 0.5),
                smoothness: lib_1.value(0.99)
            })
        })
    ]
}), lib_1.options({
    steps: 200,
    bounces: 6,
    cheapNormals: true,
}));
example("truchet", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(1.5),
        offset: lib_1.value(-0.2, -0.5),
    }),
    models: [
        lib_1.model({
            shape: lib_1.scale(lib_1.value(10000), lib_1.sphere()),
            material: lib_1.spotlight({
                direction: lib_1.value(1, 1, 0),
                spread: lib_1.value(0.1),
                color: lib_1.value(0.5)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0)),
        }),
        lib_1.model({
            shape: lib_1.intersection(lib_1.sphere(), lib_1.scale(lib_1.value(0.1), lib_1.truchet())),
            material: lib_1.material({
                color: lib_1.value(0.9, 0.8, 0.4),
                smoothness: lib_1.value(0.999)
            })
        })
    ]
}));
example("recursive", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(2.5),
        target: lib_1.value(0, 0.8, 0),
        offset: lib_1.value(-0.2, -0.2),
    }),
    models: [
        lib_1.model({
            shape: lib_1.scale(lib_1.value(10), lib_1.sphere()),
            material: lib_1.spotlight({
                direction: lib_1.value(1, 1, 0),
                spread: lib_1.value(0.05),
                ambient: lib_1.value(1),
                color: lib_1.value(0.5)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0)),
            material: lib_1.material({
                color: lib_1.value(0.7)
            })
        }),
        lib_1.model({
            shape: lib_1.tree(),
            material: lib_1.material({
                color: lib_1.value(0.7, 0.6, 0.5)
            })
        })
    ]
}), lib_1.options({
    gamma: 1
}));
example("kitchen", lib_1.scene({
    camera: lib_1.orbit({
        radius: lib_1.value(4),
        aperture: lib_1.value(0.05),
        target: lib_1.value(0, 0.6, 0),
        offset: lib_1.value(0.2, -0.3)
    }),
    models: [
        lib_1.model({
            shape: lib_1.scale(lib_1.value(1000), lib_1.sphere()),
            material: lib_1.spotlight({
                color: lib_1.value(0.3),
                direction: lib_1.value(1, 1, 1),
                spread: lib_1.value(0.01),
                ambient: lib_1.value(0.5, 0.6, 0.9)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0.002)),
            material: lib_1.material({
                color: lib_1.value(0.3, 0.35, 0.35),
                smoothness: lib_1.value(0),
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(0.001)),
            material: lib_1.material({
                transmittance: lib_1.value(0.9),
                smoothness: lib_1.value(0.95),
                refraction: lib_1.value(1.1)
            })
        }),
        lib_1.model({
            shape: lib_1.plane(lib_1.value(0, 0, 1), lib_1.value(1.58)),
            material: lib_1.material({
                color: lib_1.value(0.2)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(0, 0.5, -2), lib_1.union(lib_1.repeat(lib_1.value(2, 2, 0), lib_1.smoothBox(lib_1.value(1.95, 0.95, 0.9), lib_1.value(0.05))), lib_1.translate(lib_1.value(1, 1, 0), lib_1.repeat(lib_1.value(2, 2, 0), lib_1.smoothBox(lib_1.value(1.95, 0.95, 0.9), lib_1.value(0.05)))))),
            material: lib_1.material({
                smoothness: lib_1.value(0.5),
                color: lib_1.value(0.8)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(0.8, 0.5, 0.25), lib_1.difference(lib_1.smoothUnion(lib_1.value(0.1), lib_1.intersection(lib_1.cylinder(), lib_1.cube()), lib_1.translate(lib_1.value(0, 0, 0.5), lib_1.rotateZ(lib_1.value(Math.PI / 2), lib_1.scale(lib_1.value(0.5), lib_1.torus())))), lib_1.intersection(lib_1.scale(lib_1.value(0.9), lib_1.cylinder()), lib_1.plane(lib_1.value(0, -1, 0), lib_1.value(-0.4))))),
            material: lib_1.material({
                color: lib_1.value(1, 1, 0.99),
                smoothness: lib_1.value(1),
                transmittance: lib_1.value(0.9),
                refraction: lib_1.value(1.5),
                scatter: lib_1.value(0.01)
            })
        }),
        lib_1.model({
            shape: lib_1.translate(lib_1.value(-0.8, 0.5, 0), lib_1.difference(lib_1.intersection(lib_1.smoothUnion(lib_1.value(0.6), lib_1.translate(lib_1.value(0, 0.5, 0), lib_1.scale(lib_1.value(0.9), lib_1.sphere())), lib_1.translate(lib_1.value(0, -0.25, 0), lib_1.scale(lib_1.value(0.5), lib_1.cube()))), lib_1.plane(lib_1.value(0, 1, 0), lib_1.value(-0.5))), lib_1.intersection(lib_1.expand(lib_1.value(-0.04), lib_1.smoothUnion(lib_1.value(0.6), lib_1.translate(lib_1.value(0, 0.5, 0), lib_1.scale(lib_1.value(0.9), lib_1.sphere())), lib_1.translate(lib_1.value(0, -0.25, 0), lib_1.scale(lib_1.value(0.5), lib_1.cube())))), lib_1.plane(lib_1.value(0, -1, 0), lib_1.value(-0.4))))),
            material: lib_1.material({
                transmittance: lib_1.value(0.7),
                smoothness: lib_1.value(1),
                refraction: lib_1.value(1.9),
                color: lib_1.value(0.97, 0.97, 0.99),
                scatter: lib_1.value(1)
            })
        })
    ]
}), lib_1.options({
    bounces: 40,
}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Rayity index
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/** Exports */
__export(__webpack_require__(0));
__export(__webpack_require__(9));
__export(__webpack_require__(1));
__export(__webpack_require__(10));
__export(__webpack_require__(3));
__export(__webpack_require__(11));
__export(__webpack_require__(4));
__export(__webpack_require__(14));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Model]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var material_1 = __webpack_require__(1);
var shape_1 = __webpack_require__(3);
var id = 1;
/** Create a [[Model]] */
function model(values) {
    return Object.assign({
        id: id++,
        shape: shape_1.sphere(),
        material: material_1.material({})
    }, values || {});
}
exports.model = model;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Scene]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var camera_1 = __webpack_require__(4);
var expression_1 = __webpack_require__(0);
var material_1 = __webpack_require__(1);
/** Create a [[Scene]] */
function scene(values) {
    return Object.assign({
        models: [],
        camera: camera_1.orbit(),
        air: material_1.material({
            color: expression_1.value(1, 1, 1)
        })
    }, values || {});
}
exports.scene = scene;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a Rayity viewer
 */
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __webpack_require__(12);
/** Create a [[Viewer]] */
function viewer(element, scene, options) {
    var canvas = document.createElement("canvas");
    canvas.width = options.width;
    canvas.height = options.height;
    element.appendChild(canvas);
    var gl = canvas.getContext("webgl", {
        preserveDrawingBuffer: true
    });
    if (gl === null)
        throw "Could not create WebGL context";
    var variables = {
        time: 0,
        clicked: false,
        mouse: { x: 0.0, y: 0.0 }
    };
    var renderer_ = renderer_1.renderer(gl, scene, options, variables);
    canvas.addEventListener("click", function (event) {
        if (!event.altKey)
            return;
        var link = document.createElement("a");
        link.setAttribute("download", "render.png");
        canvas.toBlob(function (blob) {
            link.setAttribute("href", URL.createObjectURL(blob));
            link.click();
        });
    });
    canvas.addEventListener("mousedown", function () { return variables.clicked = true; });
    document.addEventListener("mouseup", function () { return variables.clicked = false; });
    canvas.addEventListener("mousemove", function (event) {
        if (variables.clicked) {
            variables.mouse.x += event.movementX / canvas.clientWidth;
            variables.mouse.y += -event.movementY / canvas.clientHeight;
        }
    });
    var start = 0;
    var running = true;
    function loop(time) {
        if (!start)
            start = time;
        variables.time = (time - start) / 1000.0;
        renderer_.render();
        if (running)
            requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return {
        stop: function () {
            running = false;
            element.removeChild(canvas);
        }
    };
}
exports.viewer = viewer;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Functionality related to rendering a [[Scene]] in a WebbGL context
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var build_1 = __webpack_require__(13);
/** Create a [[Renderer]] */
function renderer(gl, scene, options, variables) {
    var textureHalfFloatExtension = gl.getExtension("OES_texture_half_float");
    if (!textureHalfFloatExtension)
        throw "No half float texture support";
    var textures = [0, 1].map(function (_) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, options.width, options.height, 0, gl.RGBA, textureHalfFloatExtension.HALF_FLOAT_OES, null);
        return texture;
    });
    gl.bindTexture(gl.TEXTURE_2D, null);
    var framebuffer = gl.createFramebuffer();
    var renderShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(renderShader, "\n\t\tprecision highp float;\n\n\t\tvarying vec2 uv;\n\t\tuniform highp sampler2D texture;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 result = texture2D(texture, uv * 0.5 + 0.5);\n\t\t\tgl_FragColor = vec4(pow(result.xyz / result.w, vec3(1.0 / " + options.gamma.toFixed(10) + ")), 1.0);\n\t\t}");
    gl.compileShader(renderShader);
    if (!gl.getShaderParameter(renderShader, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(renderShader);
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, "\n\t\tattribute vec2 position;\n\t\tvarying vec2 uv;\n\t\t\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(position, 0, 1);\n\t\t\tuv = position.xy;\n\t\t}");
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(vertexShader);
    var screenShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(screenShader, build_1.build(scene, options));
    gl.compileShader(screenShader);
    if (!gl.getShaderParameter(screenShader, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(screenShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, screenShader);
    gl.linkProgram(program);
    var renderProgram = gl.createProgram();
    gl.attachShader(renderProgram, vertexShader);
    gl.attachShader(renderProgram, renderShader);
    gl.linkProgram(renderProgram);
    var vertices = Array(-1, -1, -1, 1, 1, 1, 1, -1);
    var indices = Array(0, 1, 2, 0, 2, 3);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.useProgram(program);
    var resolution = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(resolution, options.width, options.height);
    var position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, options.width, options.height);
    var odd = false;
    return {
        render: function () {
            var read = textures[odd ? 0 : 1];
            var write = textures[odd ? 1 : 0];
            var variables_ = Object.assign({
                time: 0,
                clicked: false,
                mouse: { x: 0, y: 0 }
            }, variables || {});
            gl.useProgram(program);
            gl.bindTexture(gl.TEXTURE_2D, read);
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, write, 0);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE)
                throw "Framebuffer not ready";
            gl.uniform1f(gl.getUniformLocation(program, "time"), variables_.time);
            gl.uniform2f(gl.getUniformLocation(program, "mouse"), variables_.mouse.x, variables_.mouse.y);
            gl.uniform1i(gl.getUniformLocation(program, "clicked"), variables_.clicked ? 1 : 0);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
            gl.useProgram(renderProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, write);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
            odd = !odd;
        }
    };
}
exports.renderer = renderer;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Functionality for converting a [[Scene]] into GLSL [[Code]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var expression_1 = __webpack_require__(0);
function buildExpression(expression) {
    return buildExpressions([expression]);
}
function buildExpressions(expressions) {
    return dependencyTree(expressions)
        .map(function (expression) { return "\tvec3 " + expression + " = vec3(" + expression.body + ");"; })
        .reduce(function (a, b) { return a + "\n" + b; }, "");
}
function dependencyTree(expressions) {
    var cache = {};
    function dependencies(expression) {
        if (cache[expression.id])
            return cache[expression.id];
        return cache[expression.id] = uniqueExpressions(dependencieses(expression.dependencies)
            .concat(expression));
    }
    function dependencieses(expressions) {
        return uniqueExpressions(expressions
            .map(function (_) { return dependencies(_); })
            .reduce(function (a, b) { return a.concat(b); }, []));
    }
    function uniqueExpressions(expressions) {
        return expressions.filter(function (x, i) {
            return expressions.findIndex(function (_) { return _.id === x.id; }) === i;
        });
    }
    return dependencieses(expressions);
}
function buildModel(model, options) {
    var distance = model.shape.call(expression_1.variable("p"));
    var code = "\n\t\nfloat distance" + model.id + "(vec3 p) {\n\t" + buildExpression(distance) + "\n\treturn " + distance + ".x;\n}\n\nMaterial material" + model.id + "(vec3 p, vec3 n, vec3 d) {\n\t" + buildExpressions([
        model.material.transmittance,
        model.material.smoothness,
        model.material.refraction,
        model.material.scatter,
        model.material.color,
        model.material.emissivity
    ]) + "\n\tMaterial m;\t\t\t\n\tm.transmittance = " + model.material.transmittance + ".x;\n\tm.smoothness = " + model.material.smoothness + ".x;\n\tm.refraction = " + model.material.refraction + ".x;\n\tm.scatter = " + model.material.scatter + ".x;\n\tm.color = " + model.material.color + ";\n\tm.emissivity = " + model.material.emissivity + ";\n\treturn m;\n}";
    if (options.cheapNormals)
        code += "\n\nvec3 normal" + model.id + "(vec3 p) {\n\tconst vec3 a = vec3( 1, 1, 1) / sqrt(3.0);\n\tconst vec3 b = vec3( 1,-1,-1) / sqrt(3.0);\n\tconst vec3 c = vec3(-1, 1,-1) / sqrt(3.0);\n\tconst vec3 d = vec3(-1,-1, 1) / sqrt(3.0);\n\tfloat z = distance" + model.id + "(p);\n\treturn normalize(\n\t\ta * (distance" + model.id + "(p + a * epsilon) - z) + \n\t\tb * (distance" + model.id + "(p + b * epsilon) - z) +\n\t\tc * (distance" + model.id + "(p + c * epsilon) - z) +\n\t\td * (distance" + model.id + "(p + d * epsilon) - z));\n}";
    else
        code += "\n\nvec3 normal" + model.id + "(vec3 p) {\n\treturn normalize(vec3(\n\t\tdistance" + model.id + "(p + vec3(epsilon, 0, 0)) -\n\t\tdistance" + model.id + "(p - vec3(epsilon, 0, 0)),\n\t\tdistance" + model.id + "(p + vec3(0, epsilon, 0)) -\n\t\tdistance" + model.id + "(p - vec3(0, epsilon, 0)),\n\t\tdistance" + model.id + "(p + vec3(0, 0, epsilon)) -\n\t\tdistance" + model.id + "(p - vec3(0, 0, epsilon))));\n}";
    return code;
}
function buildScene(scene, options) {
    return scene.models
        .map(function (_) { return buildModel(_, options); })
        .reduce(function (a, b) { return a + b; }, "") + "\n\t\t\nClosest calculateClosest(vec3 position) {\n\tClosest closest;\n\tfloat distance;\n\n\tclosest.object = 0;\n\tclosest.distance = MAX_VALUE;" +
        scene.models
            .map(function (model, i) { return "\n\t\n\tdistance = abs(distance" + model.id + "(position));\n\tif (distance < closest.distance) {\n\t\tclosest.distance = distance;\n\t\tclosest.object = " + model.id + ";\n\t}"; })
            .reduce(function (a, b) { return a + b; }, "") + "\n\t\n\treturn closest;\n}\n\nvec3 calculateNormal(int object, vec3 position) {" +
        scene.models
            .map(function (model, i) { return "\n\t\n\tif (object == " + model.id + ")\n\t\treturn normal" + model.id + "(position);"; })
            .reduce(function (a, b) { return a + b; }, "") + "\n\t\n\treturn vec3(0, 0, 0);\n}\n\nMaterial calculateMaterial(int object, vec3 position, vec3 normal, vec3 direction) {" +
        scene.models
            .map(function (model, i) { return "\n\t\n\tif (object == " + model.id + ")\n\t\treturn material" + model.id + "(position, normal, direction);"; })
            .reduce(function (a, b) { return a + b; }, "") + "\n\t\n\tMaterial material;\n\treturn material;\n}";
}
/** Generate the GLSL shader for this [[Scene]] */
function build(scene, options) {
    var code = "\nprecision highp float;\n\nuniform sampler2D texture;\nuniform vec2 resolution;\nuniform vec2 mouse;\nuniform bool clicked;\nuniform float time;\nvarying vec2 uv;\n\nconst float PI = 3.14159;\nconst float MAX_VALUE = 1e10;\n\nconst float epsilon = " + options.epsilon + ";\nconst int steps = " + options.steps + ";\nconst int bounces = " + options.bounces + ";\nconst int iterations = " + options.iterations + ";\n\nstruct Closest {\n\tint object;\n\tfloat distance;\n};\n\nstruct Material {\n\tfloat transmittance;\n\tfloat smoothness;\n\tfloat refraction;\n\tfloat scatter;\n\tvec3 color;\n\tvec3 emissivity;\n};\n\nClosest calculateClosest(vec3 position);\nvec3 calculateNormal(int object, vec3 position);\nMaterial calculateMaterial(int object, vec3 position, vec3 normal, vec3 direction);\n\nvec2 random(vec2 uv, int seed) {\n\tvec2 s = (vec2(1) + uv) * float(seed) + time;\n\treturn vec2(\n\t\tfract(sin(dot(s.xy, vec2(12.9898, 78.233))) * 43758.5453),\n\t\tfract(cos(dot(s.xy, vec2(4.898, 7.23))) * 23421.631));\n}\n\nvec3 ortho(vec3 v) {\n\treturn abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y);\n}\n\nvec3 calculateSample(vec3 normal, float smoothness, vec2 noise) {\n\tvec3 o1 = normalize(ortho(normal));\n\tvec3 o2 = normalize(cross(normal, o1));\n\tnoise.x *= 2.0 * PI;\n\tnoise.y = sqrt(smoothness + (1.0 - smoothness) * noise.y);\n\tfloat q = sqrt(1.0 - noise.y * noise.y);\n\treturn q * (cos(noise.x) * o1  + sin(noise.x) * o2) + noise.y * normal;\n}\n\nvec3 sampleSphere(vec2 noise) {\n\tnoise.x *= 2.0 * PI;\n\tnoise.y = noise.y * 2.0 - 1.0;\n\tfloat q = sqrt(1.0 - noise.y * noise.y);\n\treturn vec3(q * cos(noise.x), q * sin(noise.x), noise.y);\n}\n\nvoid main() {\n\t" + buildExpressions([
        scene.camera.eye,
        scene.camera.target,
        scene.camera.up,
        scene.camera.fieldOfView,
        scene.camera.aperture,
        scene.camera.focalFactor,
        scene.air.refraction,
        scene.air.scatter,
        scene.air.emissivity,
        scene.air.color
    ]) + "\n\tvec3 eye = " + scene.camera.eye + ";\n\tvec3 target = " + scene.camera.target + ";\n\tvec3 up = " + scene.camera.up + ";\n\tfloat fieldOfView = " + scene.camera.fieldOfView + ".x;\n\tfloat aperture = " + scene.camera.aperture + ".x;\n\tfloat focalFactor = " + scene.camera.focalFactor + ".x;\n\tfloat aspect = resolution.x / resolution.y;\n\n\tMaterial air;\t\t\n\tair.refraction = " + scene.air.refraction + ".x;\n\tair.scatter = " + scene.air.scatter + ".x;\n\tair.emissivity = " + scene.air.emissivity + ";\n\tair.color = " + scene.air.color + ";\n\n\tvec3 look = normalize(target - eye);\n\tup = normalize(up - dot(look, up) * look);\n\tvec3 right = cross(look, up);\n\t\n\tvec3 total = vec3(0);\n\n\tfor(int iteration = 1; iteration <= iterations; iteration++) {\n\t\tvec2 noise = random(uv, iteration);\n\n\t\tvec2 offset = noise.x * aperture * vec2(cos(noise.y * 2.0 * PI), sin(noise.y * 2.0 * PI));\n\t\tvec3 from = eye + offset.x * right + offset.y * up;\n\n\t\tvec2 angle = (uv * 0.5 + (noise - 0.5) / resolution) * fieldOfView * vec2(aspect, 1);\n\t\tvec3 screen = vec3(cos(angle.y) * sin(angle.x), sin(angle.y), cos(angle.y) * cos(angle.x));\n\t\tvec3 to = eye + focalFactor * length(target - eye) * (right * screen.x + up * screen.y + look * screen.z);\n\n\t\tvec3 direction = normalize(to - from);\n\n\t\tvec3 luminance = vec3(1);\n\n\t\tMaterial current = air;\n\n\t\tfor (int bounce = 1; bounce <= bounces; bounce++) {\n\t\t\tClosest closest;\n\t\t\tvec3 position = from;\n\t\t\tfloat distance = 0.0;\n\n\t\t\tvec2 noise = random(uv, iteration * bounces + bounce);\n\n\t\t\tfloat scatter = -log(noise.y) * current.scatter;\t\t\t\n\n\t\t\tfor (int step = 1; step <= steps; step++) {\n\t\t\t\tclosest = calculateClosest(position);\n\n\t\t\t\tif (closest.distance < epsilon)\n\t\t\t\t\tbreak;\n\n\t\t\t\tdistance = distance + closest.distance * " + options.stepFactor.toFixed(10) + ";\n\t\t\t\tposition = from + direction * distance;\n\n\t\t\t\tif (scatter > 0.0 && distance >= scatter)\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif (closest.object == 0) {\n\t\t\t\ttotal += air.color * luminance;\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif (scatter > 0.0 && distance >= scatter) {\n\t\t\t\tfrom = position - (distance - scatter) * direction;\n\t\t\t\tdirection = sampleSphere(noise);\n\t\t\t\ttotal += luminance * current.emissivity;\n\t\t\t\tluminance *= current.color;\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tvec3 normal = calculateNormal(closest.object, position);\n\n\t\t\tMaterial material = calculateMaterial(closest.object, position, normal, direction);\n\n\t\t\ttotal += luminance * material.emissivity;\n\n\t\t\tif (material.color == vec3(0))\n\t\t\t\tbreak;\n\n\t\t\tbool backface = dot(direction, normal) > 0.0; \n\t\t\tif (backface)\n\t\t\t\tnormal = -normal; \n\n\t\t\tnormal = calculateSample(normal, material.smoothness, noise);\n\t\t\t\n\t\t\tif (noise.y < material.transmittance) {\n\t\t\t\tfloat eta;\n\t\t\t\tif (!backface)\n\t\t\t\t\teta = current.refraction / material.refraction;\n\t\t\t\telse\n\t\t\t\t\teta = material.refraction / air.refraction;\n\t\t\t\n\t\t\t\tvec3 refracted = refract(direction, normal, eta);\n\t\t\t\tif (refracted != vec3(0)) {\n\t\t\t\t\tfrom = position - 5.0 * epsilon * normal;\n\t\t\t\t\tdirection = refracted;\n\t\t\t\t\tif (!backface)\n\t\t\t\t\t\tcurrent = material;\n\t\t\t\t\telse\n\t\t\t\t\t\tcurrent = air;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tluminance *= material.color;\t\t\t\t\n\t\t\tfrom = position + 5.0 * epsilon * normal;\n\t\t\tdirection = reflect(direction, normal);\n\t\t}\n\t}\n\n\tvec4 original = texture2D(texture, uv * 0.5 + 0.5);\n\t\n\tif (clicked) \n\t\toriginal *= 0.5;\n\n\toriginal *= " + options.memory.toFixed(10) + "; \n\t\t\n\tgl_FragColor = original + vec4(total, iterations);\n\n}" + buildScene(scene, options);
    return code;
}
exports.build = build;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for rendering options
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Create an [[Options]] */
function options(values) {
    values = values || {};
    return Object.assign({
        width: 256,
        height: 256,
        epsilon: 1e-4,
        steps: 100,
        bounces: 8,
        iterations: 1,
        memory: 1.0,
        cheapNormals: false,
        stepFactor: 0.9,
        gamma: 2.2
    }, values || {});
}
exports.options = options;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map