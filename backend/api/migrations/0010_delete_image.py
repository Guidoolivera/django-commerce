# Generated by Django 5.0.4 on 2024-04-22 23:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_image_image_image_images_alter_image_article'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Image',
        ),
    ]
