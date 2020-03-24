class FriendRequestsController < ApplicationController
    def index
        friend_requests =  FriendRequest.all
        render json: friend_requests
      end

      def create
        FriendRequest.create(requestor_id: params[:requestor_id], receiver_id: params[:receiver_id], status: params[:status])
      end

    #   def create
    #     trainer = Trainer.find(params["pokemon"]["trainer_id"])
        
    #     if trainer.pokemons.count >= 6 
    #       render json: { error: "Party is Full!"}, status: 403
    #     else 
    #       pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
    #       render json: pokemon, status: 200
    #     end
    #   end
    
end
