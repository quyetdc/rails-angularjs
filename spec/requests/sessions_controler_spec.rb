require "rails_helper"

RSpec.describe "Post #create", type: :request do
  before(:all) do
    User.create(
        email: "colindao@codesnippets.com",
        password: 'password',
        password_confirmation: 'password',
    )
  end

  it "responds successfully with an HTTP 201 status code" do
    user_params = {user: { email: "colindao@codesnippets.com", password: "password"}}.to_json
    post "users/sign_in", user_params, request_headers

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json).to be_has_key("user")
    expect(json["user"]).to be_has_key("authentication_token")
  end

  it "responds unsuccessfully with an HTTP 401 status code" do
    user_params = {user: { email: "colindao@codesnippets.com", password: "wrong password"}}.to_json
    post "users/sign_in", user_params, request_headers

    expect(response).not_to be_success
    expect(response).to have_http_status(401)

    expect(json["message"]).to eql("Error with your login or password")
  end
end
