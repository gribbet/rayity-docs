[rayity](../README.md) > ["options"](../modules/_options_.md) > [OptionsOptions](../interfaces/_options_.optionsoptions.md)



# Interface: OptionsOptions


Rendering configuration


## Properties
<a id="bounces"></a>

### «Optional» bounces

**●  bounces**:  *`undefined`⎮`number`* 

*Defined in [options.ts:64](https://github.com/gribbet/rayity/blob/master/src/options.ts#L64)*



Total light bounces

Default: 8




___

<a id="cheapnormals"></a>

### «Optional» cheapNormals

**●  cheapNormals**:  *`undefined`⎮`true`⎮`false`* 

*Defined in [options.ts:83](https://github.com/gribbet/rayity/blob/master/src/options.ts#L83)*



Use cheaper normal calculation

Default: false




___

<a id="epsilon"></a>

### «Optional» epsilon

**●  epsilon**:  *`undefined`⎮`number`* 

*Defined in [options.ts:52](https://github.com/gribbet/rayity/blob/master/src/options.ts#L52)*



A value close to 0

Default: 1e-5




___

<a id="gamma"></a>

### «Optional» gamma

**●  gamma**:  *`undefined`⎮`number`* 

*Defined in [options.ts:96](https://github.com/gribbet/rayity/blob/master/src/options.ts#L96)*



Scene gamma for exposure adjustment

Default: 2.2




___

<a id="height"></a>

### «Optional» height

**●  height**:  *`undefined`⎮`number`* 

*Defined in [options.ts:46](https://github.com/gribbet/rayity/blob/master/src/options.ts#L46)*



Render target height in pixels

Default: 256




___

<a id="iterations"></a>

### «Optional» iterations

**●  iterations**:  *`undefined`⎮`number`* 

*Defined in [options.ts:70](https://github.com/gribbet/rayity/blob/master/src/options.ts#L70)*



Iterations per frame

Default: 1




___

<a id="memory"></a>

### «Optional» memory

**●  memory**:  *`undefined`⎮`number`* 

*Defined in [options.ts:77](https://github.com/gribbet/rayity/blob/master/src/options.ts#L77)*



Percentage of scene that remains after each iteration. Use a value less than 1 for an animated scene

Default: 1




___

<a id="stepfactor"></a>

### «Optional» stepFactor

**●  stepFactor**:  *`undefined`⎮`number`* 

*Defined in [options.ts:90](https://github.com/gribbet/rayity/blob/master/src/options.ts#L90)*



Step factor used to determine rate or raymarching advancement. 0 to 1\. Smaller numbers can reduce artifacts.

Default: 0.9




___

<a id="steps"></a>

### «Optional» steps

**●  steps**:  *`undefined`⎮`number`* 

*Defined in [options.ts:58](https://github.com/gribbet/rayity/blob/master/src/options.ts#L58)*



Raymarching iteration count

Default: 100




___

<a id="width"></a>

### «Optional» width

**●  width**:  *`undefined`⎮`number`* 

*Defined in [options.ts:40](https://github.com/gribbet/rayity/blob/master/src/options.ts#L40)*



Render target width in pixels

Default: 256




___


