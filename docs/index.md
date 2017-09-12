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