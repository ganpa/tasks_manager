class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.string :location_type
      t.string :pin
      t.integer :parent_id
      t.integer :account_id

      t.timestamps
    end
  end
end
