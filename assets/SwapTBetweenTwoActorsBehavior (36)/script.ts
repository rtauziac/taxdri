class SwapTBetweenTwoActorsBehavior extends Sup.Behavior {
    public actor1Name: string;
    public actor2Name: string;

    actor1: Sup.Actor;
    actor2: Sup.Actor;
    
    private factor = 0; // moves progressively between 1 and 0
    
    swapActor: boolean = false
    
    awake() {
        this.actor1 = Sup.getActor(this.actor1Name);
        this.actor2 = Sup.getActor(this.actor2Name);
    }
    
    update() {
        this.factor = Sup.Math.lerp(this.factor, this.swapActor ? 1 : 0, 0.07);
        this.actor.setPosition(this.actor1.getPosition().lerp(this.actor2.getPosition(), this.factor));
        this.actor.setOrientation(this.actor1.getOrientation().slerp(this.actor2.getOrientation(), this.factor));
    }
}
Sup.registerBehavior(SwapTBetweenTwoActorsBehavior);
