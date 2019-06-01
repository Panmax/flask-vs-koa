# -*- coding: utf-8 -*-

from __future__ import unicode_literals, absolute_import

from flask import Blueprint


bp = Blueprint('hello', __name__)


@bp.route('/hello')
def hello():
    return 'hello flask.'
