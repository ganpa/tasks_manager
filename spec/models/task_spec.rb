# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  staff        :string(255)
#  topic        :string(255)
#  due_by       :date
#  completed_on :date
#  is_completed :boolean
#  employee_id  :integer
#  location_id  :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe Task, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
