"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewLocationService = void 0;
const location_controller_1 = require("../controllers/location.controller");
const Location_service_1 = require("../models/Location.service");
const addNewLocationServiceObj = {
    addNewLocation: Location_service_1.addNewLocation
};
const addNewLocationService = (0, location_controller_1.AddNewLocationService)(addNewLocationServiceObj);
exports.addNewLocationService = addNewLocationService;
//# sourceMappingURL=location.container.js.map