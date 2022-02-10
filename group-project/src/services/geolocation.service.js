
function useGeolocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("got location")
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    (error) => {
      console.error(error);
      return null;
    }
  );
  console.log("location not returned")
}

export { useGeolocation };
