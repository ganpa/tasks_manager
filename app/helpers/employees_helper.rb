module EmployeesHelper
  
  POSITIONS = ["Chief Secretary", "Collector", "Sub Collector", "Tashildar", "Zonal Deputy Tashildar", 
                "Revenue Inspector", "VAO"];

  POSITION_MAPPER = {
    "Chief Secretary" => "State",
    "Collector" => "District",
    "Sub Collector" => "Division",
    "Tashildar" => "Taluk",
    "Zonal Deputy Tashildar" => "Zone",
    "Revenue Inspector" => "Firkha",
    "VAO" => "Village"
  }

  def get_positions
    location_types = get_location_types
    position_map = POSITION_MAPPER
    positions = []
    location_types.each do |location_type|
      positions.push(position_map.key(location_type))
    end
    positions
  end

  def get_position_by_location_type(location_type)
    position_map = POSITION_MAPPER
    position_map.key(location_type)
  end
  
end
