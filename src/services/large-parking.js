import ParkingFee from "./parking-fee";

class LargeParking extends ParkingFee {
    calculateFee(currentVehicleInfo) {
        const vehicleRate = 100
        
        super.calculateParkRate(vehicleRate, currentVehicleInfo)
    }
}

export default LargeParking;