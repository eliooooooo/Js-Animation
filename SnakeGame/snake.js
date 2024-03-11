import { Anneau } from "./anneau.js";

export class Serpent {
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