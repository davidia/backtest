source 'https://rubygems.org'

gem 'rails', '3.2.3'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

group :production do
  gem 'pg'
end


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platform => :ruby

  gem 'uglifier', '>= 1.0.3'
end
gem 'jquery-ui-rails'
gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

gem "therubyracer"
gem "compass-rails"
gem "compass_twitter_bootstrap", :git => "git://github.com/vwall/compass-twitter-bootstrap.git", :group => :assets
gem "ember-rails"
gem "haml-rails"
gem "hamlbars" ,:git => 'git://github.com/jamesotron/hamlbars.git'
gem 'thin'

group :development do
  gem 'guard'
  gem 'rack-livereload', :git => 'git://github.com/johnbintz/rack-livereload.git'
  gem 'guard-livereload'  
end

group :development, :test do
  gem 'sqlite3'
end