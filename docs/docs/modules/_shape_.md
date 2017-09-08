[rayity](../README.md) > ["shape"](../modules/_shape_.md)



# External module: "shape"


Module for creating shape distance functions

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




*Defined in [shape.ts:326](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L326)*



A box with aritrary dimensions


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dimensions | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="choose"></a>

###  choose

► **choose**(x: *[Expression](../interfaces/_expression_.expression.md)*, shapes: *[Shape](../interfaces/_shape_.shape.md)[]*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:398](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L398)*



Choose a shape randomly


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




*Defined in [shape.ts:72](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L72)*



<example id="tetrahedron"></example>

Cube of width 1




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="cylinder"></a>

###  cylinder

► **cylinder**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:124](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L124)*



Cylinder of diameter 1 along the (0, 1, 0) axis




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="difference"></a>

###  difference

► **difference**(a: *[Shape](../interfaces/_shape_.shape.md)*, b: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:190](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L190)*



The difference of two [Shape](../interfaces/_shape_.shape.md)s


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




*Defined in [shape.ts:103](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L103)*



<example id="dodecahedron"></example>

Dodecahedron with circumscribed diameter of 1.




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="expand"></a>

###  expand

► **expand**(k: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:227](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L227)*



Expand a [Shape](../interfaces/_shape_.shape.md) by distance `k`


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




*Defined in [shape.ts:181](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L181)*



The intersection of two [Shape](../interfaces/_shape_.shape.md)s


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




*Defined in [shape.ts:154](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L154)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="mirror"></a>

###  mirror

► **mirror**(normal: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:304](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L304)*



Mirror a [Shape](../interfaces/_shape_.shape.md)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| normal | [Expression](../interfaces/_expression_.expression.md)   |  - |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="modulate"></a>

###  modulate

► **modulate**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *function*, buffer?: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:379](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L379)*



[repeat](_shape_.md#repeat) where the repetition index can be used to generate the [Shape](../interfaces/_shape_.shape.md)


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




*Defined in [shape.ts:84](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L84)*



Octohedron with circumscribed diameter of 1




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="offset"></a>

###  offset

► **offset**(x: *function*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:310](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L310)*



Offset a [Shape](../interfaces/_shape_.shape.md)


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




*Defined in [shape.ts:40](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L40)*



Plane given a `normal` and `offset`


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




*Defined in [shape.ts:166](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L166)*



Repeat a [Shape](../interfaces/_shape_.shape.md) with repetition factor `x`


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




*Defined in [shape.ts:277](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L277)*



Rotate a [Shape](../interfaces/_shape_.shape.md) about an arbitrary axis


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




*Defined in [shape.ts:253](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L253)*



Rotate a [Shape](../interfaces/_shape_.shape.md) about the x-axis


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




*Defined in [shape.ts:261](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L261)*



Rotate a [Shape](../interfaces/_shape_.shape.md) about the y-axis


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




*Defined in [shape.ts:269](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L269)*



Rotate a [Shape](../interfaces/_shape_.shape.md) about the z-axis


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




*Defined in [shape.ts:142](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L142)*



Scale a [Shape](../interfaces/_shape_.shape.md) by `x`


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




*Defined in [shape.ts:15](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L15)*



Create a [Shape](../interfaces/_shape_.shape.md)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| call | function   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="sierpinski"></a>

###  sierpinski

► **sierpinski**(iterations?: *`number`*, a?: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:338](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L338)*



<example id="sierpinski"></example>

A sierpinksi fractal


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




*Defined in [shape.ts:427](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L427)*



Skull




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="smoothbox"></a>

###  smoothBox

► **smoothBox**(dimensions: *[Expression](../interfaces/_expression_.expression.md)*, radius: *[Expression](../interfaces/_expression_.expression.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:315](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L315)*



A box with rounded corners


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




*Defined in [shape.ts:221](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L221)*



Smooth difference


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




*Defined in [shape.ts:215](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L215)*



Smooth intersection


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




*Defined in [shape.ts:209](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L209)*



Smooth union


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




*Defined in [shape.ts:34](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L34)*



Sphere of diameter 1




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="spheroid"></a>

###  spheroid

► **spheroid**(x: *function*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:150](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L150)*



Variable radius sphere with radius calculcated using `x`


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | function   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="stretch"></a>

###  stretch

► **stretch**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:160](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L160)*



Stretch a [Shape](../interfaces/_shape_.shape.md)


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




*Defined in [shape.ts:57](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L57)*



<example id="tetrahedron"></example>

Tetrahedron with circumscribed diameter of 1




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="torus"></a>

###  torus

► **torus**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:130](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L130)*



Torus with outer diameter of 1, inner radius of 0.1




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="translate"></a>

###  translate

► **translate**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:136](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L136)*



Move a [Shape](../interfaces/_shape_.shape.md) by `x`


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




*Defined in [shape.ts:352](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L352)*



A recursive tree [Shape](../interfaces/_shape_.shape.md)


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| iterations | `number`  | 8 |   - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="truchet"></a>

###  truchet

► **truchet**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:408](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L408)*



Truchet




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="twistx"></a>

###  twistX

► **twistX**(x: *[Expression](../interfaces/_expression_.expression.md)*, a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:235](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L235)*



Twist a [Shape](../interfaces/_shape_.shape.md) along the x-axis


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




*Defined in [shape.ts:241](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L241)*



Twist a [Shape](../interfaces/_shape_.shape.md) along the y-axis


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




*Defined in [shape.ts:247](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L247)*



Twist a [Shape](../interfaces/_shape_.shape.md) along the z-axis


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




*Defined in [shape.ts:172](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L172)*



The union of two [Shape](../interfaces/_shape_.shape.md)s


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




*Defined in [shape.ts:28](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L28)*



Unit distance function




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="wrapx"></a>

###  wrapX

► **wrapX**(a: *[Shape](../interfaces/_shape_.shape.md)*): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:295](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L295)*



Wrap a [Shape](../interfaces/_shape_.shape.md) about the x-axis


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | [Shape](../interfaces/_shape_.shape.md)   |  - |





**Returns:** [Shape](../interfaces/_shape_.shape.md)





___

<a id="zero"></a>

###  zero

► **zero**(): [Shape](../interfaces/_shape_.shape.md)




*Defined in [shape.ts:22](https://github.com/gribbet/rayity/blob/master/src/shape.ts#L22)*



Null distance function




**Returns:** [Shape](../interfaces/_shape_.shape.md)





___


