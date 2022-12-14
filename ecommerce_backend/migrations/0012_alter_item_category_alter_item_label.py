# Generated by Django 4.1.2 on 2022-10-26 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_backend', '0011_alter_item_category_alter_item_label_alter_order_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(blank=True, choices=[('P', 'Posters'), ('T', 'Tip'), ('M', 'Mugs'), ('C', 'Clothing')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(blank=True, choices=[('P', 'primary'), ('D', 'danger'), ('S', 'seconary')], max_length=1, null=True),
        ),
    ]
