# Generated by Django 4.1.2 on 2022-10-26 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_backend', '0014_alter_address_address_type_alter_item_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(blank=True, choices=[('C', 'Clothing'), ('P', 'Posters'), ('T', 'Tip'), ('M', 'Mugs')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(blank=True, choices=[('S', 'seconary'), ('P', 'primary'), ('D', 'danger')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='session_id',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]
