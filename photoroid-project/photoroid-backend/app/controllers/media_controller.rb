class MediaController < ApplicationController
    def index
        medias =  Media.all
        render json: medias
    end
      def create
          media = Media.new(likes: 0, title: params[:title], board_id: params[:board_id])
          media.media.attach(io: File.open(params[:media]))
          media.save
          render json: media


      end
end
