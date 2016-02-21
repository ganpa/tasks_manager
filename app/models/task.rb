class Task < ActiveRecord::Base
  attr_accessible :completed, :completed_by, :due_by, :number, :staff, :topic, :description, :assigned_to

  belongs_to :employee

end
