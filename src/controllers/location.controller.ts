import { Request, Response } from "express"
export const AddNewLocationService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const {user,body} = req;
    const {pincode,shippingChange} = body;
    if(pincode==null|| shippingChange==null) return res.status(400).json({status:"MISSING_ARG",message:"missing pincode or shipping charge"})
    const addedLocation =  dependencies.addNewLocation(pincode,shippingChange);
    if(!addedLocation){
      return res.status(400).json({status:"LOCATION_ADD_ERROR",message:"error on adding new location"})
    }
    return res.status(200).json({status:"SUCCESS", message:"New Location Added"})

  } catch (err: any) {
    return res.status(400).json({ status: "error", message: "Internal Server Error" })
  }
}
