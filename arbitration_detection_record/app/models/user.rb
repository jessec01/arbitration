class User < ApplicationRecord
    has_secure_password
    
    validates :password, presence: true, length: { minimum: 8 }, on: :create
    validates :password, length: { minimum: 6 }, on: :update, allow_blank: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :name, presence: true  
end
