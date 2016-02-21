class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :position
      t.string :name
      t.integer :total_score

      t.timestamps
    end
  end
end
