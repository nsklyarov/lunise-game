import { Tile, TileState } from "./Tile";
import { Grid } from "./Grid";
import Global from "../Global";

export interface GridRemoveStrategy {
    getRemoveTiles(tile: Tile, grid: Grid)
}

export class SimpleStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("Simple Strategy")
    }
    getRemoveTiles(tile: Tile, grid: Grid) {
        tile.remove()
        return [tile]
    }
}

export class HorizontalStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("Horizontal Strategy")
    }
    getRemoveTiles(tile: Tile, grid: Grid) {
        tile.remove()
        let r = [tile]
        for (let line = 0; line < grid.rowsCount; line++) {
            let removeTile = grid.board[tile.pos.x][line]
            console.log("2 error occur")
            if (removeTile.isNormal) r = r.concat(removeTile.getRemoveStrategy.getRemoveTiles(removeTile, grid))
        } 
        return r
    }
}

export class VerticalStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("Vertical Strategy")
    }
    getRemoveTiles(tile: Tile, grid: Grid) {
        tile.remove()
        let r = [tile]
        for (let line = 0; line < grid.columnCount; line++) {
            let removeTile = grid.board[line][tile.pos.y]
            console.log("3 error occur")
            if (removeTile.isNormal) r = r.concat(removeTile.getRemoveStrategy.getRemoveTiles(removeTile, grid))
        } 
        return r
    }
}

export class BombStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("Bomb Strategy")
    }
    getRemoveTiles(tile: Tile, grid: Grid) {
        tile.remove()
        let r = [tile]
        let size = Global.config.bombRadius
        for (let row = tile.pos.x - size; row <= tile.pos.x + size; row++) {
            for (let column = tile.pos.y - size; column <= tile.pos.y + size; column++) {
                let removeTile = grid.board[row][column]
                if (grid.isValidPick(cc.v2(row, column)) && removeTile.isNormal) {
                    console.log("4 error occur")
                    r = r.concat(removeTile.getRemoveStrategy.getRemoveTiles(removeTile, grid))
                }
            } 
        } 
        return r
    }
}

export class SuperBombStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("SuperBomb Strategy")
    }
    getRemoveTiles(_: Tile, grid: Grid) {
        grid.listTiles.forEach((t: Tile) => t.remove())
        return grid.listTiles
    }
}

export class ReshuffleStrategy implements GridRemoveStrategy {
    constructor() {
        console.log("ReshuffleStrategy Strategy")
    }
    getRemoveTiles(tile: Tile, grid: Grid) {
        tile.remove()
        let r = [tile]
        grid.reshuffleGridIfNeeded(true)
        return r
    }
}