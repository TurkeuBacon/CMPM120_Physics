class GameOver extends Phaser.Scene
{
    constructor()
    {
        super('game_over');
    }

    create()
    {
        this.add.text(400, 400, "GAME OVER", { fontSize: 64 }).setOrigin(0.5, 0.5);
        this.add.text(400, 700, "Click Anywhere to try again", { fontSize: 30 }).setOrigin(0.5, 0.5);
        this.input.once('pointerdown', () => {
            this.scene.start("scene1_tutuorial")
        });
    }
}