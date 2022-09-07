from customer.models import UserInfo, OrderTable, PickUpLocation, Cart
from seller.models import Shop, MainFlower, SubFlower, BunchOfFlowers
from django.contrib.auth.models import AbstractUser, User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404

##################UserInfo 구현###############

class RegisterSerializer(serializers.ModelSerializer): # 회원가입 구현
    password = serializers.CharField(
        write_only = True,
        required = True,
        validators = [validate_password],
    )
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = UserInfo
        fields = ('username', 'password', 'password2', 'name', 'phoneNum', 'address', 'email')
        
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {"password" : "Password fields didn't match."})
        return data
    
    def create(self, validated_data):
        user = UserInfo.objects.create_user(
            username = validated_data['username'],
            name = validated_data['name'],
            phoneNum = validated_data['phoneNum'],
            address = validated_data['address'],
            email = validated_data['email']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return user
    
class LoginSerializer(serializers.Serializer): # 로그인 구현
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
        
    def validate(self, data):
        user = authenticate(**data)
        if user:
            token = Token.objects.get(user=user)
            return token
        raise serializers.ValidationError(
            {"error": "Unable to log in with provided credentials."})
        
class MyPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('name', 'phoneNum', 'address', 'email')
        
class MyAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('address')
##############################################

############### Mainflower 구현 ###############
class MainFlowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = MainFlower
        fields = ('idx', 'flowerName', 'oneFlowerPrice', 'quantity', 'enlightened', 'floriography', 'flowerPhoto')
##############################################

############### Subflower 구현 ################
class SubFlowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubFlower
        fields = ('idx', 'flowerName', 'oneFlowerPrice', 'quantity', 'enlightened', 'floriography', 'flowerPhoto')
##############################################
############### bunchofflowers 구현 ################
class BunchOfFlowersSerializer(serializers.ModelSerializer):

    class Meta:
        model = BunchOfFlowers
        fields = ('idx', 'flowerphoto', 'color', 'price')
##############################################

###################CART 구현##################
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('mainFlower1_ID', 'mainFlower1_amount', 
                  'mainFlower2_ID', 'mainFlower2_amount',
                  'mainFlower3_ID', 'mainFlower3_amount',
                  'subFlower1_ID', 'subFlower1_amount',
                  'subFlower2_ID', 'subFlower2_amount',
                  'subFlower3_ID', 'subFlower3_amount',
                  'bunchOfFlowers1_ID', 'bunchOfFlowers1_amount',
                  'bunchOfFlowers2_ID', 'bunchOfFlowers2_amount',
                  'totalPrice'
                  )

class CartPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('user',
                  'mainFlower1_ID', 'mainFlower1_name', 'mainFlower1_amount',
                  'mainFlower2_ID', 'mainFlower2_name', 'mainFlower2_amount',
                  'mainFlower3_ID', 'mainFlower3_name', 'mainFlower3_amount',
                  'subFlower1_ID', 'subFlower1_name', 'subFlower1_amount',
                  'subFlower2_ID', 'subFlower2_name', 'subFlower2_amount',
                  'subFlower3_ID', 'subFlower3_name', 'subFlower3_amount',
                  'bunchOfFlowers1_ID', 'bunchOfFlowers1_color', 'bunchOfFlowers1_amount',
                  'bunchOfFlowers2_ID', 'bunchOfFlowers2_color', 'bunchOfFlowers2_amount',
                  'totalPrice'
                  )

class CartAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('mainFlower1_ID', 'mainFlower1_name', 'mainFlower1_amount',
                  'mainFlower2_ID', 'mainFlower2_name', 'mainFlower2_amount',
                  'mainFlower3_ID', 'mainFlower3_name', 'mainFlower3_amount',
                  'subFlower1_ID', 'subFlower1_name', 'subFlower1_amount',
                  'subFlower2_ID', 'subFlower2_name', 'subFlower2_amount',
                  'subFlower3_ID', 'subFlower3_name', 'subFlower3_amount',
                  'bunchOfFlowers1_ID', 'bunchOfFlowers1_color', 'bunchOfFlowers1_amount',
                  'bunchOfFlowers2_ID', 'bunchOfFlowers2_color', 'bunchOfFlowers2_amount',
                  'totalPrice'
                  )

#############################################

############### Ordertable 구현 ################

class Ordertableserializer(serializers.ModelSerializer):

        class Meta:
            model = OrderTable
            fields = ('address', 'requirement')
            # fields = ('user', 'cart', 'orderDate', 'address', 'requirement', 'totalPrice', 'status')

class OrderPostSerializer(serializers.ModelSerializer):

        class Meta:
            model = OrderTable
            fields = ('user', 'cart', 'orderDate', 'address', 'requirement', 'totalPrice')

class AllOrdertableserializer(serializers.ModelSerializer):
        cart = CartAllSerializer(many=False, read_only=True)
        class Meta:
            model = OrderTable
            fields = ('orderDate', 'address', 'requirement', 'totalPrice', 'cart')
##############################################

##############PickUpLocation 구현##############

class PickUpLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickUpLocation
        fields = ('depart', 'dest')

##############################################


############### flowerHouse 구현 ################
class FlowerShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('shopName', 'location', 'phoneNum', 'openHours', 'x', 'y')
##############################################