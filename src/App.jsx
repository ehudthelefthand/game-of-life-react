import { useEffect, useState } from 'react'
import Cell from './Cell'
import './App.scss'

function App() {
  const [dimension, setDimension] = useState({ w: 1, h: 1 })
  const [grid, setGrid] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!run) {
        return
      }
      let clone = cloneGrid(grid)
      grid.flat()
        .map(nextGeneration)
        .forEach(cell => {
          clone[cell.row][cell.col] = cell
        })
      setGrid(clone)
    }, 1000)
    return () => clearInterval(id)
  })

  function cloneGrid(grid) {
    return grid.map(row => [...row])
  }

  function nextGeneration(cell) {
    const live = countLive(cell.neighbours.map(getValue(dimension, grid)))
    if (live === 2) {
      return cell
    }
    if (live === 3) {
      return new Cell({ live: true, row: cell.row, col: cell.col })
    }
    return new Cell({ live: false, row: cell.row, col: cell.col })
  }

  function getValue({ w, h }, grid) {
    return (cell) => {
      if (cell.row < 0 || cell.col < 0 || cell.row >= h || cell.col >= w) {
        return ''
      }
      return grid[cell.row][cell.col]
    }
  }

  function countLive(cells) {
    return cells.filter(cell => cell.live).length
  }

  function handleChange(field) {
    return function (e) {
      let n = parseInt(e.target.value, 10)
      if (n < 1) {
        n = 1
      }
      setDimension({ ...dimension, [field]: n })
    }
  }

  function handleSetGrid(e) {
    e.preventDefault()
    const newGrid = []
    for (let r = 0; r < dimension.h; r++) {
      const row = []
      for (let c = 0; c < dimension.w; c++) {
        row.push(new Cell({ live: false, row: r, col: c }))
      }
      newGrid.push(row)
    }
    setGrid(newGrid)
  }

  function handleRun(e) {
    e.preventDefault()
    setRun(!run)
  }

  function updateGrid(cell) {
    return (e) => {
      let clone = cloneGrid(grid)
      clone[cell.row][cell.col] = new Cell({ live: e.target.checked, row: cell.row, col: cell.col })
      setGrid(clone)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Game of Life</h1>
      <form className="setup-form" onSubmit={handleSetGrid}>
        <div className="row width">
          <label htmlFor="width">Width (Col)</label>
          <input type="number" id="width" name="width" autoFocus value={dimension.w} onChange={handleChange('w')} disabled={run} />
        </div>
        <div className="row height">
          <label htmlFor="height">Height (Row)</label>
          <input type="number" id="height" name="height" value={dimension.h} onChange={handleChange('h')} disabled={run} />
        </div>
        <div className="row button">
          <button disabled={run}>set grid</button>
        </div>
      </form>
      <form onSubmit={handleRun}>
        {
          grid.length > 0
            ? (
              <>
                <div className="grid">
                  {
                    grid.map((rows, index) => (
                      <div key={index}>{
                        rows.map(cell => <input type="checkbox" key={cell.id} checked={cell.live} onChange={updateGrid(cell)} disabled={run} />)
                      }</div>
                    ))
                  }
                </div>
                <div><button>{run ? 'stop' : 'run'}</button></div>
              </>
            )
            : <div>no grid setted</div>
        }
      </form>
    </div >
  )
}

export default App;
