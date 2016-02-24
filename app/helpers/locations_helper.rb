module LocationsHelper
  LOCATION_TYPES = ["State", "District", "Division", "Taluk", "Zone", "Firkha", "Village"]

  POSITION_MAPPER = {
    "Chief Secretary" => "State",
    "Collector" => "District",
    "Sub Collector" => "Division",
    "Tashildar" => "Taluk",
    "Zonal Deputy Tashildar" => "Zone",
    "Revenue Inspector" => "Firkha",
    "VAO" => "Village"
  }

  def LocationsHelper.get_location_types
    location_types = LOCATION_TYPES
    index = location_types.index(ApplicationHelper.get_app_context)
    location_types.slice(index+1, location_types.length-index-1)
  end

end