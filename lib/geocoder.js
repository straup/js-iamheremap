/* ======================================================================
    geocoder.src.js
   ====================================================================== */

// http://github.com/straup/js-geocoder/tree/master

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.geo){
    info.aaronland.geo = {};
}

info.aaronland.geo.GeocoderResult = function(provider, query, lat, lon, zoom){
    this.provider = provider;
    this.query = query;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
}

info.aaronland.geo.GeocoderError = function(provider, query, errmsg){
    this.provider = provider;
    this.query = query;
    this.message = errmsg;
}

info.aaronland.geo.GeocoderCapabilities = function(args){

    // to do: build a default (ordered) set of providers based on capabilities
    // that can be used if the user does not pass their own list

    this.has_google = 0;
    this.has_bing = 0;
    this.has_cloudmade = 0;
    this.has_flickr = 0;
    this.has_placemaker = 0;
    this.has_geonames = 0;
    this.has_geocoder_us = 0;

    this.can_geocode = 0;
    this.providers = [];

    // google

    if (typeof(google) == 'object'){
        this.has_google = 1;
        this.can_geocode += 1;

        this.providers.push('google');
    }

    // cloudmade

    if ((typeof(CM) == 'object') && (typeof(CM.Geocoder) == 'function')){
        this.has_cloudmade = 1;
        this.can_geocode += 1;
        
        if ((args) && (! args['cloudmade_apikey'])){
            this.has_cloudmade = 0;
            this.can_geocode -= 1;
        }

        else {
            this.providers.push('cloudmade');
        }
    }

    // flickr

    if (typeof(info.aaronland.flickr) == 'object'){
        this.has_flickr = 1;
        this.can_geocode += 1;

        if ((args) && (! args['flickr_apikey'])){
            this.has_flickr = 0;
            this.can_geocode -= 1;
        }

        else {
            this.providers.push('flickr');
        }
    }

    // placemaker

    if (typeof(Placemaker) == 'object'){
        this.has_placemaker = 1;
        this.can_geocode += 1;

        if ((args) && (! args['placemaker_apikey'])){
            this.has_placemaker = 0;
            this.can_geocode -= 1;        
        }

        else {
            this.providers.push('placemaker');
        }
    }

    // bing

    if (typeof(VEMap) == 'function'){
        this.has_bing = 1;
        this.can_geocode += 1;

        this.providers.push('bing');
    }

}

info.aaronland.geo.Geocoder = function(args){

    this.args = args;

    this.capabilities = new info.aaronland.geo.GeocoderCapabilities(args);
    this.providers = this.capabilities.providers;

    if (args['providers']){
        this.providers = args['providers'];
    }

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;

    this.timer_geocode = null;

    this.current_provider = null;
    this.current_query = null;

    this.on_success = null;
    this.on_fail = null;
};

info.aaronland.geo.Geocoder.prototype.geocode = function(query, doThisOnSuccess, doThisIfNot, idx){

    if (this.timer_geocode) {
        this.log("terminating previously geocoding operation");

        clearTimeout(this.timer_geocode);
        this.timer_geocode = null;
    }

    if (typeof(idx) == 'undefined'){
        idx = 0;
    }

    var delay = (idx == 0) ? 1500 : 0;

    var _self = this;

    this.timer_geocode = setTimeout(function(){
                        
            var provider = _self.providers[ idx ];
        
            _self.current_provider = provider;
            _self.current_query = query;
            
            _self.log("geocode w/ " + provider);
            
            var local_doThisIfNot = doThisIfNot;
            
            if ((idx < _self.providers.length) && (idx != _self.providers.length)){
                
                var next_idx = idx + 1;
                var next_provider = _self.providers[ next_idx ];               
                
                local_doThisIfNot = function(){
                    
                    _self.log("geocoding failed, trying again w/ " + next_provider);
                    _self.geocode(query, doThisOnSuccess, doThisIfNot, next_idx);
                    return;
                };
            }
            
            _self.on_success = doThisOnSuccess;
            _self.on_fail = local_doThisIfNot;
            
            if (provider == 'bing'){
                _self._bing();
                return;
            }
            
            else if (provider == 'cloudmade'){
                _self._cloudmade();
                return;
            }
            
            else if (provider == 'flickr'){
                _self._flickr();
                return;
            }
            
            else if (provider == 'geocoder.us'){
                _self._geocoder_us();
                return;
            }
            
            else if (provider == 'geonames'){
                _self._geonames();
                return;
            }
            
            else if (provider == 'google'){
                _self._google();
                return;
            }
            
            else if (provider == 'placemaker'){
                _self._placemaker();
                return;
            }
            
            else {
                _self.error('unknown provider');
                return;
            }
        }, delay);

    this.log("query for '" + query + "' will be dispatched in " + delay + "ms");
    return;
};

