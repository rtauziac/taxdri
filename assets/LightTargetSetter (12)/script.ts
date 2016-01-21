class LightTargetSetterBehavior extends Sup.Behavior {
    objectName: string;
    private objectToLookAt: Sup.Actor;
    
    awake() {
        this.objectToLookAt = Sup.getActor(this.objectName);
    }
    
    update() {
        this.actor.light.setTarget(this.objectToLookAt.getPosition());
    }
}
Sup.registerBehavior(LightTargetSetterBehavior);
 