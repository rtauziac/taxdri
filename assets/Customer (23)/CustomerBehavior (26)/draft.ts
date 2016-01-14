class CustomerBehavior extends Sup.Behavior {
    awake() {
        this.actor.cannonBody.body.world.gravity = new CANNON.Vec3(0, 0, -8.9);
    }

    update() {
        
    }
}
Sup.registerBehavior(CustomerBehavior);
