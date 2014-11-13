require "rails_helper"

RSpec.describe User, :type => :model do
  let(:user) {
    User.create!(
      email: "colindao@codesnippets.com",
      password: 'password',
      password_confirmation: 'password',
    )
  }

  it { expect(user).to be_valid }
  it { expect(user).to respond_to(:name) }
  it { expect(user).to respond_to(:age) }

  describe "#invalid" do
    describe "name" do
      it "too long" do
        user.name = "a" * 51
        expect(user).not_to be_valid
      end
    end

    describe "age" do
      it "too small" do
        user.age = 5
        expect(user).not_to be_valid
      end

      it "too old" do
        user.age = 81
        expect(user).not_to be_valid
      end

      it "not a number" do
        user.age = 'a'
        expect(user).not_to be_valid
      end
    end
  end

  describe "#valid" do
    it {
      user.name = "Colin"
      user.age = 25
      expect(user).to be_valid
    }
  end
end