class Snippet < ActiveRecord::Base
  belongs_to :user

  serialize :tags

  validates :user_id, presence: true
  validates :name, presence: true
  validates :content, presence: true
  validates :tags, presence: true

  validate :tags_array_cannot_be_duplicated

  before_validation(on: :save) do
    if self.tags
      self.tags = self.tags.map { |tag| tag.titleize}
    end
  end

  def tags_array_cannot_be_duplicated
    if self.tags && self.tags.uniq!
      errors.add(:tags, "can't be duplicate")
    end
  end
end
