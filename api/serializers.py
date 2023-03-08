from rest_framework import serializers

from api.models import Parent, School, Student, Teacher


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ["name", "uniqueID", "city"]


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Teacher
        fields = ["name", "surname", "UID", "School"]


class ParentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Parent
        fields = ["ParentID", "name", "surname", "School"]


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ["name", "surname", "School", "ParentsID"]
