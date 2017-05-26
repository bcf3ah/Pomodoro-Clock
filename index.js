let workTime = 25*60;
let breakTime = 5*60;
let breakMode = false;

$("#setTimeRange").change((e)=>{
  workTime = e.target.valueAsNumber*60;
})

$("#setBreakTimeRange").change((e)=>{
  breakTime = e.target.valueAsNumber*60;
})

var workTimer = new Timer();
var breakTimer = new Timer();

$("#start").click(() => {
  if(!breakMode){
    workTimer.start({
      countdown: true,
      startValues: {
        seconds: workTime+1
      }
    });
  }
  if(breakMode){
    breakTimer.start({
      countdown: true,
      startValues: {
        seconds: breakTime+1
      }
    });
  }
});

//$('#workTimer').html(workTimer.getTimeValues().toString());

workTimer.addEventListener('secondsUpdated', function (e) {
    $('#workTimer').html(workTimer.getTimeValues().toString());
});

workTimer.addEventListener('targetAchieved', function (e) {
    playAlert('purr');
    $('#workTimer').html('Take a breather :)');
    breakMode = true;
    breakTimer.start({
      countdown: true,
      startValues: {
        seconds: breakTime+1
      }
    });
});

//$('#breakTimer').html(breakTimer.getTimeValues().toString());

breakTimer.addEventListener('secondsUpdated', function (e) {
    $('#breakTimer').html(breakTimer.getTimeValues().toString());
});

breakTimer.addEventListener('targetAchieved', function(e){
    playAlert('purr');
    $('#breakTimer').html('Back to work :)');
    breakMode = false;
    workTimer.start({
      countdown: true,
      startValues: {
        seconds: workTime+1
      }
    });
})


$('#pause').click(function () {
    if(!breakMode){
      workTimer.pause();
    }
    if(breakMode){
      breakTimer.pause();
    }
});
$('#reset').click(function () {
    workTimer.stop();
    breakTimer.stop();
    breakMode = false;
    $('#breakTimer').html("--:--:--");
    $('#workTimer').html("--:--:--");
});
