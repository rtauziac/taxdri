class CarBehavior extends Sup.Behavior {
    private speed = 0;
    private acceleration = 0;
    private turnRate = 0;
    private moveBackward = false;
    private leftWheel: Sup.Actor;
    private rightWheel: Sup.Actor;
    private customer: CustomerBehavior = null;
    private arrow: Sup.Actor;

    awake() {
        this.leftWheel = Sup.getActor("wheel fl");
        this.rightWheel = Sup.getActor("wheel fr");
        this.actor.cannonBody.body.material.friction = 0;
        this.arrow = this.actor.getChild("arrow");
        this.arrow.setVisible(false);
    }
    
    update() {
        const maxTurnRate = 0.06;
        const visualTurnRate = 0.8;
                
        if (Sup.Input.wasKeyJustPressed("DOWN")) {
            if (this.speed < 0.01) {
                this.moveBackward = true;
            }
        }
        if (Sup.Input.wasKeyJustReleased("DOWN")) {
            this.moveBackward = false;
        }
                        
        this.actor.cannonBody.body.angularVelocity = new CANNON.Vec3(0, 0, 0);
        if (Sup.Input.isKeyDown("LEFT")) {
            if (!this.moveBackward) {
                this.turnRate = Math.min(maxTurnRate * Math.min(this.speed/3, 1), this.turnRate + 0.008);                
            }
            else {
                this.turnRate = Math.max(maxTurnRate * Math.min(this.speed/3, 1), this.turnRate - 0.008);
            }
            this.leftWheel.setLocalEulerAngles(0, visualTurnRate, 0);
            this.rightWheel.setLocalEulerAngles(0, visualTurnRate, 0);
        }
        else if (Sup.Input.isKeyDown("RIGHT")) {
            if (!this.moveBackward) {
                this.turnRate = Math.max(-maxTurnRate * Math.min(this.speed/3, 1), this.turnRate - 0.008);
            }   
            else {
                this.turnRate = Math.min(-maxTurnRate * Math.min(this.speed/3, 1), this.turnRate + 0.008);
            }
            this.leftWheel.setLocalEulerAngles(0, -visualTurnRate, 0);
            this.rightWheel.setLocalEulerAngles(0, -visualTurnRate, 0);
        }
        else {
            this.turnRate *= 0.8
            this.leftWheel.setLocalEulerAngles(0, 0, 0);
            this.rightWheel.setLocalEulerAngles(0, 0, 0);
        }
        let angle: number = this.actor.cannonBody.body.quaternion.toAxisAngle(new CANNON.Vec3(0, 0, 1))[1];
        let orientation = new CANNON.Quaternion();
        let finalAngle = angle + this.turnRate;
        if (finalAngle < 0) { finalAngle += Math.PI*2; }
        if (finalAngle > Math.PI*2) { finalAngle -= Math.PI*2; }
        orientation.setFromEuler(0, 0, finalAngle);
        this.actor.cannonBody.body.quaternion = orientation;
        
        //this.rightWheel.setLocalEulerAngles(0, this.turnRate * 20, 0);
                
        const maxSpeed = 6;
        const accel = 0.13;
        const breaks = 0.8;
        if (Sup.Input.isKeyDown("UP")) {
            this.acceleration = this.speed < maxSpeed ? accel : 0;
        }
        else if (Sup.Input.isKeyDown("DOWN")) {
            if (this.moveBackward) {
                this.acceleration = this.speed > -maxSpeed/3 ? -accel : 0;
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
                
        let zAngle = this.actor.getEulerZ();
        this.actor.cannonBody.body.velocity = new CANNON.Vec3(this.speed * Math.cos(zAngle), this.speed * Math.sin(zAngle), 0), new CANNON.Vec3(0, 0, 0);
        
        if (this.customer != null && this.actor.getPosition().distanceTo(this.customer.destinationPosition()) > 3) {
            this.arrow.setVisible(true);
            this.arrow.lookAt(this.customer.destinationPosition(), Sup.Math.Vector3.back());
        }
        else {
            this.arrow.setVisible(false);
        }
    }

    public takeCustomer(customer: CustomerBehavior) {
        if (this.isStopped() && this.customer == null) {
                this.customer = customer
                return true;
        }
        return false;
    }

    public customerGetOut() {
        this.customer = null;
    }

    public isStopped() {
        return Math.abs(this.speed) < 0.01;
    }
}
Sup.registerBehavior(CarBehavior);
