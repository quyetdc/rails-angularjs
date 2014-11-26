module Angular
  class DashboardController < ApplicationController
    def index
      ## todo: change @user here
      @user = current_user
    end
  end
end


