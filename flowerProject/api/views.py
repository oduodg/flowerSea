##################UserInfo 구현###############

from contextlib import nullcontext
from logging import raiseExceptions
from django.contrib.auth.models import AbstractUser
from customer.models import UserInfo
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import RegisterSerializer, LoginSerializer

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
    
    def post(self, request):
        serializer = CartPostSerializer(data=request.data)
        user=get_object_or_404(UserInfo, username = "jimin")
        price = 0

        if serializer.is_valid():
            serializer.save(user=user)
            if serializer.data['mainFlower1_ID']:
                mainflower = get_object_or_404(MainFlower, idx=serializer.data['mainFlower1_ID'])
                price += mainflower.oneFlowerPrice * int(serializer.data['mainFlower1_amount'])
            if serializer.data['mainFlower2_ID']:
                mainflower = get_object_or_404(MainFlower, idx=serializer.data['mainFlower2_ID'])
                price += mainflower.oneFlowerPrice * int(serializer.data['mainFlower2_amount'])
            # if request.data['mainFlower3_ID']:
            #     mainflower = get_object_or_404(MainFlower, idx=request.data['mainFlower3_ID'])
            #     price += mainflower.oneFlowerPrice * int(request.data['mainFlower3_amount'])
            if serializer.data['subFlower1_ID']:
                subflower = get_object_or_404(SubFlower, idx=serializer.data['subFlower1_ID'])
                price += subflower.oneFlowerPrice * int(serializer.data['subFlower1_amount'])
            if serializer.data['subFlower2_ID']:
                subflower = get_object_or_404(SubFlower, idx=serializer.data['subFlower2_ID'])
                price += subflower.oneFlowerPrice * int(serializer.data['subFlower2_amount'])
            # if request.data['subFlower3_ID']:
            #     subflower = get_object_or_404(SubFlower, idx=request.data['subFlower3_ID'])
            #     price += subflower.oneFlowerPrice * int(request.data['subFlower3_amount'])
            # if request.data['bunchOfFlowers1_ID']:
            #     bunchofflowers = get_object_or_404(BunchOfFlowers, idx=request.data['bunchOfFlowers1_ID'])
            #     price += bunchofflowers.price * int(request.data['bunchOfFlowers1_amount'])
            # if request.data['bunchOfFlowers2_ID']:
            #     bunchofflowers = get_object_or_404(BunchOfFlowers, idx=request.data['bunchOfFlowers2_ID'])
            #     price += bunchofflowers.price * int(request.data['bunchOfFlowers2_amount'])
            carts = Cart.objects.filter(user=user)
            cart = carts.last()
            cart.totalPrice = price
            cart.save()
            serializer = CartSerializer(cart, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response('안돼~', status=status.HTTP_401_UNAUTHORIZED)
class CartAllAPIView(APIView):      #유저의 모든 주문내역 불러오기
    def get(self, request):    
        # if request.user:
            user=get_object_or_404(UserInfo, username = "jimin")
            cart = Cart.objects.filter(user=user).order_by('-idx')
            serializer = CartPostSerializer(cart, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
#############################################
################ OrderTable 구현 #################
from customer.models import OrderTable
from .serializers import OrderPostSerializer, AllOrdertableserializer, OrderPutSerializer
from rest_framework.views import APIView

class OrderTableAPIView(APIView):
    def post(self, request):
        # if request.user.is_authenticated:
            
            serializer = OrderPostSerializer(data=request.data)
            user=get_object_or_404(UserInfo, username = "jimin")

            # request의 user가 cart 객체를 가지고 있다면 == request의 user가 장바구니를 만들어 놓았다면
            # if Cart.objects.filter(user=request.user).exists():
            
            if serializer.is_valid():
                carts = Cart.objects.filter(user=user) # 해당 유저의 모든 cart 정보 가져오기
                cart = carts.last() # 맨 나중에 생성된 cart 객체만 빼오기

                serializer.save(user=cart.user,cart=cart)
                # serializer.save(user=cart.user,cart=cart, TotalPrice=cart.totalAmount)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
        
    def get(self, request):
        user=get_object_or_404(UserInfo, username = "jimin")
        orders = OrderTable.objects.filter(user=user)
        order = orders.last()
        serializer = OrderPostSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        # if request.user.is_authenticated:
            user=get_object_or_404(UserInfo, username = "jimin")
            orders = OrderTable.objects.filter(user=user)
            order = orders.last()
            # request의 user가 ordertable 객체를 가지고 있다면 == request의 user가 주문을 했다면
            # if Ordertable.objects.filter(user=request.user).exists():
            
            serializer = OrderPutSerializer(order, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
        

class AllOrderTableAPIView(APIView):
    def get(self, request):
        user=get_object_or_404(UserInfo, username = "jimin")
        order = OrderTable.objects.filter(user=user).order_by('-idx')
        serializer = AllOrdertableserializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

################################################
