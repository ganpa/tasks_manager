class Employee < ActiveRecord::Base
  attr_accessible :name, :position, :total_score

  has_many :tasks
end