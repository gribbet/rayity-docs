[rayity](../README.md) > ["options"](../modules/_options_.md) > [OptionsOptions](../interfaces/_options_.optionsoptions.md)



# Interface: OptionsOptions


Rendering configuration


## Properties
<a id="bounces"></a>

### «Optional» bounces

**●  bounces**:  *`undefined`⎮`number`* 

*Defined in [options.ts:60](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L60)*



Total light bounces

Default: 8




___

<a id="cheapnormals"></a>

### «Optional» cheapNormals

**●  cheapNormals**:  *`undefined`⎮`true`⎮`false`* 

*Defined in [options.ts:79](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L79)*



Use cheaper normal calculation

Default: false




___

<a id="epsilon"></a>

### «Optional» epsilon

**●  epsilon**:  *`undefined`⎮`number`* 

*Defined in [options.ts:48](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L48)*



A value close to 0

Default: 1e-5




___

<a id="gamma"></a>

### «Optional» gamma

**●  gamma**:  *`undefined`⎮`number`* 

*Defined in [options.ts:92](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L92)*



Scene gamma for exposure adjustment

Default: 2.2




___

<a id="height"></a>

### «Optional» height

**●  height**:  *`undefined`⎮`number`* 

*Defined in [options.ts:42](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L42)*



Render target height in pixels

Default: 256




___

<a id="iterations"></a>

### «Optional» iterations

**●  iterations**:  *`undefined`⎮`number`* 

*Defined in [options.ts:66](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L66)*



Iterations per frame

Default: 1




___

<a id="memory"></a>

### «Optional» memory

**●  memory**:  *`undefined`⎮`number`* 

*Defined in [options.ts:73](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L73)*



Percentage of scene that remains after each iteration. Use a value less than 1 for an animated scene

Default: 1




___

<a id="stepfactor"></a>

### «Optional» stepFactor

**●  stepFactor**:  *`undefined`⎮`number`* 

*Defined in [options.ts:86](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L86)*



Step factor used to determine rate or raymarching advancement. 0 to 1\. Smaller numbers can reduce artifacts.

Default: 0.9




___

<a id="steps"></a>

### «Optional» steps

**●  steps**:  *`undefined`⎮`number`* 

*Defined in [options.ts:54](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L54)*



Raymarching iteration count

Default: 100




___

<a id="width"></a>

### «Optional» width

**●  width**:  *`undefined`⎮`number`* 

*Defined in [options.ts:36](https://github.com/gribbet/rayity/blob/340dc71/src/options.ts#L36)*



Render target width in pixels

Default: 256




___


