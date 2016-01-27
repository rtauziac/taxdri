class SwitchLightBehavior extends Sup.Behavior {
    setLight(light: boolean) {
        Sup.getActor("lightR").setVisible(light);
        Sup.getActor("lightL").setVisible(light);
    }
}
Sup.registerBehavior(SwitchLightBehavior);
