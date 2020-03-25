class MediaController < ApplicationController
    def index
        medias =  Media.all
        render json: medias
      end
end
