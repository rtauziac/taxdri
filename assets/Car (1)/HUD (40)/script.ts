class HUDBehavior extends Sup.Behavior {
    private selectedEntry = 0;
    private children: Sup.Actor[];
    private entrySize = 0;
    
    awake() {
        this.children = this.actor.getChildren();
    }

    update() {
        this.entrySize += 1;
        this.actor.setVisible(WorldConfig.pause);
        if (this.actor.getVisible()) {
            if (this.selectedEntry > 0 && Sup.Input.wasKeyJustPressed("UP")) {
                this.selectedEntry = this.selectedEntry - 1;
                this.entrySize = 0;
            }

            if (this.selectedEntry < this.children.length - 1 && Sup.Input.wasKeyJustPressed("DOWN")) {
                this.selectedEntry = this.selectedEntry + 1;
                this.entrySize = 0;
            }

            if (Sup.Input.wasKeyJustPressed("RETURN")) {
                if (this.selectedEntry == 0) {
                    WorldConfig.worldRuler.switchPause();
                }
                else if (this.selectedEntry == 1) {
                    this.children[this.selectedEntry].textRenderer.setText("Day time: " + (WorldConfig.worldRuler.switchNight() ? "Night" : "Day"));
                }
                else if (this.selectedEntry == 2) {
                    if (WorldConfig.bgm.isPlaying()) {
                        WorldConfig.bgm.stop();
                    }
                    else {
                        WorldConfig.bgm.play();
                    }
                    this.children[this.selectedEntry].textRenderer.setText("Music: " + (WorldConfig.bgm.isPlaying() ? "Enabled" : "Disabled"));
                }
                else if (this.selectedEntry == 3) {
                    Sup.loadScene("Main");
                }
                else if (this.selectedEntry == 4) {
                    Sup.exit();
                }
            }

            if (WorldConfig.pause) {
                for (let i = 0; i < this.children.length; i += 1) {
                    let entry = this.children[i];
                    if (i == this.selectedEntry) {
                        entry.setLocalScale(1+Math.abs(Math.sin(Math.min(Math.PI/2, this.entrySize/10)) * 0.3));
                    }
                    else {
                        entry.setLocalScale(1);
                    }
                }
            }
            else {
                this.selectedEntry = 0;
            }
        }
    }
}
Sup.registerBehavior(HUDBehavior);
