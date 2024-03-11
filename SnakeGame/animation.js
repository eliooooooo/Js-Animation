import { Terrain } from "./land.js";
import { Serpent } from "./snake.js";
import { Anneau } from "./anneau.js";

let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');

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