class BoardsController < ApplicationController
    def index
        boards =  Board.all
        render json: boards, include: [:users, :media]
      end

    def create
        board = Board.create(description: params[:description], title: params[:title], media: params[:media])
        render json: board
    end

    def show
        board = Board.find_by(id: params[:id])
        render json: board, include: [:users, :medias]
    end
end
