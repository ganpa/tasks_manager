class EmployeesController < ApplicationController

  def index
    # if request.query_parameters.has_key?("location_name") && request.query_parameters["location_type"]
    #   key = "employee"
    #   value = filter_by_location_name_and_type(request.query_parameters["location_name"],
    #                                             request.query_parameters["location_type"])
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
  end

  def filter_by_location_name_and_type(location_name, location_type)
    location = Location.where("location_name = ? AND location_type = ?", location_name, location_type)
    Employee.where(location_id: location)
  end

  def positions
    if request.query_parameters.has_key?("location_type")
      key = "position"
      value = EmployeesHelper.get_position_by_location_type(request.query_parameters["location_type"])
    else
      key = "positions"
      value = EmployeesHelper.get_positions
    end
    render :json => { key => value}
  end

  def create
    emp = Employee.new do |e|
      e.name = params[:name]
      e.position = params[:position]
      #e.location = Location.find(params[:location_id])
      e.location_id = params[:location_id]
    end
    puts "employee #{emp.to_json}"
    puts "employee valid: #{emp.valid?}"
    emp.save
    render :json => {}
  end

  def destroy
  end

end
