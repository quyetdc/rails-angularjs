class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.string :name
      t.text :content
      t.integer :stars, default: 0
      t.integer :user_id

      t.timestamps null: false
    end

    add_index :snippets, :user_id
  end
end
