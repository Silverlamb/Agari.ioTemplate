/*
	By: Silverlamb :) (don't remove)
*/

let w = window.innerWidth;
let h = window.innerHeight;
var SCENE_W = 7500;
var SCENE_H = 7500;

var newFood = (new Date()).getTime();

function setup() {
	createCanvas(w, h);

	foods = new Group();
	
	main = createSprite(SCENE_W/2, SCENE_H/2, 60, 60);
	main.R = random(0,255);
	main.G = random(0,255);
	main.B = random(0,255);
	main.mass = 30;
	main.visible = false;
	main.setCollider("circle", 0, 0, main.mass/2);
	main.friction = .03;
	
	camera.zoom = 200/(main.mass+50);
	
}

function draw() {
	background(255, 255, 255);
	foodGen();
	foodshow();

	main.velocity.x = (camera.mouseX-main.position.x)/main.mass;
	main.velocity.y = (camera.mouseY-main.position.y)/main.mass;

	if(main.position.x < 0){
		main.position.x = 0;
	}
	if(main.position.y < 0){
		main.position.y = 0;
	}
	if(main.position.x > SCENE_W){
		main.position.x = SCENE_W;
	}
	if(main.position.y > SCENE_H){
		main.position.y = SCENE_H;
	}

	eat();
	
	camera.position.x = main.position.x;
	camera.position.y = main.position.y;

	drawSprites();

	var c = color(main.R, main.G, main.B)
	fill(c);
	ellipse(main.position.x, main.position.y, main.mass, main.mass);
	
	camera.off();
}

function foodGen(){
	if((new Date()).getTime() - newFood > 10 && foods.length < 750){
		var f = createSprite(random(0, SCENE_W), random(0, SCENE_H), 20, 20);
		f.R = random(0, 255);
		f.G = random(0, 255);
		f.B = random(0, 255);
		f.visible = false;
		f.mass = 10;
		f.setCollider("circle", 0, 0, f.mass/2);
		foods.add(f)
		newFood = (new Date()).getTime();
	}
}

function foodshow(){
	for(var i = 0; i<foods.length; i++){
		var f = foods[i]
		var c = color(f.R, f.G, f.B)
		fill(c);
		ellipse(f.position.x, f.position.y, f.mass, f.mass);
	}
}

function eat() {
	for(var i = 0; i<foods.length; i++){
		var f = foods[i];
		if(main.overlap(f)){
			main.mass += f.mass/(main.mass/30)
			f.remove()
			camera.zoom = 200/(main.mass+50);
			main.setCollider("circle", 0, 0, main.mass/2); 
		}
	}
}
