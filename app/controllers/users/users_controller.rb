class Users::UsersController < ApplicationController
  before_filter :authenticate_user!

  respond_to :json

  def index
    @accepted_friends = Friendship.where(user_id: current_user.id, status: Friendship::STATUS_ACCEPTED).to_a.map { |f| f.friend }
    @requested_friends = Friendship.where(user_id: current_user.id, status: Friendship::STATUS_REQUESTED).to_a.map { |f| f.friend }
    @pending_friends = Friendship.where(user_id: current_user.id, status: Friendship::STATUS_PENDING).to_a.map { |f| f.friend }

    @friend_ids = Friendship.select("friend_id").where(user_id: current_user.id).to_a

    @no_relationship_users = @friend_ids.length > 0 ? User.where('id not in (?)', @friend_ids).all.to_a : User.all.to_a

    respond_to do |format|
      format.html
      format.json { render :json => { no_relationship_users: @no_relationship_users,
                                      pending_friends: @pending_friends,
                                      requested_friends: @requested_friends,
                                      accepted_friends: @accepted_friends,
                                      status: :ok }
      }
    end
  end

  protected
end
