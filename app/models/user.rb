class User < ActiveRecord::Base
  attr_accessible :email, :name, :password_digest, :remember_token, 
                  :password, :password_confirmation, :account_id

  validates :password, presence: true, length: {minimum: 6}
  validates :account_id, :password_confirmation, presence: true
  validates :name, :uniqueness => { :scope => :account_id}

  has_secure_password

  validates_confirmation_of :password

  before_save :create_remember_token

  belongs_to :account, :foreign_key => :account_id

  #VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  # validates :email, presence:   true,
  #                   format:     { with: VALID_EMAIL_REGEX },
  #                   uniqueness: { case_sensitive: false }

  private

  def create_remember_token
    self.remember_token = SecureRandom.urlsafe_base64
  end

end
