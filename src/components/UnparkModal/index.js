import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import ParkingFee from "../../services/parking-fee";
import SmallParking from "../../services/small-parking";
import MediumParking from "../../services/medium-parking";
import LargeParking from "../../services/large-parking";

import styles from "./styles.module.scss";

function UnparkModal(props) {
    const [state, setState] = useState({
        exitTime: new Date(),
    });

    const [smallParking, setSmallParking] = useState()
    const [mediumParking, setMediumParking] = useState()
    const [largeParking, setLargeParking] = useState()

    const currentVehicleInfo = props.occupiedSlot.filter(e => e.slotNum === props.parkId)

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

    const handleCalculateFee = (parkingSize) => {
        if (parkingSize === 0) {
            smallParking.calculateFee()
        } else if (parkingSize === 1) {
            mediumParking.calculateFee()
        } else if (parkingSize === 2) {
            largeParking.calculateFee()
        }
        props.setShowFeeDetails(true)
    }

    const handleUnpark = (parkId) => {
        const occupiedSlotIds = props.occupiedSlot.map(e => e.slotNum)
        let slotDataUpdate = [...props.occupiedSlot];
        const arrayIndex = [...occupiedSlotIds];
        const index = arrayIndex.indexOf(parkId)

        if (index !== -1) {
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
                                <p>Select exit time: </p>
                                <DateTimePicker onChange={(e) => handleDateTime(e)} value={state.exitTime} />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    {props.showFeeDetails ? (
                        <Button onClick={() => handleUnpark(props.parkId)} variant="primary" className={styles.submitBtn}>Unpark</Button>
                    ) : (
                        <Button onClick={() => handleCalculateFee(currentVehicleInfo[0].parkingSize)} variant="primary" className={styles.submitBtn}>Calculate Fee</Button>
                    )}
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default UnparkModal;