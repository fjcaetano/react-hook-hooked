react-hook-hooked [![Build Status][1]](https://travis-ci.org/fjcaetano/react-hook-hooked) [![codecov][2]](https://codecov.io/gh/fjcaetano/react-hook-hooked) [![npm][3]](https://www.npmjs.com/package/react-hook-hooked)
---

A nifty little HOC to add hooks to your React components.

# Installation

We recommend installing using `yarn`:
```sh
$ yarn add react-hook-hooked
```

Or, if you prefer `npm`:
```sh
$ npm -S react-hook-hooked
```

# Usage

`hooked` is a high order component that receives as arguments the hook to be attached to the
component and an optional function to extract the hook's arguments from the component's props.

### A simple hook that receives no arguments

```jsx
const myHook = () => ({
  handleButtonPress: onCallback(() => {
    // do something
    console.log(title);
  }, [title]),
});

const MyComponent = ({ title, handleButtonPress }) => (
  <button onClick={handleButtonPress}>{title}</button>
);

export default hooked(myHook)(MyComponent);
```

### If you have a hook that receives arguments

```jsx
const myHook = (title) => ({
  title,
  handleButtonPress: onCallback(() => {
    // do something
    console.log(title);
  }, [title]),
});

const MyComponent = ({ title, handleButtonPress }) => (
  <button onClick={handleButtonPress}>{title}</button>
);

export default hooked(myHook, ({ name }) => name)(MyComponent);
```

When you use MyComponent and set its props, the function passed as the second argument to `hooked`
will extract the hook's args from the component's props:

```jsx
<MyComponent title='foobar' />
```

### Caveat

If you're using Typescript ❤️ in your project, your component will have to receive a union of the
component's props and the hook's return type:

```ts
type Props = { title: string };

// This is an union with Props, since it returns the received `title` as an attribute
type Hooked = Props & { handleButtonPress: () => void };

const myHook = (title: string): Hooked => ({
  title,
  handleButtonPress: onCallback(() => {
    // do something
    console.log(title);
  }, [title]),
});

const MyComponent = ({ title, handleButtonPress }: Hooked) => (
  <button onClick={handleButtonPress}>{title}</button>
);

export default hooked<Props, Hooked>(myHook, ({ name }: Props) => name)(MyComponent);
```

This way, externally your MyComponent will expect only `title` as its props. By default, `hooked`'s
extractor is a passthru function that sends the received props to the hook.


[1]: https://travis-ci.org/fjcaetano/react-hook-hooked.svg?branch=master
[2]: https://codecov.io/gh/fjcaetano/react-hook-hooked/branch/master/graph/badge.svg
[3]: https://img.shields.io/npm/v/react-hook-hooked
