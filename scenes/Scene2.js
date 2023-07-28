class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super('scene2');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('richard', 'Richard.png');
        this.load.image('avocado', 'Avocado.png');
    }

    create()
    {
        this.richard = this.physics.add.sprite(500, 500, 'richard').setDepth(20);
        const sqrtNumCoins = 6;
        const MARGIN = 100;
        this.avocadosLeft = Math.pow(sqrtNumCoins, 2);
        for(let y = 0; y < sqrtNumCoins; y++) {
            for(let x = 0; x < sqrtNumCoins; x++) {
                let placePos = {x: MARGIN + x / (sqrtNumCoins-1) * (800-MARGIN*2), y: MARGIN + y / (sqrtNumCoins-1)* (800-MARGIN*2)}
                let avo = this.physics.add.staticSprite(placePos.x, placePos.y, 'avocado').setScale(2).setDepth(10)
                this.physics.add.overlap(avo, this.richard, (avo, richard) => {
                    avo.destroy();
                    this.avocadosLeft--;
                    if(this.avocadosLeft <= 0) {
                        this.scene.start("scene3")
                    }
                })
            }
        }
        this.gravitySources = [
            {x: 0, y: 0, strength: 0},
            {x: 400, y: 400, strength: 5},
            {x: 600, y: 200, strength: 10},
            {x: 700, y: 600, strength: 10},
        ]
        for(let i = 1; i < this.gravitySources.length; i++) {
            let source = this.gravitySources[i];
            this.add.circle(source.x, source.y, source.strength*2, 0x7700ff)
        }
    }

    update(time, delta) {
        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            this.gravitySources[0] = {x: pointer.x, y: pointer.y, strength: 10};
        } else {
            this.gravitySources[0].strength = 0;
        }
        
        MyPhysics.applyGravity(this.richard, this.gravitySources, delta);

        if(this.richard.x < 0 || this.richard.x > 800 || this.richard.y < 0 || this.richard.y > 800) {
            console.log("OUT")
            this.scene.start('game_over');
        }
    }
}