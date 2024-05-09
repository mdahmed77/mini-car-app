// api/vehicle
import {NextResponse} from "next/server"

import { insertVehicle, getAllVehicles } from '../../mockData';

export function POST(req){
  try{
    const { model, price, phone, city, no_of_copies, files } = req.body;

    // Mock insertion
    insertVehicle({ make, price, phone, city, no_of_copies, files });

    // Respond with success message
    return NextResponse.json({
      message: 'Vehicle inserted successfully'
    })
  }catch(error){
    return NextResponse.json(error)
  }
}
