class AccountsController < ApplicationController

  def create
    account = Account.new do |a|
      a.name = params[:name]
      a.email = params[:email]
      a.plan = "Free"
      a.subdomain = params[:subdomain]
      a.location_context = params[:location_context]
      a.language = "English"
    end

    if !account.save
      return render :json => {"messages" => account.errors.messages}, status: :bad_request
    end
    render :json => {"message" => "Successfully created account with domain '#{subdomain}'"}
  end

  def index
    render :json => {"accounts" => Account.all}
  end

  def subdomain_taken?
    if !request.query_parameters.has_key?("subdomain")
      return render :json => {"message" => "Need subdomain name to check availability"}, status: :bad_request
    end

    subdomain = request.query_parameters["subdomain"]
    account = Account.where(:subdomain => subdomain).limit(1).first
    if !account.nil?
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