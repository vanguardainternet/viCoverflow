(function($) {
  $.coverflow = function(el, options) {
    var base = this;
      
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    
    // Add a reverse reference to the DOM object
    base.$el.data('coverflow', base);
    
    base.init = function() {    
      //base.href = base.$el.attr('href');
      //base.id = base.$el.attr('id');
      
      base.options = $.extend({},$.coverflow.defaultOptions, options);

      base.center = 0;
      base.distance = 80;
      base.skew = 10;
      base.speed = 200;
      base.interval = 50;   
      base.count = base.$el.children().size();

      $('#prev').click(function(e) {     
        $prev = $('li[active|=true]').next();
        if ($prev.length) { base.activate($prev.attr('id')); }
      });

      $('#next').click(function(e) {     
        $next = $('li[active|=true]').prev();
        if ($next.length) { base.activate($next.attr('id')); }
      });

      var i = 0;
      $.each(base.$el.children(), function() {
        $(this).attr('id', 'cf' + i);
        
        $(this).click(function(e) {
          base.activate($(this).attr('id'));
        });
        
        i++;        
      });
    
      base.last();
    };
    
    base.last = function() {      
      var left = base.distance;
      for (var i = 0; i < base.count; i++) {
        if (i+1 != base.count) {
          $('#cf' + i).transform({skewY: -base.skew, scale: [.7, .7]});
          $('#cf' + i).offset({left: left, top: 40});
          
        } else {
          base.center = left;
          $('#cf' + i).attr('style', 'z-index: 1000;');
          $('#cf' + i).attr('active', true);
          $('#cf' + i).offset({left: left, top: 70});
        }
        left += base.distance;
      }      
    };  
        
    base.activate = function(x) {
      // Elemento clicado.
      var x = parseInt(x.substring(2));
      // Elemento atual.
      var a = parseInt($('li[active|=true]').attr('id').substring(2));      
      var left = base.center - base.distance;
      var right = base.center + base.distance;
      var time = base.interval;
            
      if (x < a) {
        $('#cf' + x).attr('active', true);
        base.moveCenter($('#cf' + x), base.center, 1000, 0, 1, time);

        // Menores.     
        for (var i = x-1; i >= 0; i--) {
          time += base.interval;
          $('#cf' + i).attr('active', false);
          base.moveLeft($('#cf' + i), left, 1000, -base.skew, 0.7, time);
          left -= base.distance;
        }
        // Maiores
        var rightTime = (base.count - a - 1) * base.interval;
        for (var i = x+1; i < base.count; i++) {
          $('#cf' + i).attr('active', false);
          base.moveRight($('#cf' + i), right, -right, base.skew, 0.7, rightTime);
          right += base.distance; 
          rightTime -= base.interval;  
        }        
      } 
      else if (x > a) {
        $('#cf' + x).attr('active', true);
        base.moveCenter($('#cf' + x), base.center, 1000, 0, 1, time);

        // Menores.     
        var leftTime = a * base.interval;
        for (var i = x-1; i >= 0; i--) {
          time += base.interval;
          $('#cf' + i).attr('active', false);
          base.moveLeft($('#cf' + i), left, 1000, -base.skew, 0.7, leftTime);
          left -= base.distance;
          leftTime -= base.interval;
        }
        // Maiores
        for (var i = x+1; i < base.count; i++) {
          $('#cf' + i).attr('active', false);
          base.moveRight($('#cf' + i), right, -right, base.skew, 0.7, time);
          right += base.distance; 
        }
      }
    };
    
    base.moveLeft = function(el, left, zindex, skew, scale, time) {
      setTimeout(function() {
        var position = el.offset();
        var moveX = left - position.left;
        var moveY = 40 - position.top;

        el.animate({
          left: '+=' + moveX,
          //skewY: skew, 
          //scale: [scale, scale],        
          top: '+=' + moveY     
        }, base.speed);
        
        el.transform({skewY: skew, scale: [scale, scale]});
        
        el.offset({left: position.left, top: position.top});
        el.css('z-index', zindex);        
        
      }, time);      
    };

    base.moveCenter = function(el, left, zindex, skew, scale, time) {
      setTimeout(function() {
        var position = el.offset();
        var moveX = left - position.left;
        var moveY = 70 - position.top;
        
        el.animate({
          left: '+=' + moveX,
          //skewY: skew, 
          //scale: [scale, scale],         
          top: '+=' + moveY     
        }, base.speed); 
        
        el.transform({skewY: skew, scale: [scale, scale]});
        
        el.offset({left: position.left, top: position.top});        
        el.css('z-index', zindex);

      }, time);      
    };

    base.moveRight = function(el, left, zindex, skew, scale, time) {
      setTimeout(function() {
        var position = el.offset();
        var moveX = left - position.left;
        var moveY = 40 - position.top;
       
        el.animate({
          left: '+=' + moveX,
          //skewY: skew, 
          //scale: [scale, scale],          
          top: '+=' + moveY     
        }, base.speed);
        
        el.transform({skewY: skew, scale: [scale, scale]});
        
        el.offset({left: position.left, top: position.top});         
        el.css('z-index', zindex);
        
      }, time);      
    };
    
    base.init();
  };
  
  //$.coverflow.defaultOptions = {  };
  
  $.fn.coverflow = function(options) {
    return this.each(function() {
      (new $.coverflow(this, options));
    });
  };
})(jQuery);