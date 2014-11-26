require 'rails_helper'

RSpec.describe "snippets/show", :type => :view do
  before(:each) do
    @snippet = assign(:snippet, Snippet.create!(
      :name => "Name",
      :content => "MyText",
      :stars => 1,
      :tags => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/1/)
    expect(rendered).to match(/MyText/)
  end
end
