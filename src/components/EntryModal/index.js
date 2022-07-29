import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import VehicleParking from "../../services/vehicle-parking";

import styles from "./styles.module.scss";

function EntryModal(props) {
    const [alreadyExists, setAlreadyExists] = useState(false)

    const [state, setState] = useState({
        vehicleSize: 0,
        entryTime: new Date(),
        plateNumber: ''
    });

    useEffect(() => {
        if (state.plateNumber) {
            const prevExitTime = props.prevParkedVehicle.filter(e => e.plateNumber === state.plateNumber)

            if (prevExitTime) {
                setState({
                    ...state,
                    entryTime: prevExitTime.length > 0 ? prevExitTime[0].exitTime : new Date()
                })
            }
        }
    }, [state.plateNumber])

    let vehicleParking = new VehicleParking(props.entryPoint, props.slots, props.occupiedSlot)

    const handleInput = (event, name) => {
        setState({
            ...state,
            [name]: name === 'vehicleSize' ? parseInt(event.target.value) : event.target.value,
        })
    }

    const handleDateTime = (e) => {
        setState({
            ...state,
            entryTime: e,
        })
    }

    const handlePark = (data, prevParkedVehicle) => {
        if (props.occupiedSlot && props.occupiedSlot.some(e => e.plateNumber === data.plateNumber)) {
            setAlreadyExists(true)
        } else {
            props.setOccupiedSlot(vehicleParking.park(data.vehicleSize, data.entryTime, data.plateNumber, prevParkedVehicle))

            const prevParkedVehicleIds = prevParkedVehicle.map(e => e.plateNumber)
            const updatedPrevParked = [...prevParkedVehicle];
            const arrayIndex = [...prevParkedVehicleIds];
            const index = arrayIndex.indexOf(data.plateNumber)

            if (index !== -1) {
                updatedPrevParked.splice(index, 1);
                props.setPrevParkedVehicle([...updatedPrevParked])
            }

            setState({
                vehicleSize: 0,
                entryTime: new Date(),
                plateNumber: ''
            })
            setAlreadyExists(false)
            props.handleClose()
        }
    }

    const handleClose = () => {
        setAlreadyExists(false)
        props.handleClose()
    }

    let entryName = 'A'
    if (props.entryPoint === 1) {
        entryName = 'B'
    } else if (props.entryPoint === 2) {
        entryName = 'C'
    } else if (props.entryPoint === 3) {
        entryName = 'D'
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
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
                            {alreadyExists ? (
                                <p style={{ color: 'red' }}>This plate number is already exists!</p>
                            ) : null}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button onClick={() => handlePark(state, props.prevParkedVehicle)} variant="primary" className={styles.submitBtn}>Park</Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default EntryModal;