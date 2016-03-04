class SessionsController < ApplicationController

  before_filter :current_account
  
  def new
  end

  def is_signed_in
    if !signed_in?
      result = false
    else
      result = true
    end

    return render :json => {"sign_in" => result}, status: :ok
  end

  def get_current_user
    if signed_in?
      return render :json => {"user" => @current_user.name}
    else
      return render :json => {"message" => "Please signin"}, status: :bad_request
    end
  end

  def create
    if !params.has_key?("name") || !params.has_key?("password")
      return render :json => {}, status: :bad_request
    end
    
    query = @base_query
    query[:name] = params[:name].downcase
    puts "query :#{query}"
    user = User.where(query).limit(1).first

    if user.nil?
      return render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request
    end

    if user && user.authenticate(params[:password])
      puts "user: #{user.to_json}"
      sign_in(user)
    else
      return render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request
    end
    # render :json => {}
    render :json => {"account" => @current_account}, status: :ok
  end

  def destroy
    sign_out
    #render :json => {}
    render :json => {}, statsu: :ok
  end
end
