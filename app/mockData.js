// mockData.js

let vehicles = [];

export const insertVehicle = (vehicleData) => {
  vehicles.push(vehicleData);
};

export const getAllVehicles = () => {
  return vehicles;
};
