import { randomInteger } from "../utils/Utils"
import { Event } from "../utils/Event"
import { 
    SimpleStrategy, 
    GridRemoveStrategy, 
    HorizontalStrategy,
     VerticalStrategy, 
     BombStrategy, 
     SuperBombStrategy, 
    ReshuffleStrategy
 } from "./GridRemover"

export const enum TileState {
    Empty,
    Red,
    Blue,
    Green,
    Purple,
    Yellow,
    CountColor,

    Bomb,
    Horizontal,
    Vertical,
    Reshuffle,
    RemoveAll,
    BoosterCount
}

export const typeToStrategy: Map<TileState, GridRemoveStrategy> = new Map([
    [TileState.Horizontal, new HorizontalStrategy()],
    [TileState.Vertical, new VerticalStrategy()],
    [TileState.Bomb, new BombStrategy()],
    [TileState.Reshuffle, new ReshuffleStrategy()],
    [TileState.RemoveAll, new SuperBombStrategy()]
])
export class Tile {
    private _pos: cc.Vec2
    private _state: TileState

    onAction = new Event
    onNoCombo = new Event

    get state() { return this._state }
    get pos() { return this._pos }
    get isRemoved() { return this._state == TileState.Empty }
    get isNormal() { return this._state != TileState.Empty && this._state != TileState.CountColor && this._state != TileState.BoosterCount }
    get isBooster() { return this.state > TileState.CountColor && this.state < TileState.BoosterCount}
    // get isReshuffleBooster() { return this.state == TileState.Reshuffle}
    get getRemoveStrategy() { return this.isBooster ? typeToStrategy.get(this._state) : new SimpleStrategy() }
    
    set state(s: TileState) { this._state = s }

    static getRandomTile() {
        return randomInteger(TileState.Red, TileState.CountColor - 1)
    }

    constructor(pos: cc.Vec2, color?: TileState) {
        this._pos = pos
        this._state = color ? color : Tile.getRandomTile()
    }
    
    action() { 
        console.log("Tile dispatch action()", this)
        this.onAction.dispatch(this) 
    }

    noCombo() {
        console.log("Tile dispatch noCombo()")
        this.onNoCombo.dispatch()
    }

    remove() {
        console.log("Tile dispatch remove()")
        this._state = TileState.Empty
    }

    updatePos(newPos: cc.Vec2) {
        console.log("Tile dispatch updatePos()")
        this._pos = newPos
    }

    updateState() {
        console.log("Tile dispatch updateState()")
        this._state = Tile.getRandomTile()
    }

    createBomb(state: TileState) {
        this._state = state
    }
}