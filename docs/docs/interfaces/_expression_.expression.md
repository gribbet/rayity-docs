[rayity](../README.md) > ["expression"](../modules/_expression_.md) > [Expression](../interfaces/_expression_.expression.md)



# Interface: Expression


GLSL expression. May depend on other expression


## Properties
<a id="body"></a>

###  body

**●  body**:  *[Code](../modules/_expression_.md#code)* 

*Defined in [expression.ts:13](https://github.com/gribbet/rayity/blob/b9938d8/src/expression.ts#L13)*



GLSL code for the expression




___

<a id="dependencies"></a>

###  dependencies

**●  dependencies**:  *[Expression](_expression_.expression.md)[]* 

*Defined in [expression.ts:15](https://github.com/gribbet/rayity/blob/b9938d8/src/expression.ts#L15)*



Dependent expressions




___

<a id="id"></a>

###  id

**●  id**:  *`string`* 

*Defined in [expression.ts:11](https://github.com/gribbet/rayity/blob/b9938d8/src/expression.ts#L11)*



Unique hash for the expression




___

<a id="tostring"></a>

###  toString

**●  toString**:  *function* 

*Defined in [expression.ts:17](https://github.com/gribbet/rayity/blob/b9938d8/src/expression.ts#L17)*



toString to support generation through string templates

#### Type declaration
(): `string`


*Defined in [expression.ts:17](https://github.com/gribbet/rayity/blob/b9938d8/src/expression.ts#L17)*





**Returns:** `string`






___


