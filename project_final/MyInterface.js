/**
 * MyInterface
 * @constructor
 */ 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	this.gui = new dat.GUI();

	this.error = 0.00001;

	// Clock pause/resume
	this.gui.add(this.scene, 'Pause_Resume_Clock');

	// Drop-Down texture selection
	this.gui.add(this.scene, 'currSubmarineAppearence', [ 'None', 'Rust', 'BlackHole', 'Pizza', 'Eevee', 'Pikachu']);

	// add a group of controls (and open/expand by defult)
	var group=this.gui.addFolder("Luzes");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	group.add(this.scene, 'Luz1');
	group.add(this.scene, 'Luz2');
	group.add(this.scene, 'Luz3');
	group.add(this.scene, 'Luz4');


	this.gui.add(this.scene, 'ResetTargets');
	
	// add a slider
	this.gui.add(this.scene, 'speed', 1, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	switch (event.keyCode)
	{
		case (65):
		case (97):	// only works for capital 'A', as it is
			console.log("Key 'A' pressed");
			if (this.scene.submarine.speed > this.error){
				this.scene.submarine.turn(13 * this.scene.submarine.speed + 0.5);
				this.scene.submarine.setVerticalFinAngle(45);
			}
			else{
				this.scene.submarine.turn(-13 * this.scene.submarine.speed + 0.5);
				this.scene.submarine.setVerticalFinAngle(-45);
			}
			break;
		case(68):
		case (100):
			console.log("Key 'D' pressed");
			if (this.scene.submarine.speed > this.error){
				this.scene.submarine.turn(-13 * this.scene.submarine.speed - 0.5);
				this.scene.submarine.setVerticalFinAngle(-45);
			}
			else{
				this.scene.submarine.turn(13 * this.scene.submarine.speed - 0.5);
				this.scene.submarine.setVerticalFinAngle(45);
			}
			break;
		case(87):
		case (119):
			console.log("Key 'W' pressed");
			this.scene.submarine.addSpeed(-0.0125);
			if (this.scene.submarine.speed < -this.error){
				this.scene.submarine.propellerRight.heliceRotate(1);
				this.scene.submarine.propellerLeft.heliceRotate(1);
			}
			else{
				this.scene.submarine.propellerRight.heliceRotate(-1);
				this.scene.submarine.propellerLeft.heliceRotate(-1);
			}
			break;
		case(83):
		case (115):
			console.log("Key 'S' pressed");
			this.scene.submarine.addSpeed(0.0125);
			if (this.scene.submarine.speed > this.error){
				this.scene.submarine.propellerRight.heliceRotate(1);
				this.scene.submarine.propellerLeft.heliceRotate(1);
			}
			else{
				this.scene.submarine.propellerRight.heliceRotate(-1);
				this.scene.submarine.propellerLeft.heliceRotate(-1);
			}
			break;
		case (80):
		case (112):
			console.log("Key 'P' pressed");
			this.scene.submarine.periscopeMoveUp(true);
			break;
		case (76):
		case (108):
			console.log("Key 'L' pressed");
			this.scene.submarine.periscopeMoveUp(false);
			break;
		case(81):
		case(113):
			console.log("Key 'Q' pressed");
			this.scene.submarine.setHorizontalFinAngle(-45);
			if (this.scene.submarine.speed > this.error)
				this.scene.submarine.addVerticalAngle(-13 * this.scene.submarine.speed - 0.5);
			else
				this.scene.submarine.addVerticalAngle(13 * this.scene.submarine.speed - 0.5);
			break;
		case(69):
		case(101):
			console.log("Key 'E' pressed");
			this.scene.submarine.setHorizontalFinAngle(45);
			if (this.scene.submarine.speed > this.error)
				this.scene.submarine.addVerticalAngle(13 * this.scene.submarine.speed + 0.5);
			else
				this.scene.submarine.addVerticalAngle(-13 * this.scene.submarine.speed + 0.5);
			break;
		case (70):
		case (102):
			console.log("Key 'F' pressed");
			if (this.scene.currentTarget != this.scene.targets.length){
				this.scene.submarine.drawTorpedo();
				this.scene.currentTarget++;
			}
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	switch(event.keyCode){
		case (65):
		case (97):
			console.log("Key 'A' lifted");
			this.scene.submarine.setVerticalFinAngle(0);
			break;
		case(68):
		case (100):
			console.log("Key 'D' lifted");
			this.scene.submarine.setVerticalFinAngle(0);
			break;
		case(81):
		case(113):
			console.log("Key 'Q' lited");
			this.scene.submarine.setHorizontalFinAngle(0);
			break;
		case(69):
		case(101):
			console.log("Key 'E' lited");
			this.scene.submarine.setHorizontalFinAngle(0);
			break;
	}
}