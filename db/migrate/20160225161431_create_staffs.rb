class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.string :name
      t.string :desk
      t.integer :account_id
      t.timestamps
    end
  end
end
