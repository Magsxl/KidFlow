from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, AuthUser

from api.models import Parent, School, Student, Teacher

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ["id", "name", "city", "owner"]
        extra_kwargs = {
            "owner": {"read_only": True}
        }


class TeacherSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    username = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = Teacher
        fields = ["id", "name", "surname", "school_name", "username", "owner"]
        extra_kwargs = {
            "owner": {"read_only": True},
        }

class TeacherCreateSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Teacher
        fields = ["id", "name", "surname", "school", "school_name", "username", "password", "owner"]
        extra_kwargs = {
            "owner": {"read_only": True}
        }

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "Użytkownik o takim loginie już istnieje."})

        user = User.objects.create_user(username=username, password=password)

        teacher = Teacher.objects.create(owner=user, **validated_data)
        return teacher


class ParentSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    class Meta:
        model = Parent
        fields = ["id", "name", "surname", "school", "school_name", "owner"]
        extra_kwargs = {
            "owner": {"read_only": True}
        }


class StudentSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    class Meta:
        model = Student
        fields = ["id", "name", "surname", "school", "school_name", "parentsID", "owner"]
        extra_kwargs = {
            "owner": {"read_only": True}
        }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["is_staff"] = user.is_staff
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            # "first_name": {"required": True},
            # "last_name": {"required": True},
            "username": {"required": True},
            "password": {"write_only": True, "required": True},
        }

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

# class RegisterSerializer(serializers.ModelSerializer):
#     # email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
#     # password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     # password2 = serializers.CharField(
#     #     write_only=True,
#     #     required=True,
#     # )
#
#     class Meta:
#         model = User
#         fields = ["first_name", "last_name", "email", "username", "password"]
#         extra_kwargs = {
#             "first_name": {"required": True},
#             "last_name": {"required": True},
#             "username": {"required": True},
#             "password": {"write_only": True, "required": True},
#             # "password2": {"write_only": True, "required": True},
#         }
#
#     # def validate(self, attrs):
#     #     if attrs["password"] != attrs["password2"]:
#     #         raise serializers.ValidationError({"password": "Password fields didn't match."})
#     #     return attrs
#
#     def create(self, validated_data):
#         user = User.objects.create(**validated_data)
#         # user.set_password(validated_data["password"])
#         # user.save()
#         return user
