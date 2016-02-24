class EmployeesController < ApplicationController

  def index
  end

  def show
  end

  def positions 
    render :json => {"positions" => EmployeesHelper.get_positions}
  end

  def create
    emp = Employee.new do |e|
      e.name = params[:name]
      e.position = params[:position]
      e.location = Location.find_by_name(params[:location])
    end
    puts "employee #{emp.to_json}"
    puts "employee valid: #{emp.valid?}"
    emp.save
    render :json => {}
  end

  def destroy
  end

end
