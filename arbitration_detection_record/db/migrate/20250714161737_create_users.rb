class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email, limit:200, null: false, index: {unique: true}
      t.string :name, limit:16, null: false, index: {unique: true}
      t.timestamps
    end
  end
end
