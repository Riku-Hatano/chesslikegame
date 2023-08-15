import styles from "../../../styles/modal/editModal.module.css";

const EditModal = () => {
    return (
        <div className={ styles.root }>
            <div className={ styles.board }>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                    <div className={ styles.cell }></div>
                </div>
            </div>
            <div className={ styles.pieces }>
                <div className={ styles.piece }>a</div>
                <div className={ styles.piece }>b</div>
                <div className={ styles.piece }>c</div>
                <div className={ styles.piece }>d</div>
                <div className={ styles.piece }>e</div>
                <div className={ styles.piece }>f</div>
                <div className={ styles.piece }>g</div>
                <div className={ styles.piece }>h</div>
                <div className={ styles.piece }>i</div>
            </div>
        </div>
    )
}
export default EditModal;