# app.rb
require 'sinatra'
require 'haml'
set :haml, :format => :html5
set :haml, {:attr_wrapper => '"'}
get '/' do	
	haml :index
end