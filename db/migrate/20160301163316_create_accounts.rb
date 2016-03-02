class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.string :plan
      t.string :language
      t.string :location_context
      t.string :location_name
      t.integer :location_id
      t.string :subdomain

      t.timestamps
    end
  end
end
