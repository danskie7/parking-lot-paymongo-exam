import ParkingFee from "./parking-fee";

class SmallParking extends ParkingFee {
    calculateFee() {
        const vehicleRate = 20
        
        super.calculateParkRate(vehicleRate)
    }
}

export default SmallParking;