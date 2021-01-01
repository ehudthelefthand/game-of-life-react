export default class Cell {
    constructor({ live, row, col }) {
        this._live = live
        this._row = row
        this._col = col
    }

    get id() {
        return `r_${this._row}_c_${this._col}`
    }

    get live() {
        return this._live
    }

    get row() {
        return this._row
    }

    get col() {
        return this._col
    }

    get neighbours() {
        const row = this._row
        const col = this._col
        return [
            new Cell({ row: row - 1, col: col - 1 }),
            new Cell({ row: row - 1, col: col }),
            new Cell({ row: row - 1, col: col + 1 }),
            new Cell({ row: row, col: col - 1 }),
            new Cell({ row: row, col: col + 1 }),
            new Cell({ row: row + 1, col: col - 1 }),
            new Cell({ row: row + 1, col: col }),
            new Cell({ row: row + 1, col: col + 1 }),
        ]
    }
}