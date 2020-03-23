class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :description
      t.string :title
      t.string :image_id

      t.timestamps
    end
  end
end
