class UserBoardsController < ApplicationController
    def index
        userboards =  UserBoard.all
        render json: userboards
      end

    def create
        user_board = UserBoard.create(status: params[:status], user_id: params[:user_id], board_id: params[:board_id])
        render json: user_board
    end
end
