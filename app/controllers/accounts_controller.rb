class AccountsController < ApplicationController

  def create
    account_hash = params[:account]
    # location = Location.new(:location_type => account_hash["location_type"], 
    #                           :location_name => account_hash["location_name"],
    #                           :parent_id => -1)
    location = Location.new do |l|
      l.name = account_hash[:location_name]
      l.location_type = account_hash[:location_type]
      l.parent_id = -1
    end
    puts "location: #{location.inspect}, valid: #{location.valid?}"

    if !location.save
      return render :json => {"model" => "location","messages" => location.errors.messages}, status: :bad_request
    end


    account = Account.new do |a|
      a.name = account_hash[:name]
      a.email = account_hash[:email]
      a.plan = "Free"
      a.subdomain = account_hash[:subdomain]
      a.location_context = account_hash[:location_type]
      a.location_name = account_hash[:location_name]
      a.location_id = location.id
      a.language = "English"
    end

    if !account.save
      return render :json => {"model" => "user", "messages" => account.errors.messages}, status: :bad_request
    end

    user = User.new do |u|
      u.account_id = account.id
      u.name = params[:user][:name]
      u.password = params[:user][:password]
      u.password_confirmation = params[:user][:password_confirmation]
    end

    puts "user: #{user.to_json}, valid?: #{user.valid?}"

    if !user.save
      return render :json => {"model" => "user", "messages" => user.errors.messages}, status: :bad_request
    end

    render :json => {"message" => "Successfully created account_hash with domain '#{account_hash[:subdomain]}'"}
  end

  def account_exists
    current_account
    if !@current_account.nil?
      return render :json => {"account_exists" => true}, status: :ok
    end
  end

  def index
    if params.has_key?("subdomain")
      account = Account.find_by_subdomain(params[:subdomain])
      if !account.nil?
        return render :json => {"account" => account}
      else
        return render :json => {"message" => "account not found"}, status: :bad_request
      end
    end
    render :json => {"accounts" => Account.all}
  end

  def location_types
    render :json => {"location_types" => LOCATION_TYPES }
  end

  def subdomain_taken?
    if !request.query_parameters.has_key?("subdomain")
      return render :json => {"message" => "Need subdomain name to check availability"}, status: :bad_request
    end

    subdomain = request.query_parameters["subdomain"]
    account_hash = Account.where(:subdomain => subdomain).limit(1).first
    if !account_hash.nil?
      return render :json => {"message" => "Subdomain '#{params[:subdomain]}' already taken"}, status: :bad_request
    end
    render :json => {"subdomain_taken" => false}
  end

  def show
    render status: :not_found
  end

  def update
    render status: :not_found
  end

end