class SnippetsController < ApplicationController
  before_action :set_snippet, only: [:show, :edit, :update, :destroy]
  # before_filter :authenticate_user!, only: [:new, :create, :update, :destroy]

  respond_to :html, :json

  def index
    if params[:tag]
      @snippets = Snippet.tagged_with([params[:tag]], :any => true)
    else
      @snippets = Snippet.all
    end

    respond_with(@snippets)
  end

  def show
    respond_with(@snippet)
  end

  def new
    @snippet = Snippet.new
    respond_with(@snippet)
  end

  def edit
  end

  def create
    @snippet = current_user.snippets.new(snippet_params)
    if @snippet.valid?
      @snippet.save
      respond_to do |format|
        format.html { redirect_to dashboard_path }
        format.json { render :json => { snippet: @snippet, status: :ok } }
      end
    else
      respond_to do |format|
        format.html { render action: "new" }
        format.json { render :json => { error: @snippet.errors.messages, status: :bad_request } }
      end
    end
  end

  def update
    @snippet.update(snippet_params)
    respond_with(@snippet)
  end

  def destroy
    @snippet.destroy
    respond_with(@snippet)
  end

  # Get list snippet by tag
  # snippet has array of tags
  def list_by_tag
  end

  private
    def set_snippet
      @snippet = Snippet.find(params[:id])
    end

    def snippet_params
      params.require(:snippet).permit(:name, :content, :tag_list)
    end
end
