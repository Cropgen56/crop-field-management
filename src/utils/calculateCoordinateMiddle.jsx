export const calculateCoordinateMiddle = (coords) => {
  const totalLat = coords.reduce((sum, point) => sum + point.lat, 0);
  const totalLng = coords.reduce((sum, point) => sum + point.lng, 0);
  const centroidLat = totalLat / coords.length;
  const centroidLng = totalLng / coords.length;
  return { latitude: centroidLat, longitude: centroidLng };
};
