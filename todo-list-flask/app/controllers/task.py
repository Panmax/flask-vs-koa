# -*- coding: utf-8 -*-

from __future__ import unicode_literals, absolute_import

import uuid
import time

from flask import Blueprint, jsonify, request


bp = Blueprint('task', __name__)
tasks = []


@bp.route('/api/tasks', methods=['GET'])
def list_task():
    return jsonify(tasks)


@bp.route('/api/tasks', methods=['POST'])
def create():
    task = request.get_json()
    task['id'] = str(uuid.uuid1())
    time.sleep(3)
    tasks.append(task)
    return "添加成功"


@bp.route('/api/tasks/<id>', methods=['GET'])
def get(id):
    task = get_task(id)
    if task:
        return jsonify(task)
    return "task id 不存在"


@bp.route('/api/tasks/<id>', methods=['PUT'])
def update(id):
    task = request.get_json()
    saved_task = get_task(id)
    if saved_task is None:
        return "task id 不存在"
    saved_task['title'] = task['title']
    saved_task['done'] = task['done']
    saved_task['description'] = task['description']
    return "更新成功"


@bp.route('/api/tasks/<id>', methods=['DELETE'])
def delete(id):
    saved_task = get_task(id)
    if saved_task is None:
        return "task id 不存在"
    tasks.remove(saved_task)
    return "删除成功"


def get_task(id):
    for task in tasks:
        time.sleep(1)
        if task['id'] == id:
            return task
