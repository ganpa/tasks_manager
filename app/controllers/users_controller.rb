class UsersController < ApplicationController
  def create
    if !params.has_key?("name") || !params[:password] || !params[:password_confirmation]
      render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request
    end

    user = User.new do |u|
      u.name = params[:name]
      #u.email = params[:email]
      u.password = params[:password]
      u.password_confirmation = params[:password_confirmation]
    end
    if !user.save
      return render :json => {"messages" => user.errors.messages}, status: :bad_request
    end
    puts "user: #{user.to_json}"
    render :json => {}
  end

  def index
    puts "parameters: #{params}"
    puts "cookies: #{cookies.to_json}"
    puts "session : #{session}"
    user = User.find_by_remember_token(cookies[:remember_token])
    if !user.nil?
      return render :json => {"name" => user.name}
    else
      return render :json => {"messages" => ["user not found"]}
    end
  end
end
