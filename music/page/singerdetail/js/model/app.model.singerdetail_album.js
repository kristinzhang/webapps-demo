(function($){

app.model.singerdetail_albums = app.model.extend({

    initialize: function(attributes, options){
        var me = this;
        
        me.options = options;
        
        return me;
    }

    ,url: function(){
        var me = this;

        return _.template('/music/singeralbum.php?id=<%= id %>&<%= date %>')({
            id : me.options.id,
            date : (new Date()).getTime()
        });

    }

    ,parse: function(resp, xhr){
        return resp.albumlist;
    }

});

})(Zepto);
