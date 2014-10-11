class Users::RegistrationsController < Devise::RegistrationsController
# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

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
        format.json {render :json => {:error => user.errors}, status: :bad_request}
      end
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    debugger
    if current_user && (current_user.authentication_token == params[:user][:authentication_token])
      if current_user.update(update_word_params)
        respond_to do |format|
          format.json { render :json => {user: current_user}, status: :ok}
        end
      else
        respond_to do |format|
          format.json { render :json => {user: current_user}, status: :bad_request}
        end
      end

    else
      debugger
      respond_to do |format|
        format.json { render :json => {error: current_user.errors, status: 401}}
      end
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the users wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # You can put the params you want to permit in the empty array.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

  # You can put the params you want to permit in the empty array.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_word_params
    params.require(:user).permit(:name, :age, :authentication_token)
  end
end
