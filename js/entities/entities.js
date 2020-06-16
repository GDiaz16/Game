/**
 * Entidad jugador
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // Llamar el constructor
        this._super(me.Entity, 'init', [x, y, settings]);


        // Velocidad y friccion maxima del jugador
        this.body.setMaxVelocity(5, 2.5);
        this.body.setFriction(0.6, 0.3);
        this.body.velX = 3;
        this.body.velY = 1.5;

        // Configurar el viewport para que siga al jugador en ambos ejes
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        // Asegurar que el jugador sigue funcionando aun si sale de la pantalla
        this.alwaysUpdate = true;

        // Animaciones para caminar
        this.renderable.addAnimation("walk-back", [54, 55, 56, 57, 58, 59, 60, 62, 63, 65]);
        this.renderable.addAnimation("walk-front", [3, 4, 5, 6, 7, 8, 9, 10, 11, 13]);


        // Animaciones al estar quieto
        this.renderable.addAnimation("stand-view-down", [156]);
        this.renderable.addAnimation("stand-view-up", [42]);
        this.isUp = true;

        // Establecer la animacion por defecto al iniciar el juego
        this.renderable.setCurrentAnimation("stand-view-up");

        //Correr la caja de colision del objeto para que quede en sus pies
        this.body.setShape(-75, -112);

    },

    /**
     * Actualizar la entidad
     */
    update: function (dt) {
         if (me.input.isKeyPressed('left')) {
            // Girar la animacion respecto al eje x
            this.renderable.flipX(false);
            // Empujar el personaje para hacerlo moverse
            this.body.force.x = -this.body.velX;
            this.body.force.y = -this.body.velY;
            this.isUp = true;
            // Mostrar animacion
            if (!this.renderable.isCurrentAnimation("walk-back")) {
                this.renderable.setCurrentAnimation("walk-back");
            }
        } else if (me.input.isKeyPressed('right')) {

            // Girar la animacion respecto al eje x
            this.renderable.flipX(true);
            // Empujar el personaje para hacerlo moverse
            this.body.force.x = this.body.velX;
            this.body.force.y = this.body.velY;
            this.isUp = false;
            // Mostrar animacion
            if (!this.renderable.isCurrentAnimation("walk-front")) {
                this.renderable.setCurrentAnimation("walk-front");
            }
        } else if (me.input.isKeyPressed('up')) {

            // Girar la animacion respecto al eje x
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = this.body.velX;
            this.body.force.y = -this.body.velY;
            this.isUp = true;
            // Mostrar animacion
            if (!this.renderable.isCurrentAnimation("walk-back")) {
                this.renderable.setCurrentAnimation("walk-back");
            }
        } else if (me.input.isKeyPressed('down')) {
            // Girar la animacion respecto al eje x
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = -this.body.velX;
            this.body.force.y = this.body.velY;
            this.isUp = false;

            // Mostrar animacion
            if (!this.renderable.isCurrentAnimation("walk-front")) {
                this.renderable.setCurrentAnimation("walk-front");
            }
        } else {
            //Al estar quieto mantener al personaje en su posicion
            this.body.force.x = 0;
            this.body.force.y = 0
            if (this.isUp) {
                // Mostrar animacion
                this.renderable.setCurrentAnimation("stand-view-up");
            } else {
                this.renderable.setCurrentAnimation("stand-view-down");

            }
        }

        // Actualizar la fisica del personaje
        this.body.update(dt);

        // Verificar colisiones con otros personajes
        me.collision.check(this);

        // Retornar verdadero si nos movimos
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision: function (response, other) {

        // Con true los otros objectos responden al empuje de este objeto
        return true;
    }
});

/**
 * Entidad caja
 */
game.BoxEntity = me.CollectableEntity.extend({
    // Extender la funcion padre
    init: function (x, y, settings) {
        // Llamar al constructor del padre
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.setShape(-128, -60);
        this.renderable.addAnimation("stand", [2]);
        this.renderable.setCurrentAnimation("stand");

    },

    onCollision: function (response, other) {
        //Restar una caja al nivel en el que se encuentre y actualizar el marcador
        if (other.type == 'player') {
            switch (me.levelDirector.getCurrentLevel().name) {
                case 'escenario':
                    game.data.remainingBoxesL1 = game.data.remainingBoxesL1 - 1;
                    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';

                    break;
                case 'escenario2':
                    game.data.remainingBoxesL2 = game.data.remainingBoxesL2 - 1;
                    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL2 + '</p>';

                    break;
                case 'escenario3':
                    game.data.remainingBoxesL3 = game.data.remainingBoxesL3 - 1;
                    document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL3 + '</p>';

                    break;
            }
            // Remover una caja cuando es tocada por el jugador
            me.game.world.removeChild(this);
        }
        //Al retornar falso indicamos que no se mueve cuando la tocan
        return false
    }
});

