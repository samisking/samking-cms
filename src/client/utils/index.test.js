import {
  sortByKey,
  debounce,
  omit,
  shallowEqual
} from '.';

describe('sortByKey()', () => {
  it('should sort an array of object by key', () => {
    const things = [
      { age: 30 },
      { age: 40 },
      { age: 30 },
      { age: 20 },
      { age: 10 }
    ];

    const sortedThings = things.sort(sortByKey('age'));

    expect(sortedThings[0].age).toEqual(10);
    expect(sortedThings[1].age).toEqual(20);
    expect(sortedThings[2].age).toEqual(30);
    expect(sortedThings[3].age).toEqual(30);
    expect(sortedThings[4].age).toEqual(40);
  });
});

describe('debounce()', () => {
  it('should debounce a function call', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const debounced = debounce(callback, 200);
    const debouncedNoTime = debounce(callback);

    // Call our debounced functions
    debounced();
    debouncedNoTime();

    // Our callback shouldn't have been called yet
    expect(callback).not.toBeCalled();

    // Now run the mocked timers
    jest.runAllTimers();

    // And things should have been called
    expect(callback).toBeCalled();
    expect(setTimeout).toBeCalled();
    expect(setTimeout.mock.calls[0][1]).toEqual(200);
    expect(setTimeout.mock.calls[1][1]).toEqual(1);
  });
});

describe('omit()', () => {
  it('should omit keys from an object', () => {
    const input = {
      foo: 'bar',
      baz: 'wtf'
    };

    const expected = {
      baz: 'wtf'
    };

    expect(omit(input, 'foo')).toEqual(expected);
  });
});

describe('shallowEqual()', () => {
  it('should correctly compare two objects', () => {
    const input = {
      foo: 'bar',
      baz: 'wtf'
    };

    expect(shallowEqual(input, input)).toBeTruthy();
    expect(shallowEqual(input, { foo: 'bar', baz: 'wtf' })).toBeTruthy();

    expect(shallowEqual(input, 'whoops')).toBeFalsy();
    expect(shallowEqual(input, { wow: 'bar', baz: 'wtf' })).toBeFalsy();
  });
});
