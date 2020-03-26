class MediaController < ApplicationController
    def index
        medias =  Media.all
        render json: medias, include: medias.each{|i|i.media.as_json}
    end
      def create
          media = Media.create!(comments: [],likes: 0, title: params[:title], board_id: params[:id], media: params[:file])





      end
end
