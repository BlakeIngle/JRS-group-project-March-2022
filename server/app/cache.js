var cache = {};

exports.save = (key, dish, data, duration) => {
  cache[key + dish] = data;
  setTimeout(
    () => {
      delete cache[key];
    },
    duration && duration < 85000 ? duration : 85000
  ); // about 23.6 hours max
};

exports.get = (key, dish) => {
  return cache[key + dish];
};
