class UserBoardsController < ApplicationController
    def index
        user_boards =UserBoard.all
        render json: user_boards
      end
end
