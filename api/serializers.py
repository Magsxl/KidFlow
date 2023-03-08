from rest_framework import serializers

from api.models import Parent, School, Student, Teacher


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ["name", "uniqueID", "city"]


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Teacher
        fields = ["name", "surname", "school", "isAdmin"]


class ParentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Parent
        fields = ["parentID", "name", "surname", "school"]


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ["name", "surname", "school", "parentsID", "isPresent"]
