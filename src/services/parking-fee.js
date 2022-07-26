import moment from 'moment'

class ParkingFee {
    constructor (id, exitTime, occupiedSlot) {
        this.id = id
        this.exitTime = exitTime
        this.occupiedSlot = occupiedSlot
    }

    getFee() {
        return this.fee;
    }

    getTimeDuration() {
        return this.timeDuration;
    }

    timeCalculator() {
        let parkDetail = this.occupiedSlot.filter(e => e.slotNum === this.id)

        const then = moment(parkDetail[0].entryTime).format("DD/MM/YYYY HH:mm:ss");
        const now = moment(this.exitTime).format("DD/MM/YYYY HH:mm:ss");

        const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        const d = moment.duration(ms);
        const time = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        const array = time.split(":");

        // const timeFloatInt = parseFloat(`${array[0]}.${array[1]}`)
        const roundedTime = array[1] > 52 ? (array[0] === 23 ? 0 : ++array[0]) : array[0];
        
        return parseInt(roundedTime)
    }

    calculateParkRate(vehicleRate) {
        const timeParked = this.timeCalculator(this.id, this.exitTime)
        console.log('timeParked', timeParked)
        this.timeDuration = timeParked
        if (timeParked <= 3) {
            this.fee = 40
        } else if (timeParked === 24) {
            this.fee = 5000 
        } else {
            if (timeParked < 24) {
                this.fee = ((timeParked - 3) * vehicleRate) + 40 
            } else {
                this.fee = ((timeParked - 24) * vehicleRate) + 5000
            }
        }
        return
    }
}

export default ParkingFee;