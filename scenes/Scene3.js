class Scene3 extends Phaser.Scene
{
    constructor()
    {
        super('scene3');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('richard', 'Richard.png');
        this.load.image('avocado', 'Avocado.png');
        this.load.image('spoon', 'Spoon.png');
    }

    create()
    {
        this.richard = this.physics.add.sprite(500, 500, 'richard').setDepth(20);
        this.sqrtNumCoins = 10;
        this.MARGIN = 100;
        this.avocadosLeft = Math.pow(this.sqrtNumCoins, 2);
        for(let y = 0; y < this.sqrtNumCoins; y++) {
            for(let x = 0; x < this.sqrtNumCoins; x++) {
                let placePos = {x: this.MARGIN + x / (this.sqrtNumCoins-1) * (800-this.MARGIN*2), y: this.MARGIN + y / (this.sqrtNumCoins-1)* (800-this.MARGIN*2)}
                let avo = this.physics.add.staticSprite(placePos.x, placePos.y, 'avocado').setScale(2).setDepth(10)
                this.physics.add.overlap(avo, this.richard, (avo, richard) => {
                    avo.destroy();
                    this.avocadosLeft--;
                    if(this.avocadosLeft <= 0) {
                        this.scene.start('you_win')
                    }
                })
            }
        }
        this.gravitySources = [
            {x: 0, y: 0, strength: 0},
            {x: 400, y: 700, strength: 7},
            {x: 600, y: 200, strength: 10},
            {x: 10, y: 10, strength: 12},
            {x: 400, y: 400, strength: 15},
        ]
        for(let i = 1; i < this.gravitySources.length; i++) {
            let source = this.gravitySources[i];
            this.add.circle(source.x, source.y, source.strength*2, 0x7700ff)
        }
        this.spawnTime = -10;
        this.spawnWait = 0;
    }

    update(time, delta) {
        if(time - this.spawnTime >= this.spawnWait) {
            this.spawnWait = (Math.random() * 3 + 5) * 1000;
            this.spawnTime = time;
            this.spawnProjectile();
        }

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

    spawnProjectile() {
        let dirDecider = Math.floor(Math.random() * 2) == 1;
        let randPos = this.MARGIN + Math.floor(Math.random() * (800-this.MARGIN*2))
        let position = {x: dirDecider ? randPos : -50, y: dirDecider ? -50 : randPos};
        console.log(position);
        let spoon = this.physics.add.sprite(position.x, position.y, 'spoon').setDepth(15).setScale(3);
        spoon.setVelocity(dirDecider ? 0 : 100, dirDecider ? 100 : 0);
        this.physics.add.overlap(spoon, this.richard, (spoon, richard) => {
            spoon.destroy();
            this.scene.start('game_over');
        })
    }
}