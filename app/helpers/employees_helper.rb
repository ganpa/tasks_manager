module EmployeesHelper
  
  POSITIONS = ["Chief Secretary", "Collector", "Sub Collector", "Tashildar", "Zonal Deputy Tashildar", 
                "Revenue Inspector", "VAO"];

  def EmployeesHelper.get_positions
    location_types = LocationsHelper.get_location_types
    position_map = LocationsHelper::POSITION_MAPPER
    positions = []
    location_types.each do |location_type|
      positions.push(position_map.key(location_type))
    end
    positions
  end

  def EmployeesHelper.get_position_by_location_type(location_type)
    position_map = LocationsHelper::POSITION_MAPPER
    position_map.key(location_type)
  end
  
end
