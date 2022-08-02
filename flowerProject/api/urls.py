from django.urls import path
from . import views
from .views import *
from flowerseaBackEnd.flowerProject.api.serializers import BunchOfFlowersDetailSerializer
from .views import BunchOfFlowersView, BunchOfFlowersDetailView, PickUpLocationAPIView, LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView
from .views import LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView, CartAllAPIView, CartAPIView, MainflowerAPIView, SubflowerAPIView, BunchOfFlowersAPIView

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/login/', LoginView.as_view()),
    path('userinfo/', MyPageAPIView.as_view()),
    path('userifo/delete/', UserDeleteAPIView.as_view()),
    path('userinfo/address/', UserAddressAPIView.as_view()),
    
    # path('cart/', CartAPIView.as_view()),
    path('cart/all/', CartAllAPIView.as_view()),
    path('cart/', CartAPIView.as_view()),
    
    path('ordertable/', OrderTableAPIView.as_view()),
    path('ordertable/all/', AllOrderTableAPIView.as_view()),
    
    path('pickuplocation/', PickUpLocationAPIView.as_view()), 
    
    path('mainflower/<str:shop>/', MainflowerAPIView, name="mainflower"),
    path('subflower/<str:shop>/', SubflowerAPIView, name="subflower"),
    path('bunchofflowers/<str:shop>/', BunchOfFlowersAPIView, name="bunchofflowers"),
]
