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

    timeCalculator() {
        let parkDetail = this.occupiedSlot.filter(e => e.slotNum === this.id)

        const then = moment(parkDetail[0].entryTime).format("DD/MM/YYYY HH:mm:ss");
        const now = moment(this.exitTime).format("DD/MM/YYYY HH:mm:ss");

        const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
        const d = moment.duration(ms);
        const time = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        const array = time.split(":");
        const timeFloatInt = parseFloat(`${array[0]}.${array[1]}`)

        return timeFloatInt
    }

    calculateFee() {
        const timeParked = this.timeCalculator(this.id, this.exitTime)
        if (timeParked <= 3) {
            this.fee = 40
        } else if (timeParked === 24) {
            this.fee = 5000 
        }
        return
    }
}

export default ParkingFee;