const useGeolocation = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  // console.log(pos);
  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  };
};

export { useGeolocation };
