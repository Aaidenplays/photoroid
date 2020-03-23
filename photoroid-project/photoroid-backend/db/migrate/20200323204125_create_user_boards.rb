class CreateUserBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :user_boards do |t|
      t.string :status
      t.integer :user
      t.integer :board


      t.timestamps
    end
  end
end
