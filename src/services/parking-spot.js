class ParkingSpot {
    constructor (entryPoint, slots, occupiedSlot) {
        this.entryPoint = entryPoint
        this.slots = slots
        this.occupiedSlot = occupiedSlot
    }

    getParkedVehicles() {
        return this.occupiedSlot;
    }
}

export default ParkingSpot;