class Media < ApplicationRecord
    belongs_to :board
    has_many :comments
end
