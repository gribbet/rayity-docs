"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rayity_1 = require("rayity");
rayity_1.createViewer(document.body, rayity_1.scene({
    air: rayity_1.material({
        scatter: rayity_1.value(1000),
    }),
    camera: rayity_1.orbit({
        fieldOfView: rayity_1.value(60 / 180 * Math.PI),
        distance: rayity_1.value(2),
        aperture: rayity_1.value(0.1),
        target: rayity_1.value(0),
        offset: rayity_1.value(0.25, -0.5)
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
//# sourceMappingURL=index.js.map