game.LevelEntity = me.Entity.extend({

    init: function (x, y, settings) {
        //Obtener el nivel al que apunta el objeto
        this.level = settings.nextLevel;
        this._super(me.Entity, 'init', [x, y, settings]);
    },
    //Funcion que actuliza el marcador al cambiar de nivel
    updateParams: function () {
        switch (this.level) {
            case 'escenario':
                document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL1 + '</p>';
                document.getElementById('level').innerHTML = '<p>Nivel: 1/3</p>';

                break;
            case 'escenario2':
                document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL2 + '</p>';
                document.getElementById('level').innerHTML = '<p>Nivel: 2/3</p>';

                break;
            case 'escenario3':
                document.getElementById('rem-boxes').innerHTML = '<p>Cajas faltantes: +' + game.data.remainingBoxesL3 + '</p>';
                document.getElementById('level').innerHTML = '<p>Nivel: 3/3</p>';

                break;

        }
    },


    onCollision: function (response, other) {
        //Mostrar un anuncio si no se han recolectado todas las cajas
        //de lo contrario cargar y pasar al siguiente nivel
        switch (this.level) {
            case 'escenario2':
                if (game.data.remainingBoxesL1 > 0) {
                    document.getElementById('in-game').style.display = 'block';
                } else {
                    this.updateParams(this.level);
                    me.audio.stopTrack();
                    //comenzar nueva cancion
                    me.audio.playTrack('SOUNDL2', 0.4);
                    me.levelDirector.loadLevel(this.level);
                }
                break;

            case 'escenario3':
                if (game.data.remainingBoxesL2 > 0) {
                    document.getElementById('in-game').style.display = 'block';
                } else {
                    this.updateParams(this.level);
                    me.audio.stopTrack();
                    //comenzar nueva cancion
                    me.audio.playTrack('SOUNDL3', 0.4);
                    me.levelDirector.loadLevel(this.level);
                }
                break;
            case 'end':
                if (game.data.remainingBoxesL3 > 0) {
                    document.getElementById('in-game').style.display = 'block';
                } else {
                    //Si es el ultimo nivel mostrar la pantalla de ganador
                    document.getElementById('result').innerHTML = '<h2>Ganaste!!</h2>';
                    document.getElementById('description').innerHTML = '<p>Completaste todas las cajas y los monstruos no pudieron contigo</p>';
                    document.getElementById('end-screen').style.backgroundColor = 'rgba(17, 182, 39, 0.596)';
                    document.getElementById('end-screen').style.display = 'block';
                    //detener sonido al finalizar
                    me.audio.stopTrack();


                }
                break;



        }
        return false
    }
});

