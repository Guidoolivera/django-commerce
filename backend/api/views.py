from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ArticleSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article
from django.utils import timezone

# Vista para registrar un usuario:


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Vista para crear articulos
# Vista ArticleListCreate
class ArticleListCreate(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    queryset = Article.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user,
                            created_at=timezone.now())
        else:
            print(serializer.errors)


class ArticleDelete(generics.DestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(author=user)


class ArticleDetail(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]


class ArticleUpdate(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
