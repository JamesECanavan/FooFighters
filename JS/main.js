window.onload = function(){
    console.log("Ready");
    var audio;

    //hide pause at first
    $('#pause').hide();
	
    //initializer - plays the first song
    initAudio($('#playlist li:first-child'));
	
    function initAudio(element){
    	var song = element.attr('song');
        var title = element.text();
        var cover = element.attr('cover');

    	//make a new audio object
    	audio = new Audio('Assets/Media/' + song);
	
    	if(!audio.currentTime){
    		$('#duration').html('0.00');
    	}

    	$('#audio-player .title').text(title);
	
	    //adds song cover photo
	    $('img.cover').attr('src','Assets/Images/' + cover);
	
	    $('#playlist li').removeClass('active');
     element.addClass('active');
    }


    //music - play button
    $('#play').click(function(){
    	audio.play();
    	$('#play').hide();
    	$('#pause').show();
    	$('#duration').fadeIn(400);
    	showDuration();
    });

    //music - pause button
    $('#pause').click(function(){
    	audio.pause();
    	$('#pause').hide();
    	$('#play').show();
    });
	
    //music - stop button
    $('#stop').click(function(){
    	audio.pause();		
    	audio.currentTime = 0;
    	$('#pause').hide();
    	$('#play').show();
    	$('#duration').fadeOut(400);
    });

    //music - skip to next button
    $('#next').click(function(){
      audio.pause();
      var next = $('#playlist li.active').next();
      if (next.length == 0) {
          next = $('#playlist li:first-child');
      }
      initAudio(next);
    	audio.play();
    	showDuration();
    });

    //music - previous song button
    $('#prev').click(function(){
      audio.pause();
      var prev = $('#playlist li.active').prev();
      if (prev.length == 0) {
          prev = $('#playlist li:last-child');
      }
      initAudio(prev);
    	audio.play();
    	showDuration();
    });

    //music - select playlist song
    $('#playlist li').click(function () {
        audio.pause();
        initAudio($(this));
	    $('#play').hide();
	    $('#pause').show();
	    $('#duration').fadeIn(400);
	    audio.play();
	    showDuration();
    });

    //music - control volume
    $('#volume').change(function(){
    	audio.volume = parseFloat(this.value / 100);
    });
	
    //music - song duration
    function showDuration(){
    	$(audio).bind('timeupdate', function(){
    		//gets hours/mins
    		var s = parseInt(audio.currentTime % 60);
    		var m = parseInt((audio.currentTime / 60) % 60);
    		//add 0 if seconds < 10
    		if (s < 10) {
    			s = '0' + s;
    		}
	    	$('#duration').html(m + '.' + s);	
	    	var value = 0;
	    	if (audio.currentTime > 0) {
	    		value = Math.floor((100 / audio.duration) * audio.currentTime);
	    	}
	    	$('#progress').css('width',value+'%');
	    });
    }
}
