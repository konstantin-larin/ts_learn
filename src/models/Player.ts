import {Colors} from "./Colors.ts";

export class Player {
    color: Colors;
    notMoved: boolean = true;
    constructor(color: Colors) {
        this.color = color;
    }
}