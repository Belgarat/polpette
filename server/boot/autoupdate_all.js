module.exports = function (app) {
    app.dataSources.polpettedb.autoupdate();
    console.log("Performed autoupdate of all models.");
 }
 