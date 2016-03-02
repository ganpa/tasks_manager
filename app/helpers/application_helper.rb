module ApplicationHelper

  # @app_context = "Division"
  PRODUCT = {:id => 0, :name => "product", :subdomain => ""}
  ADMIN = {}
  def current_account
    res = request.host.split(".")
    puts "res: #{res.to_json}"
    if res.size == 2
      subdomain = res[0]
      puts "subdomain: #{subdomain}"
      if subdomain.casecmp("admin")
      end
      @current_account = Account.find_by_subdomain(subdomain)
      if @current_account.nil?
        return render :json => {"message" => "Domain '#{subdomain}' not found"}, status: :temporary_redirect
      end
    else
      @current_account = PRODUCT
    end
    puts "current_account: #{@current_account.to_json}"
    @base_query = {:account_id => @current_account.id}
    set_app_context(@current_account.location_context)
  end

  def set_app_context(app_context)
    @app_context = app_context
  end

  def get_app_context
    @app_context
  end
end
