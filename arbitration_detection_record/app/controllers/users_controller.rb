class UsersController < ApplicationController
  def new
      @users=User.new
  end
  def create
      @users=User.new(users_params)
      if @users.save
          redirect_to login_path 
      else
        render :new, status: :unprocessable_entity
      end
  end
  private 

      def users_params
          params.require(:users).permit(:name,:email,:phone,:select,password)
      end
end
# def create
  #end
