from django.db import models


class Restaurante(models.Model):
    nombre = models.CharField(max_length=150)
    direccion = models.CharField(max_length=250)
    telefono = models.CharField(max_length=20)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)

    def __str__(self):
        return self.nombre


class Plato(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='platos/')
    restaurante = models.ForeignKey(Restaurante, on_delete=models.CASCADE, related_name='platos')

    def __str__(self):
        return self.nombre