from api.models import School, Teacher
from rest_framework import serializers


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ['name', 'uniqueID', 'city']


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Teacher
        fields = ['name', 'surname', 'UID', 'School']
