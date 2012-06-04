require 'test_helper'

class BacktestControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get closes" do
    get :closes
    assert_response :success
  end

end
