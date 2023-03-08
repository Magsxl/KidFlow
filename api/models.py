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
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} {self.surname} at {self.school}"


class Parent(models.Model):
    parentID = models.TextField(primary_key=True)
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.name} {self.surname} - ID: {self.parentID}"


class Student(models.Model):
    name = models.TextField(null=True, blank=True, default="")
    surname = models.TextField(null=True, blank=True, default="")
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    parentsID = models.ForeignKey(Parent, on_delete=models.CASCADE)
    isPresent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} {self.surname} student at {self.school}"
