export default class AlignmentBar {

    constructor (scene)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.endMessage;
        this.x = 2;
        this.y = 34;
        this.value = 392;
       
        this.blackspies = 12; 
        this.whitespies = 12;    
        this.grayspies = 1;   
        this.percentageBlack = this.blackspies / 100;
        this.percentageWhite = this.whitespies / 100;
        this.percentageGray = this.grayspies / 100; 
        this.draw();
        //end message text
        this.text = scene.add.text(32, 64, '', { font: '32px Courier', fill: '#808080' });
        scene.add.existing(this.bar);
    }

    percentages ()
    {
        var sum = this.blackspies + this.whitespies + this.grayspies;
        this.percentageBlack = this.blackspies / sum;
        this.percentageWhite = this.whitespies / sum;
        this.percentageGray = this.grayspies / sum; 
    }

    decrease ()
    {
        this.blackspies -= 1;

        if (this.blackspies < 0)
        {
            this.blackspies = 0;
            this.end();
        }
    
        this.draw();
    }

    increase ()
    {
        this.value += 60;
        
        if (this.value > 400)
        {
            this.value = 400;
        }
        
        this.draw();
        
    }



    draw ()
    {
        this.bar.clear();
        this.percentages();
        //  BG border
        this.bar.fillStyle(0x000000, 0.1);
        this.bar.fillRect(this.x, this.y, 398, 16);

        //  white
        this.bar.fillStyle(0xffffff, 0.3);
        var whitebar = this.bar.fillRect(this.x + 2, this.y + 2, 394, 12);
        whitebar;
        //gray
        this.bar.fillStyle(0x808080, 0.3);
        var dGray = Math.floor(this.percentageWhite * 4 * 100);
        var graybar = this.bar.fillRect(this.x + 2, this.y + 2, dGray, 12);
        graybar;
        //black
        this.bar.fillStyle(0x000000, 0.3);
        var dBlack = Math.floor(this.percentageBlack * 4 * 100);
        var blackbar = this.bar.fillRect(this.x + 2 + dGray + dBlack, this.y + 2, 394 - dGray - dBlack, 12);
        blackbar;
    }

    end ()
    {
        this.text.setText([
            'END ! Gray : ' + this.grayspies +
            'Black : ' + this.blackspies +
            'White : ' + this.whitespies
        ]);
        
    }

}
