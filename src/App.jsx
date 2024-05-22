import React, { useState } from 'react'

const Square = ({value}) => {

return <button onClick={handleClick} className='bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg'>{value}</button>
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
   <>
   <div className='flex'>
   <Square value={squares[0]}></Square>
   <Square value={squares[1]}></Square>
   <Square value={squares[2]}></Square>
   </div>

   <div className='flex'>
   <Square value={squares[3]}></Square>
   <Square value={squares[4]}></Square>
   <Square value={squares[5]}></Square>
   </div>

   <div className='flex'>
   <Square value={squares[6]}></Square>
   <Square value={squares[7]}></Square>
   <Square value={squares[8]}></Square>
   </div>
   </>
  )
}

export default Board