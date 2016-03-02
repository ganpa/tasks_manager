module LocationsHelper
  LOCATION_TYPES = ["State", "District", "Division", "Taluk", "Zone", "Firkha", "Village"]

  def get_location_types
    location_types = LOCATION_TYPES
    index = location_types.index(get_app_context)
    location_types.slice(index+1, location_types.length-index-1)
  end

end