### Flask 版本

#### usage

```bash
gunicorn -w 2 index:app -b 0.0.0.0:5000 -n todo-list-flask --timeout 45 --max-requests 10000
```

or

```bash
docker build -t jiapan/todo-list-flask .
docker run -d --name todo-list-flask --restart=always -p 5000:5000 jiapan/todo-list-flask
```