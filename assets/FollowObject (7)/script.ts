class FollowObjectBehavior extends Sup.Behavior {
    public actorName: string;
    actorToFollow: Sup.Actor;

    awake() {
        this.actorToFollow = Sup.getActor(this.actorName);
    }

    update() {
        this.actor.setPosition(this.actorToFollow.getPosition());
    }
}
Sup.registerBehavior(FollowObjectBehavior);
