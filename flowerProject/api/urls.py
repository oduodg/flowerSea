from django.urls import path
from . import views
from .views import *
from flowerseaBackEnd.flowerProject.api.serializers import BunchOfFlowersDetailSerializer
from .views import BunchOfFlowersView, BunchOfFlowersDetailView, PickUpLocationAPIView, LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/login/', LoginView.as_view()),
    path('userinfo/', MyPageAPIView.as_view()),
    path('userifo/delete/', UserDeleteAPIView.as_view()),
    path('userinfo/address/', UserAddressAPIView.as_view()),

    path('pickuplocation/', PickUpLocationAPIView.as_view()),


    path('bunchofflowers/<str:flowerHouse_id>/', views.BunchOfFlowersView),
    path('bunchofflowers/<str:bunchofflowers_id>/', views.BunchOfFlowersDetailView), 

]  