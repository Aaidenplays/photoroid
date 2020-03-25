class Board < ApplicationRecord
    has_many :user_boards
    has_many :users, through: :user_boards
    # has_one_attached :media
end
