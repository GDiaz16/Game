/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);
        //this.body.gravity = 10;

        //this.layer = me.game.world.getChildByName("layer2")[0];
        //var zIndex10 = me.game.world.getChildByProp("z", 4);
        //this.pos.z = 0;
        //console.log(this.pos)

        // max walking & jumping speed
        this.body.setMaxVelocity(5, 2.5);
        this.body.setFriction(0.4, 0.4);
        this.body.velX = 3;
        this.body.velY = 1.5;

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk-back", [54, 55, 56, 57, 58, 59, 60, 62, 63, 65]);

        this.renderable.addAnimation("walk-front", [3, 4, 5, 6, 7, 8, 9, 10, 11, 13]);


        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand", [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");

        this.body.setShape(-75, -128);

        this.fall = false;
    },

    /**
     * update the entity
     */
    update: function (dt) {
        if (me.input.isKeyPressed('left') && !this.fall) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(false);
            // update the default force
            this.body.force.x = -this.body.velX;
            this.body.force.y = -this.body.velY;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-back")) {
                this.renderable.setCurrentAnimation("walk-back");
            }
        } else if (me.input.isKeyPressed('right') && !this.fall) {

            // unflip the sprite
            this.renderable.flipX(true);
            // update the entity velocity
            this.body.force.x = this.body.velX;
            this.body.force.y = this.body.velY;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-front")) {
                this.renderable.setCurrentAnimation("walk-front");
            }
        } else if (me.input.isKeyPressed('up') && !this.fall) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = this.body.velX;
            this.body.force.y = -this.body.velY;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-back")) {
                this.renderable.setCurrentAnimation("walk-back");
            }
        } else if (me.input.isKeyPressed('down') && !this.fall) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = -this.body.velX;
            this.body.force.y = this.body.velY;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk-front")) {
                this.renderable.setCurrentAnimation("walk-front");
            }
        } else {
            this.body.force.x = 0;
            this.body.force.y = 0
            // change to the standing animation
            //this.renderable.setCurrentAnimation("stand");
        }

        /*    if (this.body.overlaps('hole1')){
   
           } */
/* 
        var tile = this.layer.getTile(this.pos.x, this.pos.y);
        if(tile !==null){
        //console.log(tile.pos);  
            //this.layer.z = 4;
    } */
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {

        //if(response.b.body.collisionType !== me.collision.types.ENEMY_OBJECT){
        /*         if (response.b.body.getShape(0).overlaps(this.body.getShape())) {
                    response.b.body.removeShapeAt(0);
                    this.body.maxVel.y = 10;
                    this.body.force.y = 5;
                    //this.body.friction.y = 0;
                    //this.body.update();
                    this.fall = true;
                } */
        // Make all other objects solid
        return true;
    }
});

/**
 * a Coin entity
 */
game.BoxEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
      // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        this.body.setShape(-128, -60);
        //this.body.removeShapeAt(0);
        this.renderable.addAnimation("stand", [2]);
        this.renderable.setCurrentAnimation("stand");


        //this.body.toIso();
        //this.body.translate(385,-512);
        //this.body.alpha = 0;

        //this.body.scale(0.8);

    },

    

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision : function (response, other) {
      // do something when collected

      // make sure it cannot be collected "again"
      //this.body.setCollisionMask(me.collision.types.NO_OBJECT);

      // remove it
      me.game.world.removeChild(this);

      return false
    }
  });

  game.WallEntity = me.Entity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
      // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        this.body.removeShapeAt(0);
        //this.body.toIso();
        this.body.translate(385,-512);
        this.body.alpha = 0;

        //this.body.scale(0.8);

    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision : function (response, other) {
      // do something when collected

      // make sure it cannot be collected "again"
      //this.body.setCollisionMask(me.collision.types.NO_OBJECT);

      // remove it
      me.game.world.removeChild(this);

      return false
    }
  });