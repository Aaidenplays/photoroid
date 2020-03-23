Rails.application.routes.draw do
  resources :friends
  resources :friendships
  resources :friend_requests
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
