[rayity](../README.md) > ["expression"](../modules/_expression_.md)



# External module: "expression"

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

*Defined in expression.ts:4*



GLSL Code




___


## Functions
<a id="expression-1"></a>

###  expression

► **expression**(body: *[Code](_expression_.md#code)*): [Expression](../interfaces/_expression_.expression.md)




*Defined in expression.ts:14*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| body | [Code](_expression_.md#code)   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="minnorm"></a>

###  minNorm

► **minNorm**(x: *[Expression](../interfaces/_expression_.expression.md)*): [Expression](../interfaces/_expression_.expression.md)




*Defined in expression.ts:58*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="random"></a>

###  random

► **random**(x: *[Expression](../interfaces/_expression_.expression.md)*): [Expression](../interfaces/_expression_.expression.md)




*Defined in expression.ts:54*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Expression](../interfaces/_expression_.expression.md)   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___

<a id="value"></a>

###  value

► **value**(x?: *`number`*, y?: *`number`*, z?: *`number`*): [Expression](../interfaces/_expression_.expression.md)




*Defined in expression.ts:43*



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




*Defined in expression.ts:50*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string`   |  - |





**Returns:** [Expression](../interfaces/_expression_.expression.md)





___


