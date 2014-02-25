$(document).ready(function() {

  $('#add_player_one').on('submit', function (event) {
    event.preventDefault();
    playerOne = $('input[name=username]').val();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $(this).hide();

    $.post(url, data, function(serverResponse, status, request) {
    })

    $.get('/sign_in_player_two', function(serverResponse, status, request) {
      console.log(serverResponse);
      $('.container').append(serverResponse);

      $('#add_player_two').on('submit', function (e) {
        e.preventDefault();
        console.log(this);
        console.log(serverResponse);

        var url = $(this).attr('action');
        playerTwo = $('input[name=username]').val();
        var data = $(this).serialize();
        console.log(data);
        console.log(url);

        $.post(url, data, function(serverResponse, status, request) {
          $('.container').html(serverResponse);
        })

      })
    })

  })

  var initialTime = Date.now();

  $(document).on("keyup", function(event) {
    var currentPositionOne = $("#player1_strip").find(".active");
    var currentPositionTwo = $("#player2_strip").find(".active");
     var endTime = null;
      if (event.keyCode == 81) {
        $(currentPositionOne).removeClass("active");
        $(currentPositionOne).next().addClass("active");
          if ((currentPositionOne.next().length) === 0) {
            endTime = Date.now();
            console.log(initialTime - endTime);
            $('#winner_one').removeClass('display-none');
            $(currentPositionTwo).removeClass("active");
            var winner = playerOne;
            $('#play-again').html("<button id='play'>Play again?</button>");
              $('#play').on('click', function() {
                $('#winner_one').addClass('display-none');
                $('#play').hide();
                $('#player1_strip td:first-child').addClass("active");
                $('#player2_strip td:first-child').addClass("active");
              });
          }
        }
      else if (event.keyCode == 80) {
        $(currentPositionTwo).removeClass("active");
        $(currentPositionTwo).next().addClass("active");
          if ((currentPositionTwo.next().length) === 0) {
            endTime = Date.now();
            console.log((endTime - initialTime)/1000);
            $('#winner_two').removeClass('display-none');
            $(currentPositionOne).removeClass("active");
            var winner = playerTwo;
            $('#play-again').html("<button id='play'>Play again?</button>");
              $('#play').on('click', function() {
                $('#winner_two').addClass('display-none');
                $('#play').hide();
                $('#player1_strip td:first-child').addClass("active");
                $('#player2_strip td:first-child').addClass("active");
              });
          }
      }
  });
});
