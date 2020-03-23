class User < ApplicationRecord
    has_many :friend_requests_as_requestor,
        foreign_key: :requestor_id,
        class_name: :FriendRequest

    has_many :friend_requests_as_receiver,
        foreign_key: :receiver_id,
        class_name: :FriendRequest
   
    has_many :friendships, -> (user){
    where("friend_a_id = ? OR friend_b_id = ?", 
    user.id, user.id) 
    }

    has_many :friends, through: :friendships
end
