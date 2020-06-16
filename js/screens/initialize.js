//Arrancar el juego cuando se hayan cargado todos los assets y scripts
me.device.onReady(function onReady() {

    game.onload();
    //Activar el juego si se presiona una tecla de flecha
    me.event.subscribe(me.event.KEYDOWN, function (action, keycode) {
        switch (keycode) {
            case me.input.KEY.UP:
            case me.input.KEY.DOWN:
            case me.input.KEY.LEFT:
            case me.input.KEY.RIGHT:
                hide();
                break;
        }
    });

});

//Inicializar puntajes del scoreboard
document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';

//Funcion para reiniciar el juego si se pierde
function restart() {
    me.levelDirector.loadLevel('escenario');
    game.data.remainingBoxesL1 = 7;
    game.data.remainingBoxesL2 = 11;
    game.data.remainingBoxesL3 = 9;
    game.data.health = 10;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
    document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';
    //Reiniciar musica
    me.audio.stopTrack();
    me.audio.playTrack('SOUNDL1', 0.4);
    //Ocultar barra de "perdedor"
    document.getElementById('in-game').style.display = 'none';


}

function newTry(){
    me.levelDirector.loadLevel('escenario');
    game.data.remainingBoxesL1 = 7;
    game.data.remainingBoxesL2 = 11;
    game.data.remainingBoxesL3 = 9;
    game.data.health = 10;
    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
    document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';
    //Reiniciar musica
    me.audio.stopTrack();
    me.audio.playTrack('SOUNDL1', 0.4);
    //Ocultar barra de "perdedor"
    document.getElementById('in-game').style.display = 'none';
}