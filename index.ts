import {
	camera,
	dodecahedron,
	material,
	model,
	Options,
	options,
	orbit,
	plane,
	scale,
	Scene,
	scene,
	sphere,
	spotlight,
	value,
	viewer,
} from 'rayity';

function example(id: string, scene: Scene, options: Options) {
	const element = <HTMLElement>document.querySelector(`example#${id}`);
	if (element === null)
		return;
	viewer(element, scene, options);
}

example("dodecahedron",
	scene({
		air: material({
			scatter: value(1000),
		}),
		camera: orbit({
			radius: value(2),
			aperture: value(0.1),
			target: value(0),
			offset: value(0.25, -0.5),
			fieldOfView: value(60 / 180 * Math.PI)
		}),
		models: [
			model({
				shape: scale(value(1000),
					sphere()),
				material: spotlight({
					color: value(1),
					direction: value(1, 1, 1),
					spread: value(0.05),
					ambient: value(0)
				})
			}),
			model({
				shape: plane(value(0, 1, 0), value(0.5)),
				material: material({
					color: value(0.5)
				})
			}),
			model({
				shape: dodecahedron(),
				material: material({
					color: value(0.7, 0.6, 0.5)
				})
			})
		]
	}), options({
		width: 512,
		height: 512,
		epsilon: 1e-4,
		steps: 100,
		bounces: 5,
		iterations: 1,
		cheapNormals: true,
		memory: 1
	}));

