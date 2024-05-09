// api/vehicle

import { insertVehicle, getAllVehicles } from '../../mockData';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { make, model, year } = req.body;

    // Mock insertion
    insertVehicle({ make, model, year });

    // Respond with success message
    res.status(200).json({ message: 'Vehicle inserted successfully.' });
  } else if (req.method === 'GET') {
    // Return all vehicles
    const vehicles = getAllVehicles();
    res.status(200).json(vehicles);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
