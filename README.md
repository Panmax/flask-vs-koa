## 通过用 Flask 和 Koa 实现相同的 ToDo List API 来学习不同的并发模型

### 并发模型

- Flask
    - 多线程
    - 同步，阻塞
- Koa
    - 单线程
    - 异步，非阻塞

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
