class Location < ActiveRecord::Base
  attr_accessible :name, :parent_id, :pin, :location_type

  has_many :sub_locations, :class_name => "Location", :foreign_key => "parent_id", :dependent => :destroy
  belongs_to :parent, :class_name => "Location"
  has_many :employees

  validates :name, :location_type, :parent_id, :presence => true
  validates :name, :uniqueness => {:scope => [:location_type, :parent_id] }
end