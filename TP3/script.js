let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

class Terrain {

    constructor(largeur, hauteur) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.sol = this.getLand(largeur, hauteur);
    }

    getLand(largeur, hauteur) {
        const tab = new Array(largeur);
        for (let i = 0; i < tab.length; i++) {
        tab[i] = new Array(hauteur);
            for (let j = 0; j < tab[i].length; j++) {
                tab[i][j] = 0;
            }
        }
        return tab;
    }
}

let terrain = new Terrain(100, 100);
console.log(terrain.sol);