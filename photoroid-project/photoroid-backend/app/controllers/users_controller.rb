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
    if user.valid?
      session[:user_id] = user.id
      user.save
      render json: user
    

    end
  end
  def log_user_in
    user = User.find_by(name: params[:name])


    if user
      session[:user_id] = user.id
      render json: user
       # redirect_to user
    else
      @error = "Wrong username or password"
       # redirect_to log_in_path
    end


  end

end
