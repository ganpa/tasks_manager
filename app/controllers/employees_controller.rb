class EmployeesController < ApplicationController
  # include LocationsHelper
  # include EmployeesHelper

  before_filter :current_account
  before_filter :require_login

  def index
    if request.query_parameters.has_key?("location_id")
      key = "employee"
      value = Employee.find_by_location_id(request.query_parameters["location_id"])
    else
      key = "employees"
      value = Employee.all
    end
    render :json => {key => value}
  end

  def show
    begin
      emp = Employee.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render :json => {"message" => "Employee with id #{params[:id]} not found"}, status: :not_found 
    end

    render :json => {"employee" => emp}
  end

  def positions
    if request.query_parameters.has_key?("location_type")
      key = "position"
      value = get_position_by_location_type(request.query_parameters["location_type"])
    else
      key = "positions"
      value = get_positions
    end
    render :json => { key => value}
  end

  def create
    employee = Employee.find_by_location_id(params[:location_id])
    if !employee.nil?
      employee.name = params[:name].capitalize
      if !employee.save
        return render :json => {"messages" => employee.errors.messages}, status: :bad_request
      end
      return render :json => {}
    end
    
    emp = Employee.new do |e|
      e.name = params[:name].capitalize
      e.position = params[:position]
      e.account_id = @current_account.id
      #e.location = Location.find(params[:location_id])
      e.location_id = params[:location_id]
    end
    # puts "employee #{emp.to_json}"
    # puts "employee valid: #{emp.valid?}"
    if !emp.save
      return render :json => {"messages" => emp.errors.messages}, status: :bad_request
    end
    render :json => {}
  end

  def destroy
  end

end
