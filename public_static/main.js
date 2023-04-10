/**
 * Created by ParikanshAndAtikant on 16/07/2017.
 */
// var roomname = prompt("Enter Room Name ");
var roomname = "";
$(function () {

    var socket = io();
    var audio = document.getElementById('myaudio');
    $('#joinroom').click(function () {
        roomname = $('#roomid').val()
        socket.emit('subscribe',roomname);
        $('#joinedroom').html(`Joined room - ${roomname}`)
        console.log(roomname)
    })
    $('#load').click(function () {
       audio.load();
       $('#load').html('Song Loading...');
    });
    function loaded() {
        $('#load').html('Song Loaded.');
    }
    audio.addEventListener('canplay',loaded,false);

    $('#song0').click(function () {
       $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
       $('#load').click();
       $('#pause').click();
       socket.emit('song0',roomname);
    });
    $('#song1').click(function () {
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song1',roomname);
    });
    $('#song2').click(function () {
        $('#myaudio').html('<source src="Perfect.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song2',roomname);
    });
    $('#song3').click(function () {
        $('#myaudio').html('<source src="Good_Life_Fate_of_the_Furious.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song3',roomname);
    });
    $('#song4').click(function () {
        $('#myaudio').html('<source src="Halsey Without Me.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song4',roomname);
    });
    $('#song5').click(function () {
        $('#myaudio').html('<source src="Shape Of You.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song5',roomname);
    });
    $('#play').click(function () {
        console.log("play");
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
        socket.emit("play", {times: audio.currentTime, room : roomname});
    });
    $('#pause').click(function () {
        console.log("pause");
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
        socket.emit("pause", {times: audio.currentTime, room : roomname});
    });
    socket.on("first", function (data) {
        audio.ontimeupdate = function () {
            socket.emit("where", {times: audio.currentTime, room : roomname});
        };
        /*$('#play').click(function () {
            console.log("play");
            $('#play').removeClass('show');
            $('#play').addClass('hide');
            $('#pause').removeClass('hide');
            $('#pause').addClass('show');
            socket.emit("play", audio.currentTime);
        });
        $('#pause').click(function () {
            console.log("pause");
            $('#pause').removeClass('show');
            $('#pause').addClass('hide');
            $('#play').removeClass('hide');
            $('#play').addClass('show');
            socket.emit("pause", audio.currentTime);
        });*/
    });
    socket.on('song0',function (data) {
       console.log(data);
        $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song1',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song2',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="Perfect.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song3',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="Good_Life_Fate_of_the_Furious.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song4',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="Halsey Without Me.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song5',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="Shape Of You.mp3" class="audio-source">');
        $('#load').click();
    });

    socket.on("current", function (data) {
        var diff = audio.currentTime - data;
        if (diff < 0 || diff > 2) {
            audio.currentTime = data;
        }
    });
    socket.on("playsong", function (data) {
        audio.currentTime = data;
        audio.play();
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
    });
    socket.on("pausesong", function (data) {
        audio.currentTime = data;
        audio.pause();
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
    });
});