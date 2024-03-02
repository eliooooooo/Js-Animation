let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

class Anneau {

    constructor(ctx, i, j, color = 'green') {
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        this.color = color;
    }

    draw() {
        let clientHeight = canvas.clientHeight;
        let clientWidth = canvas.clientWidth;

        let cellWidth = 20;
        let cellHeight = 20;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.i*cellWidth, this.j*cellWidth, cellWidth, cellHeight);
    }

    move(d) {
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

    copy(a) {
        this.i = a.i;
        this.j = a.j;

        this.draw();
    }
}

class Serpent {
    constructor(ctx, i, j, direction, tabAnneaux = []) {
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        this.direction = direction;
        this.tabAnneaux = tabAnneaux;
    }

    draw() {
        this.tabAnneaux.forEach(element => {
            element.draw();
        });
    }

    move(d){
        this.direction = d;
        let queue = this.tabAnneaux[this.tabAnneaux.length - 1];
        let anciennePositionQueue = {i: queue.i, j: queue.j};

        for (let i = this.tabAnneaux.length - 1; i > 0; i--) {
            this.tabAnneaux[i].copy(this.tabAnneaux[i-1]);
        }

        let tete = this.tabAnneaux[0];
        tete.move(d);

        this.ctx.clearRect(anciennePositionQueue.i*20, anciennePositionQueue.j*20, 20, 20);
    }

    extend(){
        this.tabAnneaux.push(new Anneau(this.ctx, this.tabAnneaux[this.tabAnneaux.length-1].i, this.tabAnneaux[this.tabAnneaux.length-1].j, "blue"));
        this.tabAnneaux[this.tabAnneaux.length-2].color = "green";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let tete = new Anneau(ctx, 10, 10, "red");
    let anneau2 = new Anneau(ctx, 10, 10);
    let anneau3 = new Anneau(ctx, 10, 10);
    let queue = new Anneau(ctx, 10, 10, "blue");
    let anneaux = [tete, anneau2, anneau3, queue];

    let serpent = new Serpent(ctx, 10, 10, 1, anneaux);
    serpent.draw();
    serpent.extend();

    setInterval(function() {
        let random1 = Math.floor(Math.random() * 10);
        if(random1 < 3) {
            let random = Math.floor(Math.random() * 4);
            serpent.move(random);    
        }
    }, 300);

    
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowUp") {
            serpent.move(0);
        } else if (event.key === "ArrowRight") {
            serpent.move(1);
        } else if (event.key === "ArrowDown") {
            serpent.move(2);
        } else if (event.key === "ArrowLeft") {
            serpent.move(3);
        }
    });
});