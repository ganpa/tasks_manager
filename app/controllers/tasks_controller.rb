require 'json'

class TasksController < ApplicationController

  before_filter :current_account
  before_filter :require_login
  
  def index
    #cookies[:test] = {value: "ganapathy's_browser", expires: 1.day.from_now.utc}
    #puts "\n\ncookies: #{cookies.to_json}"

    query_params = request.query_parameters
    if !query_params.empty?
      query = @base_query
      query.merge!(query_params)
      # puts "query: #{query}, query_parameters: #{query_params}"
      if query_params.has_key?("status")
        query["is_completed"] = query_params["status"].casecmp("CLOSED") == 0
        query.delete("status")
      end
      # query.merge!(@base_query)
      # query[:account_id] = @current_account
      tasks = Task.where(query)
    else
      tasks = Task.where(@base_query)
    end
    data = []
    tasks.each do |task|
      location = task.location
      data_entry = task
      data_entry[:location] = location
      data.push(data_entry)
    end
    render :json => {"tasks" => data}
  end

  def topics
    tasks = Task.where(@base_query).uniq.pluck(:topic)
    render :json => {"topics" => tasks }
  end

  def show
    query = @base_query
    # query[:account_id] = @current_account
    query[:id] = params[:id]
    task = Task.where(query)
  rescue ActiveRecord::RecordNotFound
    return render :json => {"message" => "Task with id: #{params[:id]} not found"}, status: :not_found
    location = task.location
    data = task
    data[:location] = location
    render :json => data, status: :ok
  end

  def create
    puts "attachments"
    puts params
    puts "\n\n\n"
    task = Task.new do |t|
      t.account = @current_account
      t.staff = params[:staff]
      t.topic = params[:topic]
      t.file_nums = params[:file_nums]
      t.due_by = params[:due_by]
      t.is_completed = 0
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
      puts "employee: #{employee}, valid: #{employee.valid?}"
      if !employee.save
        return render :json => {"messages" => employee.errors.messages}, status: :bad_request
      end
      t.employee = employee
    end
    # puts "\n\n\n" 
    # puts (task.due_by - Date.current).to_i
     puts "\n\n\ntask: #{task.to_json}, valid: #{task.valid?}, error: #{task.errors.messages.to_json}"

    if !task.save
      return render :json => {"messages" => task.errors.messages}, status: :bad_request
    end
    render :json => { "id" => task.id}, status: :ok
  end

  def update
    puts "\n\n\n" 
    puts "Hello"
    puts "\n\n"
    query = @base_query
    # query[:account_id] = @current_account
    query[:id] = params[:id]
    task = Task.where(query).limit(1)
    task.is_completed = params[:completed]
    
    task.save

    #@task.update_attributes({:completed => true})
    #redirect_to  :action => :index#tasks_path
    redirect_to action: "index", status: 303

  end
end
