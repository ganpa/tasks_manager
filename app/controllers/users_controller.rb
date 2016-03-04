class UsersController < ApplicationController

  before_filter :current_account
  # before_filter :require_login

  def create
    if !params.has_key?("name") || !params[:password] || !params[:password_confirmation]
      render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request
    end

    user = User.new do |u|
      u.account = @current_account
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
    # redirect_to controller: :session, action: :create
    #redirect_to signin_url, status: 303

  end

  def current_user
    puts "parameters: #{params}"
    puts "cookies: #{cookies.to_json}"
    puts "session : #{session}"
    query = {}
    query[:remember_token] = cookies[:remember_token]
    query.merge!(@base_query)
    user = User.where(query).limit(1).first
    if !user.nil?
      return render :json => {"name" => user.name}
    else
      return render :json => {"messages" => ["user not found"]}
    end
  end

  def index
    puts "parameters: #{params}"
    puts "cookies: #{cookies.to_json}"
    puts "session : #{session}"
    query = @base_query
    users = User.where(query).pluck(:name)
    return render :json => {"users" => users}
  end
end
