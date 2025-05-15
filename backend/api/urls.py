from django.urls import path
from . import views

urlpatterns = [
    # Szkoły
    path("school/", views.SchoolListCreate.as_view(), name="school-list"),
    path("school/delete/<int:pk>/", views.SchoolDelete.as_view(), name="delete-school"),
    # Nauczyciele
    path("teacher/", views.TeacherListCreate.as_view(), name="teacher-list"),
    path("teacher/delete/<int:pk>/", views.TeacherDelete.as_view(), name="delete-teacher"),
    # Rodzice
    path("parent/", views.ParentListCreate.as_view(), name="parent-list"),
    path("parent/delete/<int:pk>/", views.ParentDelete.as_view(), name="delete-parent"),
    # Uczniowie
    path("student/", views.StudentListCreate.as_view(), name="student-list"),
    path("student/delete/<int:pk>/", views.StudentDelete.as_view(), name="delete-student"),
]