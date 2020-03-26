class MediaController < ApplicationController
    def index
        medias =  Media.all
        render json: medias
    end
      def create
          media = Media.new(comments: [],likes: 0, title: params[:title], board_id: params[:board_id], media: params[:media])
          puts
          media.save
          render json: media


      end
end
