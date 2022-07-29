##################UserInfo 구현###############

from logging import raiseExceptions
from django.contrib.auth.models import AbstractUser
from customer.models import UserInfo
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import Orderdetailserializer, RegisterSerializer, LoginSerializer

from .serializers import RegisterSerializer, LoginSerializer, MyPageSerializer, MyAddressSerializer

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
class ShowUsers(generics.ListAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = RegisterSerializer

class MyPageAPIView(APIView):
    def get(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyPageSerializer(myinfo, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyPageSerializer(myinfo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class UserDeleteAPIView(APIView):
    def delete(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            myinfo.delete()
            return Response("UserInfo successfully deleted!")
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class UserAddressAPIView(APIView):
    def get(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyAddressSerializer(myinfo, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
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

################ Subflower 구현 #################

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
##################Cart 기능 구현###############
from customer.models import Cart
from .serializers import CartSerializer, CartPostSerializer

class CartAPIView(APIView):
    def get(self, request): 
        
        # if request.user:
        user=get_object_or_404(UserInfo, username = "jimin")
        carts = Cart.objects.filter(user=user)
        cart = carts.last()
        serializer = CartSerializer(cart, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def post(self, request):    #카트 생성
        serializer = CartPostSerializer(data=request.data)
        user=get_object_or_404(UserInfo, username = "jimin")
        if serializer.is_valid():       #유효한 데이터라면
            # serializer.user=user    #Post요청으로 들어온 데이터 시리얼라이저에 넣기
            serializer.save(user=user)
                       #역직렬화로 save, 모델시리얼라이저의 기본 create() 함수 동작
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response('안돼~', status=status.HTTP_401_UNAUTHORIZED)
        
class CartAllAPIView(APIView):      #유저의 모든 주문내역 불러오기
    def get(self, request):    
        # if request.user:
            # user=UserInfo.objects.filter(name = "jimin")
            # cart = Cart.objects.filter(user=user).order_by('-idx')
            cart = Cart.objects.all().order_by('-idx')
            serializer = CartPostSerializer(cart, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
#############################################
################ OrderTable 구현 #################
from customer.models import OrderTable
from .serializers import Ordertableserializer, Orderdetailserializer, AllOrdertableserializer
from rest_framework.views import APIView

class OrderTableAPIView(APIView):
    def post(self, request):
        # if request.user.is_authenticated:
            
            serializer = AllOrdertableserializer(data=request.data)

            # if Cart.objects.filter(user=request.user).exists():
            carts = Cart.objects.filter(pk=2) # 해당 유저의 모든 cart 정보 가져오기
            cart = carts.last() # 맨 나중에 생성된 cart 객체만 빼오기
            user = UserInfo.objects.all()
            if serializer.is_valid():
                # serializer.user = get_object_or_404(UserInfo, idx=user[1])
                serializer.cart = cart
                serializer.save(user=cart.user,cart=cart)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

        
        # request의 user가 cart 객체를 가지고 있다면 == request의 user가 장바구니를 만들어 놓았다면
        
    def get(self, request):
        order = OrderTable.objects.all()
        serializer = Orderdetailserializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllOrderTableAPIVIew(APIView):
    def get(self, request):
        order = OrderTable.objects.all()
        serializer = AllOrdertableserializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

################################################
