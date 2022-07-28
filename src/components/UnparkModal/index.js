import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'

import SmallParking from "../../services/small-parking";
import MediumParking from "../../services/medium-parking";
import LargeParking from "../../services/large-parking";

import styles from "./styles.module.scss";

function UnparkModal(props) {
    const [smallParking, setSmallParking] = useState()
    const [mediumParking, setMediumParking] = useState()
    const [largeParking, setLargeParking] = useState()

    const currentVehicleInfo = props.occupiedSlot.filter(e => e.slotNum === props.parkId)

    const [state, setState] = useState({
        exitTime: new Date(),
    });

    useEffect(() => {
        if (currentVehicleInfo.length > 0) {
            setState({
                ...state,
                exitTime: currentVehicleInfo[0].entryTime
            })
        }
    }, [])

    useEffect(() => {
        setSmallParking(new SmallParking(props.parkId, state.exitTime, props.occupiedSlot));
        setMediumParking(new MediumParking(props.parkId, state.exitTime, props.occupiedSlot));
        setLargeParking(new LargeParking(props.parkId, state.exitTime, props.occupiedSlot));
    }, [state.exitTime]);

    const handleDateTime = (e) => {
        setState({
            ...state,
            exitTime: e,
        })
    }

    const handleCalculateFee = (currentVehicleInfo) => {
        if (currentVehicleInfo.parkingSize === 0) {
            smallParking.calculateFee(currentVehicleInfo)
        } else if (currentVehicleInfo.parkingSize === 1) {
            mediumParking.calculateFee(currentVehicleInfo)
        } else if (currentVehicleInfo.parkingSize === 2) {
            largeParking.calculateFee(currentVehicleInfo)
        }
        props.setShowFeeDetails(true)
    }

    const handleUnpark = (parkId, totalDurationParked, overallDurationParked) => {
        const occupiedSlotIds = props.occupiedSlot.map(e => e.slotNum)
        let slotDataUpdate = [...props.occupiedSlot];
        const arrayIndex = [...occupiedSlotIds];
        const index = arrayIndex.indexOf(parkId)

        if (index !== -1) {
            const prevData = {
                ...props.occupiedSlot[index],
                exitTime: state.exitTime,
                overallDurationParked: overallDurationParked ? overallDurationParked + totalDurationParked : totalDurationParked
            }
            props.setPrevParkedVehicle([...props.prevParkedVehicle, prevData])
            slotDataUpdate.splice(index, 1);
            props.setOccupiedSlot(slotDataUpdate)
            handleClose()
        }
    }

    const handleClose = () => {
        setState({...state, exitTime: new Date()})
        props.setShowFeeDetails(false)
        props.handleClose()
    }

    let parkingSize = "Small Parking"
    let totalFee = smallParking && smallParking.getFee()
    let totalDurationParked = smallParking && smallParking.getTimeDuration()

    if (currentVehicleInfo.length && currentVehicleInfo[0].parkingSize === 1) {
        parkingSize = "Medium Parking"
        totalFee = mediumParking.getFee()
        totalDurationParked = mediumParking.getTimeDuration()
    } else if (currentVehicleInfo.length && currentVehicleInfo[0].parkingSize === 2) {
        parkingSize = "Large Parking"
        totalFee = largeParking.getFee()
        totalDurationParked = largeParking.getTimeDuration()
    }
    console.log('currentVehicleInfo11', currentVehicleInfo)
    return (
        <Modal show={props.show} onHide={handleClose}>
            <div className={styles.modalContainer}>
                <Modal.Header closeButton>
                    <Modal.Title>Unpark Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.showFeeDetails ? (
                        <div className={styles.formContainer}>
                            <p><b>Slot Number:</b> {currentVehicleInfo[0].slotNum}</p>
                            <p><b>Parking:</b> {parkingSize}</p>
                            <p><b>Plate Number:</b> {currentVehicleInfo[0].plateNumber}</p>
                            <p><b>Time Duration:</b> {totalDurationParked} hours</p>
                            <h1>P{totalFee}</h1>
                        </div>
                    ) : (
                        <div className={styles.formContainer}>
                            <div className={styles.formInputContainer}>
                                {currentVehicleInfo.length && currentVehicleInfo[0].prevExitTime ? (
                                    <p><b>Previous Park Exit:</b> {currentVehicleInfo.length > 0 ? moment(currentVehicleInfo[0].prevExitTime).format('hh:mm a') : ''}</p>
                                ) : null}
                                <p><b>Entry date:</b> {currentVehicleInfo.length > 0 ? moment(currentVehicleInfo[0].entryTime).format('MM/DD/YYYY') : ''}</p>
                                <p><b>Entry time:</b> {currentVehicleInfo.length > 0 ? moment(currentVehicleInfo[0].entryTime).format('hh:mm a') : ''}</p>
                            </div>
                            <div className={styles.formInputContainer}>
                                <p><b>Select exit time:</b></p>
                                <DateTimePicker onChange={(e) => handleDateTime(e)} value={state.exitTime} />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    {props.showFeeDetails ? (
                        <Button onClick={() => handleUnpark(props.parkId, totalDurationParked, currentVehicleInfo[0].overallDurationParked)} variant="primary" className={styles.submitBtn}>Unpark</Button>
                    ) : (
                        <Button onClick={() => handleCalculateFee(currentVehicleInfo[0])} variant="primary" className={styles.submitBtn}>Calculate Fee</Button>
                    )}
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default UnparkModal;