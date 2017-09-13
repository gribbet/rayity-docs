import {
	box,
	camera,
	cube,
	cylinder,
	difference,
	dodecahedron,
	expand,
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
	smoothIntersection,
	smoothUnion,
	sphere,
	spotlight,
	stretch,
	tetrahedron,
	torus,
	translate,
	tree,
	truchet,
	twistX,
	union,
	value,
	viewer,
	Viewer,
} from 'rayity/lib';

interface Example {
	readonly start: () => void;
	readonly stop: () => void;
}

function example(id: string, scene: Scene, _options?: Options): Example | null {
	const element = <HTMLElement>document.querySelector(`example#${id}`);
	if (element === null)
		return null;


	let view: Viewer | null = null;
	let example: Example = {
		start: () => {
			if (view !== null)
				return;
			view = viewer(element, scene, _options || options({}));
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
}));

example("scattering", scene({
	camera: orbit({
		radius: value(4),
		offset: value(0.25, -0.5)
	}),
	models: [
		model({
			shape: scale(value(10000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				spread: value(0.02),
				color: value(0.5),
				ambient: value(1)
			})
		}),
		model({
			shape: plane(value(0, 1, 0), value(0.5)),
			material: material({
				color: value(0.6)
			})
		}),
		model({
			shape: translate(value(-0.25, 0, -0.25),
				intersection(
					difference(
						scale(value(2), cylinder()),
						scale(value(1.5), cylinder())),
					plane(value(0, 1, 0), value(-0.1)))),
			material: material({
				color: value(0.8, 0.9, 0.1),
				scatter: value(0.1),
				transmittance: value(0.9),
				smoothness: value(1),
				refraction: value(1.5)
			})
		}),
		model({
			shape: translate(value(0.25, 0, 0.25),
				intersection(
					difference(
						scale(value(2), cylinder()),
						scale(value(1.5), cylinder())),
					plane(value(0, 1, 0), value(-0.1)))),
			material: material({
				color: value(0.8, 0.9, 0.1),
				transmittance: value(0.9),
				smoothness: value(1),
				refraction: value(1.5)
			})
		})
	]
}), options({
	bounces: 40,
	steps: 200,
	stepFactor: 0.5
}));

example("skulls", scene({
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
}), options({
	stepFactor: 0.6
}));

example("recursive", scene({
	air: material({
		scatter: value(1000)
	}),
	camera: orbit({
		radius: value(4),
		target: value(0, 0.3, 0),
		offset: value(-0.2, -0.2),
	}),
	models: [
		model({
			shape: scale(value(1000), sphere()),
			material: spotlight({
				direction: value(1, 1, 0),
				spread: value(0.05),
				color: value(0.5)
			})
		}),
		model({
			shape: translate(value(0, -0.5, 0),
				cube())
		}),
		model({
			shape: tree(),
			material: material({
				color: value(0.7, 0.9, 0.7)
			})
		})
	]
}), options({
	width: 512,
	height: 512,
	epsilon: 1e-5
}));

example("truchet", scene({
	camera: orbit({
		radius: value(1.5),
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
}));

example("kitchen", scene({
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
						smoothBox(value(1.95, 0.95, 0.9), value(0.1))),
					translate(value(1, 1, 0),
						repeat(value(2, 2, 0),
							smoothBox(value(1.95, 0.95, 0.9), value(0.1)))))),
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
}), options({
	bounces: 40,
}));

