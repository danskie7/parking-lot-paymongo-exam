import ParkingFee from "./parking-fee";

class MediumParking extends ParkingFee {
    calculateFee(currentVehicleInfo) {
        const vehicleRate = 60
        
        super.calculateParkRate(vehicleRate, currentVehicleInfo)
    }
}

export default MediumParking;