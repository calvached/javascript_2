get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/board' do
  # game = Game.find_or_create_by
  # racer = Racer.find_or_create_by

  erb :board
end

post '/' do
  p params[:username]
  player = Player.find_or_create_by(username: params[:username])
  if player
    session[:player_one] = player.id
    redirect to ('/sign_in_player_two')
  end
end

get '/sign_in_player_two' do
  p params
  if request.xhr?
    erb :_player_entry_form_two, layout: false
  else
    erb :sign_in_player_two
  end
end

post '/sign_in_player_two' do
  p params
  player = Player.find_or_create_by(username: params[:username])
  if player
    session[:player_two] = player.id
    if session[:player_two] == session[:player_one]
      session.clear
      redirect to ('/')
    else
      @player_one = Player.find(session[:player_one])
      @player_two = Player.find(session[:player_two])
    end
  end

  if request.xhr?
    erb :board, layout: false
  else
    redirect to ('/board')
  end

end
