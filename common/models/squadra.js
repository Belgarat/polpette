'use strict';

module.exports = function(Squadra) {
    // 
    /**
    * Set last update date after every update
    */
    Squadra.observe("before delete" , function(ctx, next) {
        Squadra.findById( ctx.where.id, {include: ['punteggio']}, function (err, instance) {
            //console.log(instance);
            if(typeof instance.punteggio === "function"){
                //delete punteggio
                instance.punteggio.destroy(function(err){
                    console.log(err);
                });
            }
        });
        // ...then delete squadra
        next();
    });
};
