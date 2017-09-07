import {
	camera,
	dodecahedron,
	material,
	model,
	Options,
	options,
	orbit,
	plane,
	Scene,
	scene,
	sphere,
	spotlight,
	value, rotateY, expression, scale, translate,
	viewer, cube, intersection, difference, stretch, skull, cylinder, smoothBox
} from 'rayity/lib';

function example(id: string, scene: Scene, options: Options) {
	const element = <HTMLElement>document.querySelector(`example#${id}`);
	if (element === null)
		return;
	viewer(element, scene, options);
}

example("basic", scene({
	camera: orbit({
		radius: value(2),
		offset: value(-0.2, -0.5)
	}),
	models: [
		model({
			shape: scale(value(10000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				color: value(0.25),
				ambient: value(1)
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0.5)),
			material: material({
				color: value(0.5)
			})
		}),
		model({
			shape: cube(),
			material: material({
				color: value(0.8, 0.9, 0.0)
			})
		})
	]
}), options({
	width: 256,
	height: 256,
	epsilon: 1e-4,
	steps: 100,
	bounces: 40,
	iterations: 2,
	cheapNormals: true,
	gamma: 2
}));

example("cornell", scene({
	camera: orbit({
		radius: value(7),
		fieldOfView: value(45 / 180 * Math.PI),
	}),
	models: [
		model({
			shape: plane(value(0, -1, 0), value(2))
		}),
		model({
			shape: plane(value(0, 1, 0), value(2))
		}),
		model({
			shape: plane(value(0, 0, 1), value(2))
		}),
		model({
			shape: plane(value(1, 0, 0), value(2)),
			material: material({
				color: value(1, 0.5, 0.5)
			})
		}),
		model({
			shape: plane(value(-1, 0, 0), value(2)),
			material: material({
				color: value(0.5, 1, 0.5)
			})
		}),
		model({
			shape: translate(value(0, 1.999, 0),
				intersection(
					scale(value(2.5), cylinder()),
					plane(value(0, -1, 0), value(0)))),
			material: material({
				emissivity: value(1, 0.80, 0.65)
			})
		}),
		model({
			shape: translate(value(-0.2, -1.5, 1),
				sphere()),
			material: material({
				color: value(0.8, 0.8, 1),
				smoothness: value(0.9999),
				transmittance: value(0.9),
				refraction: value(1.4)
			})
		}),
		model({
			shape: translate(value(1, -1, -0.5),
				rotateY(value(0.5),
					smoothBox(value(1, 2, 1), value(0.6)))),
			material: material({
				color: value(1, 0.9, 0.8),
				smoothness: value(0.999)
			})
		}),
		model({
			shape: translate(value(-1, -1.5, -0.8),
				rotateY(value(0.8), cube())),
			material: material({
				color: value(0.7)
			})
		})
	]
}), options({
	width: 256,
	height: 256,
	epsilon: 1e-4,
	steps: 30,
	bounces: 10,
	iterations: 2,
	cheapNormals: true,
	gamma: 3
}));

example("dodecahedron",
	scene({
		air: material({
			color: value(1)
		}),
		camera: orbit({
			radius: value(1.4),
			aperture: value(0.1),
			target: value(0),
			offset: value(0.25, -0.5),
			fieldOfView: value(60 / 180 * Math.PI)
		}),
		models: [
			model({
				shape: translate(value(0, 70, 0),
					scale(value(100),
						sphere())),
				material: material({
					color: value(0),
					emissivity: value(1)
				})
			}),
			model({
				shape: rotateY(expression(`0.1 * time`),
					dodecahedron()),
				material: material({
					color: value(1.0)
				})
			})
		]
	}), options({
		width: 128,
		height: 128,
		epsilon: 1e-3,
		steps: 80,
		bounces: 2,
		iterations: 4,
		cheapNormals: true,
		memory: 0.95,
	}));

