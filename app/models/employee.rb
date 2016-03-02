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

class Employee < ActiveRecord::Base
  attr_accessible :name, :position, :total_score, :location_id, :account_id

  has_many :tasks
  belongs_to :location
  belongs_to :account

  validates :account_id, :name, :position, :location_id, :presence => true
end
