from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/login/', LoginView.as_view()),
    path('userinfo/', MyPageAPIView.as_view()),
    path('userifo/delete/', UserDeleteAPIView.as_view()),
    path('userinfo/address/', UserAddressAPIView.as_view()),
    path('user/', ShowUsers.as_view()),

    # path('', views.getData),
    path('mainflower/<int:shop>/', views.MainflowerView),
    path('mainflower/<int:shop>/<int:idx>/', views.MainflowerdetailView),

    path('subflower/<int:shop>/', views.SubflowerView),
    path('subflower/<int:shop>/<int:idx>/', views.SubflowerdetailView),

    # path('cart/', CartAPIView.as_view()),
    path('cart/all/', CartAllAPIView.as_view()),
    path('cart/', CartAPIView.as_view()),

    path('ordertable/', OrderTableAPIView.as_view()),
    path('ordertable/all/', AllOrderTableAPIView.as_view()),
]
