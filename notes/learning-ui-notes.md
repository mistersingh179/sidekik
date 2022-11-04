# Flex

## `display:flex`

- creates an element which is block like to rest of the page
- its children are flexible though
- https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox

## `flex-direction`

- `flex-direction` applied on the container
- defaults to `row` which sets x axis to the main axis and y to cross axis
- the other option is `column`, which makes the y axis the main axis
- we can also do reverse by doing `column-reverse`, `row-reverse`

## `flex-grow`

- `flex-grow` says that the item should grow and take all available space
- and value of `flex-grow` determines how much it should take in comparison to other items which grow
- without `flex-grow` items sit at their default value which is `default` by default and is also set by `basis`
- if you `grow` or its opposite `shrink` items, then you **can't** put `space-between` them, `justify-content` them etc.

## `align-items`

- `align-items` works on the cross axis
- it defaults to `stretch`, so items take all space on cross axis
- it can be set to `center`, `flex-start` & `flex-end` to decide how it is positioned on cross axis
- this will also make it not take all space & now its width, grow & basis are important
- it is written on the container
- it is positioning the items inside the container

## `justify-content`

- `justify-content` works on the main axis
- it defaults to `flex-start`, putting all items right in the beginning
- it can be set to `flex-end`, `center`, `space-around`, `space-between`, `space-evenly`
- written on the container

## `flex-wrap`

- `flex-wrap` to decide what to do with things which don't fit on main axis
- added on container of flex items
- defaults to `nowrap`, and can be set to `wrap` & `wrap-reverse`
- now items will take at least their `width` and the overflowing items which don't fit will go to next line
- these now have spacing between them by using `margin` on the items

## `flex-basis`

- it is like the starting width of the item from a wraping point of view
- defined on the item
- width starts at that point and then it can grow & then shrink
- if it is going less than specified as basis then it will be overflow & wrap

# ChakraUI

## `Center`, `Square` & `Circle`

- `center` puts its children right in the center, here the center element itself can have any width & height
- `square` does the same but is itself a square
- `circle` also does the same but is itself a circle
- under the hood is using a `flex` box

## `Container`

- it is a div, with a `maxWidth` prop whose value decides max width of the container
- the remainder of space turns in to blank space equally on eac side
- so if we set it to 1280px or `container.xl` then our content is centered with width of 1280px, and we have white gutters on the side.
- it has `centerContent` prop to further center its children.
- this done with `flex-direction` of `column` and then `align-items` of `center`

## `Flex`

- It makes a `div` with `flex-direction` of `row`
- has shorthands for all standard flex properties like `align-items` becomes `align`
- it supports a **`spacer`** in between its items. this puts space between the items.
- the `spacer` is working by adding a new empty item with `flex-grow` of `1` which will make an empty item than take up all available space as the other items have `flex-grow` of 0.
- with `flex` and `spacer` items take entire space of flex container with equal space between them
-

## Sizes

- pixel values is 4 times the size values.
- default theme size values are here: https://chakra-ui.com/docs/styled-system/theme#sizes

## `Stack`, `HStack` & `VStack`

- like flex to stack elements either horizontally or vertically
- they support a **`spacing`** prpperty, which puts the same specified space between each item.
- unlike `Flex`, which has `spacer`, in `Stack` elements don't use up all the space, they are just spaced at the amount specified.
- internally it is using `margin` between elements to space them
- `stack` has `direction` which can be changed responsively between `row` & `column`
- supports `divider` component to place a react element between each item

## `SimpleGrid`

- allows dividing the space in to rows & columns
- we can define the `columns` or let it auto do it by specifying `minChildWidth`
- we can also define `columnGap` or `spacingY` & `rowGap`or `spacingX`
- in a grid, the starting point of each item is consistent, but the gap between the items is not.
- in `flex` with `spacer`we can do even gap between them, but this means starting point is not the same for all
- and in `HStack` we can the same fixed amount space between them, and this means they wont event take all available space.
- can accept `GridItem` as children which support `colSpan` property

## `Wrap`

