class Staff < ActiveRecord::Base
  attr_accessible :desk, :name, :account_id

  belongs_to :account

  validates :account_id, :desk, :name, :presence => true
end
