/*

info.aaronland.iamhere.Map library v1.0
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

// note: the use of jquery is probably overkill.
// patches are welcome.

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.iamhere = {};
}

info.aaronland.iamhere.Map = function(target, args){
    this.args = args;
    this.map_obj;

    this.timer_reversegeo;
    this.timer_warning;

    this.flickr;
    this.googlemaps_geocoder;

    this.paths_woe = new Array();

    this.lat;
    this.lon;
    this.woeid;

    // I am here...

    var _self = this;

    // Hello, world?
    
    this.canhas_console = (typeof(console) != 'undefined') ? 1 : 0;

    this.canhas_flickr = (typeof(info.aaronland.flickr) != 'undefined') ? 1 : 0;
    this.canhas_google = (typeof(google) != 'undefined') ? 1 : 0;

    // flickr

    if ((this.canhas_flickr) && (! this.args['flickr_apikey'])){
        this.canhas_flickr = 0;
    }

    if (this.canhas_flickr){

        var flickr_args = {
            'key' : this.args['flickr_apikey'],
            'enable_logging' : this.args['enable_logging'],
        };

        this.flickr = new info.aaronland.flickr.API(flickr_args);
    }

    // sanity checking

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);

    // squirt in the map container elements

    this.map_height = 400;
    this.map_width = $(document).width();

    if (args['map_width']){
        this.map_width = args['map_width'];
    }

    if (args['map_height']){
        this.map_height = args['map_height'];
    }

    var crosshair_y = (this.map_height / 2) - 8;
    var crosshair_x = this.map_width / 2;

    // please to make the inline css go away...

    // to do: generate a uuid to append to iamhere_*
    // identifiers so that more than one map may be
    // embedded in a page...

    var html = '';

    if (this.canhas_google){
        this.googlemaps_geocoder = new google.maps.Geocoder();
    }

    if ((this.canhas_google) || (this.canhas_flickr)){
    	html += '<form id="iamhere_geocoder" style="text-align:center;max-width:' + this.map_width + ';">' + 
       	        '<input id="iamhere_geocode_me" type="text" name="location" size="30%;" value="" style="border:1px solid;padding:1px;" />' + 
                '<input id="iamhere_find_this" type="submit" value="&#8592; FIND THIS PLACE" style="border:1px solid; margin-left:10px;" />' + 
                '<input id="iamhere_find_me" type="submit" value="or find my location" style="border:1px solid;margin-left:10px;" />' + 
                '</form>';
    }

    else {
        this.log("geocoding disabled because there is no google-fu");
    }

    // sudo, add support to make the map/crosshair work 
    // with window resizing...

    html += '<div id="iamhere_chooser" style="position:relative;"><div id="iamhere_viewport"></div>' +
            '<div id="iamhere_crosshair" style="' +
            'position: absolute;top:' + crosshair_y + 'px;height:19px;width:19px;left:' + crosshair_x + ';margin-left:-8px;display:block;' + 
    	    'background-position: center center;background-repeat: no-repeat;' + 
    	    '"></div></div>'; 

    if (this.args['modestmaps_provider'] == 'CloudMade'){

        var date = new Date();
        var yyyy = date.getYear() + 1900;

        html += '<div id="iamhere_osm_notice" style="' + 
            	'text-align:right;font-size:10px;font-family:sans-serif;margin-top:5px;' + 
                '">Map data <a href="http://creativecommons.org/licenses/by-sa/3.0/">CCBYSA</a> ' + yyyy + ' <a href="http://openstreetmap.org/">OpenStreetMap.org</a> contributors</a></div>';
    }

    html += '<div id="iamhere_coordinates" style="' + 
            'min-height:10pt;font-family:sans-serif;font-weight:700;font-size:10pt;margin-bottom:5px;margin-top:15px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_location" style="'+
            'min-height:10pt;font-family:sans-serif;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_warning" style="'+    
            'min-height:10pt;color:red;font-family:serif;font-style:italic;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>';

    $("#" + target).html(html);

    // http://www.sveinbjorn.org/dataurls_css
    // this is just a nuisance to do above...

    var data_url = '"data:image/gif;base64,R0lGODlhEwATAKEBAAAAAP///////////' +
    		   'yH5BAEKAAIALAAAAAATABMAAAIwlI+pGhALRXuRuWopPnOj7hngEpRm6Z' + 
    		   'ymAbTuC7eiitJlNHr5tmN99cNdQpIhsVIAADs="';

    $("#iamhere_crosshair").css("background", "url(" + data_url + ")");

    // get eventastic

    $("#iamhere_find_this").click(function(){
            var loc = $("#iamhere_geocode_me").val();

            if (loc == ''){
                _self.display_warning("nothing to geocode!");
                return false;
            }

            _self.geocode(loc);
            return false;
    });

    $("#iamhere_find_me").click(function(){
            _self.display_location("<em>establishing current location</em>");
            _self.findMyLocation();
            return false;
    });

    $("#iamhere_crosshair").dblclick(function(e){
            var action = _self.map_obj.getDoubleClick();
            action(e);
    });

    // load the map

    this.loadModestMap();
};

info.aaronland.iamhere.Map.prototype.loadModestMap = function(){

    var _self = this;

    var provider = new com.modestmaps.CloudMadeProvider(this.args['cloudmade_apikey'], this.args['cloudmade_style']);

    // sudo, check to see there's a cookie with last location maybe?

    var lat = 0;
    var lon = 0;
    var zoom = 2;

    // hello, little map-y fella

    this.map_obj = new com.modestmaps.Map('iamhere_viewport', provider, new com.modestmaps.Point(this.map_width, this.map_height))
    new com.modestmaps.MapControls(this.map_obj);

    this.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);

    if (this['args']['find_my_location']){

        this.display_location("<em>establishing current location</em>");

        setTimeout(function() {
                _self.findMyLocation();
        }, 1500);
    }

    // events

    _onChange = function (){
        $("#iamhere_warning").hide();

        var center = _self.map_obj.getCenter();

        this.lat = center.lat;
        this.lon = center.lon;
        this.woeid = null;

        _self.log("map centered on " + center.toString())
        _self.display_coordinates(center.lat, center.lon)
   	_self.reverseGeocode(center.lat, center.lon);
    };

    this.map_obj.addCallback("zoomed", _onChange);
    this.map_obj.addCallback("panned", _onChange);
    this.map_obj.addCallback("centered", _onChange);

    // sudo, make me a jump to center on single-click handler

};

info.aaronland.iamhere.Map.prototype.display_coordinates = function(lat, lon){

    if (typeof(lon) == 'undefined'){
    	$("#iamhere_coordinates").html(lat);
        return;
    }

    $("#iamhere_coordinates").html(lat + "," + lon);

};

info.aaronland.iamhere.Map.prototype.display_location = function(loc, woeid){

    if (woeid){
        loc += ' (WOE ID <a href="#" id="woe_' + woeid +'">' + woeid + '</a>)';
    }

    $("#iamhere_location").html(loc);

    if (woeid){
	var _self = this;
    	$("#woe_" + woeid).click(function(){
                _self.drawShapefile(woeid);
                return false;
        });
    }
};

info.aaronland.iamhere.Map.prototype.display_warning = function(msg){
    
    this.log('warning: ' + msg);

    $("#iamhere_warning").html(msg);
    $("#iamhere_warning").show();

    if (this.timer_warning) {
        clearTimeout(this.timer_warning);
        this.timer_warning = null;
    }

    this.timer_warning = setTimeout(function() {
            $("#iamhere_warning").hide();
    }, 1500);
}

// sudo, make me a generic "who's on first" library...

info.aaronland.iamhere.Map.prototype.findMyLocation = function(cb){

    var _self = this;

    // x_dispatch_my_dispatch

    _doThisOnSuccess = function(lat, lon, cb){

        if (cb){
            cb(lat, lon);
            return;
        }

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), 14);
    };

    _doThisIfNot = function(msg){
        _self.display_location("");
        _self.display_warning(msg);
    };

    var loc = new info.aaronland.geo.Location(this.args);
    loc.findMyLocation(_doThisOnSuccess, _doThisIfNot);
};

// put this in a proper lib with support for geonames, et. al. ?

info.aaronland.iamhere.Map.prototype.geocode = function(query){

    if (this.canhas_google){
        return this.geocodeGoogle(query);
    }
    
    if (this.canhas_flickr){
        this.log("flickr");
        return this.geocodeFlickr(query);
    }


    this.log("unable to find a geocoding provider");
    return;
};

info.aaronland.iamhere.Map.prototype.geocodeGoogle = function(query){

    // http://code.google.com/apis/maps/documentation/v3/services.html#GeocodingRequests

    this.log("geocoding (google) " + query);

    this.display_coordinates("<i>geocoding</i>");
    this.display_location("");

    var _self = this;

    _geocodeComplete = function(results, status) {

        _self.log("geocoding dispatch returned");

        if (status != google.maps.GeocoderStatus.OK){
            _self.display_warning("geocoding failed with status " + status);
            _self.display_location("");
            return;
        }

        if ((! results) || (! results.length)){
            _self.display_warning("geocoding returned no results");
            _self.display_location("");
            return;
        }
        
        loc = results[0].geometry;
        lat = loc.location.lat();
        lon = loc.location.lng();
        type = loc.location_type;

        _self.log("geocoded " + query + " to " + lat + "," + lon + " (" + type + ")");

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

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
        _self.reverseGeocode(lat, lon);
    };

    this.googlemaps_geocoder.geocode({'address' : query}, _geocodeComplete);

    this.log("geocoding request dispatched");
    return;
};

info.aaronland.iamhere.Map.prototype.geocodeFlickr = function(query){

    if (! this.canhas_flickr){
        return;
    }

    var _self = this;

    _geocodeComplete = function(rsp){

        _self.log("geocoding dispatch returned");

        if (rsp.stat == 'fail'){
            _self.display_warning("geocoding failed: " + rsp.message);
            return;
        }

        var count = rsp.places.total;

        if (! count){
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

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
        _self.reverseGeocode(lat, lon);
    };

    this.display_location("<em>geocoding</em>");

    var method = 'flickr.places.find';

    var args = {
        'query': query,
        'jsoncallback': '_geocodeComplete'
    };

    this.flickr.api_call(method, args);

    this.log("geocoding request dispatched");
    return;
}

info.aaronland.iamhere.Map.prototype.reverseGeocode = function(lat, lon){

    if (! this.canhas_flickr){
        return;
    }

    this.display_location("");
    var _self = this;

    if (this.timer_reversegeo) {
        clearTimeout(this.timer_reversegeo);
        this.timer_reversegeo = null;
    }

    this.timer_reversegeo = setTimeout(function() {

    	_reverseGeocodeComplete = function(rsp){

            _self.log("reverse geocoding dispatch returned");

        	if (rsp.stat == 'fail'){
            		_self.display_warning("reverse geocoding failed: " + rsp.message);
            		return;
        	}

        	if (rsp.places.total == 0){
            		return;
        	}

                var name = rsp.places.place[0].name;
                var woeid = rsp.places.place[0].woeid;

                _self.woeid = woeid;
        	_self.display_location(name, woeid)
    	};

    	_self.log("reverse geocoding " + lat + "," + lon);
	_self.display_location("<em>reverse geocoding</em>");

    	var method = 'flickr.places.findByLatLon';
        var accuracy = _self.map_obj.getZoom();

        if (accuracy > 16){
            accuracy = 16;
        }

    	var args = {
        	'lat':lat,
                'lon': lon,
                'accuracy' : accuracy,
                'jsoncallback': '_reverseGeocodeComplete'
	};

        _self.flickr.api_call(method, args);

    	_self.log("reverse geocoding request dispatched");
    }, 1500);

    return;
};

info.aaronland.iamhere.Map.prototype.drawShapefile = function(woeid){

    if (! this.flickr){
        return;
    }

    this.log("draw shapefile for woeid " + woeid);

    var _self = this;

    _drawShapefileComplete = function(rsp){

        _self.log("shapefile dispatch returned");

       	if (rsp.stat == 'fail'){
      		_self.display_warning("fetching shapefiles failed: " + rsp.message);
            	return;
        }

        if (! rsp.place.has_shapedata){
            _self.display_warning("woe id has no shapedata");            
            return;
       	}

        // clean up any existing paths_woe

        var count_paths_woe = _self.paths_woe.length;

        if (count_paths_woe){
            for (var i = 0; i < count_paths_woe; i++){
                _self.paths_woe[i].clear();
            }

            self.paths_woe = new Array();
        }

        // sudo, make me a config option

        var fillStyle = 'orange';
        var fillAlpha = 0.5;
        var strokeStyle = 'pink';

        var lines = rsp.place.shapedata.polylines.polyline;
        var count = lines.length;

        for (var i = 0; i < count; i++){

            var coords = lines[i]._content.split(" ");
            var points = []

            for (var j = 0; j < coords.length; j++){
                var pt = coords[j].split(",");
                var loc = new com.modestmaps.Location(pt[0], pt[1]);
                points.push(loc);
            }

            var path = new com.modestmaps.PolygonMarker(_self.map_obj, points, fillStyle, fillAlpha, strokeStyle);
            _self.paths_woe.push(path);
        }

        _self.log('draw shapefiles complete');
    };

    var method = 'flickr.places.getInfo';
    var args = {'woe_id':woeid, 'jsoncallback': '_drawShapefileComplete'};

    this.flickr.api_call(method, args);

    this.log("shapefile request dispatched");
    return;
};

info.aaronland.iamhere.Map.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[iamhere] ' + msg);
};

// -*-java-*-