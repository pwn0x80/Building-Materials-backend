import { AddNewLocationService } from "../controllers/location.controller"
import { addNewLocation } from "../models/Location.service"

const addNewLocationServiceObj = {
 addNewLocation 
}

const addNewLocationService= AddNewLocationService(addNewLocationServiceObj)

export {addNewLocationService}
