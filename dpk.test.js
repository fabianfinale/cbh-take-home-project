const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Returns a sha3-512 hash when given an event with a partition key as input', () => {
    const event = {
      foo: 'bar',
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe('string');
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns the event's partitionKey when given an event with a partition key as input", () => {
    const event = { partitionKey: 'qwerty' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('qwerty');
  });
});
