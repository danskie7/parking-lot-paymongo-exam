import { useState, useEffect } from "react";
import styles from "./main.module.scss";
import ParkingSpot from "../../services/parking-spot";

import EntryModal from "../../components/EntryModal";

export const Main = () => {
    const [parkingSpot, setParkingSpot] = useState(null);
    const [entryPoint, setEntryPoint] = useState('')
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [occupiedSlot, setOccupiedSlot] = useState([]);

    const handleClose = () => setShowEntryModal(false);
    const handleShow = () => setShowEntryModal(true);

    const entryA = [{slotNum: 1, slotSize: 0},{slotNum: 2, slotSize: 1},{slotNum: 3, slotSize: 2}]
    const entryB = [{slotNum: 4, slotSize: 0},{slotNum: 5, slotSize: 1},{slotNum: 6, slotSize: 2}]
    const entryC = [{slotNum: 7, slotSize: 0},{slotNum: 8, slotSize: 1},{slotNum: 9, slotSize: 2}]
    const entryD = [{slotNum: 10, slotSize: 0},{slotNum: 11, slotSize: 1},{slotNum: 12, slotSize: 2}]

    let slots = [entryA, entryB, entryD, entryC]
    if (entryPoint === 1) {
        slots = [entryB, entryC, entryA, entryD]
    } else if (entryPoint === 2) {
        slots = [entryC, entryD, entryB, entryA]
    }

    const handleEntry = (entryPoint) => {
        setEntryPoint(entryPoint)
        handleShow()
    }

    const handleCloseEntry = () => {
        setEntryPoint('')
        handleClose()
    }

    useEffect(() => {
        setParkingSpot(new ParkingSpot(entryPoint, slots, occupiedSlot));
    }, [entryPoint]);

    // console.log('slots', slots)
    console.log('occupiedSlot', occupiedSlot)

    return (
        <>
            <EntryModal
                show={showEntryModal}
                handleClose={handleCloseEntry}
                entryPoint={entryPoint}
                slots={slots} 
                setOccupiedSlot={setOccupiedSlot}
                occupiedSlot={occupiedSlot} />

            <p className={styles.title}>PARKING LOT SYSTEM</p>
            <div className={styles.outerTopBot}>
                <button onClick={() => handleEntry(0)}>ENTRY POINT A</button>
            </div>
            <div className={styles.outerContainer}>
                <div className={styles.outerSide}>
                    <button>ENTRY POINT</button>
                </div>
                <div className={styles.boxContainer}>
                    <div className={styles.parkingHorizontalContainer}>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 1) ? { backgroundColor: 'green' } : {}}>
                            {occupiedSlot.some(e => e.slotNum === 1) ? <button>unparked</button> : <div className={styles.hide} />}
                            <p>1</p>
                            <p>S</p>
                        </div>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 2) ? { backgroundColor: 'green' } : {}}>
                        {occupiedSlot.some(e => e.slotNum === 2) ? <button>unparked</button> : <div className={styles.hide} />}
                            <p>2</p>
                            <p>M</p>
                        </div>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 3) ? { backgroundColor: 'green' } : {}}>
                        {occupiedSlot.some(e => e.slotNum === 3) ? <button>unparked</button> : <div className={styles.hide} />}
                            <p>3</p>
                            <p>L</p>
                        </div>
                    </div>

                    <div className={styles.parkingVerticalContainer}>
                        <div className={styles.parkingRowContainer}>
                        <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 10) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>10</p>
                                    <p style={{ marginRight: 'auto' }}>S</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 10) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                            <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 11) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>11</p>
                                    <p style={{ marginRight: 'auto' }}>M</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 11) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                            <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 12) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>12</p>
                                    <p style={{ marginRight: 'auto' }}>L</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 12) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                        </div>
                        <div className={styles.centerSquare} />
                        <div className={styles.parkingRowContainer}>
                            <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 4) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>4</p>
                                    <p style={{ marginRight: 'auto' }}>S</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 4) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                            <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 5) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>5</p>
                                    <p style={{ marginRight: 'auto' }}>M</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 5) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                            <div className={styles.row} style={occupiedSlot.some(e => e.slotNum === 6) ? { backgroundColor: 'green' } : {}}>
                                <div className={styles.descContainer}>
                                    <p style={{ marginLeft: 'auto' }}>6</p>
                                    <p style={{ marginRight: 'auto' }}>L</p>
                                </div>
                                {occupiedSlot.some(e => e.slotNum === 6) ? <button>unparked</button> : <div className={styles.hide} />}
                            </div>
                        </div>
                    </div>

                    <div className={styles.parkingHorizontalContainer}>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 7) ? { backgroundColor: 'green' } : {}}>
                            <p>7</p>
                            <p>S</p>
                            {occupiedSlot.some(e => e.slotNum === 7) ? <button>unparked</button> : <div className={styles.hide} />}
                        </div>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 8) ? { backgroundColor: 'green' } : {}}>
                            <p>8</p>
                            <p>M</p>
                            {occupiedSlot.some(e => e.slotNum === 8) ? <button>unparked</button> : <div className={styles.hide} />}
                        </div>
                        <div className={styles.col} style={occupiedSlot.some(e => e.slotNum === 9) ? { backgroundColor: 'green' } : {}}>
                            <p>9</p>
                            <p>L</p>
                            {occupiedSlot.some(e => e.slotNum === 9) ? <button>unparked</button> : <div className={styles.hide} />}
                        </div>
                    </div>
                </div>
                <div className={styles.outerSide}>
                    <button onClick={() => handleEntry(1)}>ENTRY POINT B</button>
                </div>
            </div>
            <div className={styles.outerTopBot}>
                <button onClick={() => handleEntry(2)}>ENTRY POINT C</button>
            </div>
        </>
    )
}