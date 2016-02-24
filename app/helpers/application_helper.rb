module ApplicationHelper

  @app_context = "State"

  def ApplicationHelper.set_app_context(app_context)
    @app_context = app_context
  end

  def ApplicationHelper.get_app_context
    @app_context
  end
end
