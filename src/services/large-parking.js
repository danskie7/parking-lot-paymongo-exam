import ParkingFee from "./parking-fee";

class LargeParking extends ParkingFee {
    calculateFee() {
        const vehicleRate = 100
        
        super.calculateParkRate(vehicleRate)
    }
}

export default LargeParking;