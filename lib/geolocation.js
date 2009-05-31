/* ======================================================================
    geolocation.src.js
   ====================================================================== */

/*

info.aaronland.geolocation library v1.0
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.geo = {};
}

info.aaronland.geo.Location = function(args){

    this.args = args;

    //

    this.canhas_console = (typeof(console) != 'undefined') ? 1 : 0;

    this.canhas_geode = (typeof(navigator.geolocation)) ? 1 : 0;
    this.canhas_loki = (typeof(Loki) != 'undefined') ? 1 : 0;
    this.canhas_google = (typeof(google) != 'undefined') ? 1 : 0;

    // geode

    if ((this.canhas_geode) && (navigator.userAgent.indexOf("Firefox") < 0)){
        this.canhas_geode = 0;
    }

    // loki

    if ((this.canhas_loki) && (! this.args['loki_apikey'])){
        this.canhas_loki = 0;
    }

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);
    this.log("loki support: " + this.canhas_loki);
    this.log("geode support: " + this.canhas_geode);

};

info.aaronland.geo.Location.prototype.findMyLocation = function(doThisOnSuccess, doThisIfNot){

    // Assume that if you've passed a Loki API key that's what
    // you want to use (this assumption probably doesn't hold
    // for things with a GPS unit but one step at a time...)

    var _self = this;

    if ((this.canhas_loki) && (this.args['loki_apikey'])){
        this.log("find my location with loki");
        
        // http://sarver.org/2009/05/29/where-20-location-on-the-web/

        var loki = new LokiAPI();

        loki.onSuccess = function(location) {
            _self.log("loki dispatch returned (success)");
            doThisOnSuccess(location.latitude, location.longitude);
        };
            
        loki.onFailure = function(error, msg){
            _self.log("loki dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error + ', ' + msg);
        };
        
        loki.setKey(this.args['loki_apikey']);
        loki.requestLocation(true, loki.FULL_STREET_ADDRESS_LOOKUP);

        this.log("loki positioning dispatched");
        return;
    }

    // geode

    if (this.canhas_geode){

        this.log("find my location with geode");

        // http://labs.mozilla.com/2008/10/introducing-geode/

        _onSuccess = function(position){
            _self.log("geode dispatch returned (success)");
            doThisOnSuccess(position.latitude, position.longitude);            
        };

        _onFailure = function(error){
            _self.log("geode dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error.code + ',' + error.message);            
        };

        navigator.geolocation.getCurrentPosition(_onSuccess, _onFailure);

        this.log("geode positioning displatched");
        return;
    }

    // teh google

    if (this.canhas_google){

        // http://code.google.com/apis/gears/api_geolocation.html#example

        if (google.gears){
            this.log("find my location with (google) gears");

            var geo = google.gears.factory.create('beta.geolocation');

            _onSuccess = function(position) {
                _self.log("gears dispatch returned (success)");
                doThisOnSuccess(position.latitude, position.longitude);
            };

            _onFailure = function (postionError){
                _self.log("gears dispatch returned (failed)");
                doThisIfNot('Attempt to get location failed: ' + positionError.message);
            };

            geo.getCurrentPosition(_onSuccess, _onFailure);

            this.log("gears positioning displatched");
            return;
        }

        // http://briancray.com/2009/05/29/find-web-visitors-location-javascript-google-api/

        if (google.loader.ClientLocation){

            this.log("find my location with (google) client location");

            lat = google.loader.ClientLocation.latitude;
            lon = google.loader.ClientLocation.longitude;

            doThisOnSuccess(lat, lon);
            return;
        }
    }

    doThisIfNot("unable to find a location provider ... where are you???");
    return;
};

info.aaronland.geo.Location.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[geolocation] ' + msg);
};

// -*-java-*-
