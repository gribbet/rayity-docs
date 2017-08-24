import {
	camera,
	createViewer,
	dodecahedron,
	material,
	model,
	options,
	orbit,
	plane,
	scale,
	scene,
	sphere,
	spotlight,
	value,
} from 'rayity';


createViewer(
	document.body,
	scene({
		air: material({
			scatter: value(1000),
		}),
		camera: orbit({
			fieldOfView: value(60 / 180 * Math.PI),
			distance: value(2),
			aperture: value(0.1),
			target: value(0),
			offset: value(0.25, -0.5)
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

