class Employee < ActiveRecord::Base
  attr_accessible :name, :position, :total_score, :location_id

  has_many :tasks
  belongs_to :location

  validates :name, :position, :location_id, :presence => true, :on => :save
end