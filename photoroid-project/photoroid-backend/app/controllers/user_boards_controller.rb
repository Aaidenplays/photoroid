class UserBoardsController < ApplicationController
    def index
        user_boards =  UserBoard.all
        render json: user_boards
      end

    def destroy
        user_board = UserBoard.find_by(id: params[:id])
        user_board.destroy
        render json: user_board
    end

    def update
        user_board = UserBoard.find_by(id: params[:id])
        user_board.update(status: params[:status])
        render json: user_board
    end

    def show
        user_board = UserBoard.find_by(id: params[:id])
        render json: user_board
    end
    def create
        user_board = UserBoard.create(status: params[:status], user_id: params[:user_id], board_id: params[:board_id])
        render json: user_board
    end
end

# def destroy
#     friend_request = FriendRequest.find_by(id: params[:id])
#     puts("you made it to backend!")
#     friend_request.destroy
#     render json: friend_request
#   end

#   def update
#     friend_request = FriendRequest.find_by(id: params[:id])
#     friend_request.update(status: params[:status])
#     render json: friend_request
#   end