const hooked = require('../../dist').default;

const noop = () => {};
const props = { foo: 'bar', xpto: 123 };

describe('handle props', () => {
  it('passes received props to the component', () => {
    const result = hooked(noop)(noop)(props);
    expect(result.props).toEqual(props);
  });

  it("overwrites props with hook's return attributes", () => {
    const hook = () => ({ foo: 'xpto' });

    const result = hooked(hook)(noop)(props);

    expect(result.props).toEqual({
      xpto: 123,
      foo: 'xpto',
    });
  });
});

describe('args extractor', () => {
  it('passthru props when unset', () => {
    const hook = receivedProps => {
      expect(receivedProps).toEqual(props);
    };

    hooked(hook)(noop)(props);
  });

  it('receives given props as arguments', () => {
    const func = args => {
      expect(args).toEqual(props);
    };

    hooked(noop, func)(noop)(props);
  });

  it('returns values to hook as args', () => {
    const func = () => props;
    const hook = args => {
      expect(args).toEqual(props);
    };

    hooked(hook, func)(noop)();
  });
});

describe('hook', () => {
  it('receives args from extractor', () => {
    const func = () => props;
    const hook = args => {
      expect(args).toEqual(props);
    };

    hooked(hook, func)(noop)();
  });

  it('return values as component props', () => {
    const hook = () => props;

    const result = hooked(hook)(noop)();

    expect(result.props).toEqual(props);
  });
});
