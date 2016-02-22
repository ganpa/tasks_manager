class Location < ActiveRecord::Base
  attr_accessible :name, :parent_id, :pin, :type

  has_many :sub_locations, :class_name => "Location", :foreign_key => "parent_id", :dependent => :destroy
  belongs_to :parent_location, :class_name => "Location"
  has_many :employees

  validates :name, :type, :parent_id, :presence => true, :on => :save
end