# table

## table-layout
- made `tableLayout` to be `fixed` so inputs and outputs always get good size
- otherwise the outputs were taking more space and squeezing inputs
- this became apparent when inputs were replaced with dropdowns, 
- and we had no input boxes left to take space

## column width
- made middle function column have width of 300px. 
- this way input & output can get more
- used 300px as the text box has max width of 200 and then wraps
- using 300px only on big screens. smaller screen auto, as on small screen 300 is too much.

## run function text max width
- on large screens 200
- on small screens 100