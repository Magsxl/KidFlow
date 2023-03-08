from django.db import models


class Teacher(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    t_class = models.IntegerField()
    date = models.DateField()
