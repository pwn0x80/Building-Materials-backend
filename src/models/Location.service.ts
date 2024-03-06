import Location from "./Location.model"
export const addNewLocation = async(pincode:number, shippingCharge:number)=>{
  try{
    const locationModel = new Location({
      pincode:pincode,
      shippingCharge:shippingCharge

    })
    const created = await locationModel.save(); 
    if(!created){
      return false;
    }
    return true;

//db
  }catch(err:any){
    throw err;
  }
}
