/* Game namespace */
var game = {

    // Un ubjeto con el cual se almacena el puntaje del juego
    data: {
        // score
        remainingBoxesL1: 7,
        remainingBoxesL2: 11,
        remainingBoxesL3: 9,
        health: 20
    },


    // Correr cuando se carga el juego
    onload: function () {
        // Inicializar el canvas con 800x600 de tamaño y con la propiedad flex
        //que escala el juego automaticamente, sin embargo es necesario reiniciarlo para que se 
        //produzca el cambio
        if (!me.video.init(640, 480, { wrapper: "screen", scale: "auto", scaleMethod: "flex" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Cargar todos los recursos contenidos en el archivo resources.js
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Cuando se cargan todos los archivos se inicia el juego
    loaded: function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.debug.renderHitBox = true;

        // Agregar las entidades que se van a usar
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("LevelEntity", game.LevelEntity);
        me.pool.register("box", game.BoxEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);



        // Activar los eventos de las teclas de flechas
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        // map up and down
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Iniciar el juego
        me.state.change(me.state.PLAY);
    }
};