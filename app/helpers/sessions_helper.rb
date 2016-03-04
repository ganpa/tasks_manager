module SessionsHelper


  def sign_in(user)
    cookies.permanent[:remember_token] = user.remember_token
    self.current_user = user
  end

  def signed_in?
    !current_user.nil?
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user
    puts "current_user"
    query = {}
    query[:remember_token] = cookies[:remember_token]
    query.merge!(@base_query)
    # @current_user ||= User.find_by_remember_token(cookies[:remember_token])
    @current_user ||= User.where(query).limit(1).first
    puts "\ncurrent_user: #{@current_user}"
    @current_user
  end

  def sign_out
    self.current_user = nil
    cookies.delete(:remember_token)
  end

  def require_login
    puts "require_login"
    puts "cookies #{cookies.to_json}"
    puts "remember_token : #{cookies[:remember_token]}"
    if !signed_in?
      return render :json => {"message" => "Please Login"}, status: :temporary_redirect
    else
    end
  end

end
