class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :staff
      t.string :topic
      t.date :due_by
      t.date :completed_on
      t.boolean :is_completed
      t.integer :employee_id

      t.timestamps
      #add_index :tasks, :employee_id
    end
  end
end
