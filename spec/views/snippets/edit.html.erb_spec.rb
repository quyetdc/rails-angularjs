require 'rails_helper'

RSpec.describe "snippets/edit", :type => :view do
  before(:each) do
    @snippet = assign(:snippet, Snippet.create!(
      :name => "MyString",
      :content => "MyText",
      :stars => 1,
      :tags => "MyText"
    ))
  end

  it "renders the edit snippet form" do
    render

    assert_select "form[action=?][method=?]", snippet_path(@snippet), "post" do

      assert_select "input#snippet_name[name=?]", "snippet[name]"

      assert_select "textarea#snippet_content[name=?]", "snippet[content]"

      assert_select "input#snippet_stars[name=?]", "snippet[stars]"

      assert_select "textarea#snippet_tags[name=?]", "snippet[tags]"
    end
  end
end
