module Angular
  class DashboardController < ApplicationController
    def index
      ## todo: change @user here
      @user = current_user
      @snippets = @user.snippets
      _tags = []
      @snippets.each do |snippet|
        _tags = _tags | snippet.tags
      end

      @tags = _tags
    end
  end
end


