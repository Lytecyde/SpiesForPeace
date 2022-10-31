export default class TrustBar extends Phaser.GameObjects.Rectangle {

    constructor (x, y, scene, trust)
    {   
        super(scene, x , y - 16 - 3, 1 + (3 * trust), 3 , 0xffffff);
        this.x = x;
        this.y = y;
        this.trust = trust;
        this.scene = scene;        
        scene.add.existing(this);
    }

    draw (trust) {  
        console.log(trust);
        this.setSize(14, 3);
        var gray = trust * 40 + 50;
        var color = Phaser.Display.Color.GetColor(gray, gray, gray);
        this.setFillStyle(color);
        this.active = true;
        this.scene.add.existing(this);
    }

    drawBlack (trust) {
        console.log(trust);
        this.setSize(14 - (2 * trust), 3);
        var gray = ((5 - trust) * - 20  + 255);
        var color = Phaser.Display.Color.GetColor(gray, gray, gray);
        this.setFillStyle(color);
        this.active = true;
        this.scene.add.existing(this);
    }

    drawWhite (trust) {
        console.log(trust);
        this.setSize(14 - (2 * trust), 3);
        var gray = (trust) * - 20 + 128;
        var color = Phaser.Display.Color.GetColor(gray, gray, gray);
        this.setFillStyle(color);
        this.active = true;
        this.scene.add.existing(this);
    }
}