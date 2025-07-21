class UsersController < ApplicationController
  def index
      @users = User.all
  end
end
# def create
  #end
