class HUD2Behavior extends Sup.Behavior {
    totalCustomers = 20;
    customersCount = 0;
    scoreDisplay: Sup.TextRenderer;
    tick = 0;
    timerDisplay: Sup.TextRenderer;
    timerStartTick: number = null;
    timerEndTick: number = null;
    
    awake() {
        this.scoreDisplay = this.actor.getChild("score").textRenderer;
        this.timerDisplay = this.actor.getChild("timer").textRenderer;
        WorldConfig.hud2 = this;
    }

    update() {
        this.tick += 1;
        this.actor.setVisible(!WorldConfig.pause);
        
        this.scoreDisplay.setText(this.customersCount + "/" + this.totalCustomers);
        
        let totalSeconds: number;
        if (this.timerEndTick != null) {
            totalSeconds = (this.timerEndTick - this.timerStartTick) / 60;
        }
        else if (this.timerStartTick != null) {
            totalSeconds = (this.tick - this.timerStartTick) / 60;
        }
        else {
            totalSeconds = 0;
        }
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let deciSeconds = (Math.floor((totalSeconds % 1)*100));
        
        this.timerDisplay.setText(minutes + (seconds < 10 ? ":0" : ":") + seconds + (deciSeconds < 10 ? ":0" : ":") + deciSeconds);
    }
    
    startTimer() {
        if (this.timerStartTick == null) {
            this.timerStartTick = this.tick;
        }
    }

    addCustomer() {
        this.customersCount += 1;
        if (this.customersCount == this.totalCustomers) {
            this.timerEndTick = this.tick;
        }
    }
}
Sup.registerBehavior(HUD2Behavior);
