import { Terrain } from "./land.js";
import { Serpent } from "./snake.js";
import { Anneau } from "./anneau.js";
import { Pomme } from "./pomme.js";

let canvas = document.getElementById('terrain');
let ctx = canvas.getContext('2d');


document.addEventListener('DOMContentLoaded', function() {
    let terrain = new Terrain(20, 20);
    terrain.draw();
    
    let tete = new Anneau(ctx, 10, 10, terrain, "rgb(0,100,0)");
    let anneau2 = new Anneau(ctx, 10, 10, terrain);
    let anneau3 = new Anneau(ctx, 10, 10, terrain);
    let queue = new Anneau(ctx, 10, 10, terrain, "green");
    let anneaux = [tete, anneau2, anneau3, queue];
    
    let serpent = new Serpent(ctx, 10, 10, 1, anneaux);
    serpent.draw();
    serpent.extend();
    
    let pomme = new Pomme(ctx, terrain, 'red');
    pomme.draw();

    function anim() {
      serpent.move(serpent.direction);  
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowUp") {
            starttime = 0;
            serpent.move(0);
        } else if (event.key === "ArrowRight") {
            starttime = 0;
            serpent.move(1);
        } else if (event.key === "ArrowDown") {
            starttime = 0;
            serpent.move(2);
        } else if (event.key === "ArrowLeft") {
            starttime = 0;
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
    const interval = 15000 / maxfps;

    function startRAF(timestamp = 0) {
      animationTimer = requestAnimationFrame(startRAF);
      if (starttime === 0) starttime = timestamp;
      let delta = timestamp - starttime;
      if (delta >= interval) {
        anim();
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

      // Recréer les objets serpent 
      tete = new Anneau(ctx, 10, 10, terrain, "rgb(0,100,0)");
      anneau2 = new Anneau(ctx, 10, 10, terrain);
      anneau3 = new Anneau(ctx, 10, 10, terrain);
      queue = new Anneau(ctx, 10, 10, terrain, "green");
      anneaux = [tete, anneau2, anneau3, queue];

      serpent = new Serpent(ctx, 10, 10, 1, anneaux);
      
      // Dessiner les serpents et le terrain
      terrain.draw();
      serpent.draw();

      let pomme = new Pomme(ctx, terrain, 'red');
      pomme.draw();

      let score = document.getElementById('scoreNumber');
      score.innerHTML = 0;
    });
});