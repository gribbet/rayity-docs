



## Index

### Interfaces

* [Camera](interfaces/camera.md)
* [Expression](interfaces/expression.md)
* [Material](interfaces/material.md)
* [Model](interfaces/model.md)
* [Options](interfaces/options.md)
* [Renderer](interfaces/renderer.md)
* [Scene](interfaces/scene.md)
* [Shape](interfaces/shape.md)


### Type aliases

* [Code](#code)


### Functions

* [Octohedron](#octohedron)
* [box](#box)
* [build](#build)
* [camera](#camera)
* [choose](#choose)
* [createRenderer](#createrenderer)
* [createViewer](#createviewer)
* [cube](#cube)
* [cylinder](#cylinder)
* [difference](#difference)
* [dodecahedron](#dodecahedron)
* [expand](#expand)
* [expression](#expression)
* [intersection](#intersection)
* [material](#material)
* [max](#max)
* [minNorm](#minnorm)
* [mirror](#mirror)
* [model](#model)
* [modulate](#modulate)
* [offset](#offset)
* [options](#options)
* [orbit](#orbit)
* [plane](#plane)
* [random](#random)
* [repeat](#repeat)
* [rotate](#rotate)
* [rotateX](#rotatex)
* [rotateY](#rotatey)
* [rotateZ](#rotatez)
* [scale](#scale)
* [scene](#scene)
* [shape](#shape)
* [sierpinski](#sierpinski)
* [skull](#skull)
* [smoothBox](#smoothbox)
* [smoothDifference](#smoothdifference)
* [smoothIntersection](#smoothintersection)
* [smoothUnion](#smoothunion)
* [sphere](#sphere)
* [spheroid](#spheroid)
* [spotlight](#spotlight)
* [stretch](#stretch)
* [tetrahedron](#tetrahedron)
* [torus](#torus)
* [translate](#translate)
* [tree](#tree)
* [truchet](#truchet)
* [twistX](#twistx)
* [twistY](#twisty)
* [twistZ](#twistz)
* [union](#union)
* [unit](#unit)
* [value](#value)
* [variable](#variable)
* [wrapX](#wrapx)
* [zero](#zero)



---
# Type aliases
<a id="code"></a>

###  Code

**Τ Code**:  *`string`* 

*Defined in expression.ts:4*



GLSL Code




___


# Functions
<a id="octohedron"></a>

###  Octohedron

► **Octohedron**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:61*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="box"></a>

###  box

► **box**(dimensions: *[Expression](interfaces/expression.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:274*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dimensions | [Expression](interfaces/expression.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="build"></a>

###  build

► **build**(scene: *[Scene](interfaces/scene.md)*, options: *[Options](interfaces/options.md)*): [Code](#code)




*Defined in build.ts:160*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| scene | [Scene](interfaces/scene.md)   |  - |
| options | [Options](interfaces/options.md)   |  - |





**Returns:** [Code](#code)





___

<a id="camera"></a>

###  camera

► **camera**(values?: *`undefined`⎮object*): [Camera](interfaces/camera.md)




*Defined in camera.ts:12*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Camera](interfaces/camera.md)





___

<a id="choose"></a>

###  choose

► **choose**(x: *[Expression](interfaces/expression.md)*, shapes: *[Shape](interfaces/shape.md)[]*): [Shape](interfaces/shape.md)




*Defined in shape.ts:338*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| shapes | [Shape](interfaces/shape.md)[]   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="createrenderer"></a>

###  createRenderer

► **createRenderer**(gl: *`WebGLRenderingContext`*, scene: *[Scene](interfaces/scene.md)*, options: *[Options](interfaces/options.md)*, variables?: *`undefined`⎮object*): object




*Defined in renderer.ts:9*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| gl | `WebGLRenderingContext`   |  - |
| scene | [Scene](interfaces/scene.md)   |  - |
| options | [Options](interfaces/options.md)   |  - |
| variables | `undefined`⎮object   |  - |





**Returns:** object





___

<a id="createviewer"></a>

###  createViewer

► **createViewer**(element: *`HTMLElement`*, scene: *[Scene](interfaces/scene.md)*, options?: *[Options](interfaces/options.md)*): `undefined`⎮`null`




*Defined in viewer.ts:5*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `HTMLElement`   |  - |
| scene | [Scene](interfaces/scene.md)   |  - |
| options | [Options](interfaces/options.md)   |  - |





**Returns:** `undefined`⎮`null`





___

<a id="cube"></a>

###  cube

► **cube**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:50*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="cylinder"></a>

###  cylinder

► **cylinder**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:96*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="difference"></a>

###  difference

► **difference**(a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:153*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="dodecahedron"></a>

###  dodecahedron

► **dodecahedron**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:75*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="expand"></a>

###  expand

► **expand**(k: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:186*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="expression"></a>

###  expression

► **expression**(body: *[Code](#code)*): [Expression](interfaces/expression.md)




*Defined in expression.ts:14*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| body | [Code](#code)   |  - |





**Returns:** [Expression](interfaces/expression.md)





___

<a id="intersection"></a>

###  intersection

► **intersection**(a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:145*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="material"></a>

###  material

► **material**(values?: *`undefined`⎮object*): [Material](interfaces/material.md)




*Defined in material.ts:12*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Material](interfaces/material.md)





___

<a id="max"></a>

###  max

► **max**(a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:122*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="minnorm"></a>

###  minNorm

► **minNorm**(x: *[Expression](interfaces/expression.md)*): [Expression](interfaces/expression.md)




*Defined in expression.ts:58*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |





**Returns:** [Expression](interfaces/expression.md)





___

<a id="mirror"></a>

###  mirror

► **mirror**(n: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:255*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| n | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="model"></a>

###  model

► **model**(values?: *`undefined`⎮object*): [Model](interfaces/model.md)




*Defined in model.ts:12*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Model](interfaces/model.md)





___

<a id="modulate"></a>

###  modulate

► **modulate**(x: *[Expression](interfaces/expression.md)*, a: *function*, buffer?: *[Expression](interfaces/expression.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:320*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)  | - |   - |
| a | function  | - |   - |
| buffer | [Expression](interfaces/expression.md)  |  value(0.01) |   - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="offset"></a>

###  offset

► **offset**(x: *function*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:260*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | function   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="options"></a>

###  options

► **options**(values?: *`undefined`⎮object*): [Options](interfaces/options.md)




*Defined in options.ts:13*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Options](interfaces/options.md)





___

<a id="orbit"></a>

###  orbit

► **orbit**(values?: *`undefined`⎮object*): [Camera](interfaces/camera.md)




*Defined in camera.ts:32*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Camera](interfaces/camera.md)





___

<a id="plane"></a>

###  plane

► **plane**(normal: *[Expression](interfaces/expression.md)*, offset: *[Expression](interfaces/expression.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:28*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| normal | [Expression](interfaces/expression.md)   |  - |
| offset | [Expression](interfaces/expression.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="random"></a>

###  random

► **random**(x: *[Expression](interfaces/expression.md)*): [Expression](interfaces/expression.md)




*Defined in expression.ts:54*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |





**Returns:** [Expression](interfaces/expression.md)





___

<a id="repeat"></a>

###  repeat

► **repeat**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:132*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="rotate"></a>

###  rotate

► **rotate**(axis: *[Expression](interfaces/expression.md)*, x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:229*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| axis | [Expression](interfaces/expression.md)   |  - |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="rotatex"></a>

###  rotateX

► **rotateX**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:208*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="rotatey"></a>

###  rotateY

► **rotateY**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:215*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="rotatez"></a>

###  rotateZ

► **rotateZ**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:222*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="scale"></a>

###  scale

► **scale**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:111*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="scene"></a>

###  scene

► **scene**(values?: *`undefined`⎮object*): [Scene](interfaces/scene.md)




*Defined in scene.ts:12*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `undefined`⎮object   |  - |





**Returns:** [Scene](interfaces/scene.md)





___

<a id="shape"></a>

###  shape

► **shape**(call: *function*): [Shape](interfaces/shape.md)




*Defined in shape.ts:7*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| call | function   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="sierpinski"></a>

###  sierpinski

► **sierpinski**(iterations?: *`number`*, a?: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:281*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| iterations | `number`  | 5 |   - |
| a | [Shape](interfaces/shape.md)  |  tetrahedron() |   - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="skull"></a>

###  skull

► **skull**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:365*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="smoothbox"></a>

###  smoothBox

► **smoothBox**(dimensions: *[Expression](interfaces/expression.md)*, radius: *[Expression](interfaces/expression.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:264*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dimensions | [Expression](interfaces/expression.md)   |  - |
| radius | [Expression](interfaces/expression.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="smoothdifference"></a>

###  smoothDifference

► **smoothDifference**(k: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:181*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="smoothintersection"></a>

###  smoothIntersection

► **smoothIntersection**(k: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:176*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="smoothunion"></a>

###  smoothUnion

► **smoothUnion**(k: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:171*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="sphere"></a>

###  sphere

► **sphere**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:23*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="spheroid"></a>

###  spheroid

► **spheroid**(x: *function*): [Shape](interfaces/shape.md)




*Defined in shape.ts:118*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | function   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="spotlight"></a>

###  spotlight

► **spotlight**(options: *object*): [Material](interfaces/material.md)




*Defined in material.ts:30*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | object   |  - |





**Returns:** [Material](interfaces/material.md)





___

<a id="stretch"></a>

###  stretch

► **stretch**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:127*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="tetrahedron"></a>

###  tetrahedron

► **tetrahedron**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:40*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="torus"></a>

###  torus

► **torus**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:101*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="translate"></a>

###  translate

► **translate**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:106*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="tree"></a>

###  tree

► **tree**(iterations?: *`number`*): [Shape](interfaces/shape.md)




*Defined in shape.ts:294*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| iterations | `number`  | 8 |   - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="truchet"></a>

###  truchet

► **truchet**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:347*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="twistx"></a>

###  twistX

► **twistX**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:193*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="twisty"></a>

###  twistY

► **twistY**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:198*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="twistz"></a>

###  twistZ

► **twistZ**(x: *[Expression](interfaces/expression.md)*, a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:203*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](interfaces/expression.md)   |  - |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="union"></a>

###  union

► **union**(a: *[Shape](interfaces/shape.md)*, b: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:137*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](interfaces/shape.md)   |  - |
| b | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="unit"></a>

###  unit

► **unit**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:18*





**Returns:** [Shape](interfaces/shape.md)





___

<a id="value"></a>

###  value

► **value**(x?: *`number`*, y?: *`number`*, z?: *`number`*): [Expression](interfaces/expression.md)




*Defined in expression.ts:43*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| x | `number`  | 0 |   - |
| y | `number`  |  x |   - |
| z | `number`  |  y |   - |





**Returns:** [Expression](interfaces/expression.md)





___

<a id="variable"></a>

###  variable

► **variable**(name: *`string`*): [Expression](interfaces/expression.md)




*Defined in expression.ts:50*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** [Expression](interfaces/expression.md)





___

<a id="wrapx"></a>

###  wrapX

► **wrapX**(a: *[Shape](interfaces/shape.md)*): [Shape](interfaces/shape.md)




*Defined in shape.ts:246*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](interfaces/shape.md)   |  - |





**Returns:** [Shape](interfaces/shape.md)





___

<a id="zero"></a>

###  zero

► **zero**(): [Shape](interfaces/shape.md)




*Defined in shape.ts:13*





**Returns:** [Shape](interfaces/shape.md)





___


