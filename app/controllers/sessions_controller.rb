class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_name(params[:name].downcase)
    if user && user.authenticate(params[:password])
      puts "user: #{user.to_json}"
      sign_in(user)
    else
    end
    render :json => {}
  end

  def destroy
    sign_out
    render :json => {}
  end
end
