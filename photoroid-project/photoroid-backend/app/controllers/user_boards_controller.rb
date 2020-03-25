class UserBoardsController < ApplicationController
    def index
        user_boards =  UserBoard.all
        render json: user_boards
      end

    def create
        user_board = UserBoard.create(status: params[:status], user_id: params[:user_id], board_id: params[:board_id])
        render json: user_board
    end
end
