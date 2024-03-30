let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

export class Terrain {

    constructor(largeur, hauteur) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.sol = this.getLand(largeur, hauteur);
    }

    addRock() {
        let i = Math.floor(Math.random() * this.largeur);
        let j = Math.floor(Math.random() * this.hauteur);
        while (i === 0 || i === this.largeur - 1 || j === 0 || j === this.hauteur - 1 || this.sol[i][j] !== 0) {
            i = Math.floor(Math.random() * this.largeur);
            j = Math.floor(Math.random() * this.hauteur);
        }

        this.sol[i][j] = 2;
        this.drawRock(i, j);
    }

    getLand(largeur, hauteur) {
        const tab = new Array(largeur);
        let nbRocks = 20;
        for (let i = 0; i < tab.length; i++) {
        tab[i] = new Array(hauteur);
            for (let j = 0; j < tab[i].length; j++) {
                if (i === 0 || i === tab.length - 1 || j === 0 || j === tab[i].length - 1) {
                    tab[i][j] = 2;
                } else {
                    tab[i][j] = 0;
                }
            }
        }
        let k = 0;
        while (k < nbRocks) {
            let i = Math.floor(Math.random() * largeur);
            let j = Math.floor(Math.random() * hauteur);
            if (i !== 0 && i !== largeur - 1 && j !== 0 && j !== hauteur - 1) {
                tab[i][j] = 1;
                k++;
            }
        }

        return tab;
    }

    draw() {
        let clientHeight = canvas.clientHeight;
        let clientWidth = canvas.clientWidth;

        let cellWidth = clientWidth / this.largeur;
        let cellHeight = clientHeight / this.hauteur;

        const colors = ['rgb(128,128,128)', 'rgb(220,220,220)', 'rgb(211,211,211)', 'rgb(192,192,192)', 'rgb(169,169,169)', 'rgb(105,105,105)']

        for (let i = 0; i < this.sol.length; i++) {
            for (let j = 0; j < this.sol[i].length; j++) {
                if (this.sol[i][j] === 0) {
                    ctx.fillStyle = 'white';
                } else if (this.sol[i][j] === 1) {
                    let color = colors[Math.floor(Math.random() * colors.length)];
                    ctx.fillStyle = color;
                } else if (this.sol[i][j] === 2) {
                    ctx.fillStyle = 'black';
                }
                ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
    }

    drawRock(i, j) {
        let clientHeight = canvas.clientHeight;
        let clientWidth = canvas.clientWidth;

        let cellWidth = clientWidth / this.largeur;
        let cellHeight = clientHeight / this.hauteur;

        const colors = ['rgb(128,128,128)', 'rgb(220,220,220)', 'rgb(211,211,211)', 'rgb(192,192,192)', 'rgb(169,169,169)', 'rgb(105,105,105)']
        let color = colors[Math.floor(Math.random() * colors.length)];

        ctx.fillStyle = color;
        ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
    }

    read(i, j) {
        return this.sol[i][j];
    }

    write(i, j, value) {
        this.sol[i][j] = value;
    }
}