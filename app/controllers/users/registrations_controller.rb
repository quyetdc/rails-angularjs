class Users::RegistrationsController < Devise::RegistrationsController
  # POST /resource
  def create
    user = User.new(user_params)
    if user.save
      sign_in user

      respond_to do |format|
        format.html {redirect_to root_path}
        format.json {render :json => {:user => user}, status: :created}
      end
    else
      respond_to do |format|
        format.html {redirect_to root_path}
        format.json {render :json => {:message => user.errors.messages}, status: :bad_request}
      end
    end
  end

  # PUT /resource
  def update
    if current_user && (current_user.authentication_token == params[:user][:authentication_token])
      if current_user.update(update_user_params)
        respond_to do |format|
          format.json { render :json => {user: current_user}, status: :ok}
        end
      else
        respond_to do |format|
          format.html {redirect_to root_path}
          format.json {render :json => {:message => user.errors.messages}, status: :bad_request}
        end
      end

    else
      respond_to do |format|
        format.html {redirect_to root_path}
        format.json {render :json => {:message => {Authentication: 'Invalid'}}, status: 401}
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_user_params
    params.require(:user).permit(:name, :age, :avatar, :authentication_token)
  end
end
