'use strict';

module.exports = function(Campionato) {
    
    Campionato.setCurrent = function(id,cb) {
        //console.log(id);
        //set all records to current = 0
        Campionato.updateAll({current: 0}, function (err){
            if (err) cb(err);
        });
        // find instance
        
        Campionato.findById( id, function (err, instance) {
            if (err) cb(err);
            //console.log(instance);
            //set to current = 1
            instance.updateAttributes({current: 1}, function (err, instance){
                if (err) cb(err);
                if (!err){
                    cb(null, instance);
                    //console.log(instance.current);
                }
            });
        });
    };
    Campionato.remoteMethod (
        'setCurrent', 
        {
          description: "set current = 1 to id campionato and 0 to others",
          http: {path: '/:id/set-current', verb: 'put'},
          accepts: {arg: 'id', type: 'string', http: { source: 'path' } },
          returns: {root: true, type: 'object'}
        }
    );
};
