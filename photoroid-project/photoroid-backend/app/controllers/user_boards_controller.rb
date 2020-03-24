class UserBoardsController < ApplicationController
    def index
        userboards =  UserBoard.all
        render json: userboards
      end
end
