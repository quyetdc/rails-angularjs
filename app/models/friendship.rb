class Friendship < ActiveRecord::Base
  STATUS_ACCEPTED = "accepted"
  STATUS_PENDING = "pending"
  STATUS_REQUESTED = "requested"

  belongs_to :user
  belongs_to :friend, class_name: 'User'

  validates :status, presence: true, inclusion: { in: %w(accepted requested pending),
                                                  message: "%{value} is not a valid status" }
end
