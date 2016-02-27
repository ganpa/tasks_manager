class UsersController < ApplicationController
  def create
    user = User.new do |u|
      u.name = params[:name]
      #u.email = params[:email]
      u.password = params[:password]
      u.password_confirmation = params[:password_confirmation]
    end
    user.save
    puts "user: #{user.to_json}"
    render :json => {}
  end

  def index
    puts "parameters: #{params}"
    puts "cookies: #{cookies.to_json}"
    puts "session : #{session}"
    user = User.find_by_remember_token(cookies[:remember_token])
    if !user.nil?
      render :json => {"name" => user.name}
    else
      render :json => {"error" => "user not found"}
    end
  end
end
