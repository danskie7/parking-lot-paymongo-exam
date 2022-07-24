import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import SmallVechicle from "../../services/small-vehicle";
import ParkingSpot from "../../services/parking-spot";

import styles from "./styles.module.scss";

function EntryModal(props) {
    const [state, setState] = useState({
        vehicleSize: 0,
        entryTime: new Date(),
        plateNumber: ''
    });

    let smallVehicle = new SmallVechicle(props.entryPoint, props.slots, props.occupiedSlot)

    const [value, onChange] = useState(new Date());

    const handleInput = (event, name) => {
        setState({
            ...state,
            [name]: event.target.value,
        })
    }

    const handleDateTime = (e) => {
        setState({
            ...state,
            entryTime: e,
        })
    }

    const handlePark = (data) => {
        props.setOccupiedSlot(smallVehicle.park(data.vehicleSize, data.entryTime, data.plateNumber))
        setState({
            vehicleSize: 0,
            entryTime: new Date(),
            plateNumber: ''
        })
        props.handleClose()
    }

    let entryName = 'A'
    if (props.entryPoint === 1) {
        entryName = 'B'
    } else if (props.entryPoint === 2) {
        entryName = 'C'
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <div className={styles.modalContainer}>
                <Modal.Header closeButton>
                    <Modal.Title>Entry Point <b>{entryName}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.formContainer}>
                        <div className={styles.formInputContainer}>
                            <p>Choose a vehicle size: </p>
                            <select className={styles.formInput} id="cars" onChange={(e) => handleInput(e, 'vehicleSize')} value={state.vehicleSize}>
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>Large</option>
                            </select>
                        </div>
                        <div className={styles.formInputContainer}>
                            <p>Select entry time: </p>
                            <DateTimePicker onChange={(e) => handleDateTime(e)} value={state.entryTime} />
                        </div>
                        <div className={styles.formInputContainer}>
                            <p>Plate number: </p>
                            <input className={styles.formInput} type="input" onChange={(e) => handleInput(e, 'plateNumber')} value={state.plateNumber} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button onClick={() => handlePark(state)} variant="primary" className={styles.submitBtn}>Park</Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default EntryModal;