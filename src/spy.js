export default class Spy extends Phaser.GameObjects.Sprite {
    constructor (scene, alignment, x, y)
    {
        super(scene, x, y);

        this.alignment = alignment;

        this.setTexture('baddies');
        this.setPosition(x, y);

        this.play(this.alignment + 'Idle');

        scene.add.existing(this);

        this.alive = true;

        //should have a trust bar

    }

    talk () {
        if (spymetspy()) {

        }
    }

    bomb () {

    }

    stress () {

    }

    dead () {

    }

}