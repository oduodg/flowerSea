from contextlib import nullcontext
from http import server
from logging import raiseExceptions
from django.contrib.auth.models import AbstractUser
from django.shortcuts import get_object_or_404
from customer.models import UserInfo, PickUpLocation, OrderTable, Cart
from seller.models import MainFlower, SubFlower, BunchOfFlowers, Shop, Deliver
from rest_framework import generics, status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PickUpLocationSerializer, RegisterSerializer, LoginSerializer, MyPageSerializer, MyAddressSerializer, OrderPostSerializer, AllOrdertableserializer, OrderPutSerializer, CartSerializer, CartPostSerializer, MainFlowerSerializer, SubFlowerSerializer, BunchOfFlowersSerializer

##################UserInfo 구현###############

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

##################MainFlower 구현###############

@api_view(['GET'])
def MainflowerAPIView(request, shop):
    mainflower = MainFlower.objects.filter(shop=shop) 
    serializer = MainFlowerSerializer(mainflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

##############################################

##################SubFlower 구현###############

@api_view(['GET'])
def SubflowerAPIView(request, shop):
    subflower = SubFlower.objects.filter(shop=shop) 
    serializer = SubFlowerSerializer(subflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

##############################################

##################BunchOfFlowers 구현###############

@api_view(['GET'])
def BunchOfFlowersAPIView(request, shop):
    bunchOfFlowers = BunchOfFlowers.objects.filter(shop=shop) 
    serializer = BunchOfFlowersSerializer(bunchOfFlowers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

##############################################

##################Cart 구현###############

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
            if serializer.data['mainFlower3_ID']:
                mainflower = get_object_or_404(MainFlower, idx=serializer.data['mainFlower3_ID'])
                price += mainflower.oneFlowerPrice * int(serializer.data['mainFlower3_amount'])
            if serializer.data['subFlower1_ID']:
                subflower = get_object_or_404(SubFlower, idx=serializer.data['subFlower1_ID'])
                price += subflower.oneFlowerPrice * int(serializer.data['subFlower1_amount'])
            if serializer.data['subFlower2_ID']:
                subflower = get_object_or_404(SubFlower, idx=serializer.data['subFlower2_ID'])
                price += subflower.oneFlowerPrice * int(serializer.data['subFlower2_amount'])
            if serializer.data['subFlower3_ID']:
                subflower = get_object_or_404(SubFlower, idx=serializer.data['subFlower3_ID'])
                price += subflower.oneFlowerPrice * int(serializer.data['subFlower3_amount'])
            if serializer.data['bunchOfFlowers1_ID']:
                bunchofflowers = get_object_or_404(BunchOfFlowers, idx=serializer.data['bunchOfFlowers1_ID'])
                price += bunchofflowers.price * int(serializer.data['bunchOfFlowers1_amount'])
            if serializer.data['bunchOfFlowers2_ID']:
                bunchofflowers = get_object_or_404(BunchOfFlowers, idx=serializer.data['bunchOfFlowers2_ID'])
                price += bunchofflowers.price * int(serializer.data['bunchOfFlowers2_amount'])
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

                # serializer.save(user=cart.user,cart=cart)
                serializer.save(user=cart.user,cart=cart, totalPrice=cart.totalPrice)
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

###############PickUpLocation 구현#############

class PickUpLocationAPIView(APIView):

    def post(self, request): 
        #if request.user:
            serializer = PickUpLocationSerializer(data=request.data)
            user=get_object_or_404(UserInfo, username = "jimin")
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
       # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request):
        # if request.user.is_authenticated:
            user=get_object_or_404(UserInfo, username = "jimin")
            pickuplocations = PickUpLocation.objects.filter(user=user)
            pickuplocation = pickuplocations.last()
            serializer = PickUpLocationSerializer(pickuplocation, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

##############################################