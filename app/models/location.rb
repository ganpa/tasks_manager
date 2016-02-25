class Location < ActiveRecord::Base
  attr_accessible :name, :parent_id, :pin, :location_type, :sub_locations

  #attr_accessor :sub_locations

  has_many :sub_locations, :class_name => "Location", :foreign_key => "parent_id", :dependent => :destroy
  belongs_to :parent, :class_name => "Location"
  
  has_many :tasks
  has_one :employee

  validates :name, :location_type,:presence => true #:parent_id, :presence => true
  validates :name, :uniqueness => {:scope => [:location_type, :parent_id] }
end