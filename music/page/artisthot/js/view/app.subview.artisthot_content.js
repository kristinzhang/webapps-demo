
(function($) {

app.subview.artisthot_content = app.subview.extend({
    el: "#artisthot_page_content"

    ,template: _.template(
        $('#template_artisthot_content').text()
    )

    ,events: {
        'click li.url' : 'artistDetail'
    }

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        
        me.model = new app.model.artisthot_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
        
        
    }

    ,render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
       
        me.$el.append(
            me.template({
                artisthot: me.model.toJSON()
            })
        );

        me._bindTouchEvent.call(me);
        me.hideLoading();
        
        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.model.on('change', me.render, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
        }
    }
    /**
     * 绑定touch事件
     *
     */
    , _bindTouchEvent : function(){
         var me = this;
        me.$el.find('li.url').unbind('touchstart').unbind('touchend').bind('touchstart',function(){
            $(this).addClass('active');
        }).bind('touchend',function(){
            $(this).removeClass('active');
        });
    
    }
    , artistDetail : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'artistdetail/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('artistid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    
});

})(Zepto);

