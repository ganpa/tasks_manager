class User < ActiveRecord::Base
  attr_accessible :email, :name, :password_digest, :remember_token, :password, :password_confirmation

  validates :password, presence: true, length: {minimum: 6}
  validates :password_confirmation, presence: true

  has_secure_password

  validates_confirmation_of :password

  before_save :create_remember_token

  #VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  # validates :email, presence:   true,
  #                   format:     { with: VALID_EMAIL_REGEX },
  #                   uniqueness: { case_sensitive: false }

  private

  def create_remember_token
    self.remember_token = SecureRandom.urlsafe_base64
  end

end