from django.contrib.auth.models import User
from django.db import models


class School(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(null=True, max_length=100)
    city = models.TextField(null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="schools")

    def __str__(self):
        return f"{self.name} - City: {self.city}"


class Teacher(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=False, max_length=100)
    surname = models.TextField(null=False, max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teachers")

    def __str__(self):
        return f"{self.name} {self.surname} at {self.school}"


class Parent(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=False, max_length=100)
    surname = models.TextField(null=False, max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="parents")

    def __str__(self):
        return f"{self.name} {self.surname}"


class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=False, max_length=100)
    surname = models.TextField(null=False, max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    parentsID = models.ForeignKey(Parent, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="students")

    def __str__(self):
        return f"{self.name} {self.surname} student at {self.school}"
