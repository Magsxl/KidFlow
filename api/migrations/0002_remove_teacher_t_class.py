# Generated by Django 4.1.7 on 2023-03-08 10:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='t_class',
        ),
    ]