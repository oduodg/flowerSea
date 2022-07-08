from django.db import models

# Create your models here.
class FlowerShop(models.Model):
    idx = models.AutoField(primary_key=True)
    shopName = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    phoneNum = models.CharField(max_length=15)
    openHours = models.CharField(max_length=50)
    
    def __str__(self):
        return self.shopName
    
class MainFlower(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(FlowerShop, on_delete=models.CASCADE)
    flowerName = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    CATEGORY_CHOICES = [
        ('no bloom', '개화 안함'),
        ('start bloom', '개화 초기'),
        ('full bloom', '만개'),
    ]
    enlightened = models.CharField(#개화정도
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='full bloom',
    ) 
    date = models.DateTimeField()
    floriography = models.CharField(max_length=100)
    
    def __str__(self):
        return self.flowerName
    
class SubFlower(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(FlowerShop, on_delete=models.CASCADE)
    flowerName = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    CATEGORY_CHOICES = [
        ('no bloom', '개화 안함'),
        ('start bloom', '개화 초기'),
        ('full bloom', '만개'),
    ]
    enlightened = models.CharField(#개화정도
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='full bloom',
    ) 
    date = models.DateTimeField()
    floriography = models.CharField(max_length=100)
    
    def __str__(self):
        return self.flowerName
    
class Bouquet(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(FlowerShop, on_delete=models.CASCADE)
    mainFlower = models.ForeignKey(MainFlower, on_delete=models.CASCADE, null=True)
    subFlower = models.ForeignKey(SubFlower, on_delete=models.CASCADE, null=True)
    price = models.IntegerField(null=True)
    color = models.CharField(max_length=1000, null = True)
    date = models.DateTimeField()
    
class Deliver(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(FlowerShop, on_delete=models.CASCADE)
    address = models.CharField(max_length=300)
    deliverPrice = models.IntegerField(default=0)
    