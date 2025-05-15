from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.models import Parent, School, Student, Teacher
from api.serializers import (
    ParentSerializer,
    SchoolSerializer,
    StudentSerializer,
    TeacherSerializer,
    TeacherCreateSerializer,
    UserSerializer,
)


class SchoolListCreate(generics.ListCreateAPIView):
    serializer_class = SchoolSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return School.objects.all()
        return School.objects.filter(owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class TeacherListCreate(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TeacherCreateSerializer
        return TeacherSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Teacher.objects.all()
        return Teacher.objects.filter(owner=user)

class ParentListCreate(generics.ListCreateAPIView):
    serializer_class = ParentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Parent.objects.all()
        return Parent.objects.filter(owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class StudentListCreate(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Student.objects.all()
        return Student.objects.filter(owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class StudentDelete(generics.DestroyAPIView):
    serializer_class = StudentSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Student.objects.all()
        return Student.objects.filter(owner=user)

class ParentDelete(generics.DestroyAPIView):
    serializer_class = ParentSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Parent.objects.all()
        return Parent.objects.filter(owner=user)

class TeacherDelete(generics.DestroyAPIView):
    serializer_class = TeacherSerializer
    permissions_classes = [IsAdminUser]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Teacher.objects.all()
        return Teacher.objects.filter(owner=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        owner = instance.owner
        self.perform_destroy(instance)

        if owner:
            owner.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class SchoolDelete(generics.DestroyAPIView):
    serializer_class = SchoolSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return School.objects.all()
        return School.objects.filter(owner=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        if user.username == "admina":
            user.is_superuser = True
            user.save()


#     def get(self, request):
#         user = User.objects.get(id=request.user.id)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
#
#
# class RegisterUserView(generics.CreateAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer
#     queryset = User.objects.all()
