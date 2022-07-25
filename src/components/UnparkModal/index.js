import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import ParkingFee from "../../services/parking-fee";

import styles from "./styles.module.scss";

function UnparkModal(props) {
    const [state, setState] = useState({
        exitTime: new Date(),
    });

    const [parkingFee, setParkingFee] = useState()

    useEffect(() => {
        setParkingFee(new ParkingFee(props.parkId, state.exitTime, props.occupiedSlot));
    }, [state.exitTime]);

    const handleDateTime = (e) => {
        setState({
            ...state,
            exitTime: e,
        })
    }

    const handleCalculateFee = (parkId, exitTime) => {
        parkingFee.calculateFee(parkId, exitTime)
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

    return (
        <Modal show={props.show} onHide={handleClose}>
            <div className={styles.modalContainer}>
                <Modal.Header closeButton>
                    <Modal.Title>Unpark Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.showFeeDetails ? (
                        <div className={styles.formContainer}>
                            <h1>P{parkingFee.getFee()}</h1>
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
                        <Button onClick={() => handleCalculateFee(props.parkId, state.exitTime)} variant="primary" className={styles.submitBtn}>Calculate Fee</Button>
                    )}
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default UnparkModal;