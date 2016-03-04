class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :remember_token
      t.string :role
      t.string :home_page
      t.integer :account_id
      
      t.timestamps
    end
  end
end
