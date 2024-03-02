//------------- Fonctions utiles -------------

// Fonction générant des nombres pseudo-aléatoires entiers
// entre 0 et max (max non compris)
function getRandomInt(max)
{
	return Math.floor(Math.random()*max);
}
	
// Fonction générant une couleur aléatoire
function getRandomColor()
{
	const red   = getRandomInt(256);
	const blue  = getRandomInt(256);
	const green = getRandomInt(256);
	return "rgb("+red+","+green+","+blue+")";
}

//------------- Votre code ici -------------

const canvas1 = document.getElementById('mobile1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('mobile2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('mobile3');
const ctx3 = canvas3.getContext('2d');

class Mobile {
	constructor(ctx, x, y, radius, vx = getRandomInt(8)+2, vy = getRandomInt(8)+2) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.radius = radius;
		this.color = getRandomColor();
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}

	move() {
		const canvasWidth = this.ctx.canvas.clientWidth;
		const canvasHeight = this.ctx.canvas.clientHeight;

		if(this.x + this.vx > canvasWidth) {
			this.x = 0;
		} else if (this.y + this.vy > canvasHeight) {
			this.y = 0;
		} else {
			this.x = this.x + this.vx;
		}

		this.draw();
	}

	moveInBox() {
		const canvasWidth = this.ctx.canvas.clientWidth;
		const canvasHeight = this.ctx.canvas.clientHeight;

		if (this.x + this.radius + this.vx > canvasWidth || this.x - this.radius + this.vx < 0) {
			this.vx = -this.vx;
		} else if (this.y + this.radius + this.vy > canvasHeight || this.y - this.radius + this.vy < 0) {
			if (this.y + this.radius + this.vy > canvasHeight) { this.vy += 0.40; }
			this.vy = -this.vy;
		}
		this.vy += 0.40; // gravité
		this.vx *= 0.98; // friction
		this.vy *= 0.98; // friction

		this.x += this.vx;
		this.y += this.vy;
		
		this.draw();
	}
}

class MobileBox {
	constructor(ctx, xMin, yMin, xMax, yMax, mobTab = []) {
		this.ctx = ctx;
		this.xMin = xMin;
		this.yMin = yMin;
		this.xMax = xMax;
		this.yMax = yMax;
		this.mobTab = mobTab;
	}

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

	fillBox(n) {
		if (this.mobTab.length > 0) {
			this.clearBox();
		}
		for (let i = 0; i < n; i++){
			const x = getRandomInt(this.xMax - this.xMin);
			const y = getRandomInt(this.yMax - this.yMin);

			const vx = 1 + getRandomInt(9);
			const vy = 1 + getRandomInt(9);

			// const radius = getRandomInt(40) + 10;
			const radius = 100;

			const mob = new Mobile(this.ctx, x, y, vx, vy, radius);

			this.mobTab.push(mob);
		}
	}

	clearBox() {
		this.mobTab.splice(0, this.mobTab.length);
	}

	anim() {
		this.ctx.clearRect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin);
		this.mobTab.forEach(element => {
			element.moveInBox();
			element.draw();
		});
		this.draw();
	}

	switchGravity() {
		this.mobTab.forEach(element => {
			element.vy = -element.vy;
		});
	}
}

document.addEventListener('DOMContentLoaded', function() {

	const Box1 = new MobileBox(ctx1, 0, 0, 400, 400);
	const Box2 = new MobileBox(ctx2, 0, 0, 200, 600);
	const Box3 = new MobileBox(ctx3, 0, 0, 500, 300);

	function submitForm() {
		const input = document.querySelector('input[name="number"]');
		return input ? input.value : null;
	}

	const form = document.getElementsByTagName('form');
	form[0].addEventListener('submit', function(event) {
		event.preventDefault();
		const nbMob = submitForm();
		if(nbMob === null || nbMob === '' || nbMob === undefined) {
			alert('Veuillez renseigner un nombre de mobiles');
		} else {
			Box1.fillBox(nbMob);
			Box2.fillBox(nbMob);
			Box3.fillBox(nbMob);
			stopRAF();
			startRAF();
		}
	});

	// Identifiant du "timer"
	let animationTimer = 0;
	let starttime = 0;
	// Fréquence d'affichage maximum
	const maxfps = 60;
	const interval = 1000 / maxfps;

	// Fonction permettant de démarrer l'animation
	function startRAF(timestamp = 0) {
		animationTimer = requestAnimationFrame(startRAF);
		if (starttime === 0) starttime = timestamp;
		let delta = timestamp - starttime;
		Box1.anim();
		Box2.anim();
		Box3.anim();
		if (delta >= interval) {
			// Appel à la fonction d'animation
			Box1.anim();
			Box2.anim();
			Box3.anim();
			starttime = timestamp - (delta % interval);
		}
	}

	// Fonction permettant d'arrêter l'animation
	function stopRAF() {
		cancelAnimationFrame(animationTimer);
		animationTimer = 0;
	}

	const startBtn = document.getElementById('start');
	startBtn.addEventListener('click', startRAF);

	const stopBtn = document.getElementById('stop');
	stopBtn.addEventListener('click', stopRAF);

	const gravity = document.getElementById('gravity');
	gravity.addEventListener('click', switchGravity);
});