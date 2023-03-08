from rest_framework import viewsets, permissions
from api.models import School, Teacher
from api.serializers import SchoolSerializer, TeacherSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all().order_by('name')
    serializer_class = SchoolSerializer
    permission_classes = [permissions.IsAuthenticated]


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]
