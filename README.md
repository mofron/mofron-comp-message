# mofron-comp-message
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

message component for mofron

it is a component for informing the user of the result and notification contents.

## Feature
 - display time can configure by "timer" parameter.
 - display position is easy to configure by "fixpos" parameter.
 - when the display position is set by "fixpos", the display position is fixed even if you scroll.
## Attention
 - default visible is false. it needs to be displayed by the javascript "visible" function

# Install
```
npm install mofron mofron-comp-message
```

# Sample
```html
<setting>
    <tag load="mofron-comp-message">Message</tag>
</setting>

<script run=after>
msg.visible(true);
</script>

<Message name=msg fixpos=("right","bottom") offset=("0.4rem","0.7rem")>message</Message>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | fixpos | string | horizonal position ["left"/"center"/"right"] |
| | | string | vertical position ["top"/"center"/"bottom"] |
| | xFixpos | string | horizonal fixed position ["left"/"center"/"right"] |
| | | | undefined: call as getter |
| | | string(size) | offset size (not required) |
| | yFixpos | string | vertical fixed position ["top"/"center"/"bottom"] |
| | | | undefined: call as getter |
| | | string(size) | offset size (not required) |
| | offset | string(size) | horizonal offset size |
| | | | undefined: call as getter |
| | | string(size) | vertical offset size |
| | closeComp | mofron.class.Component | replacement close component |
| | | | undefined: call as getter |
| | closePos | string | close position ('left', 'right') |
| | | | undefined: call as getter |
| | timer | number | display message timer [ms] |
| | | | undefined: call as getter |

