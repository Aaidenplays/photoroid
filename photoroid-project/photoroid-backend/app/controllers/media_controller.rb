class MediaController < ApplicationController
    def index
        medias =  Media.all
        render json: medias
    end
      def create
          media = Media.create!(likes: 0, title: params[:title], board_id: params[:board_id], media: params[:media])
          render json: media


      end
end
