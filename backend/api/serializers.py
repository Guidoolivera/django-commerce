from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Article, ArticleImage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class ArticleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleImage
        fields = ["id", "article", "image"]


class ArticleSerializer(serializers.ModelSerializer):
    images = ArticleImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False),
        read_only=True
    )

    class Meta:
        model = Article
        fields = ["id", "title", "description", "price", "location",
                  "category", "created_at", "sold", "author", "image", "images", "uploaded_images"]
        extra_kwargs = {
            "author": {"read_only": True},
            "created_at": {"read_only": True}
        }

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])
        article = Article.objects.create(**validated_data)
        for image in uploaded_images:
            ArticleImage.objects.create(
                article=article, image=image)

        return article
