let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

export class Terrain {

    constructor(largeur, hauteur) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.sol = this.getLand(largeur, hauteur);
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

        for (let i = 0; i < this.sol.length; i++) {
            for (let j = 0; j < this.sol[i].length; j++) {
                if (this.sol[i][j] === 0) {
                    ctx.fillStyle = 'white';
                } else if (this.sol[i][j] === 1) {
                    ctx.fillStyle = 'black';
                } else if (this.sol[i][j] === 2) {
                    ctx.fillStyle = 'red';
                }
                ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
    }

    read(i, j) {
        return this.sol[i][j];
    }

    write(i, j, value) {
        this.sol[i][j] = value;
    }
}

// let terrain = new Terrain(20, 20);
// let terrainJSON = JSON.stringify(terrain.sol);
// console.log(terrainJSON);

// terrain.draw();