- it lays out items with spacing between them and then wraps them to the next line when they overflow
- it supports `spacing` prop to give fixed space between items. behinds the scene is adding `margin` for you
- it is a flex box with direction row internally with wrap set.

## `FormControl`

- they are the containers for a single form input setup
- it can have `FormLabel`, `input/select` etc., `FormHelperText` & `FormErrorMessage`
- it has property like `isRequired`, `isInvalid` which show different items.

## `useColorModeValue` & `useColorMode` hooks

- `useColorMode` hook give us fn to toggle & see mode value
- `useColorModeValue` allows us to give light & dark values & gives us correct value based on current mode.
- `mode` takes light & dark values and then props ang gives back current value basedon current mode

## responsive styles

- any style prop can be given multiple values and it will take the value depending upon its width & the breakpoint value
- `w={[100,200,300]}` here we have 3 width values for sm, md & large+ breakpoints
- there is also a `useBreakpointValue` hook to get custom value back depending on current width & breakpoints value
- `const w = useBreakpointValue({base: 100, lg: 200})`
- this has 2 values, first for sm & md, then second for large+ breakpoints
- `base` here is anything which is not defined.

## styling props

- we can mention styles as properties on a component
- the prop name has shorthand names as well
- e.g. a prop can be `mt` or `marginTop`
- the value of the prop can be actual css value which in this case is like `mt={'10px'}`
- or the value can be value in the theme object accessed via dot-notation and starting the with the theme-key of this item
- in this case `mt` has theme-key of `space` so it can values from `theme.space` and we have a `theme.space.4` whose value is `1rem`
- so we cna do `mt={'4'}` and it is putting in `1rem` for us which is about 16px
- or lets says prop `fontFamily` which has theme-key of `fonts`, so we can access values from there and out in `fontFamily={'mono'}` where `mono` has value of `Menlo, monospace`
- default theme is here: https://chakra-ui.com/docs/styled-system/theme
- all style props are here: https://chakra-ui.com/docs/styled-system/style-props

## custom theme elements

- all data in the theme object can be extended
- `extendTheme` takes in new keys with values with which to extend defaul theme
- the resulting object can then be provided to the `chakraProvider`
- it also gives hooks to change default color scheme, variant, props & size. we can specify new values and which components take them
- components can also be individually over-written here. each component page has link to theme source which lets us find defaults.

## icons

- we have `Icon` to show icon itself
- then we have `IconButton` which has `icon` property
- we also have `Button` which has `leftIcon` & `rightIcon` property
- and then other components like `MenuButton` can be composed `as` an `IconButton` or `Button` and their properties can then be used to define the icon

## render prop

- using a function as the `children` of a component
- then that function gets `props`
- this can have state of the component
- e.g. `MenuButton` which gives `isOpen`

## Menu

- it has a `MenuButton` which is shown on top, which can be composed `as` a `Button`
- it `isOpen` in its `props` to its `children`

## Accordion

- multiple items grouped with heading
- has `Accordion` as top container which has state & takes props like `showMultiple`, `allowToggle`
- then each item is `AccordionItem` which has a `AccordionButton` & `AccordionPanel`
- logic is there that icon will flip on open/close
- logic is there that clicking in button of an item shows that item's panel.
- internal state of an `AccordionItem` can be accssed by using render prop.
- so we make its `children` a function which gets `props` which has `isExpanded` & `isDisabled`

## `useDisclosure` hook

- gives these 2 sets of props – `getButtonProps` & `getDisclosureProps`
- put `getButtonProps` on the button which does show/hide. this will internally add `onClick` on it and put in state
- then put `getDisclosureProps` on the item to be shown/hidden. this will add propery `hidden` so it acts as per state
- also gives prop - `isOpen` which gives true/false for state of shown/hidden and defaults to false
- also gives props - `onToggle` which can be called manually on click to change state of shown/hidden

## transition

