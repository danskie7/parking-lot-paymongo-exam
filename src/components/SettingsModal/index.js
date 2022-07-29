import { Modal, Button } from 'react-bootstrap';

import styles from "./styles.module.scss";

function SettingsModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <div className={styles.modalContainer}>
                <Modal.Header closeButton>
                    <Modal.Title>SETTINGS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.formContainer}>
                        <div className={styles.formInputContainer}>
                            <input type="checkbox" id="entryA" name="entryA" value="entryA" checked={props.showEntryA} onChange={() => props.setShowEntryA(!props.showEntryA)} />
                            <label for="entryA"> Show Entry Point A</label>
                        </div>

                        <div className={styles.formInputContainer}>
                            <input type="checkbox" id="entryB" name="entryB" value="entryB" checked={props.showEntryB} onChange={() => props.setShowEntryB(!props.showEntryB)} />
                            <label for="entryB"> Show Entry Point B</label>
                        </div>

                        <div className={styles.formInputContainer}>
                            <input type="checkbox" id="entryC" name="entryC" value="entryC" checked={props.showEntryC} onChange={() => props.setShowEntryC(!props.showEntryC)} />
                            <label for="entryC"> Show Entry Point C</label>
                        </div>

                        <div className={styles.formInputContainer}>
                            <input type="checkbox" id="entryD" name="entryD" value="entryD" checked={props.showEntryD} onChange={() => props.setShowEntryD(!props.showEntryD)} />
                            <label for="entryD"> Show Entry Point D</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button onClick={() => props.handleClose()} variant="primary" className={styles.submitBtn}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default SettingsModal;