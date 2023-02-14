# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Original code was this:

```JavaScript
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

The original version had a lot of unnecessary code. If we take into account that a `SHA3-512` hash function generates a hash value that is 512 bits (64 bytes) long, represented as a hexadecimal string of 128 characters, and that its length is fixed and does not depend on the length of the input message or data, we can safely remove the `MAX_PARTITION_KEY_LENGTH` constant along with the last `if` clause (comparing the candidate length against `MAX_PARTITION_KEY_LENGTH`). Moreover, when an `encoding` argument is provided to the digest function, a string will always be returned, so we can remove the type assertion snippet. This would leave us with only three possible cases: calling the function with no given input, calling the function with any input, and calling the function with an object containing a `partitionKey` property as input. Consequently, this will allow us to remove any unnecessary variable declarations, since we can simply return whatever results from evaluating the input using JavaScript's ternary operators.
