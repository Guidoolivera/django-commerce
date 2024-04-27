from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Article(models.Model):
    CATEGORY_CHOICES = (
        ('vehicle', 'Vehicle'),
        ('property', 'Property'),
    )
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    sold = models.BooleanField(default=False)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='article_images/', null=True)

    def __str__(self):
        return self.title


class ArticleImage(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(
        upload_to='article_images/', default='default_article', null=True, blank=True)
