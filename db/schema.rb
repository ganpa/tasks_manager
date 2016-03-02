# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160301163316) do

  create_table "accounts", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "plan"
    t.string   "language"
    t.string   "location_context"
    t.string   "location_name"
    t.integer  "location_id"
    t.string   "subdomain"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "employees", :force => true do |t|
    t.string   "position"
    t.string   "name"
    t.integer  "total_score"
    t.integer  "location_id"
    t.integer  "account_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "locations", :force => true do |t|
    t.string   "name"
    t.string   "location_type"
    t.string   "pin"
    t.integer  "parent_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "staffs", :force => true do |t|
    t.string   "name"
    t.string   "desk"
    t.integer  "account_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tasks", :force => true do |t|
    t.string   "staff"
    t.string   "topic"
    t.text     "file_nums"
    t.date     "due_by"
    t.date     "completed_on"
    t.boolean  "is_completed"
    t.integer  "employee_id"
    t.integer  "location_id"
    t.integer  "account_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "remember_token"
    t.integer  "account_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
