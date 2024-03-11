import { Terrain } from "./land.js";

let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

class Anneau {

    constructor(ctx, i, j, terrain = new Terrain(20, 20), color = 'green' ) {
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        this.terrain = terrain;
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

        
        let tete = this.tabAnneaux[0];
        if (tete.read(d)) {
            for (let i = this.tabAnneaux.length - 1; i > 0; i--) {
                this.tabAnneaux[i].copy(this.tabAnneaux[i-1]);
            }
            
            this.ctx.clearRect(anciennePositionQueue.i*20, anciennePositionQueue.j*20, 20, 20);
            tete.move(d);
            tete.terrain.write(tete.i, tete.j, 1);
            queue.terrain.write(queue.i, queue.j, 0);
        }

    }

    extend(){
        let dernierAnneau = this.tabAnneaux[this.tabAnneaux.length-1];
        this.tabAnneaux.push(new Anneau(this.ctx, dernierAnneau.i, dernierAnneau.j, dernierAnneau.terrain, "blue"));
        this.tabAnneaux[this.tabAnneaux.length-2].color = "green";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let terrain = new Terrain(20, 20);
    terrain.draw();

    let tete = new Anneau(ctx, 10, 10, terrain, "red");
    let anneau2 = new Anneau(ctx, 10, 10, terrain);
    let anneau3 = new Anneau(ctx, 10, 10, terrain);
    let queue = new Anneau(ctx, 10, 10, terrain, "blue");
    let anneaux = [tete, anneau2, anneau3, queue];

    let tete2 = new Anneau(ctx, 5, 5, terrain, "red");
    let anneau22 = new Anneau(ctx, 5, 5, terrain);
    let anneau32 = new Anneau(ctx, 5, 5, terrain);
    let queue2 = new Anneau(ctx, 5, 5, terrain, "blue");
    let anneaux2 = [tete2, anneau22, anneau32, queue2];

    let serpent = new Serpent(ctx, 10, 10, 1, anneaux);
    let serpent2 = new Serpent(ctx, 5, 5, 1, anneaux2);
    serpent2.draw();
    serpent.draw();
    serpent.extend();

    function anim() {
      let random = Math.floor(Math.random() * 4);
      let random2 = Math.floor(Math.random() * 4);
      serpent.move(random);    
      serpent2.move(random2);
    }
    
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

    let start = document.getElementById('start');
    let pause = document.getElementById('pause');
    let resume = document.getElementById('resume');
    let stop = document.getElementById('stop');

    // Identifiant du "timer"
    let animationTimer = 0;
    let starttime = 0;
    // Fréquence d'affichage maximum
    const maxfps = 60;
    const interval = 1000;
    console.log('interval', interval);


    function startRAF(timestamp = 0) {
      animationTimer = requestAnimationFrame(startRAF);
      if (starttime === 0) starttime = timestamp;
      let delta = timestamp - starttime;
      anim();
      if (delta >= interval) {
        // Appel à la fonction d'animation
        // anim();
        starttime = timestamp - (delta % interval);
      }
    }

    // Fonction permettant d'arrêter l'animation
    function stopRAF() {
      cancelAnimationFrame(animationTimer);
      animationTimer = 0;
    }

    // boutons de contrôle de la partie
    start.addEventListener('click', function() {
      startRAF();
      pause.style.display = 'block';
      start.style.display = 'none';
    });
    pause.addEventListener('click', function(){
      stopRAF();
      pause.style.display = 'none';
      resume.style.display = 'block';
      stop.style.display = 'block';
    });
    resume.addEventListener('click', function(){
      startRAF();
      pause.style.display = 'block';
      resume.style.display = 'none';
      stop.style.display = 'none';
    });
    stop.addEventListener('click', function(){
      stopRAF();
      pause.style.display = 'none';
      resume.style.display = 'none';
      stop.style.display = 'none';
      start.style.display = 'block';
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      terrain = new Terrain(20, 20);

      // Recréer les objets serpent et serpent2
      tete = new Anneau(ctx, 10, 10, terrain, "red");
      anneau2 = new Anneau(ctx, 10, 10, terrain);
      anneau3 = new Anneau(ctx, 10, 10, terrain);
      queue = new Anneau(ctx, 10, 10, terrain, "blue");
      anneaux = [tete, anneau2, anneau3, queue];

      tete2 = new Anneau(ctx, 5, 5, terrain, "red");
      anneau22 = new Anneau(ctx, 5, 5, terrain);
      anneau32 = new Anneau(ctx, 5, 5, terrain);
      queue2 = new Anneau(ctx, 5, 5, terrain, "blue");
      anneaux2 = [tete2, anneau22, anneau32, queue2];

      serpent = new Serpent(ctx, 10, 10, 1, anneaux);
      serpent2 = new Serpent(ctx, 5, 5, 1, anneaux2);

      // Dessiner les serpents et le terrain
      terrain.draw();
      serpent2.draw();
      serpent.draw();
      serpent.extend();
    });
});