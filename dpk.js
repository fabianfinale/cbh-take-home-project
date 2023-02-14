const crypto = require('crypto');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';

  return event
    ? event.partitionKey
      ? event.partitionKey
      : crypto
          .createHash('sha3-512')
          .update(JSON.stringify(event))
          .digest('hex')
    : TRIVIAL_PARTITION_KEY;
};
