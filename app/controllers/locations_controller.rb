require 'roo'

class LocationsController < ApplicationController
  
  def index
    @locations = Location.find_by_type(params[:location_type])
    render :json => { params[:location_type] => @locations }
  end

  def types
    @location_types = ["State", "District", "Division", "Taluk", "Zone", "Firkha", "Village"]
    render :json => { :location_types => @location_types }
  end

  def create
    if params[:input_type] == "file"
      create_from_file
    else
      create_simple
    end
  end

  def create_simple
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
