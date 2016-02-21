class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :number
      t.string :staff
      t.string :topic
      t.date :due_by
      t.date :completed_by
      t.boolean :completed
      t.text :description
      t.integer :employee_id
      t.string :assigned_to

      t.timestamps
      #add_index :tasks, :employee_id
    end
  end
end
