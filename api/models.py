from random import random

from django.db import models


class School(models.Model):
    name = models.TextField(null=True, blank=True, default="")
    uniqueID = models.IntegerField(primary_key=True)
    city = models.TextField(null=True, blank=True, default="")

    def __str__(self):
        return f"{self.name}"


class Teacher(models.Model):
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    UID = models.TextField(unique=True, default="")
    School = models.ForeignKey(School, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"




