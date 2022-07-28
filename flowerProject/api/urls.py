from django.urls import path
from .views import LoginView, MyPageAPIView, RegisterView, UserAddressAPIView, UserDeleteAPIView

urlpatterns = [
    path('userinfo/signup/', RegisterView.as_view()),
    path('userinfo/login/', LoginView.as_view()),
    path('userinfo/', MyPageAPIView.as_view()),
    path('userifo/delete/', UserDeleteAPIView.as_view()),
    path('userinfo/address/', UserAddressAPIView.as_view())
    path('bunchofflowers/<str:flowerHouse_id>/', BunchOfFlowersAPIGenerics.as_view),   
    path('bunchofflowers/<int:bunchofflowers_id>/', BunchOfFlowersDetailAPIGenerics.as_view),# str 아니라 int? 

]