info.aaronland.geo.Geocoder.prototype._google = function(){

    // http://code.google.com/apis/maps/documentation/v3/services.html#GeocodingRequests

    if (! this.capabilities.has_google){
        this.error('missing libraries');
        return;
    }

    var _self = this;

    var _geocodeComplete = function(results, status) {

        if (status != google.maps.GeocoderStatus.OK){
            _self.error('server error');
            return;
        }

        if ((! results) || (! results.length)){
            _self.error('no results');
            return;
        }
        
        loc = results[0].geometry;
        lat = loc.location.lat();
        lon = loc.location.lng();
        type = loc.location_type;

        if (type == google.maps.GeocoderLocationType.ROOFTOP){
            zoom = 17;
        }
        
        else if (type == google.maps.GeocoderLocationType.RANGE_INTERPOLATED){
            zoom = 15;
        }
        
        else if (type == google.maps.GeocoderLocationType.GEOMETRIC_CENTER){
            zoom = 13;
        }
        
        else {
            zoom = 11;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    var goog = new google.maps.Geocoder();
    goog.geocode({'address' : this.current_query}, _geocodeComplete);

    this.log("google geocoding request dispatched");
    return;
};

info.aaronland.geo.Geocoder.prototype._bing = function(){

    // http://msdn.microsoft.com/en-us/library/cc161074.aspx

    if (! this.capabilities.has_bing){
        this.error('missing libraries');
        return;
    }

    var _self = this;

    var _bingCallback = function(shapeLayer, findResults, places, moreResults, errorMsg){

        if (places == null){
            _self.error('no results: ' + errorMsg);
            return
        }

        var loc = places[0].LatLong;
        var zoom = 17;	// sudo, make me more better

        _self.success(loc.Latitude, loc.Longitude, zoom);
        return;
    };

    // no, really...

    var div = document.createElement('div');
    div.setAttribute('id', 'invisible_map');
    div.setAttribute('style', 'display:none');
    document.body.appendChild(div);

    var bing = new VEMap('invisible_map');
    bing.LoadMap();

    // the mind reels...

    bing.Find(null,    // what
              this.current_query, // where
              null,    // VEFindType (always VEFindType.Businesses)
              null,    // VEShapeLayer (base by default)
              null,    // start index for results (0 by default)
              null,    // max number of results (default is 10)
              null,    // show results? (default is true)
              null,    // create pushpin for what results? (ignored since what is null)
              null,    // use default disambiguation? (default is true)
              null,    // set best map view? (default is true)
              _bingCallback);  // call back function

    this.log("bing geocoding request dispatched");
    return;
};

info.aaronland.geo.Geocoder.prototype._flickr = function(){

    if (! this.capabilities.has_flickr){
        this.error('missing flickr libraries or api key');
        return;
    }

    var _self = this;

    // dirty dirty dirty...

    window['_flickrGeocodeComplete'] = function(rsp){

        if (rsp.stat == 'fail'){
            _self.error("received (failed) response from flickr");
            return;
        }

        var count = rsp.places.total;

        if (! count){
            _self.error("received (failed) response from flickr");
            return;
        }

        if (count > 1){
            _self.log("geocoding returned " + count + " results, using the first...");
        }

        var place = rsp.places.place[0];
        var lat = place.latitude;
        var lon = place.longitude;
        var type = place.place_type;

        if (type == 'neighbourhood'){
            zoom = 15;
        }
        
        else if (type == 'locality'){
            zoom = 13;
        }
        
        else if (type == 'county'){
            zoom = 10;
        }

        else if (type == 'country'){
            zoom = 7;
        }
        
        else {
            zoom = 3;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    //

    var flickr_args = {
        'key' : this.args['flickr_apikey'],
        'enable_logging' : this.args['enable_logging'],
    };

    var flickr = new info.aaronland.flickr.API(flickr_args);
    var method = 'flickr.places.find';

    var args = {
        'query': this.current_query,
        'jsoncallback': '_flickrGeocodeComplete'
    };

    flickr.api_call(method, args);

    this.log("query dispatched to " + flickr);
    return;
};

info.aaronland.geo.Geocoder.prototype._geonames = function(){

    this.error('geonames support not complete');
    return;

    // var url = 'http://ws.geonames.org/searchJSON?q=' + encodeURIComponent(this.current_query);
};

info.aaronland.geo.Geocoder.prototype._cloudmade = function(){

    // http://developers.cloudmade.com/projects/web-maps-lite/examples/geocoding

    if (! this.capabilities.has_cloudmade){
        this.error('missing cloudmade libraries or api key');
        return;
    }

    var _self = this;

    var _geocodeComplete = function(rsp){

        if (! rsp.found){
            _self.error("received (failed) response from cloudmade");
            return;
        }

        // work out zoom level based on rsp.features[0].properties.place

        var loc = rsp.features[0].centroid.coordinates;
        var zoom = null;

        _self.success(loc[0], loc[1], null);
        return;
    };

    var cm = new CM.Geocoder(this.args['cloudmade_apikey']);
    cm.getLocations(this.current_query, _geocodeComplete);

    this.log("query dispatched to cloudmade");
};

info.aaronland.geo.Geocoder.prototype._placemaker = function(){

    // http://icant.co.uk/jsplacemaker/

    if (! this.capabilities.has_placemaker){
        this.err('missing placemaker libraries or api key');
        return;
    }

    var _self = this;

    var _onMatch = function(rsp){
        
        if (rsp.error){
            _self.error(rsp.error);
            return;
        }

        var match = rsp.match;
        var place = (typeof(match[0]) == 'undefined') ? match.place : match[0].place;

        var woeid = place.woeId;

        var lat = place.centroid.latitude;
        var lon = place.centroid.longitude;
        var zoom = 2;

        switch (place.type){
        	case 'Suburb' :
                    zoom = 14;
                    break;
        	case 'Town' :
                    zoom = 12;
                    break;
        	case 'County' :
                    zoom = 10;
                    break;
        	case 'State' :
                    zoom = 7;
                    break;
        	default :
                    zoom = 5;
                    break;
        }

        _self.success(lat, lon, zoom);
        return;
    };

    Placemaker.config.appID = this.args['placemaker_apikey'];
    Placemaker.getPlaces(this.current_query, _onMatch, 'en-us');

    this.log('query dispatched to placemaker');
}

info.aaronland.geo.Geocoder.prototype._geocoder_us = function(){

    this.error('geocoder.us support not complete');
    return;

    window['_geocoderUSGeocodeComplete'] = function (rsp){
    };

    var url = 'http://rpc.geocoder.us/service/json?jsoncallback=_geocoderUSGeocodeCallback';
    url += '&address=' + encodeURIComponent(this.current_query);

    jsr = new JSONscriptRequest(url); 

    jsr.noCacheIE = '';
    jsr.buildScriptTag(); 
    jsr.addScriptTag();

    this.log('query dispatched to geocoder.us');
}

info.aaronland.geo.Geocoder.prototype.success = function(lat, lon, zoom){

    this.log(this.current_provider + ' returned OK: ' + lat + ',' + lon + ',' + zoom);
    var result = new info.aaronland.geo.GeocoderResult(this.current_provider, this.current_query, lat, lon, zoom);

    this.on_success(result);
    return;
}

info.aaronland.geo.Geocoder.prototype.error = function(msg){

    this.log(this.current_provider + ' failed: ' + msg);

    var error = new info.aaronland.geo.GeocoderError(this.current_provider, this.current_query, msg);

    this.on_fail(error);
    return;
}

info.aaronland.geo.Geocoder.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    if (! this.canhas_console){
        return;
    }

    console.log("[geocoder] " + msg);
};

// -*-java-*-
