class FriendRequestsController < ApplicationController
    def index
        friend_requests =  FriendRequest.all
        render json: friend_requests
      end
end
