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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
function expression(body) {
    var id = generateId(body);
    var self = {
        id: id,
        body: body,
        dependencies: context,
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
    return expression("vec3(" + x.toPrecision(10) + ", " + y.toPrecision(10) + ", " + z.toPrecision(10) + ")");
}
exports.value = value;
/** An expression which is equal to a named variable */
function variable(name) {
    return expression(name);
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
        scatter: expression_1.value(1e10),
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
    var spread = options.spread || expression_1.value(0.5);
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
        fieldOfView: values.fieldOfView || expression_1.value(90 / 180.0 * Math.PI),
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
    return camera({
        target: values.target,
        eye: expression_1.expression(values.target + " + " + values.radius + ".x * spherical((mouse + " + values.offset + ".xy) * vec2(PI, 0.5 * PI) + vec2(0.5 * PI))"),
        up: values.up,
        fieldOfView: values.fieldOfView,
        aperture: values.aperture,
        focalFactor: values.focalFactor
    });
}
exports.orbit = orbit;


/***/ }),
/* 3 */
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
        epsilon: 1e-5,
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


/***/ }),
/* 4 */
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
/** Sphere of diameter 1 */
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
/** Tetrahedron with circumscribed diameter of 1 */
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
/** Cube of width 1 */
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
/** Octohedron with circumscribed diameter of 1 */
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
/** Dodecahedron with circumscribed diameter of 1 */
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
/** Cylinder of diameter 1 along the (0, 1, 0) axis */
function cylinder() {
    return shape(function (p) {
        return expression_1.expression("length(" + p + ".xz) - 0.5");
    });
}
exports.cylinder = cylinder;
/** Torus with outer diameter of 1, inner radius of 0.1 */
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
/** Repeat a [[Shape]] with repetition factor `x`  */
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
/** Twist a [[Shape]] along the x axis */
function twistX(x, a) {
    return shape(function (p) {
        return rotateX(expression_1.expression("vec3(" + p + ".x * " + x + ".x)"), a).call(p);
    });
}
exports.twistX = twistX;
/** Twist a [[Shape]] along the y axis */
function twistY(x, a) {
    return shape(function (p) {
        return rotateY(expression_1.expression("vec3(" + p + ".y * " + x + ".x)"), a).call(p);
    });
}
exports.twistY = twistY;
/** Twist a [[Shape]] along the z axis */
function twistZ(x, a) {
    return shape(function (p) {
        return rotateZ(expression_1.expression("vec3(" + p + ".z * " + x + ".x)"), a).call(p);
    });
}
exports.twistZ = twistZ;
/** Rotate a [[Shape]] about the x axis */
function rotateX(x, a) {
    return shape(function (p) {
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(1, 0, 0, 0, " + c + ".x, " + c + ".y, 0, -" + c + ".y, " + c + ".x) * " + p));
    });
}
exports.rotateX = rotateX;
/** Rotate a [[Shape]] about the y axis */
function rotateY(x, a) {
    return shape(function (p) {
        var c = expression_1.expression("cos(" + x + ".x), sin(" + x + ".x), 0");
        return a.call(expression_1.expression("mat3(" + c + ".x, 0, -" + c + ".y, 0, 1, 0, " + c + ".y, 0, " + c + ".x) * " + p));
    });
}
exports.rotateY = rotateY;
/** Rotate a [[Shape]] about the z axis */
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
/** Wrap a [[Shape]] about the x axis */
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
/** A box with rounded corners */
function smoothBox(dimensions, radius) {
    return mirror(expression_1.value(1, 0, 0), mirror(expression_1.value(0, 1, 0), mirror(expression_1.value(0, 0, 1), translate(expression_1.expression("0.5 * (" + dimensions + " - " + radius + ")"), max(scale(radius, sphere()))))));
}
exports.smoothBox = smoothBox;
/** A box with aritrary dimensions */
function box(dimensions) {
    return shape(function (p) {
        var d = expression_1.expression("abs(" + p + ") - " + dimensions);
        return expression_1.expression("max(min(" + d + ".x, min(" + d + ".y, " + d + ".z)), 0.0) + length(max(" + d + ", 0.0))");
    });
}
exports.box = box;
/** A sierpinksi fractal */
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
/** A recursive tree [[Shape]] */
function tree(iterations) {
    if (iterations === void 0) { iterations = 8; }
    var factor = 0.58;
    var length = 1.2;
    var width = 0.1;
    var angle = 50;
    return Array(iterations)
        .fill(0)
        .reduce(function (shape, _, i) {
        return smoothUnion(expression_1.value(0.15 * Math.pow(factor, i)), shape, mirror(expression_1.value(1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)), mirror(expression_1.value(1 / Math.sqrt(2), 0, -1 / Math.sqrt(2)), translate(expression_1.value(length * factor / 2 * Math.sin(angle / 180 * Math.PI), length / 2 * (1 + factor / 2 * Math.cos(angle / 180 * Math.PI)), 0), scale(expression_1.value(factor), rotateY(expression_1.value(0.1), rotateZ(expression_1.value(angle / 180 * Math.PI), shape)))))));
    }, smoothBox(expression_1.value(width, length, width), expression_1.value(width / 2)));
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
/** Skull */
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
    lowerJaw = smoothUnion(expression_1.value(0.13), lowerJaw, offset(function (p) { return expression_1.expression("0.04 - 0.03 * cos(" + p + ".y * 20.2), -0.23, 0.27 + sin(" + p + ".y) * 0.27"); }, box(expression_1.value(0.03, 0.12, 0.014))));
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
/* 5 */
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
__export(__webpack_require__(7));
__export(__webpack_require__(1));
__export(__webpack_require__(9));
__export(__webpack_require__(4));
__export(__webpack_require__(10));
__export(__webpack_require__(2));
__export(__webpack_require__(3));


