import ParkingSpot from "./parking-spot";

class VehicleParking extends ParkingSpot {
    constructor (entryPoint, slots, occupiedSlot) {
        super(entryPoint, slots, occupiedSlot)
        this.parkedVehicles = []
    }

    park(vehicleSize, entryTime, plateNumber) {
        let newData
        const occupied = this.occupiedSlot;
        
        for (let i = 0; i <= 3; i++) {
            const slot = this.slots[i];
            let currentVehicleEntry = occupied.filter(e => e.entryPoint === this.entryPoint)
            let smallVehicleEntries = occupied.filter(e => e.vehicleSize === 0)
            let mediumVehicleEntries = occupied.filter(e => e.vehicleSize === 1)

            let currentVehicleSize = vehicleSize
            let occuppiedIndex = i
            let checkOccupiedSlot = false
            
            if (vehicleSize === 0) {
                if (smallVehicleEntries.length === 4 && mediumVehicleEntries.length !== 4) { // To Medium Parking
                    currentVehicleSize = currentVehicleSize + 1
                    occuppiedIndex = occuppiedIndex + 4
                } else if (smallVehicleEntries.length === 4 && mediumVehicleEntries.length <= 4) { // To Large Parking
                    currentVehicleSize = currentVehicleSize + 2
                    occuppiedIndex = occuppiedIndex + 8
                }
            } else if (vehicleSize === 1) {
                if (mediumVehicleEntries.length && mediumVehicleEntries.length === 4) { // To Large Parking
                    currentVehicleSize = currentVehicleSize + 1
                    occuppiedIndex = occuppiedIndex + 4
                }
            }

            if (occupied.length && slot[currentVehicleSize]) { // Check for the availability of occupied slot either SP, MP or LP
                checkOccupiedSlot = occupied.some(e => e.slotNum === slot[currentVehicleSize].slotNum)
            }

            if (
                occupied.length === 0 ||
                (!currentVehicleEntry[occuppiedIndex] ||
                    currentVehicleEntry[occuppiedIndex].slotNum !== slot[currentVehicleSize].slotNum)
            ) {
                if (!checkOccupiedSlot) {
                    newData = {
                        vehicleSize: currentVehicleSize,
                        parkingSize: slot[currentVehicleSize].slotSize,
                        slotNum: slot[currentVehicleSize].slotNum,
                        entryTime: entryTime,
                        plateNumber: plateNumber,
                        entryPoint: this.entryPoint
                    }
                    break;
                }
                
            }
        }
        let parkedVehiclesData = [...this.occupiedSlot]
        if (newData) {
            parkedVehiclesData = [...this.occupiedSlot, newData]
        }
        return this.parkedVehicles = parkedVehiclesData;
    }
}

export default VehicleParking;