class Media < ApplicationRecord
    belongs_to :board
    has_many :comments
    # has_one_attached :media
end