/***/ }),
/* 6 */
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
    var code = "\n\t\nfloat distance" + model.id + "(vec3 p) {\n\t" + buildExpression(distance) + "\n\treturn " + distance + ".x;\n}\n\nMaterial material" + model.id + "(vec3 p, vec3 n, vec3 d) {\n\tMaterial m;\n\t" + buildExpressions([
        model.material.transmittance,
        model.material.smoothness,
        model.material.refraction,
        model.material.scatter,
        model.material.color,
        model.material.emissivity
    ]) + "\n\tm.transmittance = " + model.material.transmittance + ".x;\n\tm.smoothness = " + model.material.smoothness + ".x;\n\tm.refraction = " + model.material.refraction + ".x;\n\tm.scatter = " + model.material.scatter + ".x;\n\tm.color = " + model.material.color + ";\n\tm.emissivity = " + model.material.emissivity + ";\n\treturn m;\n}";
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
    var code = "\nprecision highp float;\n\nuniform sampler2D texture;\nuniform vec2 resolution;\nuniform vec2 mouse;\nuniform bool clicked;\nuniform float time;\nvarying vec2 uv;\n\nconst float PI = 3.14159;\nconst float MAX_VALUE = 1e10;\n\nconst float epsilon = " + options.epsilon + ";\nconst int steps = " + options.steps + ";\nconst int bounces = " + options.bounces + ";\nconst int iterations = " + options.iterations + ";\n\nstruct Closest {\n\tint object;\n\tfloat distance;\n};\n\nstruct Material {\n\tfloat transmittance;\n\tfloat smoothness;\n\tfloat refraction;\n\tfloat scatter;\n\tvec3 color;\n\tvec3 emissivity;\n};\n\nClosest calculateClosest(vec3 position);\nvec3 calculateNormal(int object, vec3 position);\nMaterial calculateMaterial(int object, vec3 position, vec3 normal, vec3 direction);\n\nvec2 random(int seed) {\n\tvec2 s = (vec2(1) + uv) * float(seed) + time;\n\treturn vec2(\n\t\tfract(sin(dot(s.xy, vec2(12.9898, 78.233))) * 43758.5453),\n\t\tfract(cos(dot(s.xy, vec2(4.898, 7.23))) * 23421.631));\n}\n\nvec3 ortho(vec3 v) {\n\treturn abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y);\n}\n\nvec3 calculateSample(vec3 normal, float smoothness, vec2 noise) {\n\tvec3 o1 = normalize(ortho(normal));\n\tvec3 o2 = normalize(cross(normal, o1));\n\tnoise.x *= 2.0 * PI;\n\tnoise.y = sqrt(smoothness + (1.0 - smoothness) * noise.y);\n\tfloat q = sqrt(1.0 - noise.y * noise.y);\n\treturn q * (cos(noise.x) * o1  + sin(noise.x) * o2) + noise.y * normal;\n}\n\nvec3 sampleSphere(vec2 noise) {\n\tnoise.x *= 2.0 * PI;\n\tnoise.y = noise.y * 2.0 - 1.0;\n\tfloat q = sqrt(1.0 - noise.y * noise.y);\n\treturn vec3(q * cos(noise.x), q * sin(noise.x), noise.y);\n}\n\nvec3 spherical(vec2 angle) {\n\treturn vec3(sin(angle.y) * cos(angle.x), cos(angle.y), sin(angle.y) * sin(angle.x));\n}\n\nvoid main() {\n\t" + buildExpressions([
        scene.camera.eye,
        scene.camera.target,
        scene.camera.up,
        scene.camera.fieldOfView,
        scene.camera.aperture,
        scene.camera.focalFactor
    ]) + "\n\tvec3 eye = " + scene.camera.eye + ";\n\tvec3 target = " + scene.camera.target + ";\n\tvec3 up = " + scene.camera.up + ";\n\tfloat fieldOfView = " + scene.camera.fieldOfView + ".x;\n\tfloat aperture = " + scene.camera.aperture + ".x;\n\tfloat focalFactor = " + scene.camera.focalFactor + ".x;\n\n\tvec3 look = normalize(target - eye);\n\tup = normalize(up - dot(look, up) * look);\n\tvec3 right = cross(look, up);\n\t\n\tvec3 total;\n\n\tfor(int iteration = 1; iteration <= iterations; iteration++) {\n\t\tvec2 noise = random(iteration);\n\n\t\tvec2 offset = noise.x * aperture * vec2(cos(noise.y * 2.0 * PI), sin(noise.y * 2.0 * PI));\n\t\tvec3 from = eye + offset.x * right + offset.y * up;\n\n\t\tvec2 angle = (uv * 0.5 + (noise - 0.5) / resolution) * fieldOfView;\n\t\tvec3 screen = vec3(cos(angle.y) * sin(angle.x), sin(angle.y), cos(angle.y) * cos(angle.x));\n\t\tvec3 to = eye + focalFactor * length(target - eye) * (right * screen.x + up * screen.y + look * screen.z);\n\n\t\tvec3 direction = normalize(to - from);\n\n\t\tvec3 luminance = vec3(1);\n\n\t\tMaterial air;\n\t\t" + buildExpressions([
        scene.air.refraction,
        scene.air.scatter,
        scene.air.emissivity,
        scene.air.color
    ]) + "\n\t\tair.refraction = " + scene.air.refraction + ".x;\n\t\tair.scatter = " + scene.air.scatter + ".x;\n\t\tair.emissivity = " + scene.air.emissivity + ";\n\t\tair.color = " + scene.air.color + ";\n\n\t\tMaterial current = air;\n\n\t\tfor (int bounce = 1; bounce <= bounces; bounce++) {\n\t\t\tClosest closest;\n\t\t\tvec3 position = from;\n\t\t\tfloat distance = 0.0;\n\n\t\t\tvec2 noise = random(iteration * bounces + bounce);\n\n\t\t\tfloat scatter = -log(noise.y) * current.scatter;\n\n\t\t\tfor (int step = 1; step <= steps; step++) {\n\t\t\t\tclosest = calculateClosest(position);\n\n\t\t\t\tif (closest.distance < epsilon)\n\t\t\t\t\tbreak;\n\n\t\t\t\tdistance = distance + closest.distance * " + options.stepFactor.toFixed(10) + ";\n\t\t\t\tdistance = min(distance, scatter);\n\t\t\t\tposition = from + direction * distance;\n\n\t\t\t\tif (distance == scatter)\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif (closest.object == 0)\n\t\t\t\tbreak;\n\n\t\t\tif (distance == scatter) {\n\t\t\t\tfrom = position;\n\t\t\t\tdirection = sampleSphere(noise);\n\t\t\t\ttotal += luminance * current.emissivity;\n\t\t\t\tluminance *= current.color;\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tvec3 normal = calculateNormal(closest.object, position);\n\n\t\t\tMaterial material = calculateMaterial(closest.object, position, normal, direction);\n\n\t\t\ttotal += luminance * material.emissivity;\n\n\t\t\tif (material.color == vec3(0))\n\t\t\t\tbreak;\n\n\t\t\tbool backface = dot(direction, normal) > 0.0; \n\t\t\tif (backface)\n\t\t\t\tnormal = -normal; \n\n\t\t\tnormal = calculateSample(normal, material.smoothness, noise);\n\t\t\t\n\t\t\tif (noise.y < material.transmittance) {\n\t\t\t\tfloat eta;\n\t\t\t\tif (!backface)\n\t\t\t\t\teta = current.refraction / material.refraction;\n\t\t\t\telse\n\t\t\t\t\teta = material.refraction / air.refraction;\n\t\t\t\n\t\t\t\tvec3 refracted = refract(direction, normal, eta);\n\t\t\t\tif (refracted != vec3(0)) {\n\t\t\t\t\tfrom = position - 5.0 * epsilon * normal;\n\t\t\t\t\tdirection = refracted;\n\t\t\t\t\tif (!backface)\n\t\t\t\t\t\tcurrent = material;\n\t\t\t\t\telse\n\t\t\t\t\t\tcurrent = air;\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tluminance *= material.color;\t\t\t\t\n\t\t\tfrom = position + 5.0 * epsilon * normal;\n\t\t\tdirection = reflect(direction, normal);\n\t\t}\n\t}\n\n\tvec4 original = texture2D(texture, uv * 0.5 - 0.5);\n\t\n\tif (clicked) \n\t\toriginal *= 0.5;\n\n\toriginal *= " + options.memory.toFixed(10) + "; \n\t\t\n\tgl_FragColor = original + vec4(total, iterations);\n\n}" + buildScene(scene, options);
    console.log(code);
    return code;
}
exports.build = build;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Model]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var material_1 = __webpack_require__(1);
var shape_1 = __webpack_require__(4);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Functionality related to rendering a [[Scene]] in a WebbGL context
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var build_1 = __webpack_require__(6);
/** Create a [[Renderer]] */
function renderer(gl, scene, options, variables) {
    if (!gl.getExtension("OES_texture_float"))
        throw "No float texture support";
    var textures = [0, 1].map(function (_) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, options.width, options.height, 0, gl.RGBA, gl.FLOAT, null);
        return texture;
    });
    var framebuffer = gl.createFramebuffer();
    var renderShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(renderShader, "\n\t\tprecision highp float;\n\n\t\tvarying vec2 uv;\n\t\tuniform sampler2D texture;\n\t\t\n\t\tvoid main() {\n\t\t\tvec4 result = texture2D(texture, uv * 0.5 - 0.5);\n\t\t\tgl_FragColor = vec4(pow(result.xyz / result.w, vec3(1.0 / " + options.gamma.toFixed(10) + ")), 1.0);\n\t\t}");
    gl.compileShader(renderShader);
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, "\n\t\tattribute vec2 position;\n\t\tvarying vec2 uv;\n\t\t\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(position, 0, 1);\n\t\t\tuv = position.xy;\n\t\t}");
    gl.compileShader(vertexShader);
    var screenShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(screenShader, build_1.build(scene, options));
    gl.compileShader(screenShader);
    if (gl.getShaderInfoLog(screenShader))
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a [[Scene]]
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
var camera_1 = __webpack_require__(2);
var expression_1 = __webpack_require__(0);
var material_1 = __webpack_require__(1);
/** Create a [[Scene]] */
function scene(values) {
    return Object.assign({
        models: [],
        camera: camera_1.orbit(),
        air: material_1.material({
            refraction: expression_1.value(1)
        })
    }, values || {});
}
exports.scene = scene;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for creating a Rayity viewer
 */
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = __webpack_require__(3);
var renderer_1 = __webpack_require__(8);
/** Create a [[Viewer]] */
function viewer(element, scene, options) {
    options = options || options_1.options();
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
        link.setAttribute("href", canvas.toDataURL());
        link.click();
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
    function loop(time) {
        if (!start)
            start = time;
        variables.time = (time - start) / 1000.0;
        renderer_.render();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return {};
}
exports.viewer = viewer;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rayity_1 = __webpack_require__(5);
rayity_1.viewer(document.body, rayity_1.scene({
    air: rayity_1.material({
        scatter: rayity_1.value(1000),
    }),
    camera: rayity_1.orbit({
        radius: rayity_1.value(2),
        aperture: rayity_1.value(0.1),
        target: rayity_1.value(0),
        offset: rayity_1.value(0.25, -0.5),
        fieldOfView: rayity_1.value(60 / 180 * Math.PI)
    }),
    models: [
        rayity_1.model({
            shape: rayity_1.scale(rayity_1.value(1000), rayity_1.sphere()),
            material: rayity_1.spotlight({
                color: rayity_1.value(1),
                direction: rayity_1.value(1, 1, 1),
                spread: rayity_1.value(0.05),
                ambient: rayity_1.value(0)
            })
        }),
        rayity_1.model({
            shape: rayity_1.plane(rayity_1.value(0, 1, 0), rayity_1.value(0.5)),
            material: rayity_1.material({
                color: rayity_1.value(0.5)
            })
        }),
        rayity_1.model({
            shape: rayity_1.dodecahedron(),
            material: rayity_1.material({
                color: rayity_1.value(0.7, 0.6, 0.5)
            })
        })
    ]
}), rayity_1.options({
    width: 512,
    height: 512,
    epsilon: 1e-4,
    steps: 100,
    bounces: 5,
    iterations: 1,
    cheapNormals: true,
    memory: 1
}));


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map