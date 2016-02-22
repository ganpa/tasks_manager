class Task < ActiveRecord::Base
  attr_accessible :is_completed, :completed_on, :due_by, :staff, :topic, :employee_id

  alias_attribute :number, :id

  belongs_to :employee

  validates :staff, :topic, :employee_id, :due_by, :completed, :presence => true, :on => :save
  validates_associated :employee

end