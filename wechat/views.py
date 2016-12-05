from django.utils import timezone

from wechat.wrapper import WeChatView, WeChatLib
from wechat.handlers import *
from wechat.models import Activity
from WeChatTicket.settings import WECHAT_TOKEN, WECHAT_APPID, WECHAT_SECRET


class CustomWeChatView(WeChatView):

    lib = WeChatLib(WECHAT_TOKEN, WECHAT_APPID, WECHAT_SECRET)

    handlers = [

    ]
    error_message_handler = ErrorHandler
    default_handler = DefaultHandler

    @classmethod
    def update_menu(cls, activities=None):
        """
        :param activities: list of Activity
        :return: None


        to do ...
        """