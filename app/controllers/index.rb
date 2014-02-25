get '/' do
  # Look in app/views/index.erb
  erb :index
end


post '/' do
  player = Player.find_or_create_by(username: params[:username])
  if player
    session[:player_one] = player.id
    redirect to ('/sign_in_player_two')
  end
end
