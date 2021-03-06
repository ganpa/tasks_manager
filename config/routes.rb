SampleApp::Application.routes.draw do

  get "accounts/account_exists" => "accounts#account_exists"
  
  get "accounts/subdomain_taken" => "accounts#subdomain_taken?"

  get "accounts/location_types" => "accounts#location_types"

  get "locations/types" => "locations#types"

  get "locations/:id/sublocations" => "locations#sub_locations"

  get "employees/positions" => "employees#positions"

  get "tasks/topics" => "tasks#topics"

  post "/signup" => "users#create"

  post "/signin" => "sessions#create"

  get "/signout" => "sessions#destroy"

  get "/is_signed_in" => "sessions#is_signed_in"

  get "/current_user" => "sessions#get_current_user"

  get "users/current_user" => "users#current_user"

  resources :tasks, :locations, :employees
  resources :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:create, :index]
  resources :accounts, only: [:create, :index]
  #resource :home, :only => :index
  root :to => 'home#index'

  #get "tasks" => "tasks#index"
  #get "tasks/new" => "tasks#new"
  #get "home/index"

  #get "static_pages/home"

  #get "static_pages/help"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
