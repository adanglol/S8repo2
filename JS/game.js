
// Core gameplay: Picking just one gameplay scene (e.g. the first one with just two slugs),
// quickly assemble a playable prototype that illustrates running, jumping, and detection of win/loss conditions for the scene. 
// Your prototype should reset the scene (after an appropriate delay) whether the player wins or loses in the prototype.





class level1 extends Phaser.Scene {
    constructor() {
        super('level1');

    }
    preload(){
        this.load.path = './Assets/';
        this.load.image('rolypoly', 'rolypoly.png');
        this.load.image('slug', 'slug.png'); 
        this.load.image('watchout', 'watchout.png');
    
    }
    create(){
        this.graphics = this.add.graphics();
        const platforms = this.physics.add.staticGroup();
        //let ground= this.physics.add.rectangle(-400, 350, 600, 700, 0x271335 );

        const image = this.add.image(350,200,'watchout');
        image.setScale(1.3);
        
        let slug = this.physics.add.sprite(595,100, 'slug');
        slug.setScale(0.2);
        slug.body.setCollideWorldBounds(true);
        slug.setFlipX(true);
        slug.setVelocityX(-20);

        let slug2 = this.physics.add.sprite(400,100, 'slug');
        slug2.setScale(0.2);
        slug2.body.setCollideWorldBounds(true);
        slug2.setFlipX(true);
        slug2.setVelocityX(-20);

        this.player = this.physics.add.sprite(100,400, 'rolypoly');
        this.player.setScale(0.5);
        this.player.setFlipX(true);
        this.player.setSize(150, 100, true);
        
        this.player.body.setCollideWorldBounds(true);
        this.player.setBounce(0.5);
        this.physics.add.collider(this.player, slug, this.hitSlug, null, this);
        this.physics.add.collider(this.player, slug2, this.hitSlug, null, this);
        // let ground = this.add.rectangle(200, 300, 800, 50, 0x333333);
        // this.physics.add.existing(ground, true);
        // ground.body.immovable = true;
        // this.platforms.add(ground);

        this.cursors = this.input.keyboard.createCursorKeys();
        // this.physics.add.collider(this.player, this.ground);
        // this.ground.setImmovable(true);
        // this.ground.body.allowGravity = false;
    }
    update() {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.player.setVelocityX(-160);

        }
        else if (right.isDown)
        {
            this.player.setVelocityX(160);

        }else if (up.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-420);
        }else
        {
            this.player.setVelocityX(0);

        }

        if (this.player.x >= 600) {
            this.time.delayedCall(300, () => {
                this.scene.restart();
            });
        }
    }
    hitSlug(){
        this.time.delayedCall(300, () => {
            this.scene.restart();
          });
    }
 

}

let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 600
            }
        }
    },
    scene: [level1],
    backgroundColor: '#1b0c26'
};

let game = new Phaser.Game(config);