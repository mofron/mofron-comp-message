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
<require>
    <tag module="mofron-comp-message">Message</tag>
</require>

<script>
msg.visible(true);
</script>

<Message name=msg fixpos="right","bottom" timer=3>
    message
</Message>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | fixpos | string ["left"/"center"/"right"] | horizonal position |
| | | string ["top"/"center"/"bottom"] | vertical position |
| | x_fixpos | string ["left"/"center"/"right"] | horizonal fixed position |
| | y_fixpos | string ["top"/"center"/"bottom"] | vertical fixed position |
| | offset | string (size) | position offset, default is "0.5rem" |
| | closeVisible | boolean | true: visible close component <default> |
| | | | false: invisible close component  |
| | closeComp | component | replacement close component |
| | timer | number | display message timer |

