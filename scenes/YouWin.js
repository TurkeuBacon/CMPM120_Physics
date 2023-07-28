class YouWin extends Phaser.Scene
{
    constructor()
    {
        super('you_win');
    }

    create()
    {
        this.add.text(400, 400, "YOU WIN", { fontSize: 64 }).setOrigin(0.5, 0.5);
        this.add.text(400, 700, "Click Anywhere to play again", { fontSize: 30 }).setOrigin(0.5, 0.5);
        this.input.once('pointerdown', () => {
            this.scene.start("scene1")
        });
    }
}