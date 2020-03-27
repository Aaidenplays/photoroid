class CreateMedia < ActiveRecord::Migration[6.0]
  def change
    create_table :media do |t|
      t.string :title
      t.integer :likes
      t.string :image
      t.integer :board_id

      t.timestamps
    end
  end
end
