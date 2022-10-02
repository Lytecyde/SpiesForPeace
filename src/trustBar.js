export default class TrustBar {

    constructor (x, y, scene, trust)
    {
        this.x = x;
        this.y = y;
        this.trust = trust;
        this.scene = scene;
        this.tbar = new Phaser.GameObjects.Rectangle(scene,this.x , this.y - 16 - 3, 1 + (3 * trust), 3 , 0xffffff);        
        scene.add.existing(this.tbar);
    }

    draw (trust) {  
        console.log(trust);
        this.tbar.setSize(4 + (2 * trust), 3);
        var gray = trust * 40 + 50;
        var color = Phaser.Display.Color.GetColor(gray, gray, gray);
        this.tbar.setFillStyle(color);
        this.tbar.active = true;
    }
}