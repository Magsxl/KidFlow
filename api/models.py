from random import random

from django.db import models


class School(models.Model):
    uniqueID = models.IntegerField(primary_key=True)
    name = models.TextField(null=True, blank=True, default="")
    city = models.TextField(null=True, blank=True, default="")

    def __str__(self):
        return f"{self.name} - ID: {self.uniqueID}"


class Teacher(models.Model):
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    School = models.ForeignKey(School, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.surname} at {self.School}"


class Parent(models.Model):
    ParentID = models.TextField(primary_key=True)
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    School = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.name} {self.surname} - ID: {self.ParentID}"


class Student(models.Model):
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    School = models.ForeignKey(School, on_delete=models.CASCADE)
    ParentsID = models.ForeignKey(Parent, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.surname} student at {self.School}"



