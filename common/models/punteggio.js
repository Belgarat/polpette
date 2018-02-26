'use strict';

module.exports = function(Punteggio) {
    /**
    * Set last update date after every update
    */
    Punteggio.deleteByIdSquadra = function(idSquadra, next) {
        Punteggio.find( {where: {squadraId: idSquadra}}, function (err, instance) {
            //console.log(instance);
            //delete punteggio
            instance.destroy(function(err){
                console.log(err);
            });
        });
        // ...then delete squadra
        next();
    };
    Punteggio.remoteMethod (
        'deleteByIdSquadra', 
        {
          description: "delete punteggio from id squadra",
          http: {path: '/:idSquadra/delete-punteggio-by-id-squadra', verb: 'delete'},
          accepts: {arg: 'idSquadra', type: 'string', http: { source: 'path' } },
          returns: {root: true, type: 'object'}
        }
    );
};
