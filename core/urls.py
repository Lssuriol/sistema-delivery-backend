from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestauranteViewSet, PlatoViewSet

router = DefaultRouter()
router.register(r'restaurantes', RestauranteViewSet)
router.register(r'platos', PlatoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]