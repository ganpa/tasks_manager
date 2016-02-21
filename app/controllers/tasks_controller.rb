class TasksController < ApplicationController
  
  def index
    @tasks = Task.all
    @tasks.sort_by! do |task|
    end
    render :json => @tasks
  end

  def show
    @task = Task.find(params[:id])
    render :json => @task
  end

  def create
    puts "attachments"
    puts params
    puts "\n\n\n"
    # task = Task.new do |t|
    #   t.staff = params[:staff]
    #   t.topic = params[:topic]
    #   t.description = params[:description]
    #   t.due_by = params[:due_by]
    #   t.assigned_to = params[:assigned_to]
    #   t.completed = false
    # end
    # puts "\n\n\n" 
    # puts (task.due_by - Date.current).to_i
    # puts "\n\n\n"
    # task.save
    render :json => {success: true}
  end

  def update
    puts "\n\n\n" 
    puts "Hello"
    puts "\n\n"
    @task = Task.find(params[:id])
    completed = params[:completed]
    #@task.update_attributes({:completed => true})
    #redirect_to  :action => :index#tasks_path
    redirect_to action: "index", status: 303

  end
end
