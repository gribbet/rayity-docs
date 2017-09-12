import {
	box,
	camera,
	cube,
	cylinder,
	difference,
	dodecahedron,
	expression,
	intersection,
	material,
	model,
	octohedron,
	Options,
	options,
	orbit,
	plane,
	repeat,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	scene,
	Scene,
	shape,
	Shape,
	sierpinski,
	skull,
	smoothBox,
	sphere,
	spotlight,
	stretch,
	tetrahedron,
	torus,
	translate,
	tree,
	truchet,
	value,
	viewer,
	Viewer,
} from 'rayity';

interface Example {
	readonly start: () => void;
	readonly stop: () => void;
}

function example(id: string, scene: Scene, options?: Options): Example | null {
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
		steps: 100,
		bounces: 5,
		iterations: 1,
		cheapNormals: false,
		gamma: 1.0
	}))
}

simpleExample("sphere", sphere());
simpleExample("tetrahedron", scale(value(0.75), tetrahedron()));
simpleExample("cube", cube());
simpleExample("octohedron", octohedron());
simpleExample("dodecahedron", dodecahedron());
simpleExample("cylinder", scale(value(0.5), cylinder()));
simpleExample("torus", torus());
simpleExample("repeat", scale(value(0.25), repeat(value(2, 0, 2), cube())));
simpleExample("smoothBox", smoothBox(value(1.5, 1, 1), value(0.25)));
simpleExample("box", box(value(1, 0.5, 0.5)));
simpleExample("sierpinski", scale(value(0.75), sierpinski()));
simpleExample("tree", scale(value(0.5), tree()));
simpleExample("skull", rotateZ(value(-Math.PI / 4), skull()));

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
	epsilon: 1e-5,
	steps: 100,
	bounces: 10,
	stepFactor: 0.5,
	iterations: 2,
	cheapNormals: true,
	gamma: 3
}));

example("simple", scene({
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
	]
}), options({}));

example("truchet", scene({
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
				color: value(0.25)
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
}), options({}));
