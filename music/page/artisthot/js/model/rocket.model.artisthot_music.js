(function($){

rocket.model.artisthot_music = rocket.model.extend({

    initialize: function(attributes, options){
        var me = this;
    }

    ,url: function(){
        var me = this;
        
        return _.template('/music/artisthot.php?<%= time %>')({
              time : (new Date()).getTime()
        });
    }

    ,parse: function(resp, xhr){
        return resp.artist;
    }

});

})(Zepto);
