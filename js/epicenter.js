export default class Epicenter {
    constructor(scene, x, y) {

        this.graphics = [];
        this.circles = [];
        this.createGraphics(scene, x, y, 0x000000, 128);   // graphics0
        this.createGraphics(scene, x, y, 0xffff00, 96); // graphics1
        this.createGraphics(scene, x, y, 0xff0000, 64); // graphics2
        this.createGraphics(scene, x, y, 0xffffff, 32); // graphics3
      

        this.scene = scene;    
        this.graphics.forEach((g) => { scene.physics.add.existing(g)}, this);
    }

    createGraphics(scene, x, y, color, radius) {
        const graphics = scene.add.graphics();
        graphics.lineStyle(1, color);
        const circle = new Phaser.Geom.Circle(x, y, radius);
        graphics.strokeCircleShape(circle);
        graphics.setInteractive(new Phaser.Geom.Circle(x, y, radius), Phaser.Geom.Circle.Contains);
        this.graphics.push(graphics);
        this.circles.push(circle);
    }

    getDamageLevel(spy) {
        console.log("damage level calculation");
        this.spy = spy;
        var i = 0;
        const graphs = this.graphics;
        console.log(graphs.length + "graphs.length");
        let damage = 0;
        for(let i = 0; i < graphs.length ; i++) {
            const isInside = Phaser.Geom.Circle.ContainsPoint(this.circles[i], spy);
            if(isInside){
                damage = i;    
                if(i == 0) {
                    spy.stress -= 1;
                }
            }
        };
        console.log(damage + "damage");
        return damage;
    }

    remove() {
        this.graphics.forEach((g) => { g.destroy()}, this);
    }
}