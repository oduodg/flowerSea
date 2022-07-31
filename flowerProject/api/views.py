##################UserInfo 구현###############
from django.contrib.auth.models import AbstractUser
from customer.models import UserInfo
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

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
##############################################

##################MainFlower 구현###############
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework .generics import get_object_or_404

from seller.models import MainFlower
from .serializers import MainFlowerSerializer

@api_view(['GET'])
def MainflowerAPIView(request, shop):
    mainflower = MainFlower.objects.filter(shop=shop) 
    serializer = MainFlowerSerializer(mainflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
##############################################

##################SubFlower 구현###############
from seller.models import SubFlower
from .serializers import SubFlowerSerializer

@api_view(['GET'])
def SubflowerAPIView(request, shop):
    subflower = SubFlower.objects.filter(shop=shop) 
    serializer = SubFlowerSerializer(subflower, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
##############################################

##################BunchOfFlowers 구현###############
from seller.models import BunchOfFlowers
from .serializers import BunchOfFlowersSerializer

@api_view(['GET'])
def BunchOfFlowersAPIView(request, shop):
    bunchOfFlowers = BunchOfFlowers.objects.filter(shop=shop) 
    serializer = BunchOfFlowersSerializer(bunchOfFlowers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
##############################################

##################Cart 구현###############
from customer.models import Cart
from .serializers import CartSerializer, CartPostSerializer
from django.shortcuts import get_object_or_404

class CartAPIView(APIView):
    def get(self, request): 
        # if request.user:
        user=get_object_or_404(UserInfo, username = "jimin")
        carts = Cart.objects.filter(user=user)
        cart = carts.last()
        # price = 0
        # if cart.mainFlower1_ID:
        #     mainflower = get_object_or_404(MainFlower, pk=cart.mainFlower1_ID)
        #     price += mainflower.oneFlowerPrice * cart.mainFlower1_amount
        # if cart.mainFlower2_ID:
        #     mainflower = get_object_or_404(MainFlower, pk=cart.mainFlower2_ID)
        #     price += mainflower.oneFlowerPrice * cart.mainFlower2_amount
        # if cart.mainFlower3_ID:
        #     mainflower = get_object_or_404(MainFlower, pk=cart.mainFlower3_ID)
        #     price += mainflower.oneFlowerPrice * cart.mainFlower3_amount
        # if cart.subFlower1_ID:
        #     subflower = get_object_or_404(SubFlower, pk=cart.subFlower1_ID)
        #     price += subflower.oneFlowerPrice * cart.subFlower1_amount
        # if cart.subFlower2_ID:
        #     subflower = get_object_or_404(SubFlower, pk=cart.subFlower2_ID)
        #     price += subflower.oneFlowerPrice * cart.subFlower2_amount
        # if cart.subFlower3_ID:
        #     subflower = get_object_or_404(SubFlower, pk=cart.subFlower3_ID)
        #     price += subflower.oneFlowerPrice * cart.subFlower3_amount
        # if cart.bunchOfFlowers1_ID:
        #     bunchofflowers = get_object_or_404(BunchOfFlowers, pk=cart.bunchOfFlowers1_ID)
        #     price += bunchofflowers.price * cart.bunchOfFlowers1_amount
        # if cart.bunchOfFlowers2_ID:
        #     bunchofflowers = get_object_or_404(BunchOfFlowers, pk=cart.bunchOfFlowers2_ID)
        #     price += bunchofflowers.price * cart.bunchOfFlowers2_amount
        serializer = CartSerializer(cart, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def post(self, request):
        serializer = CartPostSerializer(data=request.data)
        user=get_object_or_404(UserInfo, username = "jimin")
        if serializer.is_valid():
            price = 0
            if request.data['mainFlower1_ID']:
                mainflower = get_object_or_404(MainFlower, idx=request.data['mainFlower1_ID'])
                price += mainflower.oneFlowerPrice * int(request.data['mainFlower1_amount'])
            if request.data['mainFlower2_ID']:
                mainflower = get_object_or_404(MainFlower, idx=request.data['mainFlower2_ID'])
                price += mainflower.oneFlowerPrice * int(request.data['mainFlower2_amount'])
            # if request.data['mainFlower3_ID']:
            #     mainflower = get_object_or_404(MainFlower, idx=request.data['mainFlower3_ID'])
            #     price += mainflower.oneFlowerPrice * int(request.data['mainFlower3_amount'])
            if request.data['subFlower1_ID']:
                subflower = get_object_or_404(SubFlower, idx=request.data['subFlower1_ID'])
                price += subflower.oneFlowerPrice * int(request.data['subFlower1_amount'])
            # if request.data['subFlower2_ID']:
            #     subflower = get_object_or_404(SubFlower, idx=request.data['subFlower2_ID'])
            #     price += subflower.oneFlowerPrice * int(request.data['subFlower2_amount'])
            # if request.data['subFlower3_ID']:
            #     subflower = get_object_or_404(SubFlower, idx=request.data['subFlower3_ID'])
            #     price += subflower.oneFlowerPrice * int(request.data['subFlower3_amount'])
            # if request.data['bunchOfFlowers1_ID']:
            #     bunchofflowers = get_object_or_404(BunchOfFlowers, idx=request.data['bunchOfFlowers1_ID'])
            #     price += bunchofflowers.price * int(request.data['bunchOfFlowers1_amount'])
            # if request.data['bunchOfFlowers2_ID']:
            #     bunchofflowers = get_object_or_404(BunchOfFlowers, idx=request.data['bunchOfFlowers2_ID'])
            #     price += bunchofflowers.price * int(request.data['bunchOfFlowers2_amount'])
                
            serializer.save(user=user, totalPrice = price)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response('안돼~', status=status.HTTP_401_UNAUTHORIZED)
        
class CartAllAPIView(APIView):
    def get(self, request):    
        # if request.user:
            user=UserInfo.objects.filter(username = "jimin")
            cart = Cart.objects.filter(user=user).order_by('-idx')
            # cart = Cart.objects.all().order_by('-idx')
            serializer = CartSerializer(cart, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
#############################################