//Entidad enemigo
game.EnemyEntity = me.Sprite.extend(
    {
        init: function (x, y, settings) {
            // Guardar el tamaño de la caja como se tiene en Tiled
            var width = settings.width;
            var height = settings.height;
            this.lastTime = 0;
            //Imagen del enemigo
            settings.image = "ghost";

            //Ajustar el tamaño del sprite para que la animacion y el personaje
            //se carguen correctamente
            settings.framewidth = settings.width = 172;
            settings.frameheight = settings.height = 179;

            // Llamar al constructor del padre
            this._super(me.Sprite, 'init', [x, y, settings]);

            // Agregar un cuerpo fisico
            this.body = new me.Body(this);
            // Agregar una caja de colision por defecto
            this.body.addShape(new me.Rect(this.width / 3, this.height / 2, this.width / 2, this.height / 2));
            // Establecer velocidad maxima y friccion
            this.body.setMaxVelocity(3, 1.5);
            this.body.setFriction(0.4, 0.2);
            // Habilitar colision 
            this.isKinematic = false;
            //Agregar animaciones para caminar
            this.addAnimation("walk-view-down", [1, 2, 3, 4, 5, 6, 7, 8]);
            this.addAnimation("walk-view-up", [9, 10, 11, 12, 13, 14, 15, 16, 17]);
            //Variable que indica si el personaje sube o baja
            this.UpDown = settings.UpDown;

            if (this.UpDown) {
                // Establecer posicion inicial y final basado en el tamaño original establecido en 
                //Tilde (el creador de mapas)
                x = this.pos.x - 2 * this.width;
                this.startX = x;
                this.pos.x = this.endX = x + width - this.width;

                y = this.pos.y - this.height;
                this.startY = y;
                this.pos.y = this.endY = y + height - this.height;
            } else {
                // Establecer posicion inicial y final basado en el tamaño original establecido en 
                //Tilde (el creador de mapas)
                x = this.pos.x;
                this.startX = x;
                this.pos.x = this.endX = x + width - this.width;

                y = this.pos.y + this.height;
                this.startY = y;
                this.pos.y = this.endY = y + height - this.height;
            }
            // Indica hacia que lado esta caminando el personaje
            this.walkLeft = false;

            // Hacerlo vivir (moverse)
            this.alive = true;

            //Actualizarlo asi este fuera de la pantalla
            this.alwaysUpdate = true;


        },

        update: function (dt) {
            //Establecer las animaciones del enemigo, al igual que con el personaje principal
            if (this.UpDown) {
                if (this.alive) {

                    if (this.walkLeft && this.pos.y <= this.startY) {
                        this.walkLeft = false;
                        this.body.force.x = -this.body.maxVel.x;
                        this.body.force.y = this.body.maxVel.y;
                        if (!this.isCurrentAnimation("walk-view-down")) {
                            this.setCurrentAnimation("walk-view-down");
                            this.flipX(true);
                        }
                    }
                    else if (!this.walkLeft && this.pos.y >= this.endY) {
                        this.walkLeft = true;
                        this.body.force.x = this.body.maxVel.x;
                        this.body.force.y = -this.body.maxVel.y;

                        if (!this.isCurrentAnimation("walk-view-up")) {
                            this.setCurrentAnimation("walk-view-up");
                            this.flipX(false);
                        }
                    }
                }
                else {
                    this.body.force.x = 0;
                    this.body.force.y = 0;
                }
            } else {
                if (this.alive) {
                    if (this.walkLeft && this.pos.x <= this.startX - this.width) {
                        this.walkLeft = false;
                        this.body.force.x = this.body.maxVel.x;
                        this.body.force.y = this.body.maxVel.y;
                        if (!this.isCurrentAnimation("walk-view-down")) {
                            this.setCurrentAnimation("walk-view-down");
                            this.flipX(false);
                        }
                    }
                    else if (!this.walkLeft && this.pos.x >= this.endX) {
                        this.walkLeft = true;
                        this.body.force.x = -this.body.maxVel.x;
                        this.body.force.y = -this.body.maxVel.y;
                        if (!this.isCurrentAnimation("walk-view-up")) {
                            this.setCurrentAnimation("walk-view-up");
                            this.flipX(true);
                        }
                    }
                }
                else {
                    this.body.force.x = 0;
                    this.body.force.y = 0;
                }
            }
            // Verificar movimientos
            this.body.update(dt);

            // Verificar colisiones
            me.collision.check(this);

            // Retornar verdadero si nos movimos o si el enemigo se actulizo
            return (this._super(me.Sprite, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        },

        onCollision: function (response, other) {
            //Reducir el puntaje de salud solo si han pasado mas de 600ms
            //para evitar que con un toque se pierdan todos los puntos
            if (game.data.health >= 1 && other.type == 'player') {
                var d = new Date();
                if (d.getTime() - this.lastTime > 600) {
                    console.log(d.getTime() - this.lastTime);
                    this.lastTime = d.getTime();
                    game.data.health = game.data.health - 1;
                    document.getElementById('health').innerHTML = '<p>Salud: +' + game.data.health + '</p>';
                }
            }
            //Si el puntaje es igual a cero, se pierde el juego y se muestra el mensaje 
            else if (game.data.health <= 1) {
                document.getElementById('result').innerHTML = '<h2>Perdiste</h2>';
                document.getElementById('description').innerHTML = '<p>Los monstruos han acabado contigo</p>';
                document.getElementById('end-screen').style.backgroundColor = 'rgba(182, 17, 17, 0.596)';
                document.getElementById('end-screen').style.display = 'block';
                me.audio.stopTrack();
                newTry();


            }
            //No colisionar con las paredes si el objeto es efectivamente una pared
            if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
                return false;
            }
            // De lo contrario no producir colision
            return false;
        }
    });
