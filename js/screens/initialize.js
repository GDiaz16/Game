//Inicializar puntajes del scoreboard
document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';

function restart(){
    me.levelDirector.loadLevel('escenario');
    game.data.remainingBoxesL1= 7;
    game.data.remainingBoxesL2= 11;
    game.data.remainingBoxesL3= 9;
    game.data.health= 10;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
    document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';


}