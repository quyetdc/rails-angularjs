json.array!(@snippets) do |snippet|
  json.extract! snippet, :id, :name, :content, :stars, :tags
  json.url snippet_url(snippet, format: :json)
end
