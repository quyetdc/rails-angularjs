module Angular
  class DashboardController < ApplicationController
    def index
      @user = params[:user_id] ? User.where(id: params[:user_id]).first : current_user
      @snippets = @user.snippets
    end
  end
end


