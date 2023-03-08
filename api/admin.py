from django.contrib import admin

from api.models import School, Teacher, Parent, Student

admin.site.register(School)
admin.site.register(Teacher)
admin.site.register(Parent)
admin.site.register(Student)
