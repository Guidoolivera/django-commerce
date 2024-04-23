from django.urls import path, include
from . import views

urlpatterns = [
    path("articles/", views.ArticleListCreate.as_view(),
         name="article-list-create"),
    path("articles/delete/<int:pk>/",
         views.ArticleDelete.as_view(), name="delete-article")
]
