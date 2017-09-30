/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, comprimento = 1, largura = 1, angle = 0) {
	CGFobject.call(this,scene);
	
	this.comprimento = comprimento;
	this.largura = largura;
	this.angle = angle;
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function () {

	this.scene.pushMatrix();
	   this.scene.rotate(-(this.angle), 0, 0, 1);
	   this.scene.scale(0.05 * this.largura, this.comprimento, 1);
	   this.scene.translate(0, 0.5, 0);
	   this.quad.display();
	this.scene.popMatrix();
};

MyClockHand.prototype.setAngle = function (angulo) {

    this.angle += Math.PI * angulo / 180;

}
