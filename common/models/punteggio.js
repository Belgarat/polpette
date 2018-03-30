'use strict';

module.exports = function(Punteggio) {
    /**
    * Set last update date after every update
    */
    Punteggio.deleteByIdSquadra = function(idSquadra, next) {
        //console.log(idSquadra);
        Punteggio.destroyAll( {squadraId: idSquadra},next); //{
        //Punteggio.find( {where: {squadraId: idSquadra}}, function (err, instance) {
            //console.log(instance);
            //delete punteggio
            //instance.destroy(function(err){
            //Punteggio.destroyById(instance.id,next);
        //}
        // ...then delete squadra
        //next();
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

    Punteggio.getClassifica = function(idCampionato,next) {
        //console.log(idCampionato);
        var classifica = [];
        Punteggio.find( {include: ['campionato','squadra'], where: {campionatoId: idCampionato}, order: 'punteggio DESC'}, function (err, instance) {
            var ordinamento = 1;
            var first = true;
            var prev = -1;
            for (var k in instance){
                //se punteggio precedente maggiore, incremento ordine classifica, altrimenti rimane invariato
                if (first){
                    first = false;
                }else{
                    if(prev !== instance[k].punteggio){
                        ordinamento++;
                    }
                }
                prev = instance[k].punteggio;
                classifica[k] = { id: idCampionato, squadraId: instance[k].squadraId, campionatoId: instance[k].campionatoId, punteggio: instance[k].punteggio, ordine: ordinamento};
            }
            next(null, classifica);
        })
    };
    Punteggio.remoteMethod (
        'getClassifica', 
        {
          description: "classifica con colonna ordinamento",
          http: {path: '/:idCampionato/classifica', verb: 'get'},
          accepts: {arg: 'idCampionato', type: 'string', http: { source: 'path' } },
          returns: {root: true, type: 'object'}
        }
    );

};
