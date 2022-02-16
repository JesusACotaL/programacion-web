var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    audio: {
        disableWebAudio: true
    }
};

var player;
var burgers;
var gamestarted = false;
var zombies;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var music;
var game = new Phaser.Game(config);
var play;
var SPEED = 350;
var ROTATION_SPEED = 2 * Math.PI; // 0.5 turn per sec, 2 sec per turn
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;
var velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;

function preload ()
{
    this.load.image('sky', 'assets/street.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('burger', 'assets/burger.png');
    this.load.image('zombie', 'assets/zombie.png');
    this.load.image('play', 'assets/play.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('juniorh', ['assets/porte.mp3', 'assets/porte.ogg']);
}

function create ()
{
    music = this.sound.add('juniorh');

    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(400, 450, 'ground');
    platforms.create(25, 300, 'ground');
    platforms.create(500, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude').setVelocity(SPEED,0);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { burgert: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { burgert: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Some burgers to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    burgers = this.physics.add.group({
        key: 'burger',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    burgers.children.iterate(function (child) {

        //  Give each burger a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    zombies = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff'});

    //  Collide the player and the burgers with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(burgers, platforms);
    this.physics.add.collider(zombies, platforms);

    //  Checks to see if the player overlaps with any of the burgers, if he does call the collectburger function
    this.physics.add.overlap(player, burgers, collectburger, null, this);

    this.physics.add.collider(player, zombies, hitzombie, null, this);

    play = this.add.image(400,300, 'play').setInteractive();
    play.once('pointerup', startgameplay, this);
    
}

function startgameplay (){
    play.destroy();
    music.play();
    gamestarted = true
}

function update ()
{
    if (gameOver)
    {
        return;
    }
    if (gamestarted == true){
    pointerMove(this.input.activePointer);
    velocityFromRotation(player.rotation, SPEED, player.body.velocity);
    }
}

function pointerMove (pointer) { 
  var angleToPointer = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
  var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - player.rotation);
    
  if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
    player.rotation = angleToPointer;
    player.setAngularVelocity(0);
    
  } else {
    player.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
  }
}

function collectburger (player, burger)
{

    burger.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (burgers.countActive(true) === 0)
    {
        //  A new batch of burgers to collect
        burgers.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var zombie = zombies.create(x, 16, 'zombie');
        zombie.setBounce(1);
        zombie.setCollideWorldBounds(true);
        zombie.setVelocity(Phaser.Math.Between(300, 500), 20);
        zombie.allowGravity = false;

    }
}

function hitzombie (player, zombie)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}