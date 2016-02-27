# == Schema Information
#
# Table name: locations
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  location_type :string(255)
#  pin           :string(255)
#  parent_id     :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

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
