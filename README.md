SUMMARY
------

This project I created with purpose of programmers can store snippets for later reuse or share with others.

I integrate AngularJs in this projects for easy front-end. This project is still being in development process.

I will deploy to heroku soon.

In order to try this, ofcourse, there are some steps you should follow:

+ Star and Fork this repository, then clone your forked repository.

+ You can change config/database.yml in order to use SQL or SQLite3 ...

Or install postgresql via some simples commands

```shell
sudo apt-get install libpq-dev

bundle install

sudo apt-get install postgresql postgresql-contrib

sudo -u postgres psql postgres
```

+ run these commands on your terminal:

```shell

bundle install

bundle exec rake db:create db:migrate

rails server
```

Enjoy

TODO
----

I'm in developing process, a lot of things that need to be done.