class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  before_save :ensure_authentication_token

  has_many :snippets

  mount_uploader :avatar, AvatarUploader

  validates :name, length: { maximum: 50 }
  validates :age, numericality: true, inclusion: 6..80, allow_nil: true
end
