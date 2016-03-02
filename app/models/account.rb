class Account < ActiveRecord::Base
  attr_accessible :email, :language, :location_context, :location_name, :location_id
                  :name, :plan, :subdomain,

  has_many :employees 
  has_many :users
  has_many :staffs
  has_many :tasks

  validates :name, :email, :subdomain, :location_context, :location_name, :presence => true
  validates :subdomain, :uniqueness => true
end
