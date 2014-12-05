class Snippet < ActiveRecord::Base
  belongs_to :user
  acts_as_taggable # Alias for acts_as_taggable_on :tags

  def validate_company_id
    Company.find(company) ? return : errors.add(:company,"Invalid Company ID")
  end

  validates :user_id, presence: true
  validates :name, presence: true
  validates :content, presence: true
end
