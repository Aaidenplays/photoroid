class UsersController < ApplicationController
  def index
    users =  User.all
    render json: users, except: [:created_at, :updated_at]
  end
  def show
    user = User.find(params[:id])

    render json: user
  end
  def create
    user = User.new(name: params[:name], bio: params[:bio])
    if params[:name] == ''
      return 'Must contain letters'
    else
      user.save
    end
  end

end
