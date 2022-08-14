from django.db import models

# Create your models here.
class Shop(models.Model):
    idx = models.AutoField(primary_key=True)
    shopName = models.CharField(max_length=100, null=False)
    location = models.CharField(max_length=300, null=False)
    phoneNum = models.CharField(max_length=20, null=False)
    openHours = models.CharField(max_length=50, null=False)
    x = models.FloatField(default=0)
    y = models.FloatField(default=0)
    
    def __str__(self):
        return self.shopName
    
class MainFlower(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    flowerName = models.CharField(max_length=100, null=False)
    oneFlowerPrice = models.IntegerField(default=0, null=False)
    quantity = models.IntegerField(default=0, null=False)
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
    floriography = models.CharField(max_length=100, null=False)
    flowerPhoto = models.ImageField(null=True, blank=True, upload_to='mainflower/')
    
    def __str__(self):
        return self.flowerName
    
class SubFlower(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    flowerName = models.CharField(max_length=100, null=False)
    oneFlowerPrice = models.IntegerField(default=0, null=False)
    quantity = models.IntegerField(default=0, null=False)
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
    floriography = models.CharField(max_length=100, null=False)
    flowerPhoto = models.ImageField(null=True, blank=True, upload_to='subflower/')
    
    def __str__(self):
        return self.flowerName
    
class BunchOfFlowers(models.Model):
    idx = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    price = models.IntegerField(null=False)
    color = models.CharField(max_length=1000, null = False)
    flowerPhoto = models.ImageField(null=True, blank=True, upload_to='bunchofflowers/')