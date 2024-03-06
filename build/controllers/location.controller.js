"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewLocationService = void 0;
const AddNewLocationService = (dependencies) => async (req, res) => {
    try {
        const { user, body } = req;
        const { pincode, shippingChange } = body;
        if (pincode == null || shippingChange == null)
            return res.status(400).json({ status: "MISSING_ARG", message: "missing pincode or shipping charge" });
        const addedLocation = dependencies.addNewLocation(pincode, shippingChange);
        if (!addedLocation) {
            return res.status(400).json({ status: "LOCATION_ADD_ERROR", message: "error on adding new location" });
        }
        return res.status(200).json({ status: "SUCCESS", message: "New Location Added" });
    }
    catch (err) {
        return res.status(400).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.AddNewLocationService = AddNewLocationService;
//# sourceMappingURL=location.controller.js.map