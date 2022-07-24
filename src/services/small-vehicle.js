import ParkingSpot from "./parking-spot";

class SmallVechicle extends ParkingSpot {
    constructor (entryPoint, slots, occupiedSlot) {
        super(entryPoint, slots, occupiedSlot)
        this.parkedVehicles = []
    }

    park(vehicleSize, entryTime, plateNumber) {
        let newData
        const occupied = this.occupiedSlot;
        
        for (let i = 0; i <= 3; i++) {
            const slot = this.slots[i];
            let smallVehicleRecord = occupied.filter(e => e.entryPoint === this.entryPoint)
            let smallVehicleEntries = occupied.filter(e => e.vehicleSize === 0)
            let mediumVehicleEntries = occupied.filter(e => e.vehicleSize === 1)

            let currentVehicleSize = vehicleSize
            let occuppiedIndex = i
            let checkOccupiedSlot = false

            if (smallVehicleEntries.length === 4 && mediumVehicleEntries.length !== 4) {
                currentVehicleSize = currentVehicleSize + 1
                occuppiedIndex = occuppiedIndex + 4
            } else if (smallVehicleEntries.length === 4 && mediumVehicleEntries.length <= 4) {
                currentVehicleSize = currentVehicleSize + 2
                occuppiedIndex = occuppiedIndex + 8
            }

            if (occupied.length && slot[currentVehicleSize]) {
                checkOccupiedSlot = occupied.some(e => e.slotNum === slot[currentVehicleSize].slotNum)
            }

            if (
                slot.some(e => e.slotSize === currentVehicleSize) && // Check for slot size if existing
                (occupied.length === 0 || (!smallVehicleRecord[occuppiedIndex] || smallVehicleRecord[occuppiedIndex].slotNum !== slot[currentVehicleSize].slotNum)) // Check if current slotNum if available/unavailable (Only on current entry point in occupied data)
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

export default SmallVechicle;