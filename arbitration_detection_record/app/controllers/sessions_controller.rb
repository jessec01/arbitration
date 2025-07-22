class SessionsController < ApplicationController
    def new
        
    end
    def create
        @credential=sessions_params
        authenticated_user = User.find_by(email: credential['email']).try(:authenticate, credential['password'])
        
        if authenticated_user
            #para testeo 
            session[:user_id]=authenticated_user.id
            puts 'Authentication successful!'
            #feature para proxima actualizacion
            #se debe diseñar todo el frontend del sistema de bienvenida
        else
            #para testeo 
            puts 'Invalid credentials!'
        end
    end
    def destroy
        session[:user_id]=nil
    end
    private 
        def sessions_params
            params.permit(':email',':password')
        end
end 
