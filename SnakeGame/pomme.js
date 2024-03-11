import { Terrain } from './land.js';

export class Pomme {
    constructor(ctx, terrain, color = 'red') {
        this.ctx = ctx;
        this.terrain = terrain;
        this.color = color;
    }

    draw() {
        let canvas = this.ctx.canvas;
        let clientHeight = canvas.clientHeight;
        let clientWidth = canvas.clientWidth;

        let cellWidth = 20;
        let cellHeight = 20;

        let i = Math.floor(Math.random() * 20);
        let j = Math.floor(Math.random() * 20);

        while (this.terrain.read(i, j) !== 0) {
            i = Math.floor(Math.random() * 20);
            j = Math.floor(Math.random() * 20);
        }

        this.ctx.fillStyle = this.color;
        this.terrain.write(i, j, 3);
        this.ctx.fillRect(i*cellWidth, j*cellWidth, cellWidth, cellHeight);
    }
}