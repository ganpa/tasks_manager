require 'roo'

class LocationsController < ApplicationController
  
  
  def index
    
    location_type = params[:location_type] if params.has_key?(:location_type)
    if request.query_parameters.has_key?("parent_type") && request.query_parameters.has_key?("parent_value")
      locations = filter_by_parent
    elsif params.has_key?(:location_type)
      locations = filter_by_location_type
    else
      location_type = "locations"
      locations = Location.all
    end

    render :json => { location_type => locations }
  end


  def filter_by_parent
    parent_name = request.query_parameters["parent_value"]
    parent_type = request.query_parameters["parent_type"]
    location = Location.where("name=? AND location_type=?", parent_name, parent_type)
    Location.where(parent_id: location)
  end

  def filter_by_location_type
    location_type = params[:location_type]
    locations = Location.where(location_type: location_type)
  end

  def types
    if request.query_parameters.has_key?("employee_type")
      value = get_location_type_by_employee_type(request.query_parameters["employee_type"]) 
      key = :location_type
    else
      value = LocationsHelper.get_location_types
      key = :location_types
    end
    render :json => { key => value }
  end

  # def get_location_types
  #   location_types = LocationsHelper::LOCATION_TYPES
  #   index = location_types.index(ApplicationHelper::APP_CONTEXT)
  #   location_types.slice(index+1, location_types.length-index-1)
  # end

  def get_location_type_by_employee_type(employee_type)
    LocationsHelper::POSITION_MAPPER[employee_type]
  end

  def create
    if params[:input_type] == "file"
      create_from_file
    else
      create_simple
    end

    render :json => {}
  end

  
  def create_simple
    location_types = LocationsHelper.get_location_types
    location_type_index = location_types.index(params[:location_type])
    types = location_types.slice(0, location_type_index + 1)

    puts "location_types : #{location_types}, location_type_index: #{location_type_index}"
    puts "types: #{types}"

    types.each do |type|
      puts "type: #{type} : #{params[type]}"
    end

    location = Location.new do |l|
      l.name = params[params[:location_type]]
      l.location_type = params[:location_type]
      if location_type_index > 0
        l.parent = Location.find_by_name(params[location_types[location_type_index-1]])
        puts "parent: #{l.parent.name}, child: #{l.parent.sub_locations}"
      else
        l.parent_id = -1
      end
    end

    puts "location: #{location.to_json} is_valid: #{location.valid?}"

    location.save

  end

  def create_from_file
    file = Roo::Spreadsheet.open(params[:file], {:extension => "xlsx"});

    #puts file.methods.sort!
    puts file.sheets
    puts file.headers
    puts file.first_column
    puts file.first_row

    puts "\n Row \n"
    file.each_row_streaming do |row|
      #puts "\n\n#{row.inspect}"
      row.each do |cell|
        #puts "row:#{cell.coordinate.row}, column:#{cell.coordinate.column}, value:#{cell.value}"
      end
    end

    render :json => {"message" => "uploaded file"}
  end


end
