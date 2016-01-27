class LookAtObjectBehavior extends Sup.Behavior {
    objectName: string;
    private objectToLook: Sup.Actor;
    
    awake() {
        this.objectToLook = Sup.getActor(this.objectName);
    }

    update() {
        this.actor.lookAt(this.objectToLook.getPosition(), Sup.Math.Vector3.forward());
    }
}
Sup.registerBehavior(LookAtObjectBehavior);
