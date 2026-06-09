const { useState, useCallback, useEffect } = React;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");
  const [msgVisible, setMsgVisible] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setMsgVisible(false);
      setTimeout(() => setMsgVisible(true), 10);
      return;
    }
    for (let [a, b, c] of winningPatterns) {
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        setFinalMsg(`${board[a]} is the Winner!`);
        setGameOver(true);
        return;
      }
    }
    if (board.every(box => box !== null)) {
      setFinalMsg("It's a draw!");
      setGameOver(true);
    }
  }, [board, gameOver]);

  const handleClick = useCallback(
    index => {
      if (board[index] !== null || gameOver) return;

      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        if (!newBoard[index]) {
          newBoard[index] = isXTurn ? "X" : "O";
        }
        return newBoard;
      });
      setIsXTurn(prev => !prev);
    },
    [isXTurn, gameOver]
  );

  const handleResetClick = useCallback(() => {
    setBoard(Array(9).fill(null)); //create a new array causing a re-render
    setFinalMsg("");
    setIsXTurn(true);
    setGameOver(false);
    setMsgVisible(false);
  }, []);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <p
        className={msgVisible ? "visible" : ""}
        style={{
          color: finalMsg.includes("X")
            ? "red"
            : finalMsg.includes("O")
            ? "blue"
            : "black",
        }}>
        {finalMsg}
      </p>
      <div id="border">
        {board.map((value, index) => { 
            const isEmpty = value === null;
            const previewLetter = isXTurn ? 'X' : 'O';
            const previewClass = isEmpty ? `preview preview-${previewLetter}` : '';
            
            return (
          <button
            style={{ color: value === "X" ? "red" : "blue" }}
            key={index}
            onClick={() => handleClick(index)}
            className={`square ${previewClass}`}
            data-preview={previewLetter}> {/* custom attribute, it allows to select the right symbol to show*/}
            {value}
          </button>
        )})}
      </div>
      <button onClick={handleResetClick} id="reset" type="button">
        Reset
      </button>
    </div>
  );
};