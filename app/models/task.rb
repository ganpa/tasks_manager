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

class Task < ActiveRecord::Base
  attr_accessible :is_completed, :completed_on, :due_by, :staff, :topic, :employee_id, :location_id, :number,
                  :file_nums, :account_id

  serialize :file_nums, Array

  belongs_to :account
  belongs_to :employee
  belongs_to :location

  validates :account_id, :number, :staff, :topic, :employee_id, :location_id, :due_by, :presence => true
  validates_associated :employee

end
