var cache = {};

exports.save = (key, data, duration) => {
  cache[key] = data;
  setTimeout(
    () => {
      delete cache[key];
    },
    duration && duration < 85000 ? duration : 85000
  ); // about 23.6 hours max
};

exports.get = (key) => {
  return cache[key];
};
