## 通过用 Flask 和 Koa 实现相同的 ToDo List API 来学习不同的并发模型

## 分别实现如下五个接口

### GET 获取所有任务

`/api/tasks`

Response

```
[
    {
        "id": "dba481c1-e13c-43c5-9ddf-a82ae4ff32d2",
        "title": "aaa",
        "description": "xxx",
        "done": false
    },
    {
        "id": "657f108a-9b64-4a01-8e1e-4d4b53501e0b",
        "title": "bbb",
        "description": "yyy",
        "done": false
    }
]
```
### GET 根据id获取任务

`/api/tasks/3149e346-395d-49ad-9db7-53eec290638f`

Response

```
{
    "id": "3149e346-395d-49ad-9db7-53eec290638f",
    "title": "aaa",
    "description": "xxx",
    "done": false
}
```

### POST 创建任务

`/api/task`

Request

```
{
    "title": "aaa",
    "description": "xxx",
    "done": false
}
```

### PUT 更新任务

`/api/tasks/3149e346-395d-49ad-9db7-53eec290638f`

Request

```
{
	"title": "bbb",
	"description": "yyy",
	"done": true
}
```

### DELETE 删除任务

`/api/tasks/3149e346-395d-49ad-9db7-53eec290638f`

## 并发模型

- Flask
    - 多进程
    - 同步，阻塞
- Koa
    - 单进程
    - 异步，非阻塞

通过 Gunicorn 启动 Flask 后通过日志可以看到，启动了一个主进程和多个子进程：

```
➜ gunicorn -w 2 index:app -b 0.0.0.0:5000 -n todo-list-flask --timeout 45 --max-requests 10000
[2019-06-01 23:23:09 +0800] [44345] [INFO] Starting gunicorn 19.6.0
[2019-06-01 23:23:09 +0800] [44345] [INFO] Listening at: http://0.0.0.0:5000 (44345)
[2019-06-01 23:23:09 +0800] [44345] [INFO] Using worker: sync
[2019-06-01 23:23:09 +0800] [44349] [INFO] Booting worker with pid: 44349
[2019-06-01 23:23:09 +0800] [44350] [INFO] Booting worker with pid: 44350
```

杀掉子进程，主进程会自动重新开启一个新的子进程，但是杀掉主进程，整个程序会退出。

通过 `ps` 命令也可以看到效果：

```
➜ ps -ef | grep python
  501 43085 42098   0 11:20PM ttys005    0:00.30 /Users/jiapan/.virtualenvs/todo-list-flask/bin/python /Users/jiapan/.virtualenvs/todo-list-flask/bin/gunicorn -w 2 index:app -b 0.0.0.0:5000 -n todo-list-flask --timeout 45 --max-requests 10000
  501 43088 43085   0 11:20PM ttys005    0:00.13 /Users/jiapan/.virtualenvs/todo-list-flask/bin/python /Users/jiapan/.virtualenvs/todo-list-flask/bin/gunicorn -w 2 index:app -b 0.0.0.0:5000 -n todo-list-flask --timeout 45 --max-requests 10000
  501 43091 43085   0 11:20PM ttys005    0:00.11 /Users/jiapan/.virtualenvs/todo-list-flask/bin/python /Users/jiapan/.virtualenvs/todo-list-flask/bin/gunicorn -w 2 index:app -b 0.0.0.0:5000 -n todo-list-flask --timeout 45 --max-requests 10000
```

可以看到 `子进程` 的 `父进程id` 为 `主进程的id`，说明子进程是附近成 fork 出来的。

但是启动 koa 后，只有一个进程号

```
➜ ps -ef | grep "app.js"
  501 46119 46118   0 11:29PM ttys003    0:00.22 node app.js
```

当然，直接启动 `index.py` 文件也没问题，也可以实现单进程，但是这样的话就会出现同一时间只能处理一个请求的情况，因为 Flask 采用的是同步阻塞模型，会影响后续请求，所以我们才需要 Gunicorn 来作为容器，同时启动多个进程（Apache tomcat 也是类似这个道理）。