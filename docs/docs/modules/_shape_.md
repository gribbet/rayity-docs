[rayity](../README.md) > ["shape"](../modules/_shape_.md)



# External module: "shape"

## Index

### Interfaces

* [Shape](../interfaces/_shape_.shape.md)


### Functions

* [box](_shape_.md#box)
* [choose](_shape_.md#choose)
* [cube](_shape_.md#cube)
* [cylinder](_shape_.md#cylinder)
* [difference](_shape_.md#difference)
* [dodecahedron](_shape_.md#dodecahedron)
* [expand](_shape_.md#expand)
* [intersection](_shape_.md#intersection)
* [max](_shape_.md#max)
* [mirror](_shape_.md#mirror)
* [modulate](_shape_.md#modulate)
* [octohedron](_shape_.md#octohedron)
* [offset](_shape_.md#offset)
* [plane](_shape_.md#plane)
* [repeat](_shape_.md#repeat)
* [rotate](_shape_.md#rotate)
* [rotateX](_shape_.md#rotatex)
* [rotateY](_shape_.md#rotatey)
* [rotateZ](_shape_.md#rotatez)
* [scale](_shape_.md#scale)
* [shape](_shape_.md#shape-1)
* [sierpinski](_shape_.md#sierpinski)
* [skull](_shape_.md#skull)
* [smoothBox](_shape_.md#smoothbox)
* [smoothDifference](_shape_.md#smoothdifference)
* [smoothIntersection](_shape_.md#smoothintersection)
* [smoothUnion](_shape_.md#smoothunion)
* [sphere](_shape_.md#sphere)
* [spheroid](_shape_.md#spheroid)
* [stretch](_shape_.md#stretch)
* [tetrahedron](_shape_.md#tetrahedron)
* [torus](_shape_.md#torus)
* [translate](_shape_.md#translate)
* [tree](_shape_.md#tree)
* [truchet](_shape_.md#truchet)
* [twistX](_shape_.md#twistx)
* [twistY](_shape_.md#twisty)
* [twistZ](_shape_.md#twistz)
* [union](_shape_.md#union)
* [unit](_shape_.md#unit)
* [wrapX](_shape_.md#wrapx)
* [zero](_shape_.md#zero)



---
## Functions
<a id="box"></a>

###  box

► **box**(dimensions: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:274](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L274)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dimensions | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="choose"></a>

###  choose

► **choose**(x: *[Expression](../interfaces/_expression_.expression.md)*, shapes: *[Shape](../interfaces/_shape_.shape.md)[]*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:338](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L338)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| shapes | [Shape](../interfaces/_shape_.shape.md)[]   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="cube"></a>

###  cube

► **cube**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:50](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L50)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="cylinder"></a>

###  cylinder

► **cylinder**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:96](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L96)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="difference"></a>

###  difference

► **difference**(a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:153](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L153)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="dodecahedron"></a>

###  dodecahedron

► **dodecahedron**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:75](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L75)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="expand"></a>

###  expand

► **expand**(k: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:186](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L186)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="intersection"></a>

###  intersection

► **intersection**(a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:145](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L145)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="max"></a>

###  max

► **max**(a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:122](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L122)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="mirror"></a>

###  mirror

► **mirror**(n: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:255](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L255)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| n | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="modulate"></a>

###  modulate

► **modulate**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *function*, buffer?: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:320](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L320)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)  | - |   - |
| a | function  | - |   - |
| buffer | [Expression](../interfaces/_expression_.expression.md)  |  value(0.01) |   - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="octohedron"></a>

###  octohedron

► **octohedron**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:61](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L61)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="offset"></a>

###  offset

► **offset**(x: *function*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:260](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L260)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | function   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="plane"></a>

###  plane

► **plane**(normal: *[Expression](../interfaces/_expression_.expression.md)*, offset: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:28](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L28)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| normal | [Expression](../interfaces/_expression_.expression.md)   |  - |
| offset | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="repeat"></a>

###  repeat

► **repeat**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:132](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L132)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="rotate"></a>

###  rotate

► **rotate**(axis: *[Expression](../interfaces/_expression_.expression.md)*, x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:229](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L229)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| axis | [Expression](../interfaces/_expression_.expression.md)   |  - |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="rotatex"></a>

###  rotateX

► **rotateX**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:208](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L208)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="rotatey"></a>

###  rotateY

► **rotateY**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:215](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L215)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="rotatez"></a>

###  rotateZ

► **rotateZ**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:222](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L222)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="scale"></a>

###  scale

► **scale**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:111](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L111)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="shape-1"></a>

###  shape

► **shape**(call: *function*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:7](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L7)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| call | function   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="sierpinski"></a>

###  sierpinski

► **sierpinski**(iterations?: *`number`*, a?: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:281](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L281)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| iterations | `number`  | 5 |   - |
| a | [Shape](../interfaces/_shape_.shape.md)  |  tetrahedron() |   - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="skull"></a>

###  skull

► **skull**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:365](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L365)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="smoothbox"></a>

###  smoothBox

► **smoothBox**(dimensions: *[Expression](../interfaces/_expression_.expression.md)*, radius: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:264](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L264)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dimensions | [Expression](../interfaces/_expression_.expression.md)   |  - |
| radius | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="smoothdifference"></a>

###  smoothDifference

► **smoothDifference**(k: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:181](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L181)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="smoothintersection"></a>

###  smoothIntersection

► **smoothIntersection**(k: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:176](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L176)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="smoothunion"></a>

###  smoothUnion

► **smoothUnion**(k: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:171](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L171)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| k | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="sphere"></a>

###  sphere

► **sphere**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:23](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L23)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="spheroid"></a>

###  spheroid

► **spheroid**(x: *function*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:118](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L118)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | function   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="stretch"></a>

###  stretch

► **stretch**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:127](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L127)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="tetrahedron"></a>

###  tetrahedron

► **tetrahedron**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:40](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L40)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="torus"></a>

###  torus

► **torus**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:101](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L101)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="translate"></a>

###  translate

► **translate**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:106](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L106)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="tree"></a>

###  tree

► **tree**(iterations?: *`number`*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:294](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L294)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| iterations | `number`  | 8 |   - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="truchet"></a>

###  truchet

► **truchet**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:347](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L347)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="twistx"></a>

###  twistX

► **twistX**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:193](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L193)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="twisty"></a>

###  twistY

► **twistY**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:198](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L198)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="twistz"></a>

###  twistZ

► **twistZ**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:203](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L203)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="union"></a>

###  union

► **union**(a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:137](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L137)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |
| b | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="unit"></a>

###  unit

► **unit**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:18](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L18)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="wrapx"></a>

###  wrapX

► **wrapX**(a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:246](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L246)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="zero"></a>

###  zero

► **zero**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:13](https://github.com/gribbet/rayity/blob/b9938d8/src/shape.ts#L13)*





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___


