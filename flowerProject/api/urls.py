from django.urls import path
from . import views
from .views import *
from .views import PickUpLocationAPIView, LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView
from .views import LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView, CartAPIView, FlowerShopAPIView, MainflowerAPIView, SubflowerAPIView, BunchOfFlowersAPIView

urlpatterns = [
    #Userinfo
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/login/', LoginView.as_view()),
    path('userinfo/', MyPageAPIView.as_view()),
    path('userifo/delete/', UserDeleteAPIView.as_view()),
    path('userinfo/address/', UserAddressAPIView.as_view()),
    
    #Flowershop
    path('flowershop/', FlowerShopAPIView.as_view()),
    
    #Cart
    # path('cart/all/', CartAllAPIView.as_view()),
    path('cart/', CartAPIView.as_view()),
    
    #Ordertable
    path('ordertable/', OrderTableAPIView.as_view()),
    path('ordertable/all/', AllOrderTableAPIView.as_view()),
    
    #PickupLocation
    path('pickuplocation/', PickUpLocationAPIView.as_view()), 
    
    #Flowers
    path('mainflower/<str:shop>/', MainflowerAPIView, name="mainflower"),
    path('subflower/<str:shop>/', SubflowerAPIView, name="subflower"),
    path('bunchofflowers/<str:shop>/', BunchOfFlowersAPIView, name="bunchofflowers"),
]