from rest_framework import viewsets
from .models import Restaurante, Plato
from .serializers import RestauranteSerializer, PlatoSerializer

class RestauranteViewSet(viewsets.ModelViewSet):
    queryset = Restaurante.objects.all()
    serializer_class = RestauranteSerializer

class PlatoViewSet(viewsets.ModelViewSet):
    queryset = Plato.objects.all()
    serializer_class = PlatoSerializer