[rayity](../README.md) > ["expression"](../modules/_expression_.md)



# External module: "expression"


Functionality related to managing GLSL expressions

## Index

### Interfaces

* [Expression](../interfaces/_expression_.expression.md)


### Type aliases

* [Code](_expression_.md#code)


### Functions

* [expression](_expression_.md#expression-1)
* [minNorm](_expression_.md#minnorm)
* [random](_expression_.md#random)
* [value](_expression_.md#value)
* [variable](_expression_.md#variable)



---
## Type aliases
<a id="code"></a>

###  Code

**Τ Code**:  *`string`* 

*Defined in [expression.ts:6](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L6)*



GLSL code




___


## Functions
<a id="expression-1"></a>

###  expression

► **expression**(body: *[Code](_expression_.md#code)*, dependencies?: *[Expression](../interfaces/_expression_.expression.md)[]*): [Expression](../interfaces/_expression_.expression.md)




*Defined in [expression.ts:23](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L23)*



Create an [Expression](../interfaces/_expression_.expression.md)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| body | [Code](_expression_.md#code)   |  - |
| dependencies | [Expression](../interfaces/_expression_.expression.md)[]   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="minnorm"></a>

###  minNorm

► **minNorm**(v: *[Expression](../interfaces/_expression_.expression.md)*): [Expression](../interfaces/_expression_.expression.md)




*Defined in [expression.ts:72](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L72)*



Minimum of x, y, and z components


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| v | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="random"></a>

###  random

► **random**(seed: *[Expression](../interfaces/_expression_.expression.md)*): [Expression](../interfaces/_expression_.expression.md)




*Defined in [expression.ts:67](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L67)*



A random value


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| seed | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="value"></a>

###  value

► **value**(x?: *`number`*, y?: *`number`*, z?: *`number`*): [Expression](../interfaces/_expression_.expression.md)




*Defined in [expression.ts:54](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L54)*



A constant-valued [Expression](../interfaces/_expression_.expression.md)


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| x | `number`  | 0 |   - |
| y | `number`  |  x |   - |
| z | `number`  |  y |   - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="variable"></a>

###  variable

► **variable**(name: *`string`*): [Expression](../interfaces/_expression_.expression.md)




*Defined in [expression.ts:62](https://github.com/gribbet/rayity/blob/master/src/expression.ts#L62)*



An expression which is equal to a named variable


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___


