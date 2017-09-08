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
	value, rotateY, expression, scale, translate, Viewer, Shape,
	viewer, cube, intersection, difference, stretch, skull, cylinder, smoothBox
} from 'rayity/lib';

interface Example {
	readonly start: () => void;
	readonly stop: () => void;
}

function example(id: string, scene: Scene, options: Options): Example | null {
	const element = <HTMLElement>document.querySelector(`example#${id}`);
	if (element === null)
		return null;


	let view: Viewer | null = null;
	let example: Example = {
		start: () => {
			if (view !== null)
				return
			view = viewer(element, scene, options);
		},
		stop: () => {
			if (view === null)
				return;
			view.stop();
		}
	};

	element.addEventListener("click", () =>
		example.start());

	return example;
}

function simpleExample(id: string, shape: Shape) {
	return example(id, scene({
		camera: orbit({
			radius: value(2.5),
			offset: value(-0.2, -0.5),
			fieldOfView: value(45 / 180 * Math.PI)
		}),
		models: [
			model({
				shape: scale(value(10000), sphere()),
				material: spotlight({
					direction: value(1, 1, 0),
					spread: value(0.25),
					color: value(0.25),
					ambient: value(1)
				})
			}),
			model({
				shape: shape,
				material: material({
					color: value(0.8, 0.9, 0.1)
				})
			})
		]
	}), options({
		width: 128,
		height: 128,
		epsilon: 1e-4,
		steps: 50,
		bounces: 4,
		iterations: 1,
		cheapNormals: false,
		gamma: 1.0
	}))
}

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
	width: 512,
	height: 512,
	epsilon: 1e-4,
	steps: 50,
	bounces: 10,
	iterations: 2,
	cheapNormals: true,
	gamma: 3
}));

simpleExample("dodecahedron", dodecahedron());
simpleExample("cube", cube());

