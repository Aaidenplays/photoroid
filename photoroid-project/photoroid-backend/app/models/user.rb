class User < ApplicationRecord
    has_many :friend_requests_as_requestor,
        foreign_key: :requestor_id,
        class_name: :FriendRequest

    has_many :friend_requests_as_receiver,
        foreign_key: :receiver_id,
        class_name: :FriendRequest
   
    has_many :user_boards 
    has_many :boards, through: :user_boards

end
