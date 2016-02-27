# == Schema Information
#
# Table name: employees
#
#  id          :integer          not null, primary key
#  position    :string(255)
#  name        :string(255)
#  total_score :integer
#  location_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Employee, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
