import moment from 'moment'

import ParkingSpot from "./parking-spot";

class VehicleParking extends ParkingSpot {
    constructor (entryPoint, slots, occupiedSlot) {
        super(entryPoint, slots, occupiedSlot)
        this.parkedVehicles = []
    }

    conRatetimeCalculator(exitTime, entryTime) {
        const then = moment(exitTime).format("DD/MM/YYYY HH:mm:ss");
        const now = moment(entryTime).format("DD/MM/YYYY HH:mm:ss");

        const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        const d = moment.duration(ms);
        const time = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        const array = time.split(":");

        // const timeFloatInt = parseFloat(`${array[0]}.${array[1]}`)
        let roundedTime = array[1];
        if (array[0] >= 1) {
            roundedTime = (60 * array[0]) + array[1]
        }
        
        return parseInt(roundedTime)
    }

    park(vehicleSize, entryTime, plateNumber, prevParkedVehicle) {
        let newData
        const occupied = this.occupiedSlot;

        const prevVehicleData = prevParkedVehicle.filter(e => e.plateNumber === plateNumber)
        let conRate = false
        let conRateTime = prevVehicleData.length > 0 ? this.conRatetimeCalculator(prevVehicleData[0].exitTime, entryTime) : 0

        if (prevParkedVehicle.length > 0 && conRateTime <= 60) {
            conRate = true
        }
        
        
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
                        entryPoint: this.entryPoint,
                        prevExitTime: conRate ? prevVehicleData[0].exitTime : '',
                        overallDurationParked: conRate ? prevVehicleData[0].overallDurationParked : ''
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