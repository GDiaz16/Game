game.PlayScreen = me.Stage.extend({
    /**
     *  Accion que se ejecuta cuando inicia el juego
     */
    onResetEvent: function () {
        //Dejar el juego sin gravedad
        me.sys.gravity = 0;
        //Evitar que el juego se pause cuando pierda el foco de la ventana
        me.sys.pauseOnBlur = false;
        //Cargar el primer nivel
        me.levelDirector.loadLevel("escenario");
        //Alejar la camara de la pantalla para tener vista mas amplia
        me.game.viewport.currentTransform.scale(0.75);
        //Trasladar la camara para que el enfoque sobre el jugador sea mejor
        me.game.viewport.currentTransform.translate(200,200);
        //Musica del juego
        //me.audio.playTrack('SOUNDL1', 0.4);

    },
    onDestroyEvent : function () {
        //Detener la musica al salir
        //me.audio.stopTrack();
      }
});
