from django.db import models
from seller.models import Shop, BunchOfFlowers, MainFlower, SubFlower
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserInfo(AbstractUser):
    idx = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False)
    phoneNum = models.CharField(max_length=15, null=False)
    address = models.CharField(max_length=300, null=False)
    email = models.EmailField(max_length = 254)
    # ID = models.CharField(max_length=30, null=False)
    # PW = models.CharField(max_length=30, null=False)
    
    def __str__(self):
        return self.name


class Cart(models.Model):
    idx = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)
    mainFlower1_ID = models.ForeignKey(MainFlower, null=True, on_delete=models.PROTECT, related_name='mainFlower1')
    mainFlower1_name = models.CharField(max_length=100, null=True)
    mainFlower1_amount = models.IntegerField(null=True)
    mainFlower2_ID = models.ForeignKey(MainFlower, null=True, on_delete=models.PROTECT, related_name='mainFlower2')
    mainFlower2_name = models.CharField(max_length=100, null=True)
    mainFlower2_amount = models.IntegerField(null=True)
    mainFlower3_ID = models.ForeignKey(MainFlower, null=True, on_delete=models.PROTECT, related_name='mainFlower3')
    mainFlower3_name = models.CharField(max_length=100, null=True)
    mainFlower3_amount = models.IntegerField(null=True)
    subFlower1_ID = models.ForeignKey(SubFlower, null=True, on_delete=models.PROTECT, related_name='subFlower1')
    subFlower1_name = models.CharField(max_length=100, null=True)
    subFlower1_amount = models.IntegerField(null=True)
    subFlower2_ID = models.ForeignKey(SubFlower, null=True, on_delete=models.PROTECT, related_name='subFlower2')
    subFlower2_name = models.CharField(max_length=100, null=True)
    subFlower2_amount = models.IntegerField(null=True)
    subFlower3_ID = models.ForeignKey(SubFlower, null=True, on_delete=models.PROTECT, related_name='subFlower3')
    subFlower3_name = models.CharField(max_length=100, null=True)
    subFlower3_amount = models.IntegerField(null=True)
    bunchOfFlowers1_ID = models.ForeignKey(BunchOfFlowers, null=True, on_delete=models.PROTECT, related_name='bunchOfFlower1')
    bunchOfFlowers1_color = models.CharField(max_length=1000, null = True)
    bunchOfFlowers1_amount = models.IntegerField(null=True)
    bunchOfFlowers2_ID = models.ForeignKey(BunchOfFlowers, null=True, on_delete=models.PROTECT, related_name='bunchOfFlower2')
    bunchOfFlowers2_color = models.CharField(max_length=1000, null = True)
    bunchOfFlowers2_amount = models.IntegerField(null=True)
    totalPrice = models.IntegerField(null=True)

class OrderTable(models.Model):
    idx = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, null=True, on_delete=models.CASCADE)
    orderDate = models.DateTimeField(auto_now=True, null=False)
    address = models.CharField(max_length=300, null=True)
    requirement = models.TextField(null=True)
    totalPrice = models.IntegerField(null=True)
    # CATEGORY_CHOICES = [
    #     ('0', '결제 안됨'),
    #     ('1', '주문 수락'),
    #     ('2', '배송중'),
    #     ('3', '배송 완료')
    # ]
    # status = models.CharField(
    #     max_length=10,
    #     choices=CATEGORY_CHOICES,
    #     default='0'
    # ) 
    
class PickUpLocation(models.Model):
    idx = models.AutoField(primary_key=True)
    depart = models.CharField(max_length=150, null=False)
    dest = models.CharField(max_length=150, null=False)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)