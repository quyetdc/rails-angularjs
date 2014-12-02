class Snippet < ActiveRecord::Base
  belongs_to :user

  serialize :tags

  # before_save :validate_duplication_on_tags

  def validate_company_id
    Company.find(company) ? return : errors.add(:company,"Invalid Company ID")
  end

  validates :user_id, presence: true
  validates :name, presence: true
  validates :content, presence: true
  validates :tags, presence: true

  # def validate_duplication_on_tags
  #   if self.tags
  #     self.tags = self.tags.map { |tag| tag.titleize}
  #
  #     if self.tags.uniq!
  #       return 'Tags cannot be duplicated'
  #     end
  #   end
  # end
end
