/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);

	this.cilinder = new MyCilinder(this.scene, 12, 20);
	this.tampo = new MyPolygon(this.scene, 12);
	this.segundos = new MyClockHand(this.scene, 0.85, 0.40, 270);
	this.minutos = new MyClockHand(this.scene, 0.70, 0.60, 180);
	this.horas = new MyClockHand(this.scene, 0.50, 1, 90);

	this.currTime = 0;

	this.horas.initBuffers();
	this.minutos.initBuffers();
	this.segundos.initBuffers();
	this.tampo.initBuffers();
	this.cilinder.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.update = function(time){
	if (this.currTime == 0){
		this.currTime = time;
		return;
	}
	var dT = time - this.currTime;
	this.currTime = time;
	var angle = dT / 1000.0 * 360;
	this.segundos.setAngle(angle / 60);
	this.minutos.setAngle(angle / 3600);
	this.horas.setAngle(angle / 60 / 60 / 12);
}

MyClock.prototype.display = function () {

	// Segundos
	this.scene.pushMatrix();
	   this.scene.yellowAppearence.apply();
	   this.scene.translate(0,0,0.262);
	   this.segundos.display();
	this.scene.popMatrix();
	
	// Minutos
	this.scene.pushMatrix();
	   this.scene.blackAppearence.apply();
	   this.scene.translate(0,0,0.261);
	   this.minutos.display();
	this.scene.popMatrix();

	// Horas
	this.scene.pushMatrix();
	   this.scene.blackAppearence.apply();
	   this.scene.translate(0,0,0.26);
	   this.horas.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	   this.scene.metalicAppearence.apply();
	   this.scene.scale(1, 1, 0.25);
	   this.cilinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	   this.scene.translate(0, 0, 0.25);
	   this.scene.clockAppearance.apply();
	   this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	   this.scene.translate(0, 0, 0);
	  this.scene.rotate(180 * degToRad, 0, 1, 0);
	    this.scene.metalicAppearence.apply();
	   this.tampo.display();
	this.scene.popMatrix();
};
