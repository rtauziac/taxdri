enum CustomerState {
    waiting,
    carried,
    arrived
}

class CustomerBehavior extends Sup.Behavior {
    state = CustomerState.waiting;

    awake() {
        this.actor.cannonBody.body.world.gravity = new CANNON.Vec3(0, 0, -8.9);
        this.state = CustomerState.waiting;
    }

    update() {
        this.actor.cannonBody.body.linearDamping = 0.95;
        this.actor.cannonBody.body.angularDamping = 0.95;
    }
}
Sup.registerBehavior(CustomerBehavior);
