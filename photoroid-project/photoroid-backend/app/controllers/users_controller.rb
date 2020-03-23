class UsersController < ApplicationController
  # def index
  #   trainers = Trainer.all

  #   render json: trainers
  # end
  
  def index
    users = User.all
    render json: users
  end
end