- container element for the thing to shown/hidden via transition
- `in` prop will trigger the transition
- the transition is applied both times first when `in` is `true` and then again when `in` is `false`
- just surround what ever should get transition with a `Fade`, `ScaleFade` etc. and update its `in` prop.
- e.g.
```
const [show, updateShow] = useState(false);
useEffect(() => {
    const handler = setInterval(() => {
      updateShow((prev) => !prev);
    }, 1000);
    return () => window.clearInterval(handler)
});
```
above we are changing `show` between true & false every 1 second
```
<ScaleFade in={show} initialScale={0.1}>
    <Heading bg={"yellow.300"}>Contract Functions</Heading>
</ScaleFade>
```
and now the heading scales up and fades up and then scales down & fades down every 1 second

## gradient
- apply `bgGradient={"linear(to-r, pink.400, pink.600)"}` to change background color from 400 to 600
- this changes toward right

## `highlight`

- this component can be used to contain any text
- it has `query` prop takes words we want to add special styles to via the `style` prop
- the `styles` prop takes object of style props like `bg`, `color` with values like `green.200`
- not this is `styles` & not `style`

# react-dropzone

## `getRootProps`
- this goes on an outside container
- pass the props you want on the container as json to this so that they don't override what its props
e.g here the onClick will override 
```
<div {...getRootProps} onClick=()=>{} >
</div>
```
so do this instead
```
<div {...getRootProps({onClick: () => {}})}>
</div>
```


# Gotchas

### margin on child moves parent down

- Adding Margin-top to the child when its parent is empty, will make their which is empty will have their margins collapse.
- this moves the parent down with the child.
- solution is to add some content to the parent, like a border or something, so it can't collapse
- https://stackoverflow.com/questions/1762539/margin-on-child-element-moves-parent-element

### marginTop on elements inside a VStack dont work

- correct, because VStack has its own `spacing` prop which is defining the margin
- solution is to either not use VStack & use Flex instead
- or solution is to define another VStack inside with different `spacing`
- or solution is to use padding instead of margin
- sometimes padding can't be used on element as it has background-color, then surround it with another `Box` and put padding on Box
- https://github.com/chakra-ui/chakra-ui/issues/2578

### containing an image in a div

- the div needs to have some size
- then the image needs to take up that much size by doing 100%, inherit or having the same numbers
- now image is restricted to that size of div
- then we can use `object-fit` to further decide how much of that div is used
- e.g. `fill` will take whole div & `contain` will take as much as it can while maintaining aspect ratio
- so in `chakra` we can give the image a `boxSize` and then follow that with a `objectFit` to make it be a certain size.
- also in `chakra` image be default has a `max-width` of `100%` so we can just put it in a container which has size.

### on hover change color scheme for background, show items etc.

### show hide things responsively

- use the `display` property and then responsive array for different values for breakpoints
- so `display={{ base: 'flex', md: 'none' }` saying show only on small screens
- and `display={{ base: 'none', md: 'flex' }}` says show on bigger screen
- use `Show` & `Hide` component to show things at different breakpoints
- so `Show above='md'` shows on big screens
- and `Hide above='md'` hides on big screens

### child items are coming over each other when in flex container
- if any item has `width` or `maxWidth` then it will try for that space and then we page decreases in size, the item without the width will come over it
- solution is to not add `width` or `maxWidth`
- but without a `width` they take all space, and then I can't do `justify-content: space-between` to add space between them
- instead specify `flex-basis` and now it starts with that much space & therefore there can be `space-between` and it can decrease in size if window decreases in size
- `flex-basis` of `min-content` will do the trick.

### more chakra ui components & templates?
- https://github.com/chakra-ui/awesome-chakra-ui#-projects

### why `vh` when centering content?
- want to center something
- easy do `VStack` with `justifyContent` set to `center`
- but the outside flex container needs to have height of the screen so that then we can center
- this is where we can make the container be `100vh`
- '100%' aka `full` won't work as our content is less than full screen
- i mean if content wasn't less than space on screen, then what's the point of centering.

### `input`, `select` elements are taking all the available width
- yes, because they have `width: 100%` on them
- solution is to set width to a number or `auto`
- or put them inside a `Box` then they take space offered by `Box`
- and the space of `Box` maybe controlled by Flex rules

### menu dropdown is behind input right icon elements
- https://github.com/chakra-ui/chakra-ui/issues/5742
- the elements have `z-index` of 2, so the menuList needs more.