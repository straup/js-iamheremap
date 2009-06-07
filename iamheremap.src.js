/*

info.aaronland.iamhere.Map library v1.1.1
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

    // because we read/write to the #hash component
    // for generating permalinks on the fly having
    // real live query parameters becomes ugly and
    // problematic. so, kick it in the shins and move
    // on...

    var loc = window.location;
    var search = loc.search;

    if (search){
        var url = loc.protocol + '//' + loc.host + loc.pathname + '#' + search.substring(1);
        window.location = url;
        return;
    }

    // okay, let's get started!

    var _self = this;

    this.original_title = document.title;

    this.args = args;
    this.map_obj = null;

    this.timer_reversegeo = null;
    this.timer_warning = null;

    this.flickr = null;
    this.googlemaps_geocoder = null;

    this.paths_woe = new Array();

    // get/set cookies for last location, maybe?

    this.lat = 0;
    this.lon = 0;
    this.zoom = 2;

    this.woeid = 0;

    // the URI at load time; not necessarily
    // the permalink that will be generated
    // as the user moves around.

    this.uri = new info.aaronland.URI();
    
    // the URI is the command line, or something like that

    if (! this.args['disable_query_args']){
        this.loadQueryArgs();
    }

    // capabilities

    this.canhas_flickr = (typeof(info.aaronland.flickr) == 'object') ? 1 : 0;
    this.canhas_google = (typeof(google) == 'object') ? 1 : 0;

    this.canhas_geocoder = 0;
    this.canhas_reversegeocoder = 0;
    this.canhas_geolocation = 0;

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

    // google

    if (this.canhas_google){
        this.googlemaps_geocoder = new google.maps.Geocoder();
    }

    // sanity checking

    if ((this.canhas_flickr) || (this.canhas_google)){
        this.canhas_geocoder = 1;
    }

    if (this.canhas_flickr){
        this.canhas_reversegeocoder = 1;
    }

    // not entirely sure about this interface...

    var canhas = new info.aaronland.geo.canhasLocation();
    
    if (canhas.survey(args)){
        this.canhas_geolocation = 1;
    }

    // reporting

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);
    this.log("geocoder support: " + this.canhas_geocoder);
    this.log("reverse geocoder support: " + this.canhas_reversegeocoder);
    this.log("geolocation support: " + this.canhas_geolocation);

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

    if ((this.canhas_geocoder) || (this.canhas_geolocation)){
    	html += '<form id="iamhere_geocoder" style="text-align:center;max-width:' + this.map_width + ';">';

        if (this.canhas_geocoder){

            html += '<input id="iamhere_geocode_me" type="text" name="location" size="30%;" value="" style="border:1px solid;padding:1px;" />' + 
                    '<input id="iamhere_find_this" type="submit" value="&#8592; FIND THIS PLACE" style="border:1px solid; margin-left:10px;" />';
	}

        if (this.canhas_geolocation){
            var label = (this.canhas_geocoder) ? "or find my location" : "find my location";
            html += '<input id="iamhere_find_me" type="submit" value="' + label + '" style="border:1px solid;margin-left:10px;" />';
        }

        html += '</form>';
    }

    // sudo, add support to make the map/crosshair work 
    // with window resizing...

    html += '<div id="iamhere_chooser" style="position:relative;max-width:' + this.map_width + ';">' + 
    	    '<div id="iamhere_viewport"></div>' +
            '<div id="iamhere_crosshair" style="' +
            'position: absolute;top:' + crosshair_y + 'px;height:19px;width:19px;left:' + crosshair_x + ';margin-left:-8px;display:block;' + 
    	    'background-position: center center;background-repeat: no-repeat;' + 
    	    '"></div></div>'; 

    if (this.args['modestmaps_provider'] == 'CloudMade'){

        var date = new Date();
        var yyyy = date.getYear() + 1900;

        html += '<div id="iamhere_osm_notice" style="' + 
            	'text-align:right;font-size:10px;font-family:sans-serif;margin-top:5px;max-width:' + this.map_width + ';' + 
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

    // geocoding

    $("#iamhere_find_this").click(function(){
            var loc = $("#iamhere_geocode_me").val();

            if (loc == ''){
                _self.displayWarning("nothing to geocode!");
                return false;
            }

            console.log("WTF " + loc);
            _self.geocode(loc);
            return false;
    });

    // positioning (geo-location)

    $("#iamhere_find_me").click(function(){
            _self.displayLocation("<em>establishing current location</em>");
            _self.findMyLocation();
            return false;
    });

    // dwim (zoom in/out when the crosshairs are clicked)

    $("#iamhere_crosshair").dblclick(function(e){
            var action = _self.map_obj.getDoubleClick();
            action(e);
    });

    // load the map

    this.loadModestMap();
};

info.aaronland.iamhere.Map.prototype.loadModestMap = function(){

    var _self = this;

    var provider = new com.modestmaps.CloudMadeProvider(this.args['cloudmade_apikey'], this.args['map_style']);

    // sudo, check to see there's a cookie with last location maybe?

    var canhas_point = ((this.args['latitude']) && (this.args['longitude'])) ? 1 : 0;

    var lat = (canhas_point) ? this.args['latitude'] : this.lat;
    var lon = (canhas_point) ? this.args['longitude'] : this.lon;
    var zoom = (this.args['zoom']) ? this.args['zoom'] : this.zoom;

    // hello, little map-y fella

    this.map_obj = new com.modestmaps.Map('iamhere_viewport', provider, new com.modestmaps.Point(this.map_width, this.map_height))
    var controls = new com.modestmaps.MapControls(this.map_obj);

    this.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);

    // events 

    _onChange = function (){
        $("#iamhere_warning").hide();

        var center = _self.map_obj.getCenter();
        var zoom = _self.map_obj.getZoom();

        _self.lat = center.lat;
        _self.lon = center.lon;
        _self.zoom = zoom;
        _self.woeid = null;

        _self.log("map centered on " + center.toString());

        _self.updateContext();
   	_self.reverseGeocode(center.lat, center.lon);
    };

    this.map_obj.addCallback("zoomed", _onChange);
    this.map_obj.addCallback("panned", _onChange);
    this.map_obj.addCallback("centered", _onChange);

    if (canhas_point){
        _onChange();
    }

};

// sudo, make me a generic "who's on first" library...

info.aaronland.iamhere.Map.prototype.findMyLocation = function(cb){

    var _self = this;

    // x_dispatch_my_dispatch

    _doThisOnSuccess = function(lat, lon, cb){

        if (cb){
            cb(lat, lon);
            return;
        }

        _self.goTo(lat, lon, 14);
    };

    _doThisIfNot = function(msg){
        _self.displayLocation("");
        _self.displayWarning(msg);
    };

    var loc = new info.aaronland.geo.Location(this.args);
    loc.findMyLocation(_doThisOnSuccess, _doThisIfNot);
};

// put this in a proper lib with support for geonames, et. al. ?

info.aaronland.iamhere.Map.prototype.geocode = function(query){

    if (! this.canhas_geocoder){
        return;
    }

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

    this.displayCoordinates("<i>geocoding</i>");
    this.displayLocation("");

    var _self = this;

    _geocodeComplete = function(results, status) {

        _self.log("geocoding dispatch returned");

        if (status != google.maps.GeocoderStatus.OK){
            _self.displayWarning("geocoding failed with status " + status);
            _self.displayLocation("");
            return;
        }

        if ((! results) || (! results.length)){
            _self.displayWarning("geocoding returned no results");
            _self.displayLocation("");
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

        _self.goTo(lat, lon, zoom);
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
            _self.displayWarning("geocoding failed: " + rsp.message);
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

        _self.goTo(lat, lon, zoom);
    };

    this.displayLocation("<em>geocoding</em>");

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

    if (! this.canhas_reversegeocoder){
        return;
    }

    this.displayLocation("");
    var _self = this;

    if (this.timer_reversegeo) {
        clearTimeout(this.timer_reversegeo);
        this.timer_reversegeo = null;
    }

    this.timer_reversegeo = setTimeout(function() {

    	_reverseGeocodeComplete = function(rsp){

            _self.log("reverse geocoding dispatch returned");

        	if (rsp.stat == 'fail'){
                        _self.displayLocation("<em>unable to reverse geocode your current position</em>");
            		_self.displayWarning("reverse geocoding failed: " + rsp.message);
            		return;
        	}

        	if (rsp.places.total == 0){
                    	_self.displayLocation("<em>unable to reverse geocode your current position</em>");
            		return;
        	}

                var name = rsp.places.place[0].name;
                var woeid = rsp.places.place[0].woeid;

                _self.woeid = woeid;
            	_self.woeid_name = name;

            	_self.displayLocation(name, woeid);
            
            	if (_self.args['auto_display_shapefiles']){
                    _self.drawShapefile(woeid);
		}

    	};

    	_self.log("reverse geocoding " + lat + "," + lon);
	_self.displayLocation("<em>reverse geocoding</em>");

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
      		_self.displayWarning("fetching shapefiles failed: " + rsp.message);
            	return;
        }

        if (! rsp.place.has_shapedata){
            _self.displayWarning("woe id has no shapedata");            
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

info.aaronland.iamhere.Map.prototype.goTo = function(lat, lon, zoom, do_reversegeocoding){

    this.lat = lat;
    this.lon = lon;

    this.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
    
    var _self = this;

    if (this.canhas_reversegeocoder){
        setTimeout(function(){
                _self.reverseGeocode(lat, lon);
        }, 1500);
    }
};

info.aaronland.iamhere.Map.prototype.loadQueryArgs = function(allowed){
    
    this.log("loading query arguments");   

    var params_map = {
        'latitude' : 'latitude',
        'longitude' : 'longitude',
        'zoom' : 'zoom',
        'style' : 'map_style',
        'shapefiles' : 'auto_display_shapefiles',
    };

    for (var public_key in params_map){

        var private_key = params_map[public_key];

        if (this.uri.query.contains(public_key)){
            var value = this.uri.query.get(public_key);
            this.args[private_key] = value;

            this.log('assigned ' + private_key + ': ' + value); 
        }
    }
};

info.aaronland.iamhere.Map.prototype.generatePermalink = function(){
    var loc = window.location;
    var permalink = loc.protocol + '//' + loc.host + loc.pathname + '#' + this.generatePermahash();
    return permalink;
};

info.aaronland.iamhere.Map.prototype.generatePermahash = function(){

    var params = this.uri.query.params;
    permalink = new Array();

    permalink.push('latitude=' + encodeURIComponent(this.lat));
    permalink.push('longitude=' + encodeURIComponent(this.lon));
    permalink.push('zoom=' + encodeURIComponent(this.zoom));

    for (key in params){

        if ((key == 'latitude') || (key == 'longitude') || (key == 'zoom')){
            continue;
        }

        else if (key == 'style'){
            permalink.push('style=' + encodeURIComponent(this.args['map_style']));
        }

        // this will deal with shapefiles
        // as well as anything else that happened
        // to be passed in like &horse=yes

        else {
            permalink.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
    }

    return permalink.join("&");
};

info.aaronland.iamhere.Map.prototype.setPermahash = function(){
    location.href = "#" + this.generatePermahash();
};

info.aaronland.iamhere.Map.prototype.formatCoord = function(coord){

    var decimals = this.args['max_decimal_points'];

    if (decimals){
        coord = coord.toFixed(decimals);
    }

    return coord;
};

info.aaronland.iamhere.Map.prototype.formatDegree = function(value, axis){

    var dir = value;
    var val = Math.abs(value);

    var deg = Math.floor(val);
    val = (val - deg) * 60;

    var min = Math.floor(val);

    val = (val - min) * 60;

    var sec = Math.floor(val);
    var str = deg + '&#176;';

    if (min <= 9){
        str += '0';
    }

    str += min + "'";

    if (sec <= 9){
        str += '0';
    }

    str += sec + '"';

    if (axis == 'lat'){
        str += (dir >= 0) ? 'N' : 'S';
    }

    else {
        str += (dir >= 0) ? 'E' : 'W';
    }

    return str;
};

info.aaronland.iamhere.Map.prototype.displayCoordinates = function(lat, lon){
    
    // lon is not passed during geocoding when we 
    // display a message while we wait for a response

    if (! lon){
        $("#iamhere_coordinates").html(label);
        return;
    }

    var lat = this.formatCoord(lat);
    var lon = this.formatCoord(lon);

    var plain =  lat + ", " + lon;
    var pretty = this.formatDegree(lat, 'lat') + " " + this.formatDegree(lon, 'lon');

    var label = plain + " (" + pretty + ")";
    $("#iamhere_coordinates").html(label);

    this.updateDocumentTitle(lat, lon);
};

info.aaronland.iamhere.Map.prototype.displayLocation = function(placename, woeid){

    var loc = placename;

    if (woeid){

        var extra = ' (WOE ID <a href="#" id="woe_' + woeid +'">' + woeid + '</a>)';

        if (this.args['auto_display_shapefiles']){
            extra = ' (WOE ID ' + woeid + ')';
        }

        loc += extra;
    }

    $("#iamhere_location").html(loc);

    if (this.args['auto_display_shapefiles']){
        return;
    }

    if (woeid){
	var _self = this;

    	$("#woe_" + woeid).click(function(){
                _self.drawShapefile(woeid);
                return false;
        });
    }

    if (woeid){

        var lat = this.formatCoord(this.lat);
        var lon = this.formatCoord(this.lon);
 
       this.updateDocumentTitle(lat, lon, placename);
    }

};

info.aaronland.iamhere.Map.prototype.displayWarning = function(msg){
    
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
};

info.aaronland.iamhere.Map.prototype.updateDocumentTitle = function(lat, lon, placename){

    if (! this.args['refresh_title']){
        return;
    }

    var title = this.original_title + ' : ' + lat + ", " + lon;

    if (placename){
        title = title + ' (' + placename + ')';
    }

    document.title = title;
};

info.aaronland.iamhere.Map.prototype.updateContext = function(){
    this.displayCoordinates(this.lat, this.lon);

    if (! this.args['disable_query_args']){
        this.setPermahash();
    }
};

info.aaronland.iamhere.Map.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (typeof(console) != 'object'){
        return;
    }

    console.log('[iamhere] ' + msg);
};

// backwards compatibility...

info.aaronland.iamhere.Map.prototype.format_degree = function(value, axis){
    this.log("obj.format_degree is depracated, you should use obj.formatDegree");
    return this.formatDegree(value, axis);
};

info.aaronland.iamhere.Map.prototype.display_coordinates = function(lat, lon){
    this.log("obj.display_coordinates is depracated, you should use obj.displayCoordinates");
    return this.displayCoordinates(lat, lon);
};

info.aaronland.iamhere.Map.prototype.display_location = function(placename, woeid){
    this.log("obj.display_location is depracated, you should use obj.displayLocation");
    return this.displayLocation(placename, woeid);
};

info.aaronland.iamhere.Map.prototype.display_warning = function(msg){
    this.log("obj.display_display is depracated, you should use obj.displayWarning");
    return this.displayWarning(msg);
};

// -*-java-*-