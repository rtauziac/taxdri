class CarBehavior extends Sup.Behavior {
    speed = 0;
    acceleration = 0;
    turnRate = 0;
    moveBackward = false;
    
    awake() {}

    update() {
        this.actor.cannonBody.body.angularVelocity = new CANNON.Vec3(0, 0, 0);
        if (Sup.Input.isKeyDown("LEFT")) {
            this.turnRate = 0.02 * Math.min(this.speed, 3);
        }
        else if (Sup.Input.isKeyDown("RIGHT")) {
            this.turnRate = -0.02 * Math.min(this.speed, 3);
        }
        else {
            this.turnRate *= 0.8
        }
        let angle: number = this.actor.cannonBody.body.quaternion.toAxisAngle(new CANNON.Vec3(0, 0, 1))[1];
        let orientation = new CANNON.Quaternion();
        let finalAngle = angle + this.turnRate;
        if (finalAngle < 0) { finalAngle += Math.PI*2; }
        if (finalAngle > Math.PI*2) { finalAngle -= Math.PI*2; }
        orientation.setFromEuler(0, 0, finalAngle);
        this.actor.cannonBody.body.quaternion = orientation;
        
        if (Sup.Input.wasKeyJustPressed("DOWN")) {
            if (this.speed < 0.01) {
                this.moveBackward = true;
            }
        }
        if (Sup.Input.wasKeyJustReleased("DOWN")) {
            this.moveBackward = false;
        }
        
        const maxSpeed = 5;
        const accel = 0.15;
        const breaks = 0.4
        if (Sup.Input.isKeyDown("UP")) {
            this.acceleration = this.speed < maxSpeed ? accel : 0;
        }
        else if (Sup.Input.isKeyDown("DOWN")) {
            if (this.moveBackward) {
                this.acceleration = this.speed > -maxSpeed/3 ? -breaks : 0;
            }
            else {
                if (this.speed < breaks) {
                    this.acceleration = - this.speed;
                }
                else {
                    this.acceleration = this.speed > 0 ? -accel : 0;
                }
            }
        }
        else {
            const deceleration = 0.05;
            if (this.speed < -deceleration) {
                this.acceleration = deceleration
            }
            else if (this.speed > deceleration) {
                this.acceleration = -deceleration;
            }
            else {
                this.acceleration = -this.speed;
            }
        }
        
        this.speed += this.acceleration;
        
        //this.actor.moveOrientedY(this.speed);
        let zAngle = this.actor.getEulerZ();
        this.actor.cannonBody.body.velocity = new CANNON.Vec3(this.speed * Math.cos(zAngle), this.speed * Math.sin(zAngle), 0), new CANNON.Vec3(0, 0, 0);
        
        //debug
        if (Sup.Input.isKeyDown("R")) {
            this.actor.setLocalPosition(new Sup.Math.Vector3(0, 0, 0));
            this.speed = 0;
            this.acceleration = 0;
        }
    }
}
Sup.registerBehavior(CarBehavior);