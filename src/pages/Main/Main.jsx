import { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ParkingSpot from "../../services/parking-spot";

import EntryModal from "../../components/EntryModal";
import UnparkModal from "../../components/UnparkModal";
import SettingsModal from "../../components/SettingsModal";

import settingImg from '../../images/settings.png'

export const Main = () => {
    const [parkingSpot, setParkingSpot] = useState(null);
    const [entryPoint, setEntryPoint] = useState('')
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [showUnparkModal, setShowUnparkModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showFeeDetails, setShowFeeDetails] = useState(false);
    const [parkId, setParkId] = useState('');
    const [occupiedSlot, setOccupiedSlot] = useState([]);
    const [prevParkedVehicle, setPrevParkedVehicle] = useState([]);

    const [showEntryA, setShowEntryA] = useState(true);
    const [showEntryB, setShowEntryB] = useState(true);
    const [showEntryC, setShowEntryC] = useState(true);
    const [showEntryD, setShowEntryD] = useState(false);

    const handleClose = () => setShowEntryModal(false);
    const handleShow = () => setShowEntryModal(true);

    const handleUnparkClose = () => setShowUnparkModal(false);
    
    const entryA = [{slotNum: 1, slotSize: 0},{slotNum: 2, slotSize: 1},{slotNum: 3, slotSize: 2}]
    const entryB = [{slotNum: 4, slotSize: 0},{slotNum: 5, slotSize: 1},{slotNum: 6, slotSize: 2}]
    const entryC = [{slotNum: 7, slotSize: 0},{slotNum: 8, slotSize: 1},{slotNum: 9, slotSize: 2}]
    const entryD = [{slotNum: 10, slotSize: 0},{slotNum: 11, slotSize: 1},{slotNum: 12, slotSize: 2}]

    let slots = [entryA, entryB, entryD, entryC]
    if (entryPoint === 1) {
        slots = [entryB, entryC, entryA, entryD]
    } else if (entryPoint === 2) {
        slots = [entryC, entryD, entryB, entryA]
    } else if (entryPoint === 3) {
        slots = [entryD, entryA, entryC, entryB]
    }

    const handleEntry = (entryPoint) => {
        setEntryPoint(entryPoint)
        handleShow()
    }

    const handleCloseEntry = () => {
        setEntryPoint('')
        handleClose()
    }

    const handleShowUnparkModal = (id) => {
        setShowUnparkModal(true)
        setParkId(id)
    }

    useEffect(() => {
        setParkingSpot(new ParkingSpot(entryPoint, slots, occupiedSlot));
    }, [entryPoint]);

    console.log('occupiedSlot', occupiedSlot)
    console.log('prevParkedVehicle', prevParkedVehicle)

    return (
        <>
            <SettingsModal 
                handleClose={() => setShowSettingsModal(false)}
                show={showSettingsModal}
                showEntryA={showEntryA}
                setShowEntryA={setShowEntryA}
                showEntryB={showEntryB}
                setShowEntryB={setShowEntryB}
                showEntryC={showEntryC}
                setShowEntryC={setShowEntryC}
                showEntryD={showEntryD}
                setShowEntryD={setShowEntryD} />

            <EntryModal
                show={showEntryModal}
                handleClose={handleCloseEntry}
                entryPoint={entryPoint}
                slots={slots} 
                setOccupiedSlot={setOccupiedSlot}
                occupiedSlot={occupiedSlot}
                prevParkedVehicle={prevParkedVehicle}
                setPrevParkedVehicle={setPrevParkedVehicle} />

            <UnparkModal
                show={showUnparkModal}
                handleClose={handleUnparkClose}
                parkId={parkId}
                parkingSpot={parkingSpot}
                setShowFeeDetails={setShowFeeDetails}
                showFeeDetails={showFeeDetails}
                occupiedSlot={occupiedSlot}
                setOccupiedSlot={setOccupiedSlot}
                prevParkedVehicle={prevParkedVehicle}
                setPrevParkedVehicle={setPrevParkedVehicle} />

            <p className={styles.title}>PARKING LOT SYSTEM</p>
            <button className={styles.btnSetting} onClick={() => setShowSettingsModal(true)}>
                <img src={settingImg} alt="my image" />
            </button>
            <div className={styles.outerTopBot}>
                <button className={styles.entryBtn} disabled={!showEntryA} onClick={() => handleEntry(0)}>ENTRY POINT A</button>
            </div>
            <div className={styles.outerContainer}>
                <div className={styles.outerSide}>
                    <button className={styles.entryBtn} disabled={!showEntryD} onClick={() => handleEntry(3)}>ENTRY POINT D</button>
                </div>
                <div className={styles.boxContainer}>
                    <div className={styles.parkingHorizontalContainer}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={styles.col} style={occupiedSlot.some(e => e.slotNum === index + 1) ? { backgroundColor: 'green' } : {}}>
                                {occupiedSlot.some(e => e.slotNum === index + 1) ? <button onClick={() => handleShowUnparkModal(index + 1)}>unparked</button> : <div className={styles.hide} />}
                                <p>{index + 1}</p>
                                <p>{index === 0 ? 'S' : index === 1 ? 'M' : 'L'}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.parkingVerticalContainer}>
                        <div className={styles.parkingRowContainer}>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className={styles.row} style={occupiedSlot.some(e => e.slotNum === index + 10) ? { backgroundColor: 'green' } : {}}>
                                    <div className={styles.descContainer}>
                                        <p style={{ marginLeft: 'auto' }}>{index + 10}</p>
                                        <p style={{ marginRight: 'auto' }}>{index === 0 ? 'S' : index === 1 ? 'M' : 'L'}</p>
                                    </div>
                                    {occupiedSlot.some(e => e.slotNum === index + 10) ? <button onClick={() => handleShowUnparkModal(index + 10)}>unparked</button> : <div className={styles.hide} />}
                                </div>
                            ))}
                        </div>
                        <div className={styles.centerSquare} />
                        <div className={styles.parkingRowContainer}>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className={styles.row} style={occupiedSlot.some(e => e.slotNum === index + 4) ? { backgroundColor: 'green' } : {}}>
                                    <div className={styles.descContainer}>
                                        <p style={{ marginLeft: 'auto' }}>{index + 4}</p>
                                        <p style={{ marginRight: 'auto' }}>{index === 0 ? 'S' : index === 1 ? 'M' : 'L'}</p>
                                    </div>
                                    {occupiedSlot.some(e => e.slotNum === index + 4) ? <button onClick={() => handleShowUnparkModal(index + 4)}>unparked</button> : <div className={styles.hide} />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.parkingHorizontalContainer}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={styles.col} style={occupiedSlot.some(e => e.slotNum === index + 7) ? { backgroundColor: 'green' } : {}}>
                                <p>{index + 7}</p>
                                <p>{index === 0 ? 'S' : index === 1 ? 'M' : 'L'}</p>
                                {occupiedSlot.some(e => e.slotNum === index + 7) ? <button onClick={() => handleShowUnparkModal(index + 7)}>unparked</button> : <div className={styles.hide} />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.outerSide}>
                    <button className={styles.entryBtn} disabled={!showEntryB} onClick={() => handleEntry(1)}>ENTRY POINT B</button>
                </div>
            </div>
            <div className={styles.outerTopBot}>
                <button className={styles.entryBtn} disabled={!showEntryC} onClick={() => handleEntry(2)}>ENTRY POINT C</button>
            </div>
        </>
    )
}