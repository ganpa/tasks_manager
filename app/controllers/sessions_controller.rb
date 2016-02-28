class SessionsController < ApplicationController
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

  def create
    if !params.has_key?("name") || !params.has_key?("password")
      return render :json => {}, status: :bad_request
    end
    
    user = User.find_by_name(params[:name].downcase)

    if user.nil?
      return render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request
    elsif user && user.authenticate(params[:password])
      puts "user: #{user.to_json}"
      sign_in(user)
    else
      return render :json => {"messages" => ["Invalid username/password"]}, status: :bad_request

    end
    # render :json => {}
    render :json => {}, status: :ok
  end

  def destroy
    sign_out
    #render :json => {}
    render :json => {}, statsu: :ok
  end
end
