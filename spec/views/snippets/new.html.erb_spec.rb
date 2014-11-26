require 'rails_helper'

RSpec.describe "snippets/new", :type => :view do
  before(:each) do
    assign(:snippet, Snippet.new(
      :name => "MyString",
      :content => "MyText",
      :stars => 1,
      :tags => "MyText"
    ))
  end

  it "renders new snippet form" do
    render

    assert_select "form[action=?][method=?]", snippets_path, "post" do

      assert_select "input#snippet_name[name=?]", "snippet[name]"

      assert_select "textarea#snippet_content[name=?]", "snippet[content]"

      assert_select "input#snippet_stars[name=?]", "snippet[stars]"

      assert_select "textarea#snippet_tags[name=?]", "snippet[tags]"
    end
  end
end
