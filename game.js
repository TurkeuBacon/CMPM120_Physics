let config = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 800
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    pixelArt: true,
    backgroundColor: 0x005588,
    scene: [Scene1Tutorial, Scene1, Scene2Tutorial, Scene2, Scene3Tutorial, Scene3, GameOver, YouWin],
}
let game = new Phaser.Game(config);

