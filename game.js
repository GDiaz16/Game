var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'window-game',
        mode: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload_game,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let tiles = [];
let heights = [];
let bars = [];

function preload_game() {
    this.load.spritesheet(
        'run',
        'run.png',
        { frameWidth: 126.5, frameHeight: 150 });
    this.load.spritesheet(
        'jump',
        'character.png',
        { frameWidth: 130, frameHeight: 190 });


}



function create() {
    /*     player = this.physics.add.sprite(60,100, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true); */

    //setInterval(addTiles,2000);

    this.player1 = this.add.sprite(200, 400, 'run')
    /*    player.setBounce(0.2);
       player.setCollideWorldBounds(true); */

    this.anims.create({
        key: 'run1',
        frames: this.anims.generateFrameNumbers('run', { start: 0, end: 10 }),
        frameRate: 16,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', { start: 18, end: 24 }),
        frameRate: 14,
        repeat: -1
    });

    this.player1.play('run1');

    //r1 = this.add.rectangle(400, 500, 100, 30, 0xff6699)
    t = Date.now();
    r2 = this.add.rectangle(760, 10, 80, 10, 0xff6699);
    for (let i = 0; i < 34; i++) {

        r3 = this.add.rectangle(20*i, 60, 10, 20,0xff6699);
        bars.push(r3);
      }
}


function update() {
    if (Date.now() - t > 200) {
        r1 = this.add.rectangle(800, 590, 80, 10, 0xff6699)
        r2.height = (1/rms) * (40);
        tiles.push(r1);
        t = Date.now();
        if (rms > 0.01) {
            r1.y = (1/rms) * (30);
        } else {
            r1.y = 500;
        }
    }

    for (tile of tiles) {
        tile.x = tile.x - 10;

    } 
    
    for(let i = 0; i<bars.length;i++){
        bars[i].height = heights[i];
    }
    //console.log(tiles.length)

    if(tiles.length > 20){
        tiles.shift();
    }
}