##################UserInfo 구현###############

from logging import raiseExceptions
from django.contrib.auth.models import AbstractUser
from customer.models import UserInfo
from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginSerializer

class RegisterView(generics.CreateAPIView): # 회원가입
    queryset = UserInfo.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data
        return Response({"token": token.key}, status=status.HTTP_200_OK)
################################################

################ Mainflower 구현 ################
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework .generics import get_object_or_404

from seller.models import MainFlower
from .serializers import Mainflowerserializer, Mainflowerdetailserializer

@api_view(['GET'])
def MainflowerView(request, shop):
    # 특정 가게가 가지고 있는 메인꽃 리스트 가져오기
    mainflower = MainFlower.objects.filter(shop=shop) 
    serializer = Mainflowerserializer(mainflower, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def MainflowerdetailView(request, shop, idx):
    # 특정 가게의 메인꽃들의 디테일 출력
    mainflower = MainFlower.objects.filter(shop=shop, idx=idx) 
    serializer = Mainflowerdetailserializer(mainflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

################################################

################ Subflower 구현 ################

from seller.models import SubFlower
from .serializers import Subflowerserializer, Subflowerdetailserializer

@api_view(['GET'])
def SubflowerView(request, shop):
    # 특정 가게가 가지고 있는 메인꽃 리스트 가져오기
    subflower = SubFlower.objects.filter(shop=shop) 
    serializer = Subflowerserializer(subflower, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def SubflowerdetailView(request, shop, idx):
    # 특정 가게의 메인꽃들의 디테일 출력
    subflower = SubFlower.objects.filter(shop=shop, idx=idx) 
    serializer = Subflowerdetailserializer(subflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

################################################