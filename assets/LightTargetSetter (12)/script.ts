class LightTargetSetterBehavior extends Sup.Behavior {
    awake() {
        
    }

    update() {
        this.actor.light.setTarget(Sup.getActor("car").getPosition());
    }
}
Sup.registerBehavior(LightTargetSetterBehavior);
