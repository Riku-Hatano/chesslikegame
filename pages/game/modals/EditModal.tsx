import styles from "../../../styles/modal/editModal.module.css";
import gameRoom from "../../../types/gameRoom";

const EditModal = ({roomState, setRoomState}: any) => {
    const changeBoardHandler = (e: any) => {
        if(roomState.game.selectPieceKind !== null && parseInt(e.target.id[0]) > 3) {
            const newBoard = roomState.game.board;
            newBoard[parseInt(e.target.id[0])][parseInt(e.target.id[1])] = roomState.game.selectedPieceKind;
            setRoomState((prevState: gameRoom) => ({
                ...prevState,
                game: {
                    ...prevState.game,
                    board: newBoard
                }
            }))
        }
    }
    const selectPieceHandler = (e: any) => {
        if(roomState.game.selectedPieceKind === null || roomState.game.selectedPieceKind !== e.target.innerHTML) {
            setRoomState((prevState: gameRoom) => ({
                ...prevState,
                game: {
                    ...prevState.game,
                    selectedPieceKind: e.target.innerHTML
                }
            }))
        } else {
            setRoomState((prevState: gameRoom) => ({
                ...prevState,
                game: {
                    ...prevState.game,
                    selectedPieceKind: null
                }
            }))
        }
    }
    return (
        <div className={ styles.root }>
            {
                roomState.game.selectedPieceKind ? <p>selected: { roomState.game.selectedPieceKind }</p> : <p>not selected</p>
            }
            <p>socketID: { roomState.socketID }</p>
            <div className={ styles.board }>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="00" onClick={changeBoardHandler}>{roomState.game.board[0][0]}</div>
                    <div className={ styles.cell } id="01" onClick={changeBoardHandler}>{roomState.game.board[0][1]}</div>
                    <div className={ styles.cell } id="02" onClick={changeBoardHandler}>{roomState.game.board[0][2]}</div>
                    <div className={ styles.cell } id="03" onClick={changeBoardHandler}>{roomState.game.board[0][3]}</div>
                    <div className={ styles.cell } id="04" onClick={changeBoardHandler}>{roomState.game.board[0][4]}</div>
                    <div className={ styles.cell } id="05" onClick={changeBoardHandler}>{roomState.game.board[0][5]}</div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="10" onClick={changeBoardHandler}>{roomState.game.board[1][0]}</div>
                    <div className={ styles.cell } id="11" onClick={changeBoardHandler}>{roomState.game.board[1][1]}</div>
                    <div className={ styles.cell } id="12" onClick={changeBoardHandler}>{roomState.game.board[1][2]}</div>
                    <div className={ styles.cell } id="13" onClick={changeBoardHandler}>{roomState.game.board[1][3]}</div>
                    <div className={ styles.cell } id="14" onClick={changeBoardHandler}>{roomState.game.board[1][4]}</div>
                    <div className={ styles.cell } id="15" onClick={changeBoardHandler}>{roomState.game.board[1][5]}</div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="20" onClick={changeBoardHandler}>{roomState.game.board[2][0]}</div>
                    <div className={ styles.cell } id="21" onClick={changeBoardHandler}>{roomState.game.board[2][1]}</div>
                    <div className={ styles.cell } id="22" onClick={changeBoardHandler}>{roomState.game.board[2][2]}</div>
                    <div className={ styles.cell } id="23" onClick={changeBoardHandler}>{roomState.game.board[2][3]}</div>
                    <div className={ styles.cell } id="24" onClick={changeBoardHandler}>{roomState.game.board[2][4]}</div>
                    <div className={ styles.cell } id="25" onClick={changeBoardHandler}>{roomState.game.board[2][5]}</div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="30" onClick={changeBoardHandler}>{roomState.game.board[3][0]}</div>
                    <div className={ styles.cell } id="31" onClick={changeBoardHandler}>{roomState.game.board[3][1]}</div>
                    <div className={ styles.cell } id="32" onClick={changeBoardHandler}>{roomState.game.board[3][2]}</div>
                    <div className={ styles.cell } id="33" onClick={changeBoardHandler}>{roomState.game.board[3][3]}</div>
                    <div className={ styles.cell } id="34" onClick={changeBoardHandler}>{roomState.game.board[3][4]}</div>
                    <div className={ styles.cell } id="35" onClick={changeBoardHandler}>{roomState.game.board[3][5]}</div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="40" onClick={changeBoardHandler}>{roomState.game.board[4][0]}</div>
                    <div className={ styles.cell } id="41" onClick={changeBoardHandler}>{roomState.game.board[4][1]}</div>
                    <div className={ styles.cell } id="42" onClick={changeBoardHandler}>{roomState.game.board[4][2]}</div>
                    <div className={ styles.cell } id="43" onClick={changeBoardHandler}>{roomState.game.board[4][3]}</div>
                    <div className={ styles.cell } id="44" onClick={changeBoardHandler}>{roomState.game.board[4][4]}</div>
                    <div className={ styles.cell } id="45" onClick={changeBoardHandler}>{roomState.game.board[4][5]}</div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.cell } id="50" onClick={changeBoardHandler}>{roomState.game.board[5][0]}</div>
                    <div className={ styles.cell } id="51" onClick={changeBoardHandler}>{roomState.game.board[5][1]}</div>
                    <div className={ styles.cell } id="52" onClick={changeBoardHandler}>{roomState.game.board[5][2]}</div>
                    <div className={ styles.cell } id="53" onClick={changeBoardHandler}>{roomState.game.board[5][3]}</div>
                    <div className={ styles.cell } id="54" onClick={changeBoardHandler}>{roomState.game.board[5][4]}</div>
                    <div className={ styles.cell } id="55" onClick={changeBoardHandler}>{roomState.game.board[5][5]}</div>
                </div>
            </div>
            <div className={ styles.pieces }>
                <div className={ styles.piece } onClick={selectPieceHandler}>a</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>b</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>c</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>d</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>e</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>f</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>g</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>h</div>
                <div className={ styles.piece } onClick={selectPieceHandler}>i</div>
            </div>
        </div>
    )
}
export default EditModal;