
(function($) {

app.subview.singerdetail_content_songs = app.subview.extend({
    
      className: 'songs'
    
    , template: _.template(
        $('#template_singerdetail_content_songs').text()
    )

    , events : {
    
        'click .list li.url' : 'playMusic'
    }

    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;
        
        me.options = options;

        me.model = new app.model.singerdetail_songs(null, options);
        
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        me.$el.append(
            me.template({
                songs: me.model.toJSON()
            })
        );
        

        me.hideLoading();

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
    }
    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);

    }
    ,onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            if(me.isFirstLoad){
                me.model.fetch({
                      data : {
                        id : param.id
                    }
                    , success: function(){
                        me.isFirstLoad = false;
                    }
                });
           }

            
        }
    }
    
    , playMusic : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'play/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('songid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});    
    }
    
    

});

})(Zepto);


