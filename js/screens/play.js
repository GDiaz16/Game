game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // load a level
        /*         var level = new me.TMXTileMap('escenario', me.loader.getTMX('escenario'))
                level.addTo(me.game.world, true);
                level.orientation = 'isometric';*/
        me.sys.gravity = 0;
        me.sys.pauseOnBlur = false;
        me.levelDirector.loadLevel("escenario3");
        me.game.viewport.currentTransform.scale(0.75);
        me.game.viewport.currentTransform.translate(200,200);


        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        //this.HUD = new game.HUD.Container();
        //me.game.world.addChild(this.HUD);




    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
