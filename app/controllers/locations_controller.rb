require 'roo'

class LocationsController < ApplicationController
  # include LocationsHelper
  # include EmployeesHelper

    
  before_filter :current_account, :only => [:create, :types]
  before_filter :require_login, :only => :create
  
  def index
    puts "cookies: #{cookies.to_json}"
    puts "request.host : #{request.host}"
    
    location_type = params[:location_type] if params.has_key?(:location_type)
    if params.has_key?(:location_type)
      begin
      locations = filter_by_location_type()
      rescue ActiveRecord::RecordNotFound
        return render :json => {"message" => "Location not found"}, status: :not_found
      end
    else
      location_type = "locations"
      locations = Location.all
    end
    render :json => { location_type => locations }
  end

  def show
    render :json => Location.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render :json => {"message" => "Locatoin with id: #{params[:id]} not found"}, status: :not_found
  end

  def sub_locations
    location_id = params[:id]
    begin
      location = Location.find(location_id)
      rescue ActiveRecord::RecordNotFound
        return render :json => {"message" => "Location with id: #{params[:id]}not found"}, status: :not_found
    end
    sub_locations = location.sub_locations
    if sub_locations.empty?
      location_types = get_location_types
      index = location_types.index(location.location_type)
      sub_location_type = location_types[index+1]
      render :json => { sub_location_type => []}
    else
      sub_location_type = sub_locations.first.location_type
      render :json => { sub_location_type => sub_locations }
    end
  end


  # def filter_by_parent
  #   parent_name = request.query_parameters["parent_value"]
  #   parent_type = request.query_parameters["parent_type"]
  #   location = Location.where("name=? AND location_type=?", parent_name, parent_type)
  #   puts "location : #{location.to_json}"
  #   Location.where(parent_id: location)
  #   #location.sub_locations
  # end

  def filter_by_location_type
    location_type = params[:location_type]
    locations = Location.where(location_type: location_type)
  end

  def types
    if request.query_parameters.has_key?("employee_type")
      value = get_location_type_by_employee_type(request.query_parameters["employee_type"]) 
      key = :location_type
    else
      value = get_location_types
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
    POSITION_MAPPER[employee_type]
  end

  def create
    if params[:input_type] == "file"
      create_from_file
    else
      create_simple
    end
  end

  

  
  def create_simple
    begin
      location = create_location(params)
    rescue ArgumentError => e
      return render :json => {"message" => e.message}, status: :bad_request
    end
    puts "location: #{location.to_json} is_valid: #{location.valid?}"
    
    if !location.save
      return render :json => {"messages" => location.errors.messages}, status: :bad_request
    end

    render :json => {}

  end

  def location_save_error(location)
    render :json => {"messages" => location.errors.messages}, status: :bad_request
  end

  def create_from_file
    if !@current_account.location_context.casecmp("Division") == 0
      return render :json => {"message" => "location context not valid"}, status: :bad_request
    end
    file = Roo::Spreadsheet.open(params[:file], {:extension => "xlsx"});

    types = get_location_types
    parent_ids = [@current_account.location_id]
    # parent_ids = ["100"]

    file.sheets.each do |sheet|
      location_hash = {:location_name => sheet, :location_type => types[0], :parent_id => parent_ids[0]}
      taluk = create_location(location_hash)
      puts "valid: #{taluk.valid?}, taluk: #{taluk.to_json}"

      if !taluk.save
        return location_save_error(taluk)
      end
      parent_ids[1] = taluk.id
      # parent_ids[1] = 0

      sh = file.sheet_for(sheet)
      # puts "\n Sheet : #{sheet}"

      sh.each_row do |entries|
        next if entries.empty?
        cell = entries.first
        row = cell.coordinate.row
        next if row < 4

        entries.each_with_index do |cell, index|
          # puts "index: #{index}"
          next if index < 1
          if !cell.value.nil?
            location_hash = {:location_name => cell.value, :location_type => types[index], :parent_id => parent_ids[index]}
            location = create_location(location_hash)
            puts "valid: #{location.valid?}, location: #{location.to_json}"

            if !location.save
              return location_save_error(location)
            end
            puts "location: #{location.to_json}, valid: location.valid?"

            parent_ids[index+1] = location.id
            # parent_ids[index+1] = index

            col = cell.coordinate.column
            type = types[index]

            #puts "index: #{index}, cell: #{cell.value}, type: #{type}, row: #{cell.coordinate.row}, col: #{cell.coordinate.column}"
            # puts "hash: #{location_hash.to_json}"

          end
          # puts "\n\n cell: #{cell.coordinate.row}, #{cell.coordinate.column} = #{cell.value}"
        end
      end

      puts "\n\n\n"

    end
    render :json => {"message" => "uploaded file"}
  end

  def create_location(location_hash)
    ltype = location_hash[:location_type]
    parent = Location.find(location_hash[:parent_id])

    if parent.nil?
      raise ArgumentError, "Parent with id : '#{location_hash[:parent_id]}' not found"
    end

    ptype = parent.location_type
    ptype_index = LOCATION_TYPES.index(ptype) 
    ltype_index = LOCATION_TYPES.index(ltype)

    if ltype_index - ptype_index != 1
      raise ArgumentError, "Location type cant be '#{ltype}' for parent_id '#{location_hash[:parent_id]}'"
    end

    location = Location.new do |l|
      l.name = location_hash[:location_name]
      l.location_type = location_hash[:location_type]
      l.parent_id = location_hash[:parent_id]
    end
    location
  end


end
