from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views

from api.views import ParentViewSet, SchoolViewSet, StudentViewSet, TeacherViewSet, UserDetailAPI, RegisterUserAPIView

router = routers.DefaultRouter()
router.register(r"schools", SchoolViewSet)
router.register(r"teachers", TeacherViewSet)
router.register(r"parents", ParentViewSet)
router.register(r"students", StudentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api-token-auth", views.obtain_auth_token),
    path("get-details", UserDetailAPI.as_view()),
    path('register', RegisterUserAPIView.as_view()),
]
