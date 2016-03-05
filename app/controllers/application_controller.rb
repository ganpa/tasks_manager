class ApplicationController < ActionController::Base
  #protect_from_forgery
  include ApplicationHelper
  include SessionsHelper
  include LocationsHelper
  include EmployeesHelper

  def handle_unverified_request
    # puts "handle_unverified_request"
    sign_out
    super
  end

end
