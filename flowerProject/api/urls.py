from django.urls import path
from .views import LoginView, RegisterView

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/', LoginView.as_view()),
]