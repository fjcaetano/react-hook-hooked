import React from "react";

const passThru = <TArgs extends any>(args: TArgs) => args;

/**
 *
 * @param hook The React hook to be added to your component.
 * @param extractArgs An optional function to extract the hook arguments from the component's props.
 */
const hooked = <Props extends Object, HookRet, HookArgs = Props>(
  hook: (args: HookArgs) => HookRet,
  extractArgs: (props: Props) => HookArgs = passThru as any
) => (WrappedComponent: React.ComponentType<Props & HookRet>) => (
  props: Props
) => <WrappedComponent {...props} {...hook(extractArgs(props))} />;

export default hooked;
