module ApplicationHelper

  # @app_context = "Division"
  #PRODUCT = {:id => 0, :name => "product", :subdomain => ""}
  #ADMIN = {}
  def current_account
    res = request.host.split(".")
    puts "res: #{res.to_json}"
    return sub_domain_not_found("") if res.size > 4
    if res.size > 3
      subdomain = res[0]
      puts "subdomain: #{subdomain}"
      if subdomain.casecmp("admin")
      end
      @current_account = Account.find_by_subdomain(subdomain)
      if @current_account.nil?
        return sub_domain_not_found(subdomain)
      end
    else
      @current_account = nil
      return render :json => {"message" => "Something went wrong"}, status: :internal_server_error
    end
    puts "current_account: #{@current_account.to_json}"
    @base_query = {:account_id => @current_account.id}
    set_app_context(@current_account.location_context)
  end

  def sub_domain_not_found(subdomain)
    puts "subdomain not found"
    render :json => {"message" => "Domain '#{subdomain}' not found"}, status: :bad_request
  end

  def set_app_context(app_context)
    puts "app_context: #{app_context}"
    @app_context = app_context
  end

  def get_app_context
    @app_context
  end
end
