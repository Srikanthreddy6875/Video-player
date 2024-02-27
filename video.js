document.addEventListener('DOMContentLoaded', function () {

    const video = document.querySelector('video');
    const playPauseBtn = document.querySelector('.play-pause');
    const volumeBtn = document.querySelector('.volume');
    const volumeRange = document.querySelector('input[type="range"]');
    const progressArea = document.querySelector('.progress-area');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.querySelector('.current-time');
    const videoDurationDisplay = document.querySelector('.video-duration');
    const skipBackwardBtn = document.querySelector('.skip-backward');
    const skipForwardBtn = document.querySelector('.skip-forward');
    const fullscreenBtn = document.querySelector('.fullscreen');

    playPauseBtn.addEventListener('click',pauseVideo);
    video.addEventListener('click',pauseVideo);
    //play pause functionality
    function pauseVideo(){
        if(video.paused){
            video.play();
            playPauseBtn.innerHTML='<i class="fas fa-pause"></i>';
        }
        else{
            video.pause();
            playPauseBtn.innerHTML='<i class="fas fa-play"></i>';
        }
    }

    // Volume control
    volumeBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      updateVolumeIcon();
    });
  
    volumeRange.addEventListener('input', function () {
      video.volume = volumeRange.value;
      updateVolumeIcon();
    });
  
    function updateVolumeIcon() {
      if (video.muted || video.volume === 0) {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
      } else {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    }
  
    // Progress bar update
    video.addEventListener('timeupdate', function () {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = progress + '%';
  
      // Update current time display
      currentTimeDisplay.innerText = formatTime(video.currentTime);
    });
  
    // Skip backward/forward
    skipBackwardBtn.addEventListener('click', function () {
      video.currentTime -= 10; // Skip 10 seconds backward
    });
  
    skipForwardBtn.addEventListener('click', function () {
      video.currentTime += 10; // Skip 10 seconds forward
    });
  
    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function () {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      }
    });
  
    // Format time in MM:SS format
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    // Display total video duration
    video.addEventListener('loadedmetadata', function () {
      videoDurationDisplay.innerText = formatTime(video.duration);
    });
  
    // Touch controls
    progressArea.addEventListener('touchstart', function (e) {
      isDragging = true;
      updateProgressBar(e.touches[0]);
    });
  
    progressArea.addEventListener('touchmove', function (e) {
      if (isDragging) {
        updateProgressBar(e.touches[0]);
      }
    });
  
    progressArea.addEventListener('touchend', function () {
      isDragging = false;
    });
  
    function updateProgressBar(touch) {
      const rect = progressArea.getBoundingClientRect();
      const percentage = (touch.clientX - rect.left) / rect.width;
      video.currentTime = video.duration * percentage;
    }
  });
  