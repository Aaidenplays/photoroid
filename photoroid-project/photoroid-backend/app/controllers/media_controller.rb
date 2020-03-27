class MediaController < ApplicationController
    def index
        medias =  Media.all

        render json: medias
        # @image = medias[-1]
    end
      def create
          media = Media.new(likes: 0, title: params[:title], board_id: params[:board_id].to_i, image: params[:image])
          media.save
          render json: media

      end
end
