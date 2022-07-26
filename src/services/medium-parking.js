import ParkingFee from "./parking-fee";

class MediumParking extends ParkingFee {
    calculateFee() {
        const vehicleRate = 60
        
        super.calculateParkRate(vehicleRate)
    }
}

export default MediumParking;