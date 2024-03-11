export class Anneau {

    constructor(ctx, i, j, terrain = new Terrain(20, 20), color = 'green' ) {
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        this.terrain = terrain;
        this.color = color;
    }

    draw() {
        let canvas = this.ctx.canvas;
        let clientHeight = canvas.clientHeight;
        let clientWidth = canvas.clientWidth;

        let cellWidth = 20;
        let cellHeight = 20;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.i*cellWidth, this.j*cellWidth, cellWidth, cellHeight);
    }

    read(d) {
        let i = this.i;
        let j = this.j;

        if (d === 0) { // Up
            j -= 1;
        } else if (d === 1) { // Right
            i += 1;
        } else if (d === 2) { // Down
            j += 1;
        } else if (d === 3) { // Left
            i -= 1;
        }

        if (this.terrain.read(i, j) === 0) {
            return true;
        } else {
            console.log('Collision');
            return false;
        }
    }

    move(d) {
        if (this.read(d)) {
            // d = 0: haut, 1: droite, 2: bas, 3: gauche
            if (d === 0) {
                this.j -= 1;
                if (this.j < 0) this.j = 20;
                else if (this.j > 20) this.j = 0;
            } else if (d === 1) {
                this.i += 1;
                if (this.i < 0) this.i = 20;
                else if (this.i > 20) this.i = 0;
            } else if (d === 2) {
                this.j += 1;
                if (this.j < 0) this.j = 20;
                else if (this.j > 20) this.j = 0;
            } else if (d === 3) {
                this.i -= 1;
                if (this.i < 0) this.i = 20;
                else if (this.i > 20) this.i = 0;
            }
            this.draw();
        }
    }

    copy(a) {
        this.i = a.i;
        this.j = a.j;

        this.draw();
    }
}