<example id="cornell"></example>

# {{ site.title }}

Rayity is a library for creating photorealistic renderings of three-dimensional scenes in a web browser. It uses [path tracing](https://en.wikipedia.org/wiki/Path_tracing) to simulate light to reproduce effects such as shadows, ambient occlusion, reflection, refraction, depth of field, and subsurface scattering. Objects are rendered using a technique called “sphere tracing” where geometry is defined using “distance functions”. This allows for the rendering of complicated [implicit surfaces](https://en.wikipedia.org/wiki/Implicit_surface) including recursively-defined geometry like fractals. 

Scenes and geometry are defined using TypeScript (or JavaScript). Rayity then uses a code generation technique to convert that scene into a GLSL [shader](https://en.wikipedia.org/wiki/Shader). This allows the scene to be rendered quickly by taking advantage of graphics processing hardware. 

[Example Project](https://github.com/gribbet/rayity-example)

[Documentation](docs/)

***

## Examples

### Simple Example

<example id="simple"></example>

```ts
viewer(document.getElementById("canvas"),
	scene({
		camera: orbit({
			radius: value(4),
			offset: value(0.25, -0.5)
		}),
		models: [
			model({
				shape: plane(value(0, 1, 0), value(0.5)),
				material: material({
					color: value(0.6)
				})
			}),
			model({
				shape: translate(value(-0.5, 0, 0),
					sphere()),
				material: material({
					color: value(0.8, 0.4, 0.8)
				})
			}),
			model({
				shape: translate(value(0.5, 0, 0),
					cube()),
				material: material({
					color: value(0.8, 0.9, 0.1)
				})
			})
		]));
```

### Modulation

<example id="modulation"></example>

```ts
scene({
	air: material({
		scatter: value(1000),
	}),
	camera: orbit({
		fieldOfView: value(60 / 180 * Math.PI),
		radius: value(10),
		aperture: value(0.1),
		target: value(0, 0, 0),
		offset: value(0.25, -0.5)
	}),
	models: [
		model({
			shape: scale(value(1000),
				sphere()),
			material: spotlight({
				color: value(1),
				direction: value(1, 1, 1),
				spread: value(0.1),
				ambient: value(0)
			})
		}),
		model({
			shape: intersection(
				modulate(value(1, 100, 1), index =>
					smoothBox(
						expression(`0.9, 1.0 + 5.0 * ${random(index)}.x, 0.9`), 
						value(0.5))),
				plane(value(0, 1, 0), value(-6))),
			material: material({
				color: value(0.7, 0.6, 0.5),
				smoothness: value(0.99)
			})
		})
	]
})
```

### Truchet

<example id="truchet"></example>

```ts
scene({
	camera: orbit({
		radius: value(1.54),
		offset: value(-0.2, -0.5),
	}),
	models: [
		model({
			shape: scale(value(10000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				spread: value(0.1),
				color: value(0.5)
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0)),
		}),
		model({
			shape: intersection(
				sphere(),
				scale(value(0.1),
					truchet())),
			material: material({
				color: value(0.9, 0.8, 0.4),
				smoothness: value(0.999)
			})
		})
	]
})
```

### Recursive Geometry

<example id="recursive"></example>

```ts
function tree(iterations: number = 6, shape?: Shape): Shape {
	let factor = 0.58;
	let length = 1.2;
	let width = 0.1;
	let angle = 50 / 180 * Math.PI;
	let smoothFactor = 0.15;

	if (iterations <= 1)
		return smoothBox(value(width, length, width), value(width));
	else {
		shape = tree(iterations - 1, shape);
		return smoothUnion(
			value(smoothFactor * Math.pow(factor, iterations)),
			shape,
			mirror(value(1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)),
				mirror(value(1 / Math.sqrt(2), 0, -1 / Math.sqrt(2)),
					translate(
						value(
							length * factor / 2 * Math.sin(angle),
							width + length / 2 * (1 + factor / 2 * Math.cos(angle)),
							0),
						scale(value(factor),
							rotateY(value(0.1),
								rotateZ(value(angle / 180 * Math.PI),
									shape)))))));
	}
}

scene({
	camera: orbit({
		radius: value(4),
		target: value(0, 0.4, 0),
		offset: value(-0.2, -0.2),
	}),
	models: [
		model({
			shape: scale(value(1000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				spread: value(0.05),
				ambient: value(1),
				color: value(0.5)
			})
		}),
		model({
			shape: translate(value(0, -0.5, 0),
				cube()),
			material: material({
				color: value(0.7)
			})
		}),
		model({
			shape: tree(6),
			material: material({
				color: value(0.7, 0.5, 0.4)
			})
		})
	]
})
```

### Skulls

<example id="skulls"></example>

```ts
scene({
	camera: orbit({
		radius: value(3),
		offset: value(-0.3, -0.4),
		aperture: value(0.1)
	}),
	models: [
		model({
			shape: scale(value(10000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				spread: value(0.1),
				color: value(0.5),
				ambient: value(1)
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0.3)),
			material: material({
				color: value(0.5)
			})
		}),
		model({
			shape: repeat(value(1.3, 0, 1),
				rotateZ(value(-Math.PI / 4), skull())),
			material: material({
				smoothness: value(0.99),
				color: value(0.4, 0.6, 0.8)
			})
		})
	]
})
```

### Kitchen

<example id="kitchen"></example>

```ts
scene({
	camera: orbit({
		radius: value(4),
		aperture: value(0.05),
		target: value(0, 0.6, 0),
		offset: value(0.2, -0.3)
	}),
	models: [
		model({
			shape: scale(value(1000),
				sphere()),
			material: spotlight({
				color: value(0.3),
				direction: value(1, 1, 1),
				spread: value(0.01),
				ambient: value(0.5, 0.6, 0.9)
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0.002)),
			material: material({
				color: value(0.3, 0.35, 0.35),
				smoothness: value(0),
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0.001)),
			material: material({
				transmittance: value(0.9),
				smoothness: value(0.95),
				refraction: value(1.1)
			})
		}),
		model({
			shape: plane(value(0, 0, 1), value(1.58)),
			material: material({
				color: value(0.2)
			})
		}),
		model({
			shape: translate(value(0, 0.5, -2),
				union(
					repeat(value(2, 2, 0),
						smoothBox(
							value(1.95, 0.95, 0.9), 
							value(0.05))),
					translate(value(1, 1, 0),
						repeat(value(2, 2, 0),
							smoothBox(
								value(1.95, 0.95, 0.9), 
								value(0.05)))))),
			material: material({
				smoothness: value(0.5),
				color: value(0.8)
			})
		}),
		model({
			shape: translate(value(0.8, 0.5, 0.25),
				difference(
					smoothUnion(value(0.1),
						intersection(
							cylinder(),
							cube()),
						translate(value(0, 0, 0.5),
							rotateZ(value(Math.PI / 2),
								scale(value(0.5),
									torus())))),
					intersection(
						scale(value(0.9),
							cylinder()),
						plane(value(0, -1, 0), value(-0.4))))),
			material: material({
				color: value(1, 1, 0.99),
				smoothness: value(1),
				transmittance: value(0.9),
				refraction: value(1.5),
				scatter: value(0.01)
			})
		}),
		model({
			shape: translate(value(-0.8, 0.5, 0),
				difference(
					intersection(
						smoothUnion(value(0.6),
							translate(value(0, 0.5, 0),
								scale(value(0.9),
									sphere())),
							translate(value(0, -0.25, 0),
								scale(value(0.5),
									cube()))),
						plane(value(0, 1, 0), value(-0.5))),
					intersection(
						expand(value(-0.04),
							smoothUnion(value(0.6),
								translate(value(0, 0.5, 0),
									scale(value(0.9),
										sphere())),
								translate(value(0, -0.25, 0),
									scale(value(0.5),
										cube())))),
						plane(value(0, -1, 0), value(-0.4))))),
			material: material({
				transmittance: value(0.7),
				smoothness: value(1),
				refraction: value(1.9),
				color: value(0.97, 0.97, 0.99),
				scatter: value(1)
			})
		})
	]
})
```