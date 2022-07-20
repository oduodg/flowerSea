from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/', LoginView.as_view()),

    # path('', views.getData),
    path('mainflower/<int:shop>/', views.MainflowerView),
    path('mainflower/<int:shop>/<int:idx>/', views.MainflowerdetailView),

    path('subflower/<int:shop>/', views.SubflowerView),
    path('subflower/<int:shop>/<int:idx>/', views.SubflowerdetailView),
]
