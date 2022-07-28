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
        const roundedTime = array[1] > 39 ? (array[0] === 23 ? 0 : ++array[0]) : array[0];
        
        return parseInt(roundedTime)
    }

    getRegularRate(timeParked, vehicleRate) {
        if (timeParked <= 3) {
            this.fee = 40
        } else if (timeParked === 24) {
            this.fee = 5000 
        } else {
            if (timeParked < 24) {
                this.fee = ((timeParked - 3) * vehicleRate) + 40 
            } else {
                if (timeParked % 24 === 0) {
                    const dayCount = timeParked/24
                    this.fee = 5000 * dayCount
                } else {
                    const remainder = timeParked % 24
                    const days = timeParked - remainder
                    const dayCount = days/24

                    this.fee = (remainder * vehicleRate) + (dayCount * 5000)
                }
                
            }
        }
    }

    getConRatePerDay(timeParked, vehicleRate, totalConHour) {
        // const remainder = totalConHour % 24
        const remainder = timeParked % 24
        let days = timeParked - remainder
        if (remainder > timeParked) {
            days = remainder - timeParked
        }
        console.log('remainder', remainder)
        if ((days % 24) > 0) {
            console.log('here', timeParked % 24)
            if ((timeParked % 24) === 0) {
                days = timeParked
            } else {
                days = timeParked - (timeParked % 24)
            }
        }
        console.log('daysaaaa', days)
        const dayCount = days/24

        this.fee = (remainder * vehicleRate) + (dayCount * 5000)
    }

    calculateParkRate(vehicleRate, currentVehicleInfo) {
        const timeParked = this.timeCalculator(this.id, this.exitTime)
        console.log('timeParked', timeParked)
        this.timeDuration = timeParked

        if (currentVehicleInfo.prevExitTime) { // Check if con rate
            const totalConHour = timeParked + currentVehicleInfo.overallDurationParked
            console.log('totalConHour', totalConHour)
            if (totalConHour <= 3) {
                this.fee = 40
            } else if (totalConHour === 24) {
                this.fee = 5000 
            } else {
                console.log('ELSESEEE')
                if (totalConHour < 24) {
                    this.fee = (timeParked * vehicleRate)
                } else {
                    console.log('ELSSEE!11', totalConHour % 24)
                    if (totalConHour % 24 === 0) {
                        const dayCount = timeParked/24

                        if (timeParked % 24 === 0) {
                            this.fee = 5000 * dayCount
                        } else {
                            if (timeParked < 24) {
                                this.fee = timeParked * vehicleRate
                            } else {
                                console.log('ellsssee!222')
                                // Get con rate per 24 hours
                                this.getConRatePerDay(timeParked, vehicleRate, totalConHour)
                            }
                        }
                    } else {
                        if (timeParked < 24) {
                            this.fee = timeParked * vehicleRate
                        } else {
                            console.log('ellsssee!222')
                            // Get con rate per 24 hours
                            this.getConRatePerDay(timeParked, vehicleRate, totalConHour)
                        }
                    }
                }
            }
        } else {
            // Regular Rate
            this.getRegularRate(timeParked, vehicleRate)
        }
        
        return
    }
}

export default ParkingFee;