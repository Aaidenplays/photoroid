class FriendRequestsController < ApplicationController
    def index
        friend_requests =  FriendRequest.all
        render json: friend_requests, include: [:receiver, :requestor]
      end

      def create
        FriendRequest.create(requestor_id: params[:requestor_id], receiver_id: params[:receiver_id], status: params[:status])
      end

      def show
        friend_requests = FriendRequest.find_by(id: params[:id])
        render json: friend_requests, include: [:receiver, :requestor]
      end

      def destroy
        friend_request = FriendRequest.find_by(id: params[:id])
        puts("you made it to backend!")
        friend_request.destroy
        render json: friend_request
      end

      def update
        friend_request = FriendRequest.find_by(id: params[:id])
        friend_request.update(status: params[:status])
        render json: friend_request
      end

end
