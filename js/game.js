


/* Game namespace */
var game = {

    // an object where to store game information
    data: {
        // score
        remainingBoxesL1: 7,
        remainingBoxesL2: 11,
        remainingBoxesL3: 9,
        health: 20
    },


    // Run on page load.
    onload: function () {
        // Initialize the video.
        if (!me.video.init(800, 600, { wrapper: "screen", scale: "auto", scaleMethod: "flex-width" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    loaded: function () {
        //me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.debug.renderHitBox = true;

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("LevelEntity", game.LevelEntity);
        me.pool.register("box", game.BoxEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);



        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        // map up and down
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
/*
// "bootstrap"
me.device.onReady(function () {
    game.onload();
 }); */