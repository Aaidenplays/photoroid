Rails.application.routes.draw do
  resources :comments
  resources :media
  resources :user_boards
  resources :boards
  resources :friend_requests
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/users/log_user_in', to: 'users#log_user_in'
end
