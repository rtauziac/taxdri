module WorldConfig {
    export var pause = true;
    export var bgm: Sup.Audio.SoundPlayer;
    export var worldRuler: WorldRulerBehavior;
    export var car: CarBehavior;
}

class WorldRulerBehavior extends Sup.Behavior {
    private night = false;
    
    awake() {
        WorldConfig.worldRuler = this;
        this.setNight(false);
        if (WorldConfig.bgm) { WorldConfig.bgm.stop(); }
        WorldConfig.bgm = Sup.Audio.playSound("Theme", 1, {loop:true});
    }

    switchNight() {
        this.night = !this.night;
        this.setNight(this.night);
        return this.night;
    }

    setNight(night: boolean) {
        Sup.getActor("lightR").light.setIntensity(night ? 2 : 0);
        Sup.getActor("lightR").light.setCastShadow(night);
        Sup.getActor("lightL").light.setIntensity(night ? 2 : 0);
        Sup.getActor("lightL").light.setCastShadow(night);
        Sup.getActor("sun light").light.setIntensity(night ? 0 : 1.5);
        Sup.getActor("phareR").setVisible(night);
        Sup.getActor("phareL").setVisible(night);
        Sup.getActor("sun light").light.setCastShadow(!night);
        Sup.getActor("skybox").cubicModelRenderer.setCubicModel(night ? "Skybox night" : "Skybox day");
    }

    update() {
        if (Sup.Input.wasKeyJustPressed("ESCAPE")) {
            this.switchPause();
        }
        
        /*if (Sup.Input.wasKeyJustPressed("N")) {
            this.night = !this.night;
            this.setNight(this.night);
        }*/
    }

    switchPause() {
        WorldConfig.pause = !WorldConfig.pause;
        let swap = Sup.getActor("camera").getBehavior(SwapTBetweenTwoActorsBehavior);
        swap.swapActor = !swap.swapActor;
    }
}
Sup.registerBehavior(WorldRulerBehavior);
