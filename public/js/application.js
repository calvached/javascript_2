$(document).ready(function() {

  $('#add_player_one').on('submit', function (event) {
    event.preventDefault();
    playerOne = $('input[name=username]').val();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.post(url, data, function(serverResponse, status, request) {
    })

    $(this).hide();

    $.get('/sign_in_player_two', function(serverResponse, status, request) {
      $('.container').append(serverResponse);

      $('#add_player_two').on('submit', function (event) {
        event.preventDefault();

        var url = $(this).attr('action');
        playerTwo = $(this.username).val();

        var data = $(this).serialize();

        $.post(url, data, function(serverResponse, status, request) {
          $('.container').html(serverResponse);
            initialTime = Date.now();
        })
      })
    })
  })


  $(document).on("keyup", function(event) {
    var currentPositionOne = $("#player1_strip").find(".active");
    var currentPositionTwo = $("#player2_strip").find(".active");
     var endTime = null;
      if (event.keyCode == 81) {
        $(currentPositionOne).removeClass("active");
        $(currentPositionOne).next().addClass("active");
          if ((currentPositionOne.next().length) === 0) {
            endTime = Date.now();
            var elapsedTime = (endTime - initialTime)/1000;
            var winner = playerOne;
            $('#winner_one').removeClass('display-none');
            $(currentPositionTwo).removeClass("active");

            var data = {winner: playerOne, elapsed_time: elapsedTime}
            $.post('/board', data, function(serverResponse, status, request) {
              gameId = serverResponse;
            })

            $('#play-again').html("<button id='play'>Play again?</button>");
              $('#play').on('click', function() {
                // initialTime = Date.now();
                $('#winner_one').addClass('display-none');
                $('#play').hide();
                $('#player1_strip td:first-child').addClass("active");
                $('#player2_strip td:first-child').addClass("active");
                $('#view-stats').hide();
              });

            $('#view-stats').html("<button id='view'>View game stats</button>");
              $('#view').on('click', function() {
                console.log(gameId);

                $.get('/view_stats/' + gameId, function(serverResponse, status, request){
                  console.log(serverResponse);
                  $('#view-stats').html(serverResponse);
                  $('#view').hide();
                });

              });
          }
        }
      else if (event.keyCode == 80) {
        $(currentPositionTwo).removeClass("active");
        $(currentPositionTwo).next().addClass("active");
          if ((currentPositionTwo.next().length) === 0) {
            endTime = Date.now();
            var elapsedTime = (endTime - initialTime)/1000;
            var winner = playerTwo;
            $('#winner_two').removeClass('display-none');
            $(currentPositionOne).removeClass("active");

            var data = {winner: playerTwo, elapsed_time: elapsedTime}
            $.post('/board', data, function(serverResponse, status, request) {
              // console.log(data);
            })

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
