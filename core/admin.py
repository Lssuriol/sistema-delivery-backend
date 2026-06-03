from django.contrib import admin
from .models import Restaurante, Plato


@admin.register(Restaurante)
class RestauranteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'direccion', 'telefono')
    search_fields = ('nombre',)


@admin.register(Plato)
class PlatoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'precio', 'restaurante')
    list_filter = ('restaurante',)
    search_fields = ('nombre',)