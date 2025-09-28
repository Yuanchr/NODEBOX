import { useState } from "react";
//子节点通过点击调用父节点传过来的函数从而改变父节点的值 然后刷新父节点和子节点
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //点击后 判断是否之前点击过，判断是否胜利
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    //判断到谁下以此来赋什么值
    nextSquares[i] = xIsNext ? "X" : "O";

    //将当前步骤的状态返回到Game
    onPlay(nextSquares);
  }

  //提示某一方胜利
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  }
  //未胜利则提示该哪方下
  if (!winner) {
    status = "Next player:" + (xIsNext ? "X" : "O");
  }

  //父节点对应子节点 父节点传函数 子节点调用函数
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  //同步记录到谁下，以及添加历史记录
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  //跟踪用户正在查看的步骤
  const [currentMove, setCurrentMove] = useState(0);

  //currentSquares 获得每一次的记录（每次只统计最后一个）
  // const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //更新历史记录、切换玩家
    // setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);

    //更新历史优化
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  //返回历史记录，如果步数为偶数则设置xIsNext为true
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/*依次是 角色交替状态 最后一行状态 点击后的回调函数*/}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//判断获胜条件
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //判断第一位是否为空，第一位和第二位是否相同，第一位和第三位是否相同
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}
