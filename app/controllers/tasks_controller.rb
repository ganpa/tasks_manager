require 'json'

class TasksController < ApplicationController
  
  def index
    query_params = request.query_parameters
    if !query_params.empty?
      query = query_params
      # puts "query: #{query}, query_parameters: #{query_params}"
      if query_params.has_key?("status")
        query["is_completed"] = query_params["status"].casecmp("CLOSED") == 0
        query.delete("status")
      end
      tasks = Task.where(query)
    else
      tasks = Task.all
    end
    render :json => {"tasks" => tasks}
  end

  def topics
    tasks = Task.uniq.pluck(:topic)
    render :json => {"topics" => tasks }
  end

  def show
    task = Task.find(params[:id])
    location = task.location
    data = {"task" => task, "location" => location}
    render :json => data
  end

  def create
    puts "attachments"
    puts params
    puts "\n\n\n"
    task = Task.new do |t|
      t.staff = params[:staff]
      t.topic = params[:topic]
      t.due_by = params[:due_by]
      location_id = params[:location][:id]
      t.location_id = location_id
      emp_value = Employee.find_by_location_id(params[:location][:id])
      if emp_value.nil?
        puts "creating new employee"
        emp_hash = params[:employee]
        emp_hash[:location_id] = location_id
        employee = Employee.new(emp_hash)
      else
        puts "updating employee: #{emp_value.to_json}"
        employee = emp_value
        employee.name = params[:employee][:name]
      end
      employee.save
      t.employee = employee
      t.is_completed = false
    end
    # puts "\n\n\n" 
    # puts (task.due_by - Date.current).to_i
    # puts "\n\n\ntask: #{task.to_json}, valid: #{task.valid?}"
    task.save
    render :json => {success: true}
  end

  def update
    puts "\n\n\n" 
    puts "Hello"
    puts "\n\n"
    task = Task.find(params[:id])
    task.is_completed = params[:completed]
    task.save

    #@task.update_attributes({:completed => true})
    #redirect_to  :action => :index#tasks_path
    redirect_to action: "index", status: 303

  end
end
