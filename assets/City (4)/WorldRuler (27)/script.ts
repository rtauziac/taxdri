module WorldConfig {
    export var carBodyMaterial: CANNON.Material;
    export var defaultBodyMaterial: CANNON.Material;
}

class WorldRulerBehavior extends Sup.Behavior {
    awake() {
        /*WorldConfig.carBodyMaterial = new CANNON.Material("car material");
        WorldConfig.carBodyMaterial.friction = 0;
        WorldConfig.defaultBodyMaterial = new CANNON.Material("default material");
        
        let worldActor = Sup.getActor("map");
        worldActor.cannonBody.body.material = WorldConfig.defaultBodyMaterial;
        let carActor = Sup.getActor("car");
        carActor.cannonBody.body.material = WorldConfig.carBodyMaterial;
        
        let carContactMat = new CANNON.ContactMaterial(WorldConfig.carBodyMaterial, WorldConfig.defaultBodyMaterial, {friction: 0});
        carActor.cannonBody.body.world.addContactMaterial(carContactMat);*/
        Sup.getActor("car").cannonBody.body.material.friction = 0;
    }

    //update() {
        
    //}
}
Sup.registerBehavior(WorldRulerBehavior);