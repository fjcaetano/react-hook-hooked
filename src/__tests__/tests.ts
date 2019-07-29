import hooked from '..';

const noop: any = jest.fn(() => {});
const props: any = { foo: 'bar', xpto: 123 };

describe('handle props', () => {
  it('passes received props to the component', () => {
    const result = hooked(noop)(noop)(props);
    expect(result.props).toEqual(props);
  });

  it("overwrites props with hook's return attributes", () => {
    const hook = jest.fn(() => ({ foo: 'xpto' }));

    const result = hooked(hook)(noop)(props);

    expect(hook).toHaveBeenCalled();
    expect(result.props).toEqual({
      xpto: 123,
      foo: 'xpto',
    });
  });
});

describe('args extractor', () => {
  it('passthru props when unset', () => {
    const hook = jest.fn(receivedProps => {
      expect(receivedProps).toEqual(props);
    });

    hooked(hook)(noop)(props);

    expect(hook).toHaveBeenCalled();
  });

  it('receives given props as arguments', () => {
    const func = jest.fn(args => {
      expect(args).toEqual(props);
    });

    hooked(noop, func)(noop)(props);

    expect(func).toHaveBeenCalled();
  });

  it('returns values to hook as args', () => {
    const func = jest.fn(() => props);
    const hook = jest.fn(args => {
      expect(args).toEqual(props);
    });

    hooked(hook, func)(noop)({});

    expect(hook).toHaveBeenCalled();
    expect(func).toHaveBeenCalled();
  });
});

describe('hook', () => {
  it('receives args from extractor', () => {
    const func = jest.fn(() => props);
    const hook = jest.fn(args => {
      expect(args).toEqual(props);
    });

    hooked(hook, func)(noop)({});

    expect(hook).toHaveBeenCalled();
    expect(func).toHaveBeenCalled();
  });

  it('return values as component props', () => {
    const hook = jest.fn(() => props);

    const result = hooked(hook)(noop)({});

    expect(result.props).toEqual(props);
    expect(hook).toHaveBeenCalled();
  });
});
