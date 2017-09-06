[rayity](../README.md) > ["expression"](../modules/_expression_.md) > [Expression](../interfaces/_expression_.expression.md)



# Interface: Expression


GLSL expression. May depend on other expression


## Properties
<a id="body"></a>

###  body

**●  body**:  *[Code](../modules/_expression_.md#code)* 

*Defined in [expression.ts:9](https://github.com/gribbet/rayity/blob/340dc71/src/expression.ts#L9)*



GLSL code for the expression




___

<a id="dependencies"></a>

###  dependencies

**●  dependencies**:  *[Expression](_expression_.expression.md)[]* 

*Defined in [expression.ts:11](https://github.com/gribbet/rayity/blob/340dc71/src/expression.ts#L11)*



Dependent expressions




___

<a id="id"></a>

###  id

**●  id**:  *`string`* 

*Defined in [expression.ts:7](https://github.com/gribbet/rayity/blob/340dc71/src/expression.ts#L7)*



Unique hash for the expression




___

<a id="tostring"></a>

###  toString

**●  toString**:  *function* 

*Defined in [expression.ts:13](https://github.com/gribbet/rayity/blob/340dc71/src/expression.ts#L13)*



toString to support generation through string templates

#### Type declaration
(): `string`


*Defined in [expression.ts:13](https://github.com/gribbet/rayity/blob/340dc71/src/expression.ts#L13)*





**Returns:** `string`






___


