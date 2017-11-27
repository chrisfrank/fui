# fui
future  
user  
interface

open-source React components from [The Future Project](http://www.thefutureproject.org/)

I bootstrapped this library with create-react-app. To run the examples, clone the repo, run `yarn`, `yarn start`, and browse to `http://localhost:3000`.

## Current components

### LayoutSize
*input*: an array of breakpoints in ems
*output* the index of largest matching breakpoint.
  
    <LayoutSize breakpoints={[32, 48, 64, 80]}>
      {(size = 0) => ({
        <YourThemeComponent size={size} />
      })
    </LayoutSize>      

### PanelTree
It’s the iPod’s nested menu UI, but for the web.
Can display as many simultaneous panels as you like.

    <PanelTree max={3}>
      {tree => (
        <Panel {...tree}>I am the first Panel</Panel>
        <Panel {...tree}>I am the second Panel</Panel>
      )}
    </PanelTree>


## TODO
- PanelTree
  - Write more examples:
    - Specifying props.ratio
    - Specifying props.max
    - Changing props.max via an array
    - changing color and bg
  - experiment with doing all transition work in react-motion
