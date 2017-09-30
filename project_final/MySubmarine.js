/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene){
	CGFobject.call(this,scene);

	this.rotation = 0;
	this.PosX = 0;
	this.PosY = 0.3;
	this.PosZ = 0;

	this.speed = 0;

	this.periscopeY = -0.4;

	this.verticalFinRotation = 0;
	this.horizontalFinRotation = 0;

	this.verticalAngle = 0;

	var stacks = 50;
	var slices = 75;

	this.cylinder = new MyCilinder(this.scene, stacks, slices);
	this.sphere = new MyLamp(this.scene, stacks, slices);
	this.cover = new MyPolygon(this.scene, slices);
	this.doubleCilinder = new MyDoubleCilinder(this.scene, stacks, slices);

	this.periscope = new MyPeriscope(this.scene);
	this.propellerRight = new MyPropeller(this.scene, 1);
	this.propellerLeft = new MyPropeller(this.scene, -1);

	this.trapezeSail = new MyTrapeze(this.scene, 1.42, 1, 0.05, 0.2);
	this.trapezeStern =  new MyTrapeze(this.scene, 2.34, 1.64, 0.05, 0.2);

	this.suport = new MyUnitCube(this.scene);
	this.torpedos = [];
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MyQuad;

MySubmarine.prototype.display = function() {
	
	this.scene.pushMatrix();
	this.scene.translate(8 + this.PosX, 4.5 + this.PosY, 9.54 + this.PosZ);
	this.scene.rotate(180 * degToRad + this.rotation, 0, 1, 0);
	this.scene.rotate(this.verticalAngle * degToRad, 1, 0, 0);
	this.scene.translate(0, 0, -2.04);

	this.move();

	//Body
	this.scene.pushMatrix();
		this.scene.scale(0.365, 0.7, 4.08);
		this.cylinder.display();
	this.scene.popMatrix();

	//Nose
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 4.08);
		this.scene.scale(0.365, 0.7, 0.5);
		this.sphere.display();
	this.scene.popMatrix();

	//Bottom
	this.scene.pushMatrix();
		this.scene.rotate(-180 * degToRad, 1, 0, 0);
		this.scene.scale(0.365, 0.7, 0.5);
		this.sphere.display();
	this.scene.popMatrix();

	//Sail
	this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 2.7);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(0.25, 0.88/2, 0.7);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 1.20, 2.7);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
	 	this.scene.scale(0.251, 0.441, 0);
	   	this.cover.display();
	this.scene.popMatrix();

	//Periscope
	this.scene.pushMatrix();
		this.scene.translate(0, 1 + this.periscopeY, 3);
		this.periscope.display();
	this.scene.popMatrix();

	//Propeller - left
	this.scene.pushMatrix();
		this.scene.translate(0.365+0.19, -0.2, 0);
		this.propellerLeft.display();
	this.scene.popMatrix();

	//Propeller - right
	this.scene.pushMatrix();
		this.scene.translate(-(0.365+0.19), -0.2, 0);
		this.propellerRight.display();
	this.scene.popMatrix();

	//Sail plane
	this.scene.pushMatrix();
		this.scene.translate(0, 0.9, 2.7);
		this.scene.rotate(-180 * degToRad, 1, 0, 0);
		this.trapezeSail.display();
	this.scene.popMatrix();

	//Stern planes
	this.scene.pushMatrix();
		this.scene.rotate(this.horizontalFinRotation * degToRad, 1, 0, 0);
		this.scene.translate(0, 0.05, -0.1);
		this.trapezeStern.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.verticalFinRotation * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, -0.1);
		this.scene.rotate(90 * degToRad, 0, 0, 1);
		this.trapezeStern.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

	// Torpedos
	for (var i = 0; i < this.torpedos.length; i++){
		if (this.torpedos[i].going){
			this.scene.pushMatrix();
				this.torpedos[i].display();
			this.scene.popMatrix(); 
		}
	}
}

MySubmarine.prototype.turn = function(angle) {
	this.rotation += Math.PI * angle / 180;
}

MySubmarine.prototype.move = function() {
	this.PosX += Math.cos(this.verticalAngle * degToRad) * Math.sin(this.rotation) * this.speed;
	this.PosZ += Math.cos(this.verticalAngle * degToRad) * Math.cos(this.rotation) * this.speed;
	this.PosY += Math.sin(this.verticalAngle * degToRad) * this.speed;
}

MySubmarine.prototype.periscopeMoveUp = function(value) {
	if (value && this.periscopeY < 0.05)
		this.periscopeY += 0.05;
	else if (!value && this.periscopeY > -0.4)
		this.periscopeY -= 0.05;
}

MySubmarine.prototype.setVerticalFinAngle = function(angle) {
	this.verticalFinRotation = angle;
}

MySubmarine.prototype.setHorizontalFinAngle = function(angle) {
	this.horizontalFinRotation = angle;
}

MySubmarine.prototype.addVerticalAngle = function(angle){
	this.verticalAngle += angle;
}

MySubmarine.prototype.addSpeed = function(value){
	this.speed += value;
}

MySubmarine.prototype.drawTorpedo = function(){
	this.torpedos.push(new MyTorpedo(this.scene, this.PosX + 8, this.PosY + 4.5, this.PosZ + 7.5, this.verticalAngle * degToRad, this.rotation + Math.PI, this.scene.currentTarget));
}