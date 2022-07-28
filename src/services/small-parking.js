import ParkingFee from "./parking-fee";

class SmallParking extends ParkingFee {
    calculateFee(currentVehicleInfo) {
        const vehicleRate = 20
        
        super.calculateParkRate(vehicleRate, currentVehicleInfo)
    }
}

export default SmallParking;