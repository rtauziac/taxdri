enum CustomerState {
    waiting,
    carried,
    arrived
}

class CustomerBehavior extends Sup.Behavior {
    private car: CarBehavior;
    private state = CustomerState.waiting;
    private ring: Sup.Actor;
    private destinationRing: Sup.Actor;
    private ringSizeTick = 0;
    destinationName: string;
    private destination: Sup.Actor;

    awake() {
        this.car = Sup.getActor("car").getBehavior(CarBehavior);
        this.actor.cannonBody.body.world.gravity = new CANNON.Vec3(0, 0, -8.9);
        this.state = CustomerState.waiting;
        this.actor.cannonBody.body.linearDamping = 0.95;
        this.actor.cannonBody.body.angularDamping = 0.95;
        
        this.ring = this.actor.getChild("ring");
        this.destination = Sup.getActor(this.destinationName);
        this.destinationRing = this.destination.getChild("ring");
        this.destination.setVisible(false);
    }

    update() {
        const ringBaseSize = 1.5;
        this.ringSizeTick += 1;
        let ringSize = ringBaseSize + Math.cos(this.ringSizeTick/10) * 0.08;
        if (this.state == CustomerState.waiting) {
            this.ring.setLocalScale(ringSize, ringSize, ringSize);
            if (this.car.actor.getPosition().distanceTo(this.actor.getPosition()) < ringBaseSize) {
                if (this.car.takeCustomer(this)) {
                    this.state = CustomerState.carried;
                    this.actor.setVisible(false);
                    this.destination.setVisible(true);
                }
            }
        }
        else if (this.state == CustomerState.carried) {
            this.destinationRing.setLocalScale(ringSize, ringSize, ringSize);
            if (this.destination.getPosition().distanceTo(this.car.actor.getPosition()) < ringBaseSize) {
                if (this.car.isStopped()) {
                    this.car.customerGetOut();
                    this.state = CustomerState.arrived;
                    this.actor.setVisible(true);
                    this.destination.setVisible(false);
                    this.ring.setVisible(false);
                    let positionV3 = this.car.actor.getPosition().add(Sup.Math.Vector3.down().multiplyScalar(0.8).rotate(this.car.actor.getOrientation()))
                    this.actor.cannonBody.body.position = new CANNON.Vec3(positionV3.x, positionV3.y, positionV3.z);
                }
            }
        }
    }

    public destinationPosition() {
        return this.destination.getPosition();
    }
}
Sup.registerBehavior(CustomerBehavior);
