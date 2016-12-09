from django.db import models

from codex.baseerror import LogicError


class User(models.Model):
    open_id = models.CharField(max_length=64, unique=True, db_index=True)
    user_id = models.CharField(max_length=64, db_index=True, default='')
    all_conf_page = models.IntegerField(default=1)
    upcoming_conf_page = models.IntegerField(default=1)
    my_conf_page = models.IntegerField(default=1)

    @classmethod
    def get_by_openid(cls, openid):
        try:
            return cls.objects.get(open_id=openid)
        except cls.DoesNotExist:
            raise LogicError('User not found')